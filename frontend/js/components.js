/* ============================================================
   e-Samanvit - Reusable Component Renderers
   ============================================================ */

// -- Navbar (Public Pages) -----------------------------------
function renderPublicNavbar(activePage) {
  // Main desktop links: Home, Services, About, Dashboard
  const navLinks = [
    { id: 'home', label: I18N.t('navHome'), icon: Icons.home },
    { id: 'services', label: I18N.t('navServices'), icon: Icons.services },
    { id: 'about', label: I18N.t('navAbout'), icon: Icons.about },
    { id: 'dashboard', label: I18N.t('navDashboard'), icon: Icons.dashboard },
  ];

  const navLinkIds = navLinks.map(l => l.id);

  // All menu items candidate for the slideout sidebar drawer
  const allSidebarLinks = [
    { id: 'home', label: I18N.t('navHome'), icon: Icons.home },
    { id: 'dashboard', label: I18N.t('navDashboard'), icon: Icons.dashboard },
    { id: 'gov-services', label: 'Apply Online', icon: Icons.zap },
    { id: 'my-applications', label: 'My Applications', icon: Icons.fileText },
    { id: 'services', label: I18N.t('navServices'), icon: Icons.services },
    { id: 'resources', label: I18N.t('navResources'), icon: Icons.resources },
    { id: 'about', label: I18N.t('navAbout'), icon: Icons.about },
    { id: 'contact', label: I18N.t('navContact'), icon: Icons.contact },
    { id: 'notifications', label: I18N.t('navNotifications'), icon: Icons.bell },
  ];

  // Exclude links displayed in main navbar header on desktop so each link appears exactly once
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;
  const sidebarLinks = isDesktop
    ? allSidebarLinks.filter(l => !navLinkIds.includes(l.id))
    : allSidebarLinks;

  return `
    <nav class="navbar" id="mainNavbar">
      <div class="navbar-inner">
        <div class="navbar-brand" onclick="navigateTo('home')">
          <img src="assets/logo.jpg" alt="e-Samanvit" class="navbar-brand-logo">
          <div class="navbar-brand-text">${I18N.t('brandName')}</div>
          <span class="navbar-brand-divider" aria-hidden="true"></span>
          <img src="assets/digital_india_logo.png" alt="Digital India" class="navbar-digital-india-logo">
        </div>

        <!-- Desktop Navigation: Home, About, Impact, Dashboard -->
        <div class="navbar-nav" id="navLinks">
          ${navLinks.map(l => `
            <a class="nav-link ${activePage === l.id ? 'active' : ''}" onclick="navigateTo('${l.id}')">${l.label}</a>
          `).join('')}
        </div>

        <!-- Desktop Right Section -->
        <div class="navbar-right navbar-desktop-right">
          <!-- Language Selector Dropdown -->
          <select class="lang-selector" onchange="I18N.setLanguage(this.value)" aria-label="${I18N.t('selectLanguage')}">
            <option value="en" ${I18N.currentLang === 'en' ? 'selected' : ''}>English</option>
            <option value="hi" ${I18N.currentLang === 'hi' ? 'selected' : ''}>हिंदी</option>
            <option value="mr" ${I18N.currentLang === 'mr' ? 'selected' : ''}>मराठी</option>
          </select>

          <!-- Notification Bell -->
          <div class="navbar-icon-btn nav-notif-btn" onclick="toggleNotifDropdown(event)" id="navNotifBtn" style="position:relative;" title="${I18N.t('navNotifications')}">
            ${Icons.bell}
            <span class="notif-badge" id="navNotifBadge">10</span>
          </div>

          <!-- Hamburger Menu Button (3 lines - Opens Sidebar Drawer) -->
          <button class="navbar-toggle" onclick="openMobileNav()" aria-label="${I18N.t('navMenu')}" title="${I18N.t('navMenu')}">
            ${Icons.menu}
          </button>
        </div>

        <!-- Mobile Top Right: ONLY 3-Bar Menu -->
        <div class="navbar-mobile-top">
          <button class="navbar-toggle" onclick="openMobileNav()" aria-label="${I18N.t('navMenu')}" title="${I18N.t('navMenu')}">
            ${Icons.menu}
          </button>
        </div>
      </div>

      <!-- Line 2 (Mobile Sub-bar): Home, Services, About, Dashboard | Notification Bell + Language Selector -->
      <div class="navbar-mobile-subbar">
        <div class="navbar-mobile-subnav">
          ${navLinks.map(l => `
            <a class="sub-nav-link ${activePage === l.id ? 'active' : ''}" onclick="navigateTo('${l.id}')">${l.label}</a>
          `).join('')}
        </div>
        <div class="navbar-mobile-subactions">
          <div class="navbar-icon-btn nav-notif-btn" onclick="toggleNotifDropdown(event)" id="mobileNavNotifBtn" style="position:relative;" title="${I18N.t('navNotifications')}">
            ${Icons.bell}
            <span class="notif-badge" id="mobileNavNotifBadge">10</span>
          </div>
          <select class="lang-selector mobile-lang-selector" onchange="I18N.setLanguage(this.value)" aria-label="${I18N.t('selectLanguage')}">
            <option value="en" ${I18N.currentLang === 'en' ? 'selected' : ''}>English</option>
            <option value="hi" ${I18N.currentLang === 'hi' ? 'selected' : ''}>हिंदी</option>
            <option value="mr" ${I18N.currentLang === 'mr' ? 'selected' : ''}>मराठी</option>
          </select>
        </div>
      </div>

      <!-- Notification Dropdown -->
      ${renderNotifDropdown()}
    </nav>

    <!-- Slideout Sidebar Drawer Overlay -->
    <div class="mobile-nav-overlay" id="mobileNavOverlay" onclick="closeMobileNav()"></div>
    <div class="mobile-nav" id="mobileNav">
      <div class="mobile-nav-header">
        <div class="navbar-brand" onclick="navigateTo('home');closeMobileNav();">
          <img src="assets/logo.jpg" alt="e-Samanvit" class="navbar-brand-logo" style="width:32px;height:32px">
          <div class="navbar-brand-text" style="font-size:var(--fs-lg)">${I18N.t('brandName')}</div>
          <span class="navbar-brand-divider" aria-hidden="true"></span>
          <img src="assets/digital_india_logo.png" alt="Digital India" class="navbar-digital-india-logo" style="height:24px">
        </div>
        <button class="mobile-nav-close" onclick="closeMobileNav()">${Icons.x}</button>
      </div>

      <div class="mobile-nav-links">
        <div style="font-size:var(--fs-xs);font-weight:var(--fw-bold);text-transform:uppercase;color:var(--clr-gray-500);letter-spacing:0.5px;padding:var(--sp-2) var(--sp-4) 0">${I18N.t('navMenu')}</div>
        ${sidebarLinks.map(l => `
          <a class="mobile-nav-link ${activePage === l.id ? 'active' : ''}" onclick="navigateTo('${l.id}');closeMobileNav();">${l.icon} ${l.label}</a>
        `).join('')}

        <!-- Dark Mode Toggle Option inside Menu Drawer -->
        <div class="mobile-nav-divider"></div>
        <button class="mobile-nav-link theme-toggle-btn theme-toggle-btn-with-label" onclick="toggleTheme()" id="menuThemeToggleBtn" style="border:none;background:none;width:100%;font-family:inherit;">
          ${(typeof Accessibility !== 'undefined' && Accessibility.theme === 'dark') ? Icons.sun : Icons.moon}
          <span>${(typeof Accessibility !== 'undefined' && Accessibility.theme === 'dark') ? I18N.t('lightMode') : I18N.t('darkMode')}</span>
        </button>
      </div>
    </div>
  `;
}

