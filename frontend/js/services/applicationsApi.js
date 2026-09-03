/**
 * Applications API — thin wrapper around the backend's Prompt 7
 * endpoints, matching ServicesApi/ConsentApi's pattern: response
 * shapes read directly from applications.controller.js, nothing
 * invented here.
 */
const ApplicationsApi = {
  // POST /api/applications -> { success, application: {...} }
  // Body: { serviceId, citizenId, consentToken, fields } — fields is
  // the citizen's confirmed { fieldId: value } map from the review
  // screen. sources/requiredFields are NOT sent — same server-derives-
  // from-schema principle as ServicesApi.prepare().
  submit({ serviceId, citizenId, consentToken, fields }) {
    return ApiClient.request('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ serviceId, citizenId, consentToken, fields })
    });
  },

  // GET /api/applications/:applicationId -> { success, application: {...} }
  // As of Prompt 8, `application.tracking` is also present — a small,
  // normalized { status, label, description, source } object computed
  // server-side (see backend ApplicationTrackingService) — nothing
  // fabricated here on the frontend.
  get(applicationId) {
    return ApiClient.request(`/api/applications/${encodeURIComponent(applicationId)}`);
  },

  // GET /api/applications?citizenId=... -> { success, applications: [...] }
  // Prompt 8: "My Applications" list. DEV/DEMO ONLY, same as the
  // backend route comment — citizenId is an unauthenticated query
  // parameter in this prototype.
  list(citizenId) {
    return ApiClient.request(`/api/applications?citizenId=${encodeURIComponent(citizenId)}`);
  }
};
