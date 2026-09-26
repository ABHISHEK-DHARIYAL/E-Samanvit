/**
 * MyApplications — "My Applications" & Application Tracking (Prompt 8).
 *
 * ONE generic page, same principle as GovServices (Prompt 6): it never
 * hardcodes a service name or renders a service-specific card. Every
 * application shown here — whatever service it was submitted for — is
 * rendered from the same list/detail templates, driven entirely by
 * what GET /api/applications (Prompt 7, now Prompt-8-enriched with a
 * `tracking` field) actually returns.
 *
 * SCOPE: this consumes the existing Prompt 7 application endpoints
 * through the existing ApplicationsApi wrapper — no direct fetch()
 * calls, no new endpoints. See ApplicationsApi.list()/get() and the
 * backend's ApplicationTrackingService for where `tracking` comes
 * from. There is deliberately no polling, no fabricated status
 * transitions, and no claim that any department has received or
 * processed this application — see renderTrackingCard() below and
 * models/Application.js on the backend for why SUBMITTED is the only
 * status this prototype can honestly show.
 *
 * State lives in memory only (GovServices.state does the same) — a
 * page refresh re-fetches from the backend rather than trusting any
 * cached client copy.
 */

// Same prototype identity limitation as GovServices — no auth layer
// yet, so this reuses the identical hardcoded demo citizen id rather
// than inventing a second one. See GOV_DEMO_CITIZEN_ID's own comment
// in govServices.js for the backend-side counterpart of this note.