function openMobileNav() {
  document.getElementById('mobileNavOverlay')?.classList.add('open');
  document.getElementById('mobileNav')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  document.getElementById('mobileNavOverlay')?.classList.remove('open');
  document.getElementById('mobileNav')?.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleNotifDropdown(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('notifDropdown');
  if (!dd) return;
  
  const isOpen = dd.classList.contains('open');
  document.querySelectorAll('.dropdown.open, .notif-dropdown.open').forEach(n => n.classList.remove('open'));
  
  if (!isOpen) {
    dd.classList.add('open');
  }
}

function closeNotifDropdown(e) {
  if (e) e.stopPropagation();
  document.getElementById('notifDropdown')?.classList.remove('open');
}

// Global click handler to close dropdown when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const dd = document.getElementById('notifDropdown');
    if (dd && dd.classList.contains('open')) {
      if (!e.target.closest('#navNotifBtn, #mobileNavNotifBtn, .nav-notif-btn') && !dd.contains(e.target)) {
        dd.classList.remove('open');
      }
    }
  });
}

// -- Notification Dropdown (Top 10 Live Government Alerts) ------
function renderNotifDropdown() {
  const notifications = getNotifications();
  return `
    <div class="notif-dropdown" id="notifDropdown" onclick="event.stopPropagation()">
      <div class="notif-dropdown-header">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#16a34a;box-shadow:0 0 0 2px rgba(22,163,74,0.3)"></span>
          <h4 style="margin:0">${I18N.t('top10Notifs')}</h4>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="btn btn-ghost btn-sm" onclick="markAllRead()" style="padding:2px 8px;font-size:11px">${I18N.t('markAllRead')}</button>
          <button class="btn btn-ghost btn-sm" onclick="closeNotifDropdown(event)" style="padding:2px 6px;font-size:14px;color:var(--clr-gray-500)" title="${I18N.t('close')}">✕</button>
        </div>
      </div>
      
      <div class="notif-dropdown-body">
        ${notifications.map(n => `
          <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="navigateTo('notifications');closeNotifDropdown(event);">
            <div class="notif-dot ${n.unread ? '' : 'read'}"></div>
            <div class="notif-content">
              <div class="notif-title">
                <span>${n.title}</span>
                <span class="badge ${n.badgeColor || 'badge-green'}" style="font-size:10px;padding:2px 6px">${n.tag}</span>
              </div>
              <div class="notif-text">${n.text}</div>
              <div class="notif-time">
                <span>🕒 ${timeAgo(n.date)}</span>
                <span style="color:var(--clr-primary-700);font-weight:600">• ${n.source}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="notif-dropdown-footer">
        <button class="btn btn-ghost btn-sm" onclick="refreshLiveFeed(event)" style="padding:4px 8px;display:inline-flex;align-items:center;gap:4px">${Icons.refresh} ${I18N.t('refreshFeed')}</button>
        <a onclick="event.stopPropagation();navigateTo('notifications');closeNotifDropdown(event);" style="color:var(--clr-primary-800);font-weight:700">${I18N.t('viewAll')} →</a>
      </div>
    </div>
  `;
}

// -- Sidebar (Fallback / Additional Nav) ---------------------
function renderSidebar(activePage) {
  const mainLinks = [
    { id: 'dashboard', label: I18N.t('navDashboard'), icon: Icons.dashboard },
    { id: 'home', label: I18N.t('navHome'), icon: Icons.home },
    { id: 'gov-services', label: 'Apply Online', icon: Icons.zap },
    { id: 'my-applications', label: 'My Applications', icon: Icons.fileText },
    { id: 'services', label: I18N.t('navServices'), icon: Icons.services },
    { id: 'resources', label: I18N.t('navResources'), icon: Icons.resources },
    { id: 'about', label: I18N.t('navAbout'), icon: Icons.about },
    { id: 'contact', label: I18N.t('navContact'), icon: Icons.contact },
  ];

  return `
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
    <aside class="sidebar" id="dashSidebar">
      <div class="sidebar-section">
        <div class="sidebar-section-title">${I18N.t('navMenu')}</div>
        ${mainLinks.map(l => `
          <a class="sidebar-link ${activePage === l.id ? 'active' : ''}" onclick="navigateTo('${l.id}')">${l.icon} ${l.label}</a>
        `).join('')}
      </div>
    </aside>
  `;
}

function openSidebar() {
  document.getElementById('sidebarOverlay')?.classList.add('open');
  document.getElementById('dashSidebar')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  document.getElementById('sidebarOverlay')?.classList.remove('open');
  document.getElementById('dashSidebar')?.classList.remove('open');
  document.body.style.overflow = '';
}

// -- Footer --------------------------------------------------
function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">
              <img src="assets/logo.jpg" alt="e-Samanvit" style="width:36px;height:36px;border-radius:8px">
              <div class="footer-brand-text">${I18N.t('brandName')}</div>
            </div>
            <p class="footer-desc">${I18N.t('footerDesc')}</p>
            <div style="margin-top:12px;display:flex;align-items:center;gap:8px">
              <img src="assets/mh_logo1.jpg" style="height:32px;border-radius:4px">
              <img src="assets/mh_logo2.jpg" style="height:32px;border-radius:4px">
              <span style="font-size:12px;color:var(--clr-gray-400)">${I18N.t('mhGovInit')}</span>
            </div>
          </div>
          <div>
            <div class="footer-title">${I18N.t('quickLinks')}</div>
            <div class="footer-links">
              <a class="footer-link" onclick="navigateTo('home')">${I18N.t('navHome')}</a>
              <a class="footer-link" onclick="navigateTo('dashboard')">${I18N.t('navDashboard')}</a>
              <a class="footer-link" onclick="navigateTo('about')">${I18N.t('navAbout')}</a>
              <a class="footer-link" onclick="navigateTo('services')">${I18N.t('navServices')}</a>
              <a class="footer-link" onclick="navigateTo('resources')">${I18N.t('navResources')}</a>
              <a class="footer-link" onclick="navigateTo('contact')">${I18N.t('navContact')}</a>
            </div>
          </div>
          <div>
            <div class="footer-title">${I18N.t('navServices')}</div>
            <div class="footer-links">
              <a class="footer-link" onclick="navigateTo('services')">${I18N.t('catGovtSchemes')}</a>
              <a class="footer-link" onclick="navigateTo('services')">${I18N.t('catAgri')}</a>
              <a class="footer-link" onclick="navigateTo('services')">${I18N.t('catEdu')}</a>
              <a class="footer-link" onclick="navigateTo('services')">${I18N.t('catFinancial')}</a>
            </div>
          </div>
          <div>
            <div class="footer-title">${I18N.t('legal')}</div>
            <div class="footer-links">
              <a class="footer-link" href="#">${I18N.t('privacyPolicy')}</a>
              <a class="footer-link" href="#">${I18N.t('termsConditions')}</a>
              <a class="footer-link" onclick="navigateTo('contact')">${I18N.t('support')}</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          ${I18N.t('copyrightText')}
        </div>
      </div>
    </footer>
  `;
}

