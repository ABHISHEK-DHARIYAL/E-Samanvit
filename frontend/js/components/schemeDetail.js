/* ============================================================
   e-Samanvit — Scheme Detail Page (ONE reusable template)
   ============================================================
   How this file works:

   1. `SCHEME_DETAILS` is a plain data map, keyed by the same
      scheme `id` used in `SERVICE_CATEGORIES` (see js/pages.js).
      Every entry follows the exact same shape:

        {
          overview: "one paragraph, plain text",
          keyBenefits:   [ { title, text } ],
          eligibility:   [ { title, text } ],
          importantDates: { title, range, note },
          requiredDocuments: [ "doc 1", "doc 2", ... ],
          sources: [ { label, url } ]   // official / reference links
        }

   2. `renderSchemeDetailTemplate()` turns ANY entry above (plus
      the scheme's card data from SERVICE_CATEGORIES) into the
      same page layout. It is the single template every scheme
      "View Details" click reuses — nothing scheme-specific is
      hard-coded in the markup itself.

   3. To add a new scheme's detail content, add one more entry to
      SCHEME_DETAILS using the id already defined in js/pages.js
      (e.g. 'f1', 'w2', ...). Nothing else needs to change — the
      page, routing and styling are already wired up.

   4. Schemes that don't have an entry yet still open a page (via
      the same template) with an honest "being added" placeholder
      instead of a broken link — see renderSchemeDetailPage().
   ============================================================ */

// -- Reusable detail-content data, one entry per scheme id ----
const SCHEME_DETAILS = {
  s1: {
    overview: "This scheme gives students from marginalized and economically weaker communities financial relief while they pursue post-matric (after Class 10) education in Maharashtra. It covers tuition, examination and other approved fees, plus a monthly maintenance allowance, so the cost of studying further doesn't fall entirely on the family.",
    keyBenefits: [
      {
        title: 'Fee Waivers',
        text: '100% reimbursement or waiver of mandatory tuition and examination fees for recognized courses, depending on whether the institution is government-aided or unaided.'
      },
      {
        title: 'Maintenance Allowance',
        text: 'A monthly stipend for up to 10 months a year. The amount depends on the course level and whether the student stays in a hostel or attends as a day scholar.'
      },
      {
        title: 'Additional Allowances',
        text: 'Extra support for things like study tours or thesis typing, and additional provisions for students with disabilities where applicable.'
      }
    ],
    eligibility: [
      { title: 'Domicile', text: 'Must be a resident/domicile of Maharashtra.' },
      { title: 'Category', text: 'Belongs to SC, ST, OBC, SBC, VJNT, or EWS/EBC category, as defined by the relevant department guidelines.' },
      { title: 'Income Limit', text: "Annual family income generally at or below ₹2.50 lakh for SC/OBC/Special Assistance schemes. Some EWS/EBC or technical-course categories allow up to ₹8 lakh — check the exact limit for your category and course." },
      { title: 'Academic Progress', text: "Must have passed the previous year's examination, without a prolonged gap in education." }
    ],
    importantDates: {
      title: 'Academic Year 2026–27 Applications',
      range: 'June 1, 2026 – September 30, 2026',
      note: 'Dates are set for each academic year — always confirm the current window on the official MahaDBT portal before applying.'
    },
    requiredDocuments: [
      'Caste certificate',
      'Income certificate issued by a competent authority',
      "Previous year's marksheets",
      'Fee receipt from the institution',
      'Aadhaar-seeded bank account details (for Direct Bank Transfer)'
    ],
    sources: [
      { label: 'Social Justice & Special Assistance Department, Maharashtra', url: 'https://sjsa.maharashtra.gov.in/en/scheme/government-of-india-post-matric-scholarship-scheme' },
      { label: 'MahaDBT — Scheme Data', url: 'https://www.mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A19A7691F3B40AD4EE0F3DDA5DE324AC54819922BB3D36B63' },
      { label: 'Buddy4Study — Scheme Overview', url: 'https://www.buddy4study.com/scholarship/government-of-india-postmatric-scholarship-maharashtra' }
    ]
  }
  // Add the next scheme here, e.g.:
  // s2: { overview: '...', keyBenefits: [...], eligibility: [...], importantDates: {...}, requiredDocuments: [...], sources: [...] },
};

