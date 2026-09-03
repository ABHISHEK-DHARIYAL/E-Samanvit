/* ============================================================
   e-Samanvit - Public Pages Portal
   ============================================================ */

// -- Home Page -----------------------------------------------
function renderHomePage() {
  return `
    ${renderPublicNavbar('home')}
    <div class="page-layout">
      <!-- Hero Section -->
      <section class="hero" style="padding:var(--sp-12) 0 var(--sp-10)">
        <div class="container">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--sp-8);flex-wrap:wrap">
            <!-- Left Side: Hero Content & e-Samanvit Logo -->
            <div class="hero-content" style="flex:1;min-width:300px;text-align:left">
              <div style="margin-bottom:var(--sp-4);display:inline-block">
                <img src="assets/logo.jpg" alt="e-Samanvit Logo" style="height:110px;width:auto;max-width:280px;object-fit:contain;border-radius:12px;background:var(--clr-white);padding:6px;box-shadow:var(--shadow-md)">
              </div>
              <h1>${I18N.t('brandName')}</h1>
              <p class="hero-tagline">${I18N.t('brandSub')}</p>
              <p class="hero-desc">${I18N.t('heroDesc')}</p>
              <div class="hero-actions" style="justify-content:flex-start">
                <button class="btn btn-primary btn-lg" onclick="navigateTo('services')">
                  ${Icons.grid} ${I18N.t('exploreServices')} ${Icons.arrowRight}
                </button>
                <button class="btn btn-secondary btn-lg" onclick="navigateTo('impact')">
                  ${Icons.trendingUp} ${I18N.t('navImpact')}
                </button>
              </div>
            </div>

            <!-- Right Side: Government Emblems -->
            <div style="text-align:center;max-width:360px;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px">
              <div style="display:flex;align-items:center;justify-content:center;gap:24px;margin-bottom:8px">
                <div style="position:relative;display:flex;align-items:center;justify-content:center">
                  <div style="position:absolute;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(46,125,50,0.15) 0%,transparent 70%);filter:blur(8px)"></div>
                  <img src="assets/mh_logo1.jpg" alt="Government Emblem 1" style="height:100px;width:auto;object-fit:contain;opacity:0.95;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.12));transition:all 0.4s ease;cursor:pointer" onmouseover="this.style.opacity='1';this.style.transform='scale(1.08)'" onmouseout="this.style.opacity='0.95';this.style.transform='scale(1)'">
                </div>
                <div style="position:relative;display:flex;align-items:center;justify-content:center">
                  <div style="position:absolute;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(25,118,210,0.15) 0%,transparent 70%);filter:blur(8px)"></div>
                  <img src="assets/mh_logo2.jpg" alt="Government Emblem 2" style="height:100px;width:auto;object-fit:contain;opacity:0.95;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.12));transition:all 0.4s ease;cursor:pointer" onmouseover="this.style.opacity='1';this.style.transform='scale(1.08)'" onmouseout="this.style.opacity='0.95';this.style.transform='scale(1)'">
                </div>
              </div>
              <div style="font-size:20px;font-weight:800;color:#000000;margin-bottom:2px">${I18N.t('govOfMhMr')}</div>
              <div style="font-size:13px;font-weight:700;color:#000000">${I18N.t('govOfMh')}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="features-section section">
        <div class="container">
          <h2 class="section-title">${I18N.t('whatWeOffer')}</h2>
          <p class="section-subtitle">${I18N.t('whatWeOfferSub')}</p>
          <div class="grid grid-3">
            ${[
              { icon: Icons.leaf, title: I18N.t('featAgriResTitle'), desc: I18N.t('featAgriResDesc'), color: 'green' },
              { icon: Icons.fileText, title: I18N.t('featGovSchemesTitle'), desc: I18N.t('featGovSchemesDesc'), color: 'blue' },
              { icon: Icons.trendingUp, title: I18N.t('featMarketTitle'), desc: I18N.t('featMarketDesc'), color: 'orange' },
              { icon: Icons.graduationCap, title: I18N.t('featLearningTitle'), desc: I18N.t('featLearningDesc'), color: 'gold' },
              { icon: Icons.award, title: I18N.t('featScholarshipsTitle'), desc: I18N.t('featScholarshipsDesc'), color: 'green' },
              { icon: Icons.briefcase, title: I18N.t('featCareerTitle'), desc: I18N.t('featCareerDesc'), color: 'blue' },
            ].map(f => `
              <div class="card card-hover feature-card">
                <div class="card-icon card-icon-${f.color}">${f.icon}</div>
                <div class="card-title">${f.title}</div>
                <div class="card-text">${f.desc}</div>
                <a class="btn btn-ghost btn-sm" onclick="navigateTo('services')">${I18N.t('viewMore')} ${Icons.arrowRight}</a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Key Portal Highlights -->
      <section class="section" style="background:var(--clr-primary-100)">
        <div class="container">
          <div class="grid grid-4" style="text-align:center;gap:var(--sp-6)">
            ${[
              { title: I18N.t('statGovPortalsTitle'), desc: I18N.t('statGovPortalsDesc') },
              { title: I18N.t('statCitServicesTitle'), desc: I18N.t('statCitServicesDesc') },
              { title: I18N.t('statDigiResTitle'), desc: I18N.t('statDigiResDesc') },
              { title: I18N.t('statCitSupportTitle'), desc: I18N.t('statCitSupportDesc') },
            ].map(s => `
              <div style="padding:var(--sp-2)">
                <div style="font-size:var(--fs-2xl);font-weight:var(--fw-bold);color:var(--clr-primary-800);line-height:1.25">${s.title}</div>
                <div style="color:var(--clr-gray-600);font-size:var(--fs-base);margin-top:var(--sp-2);line-height:1.4">${s.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Call To Action -->
      <section class="section" style="background:var(--clr-white)">
        <div class="container text-center">
          <h2 class="section-title">${I18N.t('readyToStart')}</h2>
          <p class="section-subtitle">${I18N.t('readyToStartSub')}</p>
          <div style="display:flex;gap:var(--sp-4);justify-content:center;flex-wrap:wrap">
            <button class="btn btn-primary btn-lg" onclick="navigateTo('services')">${I18N.t('exploreServices')}</button>
            <button class="btn btn-secondary btn-lg" onclick="navigateTo('dashboard')">${I18N.t('navDashboard')}</button>
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

// -- Impact & Problem Statement Solution Page ----------------
function renderImpactPage() {
  const districtData = {
    'Pune': { citizens: '3,45,000+', days: '18', dbtVal: '142' },
    'Nagpur': { citizens: '2,18,000+', days: '17', dbtVal: '98' },
    'Nashik': { citizens: '2,85,000+', days: '19', dbtVal: '115' },
    'Chhatrapati Sambhajinagar': { citizens: '1,95,000+', days: '18', dbtVal: '84' },
    'Thane': { citizens: '4,12,000+', days: '20', dbtVal: '165' },
    'Amravati': { citizens: '1,65,000+', days: '16', dbtVal: '72' },
    'Kolhapur': { citizens: '2,05,000+', days: '17', dbtVal: '91' },
    'Solapur': { citizens: '1,78,000+', days: '18', dbtVal: '79' },
  };

  const initialDistrict = 'Pune';
  const initData = districtData[initialDistrict];

  return `
    ${renderPublicNavbar('impact')}
    <div class="page-layout">
      <!-- Impact Hero Header -->
      <section style="background:linear-gradient(135deg, var(--clr-primary-900), var(--clr-primary-800));color:var(--clr-white);padding:var(--sp-12) 0">
        <div class="container">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:24px">
            <div style="max-width:680px">
              <div style="display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.15);padding:6px 16px;border-radius:var(--radius-full);margin-bottom:var(--sp-4)">
                <img src="assets/mh_logo1.jpg" style="height:24px;border-radius:4px">
                <img src="assets/mh_logo2.jpg" style="height:24px;border-radius:4px">
                <span style="font-size:12px;color:var(--clr-gold-300);font-weight:600">${I18N.t('impactGovSolution')}</span>
              </div>
              <h1 style="font-size:var(--fs-3xl);color:var(--clr-white);line-height:1.2;margin-bottom:var(--sp-4)">${I18N.t('impactTitle')}</h1>
              <p style="font-size:var(--fs-lg);color:var(--clr-primary-100);line-height:1.6">${I18N.t('impactSub')}</p>
            </div>
            
            <div style="background:var(--clr-white);padding:var(--sp-6);border-radius:var(--radius-xl);color:var(--clr-gray-900);box-shadow:var(--shadow-xl);min-width:280px;text-align:center">
              <div style="font-size:var(--fs-4xl);font-weight:var(--fw-bold);color:var(--clr-primary-900)">85%</div>
              <div style="font-size:var(--fs-sm);font-weight:var(--fw-semibold);color:var(--clr-gray-700)">${I18N.t('reductionApproval')}</div>
              <div style="margin-top:var(--sp-3);font-size:12px;color:var(--clr-gray-500)">${I18N.t('reductionDays')}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- District Level Impact Simulator -->
      <section class="section" style="background:var(--clr-gray-50)">
        <div class="container">
          <div style="background:var(--clr-white);border-radius:var(--radius-xl);padding:var(--sp-8);box-shadow:var(--shadow-md);border:1px solid var(--clr-gray-200)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-6);flex-wrap:wrap;gap:16px">
              <div>
                <h3 style="color:var(--clr-primary-900);margin:0 0 4px">${I18N.t('selectDistrict')}</h3>
                <p style="color:var(--clr-gray-600);font-size:14px;margin:0">Interactive Citizen Benefit & Direct Transfer Ledger</p>
              </div>
              <select class="form-select" style="max-width:260px" onchange="updateDistrictImpactScript(this.value)">
                ${Object.keys(districtData).map(d => `<option value="${d}">${d}</option>`).join('')}
              </select>
            </div>

            <div class="grid grid-3" style="gap:var(--sp-6);text-align:center" id="districtImpactStatsContainer">
              <div style="background:var(--clr-white);padding:var(--sp-6);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);border:1px solid var(--clr-gray-100)">
                <div style="font-size:var(--fs-2xl);font-weight:var(--fw-bold);color:var(--clr-primary-800)" id="statCitizens">${initData.citizens}</div>
                <div style="font-size:13px;color:var(--clr-gray-600);margin-top:4px">${I18N.t('statCitBenefited')}</div>
              </div>
              <div style="background:var(--clr-white);padding:var(--sp-6);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);border:1px solid var(--clr-gray-100)">
                <div style="font-size:var(--fs-2xl);font-weight:var(--fw-bold);color:var(--clr-success)" id="statTime">${initData.days} ${I18N.t('timeSavedPerApp')}</div>
                <div style="font-size:13px;color:var(--clr-gray-600);margin-top:4px">${I18N.t('statTimeSaved')}</div>
              </div>
              <div style="background:var(--clr-white);padding:var(--sp-6);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);border:1px solid var(--clr-gray-100)">
                <div style="font-size:var(--fs-2xl);font-weight:var(--fw-bold);color:var(--clr-accent-700)" id="statDbt">₹${initData.dbtVal} ${I18N.t('croreUnit')}</div>
                <div style="font-size:13px;color:var(--clr-gray-600);margin-top:4px">${I18N.t('statDbtDisbursed')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

function updateDistrictImpactScript(district) {
  const districtData = {
    'Pune': { citizens: '3,45,000+', days: '18', dbtVal: '142' },
    'Nagpur': { citizens: '2,18,000+', days: '17', dbtVal: '98' },
    'Nashik': { citizens: '2,85,000+', days: '19', dbtVal: '115' },
    'Chhatrapati Sambhajinagar': { citizens: '1,95,000+', days: '18', dbtVal: '84' },
    'Thane': { citizens: '4,12,000+', days: '20', dbtVal: '165' },
    'Amravati': { citizens: '1,65,000+', days: '16', dbtVal: '72' },
    'Kolhapur': { citizens: '2,05,000+', days: '17', dbtVal: '91' },
    'Solapur': { citizens: '1,78,000+', days: '18', dbtVal: '79' },
  };

  const data = districtData[district] || districtData['Pune'];
  const citEl = document.getElementById('statCitizens');
  const timeEl = document.getElementById('statTime');
  const dbtEl = document.getElementById('statDbt');

  if (citEl) citEl.textContent = data.citizens;
  if (timeEl) timeEl.textContent = `${data.days} ${I18N.t('timeSavedPerApp')}`;
  if (dbtEl) dbtEl.textContent = `₹${data.dbtVal} ${I18N.t('croreUnit')}`;
}

// -- About Page ----------------------------------------------
function renderAboutPage() {
  return `
    ${renderPublicNavbar('about')}
    <div class="page-layout">
      <section class="about-hero">
        <div class="container">
          <h1>${I18N.t('aboutTitle')}</h1>
          <p style="max-width:600px;margin:0 auto;color:var(--clr-gray-600);font-size:var(--fs-lg)">${I18N.t('aboutSub')}</p>
        </div>
      </section>

      <section class="section" style="background:var(--clr-white)">
        <div class="container about-content">
          <div class="about-block">
            <h2>${I18N.t('aboutTitle')}</h2>
            <p>${I18N.t('aboutDesc1')}</p>
            <p>${I18N.t('aboutDesc2')}</p>
          </div>

          <div class="about-block">
            <h2>${I18N.t('visionTitle')}</h2>
            <p>${I18N.t('visionDesc')}</p>
          </div>

          <div class="about-block">
            <h2>${I18N.t('missionTitle')}</h2>
            <p>${I18N.t('missionDesc')}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2 class="section-title">${I18N.t('whyUsTitle')}</h2>
          <p class="section-subtitle">${I18N.t('whyUsSub')}</p>
          <div class="why-cards">
            ${[
              { icon: Icons.sprout, title: I18N.t('why1Title'), desc: I18N.t('why1Desc'), color: 'green' },
              { icon: Icons.fileText, title: I18N.t('why2Title'), desc: I18N.t('why2Desc'), color: 'green' },
              { icon: Icons.globe, title: I18N.t('why3Title'), desc: I18N.t('why3Desc'), color: 'blue' },
              { icon: Icons.star, title: I18N.t('why4Title'), desc: I18N.t('why4Desc'), color: 'orange' },
              { icon: Icons.users, title: I18N.t('why5Title'), desc: I18N.t('why5Desc'), color: 'green' },
              { icon: Icons.shield, title: I18N.t('why6Title'), desc: I18N.t('why6Desc'), color: 'blue' },
            ].map(c => `
              <div class="card card-hover">
                <div class="card-icon card-icon-${c.color}">${c.icon}</div>
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

// -- Services Page (Unified Public Government Services) --------
function renderServicesPage() {
  const allServices = [
    { id: 1, category: I18N.t('catGovtSchemes'), categoryKey: 'catGovtSchemes', icon: Icons.fileText, title: I18N.t('srvPmKisanTitle'), desc: I18N.t('srvPmKisanDesc'), badge: I18N.t('badgePopularScheme'), badgeColor: 'green' },
    { id: 2, category: I18N.t('catEdu'), categoryKey: 'catEdu', icon: Icons.award, title: I18N.t('srvNspTitle'), desc: I18N.t('srvNspDesc'), badge: I18N.t('badgeAppOpen'), badgeColor: 'gold' },
    { id: 3, category: I18N.t('catAgri'), categoryKey: 'catAgri', icon: Icons.sprout, title: I18N.t('srvKccTitle'), desc: I18N.t('srvKccDesc'), badge: I18N.t('badgeLoanSupport'), badgeColor: 'blue' },
    { id: 4, category: I18N.t('catMarketSupport'), categoryKey: 'catMarketSupport', icon: Icons.trendingUp, title: I18N.t('srvMandiTitle'), desc: I18N.t('srvMandiDesc'), badge: I18N.t('badgeLivePrices'), badgeColor: 'green' },
    { id: 5, category: I18N.t('catFinancial'), categoryKey: 'catFinancial', icon: Icons.shield, title: I18N.t('srvFasalBimaTitle'), desc: I18N.t('srvFasalBimaDesc'), badge: I18N.t('badgeInsurance'), badgeColor: 'blue' },
    { id: 6, category: I18N.t('catEdu'), categoryKey: 'catEdu', icon: Icons.graduationCap, title: I18N.t('srvSkillIndiaTitle'), desc: I18N.t('srvSkillIndiaDesc'), badge: I18N.t('badgeFreeSkill'), badgeColor: 'gold' },
    { id: 7, category: I18N.t('catAgri'), categoryKey: 'catAgri', icon: Icons.leaf, title: I18N.t('srvSoilHealthTitle'), desc: I18N.t('srvSoilHealthDesc'), badge: I18N.t('badgeFreeAdvisory'), badgeColor: 'green' },
    { id: 8, category: I18N.t('catFinancial'), categoryKey: 'catFinancial', icon: Icons.briefcase, title: I18N.t('srvDbtTitle'), desc: I18N.t('srvDbtDesc'), badge: I18N.t('badgeDbtStatus'), badgeColor: 'blue' },
    { id: 9, category: I18N.t('catEdu'), categoryKey: 'catEdu', icon: Icons.resources, title: I18N.t('srvLibraryTitle'), desc: I18N.t('srvLibraryDesc'), badge: I18N.t('badgeEResources'), badgeColor: 'gold' },
    { id: 10, category: I18N.t('catGovtSchemes'), categoryKey: 'catGovtSchemes', icon: Icons.helpCircle, title: I18N.t('srvGrievanceTitle'), desc: I18N.t('srvGrievanceDesc'), badge: I18N.t('badgeSupport'), badgeColor: 'green' },
  ];

  const categoryPills = [
    { label: I18N.t('catAll'), value: 'All' },
    { label: I18N.t('catGovtSchemes'), value: 'catGovtSchemes' },
    { label: I18N.t('catAgri'), value: 'catAgri' },
    { label: I18N.t('catEdu'), value: 'catEdu' },
    { label: I18N.t('catFinancial'), value: 'catFinancial' },
    { label: I18N.t('catMarketSupport'), value: 'catMarketSupport' },
  ];

  return `
    ${renderPublicNavbar('services')}
    <div class="page-layout">
      <section class="services-hero">
        <div class="container">
          <h1>${I18N.t('servicesTitle')}</h1>
          <p style="max-width:650px;margin:0 auto;color:var(--clr-gray-600);font-size:var(--fs-lg)">${I18N.t('servicesSub')}</p>
          
          <!-- Unified Search Bar -->
          <div style="max-width:560px;margin:var(--sp-6) auto 0;position:relative">
            <input type="text" class="form-input" id="serviceSearchInput" onkeyup="filterServicesList()" placeholder="${I18N.t('searchPlaceholder')}" style="padding-left:42px;height:48px;border-radius:var(--radius-full);box-shadow:var(--shadow-md)">
            <span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--clr-gray-400)">${Icons.search}</span>
          </div>
        </div>
      </section>

      <section class="services-section section">
        <div class="container">
          <!-- Category Filter Pills -->
          <div class="filter-pills" style="margin-bottom:var(--sp-8);justify-content:center">
            ${categoryPills.map((cat, idx) => `
              <button class="filter-pill ${idx === 0 ? 'active' : ''}" onclick="filterServicesByCategory(this, '${cat.value}')">${cat.label}</button>
            `).join('')}
          </div>

          <!-- Service Cards Grid -->
          <div class="grid grid-3" id="servicesGrid">
            ${allServices.map(s => `
              <div class="card card-hover service-card-item" data-category="${s.categoryKey}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--sp-3)">
                  <div class="card-icon card-icon-${s.badgeColor === 'green' ? 'green' : s.badgeColor === 'gold' ? 'gold' : 'blue'}">${s.icon}</div>
                  <span class="badge ${s.badgeColor === 'green' ? 'badge-green' : s.badgeColor === 'gold' ? 'badge-gold' : 'badge-blue'}">${s.badge}</span>
                </div>
                <div class="card-title" style="font-size:var(--fs-lg);font-weight:var(--fw-bold);margin-bottom:var(--sp-2)">${s.title}</div>
                <div style="margin-bottom:var(--sp-3)"><span class="badge badge-gray">${s.category}</span></div>
                <div class="card-text" style="color:var(--clr-gray-600);margin-bottom:var(--sp-4);line-height:1.5">${s.desc}</div>
                <button class="btn btn-primary btn-sm" onclick="showToast('${s.title}: ${I18N.t('accessGuideNotice')}', 'info')">${I18N.t('viewMore')} ${Icons.arrowRight}</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

function filterServicesByCategory(el, category) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.service-card-item').forEach(card => {
    if (category === 'All' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterServicesList() {
  const query = document.getElementById('serviceSearchInput').value.toLowerCase();
  document.querySelectorAll('.service-card-item').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
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
          <h1>${I18N.t('resourcesTitle')}</h1>
          <p style="max-width:600px;margin:0 auto;color:var(--clr-gray-600);font-size:var(--fs-lg)">${I18N.t('resourcesSub')}</p>
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
          <h1>${I18N.t('contactTitle')}</h1>
          <p style="max-width:600px;margin:0 auto;color:var(--clr-gray-600);font-size:var(--fs-lg)">${I18N.t('contactSub')}</p>
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
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const phone = document.getElementById('contactPhone')?.value.trim();
  const subject = document.getElementById('contactSubject')?.value;
  const message = document.getElementById('contactMessage')?.value.trim();

  let valid = true;

  if (!name) {
    showFieldError('contactName', 'Please enter your full name');
    valid = false;
  } else {
    clearFieldError('contactName');
  }

  if (!email || !validateEmail(email)) {
    showFieldError('contactEmail', 'Please enter a valid email address');
    valid = false;
  } else {
    clearFieldError('contactEmail');
  }

  if (!subject) {
    showFieldError('contactSubject', 'Please select a service subject');
    valid = false;
  } else {
    clearFieldError('contactSubject');
  }

  if (!message) {
    showFieldError('contactMessage', 'Please write your message or inquiry');
    valid = false;
  } else {
    clearFieldError('contactMessage');
  }

  if (valid) {
    showToast('Your inquiry has been submitted to the e-Samanvit helpdesk. Reference #SRV-' + Math.floor(1000 + Math.random() * 9000), 'success');
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    if (document.getElementById('contactPhone')) document.getElementById('contactPhone').value = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';
  }
}
