/**
 * setuRequestStore — tracks the in-progress/completed Setu DigiLocker
 * consent request for each citizen.
 *
 * Why this exists: Setu's DigiLocker flow is interactive — the citizen
 * must be redirected to a real DigiLocker consent screen and approve
 * it there, which cannot happen inside a single synchronous
 * `RevenueAdapter.fetchData()` call. This store is the hand-off point:
 * a separate /api/revenue/digilocker/start + callback flow (see
 * revenue.routes.js) populates it as the citizen moves through Setu's
 * real OAuth-style flow, and RevenueAdapter.fetchData() only checks
 * whether a completed request already exists here.
 *
 * In-memory + per-process, same deliberate prototype simplification
 * as every other in-memory store in this backend (ConsentManagerService,
 * ApplicationService, etc.) — lost on restart, not meant for production.
 */
const store = new Map(); // citizenId -> { requestId, status, documents: { [docType]: rawDoc } }

function startRequest(citizenId, requestId) {
  store.set(citizenId, { requestId, status: 'unauthenticated', documents: {} });
}

function updateStatus(citizenId, status) {
  const entry = store.get(citizenId);
  if (entry) entry.status = status;
}

function cacheDocument(citizenId, docType, rawDoc) {
  const entry = store.get(citizenId);
  if (entry) entry.documents[docType] = rawDoc;
}

function get(citizenId) {
  return store.get(citizenId) || null;
}

function hasCompletedRequest(citizenId) {
  const entry = store.get(citizenId);
  return Boolean(entry && entry.status === 'authenticated');
}

module.exports = { startRequest, updateStatus, cacheDocument, get, hasCompletedRequest };
