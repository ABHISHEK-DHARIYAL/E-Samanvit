/* ============================================================
   e-Samanvit - Reusable Component Renderers
   ============================================================ */

// -- Navbar (Public Pages) -----------------------------------
function renderPublicNavbar(activePage) {
  // Main desktop links: Home, About, Impact, Dashboard
  const navLinks = [
    { id: 'home', label: I18N.t('navHome'), icon: Icons.home },
    { id: 'about', label: I18N.t('navAbout'), icon: Icons.about },
    { id: 'impact', label: I18N.t('navImpact'), icon: Icons.trendingUp },
    { id: 'dashboard', label: I18N.t('navDashboard'), icon: Icons.dashboard },
  ];

  const navLinkIds = navLinks.map(l => l.id);

  // All menu items candidate for the slideout sidebar drawer
  const allSidebarLinks = [
    { id: 'home', label: I18N.t('navHome'), icon: Icons.home },
    { id: 'dashboard', label: I18N.t('navDashboard'), icon: Icons.dashboard },
    { id: 'gov-services', label: 'Apply Online', icon: Icons.zap },
    { id: 'my-applications', label: 'My Applications', icon: Icons.fileText },
    { id: 'impact', label: I18N.t('navImpact'), icon: Icons.trendingUp },
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
        </div>
        <button class="mobile-nav-close" onclick="closeMobileNav()">${Icons.x}</button>
      </div>

      <div class="mobile-nav-links">
        <div style="font-size:var(--fs-xs);font-weight:var(--fw-bold);text-transform:uppercase;color:var(--clr-gray-500);letter-spacing:0.5px;padding:var(--sp-2) var(--sp-4) 0">${I18N.t('navMenu')}</div>
        ${sidebarLinks.map(l => `
          <a class="mobile-nav-link ${activePage === l.id ? 'active' : ''}" onclick="navigateTo('${l.id}');closeMobileNav();">${l.icon} ${l.label}</a>
        `).join('')}
        
        <div class="mobile-nav-divider"></div>
        <div style="font-size:var(--fs-xs);font-weight:var(--fw-bold);text-transform:uppercase;color:var(--clr-gray-500);letter-spacing:0.5px;padding:var(--sp-2) var(--sp-4) 0">${I18N.t('navCategories')}</div>
        <a class="mobile-nav-link" onclick="navigateTo('services');closeMobileNav();">${Icons.fileText} ${I18N.t('catGovtSchemes')}</a>
        <a class="mobile-nav-link" onclick="navigateTo('services');closeMobileNav();">${Icons.leaf} ${I18N.t('catAgri')}</a>
        <a class="mobile-nav-link" onclick="navigateTo('services');closeMobileNav();">${Icons.graduationCap} ${I18N.t('catEdu')}</a>
        <a class="mobile-nav-link" onclick="navigateTo('services');closeMobileNav();">${Icons.briefcase} ${I18N.t('catFinancial')}</a>
        <a class="mobile-nav-link" onclick="navigateTo('services');closeMobileNav();">${Icons.trendingUp} ${I18N.t('catMarketSupport')}</a>

        <div class="mobile-nav-divider"></div>
        <div style="padding:var(--sp-3) var(--sp-4)">
          <div style="font-size:var(--fs-xs);color:var(--clr-gray-500);margin-bottom:var(--sp-2)">${I18N.t('selectLanguage')}</div>
          <select class="lang-selector" style="width:100%" onchange="I18N.setLanguage(this.value)">
            <option value="en" ${I18N.currentLang === 'en' ? 'selected' : ''}>English</option>
            <option value="hi" ${I18N.currentLang === 'hi' ? 'selected' : ''}>हिंदी</option>
            <option value="mr" ${I18N.currentLang === 'mr' ? 'selected' : ''}>मराठी</option>
          </select>
        </div>
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
    { id: 'impact', label: I18N.t('navImpact'), icon: Icons.trendingUp },
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
              <a class="footer-link" onclick="navigateTo('impact')">${I18N.t('navImpact')}</a>
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