// -- Real-Time Top 10 Government Notifications Database -------
function getNotifications() {
  const now = new Date();
  const d1 = new Date(now.getTime() - 15 * 60 * 1000).toISOString(); // 15m ago
  const d2 = new Date(now.getTime() - 45 * 60 * 1000).toISOString(); // 45m ago
  const d3 = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(); // 2h ago
  const d4 = new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(); // 4h ago
  const d5 = new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(); // 6h ago
  const d6 = new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(); // 10h ago
  const d7 = new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString(); // 18h ago
  const d8 = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(); // 1d ago
  const d9 = new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString(); // 1.5d ago
  const d10 = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(); // 2d ago

  return [
    { id: 1, title: I18N.t('notif1Title'), text: I18N.t('notif1Text'), tag: I18N.t('notif1Tag'), category: 'agri', badgeColor: 'badge-green', date: d1, unread: true, source: 'PM-KISAN / Agri Maha' },
    { id: 2, title: I18N.t('notif2Title'), text: I18N.t('notif2Text'), tag: I18N.t('notif2Tag'), category: 'scholarship', badgeColor: 'badge-gold', date: d2, unread: true, source: 'MahaDBT Education' },
    { id: 3, title: I18N.t('notif3Title'), text: I18N.t('notif3Text'), tag: I18N.t('notif3Tag'), category: 'welfare', badgeColor: 'badge-green', date: d3, unread: true, source: 'Govt of Maharashtra' },
    { id: 4, title: I18N.t('notif4Title'), text: I18N.t('notif4Text'), tag: I18N.t('notif4Tag'), category: 'agri', badgeColor: 'badge-blue', date: d4, unread: true, source: 'Ministry of Agriculture' },
    { id: 5, title: I18N.t('notif5Title'), text: I18N.t('notif5Text'), tag: I18N.t('notif5Tag'), category: 'insurance', badgeColor: 'badge-blue', date: d5, unread: false, source: 'PMFBY Portal' },
    { id: 6, title: I18N.t('notif6Title'), text: I18N.t('notif6Text'), tag: I18N.t('notif6Tag'), category: 'career', badgeColor: 'badge-gold', date: d6, unread: false, source: 'Skill India / Rojgar' },
    { id: 7, title: I18N.t('notif7Title'), text: I18N.t('notif7Text'), tag: I18N.t('notif7Tag'), category: 'pds', badgeColor: 'badge-blue', date: d7, unread: false, source: 'Food & Civil Supplies' },
    { id: 8, title: I18N.t('notif8Title'), text: I18N.t('notif8Text'), tag: I18N.t('notif8Tag'), category: 'agri', badgeColor: 'badge-green', date: d8, unread: false, source: 'Soil Health Mission' },
    { id: 9, title: I18N.t('notif9Title'), text: I18N.t('notif9Text'), tag: I18N.t('notif9Tag'), category: 'scholarship', badgeColor: 'badge-gold', date: d9, unread: false, source: 'State Education Board' },
    { id: 10, title: I18N.t('notif10Title'), text: I18N.t('notif10Text'), tag: I18N.t('notif10Tag'), category: 'advisory', badgeColor: 'badge-orange', date: d10, unread: false, source: 'Disaster Management' },
  ];
}

