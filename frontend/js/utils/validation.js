/**
 * Generic, schema-driven field validation for the Dynamic Form Engine.
 *
 * Responsibility: derive validation purely from a field's declared
 * `type`/`required`/`validation` metadata (as returned by
 * GET /api/services/:serviceId) — there is deliberately no
 * `if (fieldId === "mobileNumber")` anywhere. Adding a new government
 * service with new fields never requires touching this file.
 */
function isEmptyValue(value) {
  return value === null || value === undefined || String(value).trim() === '';
}

/**
 * @param {object} field - schema field metadata (type, required, validation, options)
 * @param {*} value - the citizen's current value for this field
 * @returns {string|null} an error message, or null if valid
 */
function validateFieldValue(field, value) {
  if (field.required && isEmptyValue(value)) {
    return 'This field is required.';
  }
  if (isEmptyValue(value)) {
    return null; // optional and empty — nothing further to check
  }

  const rules = field.validation || {};

  if (field.type === 'number') {
    const num = Number(value);
    if (Number.isNaN(num)) return 'Enter a valid number.';
    if (rules.min !== undefined && num < rules.min) return `Must be at least ${rules.min}.`;
    if (rules.max !== undefined && num > rules.max) return `Must be at most ${rules.max}.`;
    return null;
  }

  if (field.type === 'email') {
    if (typeof validateEmail === 'function' && !validateEmail(String(value))) {
      return 'Enter a valid email address.';
    }
  }

  const str = String(value);
  if (rules.minLength !== undefined && str.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters.`;
  }
  if (rules.maxLength !== undefined && str.length > rules.maxLength) {
    return `Must be at most ${rules.maxLength} characters.`;
  }
  if (rules.pattern) {
    try {
      if (!new RegExp(rules.pattern).test(str)) return 'Value is not in the expected format.';
    } catch (e) {
      // A malformed pattern from the backend should never crash the form —
      // skip pattern enforcement rather than throwing.
    }
  }
  return null;
}

/**
 * Validates a whole set of { fieldId: value } against a schema's fields.
 * @returns {object} fieldId -> error message, only for fields that failed
 */
function validateAllFields(schemaFields, values) {
  const errors = {};
  for (const field of schemaFields) {
    const message = validateFieldValue(field, values[field.fieldId]);
    if (message) errors[field.fieldId] = message;
  }
  return errors;
}
