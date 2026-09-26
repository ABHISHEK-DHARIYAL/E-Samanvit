/**
 * Audit event type vocabulary.
 *
 * Responsibility: centralize the event names AuditService is allowed
 * to record, so callers can't invent ad-hoc event strings. Kept to the
 * security/user-relevant events the prototype actually needs — not a
 * general-purpose logging taxonomy.
 */
const AuditEventType = Object.freeze({
  CONSENT_CREATED: 'CONSENT_CREATED',
  CONSENT_REVOKED: 'CONSENT_REVOKED',
  CONSENT_EXPIRED: 'CONSENT_EXPIRED',
  DATA_FETCH_SUCCESS: 'DATA_FETCH_SUCCESS',
  DATA_FETCH_PARTIAL: 'DATA_FETCH_PARTIAL',
  DATA_FETCH_FAILED: 'DATA_FETCH_FAILED',
  SERVICE_PREPARED: 'SERVICE_PREPARED',
  APPLICATION_SUBMITTED: 'APPLICATION_SUBMITTED'
});

module.exports = { AuditEventType };
