/**
 * Normalized Citizen Data model + field-selection helpers.
 *
 * Responsibility: this is the ONE shared shape every adapter returns
 * data in, and the ONE shared logic for two rules the whole
 * architecture depends on:
 *
 *   1. Data minimization — an adapter only ever returns the specific
 *      "section.field" paths that were actually requested, never a
 *      full dump of everything it knows.
 *   2. Field-level provenance — every returned value is wrapped with
 *      where it came from and when, so a future UI can show e.g.
 *      "Annual Income ₹2,50,000 — Source: Revenue Department" without
 *      the frontend having to guess.
 *
 * This is intentionally a conceptual/logical model, not a rigid class
 * hierarchy that forces every section to exist — see selectRequiredFields
 * below, which only ever produces the sections/fields that were both
 * requested AND available from a given source.
 *
 * Full (never-populated-all-at-once) shape reference:
 * {
 *   identity: { fullName, dateOfBirth, gender },
 *   address:  { addressLine, district, taluka, village, pincode },
 *   income:   { annualIncome, financialYear },
 *   land:     { surveyNumber, area, unit },
 *   education:{ qualification, institution },
 *   bank:     { accountLast4, ifsc }
 * }
 */

/**
 * "section.field" path segments come straight from client-supplied
 * `requiredFields` (see middleware/validateCitizenDataRequest.js — it
 * only checks shape, i.e. that the string contains a dot, not which
 * literal names appear). Using an attacker-controlled string as an
 * object key is a classic prototype-pollution vector ("__proto__",
 * "constructor", "prototype") — blocked here, at the one place every
 * such path is turned into a key, rather than trying to sanitize it at
 * every call site.
 */
const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
function isSafeKey(key) {
  return typeof key === 'string' && key.length > 0 && !UNSAFE_KEYS.has(key);
}

/**
 * Filters a source's raw mock/real record down to only the requested
 * "section.field" paths that the record actually has, wrapping each
 * surviving value with provenance metadata.
 *
 * @param {object} sourceRecord - e.g. { identity: {...}, address: {...} }
 * @param {string[]} requiredFields - e.g. ["identity.fullName", "income.annualIncome"]
 * @param {string} sourceName - a GovernmentSource identifier
 * @returns {object} partial normalized data, wrapped as { value, source, verifiedAt }
 */
function selectRequiredFields(sourceRecord, requiredFields, sourceName) {
  const verifiedAt = new Date().toISOString();
  const result = Object.create(null); // no inherited Object.prototype to pollute

  for (const path of requiredFields) {
    const [section, field] = String(path).split('.');
    if (!isSafeKey(section) || !isSafeKey(field)) continue; // reject "__proto__"/"constructor"/"prototype" segments outright

    const sectionData = Object.prototype.hasOwnProperty.call(sourceRecord, section)
      ? sourceRecord[section]
      : undefined;
    if (!sectionData || !Object.prototype.hasOwnProperty.call(sectionData, field)) continue; // this source doesn't have this field — skip, don't fabricate it

    if (!result[section]) result[section] = Object.create(null);
    result[section][field] = {
      value: sectionData[field],
      source: sourceName,
      verifiedAt
    };
  }

  return result;
}

/**
 * Merges one adapter's partial normalized result into an accumulator,
 * combining at the field level. Because each mock adapter in this
 * prototype owns a disjoint set of sections (see each adapter's
 * DEMO_RECORD), collisions aren't expected today — but a later
 * (field, field) collision would resolve as "last adapter processed
 * wins", which is worth knowing before more sources are added.
 */
function mergeNormalizedData(target, partial) {
  for (const [section, fields] of Object.entries(partial)) {
    if (!isSafeKey(section)) continue; // same guard as selectRequiredFields — belt and suspenders
    if (!target[section]) target[section] = Object.create(null);
    Object.assign(target[section], fields);
  }
  return target;
}

module.exports = { selectRequiredFields, mergeNormalizedData, isSafeKey };
