/**
 * Services API — thin wrapper around the backend's Prompt 5 endpoints.
 *
 * Responsibility: the only file that knows the actual URL paths for
 * service discovery/detail/preparation. UI code calls these functions,
 * never fetch()/ApiClient.request() directly, so the backend contract
 * only needs to be known in one place.
 *
 * Response shapes are NOT invented here — they match exactly what
 * backend/src/controllers/services.controller.js returns (see that
 * file / the root README's "Service Registry..." section).
 */
const ServicesApi = {
  // GET /api/services -> { success, services: [{serviceId, serviceName, department, description, purpose}] }
  list() {
    return ApiClient.request('/api/services');
  },

  // GET /api/services/:serviceId -> { success, service: <full schema with fields[]> }
  detail(serviceId) {
    return ApiClient.request(`/api/services/${encodeURIComponent(serviceId)}`);
  },

  // POST /api/services/:serviceId/prepare -> { success, serviceId, consentId, readyForReview, missingRequiredFields, fields, sources }
  // Body: { citizenId, consentToken } ONLY — sources/fields are derived
  // server-side from the schema, never supplied by the frontend.
  prepare(serviceId, { citizenId, consentToken }) {
    return ApiClient.request(`/api/services/${encodeURIComponent(serviceId)}/prepare`, {
      method: 'POST',
      body: JSON.stringify({ citizenId, consentToken })
    });
  }
};
