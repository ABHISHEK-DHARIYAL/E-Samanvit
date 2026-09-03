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
      <section style="background:linear-gradient(135deg, var(--clr-primary-900), var(--clr-primary-800));color:var(--clr-white);padding:var(--sp-8) 0">
        <div class="container">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
            <div style="display:flex;align-items:center;gap:16px">
              <img src="assets/logo.jpg" alt="e-Samanvit" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid var(--clr-white)">
              <div>
                <span class="badge badge-gold" style="font-size:11px">${I18N.t('badgeCitizenDashboard')}</span>
                <h1 style="font-size:var(--fs-2xl);color:var(--clr-white);margin-top:4px">${I18N.t('dashTitle')}</h1>
                <div style="font-size:var(--fs-sm);color:var(--clr-primary-100);max-width:520px">One place to access, prepare and track government services — fetch your verified data once, reuse it across every application.</div>
              </div>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" onclick="navigateTo('gov-services')">${Icons.plus} Apply for a Service</button>
              <button class="btn btn-secondary btn-sm" onclick="navigateTo('my-applications')">${Icons.fileText} My Applications</button>
              <button class="btn btn-primary btn-sm" onclick="showToast('${I18N.t('dashMetricsUpdated')}', 'success')">${Icons.refresh} ${I18N.t('refreshStatus')}</button>
            </div>
          </div>
        </div>
      </section>

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
  }
};
