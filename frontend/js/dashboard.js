/* ============================================================
   e-Samanvit - Citizen & Public Services Dashboard
   ============================================================ */

function renderDashboardPage() {
  const activeServices = [
    { title: I18N.t('srvPmKisanTitle'), status: I18N.t('statusBenefitDisbursed'), date: '2026-08-20', statusColor: 'green', amount: '₹2,000' },
    { title: I18N.t('srvNspTitle'), status: I18N.t('statusAppVerified'), date: '2026-08-25', statusColor: 'gold', amount: '₹12,000' },
    { title: I18N.t('srvKccTitle'), status: I18N.t('statusApproved'), date: '2026-08-15', statusColor: 'blue', amount: I18N.t('statusActiveLimit') },
    { title: I18N.t('srvSoilHealthTitle'), status: I18N.t('statusReportReady'), date: '2026-08-22', statusColor: 'green', amount: I18N.t('statusFreeTest') },
  ];

  return `
    ${renderPublicNavbar('dashboard')}
    <div class="page-layout">
      <!-- Dashboard Header -->
      <section class="dash-header" style="background: linear-gradient(90deg, rgba(13, 59, 23, 0.82) 0%, rgba(18, 77, 36, 0.65) 50%, rgba(13, 59, 23, 0.80) 100%), url('assets/hero_nature_bg.png') center center / cover no-repeat !important; color: var(--clr-white); padding: var(--sp-8) 0; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);">
        <div class="container" style="position:relative; z-index:2">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
            <div style="display:flex;align-items:center;gap:18px">
              <img src="assets/logo.jpg" alt="e-Samanvit" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid #ffffff;box-shadow:0 4px 16px rgba(0,0,0,0.25);flex-shrink:0;background:#ffffff;display:block;">
              <div>
                <span class="badge badge-gold" style="font-size:11px">${I18N.t('badgeCitizenDashboard')}</span>
                <h1 style="font-size:var(--fs-2xl);color:var(--clr-white);margin-top:4px;margin-bottom:2px">${I18N.t('dashTitle')}</h1>
                <div style="font-size:var(--fs-sm);color:var(--clr-primary-100);max-width:520px;line-height:1.4">One place to access, prepare and track government services — fetch your verified data once, reuse it across every application.</div>
              </div>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
              <button class="btn btn-secondary btn-sm" onclick="navigateTo('gov-services')">${Icons.plus} Apply for a Service</button>
              <button class="btn btn-secondary btn-sm" onclick="navigateTo('my-applications')">${Icons.fileText} My Applications</button>
              <button class="btn btn-primary btn-sm" onclick="showToast('${I18N.t('dashMetricsUpdated')}', 'success')">${Icons.refresh} ${I18N.t('refreshStatus')}</button>
            </div>
          </div>
        </div>
      </section>
      <div style="width:100%; height:4px; background:linear-gradient(90deg, #ff9933 0%, #ff9933 33.3%, #ffffff 33.3%, #ffffff 66.6%, #138808 66.6%, #138808 100%); box-shadow:0 2px 8px rgba(0,0,0,0.12); position:relative; z-index:3;"></div>

      <section class="section" style="background:var(--clr-gray-50);padding-bottom:0">
        <div class="container">
          <!-- e-Samanvit Applications summary — real data from GET /api/applications, loaded async via Dashboard.onMount() -->
          <div class="card" id="dashAppsSummary" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:var(--sp-8)">
            <div style="display:flex;align-items:center;gap:12px">
              <div class="card-icon card-icon-blue" style="margin:0">${Icons.fileText}</div>
              <div>
                <div class="card-title" style="margin-bottom:2px">e-Samanvit Applications</div>
                <div class="form-hint" id="dashAppsSummaryText">Checking your submitted applications…</div>
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="navigateTo('my-applications')">View My Applications ${Icons.arrowRight}</button>
          </div>

          <!-- Recommended For You + My Filled Forms — real data from
               GET /api/services + GET /api/applications, loaded async
               via Dashboard.onMount(). A service moves from the
               Recommended grid to the Filled Forms list the moment it
               has a submitted application (see onMount() below). -->
          <!-- Recommended For You + My Filled Forms (2-Column Balanced Dashboard Grid) -->
          <div class="dash-recommend-forms-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(360px, 1fr));gap:var(--sp-6);margin-bottom:var(--sp-8);align-items:stretch">
            <!-- Card 1: Recommended For You -->
            <div class="card" style="padding:var(--sp-6);border-radius:var(--radius-xl);display:flex;flex-direction:column;box-shadow:0 4px 18px rgba(0,0,0,0.04);background:#ffffff">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-5);flex-wrap:wrap;gap:10px;padding-bottom:14px;border-bottom:1px solid var(--clr-gray-200)">
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="width:36px;height:36px;border-radius:10px;background:#fef3c7;color:#d97706;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">
                    ${Icons.star}
                  </div>
                  <div>
                    <h3 style="color:var(--clr-primary-950);margin:0;font-size:1.15rem;font-weight:700">Recommended For You</h3>
                    <div style="font-size:12px;color:var(--clr-gray-500)">Tailored citizen services for your profile</div>
                  </div>
                </div>
                <span class="badge badge-gold" id="dashRecommendedCount" style="font-size:11px;font-weight:700"></span>
              </div>
              <div id="dashRecommended" style="display:flex;flex-direction:column;gap:10px;flex:1">
                <div class="form-hint" style="padding:20px 0;text-align:center">Loading available services…</div>
              </div>
            </div>

            <!-- Card 2: My Filled Forms -->
            <div class="card" style="padding:var(--sp-6);border-radius:var(--radius-xl);display:flex;flex-direction:column;box-shadow:0 4px 18px rgba(0,0,0,0.04);background:#ffffff">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-5);flex-wrap:wrap;gap:10px;padding-bottom:14px;border-bottom:1px solid var(--clr-gray-200)">
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="width:36px;height:36px;border-radius:10px;background:#ecfdf5;color:#059669;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">
                    ${Icons.check}
                  </div>
                  <div>
                    <h3 style="color:var(--clr-primary-950);margin:0;font-size:1.15rem;font-weight:700">My Filled Forms</h3>
                    <div style="font-size:12px;color:var(--clr-gray-500)">Track submitted & ongoing applications</div>
                  </div>
                </div>
                <button class="btn btn-ghost btn-sm" onclick="navigateTo('my-applications')" style="font-weight:600;display:inline-flex;align-items:center;gap:4px">
                  View All ${Icons.arrowRight}
                </button>
              </div>
              <div id="dashFilledForms" style="display:flex;flex-direction:column;gap:10px;flex:1">
                <div class="form-hint" style="padding:20px 0;text-align:center">Loading your submitted applications…</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="background:var(--clr-gray-50);padding-top:0">
        <div class="container">
          <!-- Metric Stat Cards -->
          <div class="grid grid-4" style="gap:var(--sp-6);margin-bottom:var(--sp-8)">
            <div class="card text-center" style="border-top:4px solid var(--clr-primary-600)">
              <div style="font-size:var(--fs-3xl);font-weight:var(--fw-bold);color:var(--clr-primary-900)">4</div>
              <div style="font-size:var(--fs-sm);color:var(--clr-gray-600);margin-top:4px">${I18N.t('statActiveServices')}</div>
            </div>

            <div class="card text-center" style="border-top:4px solid var(--clr-success)">
              <div style="font-size:var(--fs-3xl);font-weight:var(--fw-bold);color:var(--clr-success)">₹14,000</div>
              <div style="font-size:var(--fs-sm);color:var(--clr-gray-600);margin-top:4px">${I18N.t('statDbtReceived')}</div>
            </div>

            <div class="card text-center" style="border-top:4px solid var(--clr-accent-600)">
              <div style="font-size:var(--fs-3xl);font-weight:var(--fw-bold);color:var(--clr-accent-700)">1</div>
              <div style="font-size:var(--fs-sm);color:var(--clr-gray-600);margin-top:4px">${I18N.t('statUnderVerification')}</div>
            </div>

            <div class="card text-center" style="border-top:4px solid var(--clr-info)">
              <div style="font-size:var(--fs-3xl);font-weight:var(--fw-bold);color:var(--clr-info)">100%</div>
              <div style="font-size:var(--fs-sm);color:var(--clr-gray-600);margin-top:4px">${I18N.t('statInteroperableApis')}</div>
            </div>
          </div>

          <!-- Active Services Tracking Table -->
          <div class="card" style="padding:var(--sp-6);margin-bottom:var(--sp-8)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-6);flex-wrap:wrap;gap:12px">
              <h3 style="color:var(--clr-primary-900);margin:0">${I18N.t('dashActiveSchemes')}</h3>
              <button class="btn btn-ghost btn-sm" onclick="navigateTo('services')">${I18N.t('exploreAllSchemes')} ${Icons.arrowRight}</button>
            </div>

            <div style="overflow-x:auto">
              <table class="data-table" style="width:100%;border-collapse:collapse;font-size:14px">
                <thead>
                  <tr style="background:var(--clr-gray-100);text-align:left;border-bottom:2px solid var(--clr-gray-300)">
                    <th style="padding:12px">${I18N.t('colServiceName')}</th>
                    <th style="padding:12px">${I18N.t('colLastUpdated')}</th>
                    <th style="padding:12px">${I18N.t('colBenefitValue')}</th>
                    <th style="padding:12px">${I18N.t('colStatus')}</th>
                    <th style="padding:12px;text-align:right">${I18N.t('colAction')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${activeServices.map(s => `
                    <tr style="border-bottom:1px solid var(--clr-gray-200)">
                      <td style="padding:12px;font-weight:var(--fw-bold);color:var(--clr-primary-900)">${s.title}</td>
                      <td style="padding:12px;color:var(--clr-gray-600)">${s.date}</td>
                      <td style="padding:12px;font-weight:var(--fw-semibold);color:var(--clr-primary-800)">${s.amount}</td>
                      <td style="padding:12px">
                        <span class="badge ${s.statusColor === 'green' ? 'badge-green' : s.statusColor === 'gold' ? 'badge-gold' : 'badge-blue'}" style="font-size:11px">${s.status}</span>
                      </td>
                      <td style="padding:12px;text-align:right">
                        <button class="btn btn-secondary btn-sm" onclick="showToast('${I18N.t('loadingStatusDetails', { title: s.title })}', 'info')">${I18N.t('trackApp')}</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Quick Action & Support Cards -->
          <div class="grid grid-3" style="gap:var(--sp-6)">
            <div class="card card-hover">
              <div class="card-icon card-icon-green">${Icons.fileText}</div>
              <div class="card-title">${I18N.t('cardDbtTitle')}</div>
              <div class="card-text">${I18N.t('cardDbtDesc')}</div>
              <button class="btn btn-ghost btn-sm" onclick="showToast('DBT portal connected.', 'info')">${I18N.t('checkDbtBtn')} ${Icons.arrowRight}</button>
            </div>

            <div class="card card-hover">
              <div class="card-icon card-icon-gold">${Icons.trendingUp}</div>
              <div class="card-title">${I18N.t('cardMandiTitle')}</div>
              <div class="card-text">${I18N.t('cardMandiDesc')}</div>
              <button class="btn btn-ghost btn-sm" onclick="navigateTo('services')">${I18N.t('viewPricesBtn')} ${Icons.arrowRight}</button>
            </div>

            <div class="card card-hover">
              <div class="card-icon card-icon-blue">${Icons.helpCircle}</div>
              <div class="card-title">${I18N.t('cardHelpTitle')}</div>
              <div class="card-text">${I18N.t('cardHelpDesc')}</div>
              <button class="btn btn-ghost btn-sm" onclick="navigateTo('contact')">${I18N.t('getAssistanceBtn')} ${Icons.arrowRight}</button>
            </div>
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

/**
 * Dashboard — real-data hook for the small "e-Samanvit Applications"
 * summary card above. This is the ONLY part of the dashboard that
 * talks to the real backend (Prompt 7/8's ApplicationsApi); the
 * pre-existing stat cards and "Active Schemes" table above/below it
 * remain illustrative mock content from earlier prompts and are left
 * untouched (Prompt 9 scope — see README).
 *
 * Deliberately non-blocking and low-drama: if the backend is
 * unreachable or returns nothing, the card quietly falls back to a
 * neutral prompt to apply rather than showing a scary error banner —
 * this is a summary widget, not a critical flow.
 */
const Dashboard = {
  async onMount() {
    if (typeof initGreenMicroBubbles === 'function') {
      try { initGreenMicroBubbles(); } catch (e) {}
    }
    await this.loadAppsSummary();
    await this.loadRecommendedAndFilled();
    if (typeof initGreenMicroBubbles === 'function') {
      try { initGreenMicroBubbles(); } catch (e) {}
    }
  },

  async loadAppsSummary() {
    const textEl = document.getElementById('dashAppsSummaryText');
    if (!textEl || typeof ApplicationsApi === 'undefined' || typeof GOV_DEMO_CITIZEN_ID === 'undefined') return;
    try {
      const res = await ApplicationsApi.list(GOV_DEMO_CITIZEN_ID);
      const applications = res.applications || [];
      if (applications.length === 0) {
        textEl.textContent = "You haven't submitted any applications through e-Samanvit yet.";
        return;
      }
      const latest = applications[applications.length - 1];
      const count = applications.length;
      textEl.textContent = `${count} application${count === 1 ? '' : 's'} submitted through e-Samanvit — most recent: ${latest.serviceName} (${(latest.tracking && latest.tracking.label) || latest.status})`;
    } catch (e) {
      textEl.textContent = 'Apply for a government service to see it tracked here.';
    }
  },

  /**
   * Splits every registered, autofill-capable service (GET /api/services)
   * into "Recommended For You" (not yet applied for) and "My Filled
   * Forms" (already submitted), rendering each into its own container.
   *
   * The backend's submitted-applications list (GET /api/applications)
   * is always the source of truth for what counts as "filled" — it is
   * unioned with FilledFormsCache's local, instant-feedback hint (see
   * that file's comment) purely so a citizen who just submitted and
   * immediately returned to the Dashboard sees the correct split
   * without waiting on/hoping for a race-free network refresh. The
   * backend list is never overridden by the cache — only added to.
   */
  async loadRecommendedAndFilled() {
    const recommendedEl = document.getElementById('dashRecommended');
    const filledEl = document.getElementById('dashFilledForms');
    const countEl = document.getElementById('dashRecommendedCount');
    if (!recommendedEl || !filledEl) return;
    if (typeof ServicesApi === 'undefined' || typeof ApplicationsApi === 'undefined' || typeof GOV_DEMO_CITIZEN_ID === 'undefined') return;

    let services = [];
    let applications = [];
    try {
      const [servicesRes, applicationsRes] = await Promise.all([
        ServicesApi.list(),
        ApplicationsApi.list(GOV_DEMO_CITIZEN_ID)
      ]);
      services = servicesRes.services || [];
      applications = applicationsRes.applications || [];
    } catch (e) {
      recommendedEl.innerHTML = `
        <div style="text-align:center;padding:26px 16px;background:var(--clr-gray-50);border-radius:12px;border:1px dashed var(--clr-gray-300)">
          <div style="width:36px;height:36px;border-radius:50%;background:#fef3c7;color:#d97706;display:inline-flex;align-items:center;justify-content:center;margin-bottom:8px">
            ${Icons.refresh}
          </div>
          <div style="font-size:13px;font-weight:600;color:var(--clr-gray-700);margin-bottom:4px">Unable to load live recommendations</div>
          <div style="font-size:12px;color:var(--clr-gray-500);margin-bottom:10px">Backend service is connecting or temporarily offline.</div>
          <button class="btn btn-secondary btn-sm" style="padding:5px 14px;font-size:12px;display:inline-flex;align-items:center;gap:6px;cursor:pointer" onclick="Dashboard.loadRecommendedAndFilled()">
            ${Icons.refresh} Retry Connection
          </button>
        </div>`;
      filledEl.innerHTML = `
        <div style="text-align:center;padding:26px 16px;background:var(--clr-gray-50);border-radius:12px;border:1px dashed var(--clr-gray-300)">
          <div style="width:36px;height:36px;border-radius:50%;background:#ecfdf5;color:#059669;display:inline-flex;align-items:center;justify-content:center;margin-bottom:8px">
            ${Icons.fileText}
          </div>
          <div style="font-size:13px;font-weight:600;color:var(--clr-gray-700);margin-bottom:4px">Unable to fetch filled forms</div>
          <div style="font-size:12px;color:var(--clr-gray-500);margin-bottom:10px">View your locally submitted records or try again.</div>
          <button class="btn btn-ghost btn-sm" style="font-size:12px;display:inline-flex;align-items:center;gap:4px;cursor:pointer" onclick="navigateTo('my-applications')">
            Go to My Applications ${Icons.arrowRight}
          </button>
        </div>`;
      return;
    }

    const locallyFilledIds = (typeof FilledFormsCache !== 'undefined') ? FilledFormsCache.getAll() : [];
    const filledIds = new Set([...applications.map(a => a.serviceId), ...locallyFilledIds]);

    const recommended = services.filter(s => !filledIds.has(s.serviceId));
    const filledServices = services.filter(s => filledIds.has(s.serviceId));

    if (countEl) countEl.textContent = `${recommended.length} available`;

    recommendedEl.innerHTML = recommended.length === 0
      ? `<div style="text-align:center;padding:26px 16px;background:var(--clr-gray-50);border-radius:12px;border:1px dashed var(--clr-gray-200)">
           <div style="font-size:24px;margin-bottom:6px">🎉</div>
           <div style="font-weight:600;color:var(--clr-primary-900)">All Caught Up!</div>
           <div style="font-size:12px;color:var(--clr-gray-500);margin-top:2px">You've applied to every available service — nice work!</div>
         </div>`
      : recommended.map(s => `
          <div class="card card-hover" style="padding:14px 16px;background:#f8fafc;border:1px solid rgba(0,0,0,0.06);border-radius:12px;display:flex;justify-content:space-between;align-items:center;gap:12px;transition:all 0.2s ease">
            <div style="flex:1;min-width:0">
              <div style="font-weight:700;font-size:0.95rem;color:var(--clr-primary-950);margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${escapeHtml(s.serviceName)}">${escapeHtml(s.serviceName)}</div>
              <div style="font-size:12px;color:var(--clr-gray-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(s.department || 'Government of Maharashtra')}</div>
            </div>
            <button class="btn btn-primary btn-sm" style="flex-shrink:0;padding:6px 14px;border-radius:8px;font-weight:600;display:inline-flex;align-items:center;gap:4px" onclick="navigateTo('gov-services', {serviceId:'${encodeURIComponent(s.serviceId)}'})">
              ${Icons.zap} Apply
            </button>
          </div>
        `).join('');

    filledEl.innerHTML = filledServices.length === 0
      ? `<div style="text-align:center;padding:26px 16px;background:var(--clr-gray-50);border-radius:12px;border:1px dashed var(--clr-gray-200)">
           <div style="font-size:24px;margin-bottom:6px">📋</div>
           <div style="font-weight:600;color:var(--clr-primary-900)">Nothing Submitted Yet</div>
           <div style="font-size:12px;color:var(--clr-gray-500);margin-top:2px">Applications you complete will appear here with live tracking.</div>
         </div>`
      : filledServices.map(s => {
          const app = applications.find(a => a.serviceId === s.serviceId);
          const statusLabel = app ? ((app.tracking && app.tracking.label) || app.status) : 'Submitted';
          const dateLabel = app && app.submittedAt ? formatDate(app.submittedAt) : '';
          return `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:#f8fafc;border:1px solid rgba(0,0,0,0.06);border-radius:12px;gap:12px;transition:all 0.2s ease">
              <div style="flex:1;min-width:0">
                <div style="font-weight:700;font-size:0.95rem;color:var(--clr-primary-950);margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${escapeHtml(s.serviceName)}">${escapeHtml(s.serviceName)}</div>
                <div style="font-size:12px;color:var(--clr-gray-500)">${dateLabel ? 'Submitted ' + dateLabel + ' · ' : ''}<span class="badge badge-green" style="font-size:10px;padding:2px 8px">${escapeHtml(statusLabel)}</span></div>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="navigateTo('my-applications')" style="flex-shrink:0;padding:5px 10px;display:inline-flex;align-items:center;gap:4px">
                View ${Icons.arrowRight}
              </button>
            </div>
          `;
        }).join('');
  }
};
