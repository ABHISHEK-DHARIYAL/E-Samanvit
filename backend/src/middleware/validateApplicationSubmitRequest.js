/**
 * Request validation for POST /api/applications.
 *
 * Deliberately minimal, matching validateServicePrepareRequest's
 * split: only shape is checked here (400s). Whether the submission is
 * actually complete/valid against the schema, and whether the consent
 * covers what the schema needs, are business rules that depend on
 * runtime state — those live in ApplicationService (422/401/403/410).
 */
const { InvalidRequestError } = require('../utils/errors');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateApplicationSubmitRequest(req, res, next) {
  const { serviceId, citizenId, consentToken, fields } = req.body || {};

  if (!isNonEmptyString(serviceId)) {
    return next(new InvalidRequestError('"serviceId" is required and must be a non-empty string'));
  }
  if (!isNonEmptyString(citizenId)) {
    return next(new InvalidRequestError('"citizenId" is required and must be a non-empty string'));
  }
  if (!isNonEmptyString(consentToken)) {
    return next(new InvalidRequestError('"consentToken" is required and must be a non-empty string'));
  }
  if (fields !== undefined && !isPlainObject(fields)) {
    return next(new InvalidRequestError('"fields" must be an object of { fieldId: value } if provided'));
  }

  next();
}

module.exports = validateApplicationSubmitRequest;
