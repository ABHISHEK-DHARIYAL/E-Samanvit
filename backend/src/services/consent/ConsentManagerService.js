/**
 * ConsentManagerService owns the lifecycle and scope of citizen
 * data-sharing consent.
 *
 * Data consumers (the citizen-data fetch flow) must validate consent
 * through this service instead of touching ConsentStore directly —
 * this is the ONLY place consent business rules (scope enforcement,
 * expiry, revocation) live.
 *
 * The current implementation uses in-memory storage (via ConsentStore)
 * because this is an SIH prototype: "Prototype consent records are
 * stored in memory and are lost when the backend restarts."
 *
 * PROTOTYPE SCOPE — explicitly NOT implemented here:
 *   - India's Account Aggregator protocol
 *   - Aadhaar / DigiLocker authentication
 *   - Any production government consent infrastructure
 * This demonstrates the *architectural principles* (explicit consent,
 * purpose limitation, field-level scope, source limitation, expiry,
 * consent ID, auditability, data minimization) using a mechanism that
 * could later be swapped for an authorized production consent/identity
 * provider without callers of this service changing.
 *
 * IDENTITY LIMITATION: `citizenId` here is a caller-supplied demo
 * identifier, not an authenticated identity — there is no auth layer
 * yet. citizenId is accepted as a plain parameter specifically so that,
 * once authentication exists, callers can pass
 * `authenticatedUser.citizenId` instead of `req.body.citizenId`
 * without this service's interface changing at all.
 */
const crypto = require('node:crypto');
const ConsentStore = require('../../stores/ConsentStore');
const AuditService = require('../audit/AuditService');
const { AuditEventType } = require('../../models/AuditEvent');
const { ConsentStatus, isPastExpiry } = require('../../models/ConsentRecord');
const {
  InvalidRequestError,
  ConsentTokenMissingError,
  InvalidConsentTokenError,
  ConsentNotFoundError,
  ConsentExpiredError,
  ConsentRevokedError,
  ConsentScopeViolationError,
  CitizenMismatchError
} = require('../../utils/errors');

// Consent should be short-lived and purpose-bound, not a standing grant.
const MIN_EXPIRY_MINUTES = 1;
const MAX_EXPIRY_MINUTES = 24 * 60;
const DEFAULT_EXPIRY_MINUTES = 15;

/**
 * SHA-256 of the raw token. Only the hash is ever persisted
 * (ConsentStore never sees the raw value) — a memory dump of the store
 * can't be replayed as a valid token. The raw token is returned to the
 * caller exactly once, at creation time, and is never logged (see
 * AuditService — events carry consentId, never the token).
 */
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/** Strips internal fields (tokenHash) before a record leaves this service. */
function toSafeConsent(record) {
  const { tokenHash, ...safe } = record;
  return safe;
}

/**
 * Mutates `record` in place to EXPIRED if its expiry has passed and it
 * was still ACTIVE. Lazy expiry — no background sweep job — checked
 * wherever a record is read. Logs CONSENT_EXPIRED exactly once, at the
 * moment the transition is first observed.
 */
function applyLazyExpiry(record) {
  if (record.status === ConsentStatus.ACTIVE && isPastExpiry(record)) {
    record.status = ConsentStatus.EXPIRED;
    AuditService.log({
      event: AuditEventType.CONSENT_EXPIRED,
      consentId: record.consentId,
      citizenId: record.citizenId,
      sources: record.sources,
      fields: record.requestedFields,
      status: 'INFO'
    });
  }
  return record;
}

/**
 * Creates a new ACTIVE, scoped consent record.
 * Returns the raw token ONLY here — this is the one point in the
 * system it's ever exposed. Callers must not log or persist it
 * themselves; pass it back on the next request in the request body
 * (not a URL/query param) or an Authorization header.
 */
