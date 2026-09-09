/**
 * FilledFormsCache — a small localStorage-backed cache of which
 * serviceIds THIS BROWSER has submitted an e-Samanvit application for.
 *
 * Why this exists, and why it is NOT the source of truth:
 * the real, authoritative record of a citizen's submitted applications
 * already lives on the backend (ApplicationService/ApplicationStore,
 * reachable via ApplicationsApi.list()) — that must always win. This
 * cache exists only to make the Dashboard's "Recommended for you" /
 * "My filled forms" split feel instant the moment a citizen finishes
 * submitting a form and lands back on the Dashboard, without having
 * to wait on (or worry about) a fresh network round-trip landing in
 * time. Dashboard.js unions this cache with the real backend list —
 * it never overrides or contradicts what the backend actually says.
 *
 * Deliberately minimal: just an array of serviceId strings, no
 * personal/citizen data, nothing sensitive — safe to sit in
 * localStorage even though the rest of this prototype is careful not
 * to put consent tokens or citizen data there (see govServices.js's
 * own comment on that).
 */
const FilledFormsCache = {
  KEY: 'esamanvit_locally_filled_service_ids',

  markFilled(serviceId) {
    if (!serviceId) return;
    try {
      const ids = new Set(this.getAll());
      ids.add(serviceId);
      localStorage.setItem(this.KEY, JSON.stringify([...ids]));
    } catch {
      // localStorage unavailable (private browsing, quota, etc.) —
      // the Dashboard still works correctly from the backend list
      // alone; this cache is purely an enhancement, never required.
    }
  },

  getAll() {
    try {
      const raw = localStorage.getItem(this.KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
};
