/**
 * ApplicationStatusAdapter defines the contract through which a
 * department-specific status provider could eventually report an
 * application's real lifecycle state back to e-Samanvit.
 *
 * WHY THIS EXISTS (read before wiring a real adapter in):
 * The Application Tracking layer (see ../../services/application/
 * ApplicationTrackingService.js) must never depend on a department's
 * own status vocabulary, polling mechanism, or response shape — the
 * same reason GovernmentAdapter (see ./GovernmentAdapter.js) exists
 * one layer down for citizen-data fetching. This is intentionally the
 * same abstract-base-class pattern.
 *
 * Today exactly one implementation exists — MockApplicationStatusAdapter
 * (see ../mocks/MockApplicationStatusAdapter.js) — and it does NOT talk
 * to any government system. It only echoes the one status
 * models/Application.js can honestly produce (SUBMITTED). Swapping it
 * for a real RevenueStatusAdapter / MahaDBTStatusAdapter /
 * MahaBhumiStatusAdapter later means implementing this same contract —
 * nothing above this layer (ApplicationTrackingService, controllers,
 * the frontend) needs to change.
 *
 * This is an architectural boundary, not a working integration. Do not
 * treat the existence of this file as evidence that real department
 * status reporting is implemented — it is not (see the mock's own file
 * comment).
 */
class ApplicationStatusAdapter {
  /**
   * @param {object} application - a persisted Application record (see
   *   models/Application.js for the full shape).
   * @returns {Promise<{status: string, label: string, description: string, source: string}>}
   *   A normalized status: `status` is the raw backend value (see
   *   models/Application.js's ApplicationStatus), `label`/`description`
   *   are citizen-readable text, and `source` identifies who is
   *   reporting this (never a real department name unless the status
   *   genuinely came from that department's own system).
   */
  async getStatus(application) {
    throw new Error(`${this.constructor.name} must implement getStatus()`);
  }
}

module.exports = ApplicationStatusAdapter;
