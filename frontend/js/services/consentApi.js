/**
 * Consent API — thin wrapper around the backend's Prompt 4 endpoints.
 *
 * The frontend NEVER generates a consent token itself — token
 * generation is exclusively a backend responsibility (see
 * ConsentManagerService). This file only relays what the citizen
 * explicitly agreed to and returns whatever the backend issues.
 */
const ConsentApi = {
  // POST /api/consent -> { success, consent: {...}, consentToken }
  create({ citizenId, purpose, sources, requestedFields, expiresInMinutes }) {
    return ApiClient.request('/api/consent', {
      method: 'POST',
      body: JSON.stringify({ citizenId, purpose, sources, requestedFields, expiresInMinutes })
    });
  },

  // GET /api/consent/:consentId -> { success, consent: {...} } — never includes the token.
  get(consentId) {
    return ApiClient.request(`/api/consent/${encodeURIComponent(consentId)}`);
  },

  // POST /api/consent/:consentId/revoke -> { success, consent: {...} }
  revoke(consentId) {
    return ApiClient.request(`/api/consent/${encodeURIComponent(consentId)}/revoke`, { method: 'POST' });
  }
};