function refreshLiveFeed(e) {
  if (e) e.stopPropagation();
  showToast(I18N.t('feedRefreshedToast'), 'success');
  
  // Re-render dropdown body if currently open
  const dropdownBody = document.querySelector('.notif-dropdown-body');
  if (dropdownBody) {
    const notifications = getNotifications();
    dropdownBody.innerHTML = notifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="navigateTo('notifications');closeNotifDropdown(event);">
        <div class="notif-dot ${n.unread ? '' : 'read'}"></div>
        <div class="notif-content">
          <div class="notif-title">
            <span>${n.title}</span>
            <span class="badge ${n.badgeColor || 'badge-green'}" style="font-size:10px;padding:2px 6px">${n.tag}</span>
          </div>
          <div class="notif-text">${n.text}</div>
          <div class="notif-time">
            <span>🕒 ${timeAgo(n.date)}</span>
            <span style="color:var(--clr-primary-700);font-weight:600">• ${n.source}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Refresh page if on notifications page
  if (typeof App !== 'undefined' && App.currentPage === 'notifications') {
    App.navigate('notifications');
  }
}

function markAllRead() {
  showToast(I18N.t('allReadToast'), 'success');
  document.querySelectorAll('.notif-badge, #navNotifBadge, #mobileNavNotifBadge').forEach(badge => {
    badge.style.display = 'none';
  });
  document.querySelectorAll('.notif-item.unread').forEach(n => n.classList.remove('unread'));
  document.querySelectorAll('.notif-dot').forEach(d => d.classList.add('read'));
}

// =========// ============================================================
// e-Samanvit — Hero Banner Carousel (6 Slides — New Design)
// ============================================================

/* ── Inline styles for the new banner carousel ─────────────────────
   Injected once when renderHeroSlider is first called.             */
(function injectEsamBannerStyles() {
  if (document.getElementById('esam-banner-css')) return;
  const s = document.createElement('style');
  s.id = 'esam-banner-css';
  s.textContent = `
    /* ── Wrapper (Full-width Edge-to-Edge with subtle premium light tint) ── */
    .esam-banner-wrap {
      width: 100%;
      position: relative;
      overflow: hidden;
      background: linear-gradient(180deg, #EDF7EE 0%, #F5FAF6 50%, #EAF4EB 100%);
      border-bottom: 2px solid #B8E0B9;
      box-shadow: 0 6px 24px rgba(27, 94, 32, 0.08);
      font-family: var(--font-family, 'Inter', sans-serif);
      margin: 0;
    }

    /* ── Track ──────────────────────────────────────────────────── */
    .esam-banner-track {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
      will-change: transform;
    }

    /* ── Slide base ─────────────────────────────────────────────── */
    .esam-bn-slide {
      min-width: 100%;
      width: 100%;
      min-height: 420px;
      display: flex;
      align-items: center;
      position: relative;
      padding: 44px 0 28px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .esam-bn-slide::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .esam-bn-slide-1::before { background: radial-gradient(ellipse 55% 70% at 8% 50%, rgba(200,230,201,0.40) 0%, transparent 70%); }
    .esam-bn-slide-2::before { background: radial-gradient(ellipse 60% 60% at 95% 50%, rgba(200,230,201,0.30) 0%, transparent 70%); }
    .esam-bn-slide-3::before { background: radial-gradient(ellipse 50% 80% at 8% 50%, rgba(200,230,201,0.35) 0%, transparent 70%); }
    .esam-bn-slide-4::before { background: radial-gradient(ellipse 65% 65% at 92% 40%, rgba(200,230,201,0.28) 0%, transparent 70%); }
    .esam-bn-slide-5::before { background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,230,201,0.22) 0%, transparent 70%); }
    .esam-bn-slide-6::before { background: radial-gradient(ellipse 60% 70% at 8% 50%, rgba(200,230,201,0.38) 0%, transparent 70%); }

    .esam-bn-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px;
      width: 100%;
      box-sizing: border-box;
    }

    /* ── Slide counter ───────────────────────────────────────────── */
    .esam-bn-counter {
      position: absolute;
      bottom: 14px;
      right: 18px;
      font-size: 0.6875rem;
      font-weight: 700;
      color: var(--clr-gray-500, #9E9E98);
      background: rgba(255,255,255,0.88);
      padding: 3px 10px;
      border-radius: 20px;
      backdrop-filter: blur(4px);
      letter-spacing: 0.4px;
    }

    /* ── Progress bar ────────────────────────────────────────────── */
    .esam-bn-progress {
      position: absolute;
      bottom: 0; left: 0;
      height: 3px;
      background: var(--clr-primary-500, #66BB6A);
      width: 0%;
      z-index: 5;
    }
    .esam-bn-progress.run { transition: width 3.5s linear; width: 100%; }

    /* ── Nav arrows ──────────────────────────────────────────────── */
    .esam-bn-nav {
      position: absolute;
      top: 50%; transform: translateY(-50%);
      z-index: 10;
      width: 44px; height: 44px;
      border-radius: 50%;
      border: 1.5px solid var(--clr-primary-300, #A5D6A7);
      background: rgba(255,255,255,0.92);
      color: var(--clr-primary-800, #2E7D32);
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 12px rgba(46,125,50,0.12);
      transition: background 0.2s, border-color 0.2s, transform 0.15s;
      backdrop-filter: blur(6px);
    }
    .esam-bn-nav:hover {
      background: var(--clr-primary-100, #E8F5E9);
      border-color: var(--clr-primary-500, #66BB6A);
      transform: translateY(-50%) scale(1.08);
    }
    .esam-bn-nav.prev { left: 14px; }
    .esam-bn-nav.next { right: 14px; }

    /* ── Dots bar (seamlessly integrated inside bottom of banner card) ── */
    .esam-bn-dots {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 14px 0 18px;
      background: var(--clr-gray-50, #FAFAF8);
    }
    .esam-bn-dot {
      width: 8px; height: 8px;
      border-radius: 99px;
      background: var(--clr-primary-300, #A5D6A7);
      border: none; cursor: pointer; padding: 0;
      transition: width 0.35s cubic-bezier(0.22,0.61,0.36,1), background 0.2s;
    }
    .esam-bn-dot.active { width: 28px; background: var(--clr-primary-700, #388E3C); }

    /* ═══════ SLIDE LAYOUTS ══════════════════════════════════════ */

    /* ── S1: Split logo | text ───────────────────────────────────── */
    .esam-s1-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 48px;
      align-items: center;
    }
    .esam-s1-logo-box {
      height: 300px;
      background: var(--clr-primary-100, #E8F5E9);
      border: 1.5px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 20px;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 24px rgba(46,125,50,0.10);
      position: relative;
    }
    .esam-s1-logo-box img {
      width: 100%; height: 100%;
      object-fit: contain;
      padding: 28px; box-sizing: border-box;
    }
    .esam-badge-pill {
      position: absolute; bottom: 12px; right: 12px;
      background: rgba(46,125,50,0.92);
      color: #fff;
      font-size: 10px; font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }
    .esam-s1-text h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      color: var(--clr-primary-900, #1B5E20);
      line-height: 1.15;
      margin: 0 0 14px;
      letter-spacing: -0.5px;
    }
    .esam-s1-text h2 em { font-style: normal; color: var(--clr-primary-700, #388E3C); }
    .esam-s1-tagline-en {
      font-size: clamp(0.9375rem, 2vw, 1.1875rem);
      font-weight: 700;
      color: var(--clr-gray-800, #3A3A35);
      margin: 0 0 8px;
      line-height: 1.4;
    }
    .esam-s1-tagline-mr {
      font-size: 0.9rem;
      color: var(--clr-gray-600, #72726C);
      margin: 0 0 26px;
      line-height: 1.5;
    }
    .esam-chips { display: flex; gap: 10px; flex-wrap: wrap; }
    .esam-chip {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--clr-primary-100, #E8F5E9);
      color: var(--clr-primary-800, #2E7D32);
      border: 1px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 99px;
      padding: 6px 14px;
      font-size: 0.8rem; font-weight: 600; line-height: 1;
    }

    /* ── S2: Benefits grid ───────────────────────────────────────── */
    .esam-bn-h2 {
      font-size: clamp(1.5rem, 3vw, 2.25rem);
      font-weight: 800;
      color: var(--clr-primary-900, #1B5E20);
      margin: 0 0 28px;
      line-height: 1.2;
    }
    .esam-benefits-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }
    .esam-benefit-card {
      background: #fff;
      border: 1.5px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 16px;
      padding: 22px 18px;
      display: flex; gap: 14px;
      align-items: flex-start;
      box-shadow: 0 2px 12px rgba(46,125,50,0.07);
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .esam-benefit-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(46,125,50,0.13); }
    .esam-bc-icon {
      width: 52px; height: 52px; flex-shrink: 0;
      background: var(--clr-primary-100, #E8F5E9);
      border: 1.5px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      color: var(--clr-primary-800, #2E7D32);
    }
    .esam-bc-title {
      font-size: 0.9375rem; font-weight: 700;
      color: var(--clr-gray-900, #1E1E1B);
      margin: 0 0 5px; line-height: 1.3;
    }
    .esam-bc-desc {
      font-size: 0.8rem; color: var(--clr-gray-600, #72726C);
      line-height: 1.5; margin: 0;
    }
    .esam-bc-stat {
      display: inline-block; margin-top: 7px;
      font-size: 0.75rem; font-weight: 700;
      color: var(--clr-primary-700, #388E3C);
      background: var(--clr-primary-100, #E8F5E9);
      padding: 2px 8px; border-radius: 6px;
    }

    /* ── S3: Left mascot | right features ───────────────────────── */
    .esam-s3-grid {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 48px;
      align-items: center;
    }
    .esam-s3-img {
      height: 300px;
      background: var(--clr-primary-100, #E8F5E9);
      border: 1.5px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 20px;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 24px rgba(46,125,50,0.10);
    }
    .esam-s3-img img { width: 100%; height: 100%; object-fit: contain; padding: 20px; box-sizing: border-box; }
    .esam-feat-list { display: flex; flex-direction: column; gap: 16px; }
    .esam-feat-row {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 14px 18px;
      background: #fff;
      border: 1.5px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 14px;
      box-shadow: 0 1px 6px rgba(46,125,50,0.06);
      transition: transform 0.2s;
    }
    .esam-feat-row:hover { transform: translateX(4px); }
    .esam-feat-icon {
      width: 42px; height: 42px; flex-shrink: 0;
      background: var(--clr-primary-100, #E8F5E9);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      color: var(--clr-primary-700, #388E3C);
    }
    .esam-ft-title { font-size: 0.9rem; font-weight: 700; color: var(--clr-gray-900, #1E1E1B); margin: 0 0 3px; }
    .esam-ft-sub { font-size: 0.8rem; color: var(--clr-gray-600, #72726C); margin: 0; }

    /* ── S4: How to Use Steps 1 & 2 ─────────────────────────────── */
    .esam-s4-grid {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 48px;
      align-items: center;
    }
    .esam-s4-img {
      height: 300px;
      background: linear-gradient(135deg, var(--clr-primary-100, #E8F5E9) 0%, #fff 100%);
      border: 1.5px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 20px;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 24px rgba(46,125,50,0.10);
      position: relative;
    }
    .esam-s4-img img { width: 100%; height: 100%; object-fit: contain; padding: 24px; box-sizing: border-box; }
    .esam-ai-badge {
      position: absolute; top: 12px; right: 12px;
      background: var(--clr-primary-900, #1B5E20); color: #fff;
      font-size: 11px; font-weight: 700; padding: 5px 12px;
      border-radius: 20px; display: flex; align-items: center; gap: 5px;
    }
    .esam-steps-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
      margin-top: 6px;
    }
    .esam-step-card {
      background: #fff;
      border: 2px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 16px; padding: 20px;
      position: relative;
      box-shadow: 0 2px 12px rgba(46,125,50,0.07);
      transition: transform 0.25s;
    }
    .esam-step-card:hover { transform: translateY(-2px); }
    .esam-step-num {
      position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
      width: 30px; height: 30px;
      background: var(--clr-primary-700, #388E3C); color: #fff;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8125rem; font-weight: 800;
      border: 2px solid #fff;
      box-shadow: 0 2px 8px rgba(46,125,50,0.30);
    }
    .esam-step-title { font-size: 0.9rem; font-weight: 700; color: var(--clr-gray-900, #1E1E1B); margin: 10px 0 6px; line-height: 1.35; }
    .esam-step-desc  { font-size: 0.8rem; color: var(--clr-gray-600, #72726C); line-height: 1.5; margin: 0; }

    /* ── S5: Flow diagram ────────────────────────────────────────── */
    .esam-s5-center { text-align: center; }
    .esam-s5-center .esam-bn-h2 { text-align: center; }
    .esam-flow-row {
      display: flex; align-items: center; justify-content: center;
      gap: 0; margin-bottom: 28px;
    }
    .esam-flow-step { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .esam-flow-circle {
      width: 100px; height: 100px; border-radius: 50%;
      background: #fff;
      border: 3px solid var(--clr-primary-700, #388E3C);
      display: flex; align-items: center; justify-content: center;
      color: var(--clr-primary-800, #2E7D32);
      box-shadow: 0 4px 16px rgba(46,125,50,0.14);
      transition: transform 0.25s;
    }
    .esam-flow-circle:hover { transform: scale(1.06); }
    .esam-flow-label {
      font-size: 0.85rem; font-weight: 700;
      color: var(--clr-gray-800, #3A3A35);
      text-align: center; max-width: 90px; line-height: 1.3;
    }
    .esam-flow-arrow {
      display: flex; align-items: center;
      padding: 0 2px; margin-bottom: 32px;
      color: var(--clr-primary-700, #388E3C);
    }
    .esam-flow-note {
      background: var(--clr-primary-100, #E8F5E9);
      border-left: 3px solid var(--clr-primary-600, #43A047);
      border-radius: 0 10px 10px 0;
      padding: 12px 20px;
      font-size: 0.8125rem;
      color: var(--clr-gray-700, #56564F);
      line-height: 1.6;
      max-width: 680px;
      margin: 0 auto;
      text-align: left;
    }

    /* ── S6: CTA slide ───────────────────────────────────────────── */
    .esam-s6-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 48px;
      align-items: center;
    }
    .esam-s6-text p {
      font-size: 1rem; color: var(--clr-gray-700, #56564F);
      margin: 0 0 24px; line-height: 1.65; max-width: 520px;
    }
    .esam-lang-row { display: flex; gap: 8px; margin-bottom: 22px; flex-wrap: wrap; }
    .esam-lang-chip {
      background: var(--clr-primary-100, #E8F5E9);
      border: 1.5px solid var(--clr-primary-300, #A5D6A7);
      color: var(--clr-primary-800, #2E7D32);
      border-radius: 99px; padding: 5px 14px;
      font-size: 0.8rem; font-weight: 600;
    }
    .esam-cta-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--clr-primary-800, #2E7D32); color: #fff;
      border: none; border-radius: 12px; padding: 13px 26px;
      font-size: 0.9375rem; font-weight: 700; cursor: pointer;
      box-shadow: 0 4px 16px rgba(46,125,50,0.30);
      transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
      text-decoration: none;
    }
    .esam-cta-btn:hover { background: var(--clr-primary-700, #388E3C); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(46,125,50,0.38); }
    .esam-cta-sec {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent;
      color: var(--clr-primary-800, #2E7D32);
      border: 2px solid var(--clr-primary-300, #A5D6A7);
      border-radius: 12px; padding: 11px 22px;
      font-size: 0.9rem; font-weight: 600; cursor: pointer; margin-left: 10px;
      transition: background 0.2s, border-color 0.2s;
    }
    .esam-cta-sec:hover { background: var(--clr-primary-100, #E8F5E9); border-color: var(--clr-primary-500, #66BB6A); }
    .esam-s6-img {
      height: 280px;
      background: var(--clr-primary-100, #E8F5E9);
      border: 1.5px solid var(--clr-primary-200, #C8E6C9);
      border-radius: 20px; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 24px rgba(46,125,50,0.10);
      position: relative;
    }
    .esam-s6-img img { width: 100%; height: 100%; object-fit: contain; padding: 24px; box-sizing: border-box; }

    /* ═══════ DARK MODE ═════════════════════════════════════════ */
    [data-theme="dark"] .esam-banner-wrap,
    .dark-theme .esam-banner-wrap {
      background: #1a1f1a;
      border-color: #2d5a2d;
    }
    [data-theme="dark"] .esam-benefit-card,
    [data-theme="dark"] .esam-feat-row,
    [data-theme="dark"] .esam-step-card,
    .dark-theme .esam-benefit-card,
    .dark-theme .esam-feat-row,
    .dark-theme .esam-step-card {
      background: #1e261e;
      border-color: #2d5a2d;
    }
    [data-theme="dark"] .esam-flow-circle,
    .dark-theme .esam-flow-circle { background: #1e261e; }
    [data-theme="dark"] .esam-s1-logo-box,
    [data-theme="dark"] .esam-s3-img,
    [data-theme="dark"] .esam-s4-img,
    [data-theme="dark"] .esam-s6-img,
    .dark-theme .esam-s1-logo-box,
    .dark-theme .esam-s3-img,
    .dark-theme .esam-s4-img,
    .dark-theme .esam-s6-img { background: #1e261e; border-color: #2d5a2d; }
    [data-theme="dark"] .esam-bc-icon,
    [data-theme="dark"] .esam-feat-icon,
    .dark-theme .esam-bc-icon,
    .dark-theme .esam-feat-icon { background: #1B5E20; border-color: #2d5a2d; }
    [data-theme="dark"] .esam-bn-dots,
    .dark-theme .esam-bn-dots { background: transparent; }
    [data-theme="dark"] .esam-bn-dot,
    .dark-theme .esam-bn-dot { background: #334155; }
    [data-theme="dark"] .esam-bn-dot.active,
    .dark-theme .esam-bn-dot.active { background: #4ade80; box-shadow: 0 0 8px rgba(74, 222, 128, 0.4); }
    [data-theme="dark"] .esam-bn-nav,
    .dark-theme .esam-bn-nav { background: rgba(30,38,30,0.92); border-color: #2d5a2d; color: #81C784; }
    [data-theme="dark"] .esam-s1-text h2,
    [data-theme="dark"] .esam-bn-h2,
    .dark-theme .esam-s1-text h2,
    .dark-theme .esam-bn-h2 { color: #81C784; }
    [data-theme="dark"] .esam-bc-title,
    [data-theme="dark"] .esam-ft-title,
    [data-theme="dark"] .esam-step-title,
    [data-theme="dark"] .esam-flow-label,
    .dark-theme .esam-bc-title,
    .dark-theme .esam-ft-title,
    .dark-theme .esam-step-title,
    .dark-theme .esam-flow-label { color: #e0e0e0; }
    [data-theme="dark"] .esam-bn-counter,
    .dark-theme .esam-bn-counter { background: rgba(30,38,30,0.85); color: #81C784; }
    [data-theme="dark"] .esam-flow-note,
    .dark-theme .esam-flow-note { background: #1e261e; color: #a5d6a7; }
    [data-theme="dark"] .esam-s6-text p,
    .dark-theme .esam-s6-text p { color: #a5d6a7; }
    [data-theme="dark"] .esam-lang-chip,
    .dark-theme .esam-lang-chip { background: #1e261e; border-color: #2d5a2d; color: #81C784; }
    [data-theme="dark"] .esam-cta-sec,
    .dark-theme .esam-cta-sec { color: #81C784; border-color: #2d5a2d; }
    [data-theme="dark"] .esam-chip,
    .dark-theme .esam-chip { background: #1e261e; border-color: #2d5a2d; color: #81C784; }
    [data-theme="dark"] .esam-s1-tagline-en,
    .dark-theme .esam-s1-tagline-en { color: #c5e1c5; }

    /* ═══════ RESPONSIVE ════════════════════════════════════════ */
    @media (max-width: 900px) {
      .esam-s1-grid, .esam-s3-grid, .esam-s4-grid, .esam-s6-grid { grid-template-columns: 1fr; gap: 20px; }
      .esam-s1-logo-box, .esam-s3-img, .esam-s4-img, .esam-s6-img { height: 170px; }
      .esam-benefits-grid { grid-template-columns: 1fr; }
      .esam-steps-grid { grid-template-columns: 1fr; }
      .esam-bn-slide { min-height: auto; padding: 28px 0 36px; }
      .esam-bn-inner { padding: 0 16px; }
      .esam-flow-circle { width: 68px; height: 68px; }
      .esam-flow-label { font-size: 0.7rem; max-width: 68px; }
    }
    @media (max-width: 600px) {
      .esam-bn-nav { width: 36px; height: 36px; }
      .esam-cta-sec { margin-left: 0; margin-top: 10px; }
      .esam-flow-circle { width: 56px; height: 56px; }
    }
  `;
  document.head.appendChild(s);
})();

function renderHeroSlider() {
  return `
  <div class="esam-banner-wrap" id="esamBannerWrap">

    <!-- Track -->
    <div class="esam-banner-track" id="esamBannerTrack">

      <!-- ══ SLIDE 1 — Brand Introduction ══ -->
      <div class="esam-bn-slide esam-bn-slide-1" role="group" aria-label="Slide 1 of 6: Introduction">
        <div class="esam-bn-inner">
          <div class="esam-s1-grid">
            <div class="esam-s1-logo-box">
              <img src="assets/logo.jpg" alt="e-Samanvit Logo">
              <div class="esam-badge-pill">Official Portal</div>
            </div>
            <div class="esam-s1-text">
              <h2>e-<em>Samanvit</em></h2>
              <p class="esam-s1-tagline-en">Connecting Government Services,<br>Simplifying Citizen Journeys</p>
              <p class="esam-s1-tagline-mr">एकीकृत डिजिटल समन्वय – सर्व शासकीय योजना एकाच ठिकाणी</p>
              <div class="esam-chips">
                <span class="esam-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                  Verified Portal
                </span>
                <span class="esam-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  24/7 Access
                </span>
                <span class="esam-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  120+ Schemes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SLIDE 2 — Benefits ══ -->
      <div class="esam-bn-slide esam-bn-slide-2" role="group" aria-label="Slide 2 of 6: Benefits">
        <div class="esam-bn-inner">
          <h2 class="esam-bn-h2">Benefits</h2>
          <div class="esam-benefits-grid">
            <div class="esam-benefit-card">
              <div class="esam-bc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="13" height="11" rx="2"/><path d="M5 18h7M8.5 14v4"/><rect x="15" y="8" width="7" height="13" rx="1.5"/><circle cx="18.5" cy="18" r="0.75" fill="currentColor"/></svg>
              </div>
              <div>
                <p class="esam-bc-title">Single-window access</p>
                <p class="esam-bc-desc">Central &amp; state schemes – one portal, unified search</p>
                <span class="esam-bc-stat">36 Districts Covered</span>
              </div>
            </div>
            <div class="esam-benefit-card">
              <div class="esam-bc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <div>
                <p class="esam-bc-title">85% faster approvals</p>
                <p class="esam-bc-desc">Application time: 21 days → 3 days (typical)</p>
                <span class="esam-bc-stat">85% Faster</span>
              </div>
            </div>
            <div class="esam-benefit-card">
              <div class="esam-bc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <div>
                <p class="esam-bc-title">100% DBT transparency</p>
                <p class="esam-bc-desc">Direct Benefit Transfer – track to bank account</p>
                <span class="esam-bc-stat">100% Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SLIDE 3 — Core Features ══ -->
      <div class="esam-bn-slide esam-bn-slide-3" role="group" aria-label="Slide 3 of 6: Core Features">
        <div class="esam-bn-inner">
          <div class="esam-s3-grid">
            <div class="esam-s3-img">
              <img src="assets/mitra_mascot.png" alt="MITRA – e-Samanvit AI Assistant">
            </div>
            <div>
              <h2 class="esam-bn-h2">Core Features</h2>
              <div class="esam-feat-list">
                <div class="esam-feat-row">
                  <div class="esam-feat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  <div>
                    <p class="esam-ft-title">Agriculture Services</p>
                    <p class="esam-ft-sub">PM-KISAN · Soil Health Card · Live mandi prices</p>
                  </div>
                </div>
                <div class="esam-feat-row">
                  <div class="esam-feat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <div>
                    <p class="esam-ft-title">Education &amp; Youth</p>
                    <p class="esam-ft-sub">National Scholarships (NSP) · Skill India courses</p>
                  </div>
                </div>
                <div class="esam-feat-row">
                  <div class="esam-feat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"/><path d="M21 11h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1Z"/><path d="M2 15a10 10 0 0 1 20 0"/></svg>
                  </div>
                  <div>
                    <p class="esam-ft-title">Citizen Welfare</p>
                    <p class="esam-ft-sub">Financial aid · 24/7 helpline in EN / HI / MR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SLIDE 4 — How to Use: Steps 1 & 2 ══ -->
      <div class="esam-bn-slide esam-bn-slide-4" role="group" aria-label="Slide 4 of 6: How to Use Steps 1 and 2">
        <div class="esam-bn-inner">
          <div class="esam-s4-grid">
            <div class="esam-s4-img">
              <img src="assets/logo.jpg" alt="e-Samanvit">
            </div>
            <div>
              <h2 class="esam-bn-h2">How to Use —</h2>
              <div class="esam-steps-grid">
                <div class="esam-step-card">
                  <div class="esam-step-num">1</div>
                  <p class="esam-step-title">Step 01 — Choose language &amp; category</p>
                  <p class="esam-step-desc">Pick language: English, Hindi, Marathi · Select service category</p>
                </div>
                <div class="esam-step-card">
                  <div class="esam-step-num">2</div>
                  <p class="esam-step-title">Step 02 — Search your scheme</p>
                  <p class="esam-step-desc">Use search bar or browse cards to find schemes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SLIDE 5 — How to Use: Steps 3 & 4 Flow ══ -->
      <div class="esam-bn-slide esam-bn-slide-5" role="group" aria-label="Slide 5 of 6: How to Use Steps 3 and 4">
        <div class="esam-bn-inner esam-s5-center">
          <h2 class="esam-bn-h2">Complete Your Journey</h2>
          <div class="esam-flow-row">
            <div class="esam-flow-step">
              <div class="esam-flow-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
              </div>
              <span class="esam-flow-label">Verify<br>Eligibility</span>
            </div>
            <div class="esam-flow-arrow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div class="esam-flow-step">
              <div class="esam-flow-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/></svg>
              </div>
              <span class="esam-flow-label">Apply<br>Online</span>
            </div>
            <div class="esam-flow-arrow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div class="esam-flow-step">
              <div class="esam-flow-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span class="esam-flow-label">Track<br>Application</span>
            </div>
            <div class="esam-flow-arrow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div class="esam-flow-step">
              <div class="esam-flow-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>
              </div>
              <span class="esam-flow-label">Receive<br>DBT</span>
            </div>
          </div>
          <div class="esam-flow-note">
            <strong>Step 03</strong> – Verify eligibility, complete 1-click online form.<br>
            <strong>Step 04</strong> – Track status, receive DBT directly to your bank account.
          </div>
        </div>
      </div>

      <!-- ══ SLIDE 6 — Get Started CTA ══ -->
      <div class="esam-bn-slide esam-bn-slide-6" role="group" aria-label="Slide 6 of 6: Get Started">
        <div class="esam-bn-inner">
          <div class="esam-s6-grid">
            <div class="esam-s6-text">
              <h2 class="esam-bn-h2">Ready to Access<br>Government Services?</h2>
              <p>Join thousands of citizens using e-Samanvit to discover and apply for government schemes, scholarships, agriculture support, and welfare programs — all in one place, completely free.</p>
              <div class="esam-lang-row">
                <span class="esam-lang-chip">🇮🇳 English</span>
                <span class="esam-lang-chip">हिंदी</span>
                <span class="esam-lang-chip">मराठी</span>
              </div>
              <button class="esam-cta-btn" onclick="navigateTo('services')">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                Explore Services
              </button>
              <button class="esam-cta-sec" onclick="navigateTo('about')">Learn More</button>
            </div>
            <div class="esam-s6-img">
              <img src="assets/logo.jpg" alt="e-Samanvit – Government of Maharashtra">
              <div class="esam-badge-pill">Maharashtra Gov.</div>
            </div>
          </div>
        </div>
      </div>

    </div><!-- /esam-banner-track -->

    <!-- Prev / Next Arrows -->
    <button class="esam-bn-nav prev" id="esamBnPrev" aria-label="Previous slide" onclick="EsamBanner.prev()">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="esam-bn-nav next" id="esamBnNext" aria-label="Next slide" onclick="EsamBanner.next()">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
    </button>

    <!-- Integrated Dot nav inside banner card at bottom -->
    <div class="esam-bn-dots" id="esamBnDots" role="tablist" aria-label="Banner slide navigation">
      <button class="esam-bn-dot active" role="tab" aria-label="Slide 1" aria-selected="true"  onclick="EsamBanner.goTo(0)"></button>
      <button class="esam-bn-dot"        role="tab" aria-label="Slide 2" aria-selected="false" onclick="EsamBanner.goTo(1)"></button>
      <button class="esam-bn-dot"        role="tab" aria-label="Slide 3" aria-selected="false" onclick="EsamBanner.goTo(2)"></button>
      <button class="esam-bn-dot"        role="tab" aria-label="Slide 4" aria-selected="false" onclick="EsamBanner.goTo(3)"></button>
      <button class="esam-bn-dot"        role="tab" aria-label="Slide 5" aria-selected="false" onclick="EsamBanner.goTo(4)"></button>
      <button class="esam-bn-dot"        role="tab" aria-label="Slide 6" aria-selected="false" onclick="EsamBanner.goTo(5)"></button>
    </div>

    <!-- Progress bar -->
    <div class="esam-bn-progress" id="esamBnProgress"></div>

  </div><!-- /esam-banner-wrap -->
  `;
}

const HeroSlider = {
  currentSlide: 0,
  totalSlides: 7,
  timer: null,
  duration: 3500, // 3.5s smooth transition
  isPaused: false,
  touchStartX: 0,
  touchEndX: 0,
  keyHandlerAttached: false,

  init() {
    this.stopAutoplay();
    this.currentSlide = 0;
    const track = document.getElementById('heroSliderTrack');
    if (!track) return;

    const slides = track.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
      this.totalSlides = slides.length;
    }

    this.renderDots();
    this.goTo(0, false);
    this.setupListeners();
    this.startAutoplay();
  },

  renderDots() {
    const dotsContainer = document.getElementById('heroSliderDots');
    if (!dotsContainer) return;
    let html = '';
    for (let i = 0; i < this.totalSlides; i++) {
      html += `
        <button class="hero-slider-dot ${i === this.currentSlide ? 'active' : ''}" 
                onclick="HeroSlider.goTo(${i})" 
                aria-label="Slide ${i + 1} of ${this.totalSlides}"
                role="tab"
                aria-selected="${i === this.currentSlide ? 'true' : 'false'}"></button>
      `;
    }
    dotsContainer.innerHTML = html;
  },

  goTo(index, animate = true) {
    this.currentSlide = (index + this.totalSlides) % this.totalSlides;
    const track = document.getElementById('heroSliderTrack');
    if (track) {
      if (!animate) {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        track.offsetHeight; // force reflow
        track.style.transition = '';
      } else {
        track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
      }
    }

    const dots = document.querySelectorAll('.hero-slider-dot');
    dots.forEach((dot, i) => {
      if (i === this.currentSlide) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    if (!this.isPaused) {
      this.resetTimer();
    }
  },

  next() {
    this.goTo(this.currentSlide + 1);
  },

  prev() {
    this.goTo(this.currentSlide - 1);
  },

  startAutoplay() {
    this.stopAutoplay();
    if (this.isPaused) return;
    this.timer = setInterval(() => {
      this.next();
    }, this.duration);
  },

  stopAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  resetTimer() {
    this.stopAutoplay();
    this.startAutoplay();
  },

  togglePause() {
    this.isPaused = !this.isPaused;
    const btn = document.getElementById('heroSliderPauseBtn');
    if (this.isPaused) {
      this.stopAutoplay();
      if (btn) {
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
        btn.setAttribute('aria-label', (typeof I18N !== 'undefined' ? I18N.t('sliderPlay') : 'Play'));
        btn.setAttribute('title', (typeof I18N !== 'undefined' ? I18N.t('sliderPlay') : 'Play'));
      }
    } else {
      this.startAutoplay();
      if (btn) {
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
        btn.setAttribute('aria-label', (typeof I18N !== 'undefined' ? I18N.t('sliderPause') : 'Pause'));
        btn.setAttribute('title', (typeof I18N !== 'undefined' ? I18N.t('sliderPause') : 'Pause'));
      }
    }
  },

  setupListeners() {
    const wrap = document.getElementById('heroSliderWrap');
    if (!wrap) return;

    wrap.onmouseenter = () => {
      if (!this.isPaused) this.stopAutoplay();
    };
    wrap.onmouseleave = () => {
      if (!this.isPaused) this.startAutoplay();
    };

    wrap.ontouchstart = (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    };
    wrap.ontouchend = (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    };

    if (!this.keyHandlerAttached && typeof document !== 'undefined') {
      this.keyHandlerAttached = true;
      document.addEventListener('keydown', (e) => {
        // Only trigger if no input/textarea is focused
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
        const sliderEl = document.getElementById('heroSliderWrap');
        if (!sliderEl) return;
        if (e.key === 'ArrowLeft') {
          HeroSlider.prev();
        } else if (e.key === 'ArrowRight') {
          HeroSlider.next();
        }
      });
    }
  },

  handleSwipe() {
    const diff = this.touchEndX - this.touchStartX;
    if (Math.abs(diff) > 35) {
      if (diff < 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.HeroSlider = HeroSlider;
  window.renderHeroSlider = renderHeroSlider;
}

// ============================================================
// EsamBanner — Controller for the new 6-slide banner carousel
// (Called from app.js afterRender via HeroSlider.init alias)
// ============================================================
const EsamBanner = {
  current: 0,
  pos: 1,
  total: 6,
  timer: null,
  DELAY: 3500,
  isPaused: false,
  isTransitioning: false,

  init() {
    this.stop();
    const track = document.getElementById('esamBannerTrack');
    if (!track) return;

    // Clean up any previously appended clones
    track.querySelectorAll('[data-clone]').forEach(el => el.remove());

    const realSlides = Array.from(track.querySelectorAll('.esam-bn-slide'));
    if (realSlides.length >= 2) {
      this.total = realSlides.length;

      const firstClone = realSlides[0].cloneNode(true);
      firstClone.setAttribute('data-clone', 'first');
      firstClone.setAttribute('aria-hidden', 'true');
      firstClone.removeAttribute('id');

      const lastClone = realSlides[realSlides.length - 1].cloneNode(true);
      lastClone.setAttribute('data-clone', 'last');
      lastClone.setAttribute('aria-hidden', 'true');
      lastClone.removeAttribute('id');

      track.insertBefore(lastClone, realSlides[0]);
      track.appendChild(firstClone);
    } else {
      this.total = realSlides.length || 1;
    }

    this.pos = 1;
    this.current = 0;
    this.isTransitioning = false;

    // Set initial position to real slide 1 without animation
    track.style.transition = 'none';
    track.style.transform = `translateX(-${this.pos * 100}%)`;
    void track.offsetHeight; // force reflow
    track.style.transition = '';

    // Handle seamless infinite wrap when transition ends
    track.ontransitionend = (e) => {
      if (e.target !== track || e.propertyName !== 'transform') return;
      this.handleTransitionEnd();
    };

    this.updateDots();
    this._resetProgress();
    this.setupListeners();
    this.start();
  },

  handleTransitionEnd() {
    const track = document.getElementById('esamBannerTrack');
    if (!track) return;
    this.isTransitioning = false;

    // If slid forward past slide 6 into clone of slide 1 -> snap to real slide 1
    if (this.pos >= this.total + 1) {
      this.pos = 1;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${this.pos * 100}%)`;
      void track.offsetHeight;
      track.style.transition = '';
    }
    // If slid backward past slide 1 into clone of slide 6 -> snap to real slide 6
    else if (this.pos <= 0) {
      this.pos = this.total;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${this.pos * 100}%)`;
      void track.offsetHeight;
      track.style.transition = '';
    }
  },

  updateDots() {
    const dots = document.querySelectorAll('#esamBnDots .esam-bn-dot');
    dots.forEach((d, i) => {
      const isActive = i === this.current;
      d.classList.toggle('active', isActive);
      d.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  },

  goToPosition(newPos, animate = true) {
    const track = document.getElementById('esamBannerTrack');
    if (!track) return;

    this.pos = newPos;
    const logical = ((this.pos - 1) % this.total + this.total) % this.total;
    this.current = logical;
    this.updateDots();
    this._resetProgress();

    if (!animate) {
      this.isTransitioning = false;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${this.pos * 100}%)`;
      void track.offsetHeight;
      track.style.transition = '';
      return;
    }

    this.isTransitioning = true;
    track.style.transition = 'transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
    track.style.transform = `translateX(-${this.pos * 100}%)`;

    // Safety timeout in case transitionend does not fire
    clearTimeout(this._transTimeout);
    this._transTimeout = setTimeout(() => {
      if (this.isTransitioning) {
        this.handleTransitionEnd();
      }
    }, 550);

    if (!this.isPaused) {
      this.stop();
      this.start();
    }
  },

  goTo(idx) {
    if (this.isTransitioning) return;
    // Seamless edge handling for dot navigation
    if (this.pos === this.total && idx === 0) {
      this.goToPosition(this.pos + 1, true);
    } else if (this.pos === 1 && idx === this.total - 1) {
      this.goToPosition(0, true);
    } else {
      this.goToPosition(idx + 1, true);
    }
  },

  next() {
    if (this.isTransitioning) return;
    this.goToPosition(this.pos + 1, true);
  },

  prev() {
    if (this.isTransitioning) return;
    this.goToPosition(this.pos - 1, true);
  },

  start() {
    if (this.isPaused) return;
    this.stop();
    this.timer = setInterval(() => this.next(), this.DELAY);
  },

  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  },

  // Alias so app.js's HeroSlider.stopAutoplay() still works
  stopAutoplay() { this.stop(); },

  _resetProgress() {
    const bar = document.getElementById('esamBnProgress');
    if (!bar) return;
    bar.classList.remove('run');
    bar.style.width = '0%';
    void bar.offsetWidth; // reflow
    bar.classList.add('run');
  },

  setupListeners() {
    const wrap = document.getElementById('esamBannerWrap');
    if (!wrap) return;
    wrap.onmouseenter = () => { if (!this.isPaused) this.stop(); };
    wrap.onmouseleave = () => { if (!this.isPaused) this.start(); };
    wrap.ontouchstart = (e) => { this._tx = e.changedTouches[0].screenX; };
    wrap.ontouchend   = (e) => {
      const diff = this._tx - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 35) { diff > 0 ? this.next() : this.prev(); }
    };
    if (!this._keyAttached) {
      this._keyAttached = true;
      document.addEventListener('keydown', (e) => {
        if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;
        if (!document.getElementById('esamBannerWrap')) return;
        if (e.key === 'ArrowLeft')  EsamBanner.prev();
        if (e.key === 'ArrowRight') EsamBanner.next();
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.EsamBanner = EsamBanner;
}
