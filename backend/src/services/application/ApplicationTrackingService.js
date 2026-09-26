/**
 * ApplicationTrackingService — Prompt 8 (My Applications & Tracking).
 *
 * Responsibility: sit between the Applications API and whichever
 * ApplicationStatusAdapter is currently registered, so
 * applications.controller.js never has to know whether a status came
 * from the prototype's own record or (later) a real department
 * adapter — the same Route -> Controller -> Service separation as
 * every other feature in this backend.
 *
 * SCOPE DECISION: this deliberately does NOT introduce a new public
 * endpoint (no GET /api/status/:id). GET /api/applications/:id and
 * GET /api/applications?citizenId=... (Prompt 7) already return
 * everything a citizen needs to track their application; this service
 * only adds one normalized `tracking` field onto those existing
 * response shapes (see applications.controller.js), which is additive
 * and does not change or remove anything Prompt 7 already returns.
 *
 * `getAdapter()` always returns MockApplicationStatusAdapter today —
 * see that file's comment for why that is not the same thing as real
 * department status aggregation. A real deployment would eventually
 * look this up per-department the same way AdapterRegistry.getAdapter
 * (source) does for citizen-data adapters; with exactly one status
 * source in existence, a full registry would be over-engineering, so
 * this is kept as a single function — upgrading it to a per-department
 * lookup later is a one-function change, not a redesign.
 */
const MockApplicationStatusAdapter = require('../../adapters/mocks/MockApplicationStatusAdapter');

function getAdapter(/* application */) {
  return new MockApplicationStatusAdapter();
}

/**
 * @param {object} application - a persisted Application record
 * @returns {Promise<object>} the same record with one added `tracking` field
 */
async function attachTracking(application) {
  const tracking = await getAdapter(application).getStatus(application);
  return { ...application, tracking };
}

/**
 * @param {object[]} applications
 * @returns {Promise<object[]>} same records, each with `tracking` added
 */
async function attachTrackingToList(applications) {
  return Promise.all(applications.map(attachTracking));
}

module.exports = { attachTracking, attachTrackingToList };
