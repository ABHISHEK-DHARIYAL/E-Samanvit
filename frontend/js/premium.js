/* ============================================================
   e-Samanvit — Simple & Clean Interactions
   Only: scroll-reveal, navbar shadow on scroll, smooth counters.
   No flashy effects — just clean and satisfying.
   ============================================================ */

(function () {
  'use strict';

  // ── Scroll Reveal (IntersectionObserver) ─────────────────────
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  // ── Auto-tag elements for reveal ────────────────────────────
  function autoTagRevealElements() {
    // Section headers
    document.querySelectorAll(
      '.section-title, .section-subtitle, .about-block, ' +
      '.contact-form-card, .contact-info-card'
    ).forEach(el => {
      if (!el.classList.contains('reveal') && !el.closest('.reveal-stagger')) {
        el.classList.add('reveal');
      }
    });

    // Grid containers get staggered reveal
    document.querySelectorAll(
      '.grid.grid-2, .grid.grid-3, .grid.grid-4, ' +
      '.why-cards, .service-cards, .resource-cards, ' +
      '.dash-stats, .dash-quick-actions'
    ).forEach(el => {
      if (!el.classList.contains('reveal-stagger')) {
        el.classList.add('reveal-stagger');
      }
    });
  }

  // ── Navbar shadow on scroll ─────────────────────────────────
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          navbar.classList.toggle('scrolled', window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Smooth stat counter (counts up when visible) ────────────
  function initAnimatedCounters() {
    const allStats = document.querySelectorAll(
      '.grid.grid-4 [style*="font-weight"][style*="font-size"]'
    );

    if (!allStats.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    allStats.forEach(el => {
      if (/[\d,]+/.test(el.textContent)) {
        observer.observe(el);
      }
    });
  }

  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/([\d,]+)/);
    if (!match) return;

    const target = parseInt(match[1].replace(/,/g, ''), 10);
    if (isNaN(target) || target === 0) return;

    const prefix = text.substring(0, text.indexOf(match[1]));
    const suffix = text.substring(text.indexOf(match[1]) + match[1].length);
    const duration = 2000;
    const startTime = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(easeOut(progress) * target);
      el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = text; // Restore original
      }
    }

    requestAnimationFrame(update);
  }

  // ── Ambient Micro-Bubbles Generator (For all Logos, Icons, and Hero Elements) ──
  function initGreenMicroBubbles() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Clean up any existing bubbles in navbar brand and icon containers, plus reset if count is excessive
    document.querySelectorAll('.navbar-brand .micro-bubble-container, .card-icon .micro-bubble-container, .why-cards .micro-bubble-container').forEach(c => c.remove());
    document.querySelectorAll('.hero .micro-bubble-container, .dash-header .micro-bubble-container, .notif-hero-header .micro-bubble-container').forEach(c => {
      if (c.children.length > 15) c.remove();
    });

    // Comprehensive list covering Badges, Hero, Footer, and Service Elements (Excluding icon badges & navbar-brand)
    const bubbleTargetSelectors = [
      '.contact-info-icon',
      '.qa-icon',
      '.node-icon',
      '.icon-wrap',

      // Footer brand & other logos (excluding top-corner navbar brand)
      '.footer-brand',
      '.hero-content > div:first-child',

      // Hero & Feature Sections
      '.hero',
      '.dash-header',
      '.notif-hero-header',
      '.dash-welcome',
      '.footer',
      '.btn-primary',
      '.badge',
      '.badge-green',
      '.badge-gold',
      '.badge-blue',
      '.node-citizen',
      '.node-samanvit',
      '.node-samanvay',
      '.interop-node',
      '.about-hero',
      '.services-hero',
      '.resources-hero',
      '.contact-hero',
      '.filter-pill.active',
      '.sidebar-link.active',
      '.es-logo-icon',
      'section[style*="hero_nature_bg"]',
      'section[style*="clr-primary"]',
      'section[style*="#1A5E20"]',
      'section[style*="#1B5E20"]',
      'section[style*="#2E7D32"]',
      'div[style*="border-left:5px solid var(--clr-success)"]'
    ];

    let elements = [];
    try {
      elements = Array.from(document.querySelectorAll(bubbleTargetSelectors.join(', ')));
    } catch (e) {
      elements = Array.from(document.querySelectorAll('.card-icon, .card-icon-green, .card-icon-gold, .card-icon-blue, .card-icon-orange, .contact-info-icon, .qa-icon, .footer-brand, .badge, .hero, .dash-header, .notif-hero-header, .footer, .btn-primary, .about-hero, .services-hero, .resources-hero, .contact-hero'));
    }

    // Cover image parent containers (excluding navbar-brand)
    document.querySelectorAll('.hero-content img, .footer-brand img, .features-section img').forEach(img => {
      const parent = img.parentElement;
      if (parent && !elements.includes(parent) && !parent.closest('.navbar-brand')) {
        elements.push(parent);
      }
    });

    // Strictly filter out navbar-brand AND child elements inside headers (to avoid duplicate crowding inside hero & dash-header)
    elements = elements.filter(el => {
      if (!el || el.closest('.navbar-brand') || el.classList.contains('navbar-brand')) return false;
      const parentHeader = el.closest('.hero, .dash-header, .notif-hero-header, section[style*="hero_nature_bg"]');
      if (parentHeader && parentHeader !== el) {
        return false;
      }
      return true;
    });

    elements.forEach(el => {
      if (!el || el.tagName === 'IMG') return; // Cannot append to void img elements

      // Prevent duplicate containers
      if (el.querySelector(':scope > .micro-bubble-container')) return;

      const style = window.getComputedStyle(el);
      if (style.position === 'static') {
        el.style.position = 'relative';
      }
      if (style.overflow !== 'hidden' && (el.classList.contains('card-icon') || el.classList.contains('badge') || el.classList.contains('qa-icon') || el.classList.contains('contact-info-icon'))) {
        el.style.overflow = 'hidden';
      }

      const rect = el.getBoundingClientRect();
      const width = rect.width || el.offsetWidth || 56;
      const height = rect.height || el.offsetHeight || 56;
      const area = width * height;

      const container = document.createElement('div');
      container.className = 'micro-bubble-container';
      container.setAttribute('aria-hidden', 'true');

      // Travel full height of the element plus margin
      const travel = Math.round(height + 12);

      // Moderate count for all elements (balanced & clean)
      const isHeader = el.matches('.hero, .dash-header, .notif-hero-header, section[style*="hero_nature_bg"]');
      let count = 4;
      if (isHeader) {
        count = 12; // Moderate, graceful and calm for Home Hero & Dashboard Header
      } else if (area > 150000) {
        count = 12; // Footer / large banners
      } else if (area > 40000) {
        count = 8;  // Section boxes
      } else if (area > 5000) {
        count = 4;  // Buttons / large cards / logo blocks
      } else {
        count = 3;  // Card icons / badges / pills / logos
      }

      // Determine bubble color theme (dark, gold, blue, or green)
      const isDark = el.matches('.hero, .dash-header, .notif-hero-header, section[style*="hero_nature_bg"], .dash-welcome, .footer, .btn-primary, .es-logo-icon, .filter-pill.active, section[style*="clr-primary-900"], section[style*="clr-primary-800"]');
      const isGold = el.matches('.card-icon-gold, .badge-gold, .avatar-gold, [class*="gold"], [class*="orange"]');
      const isBlue = el.matches('.card-icon-blue, .badge-blue, [class*="blue"]');

      let bubbleThemeClass = 'light-green-bubble';
      if (isDark) {
        bubbleThemeClass = 'dark-green-bubble';
      } else if (isGold) {
        bubbleThemeClass = 'gold-bubble';
      } else if (isBlue) {
        bubbleThemeClass = 'blue-bubble';
      }

      for (let i = 0; i < count; i++) {
        const bubble = document.createElement('span');
        bubble.className = 'micro-bubble ' + bubbleThemeClass;

        // Subtle micro dimensions (2px - 3.4px)
        const size = (Math.random() * 1.5 + 2.0).toFixed(1);
        const left = (Math.random() * 92 + 4).toFixed(1);

        // Calm, smooth, slower floating duration
        const baseDuration = Math.max((travel / 55) + (Math.random() * 2 - 1), 4.8);
        const duration = baseDuration.toFixed(2);

        // Negative delay so bubbles are spaced out smoothly
        const delay = (Math.random() * (baseDuration * 2) - baseDuration).toFixed(2);
        const drift = (Math.random() * 8 - 4).toFixed(1); // -4px to +4px gentle sway
        const maxOpacity = isDark ? (Math.random() * 0.15 + 0.28).toFixed(2) : (Math.random() * 0.15 + 0.15).toFixed(2);

        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = left + '%';
        bubble.style.setProperty('--mb-duration', duration + 's');
        bubble.style.setProperty('--mb-delay', delay + 's');
        bubble.style.setProperty('--mb-drift', drift + 'px');
        bubble.style.setProperty('--mb-travel', travel + 'px');
        bubble.style.setProperty('--mb-max-opacity', maxOpacity);

        container.appendChild(bubble);
      }

      // Insert container behind foreground content
      el.insertBefore(container, el.firstChild);
    });
  }

  // ── Scroll-to-Top Floating Button ─────────────────────────
  function initScrollToTop() {
    if (document.getElementById('scrollToTopBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.className = 'scroll-to-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top of page');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ── Master Init ─────────────────────────────────────────────
  function initEffects() {
    autoTagRevealElements();
    initScrollReveal();
    initNavbarScroll();
    initAnimatedCounters();
    initGreenMicroBubbles();
    initScrollToTop();
  }

  // Hook into App navigation lifecycle
  const origNavigate = typeof App !== 'undefined' && App.navigate
    ? App.navigate.bind(App) : null;

  if (origNavigate) {
    App.navigate = function (page) {
      origNavigate(page);
      requestAnimationFrame(() => {
        setTimeout(initEffects, 80);
        setTimeout(initGreenMicroBubbles, 250);
      });
    };
  }

  // Continuous DOM Mutation Observer & Periodic Heartbeat for Non-Stop Execution
  let observer = null;
  function startContinuousObserver() {
    if (observer) return;
    observer = new MutationObserver(() => {
      initGreenMicroBubbles();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Periodic heartbeat every 600ms ensures any dynamic updates get covered continuously
    setInterval(initGreenMicroBubbles, 600);
  }

  // Init on load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
      initEffects();
      startContinuousObserver();
    }, 120);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        initEffects();
        startContinuousObserver();
      }, 120);
    });
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      initEffects();
      startContinuousObserver();
    }, 200);
  });

  window.initGreenMicroBubbles = initGreenMicroBubbles;
  window.initEffects = initEffects;

})();