// -- Look up a scheme's card summary (title/dept/badge/etc.) --------
// SERVICE_CATEGORIES lives in js/pages.js; searching it here keeps
// this file the single source of truth for the detail template
// without duplicating any card data.
function findSchemeCardById(schemeId) {
  if (typeof SERVICE_CATEGORIES === 'undefined') return null;
  for (const cat of SERVICE_CATEGORIES) {
    const found = (cat.schemes || []).find(s => s.id === schemeId);
    if (found) return { ...found, categoryKey: cat.key };
  }
  return null;
}

// -- Navigation entry point, called from the "View Details" button --
function openSchemeDetail(schemeId) {
  if (typeof window !== 'undefined') {
    window.currentSchemeDetailId = schemeId;
  }
  if (typeof navigateTo === 'function') {
    navigateTo('scheme-detail');
  }
}

function backToSchemeCategory() {
  const card = findSchemeCardById(window.currentSchemeDetailId);
  if (card && typeof navigateTo === 'function') {
    navigateTo('services', { category: card.categoryKey });
  } else if (typeof navigateTo === 'function') {
    navigateTo('services');
  }
}

// -- Router-facing page renderer (registered in js/app.js) ----------
function renderSchemeDetailPage() {
  const schemeId = typeof window !== 'undefined' ? window.currentSchemeDetailId : null;
  const card = findSchemeCardById(schemeId);
  const detail = schemeId ? SCHEME_DETAILS[schemeId] : null;

  if (!card) {
    return `
      <div class="container" style="padding:var(--sp-12) 0">
        <div class="scheme-detail-empty">
          <h2>${I18N.t('schemeDetails') || 'Scheme details'}</h2>
          <p>We couldn't find that scheme. It may have moved — please go back and pick it again.</p>
          <button class="btn btn-primary" onclick="navigateTo('services')">${I18N.t('backToCategories') || 'Back to Services'}</button>
        </div>
      </div>
    `;
  }

  return renderSchemeDetailTemplate(card, detail);
}

