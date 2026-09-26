/**
 * e-Samanvit API Client — foundation only.
 *
 * Purpose: give the frontend ONE place that knows how to talk to the
 * e-Samanvit backend, instead of scattering fetch() + base URLs across
 * page files. Pages should call ApiClient.* rather than fetch() directly
 * once real endpoints exist.
 *
 * Scope for this stage: only a generic request() helper + a health check.
 * No government-data endpoints are implemented here yet — those arrive in
 * later prompts, once the adapter/aggregator layer exists on the backend.
 */
const ApiClient = {
  baseUrl() {
    return (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) || 'http://localhost:5000';
  },

  async request(path, options = {}) {
    const url = `${this.baseUrl()}${path}`;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    // Parse the body even on failure — the backend's centralized error
    // handler always returns { success:false, error:{ code, message } }
    // (see backend/src/middleware/errorHandler.js), and callers need
    // that code to show the right citizen-facing message (e.g. distinguish
    // "consent expired" from "service unavailable").
    let body = null;
    try { body = await res.json(); } catch (e) { /* non-JSON or empty response */ }

    if (!res.ok) {
      const message = (body && body.error && body.error.message) || `API request failed: ${res.status} ${res.statusText} (${url})`;
      const err = new Error(message);
      err.status = res.status;
      err.code = (body && body.error && body.error.code) || null;
      // Prompt 7: a small number of application-submission errors carry
      // field-level detail (see backend/src/middleware/errorHandler.js) —
      // passed through only when present, same as code/message above.
      err.missingFields = (body && body.error && body.error.missingFields) || null;
      err.fieldErrors = (body && body.error && body.error.fieldErrors) || null;
      throw err;
    }
    return body;
  },

  // GET /api/health — verifies the backend is reachable.
  checkHealth() {
    return this.request('/api/health');
  }
};

// -- Development-only connectivity check --------------------------------
// Logs to console only; does not touch the UI. Safe no-op if the backend
// isn't running (expected — most page loads won't have it up yet).
if (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) {
  ApiClient.checkHealth()
    .then(data => console.log('[ApiClient] backend reachable:', data))
    .catch(() => console.log('[ApiClient] backend not reachable yet (expected if not running).'));
}
