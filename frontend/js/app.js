/* ============================================================
   e-Samanvit - Main App Controller & Router
   ============================================================ */

const App = {
  rootEl: null,
  currentPage: null,

  init() {
    this.rootEl = document.getElementById('app');
    if (!this.rootEl) return;
    // Start on home page directly
    this.navigate('home');
  },

  navigate(page, params = {}) {
    this.currentPage = page;
    if (page === 'services') {
      window.currentServiceCategory = (params && params.category) ? params.category : null;
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = '';

    // Close any open overlays
    try { closeMobileNav?.(); } catch(e){}
    try { closeSidebar?.(); } catch(e){}

    const renderers = {
      'home':           typeof renderHomePage !== 'undefined' ? renderHomePage : null,
      'about':          typeof renderAboutPage !== 'undefined' ? renderAboutPage : null,
      'services':       typeof renderServicesPage !== 'undefined' ? renderServicesPage : null,
      'resources':      typeof renderResourcesPage !== 'undefined' ? renderResourcesPage : null,
      'contact':        typeof renderContactPage !== 'undefined' ? renderContactPage : null,
      'dashboard':      typeof renderDashboardPage !== 'undefined' ? renderDashboardPage : null,
      'profile':        typeof renderDashboardPage !== 'undefined' ? renderDashboardPage : null,
      'notifications':  typeof renderNotificationsPage !== 'undefined' ? renderNotificationsPage : null,
      'gov-services':   typeof renderGovServicesPage !== 'undefined' ? renderGovServicesPage : null,
      'my-applications': typeof renderMyApplicationsPage !== 'undefined' ? renderMyApplicationsPage : null,
    };

    const render = renderers[page] || renderers['home'] || renderHomePage;
    if (typeof render === 'function') {
      this.rootEl.innerHTML = render();
    } else if (typeof renderHomePage === 'function') {
      this.rootEl.innerHTML = renderHomePage();
    }

    // Post-render hooks
    this.afterRender();

    // Update document title
    const titles = {
      'home': 'e-Samanvit - Government Services & Public Information Portal',
      'about': 'About - e-Samanvit Portal',
      'services': 'Services Portal - e-Samanvit',
      'resources': 'Public Resources - e-Samanvit',
      'contact': 'Contact Us - e-Samanvit Helpdesk',
      'dashboard': 'Dashboard - e-Samanvit Citizen Portal',
      'notifications': 'Notifications - e-Samanvit',
      'gov-services': 'Apply Online - e-Samanvit',
      'my-applications': 'My Applications - e-Samanvit',
    };
    document.title = titles[page] || 'e-Samanvit - Government Services Portal';
  },

  renderPlaceholderPage(page) {
    return typeof renderDashboardPage === 'function' ? renderDashboardPage() : '';
  },

  afterRender() {
    // Show sidebar toggle on mobile if needed
    const sidebarToggle = document.getElementById('sidebarToggleBtn');
    if (sidebarToggle && window.innerWidth <= 1024) {
      sidebarToggle.style.display = 'inline-flex';
    }

    // Page-specific mount hooks — for pages whose content depends on an
    // async API call rather than static markup. Kept as a single small
    // dispatch here rather than scattering "if currentPage === X" checks
    // elsewhere in the router.
    if (this.currentPage === 'gov-services' && typeof GovServices !== 'undefined') {
      GovServices.onMount();
    }
    if (this.currentPage === 'my-applications' && typeof MyApplications !== 'undefined') {
      MyApplications.onMount();
    }
    if ((this.currentPage === 'dashboard' || this.currentPage === 'profile') && typeof Dashboard !== 'undefined') {
      Dashboard.onMount();
    }

    // Mount Hero Banner Slider if on homepage
    if ((!this.currentPage || this.currentPage === 'home') && typeof EsamBanner !== 'undefined') {
      EsamBanner.init();
    } else if (typeof EsamBanner !== 'undefined') {
      EsamBanner.stop();
    }
    // Legacy HeroSlider fallback (kept for compatibility)
    if ((!this.currentPage || this.currentPage === 'home') && typeof HeroSlider !== 'undefined' && typeof EsamBanner === 'undefined') {
      HeroSlider.init();
    } else if (typeof HeroSlider !== 'undefined' && typeof EsamBanner === 'undefined') {
      HeroSlider.stopAutoplay();
    }

    // Keep theme controls and icons synced with active state
    if (typeof Accessibility !== 'undefined' && Accessibility.updateThemeControls) {
      Accessibility.updateThemeControls();
    }
  }
};

// -- Global Navigation Function ------------------------------
function navigateTo(page, params = {}) {
  App.navigate(page, params);
}

// -- Handle Resize -------------------------------------------
window.addEventListener('resize', () => {
  const sidebarToggle = document.getElementById('sidebarToggleBtn');
  if (sidebarToggle) {
    sidebarToggle.style.display = window.innerWidth <= 1024 ? 'inline-flex' : 'none';
  }
  // Close sidebar on desktop
  if (window.innerWidth > 1024) {
    try { closeSidebar?.(); } catch(e){}
    try { closeMobileNav?.(); } catch(e){}
  }
});

// -- Robust Initialization (RACE-FREE FOR LIVE PREVIEWS) -----
function startApp() {
  try {
    if (typeof App !== 'undefined' && App.init) {
      App.init();
    }
  } catch (err) {
    console.error("App initialization failed:", err);
  }
}
