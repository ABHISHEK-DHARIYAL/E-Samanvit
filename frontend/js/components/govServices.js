/**
 * GovServices — the Dynamic Form Engine + consent-driven preparation
 * flow (Prompt 6).
 *
 * This is the ONE generic page that renders every government service
 * from its backend schema. There is no IncomeCertificateForm.js,
 * ScholarshipForm.js, or LandRecordForm.js — adding a new service on
 * the backend (Prompt 5) makes it appear here automatically via
 * GET /api/services, with zero frontend code changes.
 *
 * Flow: Service list -> Consent explanation -> (citizen consents) ->
 * Prepare (fetch + autofill) -> Editable form -> Review -> Confirm.
 * As of Prompt 7, "Confirm" actually submits to POST /api/applications
 * — the backend re-validates everything (consent scope, required
 * fields, per-field rules) independently of this file's own checks,
 * and returns a real applicationId that becomes the citizen's receipt
 * (see renderDone()). This is still NOT delivery to any actual
 * government department system — see backend/src/models/Application.js
 * for why SUBMITTED is the only status this prototype can honestly
 * produce.
 *
 * State lives entirely in memory (GovServices.state) and is lost on
 * page refresh — this is a deliberate prototype simplification, not
 * an oversight: consent tokens in particular must never be persisted
 * to localStorage/sessionStorage (see consentToken below).
 */

// PROTOTYPE IDENTITY — there is no authentication layer yet (see
// backend ConsentManagerService's file comment for the matching
// backend-side note). Production deployment must derive this from an
// authenticated identity layer instead of a hardcoded constant.
const GOV_DEMO_CITIZEN_ID = "DEMO-001";

