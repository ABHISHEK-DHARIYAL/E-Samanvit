/**
 * Request validation for POST /api/citizen-data/fetch.
 *
 * Responsibility: reject malformed input with a 400 BEFORE it reaches
 * the Data Aggregator. The aggregator/adapters also re-check
 * consentToken individually (defense in depth, useful if this service
 * is ever called from somewhere other than this HTTP route) — but the
 * HTTP boundary should never trust client input, so the checks belong
 * here too, not only deep inside the adapters.
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

/**
 * Rejects a "section.field" path whose segments would be unsafe object
 * keys downstream (see models/NormalizedCitizenData.js's isSafeKey) —
 * "__proto__", "constructor", "prototype" — with a clean 400 here,
 * rather than letting it reach the aggregator where it's silently
 * dropped by the same guard.
 */
function isSafeFieldPath(path) {
  const [section, field] = String(path).split('.');
  return isSafeKey(section) && isSafeKey(field);
}

function validateCitizenDataRequest(req, res, next) {
  const { citizenId, consentToken, sources, requiredFields } = req.body || {};

  if (!isNonEmptyString(citizenId)) {
    return next(new InvalidRequestError('"citizenId" is required and must be a non-empty string'));
  }

  if (!isNonEmptyString(consentToken)) {
    return next(new InvalidRequestError('"consentToken" is required and must be a non-empty string'));
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

  if (!isNonEmptyStringArray(requiredFields)) {
    return next(new InvalidRequestError('"requiredFields" is required and must be a non-empty array of strings'));
  }

  const malformedField = requiredFields.find((f) => !f.includes('.'));
  if (malformedField) {
    return next(new InvalidRequestError(
      `"requiredFields" entries must be "section.field" paths (e.g. "identity.fullName") — got "${malformedField}"`
    ));
  }

  const unsafeField = requiredFields.find((f) => !isSafeFieldPath(f));
  if (unsafeField) {
    return next(new InvalidRequestError(`"requiredFields" entry "${unsafeField}" is not a valid field path`));
  }

  next();
}

module.exports = validateCitizenDataRequest;
