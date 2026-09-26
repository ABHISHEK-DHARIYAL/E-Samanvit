/**
 * Centralized field type vocabulary for service schema fields.
 *
 * Responsibility: describes HOW a field should eventually be rendered
 * by the frontend Dynamic Form Engine (Prompt 6) — this backend does
 * not render anything itself. Kept as a fixed, small set rather than
 * an open string, so a schema author can't introduce a type the form
 * engine doesn't know how to handle.
 */
const FieldType = Object.freeze({
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  EMAIL: 'email',
  PHONE: 'phone',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  TEXTAREA: 'textarea'
});

module.exports = FieldType;
