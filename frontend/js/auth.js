/* ============================================================
   e-Samanvit - Auth (demo phone+OTP login)

   SCOPE, ON PURPOSE: this module gates ONLY the Dashboard/Profile
   page. Home, About, Services, Resources, Contact, Apply for a
   Service (gov-services), My Applications, and Scheme Details all
   stay publicly viewable with no login — see the check in
   App.navigate() in app.js, which is the ONLY place login is
   enforced. Nothing here blocks any other page.

   PROTOTYPE LOGIN LIMITATIONS (matches backend/src/controllers/auth.controller.js):
     1. Only the 2 demo phone numbers in backend/src/data/demoUsers.js
        can log in — a closed allow-list, not open registration.
     2. The OTP is always the fixed dev value '000000' until a real
        SMS/email provider is wired in (see the chat's OTP-provider
        discussion). devOtpHint below only exists because of this.

   Session storage is demo-only (localStorage). A production version
   should use an httpOnly cookie set by the server instead.
   ============================================================ */

const Auth = (function () {
  const SESSION_KEY = 'esamanvit_session_token';
  const USER_KEY = 'esamanvit_user';

  function apiBase() {
    return (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) || 'http://localhost:5000';
  }

  function isLoggedIn() {
    return !!(localStorage.getItem(SESSION_KEY) && localStorage.getItem(USER_KEY));
  }

  function getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setSession(sessionToken, user) {
    localStorage.setItem(SESSION_KEY, sessionToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
  }

  return { apiBase, isLoggedIn, getUser, setSession, logout };
})();

/**
 * Login gate page, rendered by App.navigate() in place of the
 * Dashboard/Profile page whenever Auth.isLoggedIn() is false. Reuses
 * the site's own navbar + .card/.btn styling so it doesn't look like
 * a separate app.
 */
function renderLoginGatePage() {
  return `
    ${renderPublicNavbar('dashboard')}
    <div class="page-layout">
      <section class="section" style="min-height:60vh;display:flex;align-items:center;justify-content:center">
        <div class="container" style="max-width:420px">
          <div class="card" style="padding:32px 28px">

            <div id="ag-step-phone">
              <h2 style="font-size:var(--fs-2xl);margin-bottom:4px">Login to continue</h2>
              <p style="font-size:var(--fs-sm);color:var(--clr-gray-600);margin-bottom:20px">
                Your Dashboard has your personal application data, so it's the one page that needs a quick login. Everything else on e-Samanvit stays open.
              </p>
              <label style="display:block;font-size:var(--fs-sm);font-weight:600;margin-bottom:6px">Mobile Number</label>
              <input id="ag-phone-input" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit mobile number"
                     style="width:100%;padding:12px 14px;font-size:var(--fs-md);border:1px solid var(--clr-gray-300);border-radius:10px;margin-bottom:14px">
              <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="AuthGate.requestOtp()">Send OTP</button>
              <div id="ag-phone-msg" style="display:none;margin-top:12px;padding:10px 12px;border-radius:8px;font-size:var(--fs-sm)"></div>
            </div>

            <div id="ag-step-otp" style="display:none">
              <h2 style="font-size:var(--fs-2xl);margin-bottom:4px">Verify OTP</h2>
              <p style="font-size:var(--fs-sm);color:var(--clr-gray-600);margin-bottom:20px">
                Enter the 6-digit code sent to <span id="ag-otp-phone-display"></span>.
              </p>
              <input id="ag-otp-input" type="tel" inputmode="numeric" maxlength="6" placeholder="6-digit OTP"
                     style="width:100%;padding:12px 14px;font-size:var(--fs-md);border:1px solid var(--clr-gray-300);border-radius:10px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0 14px">
                <span id="ag-otp-timer" style="font-size:var(--fs-xs);color:var(--clr-gray-600)">Code expires in 60s</span>
                <button id="ag-resend-btn" disabled onclick="AuthGate.requestOtp(true)"
                        style="background:none;border:none;padding:0;font-size:var(--fs-xs);font-weight:600;color:var(--clr-primary-700);cursor:pointer">Resend OTP</button>
              </div>
              <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="AuthGate.verifyOtp()">Verify &amp; Login</button>
              <div id="ag-otp-msg" style="display:none;margin-top:12px;padding:10px 12px;border-radius:8px;font-size:var(--fs-sm)"></div>
              <a href="javascript:void(0)" onclick="AuthGate.backToPhone()" style="display:inline-block;margin-top:16px;font-size:var(--fs-xs);color:var(--clr-gray-600)">&larr; Use a different number</a>
            </div>

            <div style="margin-top:22px;padding:14px;border-radius:10px;background:var(--clr-accent-100);font-size:var(--fs-xs);color:var(--clr-gray-800)">
              <strong style="color:var(--clr-primary-900)">Demo build — 2 users can log in right now</strong>
              <div style="margin-top:4px">OTP is fixed to <code>000000</code> for every user until a real SMS/email provider is wired in.</div>
              <table style="width:100%;margin-top:8px;border-collapse:collapse">
                <tr><td style="padding:3px 0">Aditi Sharma</td><td style="padding:3px 0">9999900001</td></tr>
                <tr><td style="padding:3px 0">Rahul Patil</td><td style="padding:3px 0">9999900002</td></tr>
              </table>
            </div>

          </div>
        </div>
      </section>
    </div>
  `;
}

/**
 * Wires up the login gate page's buttons/timer. Call from
 * App.afterRender() whenever the login gate was just rendered — same
 * "onMount" pattern the codebase already uses for GovServices,
 * MyApplications and Dashboard.
 */
const AuthGate = (function () {
  let currentPhone = '';
  let timerHandle = null;
  let secondsLeft = 0;

  function showMsg(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.style.display = 'block';
    const palette = {
      error: { bg: 'var(--clr-error-bg)', fg: 'var(--clr-error)' },
      info: { bg: 'var(--clr-info-bg)', fg: 'var(--clr-info)' },
      success: { bg: 'var(--clr-success-bg)', fg: 'var(--clr-success)' }
    }[type] || { bg: 'var(--clr-gray-100)', fg: 'var(--clr-gray-800)' };
    el.style.background = palette.bg;
    el.style.color = palette.fg;
  }

  function startTimer(seconds) {
    clearInterval(timerHandle);
    secondsLeft = seconds;
    const timerEl = document.getElementById('ag-otp-timer');
    const resendBtn = document.getElementById('ag-resend-btn');
    if (!timerEl || !resendBtn) return;
    resendBtn.disabled = true;
    timerEl.style.color = 'var(--clr-gray-600)';

    function tick() {
      if (secondsLeft <= 0) {
        clearInterval(timerHandle);
        timerEl.textContent = 'Code expired';
        timerEl.style.color = 'var(--clr-error)';
        resendBtn.disabled = false;
        return;
      }
      timerEl.textContent = 'Code expires in ' + secondsLeft + 's';
      secondsLeft -= 1;
    }
    tick();
    timerHandle = setInterval(tick, 1000);
  }

  async function requestOtp(isResend) {
    const phoneMsg = document.getElementById('ag-phone-msg');
    const otpMsg = document.getElementById('ag-otp-msg');
    const phone = isResend ? currentPhone : document.getElementById('ag-phone-input').value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showMsg(phoneMsg, 'Enter a valid 10-digit mobile number.', 'error');
      return;
    }

    try {
      const res = await fetch(Auth.apiBase() + '/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error((body && body.error && body.error.message) || 'Could not send OTP');

      currentPhone = phone;
      document.getElementById('ag-step-phone').style.display = 'none';
      document.getElementById('ag-step-otp').style.display = 'block';
      document.getElementById('ag-otp-phone-display').textContent = phone;
      document.getElementById('ag-otp-input').value = '';
      showMsg(otpMsg, 'OTP sent. For this demo, it is always ' + (body.devOtpHint || '000000') + '.', 'info');
      startTimer(body.expiresInSeconds || 60);
    } catch (err) {
      showMsg(phoneMsg, err.message, 'error');
    }
  }

  async function verifyOtp() {
    const otpMsg = document.getElementById('ag-otp-msg');
    const otp = document.getElementById('ag-otp-input').value.trim();

    if (!/^\d{6}$/.test(otp)) {
      showMsg(otpMsg, 'Enter the 6-digit OTP.', 'error');
      return;
    }

    try {
      const res = await fetch(Auth.apiBase() + '/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: currentPhone, otp })
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error((body && body.error && body.error.message) || 'Verification failed');

      clearInterval(timerHandle);
      Auth.setSession(body.sessionToken, body.user);
      if (typeof showToast === 'function') showToast('Logged in successfully', 'success');
      // Re-run navigation to whichever protected page the user was
      // headed to (Dashboard by default) — now that Auth.isLoggedIn()
      // is true, App.navigate() will render it instead of the gate.
      navigateTo(App.pendingProtectedPage || 'dashboard');
    } catch (err) {
      showMsg(otpMsg, err.message, 'error');
    }
  }

  function backToPhone() {
    clearInterval(timerHandle);
    document.getElementById('ag-step-otp').style.display = 'none';
    document.getElementById('ag-step-phone').style.display = 'block';
  }

  return { requestOtp, verifyOtp, backToPhone };
})();