// -- THE single reusable template every scheme uses ------------------
function renderSchemeDetailTemplate(card, detail) {
  const badgeClass = card.badgeColor === 'green' ? 'badge-green' : card.badgeColor === 'gold' ? 'badge-gold' : 'badge-blue';

  return `
    <div class="container scheme-detail-page">
      <div style="margin:var(--sp-6) 0">
        <button class="btn btn-outline btn-sm" onclick="backToSchemeCategory()">
          ${Icons.chevronDown ? '' : ''}&larr; ${I18N.t('backToCategories') || 'Back'}
        </button>
      </div>

      <!-- Hero -->
      <div class="scheme-detail-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:var(--sp-4);flex-wrap:wrap">
          <div>
            <div style="display:flex;gap:var(--sp-2);align-items:center;margin-bottom:var(--sp-3)">
              <span class="badge ${badgeClass}">${escapeHtml(card.badge || '')}</span>
              <span class="cat-scheme-verified-badge">VERIFIED</span>
            </div>
            <h1 class="scheme-detail-title">${escapeHtml(card.title)}</h1>
            <p class="scheme-detail-dept">${escapeHtml(card.dept || '')}</p>
          </div>
          <div class="scheme-detail-benefit-pill">
            <span class="scheme-detail-benefit-label">Official Benefit</span>
            <span class="scheme-detail-benefit-value">${escapeHtml(card.benefits || '')}</span>
          </div>
        </div>
        <div style="display:flex;gap:var(--sp-3);margin-top:var(--sp-6);flex-wrap:wrap">
          <button class="btn btn-primary" onclick="handleSchemeApply('${card.id}', '${escapeHtml(card.title).replace(/'/g, "\\'")}')">
            ${Icons.zap} ${I18N.t('applyOnline') || 'Apply Online'}
          </button>
          <button class="btn btn-ghost" onclick="navigateTo('contact')">
            ${Icons.mail} Need Help? Contact Us
          </button>
        </div>
      </div>

      ${!detail ? `
      <!-- Honest placeholder — content for this scheme hasn't been added yet -->
      <div class="scheme-detail-section scheme-detail-placeholder">
        ${Icons.alertCircle}
        <p><strong>Full details for this scheme are being added.</strong></p>
        <p>In the meantime, the summary above is verified — for eligibility, documents, and the exact application window, use "Apply Online" or reach out through Contact Us.</p>
      </div>
      ` : `
      <!-- Overview -->
      <div class="scheme-detail-section">
        <h2 class="scheme-detail-section-title">${Icons.fileText} Overview</h2>
        <p class="scheme-detail-overview-text">${escapeHtml(detail.overview)}</p>
      </div>

      <!-- Key Benefits -->
      <div class="scheme-detail-section">
        <h2 class="scheme-detail-section-title">${Icons.award} Key Benefits</h2>
        <div class="scheme-detail-item-list">
          ${detail.keyBenefits.map(b => `
            <div class="scheme-detail-item">
              <div class="scheme-detail-item-icon">${Icons.check}</div>
              <div>
                <div class="scheme-detail-item-title">${escapeHtml(b.title)}</div>
                <div class="scheme-detail-item-text">${escapeHtml(b.text)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Eligibility Criteria -->
      <div class="scheme-detail-section">
        <h2 class="scheme-detail-section-title">${Icons.shield} Eligibility Criteria</h2>
        <div class="scheme-detail-item-list">
          ${detail.eligibility.map(e => `
            <div class="scheme-detail-item">
              <div class="scheme-detail-item-icon">${Icons.check}</div>
              <div>
                <div class="scheme-detail-item-title">${escapeHtml(e.title)}</div>
                <div class="scheme-detail-item-text">${escapeHtml(e.text)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Important Dates & Application Process -->
      <div class="scheme-detail-section">
        <h2 class="scheme-detail-section-title">${Icons.calendar} Important Dates &amp; Application Process</h2>
        <div class="scheme-detail-dates-box">
          <div class="scheme-detail-dates-title">${escapeHtml(detail.importantDates.title)}</div>
          <div class="scheme-detail-dates-range">${escapeHtml(detail.importantDates.range)}</div>
          ${detail.importantDates.note ? `<div class="scheme-detail-dates-note">${escapeHtml(detail.importantDates.note)}</div>` : ''}
        </div>
        <h3 class="scheme-detail-subheading">Required Documents</h3>
        <ul class="scheme-detail-doc-checklist">
          ${detail.requiredDocuments.map(d => `<li>${Icons.check}<span>${escapeHtml(d)}</span></li>`).join('')}
        </ul>
      </div>

      <!-- Sources -->
      <div class="scheme-detail-section scheme-detail-sources">
        <h2 class="scheme-detail-section-title">${Icons.externalLink} Official Sources</h2>
        <p class="scheme-detail-sources-note">Information above is summarized from the following official and reference pages. Always confirm current details on the official portal before applying.</p>
        <ul class="scheme-detail-sources-list">
          ${detail.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)} ${Icons.externalLink}</a></li>`).join('')}
        </ul>
      </div>
      `}

      <div style="text-align:center;margin:var(--sp-12) 0">
        <button class="btn btn-secondary btn-lg" onclick="backToSchemeCategory()">
          ${I18N.t('backToCategories') || 'Back to Services'}
        </button>
      </div>
    </div>
  `;
}