const GovServices = {
  state: {
    step: "list", // list | consent | preparing | form | review | done
    loading: false,
    error: null,
    services: [],
    servicesRequestId: 0,
    schema: null, // full schema from GET /api/services/:id
    consent: null, // safe consent metadata (never the token)
    consentToken: null, // IN-MEMORY ONLY — never logged, never persisted, never put in a URL
    missingRequiredFields: [],
    fields: {}, // fieldId -> { ...schema field, originalValue, currentValue, autoFilled, source, missing, modified }
    formErrors: {},
    submitting: false, // true only while POST /api/applications is in flight (distinct from 'loading', which covers earlier steps)
    application: null, // the submitted Application record returned by the backend, once confirm() succeeds
  },

  // -- Rendering -----------------------------------------------------

  refresh() {
    const root = document.getElementById("govServicesRoot");
    if (root) root.innerHTML = this.renderBody();
  },

  stepBar() {
    const stepForKey = {
      list: "service",
      consent: "consent",
      preparing: "autofill",
      form: "autofill",
      review: "review",
      done: "review",
    };
    const active = stepForKey[this.state.step];
    const steps = [
      ["service", "Service"],
      ["consent", "Consent"],
      ["autofill", "Autofill"],
      ["review", "Review"],
    ];
    return `<div class="form-steps-bar" style="margin-bottom:var(--sp-6)">
      ${steps
        .map(
          ([key, label]) =>
            `<span class="step-pill ${
              key === active ? "active" : ""
            }">${label}</span>`
        )
        .join("")}
    </div>`;
  },

  errorBanner() {
    if (!this.state.error) return "";
    return `<div class="card" style="background:var(--clr-error-bg);border-left:4px solid var(--clr-error);color:var(--clr-error);margin-bottom:var(--sp-5);display:flex;align-items:center;justify-content:space-between;gap:var(--sp-4)">
      <span style="display:flex;align-items:center;gap:8px">${
        Icons.alertCircle
      } ${escapeHtml(this.state.error)}</span>
      <button class="btn btn-ghost btn-sm" onclick="govRetry()">Try Again</button>
    </div>`;
  },

  renderBody() {
    if (this.state.loading && this.state.step !== "preparing") {
      return `${this.stepBar()}<div style="text-align:center;padding:var(--sp-10) 0"><div class="spinner"></div><p class="form-hint" style="margin-top:var(--sp-3)">Loading...</p></div>`;
    }
    switch (this.state.step) {
      case "list":
        return this.renderList();
      case "consent":
        return this.renderConsent();
      case "preparing":
        return this.renderPreparing();
      case "form":
        return this.renderForm();
      case "review":
        return this.renderReview();
      case "done":
        return this.renderDone();
      default:
        return this.renderList();
    }
  },

  renderList() {
    const cards = this.state.services
      .map(
        (s) => `
      <div class="card card-hover">
        <div class="card-icon card-icon-blue">${Icons.fileText}</div>
        <div class="card-title">${escapeHtml(s.serviceName)}</div>
        <div class="form-hint" style="font-weight:600;color:var(--clr-primary-700);margin-bottom:6px">${escapeHtml(
          s.department
        )}</div>
        <p class="card-text">${escapeHtml(s.description)}</p>
        <button class="btn btn-primary btn-block" style="margin-top:var(--sp-3)" onclick="govSelectService('${escapeHtml(
          s.serviceId
        )}')">
          Start Application ${Icons.arrowRight}
        </button>
      </div>
    `
      )
      .join("");

    return `
      ${this.stepBar()}
      ${this.errorBanner()}
      <h2 class="section-title" style="text-align:left">Government Services</h2>
      <p class="section-subtitle" style="text-align:left;margin-bottom:var(--sp-6)">
        Apply using your already-verified citizen data — reviewed from Maharashtra government sources with your explicit consent.
      </p>
      ${
        this.state.services.length === 0
          ? `<p class="form-hint">No services are available right now.</p>`
          : `<div class="grid grid-3">${cards}</div>`
      }
    `;
  },

  renderConsent() {
    const schema = this.state.schema;
    const { fields: dataPaths } = this.deriveRequirements();
    const fieldLabels = schema.fields
      .filter((f) => f.commonDataPath)
      .map((f) => f.label);
    const sourceLabels = [...new Set(schema.requiredSources.map(sourceLabel))];

    return `
      ${this.stepBar()}
      ${this.errorBanner()}
      <button class="btn btn-ghost btn-sm" onclick="govBackToList()">${
        Icons.chevronRight ? "←" : ""
      } Back to services</button>
      <div class="card" style="max-width:640px;margin:var(--sp-4) auto 0">
        <div class="card-icon card-icon-blue">${Icons.lock}</div>
        <div class="card-title">${escapeHtml(schema.serviceName)}</div>
        <p class="card-text">${escapeHtml(schema.description)}</p>

        <div style="margin-top:var(--sp-5)">
          <div class="form-label" style="margin-bottom:8px">We need to access:</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:var(--sp-4)">
            ${
              fieldLabels.length
                ? fieldLabels
                    .map(
                      (l) =>
                        `<span class="badge badge-blue">${
                          Icons.check
                        } ${escapeHtml(l)}</span>`
                    )
                    .join("")
                : `<span class="form-hint">No verified government data is needed for this service — all fields are entered manually.</span>`
            }
          </div>

          <div class="form-label" style="margin-bottom:8px">From:</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:var(--sp-4)">
            ${sourceLabels
              .map(
                (l) => `<span class="badge badge-green">${escapeHtml(l)}</span>`
              )
              .join("")}
          </div>

          <div class="form-label" style="margin-bottom:4px">Purpose:</div>
          <p class="card-text" style="margin-bottom:var(--sp-3)">${escapeHtml(
            schema.purpose
          )}</p>

          <p class="form-hint">Consent expires 15 minutes after you allow access. You can revoke it at any time; nothing is fetched until you explicitly allow it below.</p>
        </div>

        <div style="display:flex;gap:var(--sp-3);margin-top:var(--sp-6)">
          <button class="btn btn-secondary" onclick="govBackToList()">Cancel</button>
          <button class="btn btn-primary btn-block ${
            this.state.loading ? "btn-loading" : ""
          }" ${this.state.loading ? "disabled" : ""} onclick="govGiveConsent()">
            ${Icons.shield} Allow &amp; Fetch My Data
          </button>
        </div>
      </div>
    `;
  },

  renderPreparing() {
    return `
      ${this.stepBar()}
      <div style="text-align:center;padding:var(--sp-10) 0">
        <div class="spinner"></div>
        <p class="form-hint" style="margin-top:var(--sp-3);font-weight:600">
          ${
            this.state.consentToken
              ? "Fetching authorized data and preparing your application..."
              : "Creating secure consent..."
          }
        </p>
      </div>
    `;
  },

  renderForm() {
    const schema = this.state.schema;
    const rows = schema.fields
      .map((f) =>
        FieldRenderer.row(
          this.state.fields[f.fieldId],
          this.state.formErrors[f.fieldId]
        )
      )
      .join("");

    return `
      ${this.stepBar()}
      ${this.errorBanner()}
      <button class="btn btn-ghost btn-sm" onclick="govBackToList()">← Start over</button>
      <div class="card" style="max-width:640px;margin:var(--sp-4) auto 0">
        <div class="card-title">${escapeHtml(schema.serviceName)}</div>
        <p class="form-hint" style="margin-bottom:var(--sp-4)">Review the auto-filled information below and complete anything marked as required.</p>
        <form onsubmit="event.preventDefault();govGoToReview();">
          ${rows}
          <button type="submit" class="btn btn-primary btn-block" style="margin-top:var(--sp-3)">Continue to Review ${
            Icons.arrowRight
          }</button>
        </form>
      </div>
    `;
  },

  renderReview() {
    const schema = this.state.schema;
    const rows = schema.fields
      .map((f) => FieldRenderer.reviewRow(this.state.fields[f.fieldId]))
      .join("");

    return `
      ${this.stepBar()}
      ${this.errorBanner()}
      <div class="card" style="max-width:640px;margin:0 auto">
        <div class="card-title">Review Your Application</div>
        <p class="form-hint" style="margin-bottom:var(--sp-4)">${escapeHtml(
          schema.serviceName
        )} — please check everything below before confirming.</p>
        ${rows}
        <div class="card" style="background:var(--clr-bg-subtle,#f6f8fa);margin-top:var(--sp-5);margin-bottom:0">
          <div class="card-title" style="font-size:var(--fs-md)">Confirm Application Submission</div>
          <p class="form-hint" style="margin:0">Please review your information above before submitting. Once submitted, this application will be recorded by e-Samanvit.</p>
        </div>
        <div style="display:flex;gap:var(--sp-3);margin-top:var(--sp-5)">
          <button class="btn btn-secondary btn-block" ${
            this.state.submitting ? "disabled" : ""
          } onclick="govBackToForm()">Back &amp; Edit</button>
          <button class="btn btn-primary btn-block ${
            this.state.submitting ? "btn-loading" : ""
          }" ${
      this.state.submitting ? "disabled" : ""
    } onclick="govConfirm()" aria-busy="${
      this.state.submitting ? "true" : "false"
    }">
            ${this.state.submitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    `;
  },

  renderDone() {
    const app = this.state.application;
    return `
      ${this.stepBar()}
      <div class="card" style="max-width:640px;margin:0 auto;text-align:center">
        <div class="card-icon card-icon-green" style="margin:0 auto">${
          Icons.check
        }</div>
        <div class="card-title">Application Submitted</div>
        <p class="card-text">Your application has been recorded by e-Samanvit. This prototype does not yet deliver it to the concerned department's own system — that integration doesn't exist here (see the mock data sources this demo uses).</p>
        ${
          app
            ? `
          <div class="card" style="background:var(--clr-bg-subtle,#f6f8fa);margin-top:var(--sp-4);text-align:left">
            <div class="form-label">Application Reference</div>
            <p class="card-text" style="font-family:monospace;word-break:break-all">${escapeHtml(
              app.applicationId
            )}</p>
            <div class="form-label" style="margin-top:var(--sp-2)">Status</div>
            <p class="card-text">${escapeHtml(app.status)}</p>
            <div class="form-label" style="margin-top:var(--sp-2)">Submitted</div>
            <p class="card-text">${escapeHtml(formatDate(app.submittedAt))}</p>
          </div>
        `
            : ""
        }
        <div style="display:flex;gap:var(--sp-3);margin-top:var(--sp-4);justify-content:center;flex-wrap:wrap">
          <button class="btn btn-secondary" onclick="navigateTo('my-applications')">View My Applications</button>
          <button class="btn btn-primary" onclick="govBackToList()">Start Another Application</button>
        </div>
      </div>
    `;
  },

  // -- Data / actions --------------------------------------------------

  async onMount() {
    if (
      this.state.step === "list" &&
      this.state.services.length === 0 &&
      !this.state.loading
    ) {
      await this.loadServices();
    }
  },

  async loadServices() {
    const requestId = ++this.state.servicesRequestId;

    this.state.loading = true;
    this.state.error = null;
    this.refresh();

    try {
      const res = await ServicesApi.list();

      // Ignore a response from an older request.
      if (requestId !== this.state.servicesRequestId) {
        return;
      }

      this.state.services = res.services || [];
      this.state.error = null;
    } catch (e) {
      // Ignore errors from an older request.
      if (requestId !== this.state.servicesRequestId) {
        return;
      }

      this.state.error = friendlyErrorMessage(e);
    } finally {
      // Only the latest request controls loading/UI state.
      if (requestId !== this.state.servicesRequestId) {
        return;
      }

      this.state.loading = false;
      this.refresh();
    }
  },

  async selectService(serviceId) {
    this.state.loading = true;
    this.state.error = null;
    this.refresh();
    try {
      const res = await ServicesApi.detail(serviceId);
      this.state.schema = res.service;
      this.state.step = "consent";
    } catch (e) {
      this.state.error = friendlyErrorMessage(e);
    } finally {
      this.state.loading = false;
      this.refresh();
    }
  },

  backToList() {
    this.state.step = "list";
    this.state.schema = null;
    this.state.consent = null;
    this.state.consentToken = null; // discard — never carried across a restarted flow
    this.state.fields = {};
    this.state.formErrors = {};
    this.state.error = null;
    this.state.submitting = false;
    this.state.application = null;
    this.refresh();
  },

  backToForm() {
    this.state.step = "form";
    this.refresh();
  },

  /** Requirements are derived from the schema — the citizen never types a source or field list themselves. */
  deriveRequirements() {
    const schema = this.state.schema;
    const fields = [
      ...new Set(schema.fields.map((f) => f.commonDataPath).filter(Boolean)),
    ];
    return { sources: schema.requiredSources, fields };
  },

  async giveConsent() {
    // Same rapid-double-invocation backstop as confirm() above.
    if (this.state.loading) return;
    const { sources, fields } = this.deriveRequirements();
    this.state.loading = true;
    this.state.error = null;
    this.state.step = "preparing";
    this.refresh();
    try {
      const consentRes = await ConsentApi.create({
        citizenId: GOV_DEMO_CITIZEN_ID,
        purpose: this.state.schema.purpose,
        sources,
        requestedFields: fields,
        expiresInMinutes: 15,
      });
      this.state.consent = consentRes.consent;
      this.state.consentToken = consentRes.consentToken; // held in memory only for this flow
      await this.prepareService();
    } catch (e) {
      this.state.error = friendlyErrorMessage(e);
      this.state.step = "consent";
      this.state.loading = false;
      this.refresh();
    }
  },

  async prepareService() {
    try {
      const res = await ServicesApi.prepare(this.state.schema.serviceId, {
        citizenId: GOV_DEMO_CITIZEN_ID,
        consentToken: this.state.consentToken,
      });
      this.state.missingRequiredFields = res.missingRequiredFields || [];
      const fields = {};
      for (const field of this.state.schema.fields) {
        const mapped = res.fields[field.fieldId] || {
          value: null,
          autoFilled: false,
          missing: true,
          source: null,
        };
        fields[field.fieldId] = {
          ...field,
          originalValue: mapped.value,
          currentValue: mapped.value,
          autoFilled: mapped.autoFilled,
          source: mapped.source,
          missing: mapped.missing,
          modified: false,
        };
      }
      this.state.fields = fields;
      this.state.step = "form";
    } catch (e) {
      this.state.error = friendlyErrorMessage(e);
      this.state.step = "consent";
    } finally {
      this.state.loading = false;
      this.refresh();
    }
  },

  updateField(fieldId, value) {
    const f = this.state.fields[fieldId];
    if (!f) return;
    f.currentValue = value;
    f.modified = value !== f.originalValue;
    // Intentionally no refresh() here — re-rendering on every keystroke
    // would rebuild the DOM and steal focus from whatever input the
    // citizen is typing in. The next actual render happens on step change.
  },

  goToReview() {
    const errors = validateAllFields(
      this.state.schema.fields,
      this.valuesOnly()
    );
    this.state.formErrors = errors;
    if (Object.keys(errors).length > 0) {
      this.refresh();
      return;
    }
    this.state.step = "review";
    this.refresh();
  },

  valuesOnly() {
    const out = {};
    for (const [id, f] of Object.entries(this.state.fields))
      out[id] = f.currentValue;
    return out;
  },

  /**
   * Submits the reviewed application (Prompt 7). Sends only
   * { serviceId, citizenId, consentToken, fields } — never a `source`
   * or `autoFilled` claim for any field; the backend independently
   * recomputes which fields are genuinely government-sourced from a
   * fresh consent-gated fetch (see ApplicationService.reconcileFields)
   * rather than trusting anything this file asserts about provenance.
   *
   * A 422 (APPLICATION_INCOMPLETE / APPLICATION_VALIDATION_FAILED)
   * means the backend's own validation caught something this file's
   * checks (goToReview) didn't — it's sent back to the form with
   * those specific fields flagged, not just a generic error.
   */
  async confirm() {
    // Guards against a second invocation firing before refresh()'s
    // disabled-button state has actually painted (e.g. a fast double
    // click/tap, or Enter-key repeat) — the UI-disabled state above is
    // the primary defense, this is the belt-and-suspenders backstop.
    // The backend is also idempotent per consent token regardless
    // (see ApplicationService.submitApplication), so this can never
    // cause a duplicate Application record even if it were bypassed.
    if (this.state.submitting) return;
    this.state.submitting = true;
    this.state.error = null;
    this.refresh();
    try {
      const res = await ApplicationsApi.submit({
        serviceId: this.state.schema.serviceId,
        citizenId: GOV_DEMO_CITIZEN_ID,
        consentToken: this.state.consentToken,
        fields: this.valuesOnly(),
      });
      this.state.application = res.application;
      this.state.step = "done";
    } catch (e) {
      if (
        e.code === "APPLICATION_INCOMPLETE" ||
        e.code === "APPLICATION_VALIDATION_FAILED"
      ) {
        const errors = {};
        for (const fieldId of e.missingFields || [])
          errors[fieldId] = "This field is required.";
        Object.assign(errors, e.fieldErrors || {});
        this.state.formErrors = errors;
        this.state.step = "form";
        this.state.error =
          "A few things need fixing before this can be submitted.";
      } else {
        this.state.error = friendlyErrorMessage(e);
      }
    } finally {
      this.state.submitting = false;
      this.refresh();
    }
  },

  retry() {
    this.state.error = null;
    if (this.state.step === "list") return this.loadServices();
    if (this.state.step === "consent") return this.refresh();
    if (this.state.step === "preparing") return this.giveConsent();
    if (this.state.step === "review") return this.confirm();
    this.refresh();
  },
};

// -- Citizen-safe error messages (never expose raw backend errors) ------
function friendlyErrorMessage(err) {
  if (!err || err.status === undefined || err.status === null) {
    return "Unable to connect to e-Samanvit services. Please try again.";
  }
  const byCode = {
    CONSENT_TOKEN_MISSING:
      "Your consent has expired. Please provide consent again.",
    CONSENT_TOKEN_INVALID:
      "Your consent has expired. Please provide consent again.",
    CONSENT_EXPIRED: "Your consent has expired. Please provide consent again.",
    CONSENT_REVOKED: "Your consent has expired. Please provide consent again.",
    CONSENT_SCOPE_VIOLATION:
      "This service requires information that is not included in your current consent.",
    CONSENT_CITIZEN_MISMATCH:
      "This service requires information that is not included in your current consent.",
    SERVICE_NOT_FOUND: "This service is temporarily unavailable.",
    INVALID_REQUEST:
      "Something about this request was incomplete. Please try again.",
    APPLICATION_NOT_FOUND: "That application could not be found.",
  };
  return (
    (err.code && byCode[err.code]) || "Something went wrong. Please try again."
  );
}

// -- Global handlers wired from onclick/oninput in the templates above --
function govSelectService(id) {
  GovServices.selectService(id);
}
function govBackToList() {
  GovServices.backToList();
}
function govBackToForm() {
  GovServices.backToForm();
}
function govGiveConsent() {
  GovServices.giveConsent();
}
function govUpdateField(id, value) {
  GovServices.updateField(id, value);
}
function govGoToReview() {
  GovServices.goToReview();
}
function govConfirm() {
  GovServices.confirm();
}
function govRetry() {
  GovServices.retry();
}

// -- Page entry point (registered with the router in app.js) ------------
function renderGovServicesPage() {
  return `
    ${renderPublicNavbar("gov-services")}
    <div class="page-layout">
      <section class="section">
        <div class="container" style="max-width:1100px">
          <div id="govServicesRoot">${GovServices.renderBody()}</div>
        </div>
      </section>
      ${renderFooter()}
    </div>
  `;
}
