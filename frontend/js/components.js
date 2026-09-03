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

        <div class="navbar-right">
          <!-- Language Selector Dropdown -->
          <select class="lang-selector" onchange="I18N.setLanguage(this.value)" aria-label="${I18N.t('selectLanguage')}">
            <option value="en" ${I18N.currentLang === 'en' ? 'selected' : ''}>English</option>
            <option value="hi" ${I18N.currentLang === 'hi' ? 'selected' : ''}>हिंदी</option>
            <option value="mr" ${I18N.currentLang === 'mr' ? 'selected' : ''}>मराठी</option>
          </select>

          <!-- Theme Toggle Button (Dark / Light Mode) -->
          <button class="navbar-icon-btn theme-toggle-btn" onclick="toggleTheme()" id="themeToggleBtn" aria-label="${(typeof Accessibility !== 'undefined' && Accessibility.theme === 'dark') ? I18N.t('lightMode') : I18N.t('darkMode')}" title="${(typeof Accessibility !== 'undefined' && Accessibility.theme === 'dark') ? I18N.t('lightMode') : I18N.t('darkMode')}">
            ${(typeof Accessibility !== 'undefined' && Accessibility.theme === 'dark') ? Icons.sun : Icons.moon}
          </button>

          <!-- Notification Bell -->
          <div class="navbar-icon-btn" onclick="toggleNotifDropdown(event)" id="navNotifBtn" style="position:relative;" title="${I18N.t('navNotifications')}">
            ${Icons.bell}
            <span class="notif-badge" id="navNotifBadge">10</span>
            ${renderNotifDropdown()}
          </div>

          <!-- Hamburger Menu Button (3 lines - Opens Sidebar Drawer) -->
          <button class="navbar-toggle" onclick="openMobileNav()" aria-label="${I18N.t('navMenu')}" title="${I18N.t('navMenu')}">
            ${Icons.menu}
          </button>
        </div>
      </div>
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
    const btn = document.getElementById('navNotifBtn');
    const dd = document.getElementById('notifDropdown');
    if (dd && dd.classList.contains('open')) {
      if (!btn || (!btn.contains(e.target) && !dd.contains(e.target))) {
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
  const badge = document.getElementById('navNotifBadge');
  if (badge) badge.style.display = 'none';
  document.querySelectorAll('.notif-item.unread').forEach(n => n.classList.remove('unread'));
  document.querySelectorAll('.notif-dot').forEach(d => d.classList.add('read'));
}

// ============================================================
// ============================================================
// e-Samanvit — Featured Promotional Banner Carousel (7 Slides)
// ============================================================

function renderHeroSlider() {
  const slides = [
    {
      id: 1,
      badge: I18N.t('slide1Badge'),
      title: I18N.t('slide1Title'),
      desc: I18N.t('slide1Desc'),
      visualHtml: `
        <div class="hero-visual-card slide1-visual">
          <div class="hvc-header">
            <span class="hvc-badge green"><span class="hvc-pulse"></span> ${I18N.t('brandName')} Gateway</span>
            <span class="hvc-sub">Unified Citizen Window</span>
          </div>
          <div class="hvc-gateway-flow">
            <div class="hvc-flow-citizen">
              <div class="hvc-citizen-avatar">👥</div>
              <div>
                <div class="hvc-flow-title">Citizens of Maharashtra</div>
                <div class="hvc-flow-desc">Direct Single Point Access</div>
              </div>
            </div>
            <div class="hvc-flow-connector">
              <div class="hvc-flow-line"></div>
              <div class="hvc-flow-badge">e-Samanvit Single Window</div>
              <div class="hvc-flow-line"></div>
            </div>
            <div class="hvc-depts-grid">
              <div class="hvc-dept-item">
                <span class="hvc-dept-icon">🌾</span>
                <span class="hvc-dept-name">Agriculture</span>
              </div>
              <div class="hvc-dept-item">
                <span class="hvc-dept-icon">🎓</span>
                <span class="hvc-dept-name">Education</span>
              </div>
              <div class="hvc-dept-item">
                <span class="hvc-dept-icon">👩‍👧</span>
                <span class="hvc-dept-name">Social Welfare</span>
              </div>
              <div class="hvc-dept-item">
                <span class="hvc-dept-icon">🏥</span>
                <span class="hvc-dept-name">Healthcare</span>
              </div>
            </div>
          </div>
          <div class="hvc-footer-stat">
            <span>🏛️ Official Government Interoperability Platform</span>
          </div>
        </div>
      `
    },
    {
      id: 2,
      badge: I18N.t('slide2Badge'),
      title: I18N.t('slide2Title'),
      desc: I18N.t('slide2Desc'),
      visualHtml: `
        <div class="hero-visual-card slide2-visual">
          <div class="hvc-header">
            <span class="hvc-badge gold"><span class="hvc-pulse gold"></span> Dedicated Sectors</span>
            <span class="hvc-sub">Organized by Category</span>
          </div>
          <div class="hvc-categories-grid">
            <div class="hvc-cat-tile">
              <span class="hvc-cat-icon">🎓</span>
              <div class="hvc-cat-info">
                <span class="hvc-cat-name">Students</span>
                <span class="hvc-cat-desc">Scholarships & Exams</span>
              </div>
            </div>
            <div class="hvc-cat-tile">
              <span class="hvc-cat-icon">🌾</span>
              <div class="hvc-cat-info">
                <span class="hvc-cat-name">Farmers</span>
                <span class="hvc-cat-desc">Crops, Mandi & Subsidies</span>
              </div>
            </div>
            <div class="hvc-cat-tile">
              <span class="hvc-cat-icon">👩‍👧</span>
              <div class="hvc-cat-info">
                <span class="hvc-cat-name">Women & Child</span>
                <span class="hvc-cat-desc">Welfare & Nutrition</span>
              </div>
            </div>
            <div class="hvc-cat-tile">
              <span class="hvc-cat-icon">🏥</span>
              <div class="hvc-cat-info">
                <span class="hvc-cat-name">Healthcare</span>
                <span class="hvc-cat-desc">Medical Aid & Cards</span>
              </div>
            </div>
            <div class="hvc-cat-tile">
              <span class="hvc-cat-icon">👴</span>
              <div class="hvc-cat-info">
                <span class="hvc-cat-name">Senior Citizens</span>
                <span class="hvc-cat-desc">Pensions & Care</span>
              </div>
            </div>
            <div class="hvc-cat-tile">
              <span class="hvc-cat-icon">🏡</span>
              <div class="hvc-cat-info">
                <span class="hvc-cat-name">Housing</span>
                <span class="hvc-cat-desc">Shelter & Family Support</span>
              </div>
            </div>
          </div>
          <div class="hvc-footer-stat">
            <span>🔍 Find all relevant schemes grouped neatly in seconds</span>
          </div>
        </div>
      `
    },
    {
      id: 3,
      badge: I18N.t('slide3Badge'),
      title: I18N.t('slide3Title'),
      desc: I18N.t('slide3Desc'),
      visualHtml: `
        <div class="hero-visual-card slide3-visual">
          <div class="hvc-header">
            <span class="hvc-badge green"><span class="hvc-pulse"></span> Paperless Application</span>
            <span class="hvc-sub">Step-by-Step Online Guide</span>
          </div>
          <div class="hvc-steps-mini">
            <div class="hvc-step-row done">
              <div class="hvc-check">✓</div>
              <div class="hvc-step-text">
                <strong>Choose Your Scheme:</strong>
                <span>Select from verified citizen services</span>
              </div>
            </div>
            <div class="hvc-step-row done">
              <div class="hvc-check">✓</div>
              <div class="hvc-step-text">
                <strong>Enter Details Online:</strong>
                <span>Quick Aadhaar and record verification</span>
              </div>
            </div>
            <div class="hvc-step-row active">
              <div class="hvc-check live">✓</div>
              <div class="hvc-step-text">
                <strong>Instant Submission:</strong>
                <span>Receive official digital receipt and confirmation</span>
              </div>
            </div>
          </div>
          <div class="hvc-footer-stat">
            <span>📱 Fully accessible on any smartphone or computer</span>
          </div>
        </div>
      `
    },
    {
      id: 4,
      badge: I18N.t('slide4Badge'),
      title: I18N.t('slide4Title'),
      desc: I18N.t('slide4Desc'),
      visualHtml: `
        <div class="hero-visual-card slide4-visual">
          <div class="hvc-header">
            <span class="hvc-badge blue"><span class="hvc-pulse"></span> Direct Delivery</span>
            <span class="hvc-sub">Real-Time Tracking & DBT</span>
          </div>
          <div class="hvc-tracker-flow">
            <div class="hvc-track-item completed">
              <div class="hvc-track-dot"></div>
              <div class="hvc-track-content">
                <div class="hvc-track-title">Application Submitted</div>
                <div class="hvc-track-sub">Digital tracking ID generated</div>
              </div>
            </div>
            <div class="hvc-track-item completed">
              <div class="hvc-track-dot"></div>
              <div class="hvc-track-content">
                <div class="hvc-track-title">Department Verified</div>
                <div class="hvc-track-sub">Verified against official state records</div>
              </div>
            </div>
            <div class="hvc-track-item active">
              <div class="hvc-track-dot pulsing"></div>
              <div class="hvc-track-content">
                <div class="hvc-track-title">Direct Benefit Transfer (DBT)</div>
                <div class="hvc-track-sub">Financial subsidy deposited directly to bank</div>
              </div>
            </div>
          </div>
          <div class="hvc-footer-stat">
            <span>🔒 Direct bank deposits with zero middleman interference</span>
          </div>
        </div>
      `
    },
    {
      id: 5,
      badge: I18N.t('slide5Badge'),
      title: I18N.t('slide5Title'),
      desc: I18N.t('slide5Desc'),
      visualHtml: `
        <div class="hero-visual-card slide5-visual">
          <div class="hvc-header">
            <span class="hvc-badge blue">${Icons.globe} Native Multilingual</span>
            <span class="hvc-sub">Citizen Care & Assistance</span>
          </div>
          <div class="hvc-lang-triad">
            <div class="hvc-lang-card ${I18N.currentLang === 'mr' ? 'active' : ''}">
              <div class="hvc-lang-char">म</div>
              <div class="hvc-lang-name">मराठी</div>
              <div class="hvc-lang-tag">मातृभाषा</div>
            </div>
            <div class="hvc-lang-card ${I18N.currentLang === 'hi' ? 'active' : ''}">
              <div class="hvc-lang-char">अ</div>
              <div class="hvc-lang-name">हिंदी</div>
              <div class="hvc-lang-tag">सरल भाषा</div>
            </div>
            <div class="hvc-lang-card ${I18N.currentLang === 'en' ? 'active' : ''}">
              <div class="hvc-lang-char">En</div>
              <div class="hvc-lang-name">English</div>
              <div class="hvc-lang-tag">Standard</div>
            </div>
          </div>
          <div class="hvc-support-pair">
            <div class="hvc-support-item">
              <span class="hvc-support-icon">📜</span>
              <div class="hvc-support-text">
                <strong>Digital Certificates</strong>
                <span>Official & verifiable</span>
              </div>
            </div>
            <div class="hvc-support-item">
              <span class="hvc-support-icon">📞</span>
              <div class="hvc-support-text">
                <strong>Citizen Helpline</strong>
                <span>Prompt guidance & support</span>
              </div>
            </div>
          </div>
          <div class="hvc-footer-stat">
            <span>🤝 Accessible and supportive to every citizen across Maharashtra</span>
          </div>
        </div>
      `
    }
  ];

  return `
    <div class="hero-slider-wrap" id="heroSliderWrap">
      <div class="hero-slider" id="heroSlider" role="region" aria-label="Featured Government Services Carousel">
        <div class="hero-slider-track" id="heroSliderTrack">
          ${slides.map((s, index) => `
            <div class="hero-slide slide-${s.id}" data-slide-index="${index}">
              <div class="hero-slide-inner">
                <div class="hero-slide-content">
                  <div class="hero-slide-badge">
                    <span class="hero-slide-badge-dot"></span>
                    ${s.badge}
                  </div>
                  <h2 class="hero-slide-title">${s.title}</h2>
                  <p class="hero-slide-desc">${s.desc}</p>
                </div>
                <div class="hero-slide-visual">
                  ${s.visualHtml}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Slider Arrow Navigation -->
        <button class="hero-slider-btn prev" id="heroSliderPrev" onclick="HeroSlider.prev()" aria-label="${I18N.t('sliderPrev')}" title="${I18N.t('sliderPrev')}">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button class="hero-slider-btn next" id="heroSliderNext" onclick="HeroSlider.next()" aria-label="${I18N.t('sliderNext')}" title="${I18N.t('sliderNext')}">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Bottom Indicator Dots & Pause Button -->
      <div class="hero-slider-controls">
        <div class="hero-slider-dots" id="heroSliderDots" role="tablist"></div>
        <button class="hero-slider-pause-btn" id="heroSliderPauseBtn" onclick="HeroSlider.togglePause()" aria-label="${I18N.t('sliderPause')}" title="${I18N.t('sliderPause')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        </button>
      </div>
    </div>
  `;
}

const HeroSlider = {
  currentSlide: 0,
  totalSlides: 5,
  timer: null,
  duration: 5000, // 5s for comfortable reading
  isPaused: false,
  touchStartX: 0,
  touchEndX: 0,

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
                aria-label="Slide ${i + 1}"
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
  },

  handleSwipe() {
    const diff = this.touchEndX - this.touchStartX;
    if (Math.abs(diff) > 40) {
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

