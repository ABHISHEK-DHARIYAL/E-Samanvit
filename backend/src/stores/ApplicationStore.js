/**
 * ApplicationStore — in-memory persistence for submitted applications.
 *
 * Responsibility: the ONLY place that touches application storage, the
 * same abstraction-behind-a-store pattern as ConsentStore/AuditStore —
 * a real database can replace this later without ApplicationService
 * (or anything above it) changing.
 *
 * PROTOTYPE LIMITATION: an in-memory Map, lost on restart. No database
 * was added, consistent with every other store in this backend.
 *
 * Records are keyed by applicationId, with a second index from
 * citizenId to a list of applicationIds so a citizen's own submissions
 * can be listed without a full scan.
 */
const byId = new Map();          // applicationId -> record
const idsByCitizen = new Map();  // citizenId -> applicationId[]
const idByConsentId = new Map(); // consentId -> applicationId (one submission per consent — see ApplicationService's idempotency check)

function save(record) {
  byId.set(record.applicationId, record);
  const existing = idsByCitizen.get(record.citizenId) || [];
  existing.push(record.applicationId);
  idsByCitizen.set(record.citizenId, existing);
  if (record.consentId) idByConsentId.set(record.consentId, record.applicationId);
  return record;
}

function getById(applicationId) {
  return byId.get(applicationId) || null;
}

function getByCitizenId(citizenId) {
  const ids = idsByCitizen.get(citizenId) || [];
  // Most recent first — more useful for a citizen-facing list than
  // insertion order.
  return ids.map((id) => byId.get(id)).filter(Boolean).reverse();
}

/**
 * Looks up an application already submitted against a given consent.
 * Used by ApplicationService for prototype-level duplicate-submission
 * protection: a consent record is meant to authorize one submission,
 * so a second POST /api/applications carrying the same (already-used)
 * consent token is treated as a repeat of the first, not a new
 * application — see ApplicationService.submitApplication.
 */
function getByConsentId(consentId) {
  const applicationId = idByConsentId.get(consentId);
  return applicationId ? byId.get(applicationId) || null : null;
}

module.exports = { save, getById, getByCitizenId, getByConsentId };
