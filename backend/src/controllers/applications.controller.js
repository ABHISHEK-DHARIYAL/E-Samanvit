/**
 * Applications controller.
 *
 * Responsibility: HTTP <-> ApplicationService glue, same
 * Route -> Controller -> Service separation as every other controller
 * in this backend. Contains no submission, reconciliation, or
 * validation logic itself — that all lives in ApplicationService.
 *
 * IDENTITY LIMITATION: citizenId is read directly from the request
 * body/query, same as every other controller — see
 * ConsentManagerService's file comment for the plan to replace this.
 *
 * PROMPT 8: getApplication/listApplications now additionally attach a
 * normalized `tracking` field via ApplicationTrackingService — the
 * only change these two endpoints get for "My Applications & Tracking"
 * (see that service's file comment for why no new /api/status route
 * was added). submitApplication's response is untouched.
 */
const ApplicationService = require('../services/application/ApplicationService');
const ApplicationTrackingService = require('../services/application/ApplicationTrackingService');
const { InvalidRequestError } = require('../utils/errors');

async function submitApplication(req, res) {
  const { serviceId, citizenId, consentToken, fields } = req.body;

  const result = await ApplicationService.submitApplication({
    serviceId,
    citizenId,
    consentToken,
    fields
  });

  // Prompt 10 duplicate-submission protection: submitApplication()
  // returns the SAME record (tagged alreadySubmitted) instead of a new
  // one if this consent token was already used to submit successfully.
  // Only the HTTP status differs (200, not 201, since nothing new was
  // created) — the `application` shape itself is exactly what Prompt 7
  // already returned, so existing callers see no difference.
  const { alreadySubmitted, ...application } = result;
  res.status(alreadySubmitted ? 200 : 201).json({ success: true, application });
}

async function getApplication(req, res) {
  const application = ApplicationService.getApplication(req.params.applicationId);
  const withTracking = await ApplicationTrackingService.attachTracking(application);
  res.json({ success: true, application: withTracking });
}

/**
 * GET /api/applications?citizenId=... — a citizen's own submissions.
 *
 * DEV/DEMO ONLY, same caveat as GET /api/audit: no authentication
 * layer exists yet, so this is intentionally unrestricted in the
 * prototype — a production design must not let citizenId be an
 * arbitrary, unauthenticated query parameter.
 */
async function listApplications(req, res) {
  const { citizenId } = req.query;
  if (!citizenId || typeof citizenId !== 'string') {
    throw new InvalidRequestError('"citizenId" query parameter is required');
  }
  const applications = ApplicationService.listApplicationsForCitizen(citizenId);
  const withTracking = await ApplicationTrackingService.attachTrackingToList(applications);
  res.json({ success: true, applications: withTracking });
}

module.exports = { submitApplication, getApplication, listApplications };
