/**
 * FilledFormsCache — a small localStorage-backed cache of which
 * serviceIds THIS BROWSER, AS THIS CITIZEN, has submitted an
 * e-Samanvit application for.
 *
 * Why this exists, and why it is NOT the source of truth:
 * the real, authoritative record of a citizen's submitted applications
 * already lives on the backend (ApplicationService/ApplicationStore,
 * reachable via ApplicationsApi.list()) — that must always win. This
 * cache exists only to make the Dashboard's "Recommended for you" /
 * "My filled forms" split feel instant the moment a citizen finishes
 * submitting a form and lands back on the Dashboard, without having
 * to wait on (or worry about) a fresh network round-trip landing in
 * time. Dashboard.js and GovServices.js union this cache with the
 * real backend list — it never overrides or contradicts what the
 * backend actually says.
 *
 * Namespaced by citizenId (not just one global key) — this browser's
 * demo citizen id is generated once and persisted separately (see
 * getOrCreateDemoCitizenId() in govServices.js), specifically so a
 * fresh citizen record starts with a genuinely empty local cache too.
 * Before this, a single un-namespaced key meant this cache kept
 * reporting an old submission (e.g. from testing under a previously
 * shared/hardcoded citizen id) as still "filled" even after the
 * citizen id itself was reset — the exact bug this namespacing fixes.
 *
 * Deliberately minimal: just an array of serviceId strings, no
 * personal/citizen data, nothing sensitive — safe to sit in
 * localStorage even though the rest of this prototype is careful not
 * to put consent tokens or citizen data there (see govServices.js's
 * own comment on that).
 */
const FilledFormsCache = {
  keyFor(citizenId) {
    return `esamanvit_locally_filled_service_ids:${citizenId || 'unknown'}`;
  },

  markFilled(serviceId, citizenId) {
    if (!serviceId) return;
    try {
      const ids = new Set(this.getAll(citizenId));
      ids.add(serviceId);
      localStorage.setItem(this.keyFor(citizenId), JSON.stringify([...ids]));
    } catch {
      // localStorage unavailable (private browsing, quota, etc.) —
      // the Dashboard still works correctly from the backend list
      // alone; this cache is purely an enhancement, never required.
    }
  },

  getAll(citizenId) {
    try {
      const raw = localStorage.getItem(this.keyFor(citizenId));
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
};