function createConsent({ citizenId, purpose, sources, requestedFields, expiresInMinutes }) {
  const minutes = expiresInMinutes === undefined ? DEFAULT_EXPIRY_MINUTES : expiresInMinutes;
  if (typeof minutes !== 'number' || minutes < MIN_EXPIRY_MINUTES || minutes > MAX_EXPIRY_MINUTES) {
    throw new InvalidRequestError(
      `"expiresInMinutes" must be a number between ${MIN_EXPIRY_MINUTES} and ${MAX_EXPIRY_MINUTES}`
    );
  }

  const consentId = `consent-${crypto.randomUUID()}`;
  const rawToken = crypto.randomBytes(32).toString('hex'); // cryptographically secure — never Math.random()
  const now = new Date();

  const record = {
    consentId,
    citizenId,
    purpose,
    sources: [...sources],
    requestedFields: [...requestedFields],
    status: ConsentStatus.ACTIVE,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + minutes * 60 * 1000).toISOString(),
    tokenHash: hashToken(rawToken)
  };

  ConsentStore.save(record);
  AuditService.log({
    event: AuditEventType.CONSENT_CREATED,
    consentId,
    citizenId,
    sources: record.sources,
    fields: record.requestedFields,
    status: 'SUCCESS'
  });

  return { consent: toSafeConsent(record), consentToken: rawToken };
}

/** Fetches safe consent metadata (never the token) by ID, applying lazy expiry. */
function getConsent(consentId) {
  const record = ConsentStore.getById(consentId);
  if (!record) throw new ConsentNotFoundError(consentId);
  applyLazyExpiry(record);
  return toSafeConsent(record);
}

/** Revokes a consent. Idempotent — revoking an already-REVOKED consent is a no-op, not an error. */
function revokeConsent(consentId) {
  const record = ConsentStore.getById(consentId);
  if (!record) throw new ConsentNotFoundError(consentId);
  applyLazyExpiry(record);

  if (record.status === ConsentStatus.ACTIVE) {
    ConsentStore.updateStatus(consentId, ConsentStatus.REVOKED);
    AuditService.log({
      event: AuditEventType.CONSENT_REVOKED,
      consentId,
      citizenId: record.citizenId,
      sources: record.sources,
      fields: record.requestedFields,
      status: 'SUCCESS'
    });
  }

  return toSafeConsent(ConsentStore.getById(consentId));
}

/**
 * The core scope-enforcement gate. Called before any data fetch.
 *
 * Order of checks matches the architecture in Prompt 4 section 27:
 * token presence -> consent exists -> status (expired/revoked) ->
 * citizen match -> source scope -> field scope.
 *
 * A validated request must satisfy BOTH:
 *   requestedFields  ⊆ consent.requestedFields
 *   requestedSources ⊆ consent.sources
 * — this is the core data-minimization rule. A valid token can never
 * be combined with a modified request to obtain more data than the
 * consent actually grants.
 *
 * @returns {{consentId, citizenId, sources, requestedFields, purpose, expiresAt}}
 *   a validated consent context — never the token, never unrelated
 *   internal fields.
 */
function validateConsentForFetch({ consentToken, citizenId, sources, requiredFields }) {
  if (!consentToken) throw new ConsentTokenMissingError();

  const record = ConsentStore.getByTokenHash(hashToken(consentToken));
  if (!record) throw new InvalidConsentTokenError();

  applyLazyExpiry(record);

  if (record.status === ConsentStatus.EXPIRED) throw new ConsentExpiredError(record.consentId);
  if (record.status === ConsentStatus.REVOKED) throw new ConsentRevokedError(record.consentId);

  if (record.citizenId !== citizenId) throw new CitizenMismatchError();

  const unauthorizedSource = sources.find((s) => !record.sources.includes(s));
  if (unauthorizedSource) {
    throw new ConsentScopeViolationError(`Source "${unauthorizedSource}" is not authorized by this consent.`);
  }

  const unauthorizedField = requiredFields.find((f) => !record.requestedFields.includes(f));
  if (unauthorizedField) {
    throw new ConsentScopeViolationError(`Field "${unauthorizedField}" is not authorized by this consent.`);
  }

  return {
    consentId: record.consentId,
    citizenId: record.citizenId,
    sources: record.sources,
    requestedFields: record.requestedFields,
    purpose: record.purpose,
    expiresAt: record.expiresAt
  };
}

module.exports = {
  createConsent,
  getConsent,
  revokeConsent,
  validateConsentForFetch,
  MIN_EXPIRY_MINUTES,
  MAX_EXPIRY_MINUTES,
  DEFAULT_EXPIRY_MINUTES
};
