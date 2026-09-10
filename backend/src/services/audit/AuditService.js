/**
 * AuditService — records security/user-relevant consent and data-fetch
 * events.
 *
 * Responsibility: the one place that writes to AuditStore, so every
 * caller logs events in the same shape. Deliberately narrow — this is
 * not a general logging framework, only the specific event vocabulary
 * defined in models/AuditEvent.js (consent lifecycle + data-fetch
 * outcomes).
 *
 * DATA MINIMIZATION APPLIES TO AUDIT TOO: callers must pass field
 * *paths* ("income.annualIncome"), never the actual fetched values,
 * and must never pass the raw consent token. This service does not
 * defend against a caller violating that — it trusts its callers
 * (ConsentManagerService, citizenData controller) to already follow it,
 * the same way the rest of this backend trusts internal callers.
 */
const AuditStore = require('../../stores/AuditStore');

function log({ event, consentId, citizenId, sources, fields, status }) {
  const entry = {
    event,
    consentId: consentId || null,
    citizenId: citizenId || null,
    sources: sources || [],
    fields: fields || [],
    status: status || null,
    timestamp: new Date().toISOString()
  };
  return AuditStore.append(entry);
}

function getByConsentId(consentId) {
  return AuditStore.getByConsentId(consentId);
}

function getAll() {
  return AuditStore.getAll();
}

module.exports = { log, getByConsentId, getAll };
