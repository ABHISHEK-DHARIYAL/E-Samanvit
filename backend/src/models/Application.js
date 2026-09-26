/**
 * Application record shape + status vocabulary.
 *
 * Responsibility: define the ONE status this prototype is honestly
 * able to produce, and the record shape ApplicationService/
 * ApplicationStore share.
 *
 * PROTOTYPE SCOPE — read before extending this:
 * Submitting here means "recorded by e-Samanvit, with the citizen's
 * confirmed answers and the government-sourced provenance for each
 * auto-filled field." It does NOT mean the application was delivered
 * to any actual department system — no such integration exists (see
 * the mock adapters in adapters/mocks/). So SUBMITTED is the only
 * status this backend can honestly claim: it has no channel to a real
 * government system that could report back DEPARTMENT_VERIFICATION,
 * APPROVED, REJECTED, or similar. Fabricating those (the way the old
 * frontend `mock-api.js` prototype did, with a scripted verification
 * timeline) is exactly what this backend avoids elsewhere — provenance
 * is never invented, only carried through from what was actually
 * fetched or actually typed by the citizen. A real Status Aggregator
 * (later prompt) would need an actual channel back from each
 * department before any further status could be added truthfully.
 *
 * Full record shape (see ApplicationService for how it's built):
 * {
 *   applicationId, serviceId, serviceName, department,
 *   citizenId, consentId,
 *   status: ApplicationStatus,
 *   submittedAt,
 *   fields: {
 *     [fieldId]: { value, source, autoFilled, edited }
 *   }
 * }
 */
const ApplicationStatus = Object.freeze({
  SUBMITTED: 'SUBMITTED'
});

module.exports = { ApplicationStatus };
