/* ============================================================
   e-Samanvit — Accessibility & Theme Controller
   ============================================================ */

const Accessibility = {
  fontSize: (function() {
    try {
      return localStorage.getItem('esamanvit_fontsize') || localStorage.getItem('esamanvay_fontsize') || 'base';
    } catch(e) { return 'base'; }
  })(),
  highContrast: (function() {
    try {
      return (localStorage.getItem('esamanvit_contrast') || localStorage.getItem('esamanvay_contrast')) === 'true';
    } catch(e) { return false; }
  })(),
  // Strict requirement: Default mode is normal (white / light mode)
  theme: (function() {
    try {
      const saved = localStorage.getItem('esamanvit_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch(e) {
      return 'light';
    }
  })(),

  init() {
    this.setFontSize(this.fontSize, false);
    this.setHighContrast(this.highContrast, false);
    this.setTheme(this.theme, false);
  },

  setFontSize(size, save = true) {
    this.fontSize = size;
    document.documentElement.setAttribute('data-font-size', size);
    
    // Adjust body font sizing classes
    if (document.body) {
      document.body.classList.remove('font-sm', 'font-base', 'font-lg');
      document.body.classList.add(`font-${size}`);
    }

    if (save) {
      try { localStorage.setItem('esamanvit_fontsize', size); } catch(e){}
    }
  },

  setHighContrast(enable, save = true) {
    this.highContrast = enable;
    if (document.body) {
      if (enable) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    }
    if (save) {
      try { localStorage.setItem('esamanvit_contrast', enable); } catch(e){}
    }
  },

  toggleHighContrast() {
    this.setHighContrast(!this.highContrast);
  },

  setTheme(theme, save = true) {
    const activeTheme = theme === 'dark' ? 'dark' : 'light';
    this.theme = activeTheme;

    // Apply attributes on both html and body for maximum CSS reliability
    document.documentElement.setAttribute('data-theme', activeTheme);
    if (document.body) {
      if (activeTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.documentElement.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
        document.documentElement.classList.remove('dark-theme');
      }
    }

    if (save) {
      try {
        localStorage.setItem('esamanvit_theme', activeTheme);
      } catch(e){}
    }

    this.updateThemeControls();
  },

  toggleTheme() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark', true);
  },

  updateThemeControls() {
    const isDark = this.theme === 'dark';
    const darkLabel = (typeof I18N !== 'undefined' && I18N.t) ? I18N.t('darkMode') : 'Dark Mode';
    const lightLabel = (typeof I18N !== 'undefined' && I18N.t) ? I18N.t('lightMode') : 'Light Mode';
    const activeTitle = isDark ? lightLabel : darkLabel;

    // Standard sun & moon icons
    const sunSvg = (typeof Icons !== 'undefined' && Icons.sun)
      ? Icons.sun
      : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

    const moonSvg = (typeof Icons !== 'undefined' && Icons.moon)
      ? Icons.moon
      : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

    const activeIcon = isDark ? sunSvg : moonSvg;

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', activeTitle);
      btn.setAttribute('title', activeTitle);
      // If button has specific text label or icon-only
      if (btn.classList.contains('theme-toggle-btn-with-label')) {
        btn.innerHTML = `${activeIcon} <span>${activeTitle}</span>`;
      } else {
        btn.innerHTML = activeIcon;
      }
    });

    document.querySelectorAll('.mobile-theme-icon').forEach(iconEl => {
      iconEl.innerHTML = activeIcon;
    });

    document.querySelectorAll('.theme-toggle-label-text').forEach(labelEl => {
      labelEl.textContent = isDark ? darkLabel : lightLabel;
    });
  }
};

// Global helper for onclick handlers
function toggleTheme() {
  Accessibility.toggleTheme();
}

if (typeof window !== 'undefined') {
  window.Accessibility = Accessibility;
  window.toggleTheme = toggleTheme;
}

// Immediate theme bootstrap to prevent style flash (default = light)
(function bootstrapTheme() {
  try {
    const saved = localStorage.getItem('esamanvit_theme');
    const theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    }
  } catch(e){}
})();

// Initialize accessibility on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    Accessibility.init();
  });
} else {
  Accessibility.init();
}