const MyApplications = {
  state: {
    step: 'list',            // list | detail
    loading: false,
    error: null,
    notFound: false,
    applications: [],
    selected: null,           // the full Application record (with tracking) for the detail view
    selectedSchema: null      // best-effort schema fetch, only used to show field labels — never required
  },

  refresh() {
    const root = document.getElementById('myApplicationsRoot');
    if (root) root.innerHTML = this.renderBody();
  },

  // -- Rendering -------------------------------------------------------

  errorBanner() {
    if (!this.state.error) return '';
    return `<div class="card" style="background:var(--clr-error-bg);border-left:4px solid var(--clr-error);color:var(--clr-error);margin-bottom:var(--sp-5);display:flex;align-items:center;justify-content:space-between;gap:var(--sp-4)">
      <span style="display:flex;align-items:center;gap:8px">${Icons.alertCircle} ${escapeHtml(this.state.error)}</span>
      <button class="btn btn-ghost btn-sm" onclick="myAppsRetry()">Try Again</button>
    </div>`;
  },

  renderBody() {
    if (this.state.loading) {
      return `<div style="text-align:center;padding:var(--sp-10) 0"><div class="spinner"></div><p class="form-hint" style="margin-top:var(--sp-3)">Loading...</p></div>`;
    }
    if (this.state.step === 'detail') return this.renderDetail();
    return this.renderList();
  },

  renderEmptyState() {
    return `
      <div class="empty-state">
        ${Icons.fileText}
        <h3>You haven't submitted any applications yet</h3>
        <p>Once you apply for a government service through e-Samanvit, it will show up here so you can track it.</p>
        <button class="btn btn-primary" style="margin-top:var(--sp-5)" onclick="navigateTo('gov-services')">
          Apply for a Service ${Icons.arrowRight}
        </button>
      </div>
    `;
  },

  statusBadge(tracking) {
    // Deliberately not color-only — a text label always accompanies
    // the badge color (accessibility: status must be understandable
    // without relying on color alone).
    const label = (tracking && tracking.label) || 'Unknown';
    return `<span class="badge badge-blue">${Icons.check} ${escapeHtml(label)}</span>`;
  },

  renderList() {
    if (this.state.applications.length === 0) {
      return `
        <h2 class="section-title" style="text-align:left">My Applications</h2>
        <p class="section-subtitle" style="text-align:left;margin-bottom:var(--sp-6)">
          Track the government services you've applied for through e-Samanvit.
        </p>
        ${this.errorBanner()}
        ${this.renderEmptyState()}
      `;
    }

    const cards = this.state.applications.map((app) => `
      <div class="card card-hover" tabindex="0" role="button"
           aria-label="View details for ${escapeHtml(app.serviceName)} application"
           onclick="myAppsSelect('${escapeHtml(app.applicationId)}')"
           onkeydown="if(event.key==='Enter'){myAppsSelect('${escapeHtml(app.applicationId)}')}">
        <div class="card-icon card-icon-blue">${Icons.fileText}</div>
        <div class="card-title">${escapeHtml(app.serviceName)}</div>
        <div class="form-hint" style="font-weight:600;color:var(--clr-primary-700);margin-bottom:8px">${escapeHtml(app.department)}</div>
        <div style="margin-bottom:8px">${this.statusBadge(app.tracking)}</div>
        <div class="form-hint" style="font-family:monospace;font-size:12px;word-break:break-all;margin-bottom:4px">${escapeHtml(app.applicationId)}</div>
        <div class="form-hint">Submitted ${escapeHtml(formatDate(app.submittedAt))}</div>
        <button class="btn btn-ghost btn-sm btn-block" style="margin-top:var(--sp-3)" onclick="event.stopPropagation();myAppsSelect('${escapeHtml(app.applicationId)}')">
          View Details ${Icons.arrowRight}
        </button>
      </div>
    `).join('');

    return `
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;margin-bottom:var(--sp-6)">
        <div>
          <h2 class="section-title" style="text-align:left;margin-bottom:4px">My Applications</h2>
          <p class="section-subtitle" style="text-align:left;margin:0">Track the government services you've applied for through e-Samanvit.</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="navigateTo('gov-services')">${Icons.plus} Apply for a Service</button>
      </div>
      ${this.errorBanner()}
      <div class="grid grid-3">${cards}</div>
    `;
  },

  /**
   * Honest tracking card — the one place in this file that must never
   * be "improved" into inventing a timeline the backend didn't return.
   * Only the submission event is ever shown as complete; anything
   * beyond it is explicitly labeled as unavailable, not hidden or
   * guessed at.
   */
  renderTrackingCard(app) {
    const tracking = app.tracking || { label: app.status, description: '' };
    return `
      <div class="card" style="background:var(--clr-bg-subtle,#f6f8fa);margin-top:var(--sp-4)">
        <div class="form-label" style="margin-bottom:8px">Application Status</div>
        <div style="margin-bottom:8px">${this.statusBadge(tracking)}</div>
        <p class="card-text">${escapeHtml(tracking.description)}</p>

        <div class="form-label" style="margin-top:var(--sp-5);margin-bottom:8px">Application Timeline</div>
        <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px">
          <span style="color:var(--clr-success);flex-shrink:0">${Icons.check}</span>
          <div>
            <div style="font-weight:600;color:var(--clr-gray-900)">Application submitted</div>
            <div class="form-hint">${escapeHtml(formatDateTime(app.submittedAt))}</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;align-items:flex-start;color:var(--clr-gray-400)">
          <span style="flex-shrink:0">○</span>
          <div>
            <div style="font-weight:600">Department status updates</div>
            <div class="form-hint">Not available in this prototype.</div>
          </div>
        </div>

        <div class="card" style="background:var(--clr-warning-bg);border-left:4px solid var(--clr-warning);margin-top:var(--sp-5)">
          <div style="display:flex;align-items:center;gap:8px;font-weight:600;color:var(--clr-warning)">
            ${Icons.alertCircle} Prototype / Demo Status
          </div>
          <p class="card-text" style="margin-top:4px">
            This application was recorded by the e-Samanvit prototype using mock government data sources.
            It has not been delivered to any real Maharashtra department system, and no government officer
            or department API has reviewed it — this status is not a legal or official submission confirmation.
          </p>
        </div>
      </div>
    `;
  },

  renderSubmittedInfo(app) {
    const schema = this.state.selectedSchema;
    const labelFor = (fieldId) => {
      if (schema) {
        const f = schema.fields.find((sf) => sf.fieldId === fieldId);
        if (f) return f.label;
      }
      return fieldId;
    };
    const rows = Object.entries(app.fields || {}).map(([fieldId, f]) => {
      const displayValue = f.value === null || f.value === undefined || f.value === ''
        ? '—'
        : escapeHtml(String(f.value));
      const tag = f.autoFilled
        ? `<span class="badge badge-green">${Icons.check} Auto-filled from ${escapeHtml(sourceLabel(f.source))}</span>`
        : `<span class="badge badge-blue">${Icons.edit} Entered by you</span>`;
      return `
        <div style="padding:var(--sp-3) 0;border-bottom:1px solid var(--clr-gray-100)">
          <div style="font-size:var(--fs-xs);color:var(--clr-gray-500);font-weight:600;text-transform:uppercase;letter-spacing:.03em">${escapeHtml(labelFor(fieldId))}</div>
          <div style="font-size:var(--fs-md);font-weight:600;color:var(--clr-gray-900);margin:2px 0 4px">${displayValue}</div>
          ${tag}
        </div>
      `;
    }).join('');

    return `
      <div class="card" style="margin-top:var(--sp-4)">
        <div class="form-label" style="margin-bottom:8px">Submitted Information</div>
        ${rows || '<p class="form-hint">No field data available for this application.</p>'}
      </div>
    `;
  },

  renderDetail() {
    if (this.state.notFound) {
      return `
        ${this.errorBanner()}
        <div class="empty-state">
          ${Icons.alertCircle}
          <h3>Application not found</h3>
          <p>We couldn't find an application with that reference.</p>
          <button class="btn btn-primary" style="margin-top:var(--sp-5)" onclick="myAppsBackToList()">← Back to My Applications</button>
        </div>
      `;
    }

    const app = this.state.selected;
    if (!app) return this.renderList();

    return `
      <button class="btn btn-ghost btn-sm" onclick="myAppsBackToList()">← Back to My Applications</button>
      ${this.errorBanner()}
      <div class="card" style="max-width:720px;margin:var(--sp-4) auto 0">
        <div class="card-icon card-icon-blue">${Icons.fileText}</div>
        <div class="card-title">${escapeHtml(app.serviceName)}</div>
        <div class="form-hint" style="font-weight:600;color:var(--clr-primary-700);margin-bottom:12px">${escapeHtml(app.department)}</div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <div class="form-label">Application ID</div>
            <div class="card-text" style="font-family:monospace;word-break:break-all">${escapeHtml(app.applicationId)}</div>
          </div>
          <div>
            <div class="form-label">Submitted</div>
            <div class="card-text">${escapeHtml(formatDateTime(app.submittedAt))}</div>
          </div>
        </div>
      </div>

      <div style="max-width:720px;margin:0 auto">
        ${this.renderTrackingCard(app)}
        ${this.renderSubmittedInfo(app)}
      </div>
    `;
  },

  // -- Data / actions ---------------------------------------------------

  async onMount() {
    this.state.step = 'list';
    this.state.selected = null;
    this.state.selectedSchema = null;
    this.state.notFound = false;
    this.state.error = null;
    await this.loadApplications();
  },

  async loadApplications() {
    this.state.loading = true; this.state.error = null; this.refresh();
    try {
      const res = await ApplicationsApi.list(GOV_DEMO_CITIZEN_ID);
      this.state.applications = res.applications || [];
    } catch (e) {
      this.state.error = friendlyErrorMessage(e) || 'We couldn\'t load your applications. Please try again.';
    } finally {
      this.state.loading = false; this.refresh();
    }
  },

  async selectApplication(applicationId) {
    this.state.loading = true; this.state.error = null; this.state.notFound = false; this.refresh();
    try {
      const res = await ApplicationsApi.get(applicationId);
      this.state.selected = res.application;
      this.state.step = 'detail';

      // Best-effort only — field labels are a display nicety, never a
      // requirement. If this fails (service later removed, network
      // hiccup, etc.) the detail view still renders using raw fieldIds.
      try {
        const schemaRes = await ServicesApi.detail(res.application.serviceId);
        this.state.selectedSchema = schemaRes.service;
      } catch (schemaErr) {
        this.state.selectedSchema = null;
      }
    } catch (e) {
      if (e.code === 'APPLICATION_NOT_FOUND') {
        this.state.notFound = true;
        this.state.step = 'detail';
      } else {
        this.state.error = friendlyErrorMessage(e) || 'We couldn\'t load this application. Please try again.';
      }
    } finally {
      this.state.loading = false; this.refresh();
    }
  },

  backToList() {
    this.state.step = 'list';
    this.state.selected = null;
    this.state.selectedSchema = null;
    this.state.notFound = false;
    this.state.error = null;
    this.refresh();
  },

  retry() {
    this.state.error = null;
    if (this.state.step === 'detail' && this.state.selected) {
      return this.selectApplication(this.state.selected.applicationId);
    }
    return this.loadApplications();
  }
};

// -- Global handlers wired from onclick in the templates above ----------
function myAppsSelect(id) { MyApplications.selectApplication(id); }
function myAppsBackToList() { MyApplications.backToList(); }
function myAppsRetry() { MyApplications.retry(); }

// -- Page entry point (registered with the router in app.js) ------------
function renderMyApplicationsPage() {
  return `
    ${renderPublicNavbar('my-applications')}
    <div class="page-layout">
      <section class="section">
        <div class="container" style="max-width:1100px">
          <div id="myApplicationsRoot">${MyApplications.renderBody()}</div>
        </div>
      </section>
      ${renderFooter()}
    </div>
  `;
}
