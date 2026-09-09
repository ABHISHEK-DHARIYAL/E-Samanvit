/**
 * Request validation for POST /api/services/:serviceId/prepare.
 *
 * Deliberately minimal: unlike /api/citizen-data/fetch, the caller
 * does NOT supply sources or requiredFields here — those are derived
 * server-side from the service schema (see services.controller.js).
 * That's an intentional security property of this endpoint: a caller
 * can't ask for arbitrary fields, only whatever a registered schema
 * defines. Only citizenId + consentToken need validating.
 */
const { InvalidRequestError } = require('../utils/errors');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateServicePrepareRequest(req, res, next) {
  const { citizenId, consentToken } = req.body || {};

  if (!isNonEmptyString(citizenId)) {
    return next(new InvalidRequestError('"citizenId" is required and must be a non-empty string'));
  }
  if (!isNonEmptyString(consentToken)) {
    return next(new InvalidRequestError('"consentToken" is required and must be a non-empty string'));
  }

  next();
}

module.exports = validateServicePrepareRequest;
