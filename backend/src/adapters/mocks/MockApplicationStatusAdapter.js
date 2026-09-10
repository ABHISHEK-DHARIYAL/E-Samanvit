/**
 * MockApplicationStatusAdapter — the only ApplicationStatusAdapter that
 * exists right now.
 *
 * HONESTY CONSTRAINT — do not weaken this when extending the file:
 * this adapter has no channel to any real Maharashtra department
 * system. It does not poll a government API, is not invoked by a
 * webhook, and cannot report DEPARTMENT_VERIFICATION, APPROVED,
 * REJECTED, or any status beyond what models/Application.js already
 * produces. It exists only so ApplicationTrackingService has a real
 * implementation of the ApplicationStatusAdapter contract to call
 * today, instead of special-casing "no adapter registered yet" — the
 * same reason mock GovernmentAdapters exist for citizen-data fetching.
 *
 * `source: 'E_SAMANVIT_PROTOTYPE'` is deliberate — never a
 * GovernmentSource value (AAPLE_SARKAR/MAHADBT/MAHABHUMI/REVENUE) — a
 * status label must never imply it came from a government system it
 * didn't actually come from.
 */
const ApplicationStatusAdapter = require('../interfaces/ApplicationStatusAdapter');
const { ApplicationStatus } = require('../../models/Application');

const STATUS_TEXT = {
  [ApplicationStatus.SUBMITTED]: {
    label: 'Submitted',
    description:
      'Your application has been recorded by e-Samanvit with the information you confirmed and the government-sourced provenance available at submission time. This prototype has no live channel back from the concerned department, so no status beyond this can be reported yet.'
  }
};

class MockApplicationStatusAdapter extends ApplicationStatusAdapter {
  async getStatus(application) {
    const text = STATUS_TEXT[application.status] || {
      label: application.status,
      description: 'Status detail is not available for this application.'
    };
    return {
      status: application.status,
      label: text.label,
      description: text.description,
      source: 'E_SAMANVIT_PROTOTYPE'
    };
  }
}

module.exports = MockApplicationStatusAdapter;
