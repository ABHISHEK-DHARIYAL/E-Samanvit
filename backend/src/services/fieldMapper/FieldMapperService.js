/**
 * The Field Mapper converts normalized citizen data into the field
 * structure required by a specific government service.
 *
 * Service-specific mapping rules live inside the service schema
 * (`commonDataPath` per field) rather than being hardcoded here —
 * adding a new service never requires touching this file.
 *
 * Why this is separate from the adapters: adapters know how to *fetch*
 * data from a government source; this file only knows how to
 * *reshape* already-fetched NormalizedCitizenData into a service's
 * field list. Neither layer needs to know about the other's concerns.
 *
 * Why provenance is preserved, not reinvented: NormalizedCitizenData
 * (Prompt 3) already wraps every value as { value, source, verifiedAt }.
 * This mapper reads that wrapper and carries it straight through — it
 * does not compute or guess a source of its own.
 *
 * Why missing values are never fabricated: a field with no
 * `commonDataPath` has no government-system source at all (e.g. a
 * self-declared category, a phone number) — it is always reported as
 * missing/manual-entry. A field WITH a `commonDataPath` that isn't
 * present in the fetched data (not returned by the adapter, or that
 * source wasn't part of the fetch) is also reported as missing —
 * never a guessed or default value.
 */

/**
 * Safely resolves a dot-path like "identity.fullName" against a
 * (possibly partial/undefined) object, without throwing on missing
 * intermediate objects, null values, or invalid paths.
 */
function resolvePath(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, key) => {
    if (acc === undefined || acc === null || typeof acc !== 'object') return undefined;
    return acc[key];
  }, obj);
}

/**
 * Maps a single schema field against the fetched normalized data.
 * @returns the field's mapped result — see module doc for the shape.
 */
function mapField(field, normalizedData) {
  const base = {
    fieldId: field.fieldId,
    label: field.label,
    type: field.type,
    required: !!field.required,
    editable: field.editable !== false,
    sensitive: !!field.sensitive
  };

  if (!field.commonDataPath) {
    // No government-system source is configured for this field at all —
    // never invent one. Always manual-entry.
    return { ...base, value: null, source: null, verifiedAt: null, autoFilled: false, missing: true };
  }

  const resolved = resolvePath(normalizedData, field.commonDataPath);
  if (!resolved || resolved.value === undefined || resolved.value === null) {
    // The source was configured but the fetch didn't return it —
    // either the source wasn't part of this fetch, or the adapter
    // genuinely doesn't have it. Either way: report missing, don't guess.
    return { ...base, value: null, source: null, verifiedAt: null, autoFilled: false, missing: true };
  }

  return {
    ...base,
    value: resolved.value,
    source: resolved.source,
    verifiedAt: resolved.verifiedAt || null,
    autoFilled: true,
    missing: false
  };
}

/**
 * Maps every field in a service schema against fetched normalized
 * data, and summarizes whether every REQUIRED field already has a
 * value at this point in the flow.
 *
 * Fields with no `commonDataPath` (manual-entry-only, e.g. a phone
 * number or a self-declared category) are always "missing" here,
 * because "prepare" only ever auto-fills from government sources —
 * it never asks the citizen anything. So `readyForReview: false` with
 * those fields listed is the CORRECT, expected result whenever a
 * schema has required manual fields; the citizen fills those in later
 * on the (Prompt 6+) form before whatever comes after that.
 *
 * IMPORTANT: readyForReview means "the form can be shown for review",
 * NOT "ready for submission" — submission is out of scope (Prompt 6+).
 */
function mapServiceData(schema, normalizedData) {
  const fields = {};
  const missingRequiredFields = [];

  for (const field of schema.fields) {
    const mapped = mapField(field, normalizedData || {});
    fields[field.fieldId] = mapped;
    if (field.required && mapped.missing) missingRequiredFields.push(field.fieldId);
  }

  return {
    serviceId: schema.serviceId,
    fields,
    missingRequiredFields,
    readyForReview: missingRequiredFields.length === 0
  };
}

module.exports = { mapServiceData, mapField, resolvePath };
