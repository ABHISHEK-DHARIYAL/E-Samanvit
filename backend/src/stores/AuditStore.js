/**
 * AuditStore — in-memory persistence for audit events.
 *
 * Responsibility: the ONLY place that touches audit-event storage.
 * AuditService talks to this abstraction so it can later become
 * a DatabaseAuditStore without callers changing.
 *
 * PROTOTYPE LIMITATION: an in-memory array, lost on restart, with no
 * size cap — acceptable for an SIH demo session, not for production.
 */
const events = [];

function append(event) {
  events.push(event);
  return event;
}

function getByConsentId(consentId) {
  return events.filter((e) => e.consentId === consentId);
}

function getAll() {
  // Most recent first — more useful for a demo/dev listing than
  // insertion order.
  return [...events].reverse();
}

module.exports = { append, getByConsentId, getAll };
