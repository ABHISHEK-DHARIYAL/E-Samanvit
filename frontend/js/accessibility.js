/* ============================================================
   e-Samanvit — Accessibility Controller (Font Scaling & High Contrast)
   ============================================================ */

const Accessibility = {
  fontSize: localStorage.getItem('esamanvit_fontsize') || localStorage.getItem('esamanvay_fontsize') || 'base',
  highContrast: (localStorage.getItem('esamanvit_contrast') || localStorage.getItem('esamanvay_contrast')) === 'true',

  init() {
    this.setFontSize(this.fontSize, false);
    this.setHighContrast(this.highContrast, false);
  },

  setFontSize(size, save = true) {
    this.fontSize = size;
    document.documentElement.setAttribute('data-font-size', size);
    
    // Adjust body font sizing classes
    document.body.classList.remove('font-sm', 'font-base', 'font-lg');
    document.body.classList.add(`font-${size}`);

    if (save) {
      localStorage.setItem('esamanvit_fontsize', size);
    }
  },

  setHighContrast(enable, save = true) {
    this.highContrast = enable;
    if (enable) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    if (save) {
      localStorage.setItem('esamanvit_contrast', enable);
    }
  },

  toggleHighContrast() {
    this.setHighContrast(!this.highContrast);
  }
};

// Initialize accessibility on DOM load
document.addEventListener('DOMContentLoaded', () => {
  Accessibility.init();
});
