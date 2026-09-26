/**
 * Generic, schema-driven field validation — the backend mirror of
 * `frontend/js/utils/validation.js`.
 *
 * Why this is duplicated rather than shared: frontend and backend are
 * separate runtimes (browser vs. Node) with no shared build step, so
 * there's no import path between them — the same trade-off this
 * project already accepts for the consent flow ("the frontend derives
 * scope only to *display* it, the backend independently re-derives
 * and enforces it"). This file is that same principle applied to form
 * validation: the frontend's checks are for citizen UX, this file is
 * what actually gates a submission. Deliberately kept rule-for-rule
 * identical so the two never disagree about what's valid — if one
 * changes, change the other.
 *
 * Derives entirely from a field's declared `type`/`required`/
 * `validation` schema metadata — no `if (fieldId === "mobileNumber")`
 * branching here either.
 */
function isEmptyValue(value) {
  return value === null || value === undefined || String(value).trim() === '';
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {object} field - schema field metadata (type, required, validation)
 * @param {*} value - the submitted value for this field
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

  if (field.type === 'email' && !EMAIL_PATTERN.test(String(value))) {
    return 'Enter a valid email address.';
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
      // A malformed pattern in a schema should never crash a
      // submission — skip pattern enforcement rather than throwing.
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

module.exports = { validateFieldValue, validateAllFields, isEmptyValue };
