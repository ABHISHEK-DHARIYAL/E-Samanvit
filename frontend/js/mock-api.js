/* ============================================================
   e-Samanvit — Mock Data Architecture & API Layer
   ============================================================ */

const MockAPI = {
  // Services Directory
  services: [
    {
      id: 'srv-1',
      title: 'Post-Matric Scholarship Scheme',
      category: 'Education',
      categoryKey: 'catEdu',
      department: 'Higher & Technical Education Department',
      deptShort: 'MahaDBT',
      processingTime: '15 Days',
      documentsCount: 3,
      status: 'Online',
      badge: 'Popular Scheme',
      badgeColor: 'gold',
      description: 'Financial assistance for post-matriculation studies for eligible students across Maharashtra.',
      eligibility: 'Resident of Maharashtra, Minimum 60% marks in previous exam, Annual Family Income under ₹2,50,000.',
      requiredDocs: ['Aadhaar Card (DigiLocker)', 'Income Certificate (Revenue Dept)', 'Mark Sheet (MahaDBT / Board)'],
      connectedApis: ['MahaDBT API Gateway', 'DigiLocker Verification', 'MeriPehchaan SSO', 'Revenue Dept Income Registry']
    },
    {
      id: 'srv-2',
      title: 'Income Certificate Issuance & Verification',
      category: 'Revenue',
      categoryKey: 'catRevenue',
      department: 'Revenue & Forest Department',
      deptShort: 'Aaple Sarkar',
      processingTime: '7 Days',
      documentsCount: 2,
      status: 'Online',
      badge: 'Instant Auto-Check',
      badgeColor: 'green',
      description: 'Official annual income certificate required for scholarships, subsidies, and government reservations.',
      eligibility: 'Permanent resident of Maharashtra.',
      requiredDocs: ['Aadhaar Card (DigiLocker)', 'Ration Card / Tax Receipt'],
      connectedApis: ['Aaple Sarkar Portal', 'DigiLocker', 'State Land & Tax Registry']
    },
    {
      id: 'srv-3',
      title: 'PM-KISAN Samman Nidhi & Crop Subsidy',
      category: 'Agriculture',
      categoryKey: 'catAgriculture',
      department: 'Agriculture Department',
      deptShort: 'AgriMah',
      processingTime: '10 Days',
      documentsCount: 3,
      status: 'Online',
      badge: 'Direct Benefit Transfer',
      badgeColor: 'blue',
      description: 'Direct cash transfer subsidy of ₹6,000 per year for land-holding farmer families in Maharashtra.',
      eligibility: 'Farmer with valid land records in Maharashtra (7/12 extract verified).',
      requiredDocs: ['7/12 Land Record (Revenue Dept)', 'Aadhaar Card (DigiLocker)', 'Bank Passbook Details'],
      connectedApis: ['Mahabhulekh 7/12 Registry', 'PM-KISAN Central API', 'Aaple Sarkar Gateway']
    },
    {
      id: 'srv-4',
      title: '7/12 (Satbara) Land Extract & Mutation',
      category: 'Revenue',
      categoryKey: 'catRevenue',
      department: 'Revenue Department',
      deptShort: 'Mahabhulekh',
      processingTime: '3 Days',
      documentsCount: 1,
      status: 'Online',
      badge: 'Digital Signed',
      badgeColor: 'green',
      description: 'Download digitally signed 7/12 and 8A land records verified directly from state land registries.',
      eligibility: 'Property owners or authorized applicants in Maharashtra.',
      requiredDocs: ['Gut/Survey Number or Aadhaar verification'],
      connectedApis: ['Mahabhulekh Registry API', 'Digital Signature Service']
    },
    {
      id: 'srv-5',
      title: 'Domicile and Age Nationality Certificate',
      category: 'Certificates',
      categoryKey: 'catCertificates',
      department: 'General Administration Department',
      deptShort: 'Aaple Sarkar',
      processingTime: '12 Days',
      documentsCount: 3,
      status: 'Online',
      badge: 'Government Essential',
      badgeColor: 'gold',
      description: 'Official certificate establishing continuous domicile residence in Maharashtra state.',
      eligibility: 'Continuous 15 years residence in Maharashtra.',
      requiredDocs: ['Birth Certificate (Local Body)', 'Residence Proof (DigiLocker)', 'School Leaving Cert'],
      connectedApis: ['Aaple Sarkar SSO', 'Local Bodies API', 'DigiLocker Vault']
    },
    {
      id: 'srv-6',
      title: 'Employment Exchange Registration & Skill India',
      category: 'Employment',
      categoryKey: 'catEmployment',
      department: 'Skill Development & Entrepreneurship',
      deptShort: 'MahaSkills',
      processingTime: '1 Day',
      documentsCount: 2,
      status: 'Online',
      badge: 'Instant Approval',
      badgeColor: 'green',
      description: 'Register on state job portal, access Skill India courses, and apply for government job notifications.',
      eligibility: 'Candidates aged 18+ with minimum 10th pass qualification.',
      requiredDocs: ['Aadhaar Card (DigiLocker)', 'Qualification Mark Sheet'],
      connectedApis: ['MahaSkill Exchange API', 'DigiLocker SSO', 'National Career Service']
    },
    {
      id: 'srv-7',
      title: 'Food Security Ration Card Linking & Subsidy',
      category: 'Social Welfare',
      categoryKey: 'catWelfare',
      department: 'Food, Civil Supplies & Consumer Protection',
      deptShort: 'MahaPDS',
      processingTime: '5 Days',
      documentsCount: 2,
      status: 'Online',
      badge: 'Aadhaar Seeded',
      badgeColor: 'blue',
      description: 'Link Aadhaar with Ration Card to receive food grain subsidies across any PDS shop in India.',
      eligibility: 'Existing Ration Card holders in Maharashtra.',
      requiredDocs: ['Ration Card Number', 'Aadhaar Biometric Consent'],
      connectedApis: ['MahaPDS Registry', 'One Nation One Ration Card API']
    },
    {
      id: 'srv-8',
      title: 'Senior Citizen Identity & Pension Scheme',
      category: 'Social Welfare',
      categoryKey: 'catWelfare',
      department: 'Social Justice & Special Assistance',
      deptShort: 'SocialJustice',
      processingTime: '14 Days',
      documentsCount: 3,
      status: 'Online',
      badge: 'Welfare Direct',
      badgeColor: 'gold',
      description: 'Monthly pension and health benefit card for senior citizens aged 60 and above.',
      eligibility: 'Maharashtra resident, Age 60 years or above.',
      requiredDocs: ['Age Proof (DigiLocker Aadhaar)', 'Income Certificate (Revenue Dept)'],
      connectedApis: ['Social Justice API', 'MeriPehchaan SSO', 'Aaple Sarkar']
    }
  ],

  // Connected Services System Health (Interoperability Layer Monitor)
  connectedSystems: [
    { name: 'Aaple Sarkar Portal', category: 'State Service Delivery', status: 'Operational', latency: '45ms', sla: '99.9%' },
    { name: 'MahaDBT Scholarship Portal', category: 'Direct Benefit Transfer', status: 'Operational', latency: '62ms', sla: '99.8%' },
    { name: 'DigiLocker Document Vault', category: 'National Document Repository', status: 'Operational', latency: '38ms', sla: '99.95%' },
    { name: 'API Setu Gateway', category: 'Government API Exchange', status: 'Operational', latency: '28ms', sla: '99.99%' },
    { name: 'MeriPehchaan SSO', category: 'National Single Sign-On', status: 'Operational', latency: '50ms', sla: '99.9%' },
    { name: 'Revenue Dept Income Registry', category: 'State Revenue System', status: 'Operational', latency: '75ms', sla: '99.5%' },
    { name: 'Mahabhulekh 7/12 Land Records', category: 'Land Revenue Registry', status: 'Degraded', latency: '210ms', sla: '97.4%' }
  ],

  // Default Mock Applications Database
  applicationsStore: JSON.parse(localStorage.getItem('esamanvit_applications') || localStorage.getItem('esamanvay_applications') || '[]'),

  // Initial Sample Application if empty
  initDefaults() {
    if (this.applicationsStore.length === 0) {
      const defaultApp = {
        id: 'MGOV-2026-00123',
        serviceId: 'srv-1',
        serviceTitle: 'Post-Matric Scholarship Scheme',
        applicantName: 'Rajesh Kumar Patil',
        mobile: '9876543210',
        district: 'Pune',
        department: 'Higher & Technical Education Department',
        submissionDate: '2026-08-28T10:30:00',
        currentStatus: 'Department Verification',
        currentStatusKey: 'statusDeptVerification',
        verificationData: {
          identity: { verified: true, source: 'MeriPehchaan SSO', value: 'Rajesh Patil (Aadhaar Verified)' },
          income: { verified: true, source: 'Revenue Dept API', value: '₹1,80,000 / Year (Valid)' },
          education: { verified: true, source: 'MahaDBT / SSC Board', value: 'B.Tech Computer Engg (85.2%)' },
          documents: { verified: true, source: 'DigiLocker Vault', value: '3/3 Documents Auto-Fetched' }
        },
        timeline: [
          { title: 'Application Submitted', date: '28 Aug 2026, 10:30 AM', completed: true, details: 'Application registered via e-Samanvit Unified Interoperability Layer' },
          { title: 'Identity Verified', date: '28 Aug 2026, 10:31 AM', completed: true, details: 'Autofetched via MeriPehchaan SSO' },
          { title: 'Education Verified', date: '28 Aug 2026, 10:31 AM', completed: true, details: 'Cross-checked with MahaDBT Board Records' },
          { title: 'Income Verified', date: '28 Aug 2026, 10:32 AM', completed: true, details: 'Validated against Revenue Dept Certificate REV-MH-2025-9921' },
          { title: 'Department Verification', date: 'In Progress', completed: false, current: true, details: 'Under scrutiny by Higher Education Officer, Pune District' },
          { title: 'Final Decision & Disbursement', date: 'Pending', completed: false, details: 'Direct Benefit Transfer to Aadhaar seeded bank account' }
        ]
      };
      this.applicationsStore.push(defaultApp);
      this.saveApplications();
    }
  },

  saveApplications() {
    localStorage.setItem('esamanvit_applications', JSON.stringify(this.applicationsStore));
  },

  getServices(category = 'All', searchQuery = '') {
    return this.services.filter(s => {
      const matchCat = (category === 'All' || s.category === category);
      const matchQuery = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()) || s.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  },

  getServiceById(id) {
    return this.services.find(s => s.id === id) || this.services[0];
  },

  getMockCitizenVerifiedData() {
    return {
      fullName: 'Rajesh Kumar Patil',
      dob: '1998-05-14',
      gender: 'Male',
      mobile: '9876543210',
      email: 'rajesh.patil@example.com',
      aadhaarLast4: '4829',
      address: 'Plot 42, Green Park, Aundh, Pune, Maharashtra - 411007',
      district: 'Pune',
      taluka: 'Haveli',
      annualIncome: '180000',
      incomeCertNo: 'REV-MH-2025-9921',
      qualification: 'B.Tech Computer Engineering',
      institution: 'Government College of Engineering, Pune',
      marksPercentage: '85.2%',
      sscRollNo: 'MH-2016-883920',
      casteCategory: 'OBC / SEBC',
      digilockerDocs: [
        { name: 'Aadhaar Card', docId: 'AADHAAR-4829', verified: true, source: 'UIDAI' },
        { name: 'Income Certificate', docId: 'REV-MH-2025-9921', verified: true, source: 'Revenue Dept' },
        { name: 'HSC / Degree Marksheet', docId: 'MSBSHSE-2018-992', verified: true, source: 'Maharashtra Education Board' }
      ]
    };
  },

  submitApplication(serviceId, formData = {}) {
    const service = this.getServiceById(serviceId);
    const mockData = this.getMockCitizenVerifiedData();
    
    // Generate unified application ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const appId = `MGOV-2026-${randomNum}`;
    const now = new Date().toISOString();

    const newApp = {
      id: appId,
      serviceId: service.id,
      serviceTitle: service.title,
      applicantName: formData.fullName || mockData.fullName,
      mobile: formData.mobile || mockData.mobile,
      district: formData.district || mockData.district,
      department: service.department,
      submissionDate: now,
      currentStatus: 'Department Verification',
      currentStatusKey: 'statusDeptVerification',
      verificationData: {
        identity: { verified: true, source: 'MeriPehchaan SSO', value: `${formData.fullName || mockData.fullName} (Aadhaar Verified)` },
        income: { verified: true, source: 'Revenue Dept API', value: `₹${formData.annualIncome || mockData.annualIncome} / Year (Verified)` },
        education: { verified: true, source: 'MahaDBT / Board', value: `${formData.qualification || mockData.qualification}` },
        documents: { verified: true, source: 'DigiLocker Vault', value: '3/3 Documents Auto-Fetched' }
      },
      timeline: [
        { title: 'Application Submitted', date: new Date().toLocaleString(), completed: true, details: 'Application registered via e-Samanvit Unified Interoperability Layer' },
        { title: 'Identity Verified', date: new Date().toLocaleString(), completed: true, details: 'Autofetched via MeriPehchaan SSO' },
        { title: 'Education Verified', date: new Date().toLocaleString(), completed: true, details: 'Cross-checked with MahaDBT Board Records' },
        { title: 'Income Verified', date: new Date().toLocaleString(), completed: true, details: 'Validated against Revenue Dept Registry' },
        { title: 'Department Verification', date: 'In Progress', completed: false, current: true, details: `Under scrutiny by ${service.department}` },
        { title: 'Final Decision & Benefit Transfer', date: 'Pending', completed: false, details: 'Final approval and disbursement' }
      ]
    };

    this.applicationsStore.unshift(newApp);
    this.saveApplications();
    return newApp;
  },

  getApplicationStatus(appId) {
    const cleanId = (appId || '').trim().toUpperCase();
    return this.applicationsStore.find(a => a.id.toUpperCase() === cleanId) || null;
  },

  getAllApplications() {
    return this.applicationsStore;
  },

  getOfficerDashboardStats() {
    const apps = this.applicationsStore;
    return {
      total: apps.length + 12539,
      pending: apps.filter(a => !a.approved && !a.rejected).length + 1244,
      approved: apps.filter(a => a.approved).length + 9830,
      rejected: apps.filter(a => a.rejected).length + 1222,
      delayed: 243
    };
  }
};

// Initialize default data
MockAPI.initDefaults();
