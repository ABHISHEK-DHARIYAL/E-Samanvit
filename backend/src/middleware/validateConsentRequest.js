/**
 * Request validation for POST /api/consent.
 *
 * Responsibility: reject a malformed consent request with 400 before
 * it reaches ConsentManagerService. Business rules that depend on
 * runtime state or bounds (e.g. the min/max expiry window) still live
 * in the service — this middleware only checks shape and known-source
 * membership, the same split used by validateCitizenDataRequest.
 */
const { InvalidRequestError } = require('../utils/errors');
const AdapterRegistry = require('../adapters/AdapterRegistry');
const { isSafeKey } = require('../models/NormalizedCitizenData');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

/** Same "__proto__"/"constructor"/"prototype" guard as validateCitizenDataRequest — a consent should never even be able to grant an unsafe path. */
function isSafeFieldPath(path) {
  const [section, field] = String(path).split('.');
  return isSafeKey(section) && isSafeKey(field);
}

function validateConsentRequest(req, res, next) {
  const { citizenId, purpose, sources, requestedFields, expiresInMinutes } = req.body || {};

  if (!isNonEmptyString(citizenId)) {
    return next(new InvalidRequestError('"citizenId" is required and must be a non-empty string'));
  }

  if (!isNonEmptyString(purpose)) {
    return next(new InvalidRequestError('"purpose" is required and must be a non-empty string'));
  }

  if (!isNonEmptyStringArray(sources)) {
    return next(new InvalidRequestError('"sources" is required and must be a non-empty array of strings'));
  }

  const supported = AdapterRegistry.getSupportedSources();
  const unknownSource = sources.find((s) => !supported.includes(s));
  if (unknownSource) {
    return next(new InvalidRequestError(
      `Unknown source "${unknownSource}". Supported sources: ${supported.join(', ')}`
    ));
  }

  if (!isNonEmptyStringArray(requestedFields)) {
    return next(new InvalidRequestError('"requestedFields" is required and must be a non-empty array of strings'));
  }

  const malformedField = requestedFields.find((f) => !f.includes('.'));
  if (malformedField) {
    return next(new InvalidRequestError(
      `"requestedFields" entries must be "section.field" paths — got "${malformedField}"`
    ));
  }

  const unsafeField = requestedFields.find((f) => !isSafeFieldPath(f));
  if (unsafeField) {
    return next(new InvalidRequestError(`"requestedFields" entry "${unsafeField}" is not a valid field path`));
  }

  if (expiresInMinutes !== undefined && typeof expiresInMinutes !== 'number') {
    return next(new InvalidRequestError('"expiresInMinutes" must be a number if provided'));
  }

  next();
}

module.exports = validateConsentRequest;
