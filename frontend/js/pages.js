/* ============================================================
   e-Samanvit - Public Pages Portal
   ============================================================ */

// -- Home Page -----------------------------------------------
function renderHomePage() {
  return `
    ${renderPublicNavbar('home')}
    <div class="page-layout">
      <!-- Official Portal Brand Header Section (Logo, Portal Title, MH Government Emblems) -->
      <section class="hero" style="padding: 24px 0 26px; background: linear-gradient(90deg, rgba(13, 59, 23, 0.82) 0%, rgba(18, 77, 36, 0.65) 50%, rgba(13, 59, 23, 0.80) 100%), url('assets/hero_nature_bg.png') center center / cover no-repeat !important; position: relative;">
        <div class="container">
          <!-- Top Official Branding Row: Logo + e-Samanvit Name + Maharashtra Emblems -->
          <div class="hero-brand-row">
            <!-- Left Side: Hero Content & e-Samanvit Logo -->
            <div class="hero-brand-left">
              <div class="hero-logo-box">
                <img src="assets/logo.jpg" alt="e-Samanvit Logo" class="hero-logo-img">
              </div>
              <div class="hero-brand-text-col">
                <h1 class="hero-brand-title">${I18N.t('brandName')}</h1>
                <p class="hero-tagline">${I18N.t('brandSub')}</p>
              </div>
            </div>

            <!-- Right Side: Government Emblems -->
            <div class="hero-emblems-box">
              <div class="hero-emblems-logos">
                <div class="hero-emblem-wrap">
                  <div class="hero-emblem-glow green"></div>
                  <img src="assets/mh_logo1.jpg" alt="Government Emblem 1" class="hero-emblem-img">
                </div>
                <div class="hero-emblem-wrap">
                  <div class="hero-emblem-glow blue"></div>
                  <img src="assets/mh_logo2.jpg" alt="Government Emblem 2" class="hero-emblem-img">
                </div>
              </div>
              <div class="hero-emblem-text-mr">${I18N.t('govOfMhMr')}</div>
              <div class="hero-emblem-text-en">${I18N.t('govOfMh')}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Clean Separation Line Gap between Header and Banner -->
      <div class="hero-header-banner-gap" style="width:100%; height:4px; background:linear-gradient(90deg, #ff9933 0%, #ff9933 33.3%, #ffffff 33.3%, #ffffff 66.6%, #138808 66.6%, #138808 100%); box-shadow:0 2px 8px rgba(0,0,0,0.12); position:relative; z-index:3;"></div>

      <!-- Full-Width Edge-to-Edge Hero Banner Carousel (6 Auto-Rotating Slides) -->
      ${renderHeroSlider()}

      <!-- Integrated Citizen Services (Quick Access Categories: 3 cols x 2 rows) -->
      <section class="home-services-overview-section">
        <div class="container">
          <div class="home-services-overview-header">
            <h2 class="home-services-overview-title">${I18N.t('integratedServicesTitle')}</h2>
            <p class="home-services-overview-sub">${I18N.t('integratedServicesSub')}</p>
          </div>

          <div class="home-compact-categories-grid">
            ${[
              {
                key: 'students',
                icon: Icons.student,
                iconBg: '#eff6ff',
                iconColor: '#1d4ed8',
                title: I18N.t('catStudentsTitle'),
                label: I18N.t('catStudentsShortLabel')
              },
              {
                key: 'farmers',
                icon: Icons.farmer,
                iconBg: '#fef3c7',
                iconColor: '#b45309',
                title: I18N.t('catFarmersTitle'),
                label: I18N.t('catFarmersShortLabel')
              },
              {
                key: 'women',
                icon: Icons.women,
                iconBg: '#fdf2f8',
                iconColor: '#be185d',
                title: I18N.t('catWomenTitle'),
                label: I18N.t('catWomenShortLabel')
              },
              {
                key: 'healthcare',
                icon: Icons.health,
                iconBg: '#fef2f2',
                iconColor: '#dc2626',
                title: I18N.t('catHealthTitle'),
                label: I18N.t('catHealthShortLabel')
              },
              {
                key: 'senior',
                icon: Icons.senior,
                iconBg: '#fffbeb',
                iconColor: '#b45309',
                title: I18N.t('catSeniorTitle'),
                label: I18N.t('catSeniorShortLabel')
              },
              {
                key: 'housing',
                icon: Icons.housing,
                iconBg: '#f1f5f9',
                iconColor: '#1e293b',
                title: I18N.t('catHousingTitle'),
                label: I18N.t('catHousingShortLabel')
              }
            ].map(cat => `
              <div class="home-compact-cat-card" onclick="navigateToServiceCategory('${cat.key}')" role="button" tabindex="0" onkeypress="if(event.key==='Enter') navigateToServiceCategory('${cat.key}')">
                <div class="home-compact-cat-top">
                  <div class="home-compact-cat-icon" style="background:${cat.iconBg};color:${cat.iconColor}">
                    ${cat.icon}
                  </div>
                  <div class="home-compact-cat-arrow" aria-hidden="true">${Icons.arrowRight}</div>
                </div>
                <div class="home-compact-cat-title">${cat.title}</div>
                <div class="home-compact-cat-label">${cat.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Key Portal Highlights -->
      <section class="home-portal-highlights-section">
        <div class="container">
          <div class="grid grid-4" style="text-align:center;gap:var(--sp-6)">
            ${[
              { title: I18N.t('statGovPortalsTitle'), desc: I18N.t('statGovPortalsDesc') },
              { title: I18N.t('statCitServicesTitle'), desc: I18N.t('statCitServicesDesc') },
              { title: I18N.t('statDigiResTitle'), desc: I18N.t('statDigiResDesc') },
              { title: I18N.t('statCitSupportTitle'), desc: I18N.t('statCitSupportDesc') },
            ].map(s => `
              <div class="home-portal-stat-item">
                <div class="home-portal-stat-title">${s.title}</div>
                <div class="home-portal-stat-desc">${s.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Why Choose e-Samanvit? Section -->
      <section class="section home-why-section">
        <div class="container">
          <h2 class="section-title">${I18N.t('whyUsTitle')}</h2>
          <p class="section-subtitle">${I18N.t('whyUsSub')}</p>
          <div class="why-cards">
            ${[
              { key: 'easy-access', icon: Icons.whyEasyAccess, title: I18N.t('why1Title'), desc: I18N.t('why1Desc'), bg: '#ecfdf5', color: '#059669', border: 'rgba(16, 185, 129, 0.22)' },
              { key: 'verified-info', icon: Icons.whyVerified, title: I18N.t('why2Title'), desc: I18N.t('why2Desc'), bg: '#eff6ff', color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.22)' },
              { key: 'digital-portal', icon: Icons.whyDigital, title: I18N.t('why3Title'), desc: I18N.t('why3Desc'), bg: '#f0fdfa', color: '#0d9488', border: 'rgba(13, 148, 136, 0.22)' },
              { key: 'growth-opps', icon: Icons.whyGrowth, title: I18N.t('why4Title'), desc: I18N.t('why4Desc'), bg: '#fffbeb', color: '#d97706', border: 'rgba(217, 119, 6, 0.22)' },
              { key: 'helpline', icon: Icons.whyHelpline, title: I18N.t('why5Title'), desc: I18N.t('why5Desc'), bg: '#f5f3ff', color: '#7c3aed', border: 'rgba(124, 58, 237, 0.22)' },
              { key: 'transparent', icon: Icons.whyTransparent, title: I18N.t('why6Title'), desc: I18N.t('why6Desc'), bg: '#f0f9ff', color: '#0284c7', border: 'rgba(2, 132, 199, 0.22)' },
            ].map(c => `
              <div class="card card-hover why-card-item" data-why="${c.key}">
                <div class="card-icon" style="background:${c.bg};color:${c.color};border:1px solid ${c.border}">
                  ${c.icon}
                </div>
                <div class="card-title">${c.title}</div>
                <div class="card-text">${c.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}
// -- About Page ----------------------------------------------
function renderAboutPage() {
  return `
    ${renderPublicNavbar('about')}
    <div class="page-layout">
      <!-- About Hero Header -->
      <section class="about-hero" style="background: linear-gradient(90deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 250, 238, 0.65) 50%, rgba(255, 255, 255, 0.80) 100%), url('assets/about_hero_bg.png') left center / cover no-repeat !important; position: relative;">
        <div class="container text-center">
          <div class="home-about-badge">${I18N.t('homeAboutBadge')}</div>
          <h1 class="about-hero-title">${I18N.t('aboutTitle')}</h1>
          <p class="about-hero-sub">${I18N.t('aboutSub')}</p>
        </div>
      </section>

      <!-- Platform Overview (Clean Editorial Story) -->
      <section class="section" style="background:var(--clr-white);padding:var(--sp-12) 0">
        <div class="container" style="max-width:880px;margin:0 auto;text-align:center">
          <h2 style="font-size:clamp(1.6rem, 2.4vw, 2.1rem);font-weight:800;color:var(--clr-primary-950);margin-bottom:var(--sp-4);line-height:1.3">
            Connecting Citizens With Unified Digital Governance
          </h2>
          <p style="font-size:1.05rem;color:var(--clr-gray-700);line-height:1.75;margin-bottom:var(--sp-4)">
            ${I18N.t('aboutDesc1')}
          </p>
          <p style="font-size:1.05rem;color:var(--clr-gray-700);line-height:1.75">
            ${I18N.t('aboutDesc2')}
          </p>
        </div>
      </section>

      <!-- Original Rich Mission & Vision Section -->
      <section class="home-about-section" style="background:var(--clr-gray-50);padding:var(--sp-16) 0">
        <div class="container">
          <!-- Section Header -->
          <div class="home-about-header">
            <div class="home-about-badge">CORE FOUNDATION</div>
            <h2 class="home-about-title">${I18N.t('homeAboutTitle')}</h2>
            <p class="home-about-sub">${I18N.t('homeAboutSub')}</p>
          </div>

          <!-- Mission & Vision 2-Column Grid -->
          <div class="home-mv-grid">
            <!-- Mission Card -->
            <div class="home-mv-card mission-card">
              <div class="home-mv-card-header">
                <div class="home-mv-icon-badge green">
                  ${Icons.zap}
                </div>
                <div>
                  <span class="home-mv-tag green">MISSION</span>
                  <h3 class="home-mv-title">${I18N.t('missionCardTitle')}</h3>
                  <div class="home-mv-subtitle">${I18N.t('missionCardSubtitle')}</div>
                </div>
              </div>
              
              <p class="home-mv-core">${I18N.t('missionCardDesc')}</p>
              
              <div class="home-mv-pillars">
                <div class="home-mv-pillar-item">
                  <div class="home-mv-pillar-bullet green"></div>
                  <div class="home-mv-pillar-content">
                    <div class="home-mv-pillar-title">${I18N.t('missionPillar1Title')}</div>
                    <div class="home-mv-pillar-desc">${I18N.t('missionPillar1Desc')}</div>
                  </div>
                </div>
                <div class="home-mv-pillar-item">
                  <div class="home-mv-pillar-bullet green"></div>
                  <div class="home-mv-pillar-content">
                    <div class="home-mv-pillar-title">${I18N.t('missionPillar2Title')}</div>
                    <div class="home-mv-pillar-desc">${I18N.t('missionPillar2Desc')}</div>
                  </div>
                </div>
                <div class="home-mv-pillar-item">
                  <div class="home-mv-pillar-bullet green"></div>
                  <div class="home-mv-pillar-content">
                    <div class="home-mv-pillar-title">${I18N.t('missionPillar3Title')}</div>
                    <div class="home-mv-pillar-desc">${I18N.t('missionPillar3Desc')}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Vision Card -->
            <div class="home-mv-card vision-card">
              <div class="home-mv-card-header">
                <div class="home-mv-icon-badge blue">
                  ${Icons.globe}
                </div>
                <div>
                  <span class="home-mv-tag blue">VISION</span>
                  <h3 class="home-mv-title">${I18N.t('visionCardTitle')}</h3>
                  <div class="home-mv-subtitle">${I18N.t('visionCardSubtitle')}</div>
                </div>
              </div>
              
              <p class="home-mv-core">${I18N.t('visionCardDesc')}</p>
              
              <div class="home-mv-pillars">
                <div class="home-mv-pillar-item">
                  <div class="home-mv-pillar-bullet blue"></div>
                  <div class="home-mv-pillar-content">
                    <div class="home-mv-pillar-title">${I18N.t('visionPillar1Title')}</div>
                    <div class="home-mv-pillar-desc">${I18N.t('visionPillar1Desc')}</div>
                  </div>
                </div>
                <div class="home-mv-pillar-item">
                  <div class="home-mv-pillar-bullet blue"></div>
                  <div class="home-mv-pillar-content">
                    <div class="home-mv-pillar-title">${I18N.t('visionPillar2Title')}</div>
                    <div class="home-mv-pillar-desc">${I18N.t('visionPillar2Desc')}</div>
                  </div>
                </div>
                <div class="home-mv-pillar-item">
                  <div class="home-mv-pillar-bullet blue"></div>
                  <div class="home-mv-pillar-content">
                    <div class="home-mv-pillar-title">${I18N.t('visionPillar3Title')}</div>
                    <div class="home-mv-pillar-desc">${I18N.t('visionPillar3Desc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

// -- Services Page (6 Citizen Categories in 2x3 Grid with Drill-Down Schemes) --------
const SERVICE_CATEGORIES = [
  {
    key: 'students',
    classModifier: 'cat-students',
    icon: Icons.student,
    iconBg: '#eff6ff',
    iconColor: '#1d4ed8',
    titleKey: 'catStudentsTitle',
    descKey: 'catStudentsDesc',
    schemesCount: '6 Verified Schemes',
    schemes: [
      {
        id: 's1',
        title: 'MahaDBT Post-Matric Scholarship',
        dept: 'Social Justice & Special Assistance Dept, Maharashtra',
        desc: '100% tuition and examination fee waiver with monthly maintenance allowance for SC/ST/OBC/EWS students pursuing diploma and degree courses.',
        benefits: 'Direct Bank Transfer (DBT) up to ₹65,000 / year',
        badge: 'Fee Reimbursement',
        badgeColor: 'blue',
        serviceId: 'mahadbt-post-matric-scholarship'
      },
      {
        id: 's2',
        title: 'National Scholarship Portal (NSP)',
        dept: 'Ministry of Education & Minority Affairs, Govt of India',
        desc: 'Central sector scholarship scheme for college and university students based on higher secondary merit and national entrance scores.',
        benefits: '₹12,000 to ₹20,000 annual scholarship allowance',
        badge: 'Central Merit',
        badgeColor: 'gold',
        serviceId: 'nsp-scholarship'
      },
      {
        id: 's3',
        title: 'Technical Education Tuition Fee Waiver (TFWS)',
        dept: 'Directorate of Technical Education (DTE), Maharashtra',
        desc: 'Complete tuition fee exemption for meritorious engineering, pharmacy, and polytechnic students from economically weaker backgrounds.',
        benefits: 'Zero tuition fees for entire course duration',
        badge: 'Technical Higher Ed',
        badgeColor: 'green'
      },
      {
        id: 's4',
        title: 'Government Hostel & Swadhar Yojana',
        dept: 'Tribal & Social Justice Department, Maharashtra',
        desc: 'Direct financial assistance for room rent, boarding, and stationery expenses for eligible students who did not get government hostel accommodation.',
        benefits: 'Monthly allowance of ₹4,000 to ₹6,000 direct to bank',
        badge: 'Hostel & Living Aid',
        badgeColor: 'blue'
      },
      {
        id: 's5',
        title: 'Skill India Mission Training & Certification',
        dept: 'Maharashtra State Skill Development Society (MSSDS)',
        desc: 'Industry-aligned certified short-term courses with government-sponsored training in IT, renewable energy, manufacturing, and healthcare.',
        benefits: 'Free government certification + job placement support',
        badge: 'Job Ready Skills',
        badgeColor: 'green'
      },
      {
        id: 's6',
        title: 'MSRTC Student Concession Bus Pass',
        dept: 'Maharashtra State Road Transport Corporation',
        desc: 'Subsidized and free bus travel passes for daily commuting school and college students across all 36 Maharashtra districts.',
        benefits: 'Up to 66% to 100% travel subsidy',
        badge: 'Travel Concession',
        badgeColor: 'gold'
      },
      {
        id: 's7',
        title: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulk Shishyavrutti Yojana (EBC Scholarship)',
        dept: 'Directorate of Higher & Technical Education, Maharashtra',
        desc: 'Tuition and examination fee reimbursement for Economically Backward Class students, with eligibility assessed on family income and — for agricultural families — land holding.',
        benefits: 'Full tuition + exam fee reimbursement',
        badge: 'Multi-Source Autofill',
        badgeColor: 'blue',
        serviceId: 'ebc-scholarship'
      }
    ]
  },
  {
    key: 'farmers',
    classModifier: 'cat-farmers',
    icon: Icons.farmer,
    iconBg: '#fef3c7',
    iconColor: '#b45309',
    titleKey: 'catFarmersTitle',
    descKey: 'catFarmersDesc',
    schemesCount: '6 Verified Schemes',
    schemes: [
      {
        id: 'f1',
        title: 'PM Kisan Samman Nidhi Yojana',
        dept: 'Ministry of Agriculture & Farmers Welfare, GoI',
        desc: 'Direct income support of ₹6,000 per year transferred in three equal four-monthly installments directly into verified Aadhaar-linked accounts.',
        benefits: '₹6,000 / year direct bank transfer (DBT)',
        badge: 'Direct Income Support',
        badgeColor: 'green',
        serviceId: 'farmer-welfare-scheme'
      },
      {
        id: 'f2',
        title: 'Namo Shetkari Mahasanman Nidhi',
        dept: 'Department of Agriculture, Government of Maharashtra',
        desc: 'Additional Maharashtra state top-up benefit of ₹6,000 per year providing total ₹12,000 annual direct income support to state farmers.',
        benefits: '₹6,000 / year Maharashtra state top-up',
        badge: 'Maharashtra Special',
        badgeColor: 'gold'
      },
      {
        id: 'f3',
        title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        dept: 'Dept of Agriculture & Farmers Welfare, GoI',
        desc: 'Comprehensive crop insurance coverage against non-preventable natural risks like drought, flood, pests, and unseasonal rainfall with ₹1 token premium.',
        benefits: '100% claim settlement against verified crop loss',
        badge: '₹1 Crop Insurance',
        badgeColor: 'blue'
      },
      {
        id: 'f4',
        title: 'Kisan Credit Card (KCC) Low-Interest Loan',
        dept: 'NABARD & Reserve Bank of India',
        desc: 'Institutional agricultural credit at concessional interest rate of 4% per annum (with timely repayment prompt subvention).',
        benefits: 'Credit limit up to ₹3,00,000 at 4% effective interest',
        badge: 'Credit & Capital',
        badgeColor: 'blue'
      },
      {
        id: 'f5',
        title: 'Soil Health Card & Fertilizer Advisory',
        dept: 'National Mission for Sustainable Agriculture',
        desc: 'Complete periodic soil testing report card detailing 12 nutrient parameters and customized fertilizer recommendations for maximum crop yield.',
        benefits: 'Free soil analysis and dosage report',
        badge: 'Free Soil Testing',
        badgeColor: 'green'
      },
      {
        id: 'f6',
        title: 'MahaDBT Shetkari Drip & Farm Equipment Subsidy',
        dept: 'Agriculture Commissionerate, Maharashtra',
        desc: 'Online lottery and direct DBT subsidy for micro-irrigation (drip/sprinkler), tractors, rotavators, and protective farm shade nets.',
        benefits: 'Up to 55% to 80% capital subsidy on farm equipment',
        badge: 'Equipment Subsidy',
        badgeColor: 'gold'
      }
    ]
  },
  {
    key: 'women',
    classModifier: 'cat-women',
    icon: Icons.women,
    iconBg: '#fdf2f8',
    iconColor: '#be185d',
    titleKey: 'catWomenTitle',
    descKey: 'catWomenDesc',
    schemesCount: '6 Verified Schemes',
    schemes: [
      {
        id: 'w1',
        title: 'Mukhyamantri Majhi Ladki Bahin Yojana',
        dept: 'Women & Child Development Dept, Maharashtra',
        desc: 'Financial empowerment initiative providing ₹1,500 direct monthly assistance to eligible women aged 21 to 65 years across Maharashtra.',
        benefits: '₹1,500 monthly (₹18,000 / year) direct to bank account',
        badge: 'Direct Financial Aid',
        badgeColor: 'green'
      },
      {
        id: 'w2',
        title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
        dept: 'Ministry of Women and Child Development, GoI',
        desc: 'Maternity benefit cash incentive for pregnant women and lactating mothers for health checkups, hospital delivery, and nutritional support.',
        benefits: 'Cash incentive of ₹5,000 to ₹6,000 for newborn care',
        badge: 'Maternity Benefit',
        badgeColor: 'gold'
      },
      {
        id: 'w3',
        title: 'Sukanya Samriddhi Yojana (SSY)',
        dept: 'National Savings Institute & Dept of Posts',
        desc: 'High-interest tax-exempt savings scheme for girl children with 8.2% annual compounded return and tax deduction under Section 80C.',
        benefits: 'Highest government interest rate + tax-free maturity',
        badge: 'Girl Child Savings',
        badgeColor: 'blue'
      },
      {
        id: 'w4',
        title: 'Mahila Samman Bachat Patra (MSSC)',
        dept: 'Ministry of Finance, Government of India',
        desc: 'Dedicated 2-year small savings certificate for women and girls offering guaranteed 7.5% interest rate with partial withdrawal option.',
        benefits: '7.5% fixed interest with sovereign guarantee',
        badge: 'Guaranteed Return',
        badgeColor: 'green'
      },
      {
        id: 'w5',
        title: 'Poshan 2.0 & Anganwadi Supplementary Nutrition',
        dept: 'Integrated Child Development Services (ICDS), MH',
        desc: 'Nutritional food supplements, growth monitoring, and preschool education for children under 6 years and lactating mothers.',
        benefits: 'Free daily nutrition packets + immunisation support',
        badge: 'Child Nutrition',
        badgeColor: 'gold'
      },
      {
        id: 'w6',
        title: 'Women Helpline 181 & One Stop Crisis Center',
        dept: 'Dept of Women & Child Development, Maharashtra',
        desc: '24x7 toll-free emergency response, medical aid, legal counselling, and temporary shelter for women facing distress or domestic issues.',
        benefits: 'Immediate 24x7 emergency assistance & legal counsel',
        badge: '24x7 Helpline',
        badgeColor: 'blue'
      }
    ]
  },
  {
    key: 'healthcare',
    classModifier: 'cat-healthcare',
    icon: Icons.health,
    iconBg: '#fef2f2',
    iconColor: '#dc2626',
    titleKey: 'catHealthTitle',
    descKey: 'catHealthDesc',
    schemesCount: '6 Verified Schemes',
    schemes: [
      {
        id: 'h1',
        title: 'Ayushman Bharat - PM-JAY',
        dept: 'National Health Authority, Govt of India',
        desc: 'World’s largest public health assurance scheme providing cashless secondary and tertiary hospitalization cover across empaneled hospitals.',
        benefits: '₹5 Lakh free cashless treatment per family per year',
        badge: 'Cashless Health Cover',
        badgeColor: 'green'
      },
      {
        id: 'h2',
        title: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)',
        dept: 'Public Health Department, Government of Maharashtra',
        desc: 'Maharashtra state flagship cashless health insurance scheme covering 1,356 medical and surgical procedures across empanelled hospitals.',
        benefits: 'Universal cashless coverage for state ration card holders',
        badge: 'Maharashtra Health Aid',
        badgeColor: 'gold'
      },
      {
        id: 'h3',
        title: 'PM Bharatiya Jan Aushadhi Kendra',
        dept: 'Department of Pharmaceuticals, GoI',
        desc: 'Access to high-quality generic medicines, surgical items, and health consumables at 50% to 90% cheaper price than branded alternatives.',
        benefits: '50% to 90% savings on essential daily medicines',
        badge: 'Generic Medicines',
        badgeColor: 'blue'
      },
      {
        id: 'h4',
        title: 'e-Sanjeevani Teleconsultation OPD',
        dept: 'Ministry of Health and Family Welfare, GoI',
        desc: 'Free digital consultation with government doctors and specialist physicians from the comfort of home via smartphone.',
        benefits: 'Free online doctor consultation + digital prescription',
        badge: 'Free Tele-OPD',
        badgeColor: 'green'
      },
      {
        id: 'h5',
        title: 'Free Diagnostic & Pathology Tests Network',
        dept: 'National Health Mission, Maharashtra',
        desc: 'Free pathology lab tests, X-rays, ultrasounds, and basic diagnostics available at all district civil hospitals and primary health centers.',
        benefits: 'Zero user fees for essential medical diagnostic tests',
        badge: 'Free Diagnostics',
        badgeColor: 'blue'
      },
      {
        id: 'h6',
        title: 'Mission Indradhanush Immunization Program',
        dept: 'Directorate of Health Services, Maharashtra',
        desc: 'Comprehensive immunization coverage against 12 vaccine-preventable life-threatening diseases for pregnant women and infants.',
        benefits: 'Free complete universal immunization schedule',
        badge: 'Child & Maternal',
        badgeColor: 'gold'
      }
    ]
  },
  {
    key: 'senior',
    classModifier: 'cat-senior',
    icon: Icons.senior,
    iconBg: '#fffbeb',
    iconColor: '#b45309',
    titleKey: 'catSeniorTitle',
    descKey: 'catSeniorDesc',
    schemesCount: '6 Verified Schemes',
    schemes: [
      {
        id: 'sn1',
        title: 'Indira Gandhi National Old Age Pension (IGNOAPS)',
        dept: 'National Social Assistance Programme (NSAP), GoI',
        desc: 'Monthly financial pension directly transferred into bank accounts of citizens aged 60 years and above living below the poverty line.',
        benefits: 'Direct monthly pension to bank/post office account',
        badge: 'Monthly Pension',
        badgeColor: 'green'
      },
      {
        id: 'sn2',
        title: 'Shravanbal Seva Rajya Nivruttivetan Yojana',
        dept: 'Social Justice Department, Maharashtra',
        desc: 'Maharashtra state scheme providing monthly financial pension to destitute and aged persons aged 65 years and above.',
        benefits: '₹1,500 monthly state pension support',
        badge: 'State Senior Pension',
        badgeColor: 'gold'
      },
      {
        id: 'sn3',
        title: 'Rashtriya Vayoshri Yojana (RVY)',
        dept: 'Ministry of Social Justice and Empowerment, GoI',
        desc: 'Free provision of physical assisted-living devices like wheelchairs, walking sticks, hearing aids, dentures, and spectacles for seniors.',
        benefits: '100% free mobility aids and assistive medical devices',
        badge: 'Free Assistive Aids',
        badgeColor: 'blue'
      },
      {
        id: 'sn4',
        title: 'Senior Citizen Travel Concession (MSRTC & Railways)',
        dept: 'Transport Department, Government of Maharashtra',
        desc: '50% fare concession on ordinary state transport buses and free travel for citizens aged 75 years and above across Maharashtra.',
        benefits: '50% discount to 100% free travel for 75+ seniors',
        badge: 'Travel Concession',
        badgeColor: 'green'
      },
      {
        id: 'sn5',
        title: 'Dedicated Hospital Geriatric OPD & Priority Queues',
        dept: 'Public Health Department, Maharashtra',
        desc: 'Priority registration counters, free chronic disease checkups, and specialized geriatric care at government district hospitals.',
        benefits: 'Zero-wait hospital consultations and priority care',
        badge: 'Priority Healthcare',
        badgeColor: 'blue'
      },
      {
        id: 'sn6',
        title: 'Senior Citizens Maintenance & Welfare Tribunal',
        dept: 'Social Justice & Legal Services Authority, Maharashtra',
        desc: 'Summary tribunal procedure guaranteeing financial maintenance and property protection rights under the Senior Citizens Act.',
        benefits: 'Free legal assistance and maintenance enforcement',
        badge: 'Legal Protection',
        badgeColor: 'gold'
      }
    ]
  },
  {
    key: 'housing',
    classModifier: 'cat-housing',
    icon: Icons.housing,
    iconBg: '#f1f5f9',
    iconColor: '#1e293b',
    titleKey: 'catHousingTitle',
    descKey: 'catHousingDesc',
    schemesCount: '6 Verified Schemes',
    schemes: [
      {
        id: 'hs1',
        title: 'Pradhan Mantri Awas Yojana - Urban & Gramin (PMAY)',
        dept: 'Ministry of Housing and Urban Affairs, GoI',
        desc: 'Housing for All flagship scheme providing financial subsidy up to ₹2.67 Lakh for pucca house construction and affordable credit.',
        benefits: 'Up to ₹2,67,000 interest subsidy / direct grant',
        badge: 'Pucca House Subsidy',
        badgeColor: 'green'
      },
      {
        id: 'hs2',
        title: 'Ramai Awas Gharkul Yojana',
        dept: 'Social Justice & Special Assistance Dept, Maharashtra',
        desc: 'Maharashtra state housing scheme providing financial grant to rural and urban scheduled caste families for building permanent homes.',
        benefits: '₹1.5 Lakh to ₹2.5 Lakh financial construction aid',
        badge: 'Permanent Home Grant',
        badgeColor: 'gold'
      },
      {
        id: 'hs3',
        title: 'Shabari Gharkul Yojana',
        dept: 'Tribal Development Department, Maharashtra',
        desc: 'Subsidized house building scheme dedicated to tribal families living in rural and forest belt areas across Maharashtra.',
        benefits: 'Full construction grant for tribal families',
        badge: 'Tribal Housing',
        badgeColor: 'blue'
      },
      {
        id: 'hs4',
        title: 'Rajiv Gandhi Rural Housing Interest Subsidy',
        dept: 'Rural Development Department, Maharashtra',
        desc: 'Low-interest institutional loans for house expansion, renovation, and construction of sanitation facilities for rural families.',
        benefits: '5% interest subsidy on housing credit loans',
        badge: 'Credit Assistance',
        badgeColor: 'green'
      },
      {
        id: 'hs5',
        title: 'Slum Rehabilitation Scheme (SRA Tenements)',
        dept: 'Slum Rehabilitation Authority (SRA), Maharashtra',
        desc: 'Rehabilitation of eligible slum dwellers into permanent self-contained residential tenements with clean water and electricity.',
        benefits: 'Free permanent transit & rehabilitation tenement',
        badge: 'Urban Rehabilitation',
        badgeColor: 'blue'
      },
      {
        id: 'hs6',
        title: 'Night Shelter & Transit Housing Assistance',
        dept: 'Urban Development Department, Maharashtra',
        desc: 'Safe temporary overnight shelters equipped with clean drinking water, sanitation facilities, and bedding for migrant workers.',
        benefits: 'Free safe shelter and hygiene facilities',
        badge: 'Shelter Support',
        badgeColor: 'gold'
      }
    ]
  }
];

function renderServicesPage() {
  return `
    ${renderPublicNavbar('services')}
    <div class="page-layout">
      <!-- Services Hero Header -->
      <section class="services-hero" style="background: linear-gradient(90deg, rgba(255, 255, 255, 0.84) 0%, rgba(240, 253, 244, 0.68) 50%, rgba(255, 255, 255, 0.80) 100%), url('assets/services_hero_bg.png') right center / cover no-repeat !important; position: relative;">
        <div class="container text-center">
          <div class="services-hero-badge-wrap">
            <span class="services-hero-badge">DIRECT CITIZEN ASSISTANCE</span>
          </div>
          <h1 class="services-hero-title">${I18N.t('servicesPageTitle')}</h1>
          <p class="services-hero-sub">${I18N.t('servicesPageSub')}</p>
        </div>
      </section>

      <!-- Main Container: Dynamic 6-Category Grid OR Category Schemes View -->
      <section class="services-categories-section">
        <div class="container" id="servicesMainContainer">
          ${renderServicesMainContent()}
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

// Renders either the 6 Category Cards in 2x3 Grid OR the Drill-Down Schemes
function renderServicesMainContent() {
  const currentKey = typeof window !== 'undefined' ? window.currentServiceCategory : null;
  const currentCat = SERVICE_CATEGORIES.find(c => c.key === currentKey);

  if (currentCat) {
    return renderCategoryDetailView(currentCat);
  } else {
    return render6CategoriesGrid();
  }
}

// Exactly 6 Cards in 2 columns x 3 rows grid
function render6CategoriesGrid() {
  return `
    <div class="services-cat-header-wrap">
      <div class="services-cat-badge">SECTOR PORTAL DIRECTORY</div>
      <h2 class="services-cat-main-title">Select Citizen Category</h2>
      <p class="services-cat-main-desc">Explore verified government schemes, grants, and subsidies curated for your needs.</p>
    </div>

    <div class="services-cat-grid-2x3">
      ${SERVICE_CATEGORIES.map(cat => `
        <div class="service-cat-card ${cat.classModifier}" onclick="openServiceCategory('${cat.key}')" role="button" tabindex="0" onkeypress="if(event.key==='Enter') openServiceCategory('${cat.key}')">
          <div class="service-cat-top-row">
            <div class="service-cat-icon-wrap" style="background:${cat.iconBg};color:${cat.iconColor}">
              ${cat.icon}
            </div>
            <span class="service-cat-count-badge">${cat.schemesCount}</span>
          </div>
          <div class="service-cat-title">${I18N.t(cat.titleKey)}</div>
          <div class="service-cat-desc">${I18N.t(cat.descKey)}</div>
          <div class="service-cat-cta">
            <span>${I18N.t('catExploreCta')}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Drill-down scheme list when a category card is clicked
function renderCategoryDetailView(cat) {
  return `
    <div class="category-detail-view">
      <!-- Back to Categories Button -->
      <div style="margin-bottom:var(--sp-6)">
        <button class="btn btn-outline btn-sm back-to-cat-btn" onclick="backToCategories()">
          ${I18N.t('backToCategories')}
        </button>
      </div>

      <!-- Active Category Header Card -->
      <div class="cat-detail-hero-card">
        <div style="display:flex;align-items:center;gap:var(--sp-4);flex-wrap:wrap">
          <div class="service-cat-icon-wrap" style="background:${cat.iconBg};color:${cat.iconColor};width:68px;height:68px;margin-bottom:0">
            ${cat.icon}
          </div>
          <div style="flex:1;min-width:240px">
            <h2 class="cat-detail-hero-title">${I18N.t(cat.titleKey)}</h2>
            <p class="cat-detail-hero-desc">${I18N.t(cat.descKey)}</p>
          </div>
        </div>

        <!-- Filter / Search within category schemes -->
        <div style="margin-top:var(--sp-5);position:relative;max-width:480px">
          <input type="text" class="form-input" id="catSchemeSearchInput" onkeyup="filterCategorySchemes()" placeholder="${I18N.t('searchSchemesPlaceholder')}" style="padding-left:42px;height:46px;border-radius:var(--radius-full)">
          <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--clr-gray-400)">${Icons.search}</span>
        </div>
      </div>

      <!-- Schemes Grid -->
      <div class="category-schemes-grid" id="catSchemesGrid" style="margin-top:var(--sp-8)">
        ${cat.schemes.map(s => `
          <div class="cat-scheme-card">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--sp-3)">
                <span class="badge ${s.badgeColor === 'green' ? 'badge-green' : s.badgeColor === 'gold' ? 'badge-gold' : 'badge-blue'}">${s.badge}</span>
                <span class="cat-scheme-verified-badge">VERIFIED</span>
              </div>
              <h3 class="cat-scheme-card-title">${s.title}</h3>
              <div class="cat-scheme-dept">${s.dept}</div>
              <p class="cat-scheme-desc">${s.desc}</p>
              ${s.serviceId
                ? `<span class="badge badge-green" style="margin-top:var(--sp-2);display:inline-block">${Icons.zap || ''} Live Autofill Demo</span>`
                : `<span class="badge" style="margin-top:var(--sp-2);display:inline-block;background:var(--clr-gray-100);color:var(--clr-gray-500)">Info Only</span>`}
            </div>
            <div>
              <div class="cat-scheme-benefit-box">
                <span class="cat-scheme-benefit-label">Official Benefit:</span>
                <span class="cat-scheme-benefit-value">${s.benefits}</span>
              </div>
              <div style="display:flex;gap:var(--sp-3);margin-top:var(--sp-4)">
                <button class="btn btn-primary btn-sm" style="flex:1" onclick="handleSchemeApply('${s.id}', '${s.title}', ${s.serviceId ? `'${s.serviceId}'` : 'null'})">
                  ${Icons.zap} ${I18N.t('applyOnline')}
                </button>
                <button class="btn btn-ghost btn-sm" onclick="openSchemeDetail('${s.id}')">
                  ${I18N.t('schemeDetails')}
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Bottom Return Button -->
      <div style="text-align:center;margin-top:var(--sp-12)">
        <button class="btn btn-secondary btn-lg" onclick="backToCategories()">
          ${I18N.t('backToCategories')}
        </button>
      </div>
    </div>
  `;
}

function openServiceCategory(key) {
  if (typeof window !== 'undefined') {
    window.currentServiceCategory = key;
  }
  const container = document.getElementById('servicesMainContainer');
  if (container) {
    container.innerHTML = renderServicesMainContent();
    window.scrollTo({ top: 140, behavior: 'smooth' });
  }
}

function navigateToServiceCategory(catKey) {
  if (typeof window !== 'undefined') {
    window.currentServiceCategory = catKey;
  }
  if (typeof navigateTo === 'function') {
    navigateTo('services', { category: catKey });
  }
}

function backToCategories() {
  if (typeof window !== 'undefined') {
    window.currentServiceCategory = null;
  }
  const container = document.getElementById('servicesMainContainer');
  if (container) {
    container.innerHTML = renderServicesMainContent();
    window.scrollTo({ top: 140, behavior: 'smooth' });
  }
}

function filterCategorySchemes() {
  const input = document.getElementById('catSchemeSearchInput');
  if (!input) return;
  const q = input.value.toLowerCase();
  document.querySelectorAll('.cat-scheme-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
}

function handleSchemeApply(id, title, serviceId) {
  if (serviceId) {
    // This card has a real, registered backend schema — send the
    // citizen into the actual consent -> autofill -> review engine
    // for that specific service, instead of the generic list.
    showToast(`Starting your ${title} application`, 'success');
    setTimeout(() => {
      navigateTo('gov-services', { serviceId });
    }, 600);
    return;
  }

  // No backend schema exists for this scheme yet — be honest that
  // this is informational only, don't pretend to autofill it.
  showToast(`${title} is informational only in this prototype — no live autofill yet.`, 'info');
  setTimeout(() => {
    navigateTo('gov-services');
  }, 900);
}

// -- Resources Page ------------------------------------------
function renderResourcesPage() {
  const resources = [
    { title: I18N.t('res1Title'), category: I18N.t('catGovtSchemes'), categoryKey: 'catGovtSchemes', badge: I18N.t('badgeOfficialDoc'), desc: I18N.t('res1Desc') },
    { title: I18N.t('res2Title'), category: I18N.t('catEdu'), categoryKey: 'catEdu', badge: I18N.t('badgeNewGuide'), desc: I18N.t('res2Desc') },
    { title: I18N.t('res3Title'), category: I18N.t('catAgri'), categoryKey: 'catAgri', badge: I18N.t('badgePopular'), desc: I18N.t('res3Desc') },
    { title: I18N.t('res4Title'), category: I18N.t('catMarketSupport'), categoryKey: 'catMarketSupport', badge: I18N.t('badgeUpdatedDaily'), desc: I18N.t('res4Desc') },
    { title: I18N.t('res5Title'), category: I18N.t('catFinancial'), categoryKey: 'catFinancial', badge: I18N.t('badgeGuide'), desc: I18N.t('res5Desc') },
    { title: I18N.t('res6Title'), category: I18N.t('catEdu'), categoryKey: 'catEdu', badge: I18N.t('badgeFreeCourse'), desc: I18N.t('res6Desc') },
    { title: I18N.t('res7Title'), category: I18N.t('catGovtSchemes'), categoryKey: 'catGovtSchemes', badge: I18N.t('badgeHandbook'), desc: I18N.t('res7Desc') },
    { title: I18N.t('res8Title'), category: I18N.t('catEdu'), categoryKey: 'catEdu', badge: I18N.t('badgePdfPack'), desc: I18N.t('res8Desc') },
  ];

  const categories = [
    { label: I18N.t('catAll'), value: 'All' },
    { label: I18N.t('catGovtSchemes'), value: 'catGovtSchemes' },
    { label: I18N.t('catAgri'), value: 'catAgri' },
    { label: I18N.t('catEdu'), value: 'catEdu' },
    { label: I18N.t('catMarketSupport'), value: 'catMarketSupport' },
    { label: I18N.t('catFinancial'), value: 'catFinancial' }
  ];

  return `
    ${renderPublicNavbar('resources')}
    <div class="page-layout">
      <section class="resources-hero">
        <div class="container">
          <h1 class="resources-hero-title">${I18N.t('resourcesTitle')}</h1>
          <p class="resources-hero-sub">${I18N.t('resourcesSub')}</p>
          <div style="max-width:500px;margin:var(--sp-6) auto 0;position:relative">
            <input type="text" class="form-input" id="resourceSearch" onkeyup="filterResources()" placeholder="${I18N.t('searchPlaceholder')}" style="padding-left:40px;border-radius:var(--radius-full)">
            <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--clr-gray-400)">${Icons.search}</span>
          </div>
        </div>
      </section>

      <section class="section" style="background:var(--clr-white)">
        <div class="container">
          <div style="margin-bottom:var(--sp-8);display:flex;justify-content:center">
            <div class="filter-pills">
              ${categories.map((c, i) => `
                <button class="filter-pill ${i === 0 ? 'active' : ''}" onclick="filterByCategory(this, '${c.value}')">${c.label}</button>
              `).join('')}
            </div>
          </div>

          <div class="resource-cards grid grid-3" id="resourceGrid">
            ${resources.map(r => `
              <div class="card card-hover resource-item" data-category="${r.categoryKey}">
                ${r.badge ? `<div style="margin-bottom:var(--sp-3)"><span class="badge ${r.badge === I18N.t('badgeNewGuide') ? 'badge-green' : 'badge-gold'}">${r.badge}</span></div>` : ''}
                <div class="card-title" style="font-weight:var(--fw-bold);font-size:var(--fs-md);margin-bottom:var(--sp-2)">${r.title}</div>
                <div style="margin-bottom:var(--sp-3)"><span class="badge badge-blue">${r.category}</span></div>
                <div class="card-text" style="color:var(--clr-gray-600);margin-bottom:var(--sp-4)">${r.desc}</div>
                <button class="btn btn-secondary btn-sm" onclick="showToast('${I18N.t('downloadingNotice')}', 'info')">${I18N.t('downloadResource')} ${Icons.arrowRight}</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

function filterByCategory(el, category) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.resource-item').forEach(card => {
    if (category === 'All' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterResources() {
  const query = document.getElementById('resourceSearch').value.toLowerCase();
  document.querySelectorAll('.resource-item').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
}

// -- Contact Page --------------------------------------------
function renderContactPage() {
  return `
    ${renderPublicNavbar('contact')}
    <div class="page-layout">
      <section class="contact-hero">
        <div class="container">
          <h1 class="contact-hero-title">${I18N.t('contactTitle')}</h1>
          <p class="contact-hero-sub">${I18N.t('contactSub')}</p>
        </div>
      </section>

      <section class="section" style="background:var(--clr-white)">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-form-card">
              <h3 style="margin-bottom:var(--sp-6)">${I18N.t('sendMessage')}</h3>
              <form onsubmit="handleContact(event)" novalidate>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">${I18N.t('name')} <span class="required">*</span></label>
                    <input type="text" class="form-input" id="contactName" placeholder="${I18N.t('contactNamePlaceholder')}">
                    <div class="form-error"></div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">${I18N.t('email')} <span class="required">*</span></label>
                    <input type="email" class="form-input" id="contactEmail" placeholder="${I18N.t('contactEmailPlaceholder')}">
                    <div class="form-error"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">${I18N.t('phone')}</label>
                    <input type="tel" class="form-input" id="contactPhone" placeholder="${I18N.t('contactPhonePlaceholder')}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">${I18N.t('subject')} <span class="required">*</span></label>
                    <select class="form-select" id="contactSubject">
                      <option value="">${I18N.t('contactFormSubTitle')}</option>
                      <option>${I18N.t('optGovtSchemes')}</option>
                      <option>${I18N.t('optScholarship')}</option>
                      <option>${I18N.t('optAgriKcc')}</option>
                      <option>${I18N.t('optMandiMarket')}</option>
                      <option>${I18N.t('optFeedback')}</option>
                      <option>${I18N.t('optOther')}</option>
                    </select>
                    <div class="form-error"></div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">${I18N.t('message')} <span class="required">*</span></label>
                  <textarea class="form-input" id="contactMessage" rows="5" placeholder="${I18N.t('contactMessagePlaceholder')}" style="resize:vertical"></textarea>
                  <div class="form-error"></div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg" id="contactBtn">${I18N.t('sendBtn')}</button>
              </form>
            </div>

            <div class="contact-info-card">
              <h3 style="margin-bottom:var(--sp-6)">${I18N.t('contactInfo')}</h3>
              <div class="contact-info-item">
                <div class="contact-info-icon">${Icons.mail}</div>
                <div>
                  <div class="contact-info-label">${I18N.t('contactEmailLabel')}</div>
                  <div class="contact-info-value">support@esamanvit.gov.in</div>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">${Icons.phone}</div>
                <div>
                  <div class="contact-info-label">${I18N.t('contactTollFree')}</div>
                  <div class="contact-info-value">${I18N.t('contactTollFreeVal')}</div>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">${Icons.mapPin}</div>
                <div>
                  <div class="contact-info-label">${I18N.t('contactAddress')}</div>
                  <div class="contact-info-value">${I18N.t('contactAddressVal')}</div>
                </div>
              </div>
              <div class="contact-info-item">
                <div class="contact-info-icon">${Icons.helpCircle}</div>
                <div>
                  <div class="contact-info-label">${I18N.t('contactHours')}</div>
                  <div class="contact-info-value">${I18N.t('contactHoursVal')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

// -- Notifications Page (Top 10 Live Government Updates) ------
function renderNotificationsPage() {
  const notifications = typeof getNotifications === 'function' ? getNotifications() : [];
  
  return `
    ${renderPublicNavbar('notifications')}
    <div class="page-layout">
      <!-- Live Status Hero -->
      <section style="background:linear-gradient(135deg, var(--clr-primary-900), var(--clr-primary-800));color:var(--clr-white);padding:var(--sp-8) 0">
        <div class="container">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
            <div>
              <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);padding:4px 12px;border-radius:var(--radius-full);margin-bottom:var(--sp-2)">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 3px rgba(74,222,128,0.3)"></span>
                <span style="font-size:12px;color:var(--clr-gold-300);font-weight:700">LIVE FEED • MAHARASHTRA STATE PORTAL</span>
              </div>
              <h1 style="font-size:var(--fs-2xl);color:var(--clr-white);margin-bottom:var(--sp-2)">${I18N.t('notifTitle')}</h1>
              <div style="font-size:var(--fs-sm);color:var(--clr-primary-100);max-width:640px">${I18N.t('notifSub')}</div>
            </div>
            
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" onclick="refreshLiveFeed(event)">${Icons.refresh} ${I18N.t('refreshFeed')}</button>
              <button class="btn btn-primary btn-sm" onclick="markAllRead()">${I18N.t('markAllRead')}</button>
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="background:var(--clr-gray-50)">
        <div class="container" style="max-width:900px">
          <!-- Search & Category Filters -->
          <div class="card" style="padding:var(--sp-4);margin-bottom:var(--sp-6)">
            <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:space-between">
              <div style="flex:1;min-width:240px;position:relative">
                <input type="text" class="form-input" id="notifSearchInput" onkeyup="filterNotificationsPage()" placeholder="${I18N.t('searchPlaceholder')}" style="padding-left:36px;height:42px;border-radius:var(--radius-full)">
                <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--clr-gray-400)">${Icons.search}</span>
              </div>
              <div class="filter-pills" style="margin:0">
                <button class="filter-pill active" onclick="filterNotifCategory(this, 'all')">${I18N.t('catAll')} (10)</button>
                <button class="filter-pill" onclick="filterNotifCategory(this, 'agri')">${I18N.t('catAgri')}</button>
                <button class="filter-pill" onclick="filterNotifCategory(this, 'scholarship')">${I18N.t('catEdu')}</button>
                <button class="filter-pill" onclick="filterNotifCategory(this, 'welfare')">${I18N.t('catFinancial')}</button>
              </div>
            </div>
          </div>

          <!-- Notification Items List -->
          <div class="card" style="padding:0;overflow:hidden">
            <div class="notif-page-list" id="notifPageListContainer">
              ${notifications.map((n, idx) => `
                <div class="notif-page-item notif-item ${n.unread ? 'unread' : ''}" data-category="${n.category}" style="padding:var(--sp-5);border-bottom:1px solid var(--clr-gray-200);display:flex;gap:16px;align-items:flex-start">
                  <div class="notif-dot ${n.unread ? '' : 'read'}" style="margin-top:8px"></div>
                  <div class="notif-content" style="flex:1;min-width:0">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px">
                      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                        <span class="notif-title" style="font-size:var(--fs-base);font-weight:var(--fw-bold);color:var(--clr-gray-900);margin:0">${idx + 1}. ${n.title}</span>
                        <span class="badge ${n.badgeColor || 'badge-green'}" style="font-size:11px">${n.tag}</span>
                        ${n.unread ? `<span class="badge badge-green" style="font-size:10px">${I18N.t('liveBadge')}</span>` : ''}
                      </div>
                      <div class="notif-time" style="font-size:12px;color:var(--clr-gray-500)">🕒 ${timeAgo(n.date)}</div>
                    </div>
                    <div class="notif-text" style="font-size:var(--fs-sm);color:var(--clr-gray-700);line-height:1.5;margin-bottom:10px">${n.text}</div>
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
                      <div style="font-size:12px;color:var(--clr-primary-700);font-weight:600">🏛️ Source: ${n.source}</div>
                      <button class="btn btn-secondary btn-sm" onclick="navigateTo('services')">${I18N.t('viewMore')} ${Icons.arrowRight}</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

function filterNotifCategory(el, category) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.notif-page-item').forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function filterNotificationsPage() {
  const query = (document.getElementById('notifSearchInput')?.value || '').toLowerCase();
  document.querySelectorAll('.notif-page-item').forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? 'flex' : 'none';
  });
}

// Contact form handler
async function handleContact(e) {
  e.preventDefault();
  const nameEl = document.getElementById('contactName');
  const emailEl = document.getElementById('contactEmail');
  const phoneEl = document.getElementById('contactPhone');
  const subjectEl = document.getElementById('contactSubject');
  const messageEl = document.getElementById('contactMessage');

  const name = nameEl?.value.trim();
  const email = emailEl?.value.trim();
  const phone = phoneEl?.value.trim();
  const subject = subjectEl?.value;
  const message = messageEl?.value.trim();

  let valid = true;

  if (!name) {
    showFieldError(nameEl, 'Please enter your full name');
    valid = false;
  } else {
    clearFieldError(nameEl);
  }

  if (!email || !validateEmail(email)) {
    showFieldError(emailEl, 'Please enter a valid email address');
    valid = false;
  } else {
    clearFieldError(emailEl);
  }

  if (!subject) {
    showFieldError(subjectEl, 'Please select a service subject');
    valid = false;
  } else {
    clearFieldError(subjectEl);
  }

  if (!message) {
    showFieldError(messageEl, 'Please write your message or inquiry');
    valid = false;
  } else {
    clearFieldError(messageEl);
  }

  if (!valid) return;

  // Send the message to the backend, which emails it to the
  // e-Samanvit helpdesk inbox via Resend (see backend/src/controllers
  // /contact.controller.js). The form only clears and the success
  // popup only appears once that email has actually gone out — a
  // failed send leaves the citizen's typed message in place so
  // nothing is lost.
  const submitBtn = document.getElementById('contactBtn');
  const originalBtnLabel = submitBtn ? submitBtn.textContent : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  try {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      throw new Error(data?.error?.message || 'Could not send your message. Please try again.');
    }

    showToast('Your inquiry has been emailed to the e-Samanvit helpdesk. Reference #' + data.reference, 'success');

    nameEl.value = '';
    emailEl.value = '';
    if (phoneEl) phoneEl.value = '';
    subjectEl.value = '';
    messageEl.value = '';
  } catch (err) {
    showToast(err.message || 'Could not send your message. Please try again.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnLabel;
    }
  }
}
