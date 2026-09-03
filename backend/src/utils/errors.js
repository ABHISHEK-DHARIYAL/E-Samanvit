/**
 * Application-level error classes.
 *
 * Responsibility: give the aggregator/adapters/consent layer/
 * controllers meaningful, typed errors instead of throwing plain
 * strings. Each carries an HTTP status AND a stable machine-readable
 * `code`, so the centralized error handler (middleware/errorHandler.js)
 * can respond with { success:false, error:{ code, message } } — enough
 * for a caller to branch on programmatically, without ever leaking a
 * stack trace or internal implementation detail.
 */
class AppError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
  }
}

class InvalidRequestError extends AppError {
  constructor(message) {
    super(message, 400, 'INVALID_REQUEST');
  }
}

class ConsentTokenMissingError extends AppError {
  constructor(source) {
    super(source ? `Missing consent token for source: ${source}` : 'Missing consent token', 401, 'CONSENT_TOKEN_MISSING');
  }
}

class InvalidConsentTokenError extends AppError {
  constructor() {
    super('Invalid or unrecognized consent token', 401, 'CONSENT_TOKEN_INVALID');
  }
}

class ConsentNotFoundError extends AppError {
  constructor(consentId) {
    super(`Consent record not found: ${consentId}`, 404, 'CONSENT_NOT_FOUND');
  }
}

class ConsentExpiredError extends AppError {
  constructor(consentId) {
    super(`Consent ${consentId} has expired`, 410, 'CONSENT_EXPIRED');
  }
}

class ConsentRevokedError extends AppError {
  constructor(consentId) {
    super(`Consent ${consentId} has been revoked`, 410, 'CONSENT_REVOKED');
  }
}

class ConsentScopeViolationError extends AppError {
  constructor(message) {
    super(message || 'Requested data is outside the granted consent scope.', 403, 'CONSENT_SCOPE_VIOLATION');
  }
}

class CitizenMismatchError extends AppError {
  constructor() {
    super('citizenId does not match the citizen associated with this consent', 403, 'CONSENT_CITIZEN_MISMATCH');
  }
}

class AdapterNotFoundError extends AppError {
  constructor(source) {
    super(`No adapter registered for source: ${source}`, 400, 'ADAPTER_NOT_FOUND');
  }
}

class AdapterFetchError extends AppError {
  constructor(source, message) {
    super(`Adapter "${source}" failed: ${message}`, 502, 'ADAPTER_FETCH_ERROR');
  }
}

class ServiceNotFoundError extends AppError {
  constructor(serviceId) {
    super(`Unknown service: ${serviceId}`, 404, 'SERVICE_NOT_FOUND');
  }
}

class ApplicationNotFoundError extends AppError {
  constructor(applicationId) {
    super(`Application not found: ${applicationId}`, 404, 'APPLICATION_NOT_FOUND');
  }
}

/** A required field has no value from either government data or the citizen's own entry. */
class ApplicationIncompleteError extends AppError {
  constructor(missingFields) {
    super(`Required fields are missing: ${missingFields.join(', ')}`, 422, 'APPLICATION_INCOMPLETE');
    this.missingFields = missingFields;
  }
}

/** A submitted value fails the schema's own validation rules (pattern/min/max/length). */
class ApplicationValidationError extends AppError {
  constructor(fieldErrors) {
    super('One or more submitted fields failed validation', 422, 'APPLICATION_VALIDATION_FAILED');
    this.fieldErrors = fieldErrors; // { fieldId: message }
  }
}

/** A browser sent an Origin header that isn't the configured frontend or a trusted preview deployment. */
class CorsOriginNotAllowedError extends AppError {
  constructor() {
    super('Origin not allowed by CORS policy', 403, 'CORS_ORIGIN_NOT_ALLOWED');
  }
}

module.exports = {
  AppError,
  InvalidRequestError,
  ConsentTokenMissingError,
  InvalidConsentTokenError,
  ConsentNotFoundError,
  ConsentExpiredError,
  ConsentRevokedError,
  ConsentScopeViolationError,
  CitizenMismatchError,
  AdapterNotFoundError,
  AdapterFetchError,
  ServiceNotFoundError,
  ApplicationNotFoundError,
  ApplicationIncompleteError,
  ApplicationValidationError,
  CorsOriginNotAllowedError
};
