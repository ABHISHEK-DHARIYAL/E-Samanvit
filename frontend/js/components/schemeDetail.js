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

// -- Reusable detail-content data, with full English, Hindi, Marathi support ----
const SCHEME_DETAILS = {
  s1: {
    en: {
      title: 'MahaDBT Post-Matric Scholarship',
      dept: 'Social Justice & Special Assistance Dept, Government of Maharashtra',
      badge: 'Fee Reimbursement',
      verifiedBadge: 'VERIFIED GOVERNMENT SCHEME',
      dbtBadge: 'DIRECT BENEFIT TRANSFER (DBT)',
      refCode: 'Portal Ref: S1-MH2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL COVERAGE',
      benefitsHighlight: 'Direct Bank Transfer (DBT) up to ₹65,000 / year • 100% Tuition & Exam Fee Waiver',
      applyOnline: 'Apply Online',
      autofillReady: 'Live Autofill Ready',
      backToCategory: 'Back to Student Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Official objective and statutory scope under Government of Maharashtra',
      overview: "This scheme gives students from marginalized and economically weaker communities financial relief while they pursue post-matric (after Class 10) education in Maharashtra. It covers tuition, examination and other approved fees, plus a monthly maintenance allowance, so the cost of studying further doesn't fall entirely on the family.",
      facts: [
        { label: 'Eligible Beneficiaries', value: 'SC, ST, OBC, SBC, VJNT, EWS/EBC Students' },
        { label: 'Education Stage', value: 'Post-Matric (Diploma, Degree & Professional Courses)' },
        { label: 'Disbursement Channel', value: 'Direct Benefit Transfer (DBT via Aadhaar-linked Bank)' },
        { label: 'Nodal Authority', value: 'Social Justice & Special Assistance Dept, Maharashtra' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Fee coverage and monthly maintenance allowances',
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
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Conditions required to qualify for this scholarship',
      eligibility: [
        { title: 'Domicile', text: 'Must be a resident/domicile of Maharashtra.' },
        { title: 'Category', text: 'Belongs to SC, ST, OBC, SBC, VJNT, or EWS/EBC category, as defined by the relevant department guidelines.' },
        { title: 'Income Limit', text: 'Annual family income generally at or below ₹2.50 lakh for SC/OBC/Special Assistance schemes. Some EWS/EBC or technical-course categories allow up to ₹8 lakh — check the exact limit for your category and course.' },
        { title: 'Academic Progress', text: "Must have passed the previous year's examination, without a prolonged gap in education." }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Application Procedure',
      sec4Sub: 'Simple, transparent 4-stage process to submit and track your scholarship',
      applicationSteps: [
        { step: 'STAGE 01', title: 'Portal Registration', text: 'Register on the MahaDBT portal with verified Aadhaar and active mobile OTP authentication.' },
        { step: 'STAGE 02', title: 'Profile & Course Entry', text: 'Complete academic profile, enter admission details, and select your approved college course.' },
        { step: 'STAGE 03', title: 'Upload Documents', text: 'Upload caste, income, domicile certificates, fee receipts, and previous year marksheets.' },
        { step: 'STAGE 04', title: 'Scrutiny & DBT Payment', text: 'Institute and Department verify records; approved funds are disbursed directly to your bank account.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Important Dates & Schedule',
      sec5Sub: 'Official application timelines and notification window',
      datesBadge: 'ACTIVE APPLICATION WINDOW',
      datesHeading: 'Academic Year 2026–27 Applications',
      datesRange: 'June 1, 2026 – September 30, 2026',
      datesNote: 'Dates are set for each academic year — always confirm the current window on the official MahaDBT portal before applying.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Verified portals and official government documentation',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of Maharashtra portals:',
      sources: [
        { label: 'Social Justice & Special Assistance Department, Maharashtra', url: 'https://sjsa.maharashtra.gov.in/en/scheme/government-of-india-post-matric-scholarship-scheme' },
        { label: 'MahaDBT — Scheme Data', url: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A19A7691F3B40AD4EE0F3DDA5DE324AC54819922BB3D36B63' },
        { label: 'Buddy4Study — Scheme Overview', url: 'https://www.buddy4study.com/scholarship/government-of-india-postmatric-scholarship-maharashtra' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Scanned documents to keep ready prior to submission',
      requiredDocuments: [
        { title: 'Caste certificate', desc: 'Original certificate issued by competent authority / Sub-Divisional Officer' },
        { title: 'Income certificate issued by a competent authority', desc: 'Valid for Financial Year 2026–27 issued by Tahsildar' },
        { title: "Previous year's marksheets", desc: 'SSC / HSC / Diploma / Semester passing marksheet' },
        { title: 'Fee receipt from the institution', desc: 'Current academic year paid admission fee receipt or bonafide certificate' },
        { title: 'Aadhaar-seeded bank account details (for Direct Bank Transfer)', desc: 'Active bank account linked with Aadhaar in NPCI mapper' }
      ],
      docsAlert: 'Important Instruction: Ensure your bank account is active and seeded with Aadhaar in the NPCI mapper for uninterrupted Direct Benefit Transfer (DBT).'
    },
    hi: {
      title: 'महाडीबीटी मैट्रिकोत्तर छात्रवृत्ति योजना',
      dept: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
      badge: 'शुल्क प्रतिपूर्ति',
      verifiedBadge: 'सत्यापित शासकीय योजना',
      dbtBadge: 'प्रत्यक्ष लाभ अंतरण (DBT)',
      refCode: 'पोर्टल संदर्भ: S1-MH2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'प्रति वर्ष ₹65,000 तक प्रत्यक्ष बैंक अंतरण (DBT) • 100% शिक्षण व परीक्षा शुल्क छूट',
      applyOnline: 'ऑनलाइन आवेदन करें',
      autofillReady: 'लाइव ऑटोफिल उपलब्ध',
      backToCategory: 'छात्र योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'महाराष्ट्र शासन के अंतर्गत आधिकारिक उद्देश्य एवं वैधानिक दायरा',
      overview: "यह योजना महाराष्ट्र में 10वीं कक्षा के बाद (मैट्रिकोत्तर) उच्च शिक्षा प्राप्त कर रहे वंचित एवं आर्थिक रूप से कमजोर वर्गों के छात्रों को वित्तीय सहायता प्रदान करती है। इसमें शिक्षण शुल्क, परीक्षा शुल्क व अन्य अनुमोदित शुल्क की 100% प्रतिपूर्ति के साथ मासिक निर्वाह भत्ता शामिल है, ताकि आगे की पढ़ाई का आर्थिक बोझ परिवार पर न पड़े।",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'अ.जा. (SC), अ.ज. (ST), इ.मा.व. (OBC), वि.मा.प्र. (SBC), वि.जा.भ.ज. (VJNT), ई.डब्ल्यू.एस. (EWS/EBC) छात्र' },
        { label: 'शिक्षा का स्तर', value: 'मैट्रिकोत्तर (डिप्लोमा, डिग्री एवं व्यावसायिक पाठ्यक्रम)' },
        { label: 'वितरण का माध्यम', value: 'प्रत्यक्ष लाभ अंतरण (आधार लिंक बैंक खाते में DBT)' },
        { label: 'नोडल विभाग', value: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'शुल्क प्रतिपूर्ति एवं मासिक निर्वाह भत्ता',
      keyBenefits: [
        {
          title: 'शुल्क छूट (Fee Waiver)',
          text: 'मान्यता प्राप्त पाठ्यक्रमों के लिए अनिवार्य शिक्षण एवं परीक्षा शुल्क की 100% प्रतिपूर्ति अथवा माफी (सरकारी अथवा अनुदानित/गैर-अनुदानित संस्थान के नियमानुसार)।'
        },
        {
          title: 'मासिक निर्वाह भत्ता (Maintenance Allowance)',
          text: 'प्रति वर्ष अधिकतम 10 माह तक मासिक निर्वाह भत्ता। यह राशि पाठ्यक्रम के स्तर तथा छात्र के छात्रावास (Hostel) या दिवा-छात्र (Day Scholar) होने पर निर्भर करती है।'
        },
        {
          title: 'अतिरिक्त भत्ते (Additional Allowances)',
          text: 'अध्ययन भ्रमण (Study tours), शोध-प्रबंध टंकण (Thesis typing) के लिए अतिरिक्त सहायता तथा दिव्यांग विद्यार्थियों के लिए विशेष अतिरिक्त प्रावधान।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'इस छात्रवृत्ति के लिए आवश्यक योग्यता शर्तें',
      eligibility: [
        { title: 'अधिवास (Domicile)', text: 'आवेदक महाराष्ट्र राज्य का मूल निवासी (Domicile) होना अनिवार्य है।' },
        { title: 'आरक्षण श्रेणी (Category)', text: 'संबधित विभागीय दिशानिर्देशों के अनुसार SC, ST, OBC, SBC, VJNT, अथवा EWS/EBC वर्ग से संबंधित होना चाहिए।' },
        { title: 'आय सीमा (Income Limit)', text: 'SC/OBC/विशेष सहाय्य योजनाओं के लिए वार्षिक पारिवारिक आय सामान्यतः ₹2.50 लाख या उससे कम होनी चाहिए। कुछ EWS/EBC अथवा तकनीकी पाठ्यक्रमों में ₹8 लाख तक की छूट है — अपनी श्रेणी व पाठ्यक्रम अनुसार सीमा जांचें।' },
        { title: 'शैक्षणिक प्रगति (Academic)', text: 'छात्र ने गत वर्ष की परीक्षा उत्तीर्ण की हो और शिक्षा में कोई अनधिकृत लंबा अंतराल (gap) न हो।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध आवेदन प्रक्रिया',
      sec4Sub: 'छात्रवृत्ति आवेदन व ट्रैकिंग हेतु पारदर्शी 4-चरणीय प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'पोर्टल पंजीकरण', text: 'महाडीबीटी पोर्टल पर प्रमाणित आधार और सक्रिय मोबाइल नंबर पर ओटीपी द्वारा पंजीकरण करें।' },
        { step: 'चरण 02', title: 'प्रोफ़ाइल व पाठ्यक्रम चयन', text: 'शैक्षणिक प्रोफ़ाइल पूर्ण करें, प्रवेश विवरण दर्ज करें और अनुमोदित कॉलेज पाठ्यक्रम चुनें।' },
        { step: 'चरण 03', title: 'दस्तावेज़ अपलोड', text: 'जाति प्रमाण पत्र, आय प्रमाण पत्र, अधिवास, फीस रसीद और गत वर्ष की अंकतालिका अपलोड करें।' },
        { step: 'चरण 04', title: 'सत्यापन एवं डीबीटी भुगतान', text: 'कॉलेज एवं विभाग द्वारा आवेदन की जांच; स्वीकृत राशि सीधे आपके बैंक खाते में अंतरित की जाती है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'महत्वपूर्ण तिथियां एवं समय-सारणी',
      sec5Sub: 'आधिकारिक आवेदन समय-सीमा एवं सूचना अवधि',
      datesBadge: 'सक्रिय आवेदन अवधि',
      datesHeading: 'शैक्षणिक वर्ष 2026–27 आवेदन',
      datesRange: '1 जून 2026 – 30 सितंबर 2026',
      datesNote: 'तिथियां प्रत्येक शैक्षणिक वर्ष के लिए निर्धारित होती हैं — आवेदन करने से पहले आधिकारिक महाडीबीटी पोर्टल पर वर्तमान विंडो की पुष्टि अवश्य करें।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'सत्यापित पोर्टल एवं आधिकारिक सरकारी दस्तावेज़',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे महाराष्ट्र शासन के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र', url: 'https://sjsa.maharashtra.gov.in/en/scheme/government-of-india-post-matric-scholarship-scheme' },
        { label: 'महाडीबीटी — योजना डेटा (MahaDBT)', url: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A19A7691F3B40AD4EE0F3DDA5DE324AC54819922BB3D36B63' },
        { label: 'Buddy4Study — योजना अवलोकन', url: 'https://www.buddy4study.com/scholarship/government-of-india-postmatric-scholarship-maharashtra' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'आवेदन से पूर्व स्कैन करके तैयार रखने हेतु दस्तावेज़',
      requiredDocuments: [
        { title: 'जाति प्रमाण पत्र (Caste Certificate)', desc: 'सक्षम प्राधिकारी / उप-विभागीय अधिकारी द्वारा जारी मूल प्रमाण पत्र' },
        { title: 'आय प्रमाण पत्र (Income Certificate)', desc: 'तहसीलदार द्वारा वित्तीय वर्ष 2026-27 हेतु जारी वैध प्रमाण पत्र' },
        { title: 'गत वर्ष की अंकतालिका (Marksheet)', desc: '10वीं / 12वीं / डिप्लोमा / पिछले सेमेस्टर का उत्तीर्ण प्रमाण पत्र' },
        { title: 'संस्थान की फीस रसीद (Fee Receipt)', desc: 'वर्तमान शैक्षणिक सत्र की भुगतान रसीद अथवा बोनाफाइड प्रमाणपत्र' },
        { title: 'आधार-सीडेड बैंक खाता (DBT हेतु)', desc: 'NPCI मैपर में आधार से लिंक सक्रिय बैंक खाता' }
      ],
      docsAlert: 'महत्वपूर्ण निर्देश: निर्बाध प्रत्यक्ष लाभ अंतरण (DBT) सुनिश्चित करने के लिए आपका बैंक खाता सक्रिय होना चाहिए और NPCI मैपर में आधार से लिंक होना अनिवार्य है।'
    },
    mr: {
      title: 'महाडीबीटी मॅट्रिकोत्तर शिष्यवृत्ती योजना',
      dept: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
      badge: 'फी प्रतिपूर्ती',
      verifiedBadge: 'प्रमाणित शासकीय योजना',
      dbtBadge: 'थेट लाभ हस्तांतरण (DBT)',
      refCode: 'पोर्टल संदर्भ: S1-MH2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक साहाय्य',
      benefitsHighlight: 'वार्षिक ₹६५,००० पर्यंत थेट बँक हस्तांतरण (DBT) • १००% शिक्षण व परीक्षा फी माफी',
      applyOnline: 'ऑनलाइन अर्ज करा',
      autofillReady: 'थेट ऑटोफिल उपलब्ध',
      backToCategory: 'विद्यार्थी योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'महाराष्ट्र शासनांतर्गत अधिकृत उद्दिष्ट आणि वैधानिक स्वरूप',
      overview: "ही योजना महाराष्ट्रात १०वी नंतर (मॅट्रिकोत्तर) उच्च शिक्षण घेणाऱ्या वंचित व आर्थिकदृष्ट्या दुर्बल घटकांतील विद्यार्थ्यांना आर्थिक दिलासा देते. यामध्ये शिक्षण शुल्क, परीक्षा शुल्क व इतर मान्यताप्राप्त शुल्काची १००% प्रतिपूर्ती आणि मासिक निर्वाह भत्ता समाविष्ट आहे, जेणेकरून पुढील शिक्षणाचा खर्च कुटुंबावर पडणार नाही.",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'अ.जा. (SC), अ.ज. (ST), इ.मा.व. (OBC), वि.मा.प्र. (SBC), वि.जा.भ.ज. (VJNT), ई.डब्ल्यू.एस. (EWS/EBC) विद्यार्थी' },
        { label: 'शिक्षणाचा टप्पा', value: 'मॅट्रिकोत्तर (पदविका, पदवी आणि व्यावसायिक अभ्यासक्रम)' },
        { label: 'निधी वितरण पद्धत', value: 'थेट लाभ हस्तांतरण (आधार संलग्न बँक खात्यात DBT)' },
        { label: 'नोडल विभाग', value: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: 'फी माफी आणि मासिक निर्वाह भत्ता',
      keyBenefits: [
        {
          title: 'फी माफी (Fee Waiver)',
          text: 'मान्यताप्राप्त अभ्यासक्रमांसाठी अनिवार्य शिक्षण व परीक्षा शुल्काची १००% प्रतिपूर्ती किंवा माफी (शासकीय/अनुदानित/विनाअनुदानित संस्थेच्या नियमांनुसार).'
        },
        {
          title: 'मासिक निर्वाह भत्ता (Maintenance Allowance)',
          text: 'वर्षातून जास्तीत जास्त १० महिन्यांपर्यंत मासिक निर्वाह भत्ता. ही रक्कम अभ्यासक्रमाच्या स्तरावर आणि विद्यार्थी वसतिगृहात राहतो की डे-स्कॉलर आहे यावर अवलंबून असते.'
        },
        {
          title: 'अतिरिक्त भत्ते (Additional Allowances)',
          text: 'अभ्यास दौरा (Study tours), शोधनिबंध टंकलेखन यासाठी अतिरिक्त साहाय्य आणि दिव्यांग विद्यार्थ्यांसाठी लागू असल्यास विशेष अतिरिक्त तरतूद.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'या शिष्यवृत्तीसाठी आवश्यक असणाऱ्या अटी',
      eligibility: [
        { title: 'अधिवास (Domicile)', text: 'अर्जदार महाराष्ट्र राज्याचा रहिवासी (अधिवास/डोमिसिल) असणे आवश्यक आहे.' },
        { title: 'प्रवर्ग (Category)', text: 'संबंधित विभागाच्या नियमांनुसार SC, ST, OBC, SBC, VJNT किंवा EWS/EBC प्रवर्गातील असणे आवश्यक.' },
        { title: 'उत्पन्न मर्यादा (Income Limit)', text: 'SC/OBC/विशेष साहाय्य योजनांसाठी वार्षिक कौटुंबिक उत्पन्न साधारणपणे ₹२.५० लाख किंवा त्यापेक्षा कमी असावे. काही EWS/EBC किंवा तांत्रिक अभ्यासक्रमांसाठी ₹८ लाखांपर्यंत मुभा आहे — आपल्या प्रवर्गाची मर्यादा तपासा.' },
        { title: 'शैक्षणिक प्रगती (Academic)', text: 'विद्यार्थ्याने मागील वर्षाची परीक्षा उत्तीर्ण केलेली असावी आणि शिक्षणात मोठा खंड पडलेला नसावा.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने अर्ज प्रक्रिया',
      sec4Sub: 'शिष्यवृत्ती अर्ज व ट्रॅकिंगसाठी सोपी ४-टप्प्यांची पारदर्शक प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'पोर्टल नोंदणी', text: 'महाडीबीटी पोर्टलवर प्रमाणित आधार आणि चालू मोबाईल क्रमांकावर ओटीपीद्वारे नोंदणी करा.' },
        { step: 'टप्पा ०२', title: 'प्रोफाइल व अभ्यासक्रम निवड', text: 'शैक्षणिक प्रोफाइल पूर्ण करा, प्रवेश तपशील भरा आणि मान्यताप्राप्त कॉलेज अभ्यासक्रम निवडा.' },
        { step: 'टप्पा ०३', title: 'कागदपत्रे अपलोड करा', text: 'जात प्रमाणपत्र, उत्पन्न प्रमाणपत्र, अधिवास दाखला, फी पावती आणि मागील वर्षाचे गुणपत्रक अपलोड करा.' },
        { step: 'टप्पा ०४', title: 'छाननी व थेट निधी वितरण', text: 'महाविद्यालय व विभागामार्फत कागदपत्रांची पडताळणी; मंजूर निधी थेट तुमच्या बँक खात्यात जमा होतो.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'महत्त्वाच्या तारखा व वेळापत्रक',
      sec5Sub: 'अधिकृत अर्ज मुदत आणि सूचना कालावधी',
      datesBadge: 'सक्रिय अर्ज कालावधी',
      datesHeading: 'शैक्षणिक वर्ष २०२६–२७ अर्ज',
      datesRange: '१ जून २०२६ – ३० सप्टेंबर २०२६',
      datesNote: 'तारखा प्रत्येक शैक्षणिक वर्षासाठी निश्चित केल्या जातात — अर्ज करण्यापूर्वी अधिकृत महाडीबीटी पोर्टलवर सध्याची मुदत नक्की तपासा.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'प्रमाणित पोर्टल्स आणि अधिकृत शासकीय माहिती',
      sourcesNote: 'या पृष्ठावरील माहिती थेट महाराष्ट्र शासनाच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन', url: 'https://sjsa.maharashtra.gov.in/en/scheme/government-of-india-post-matric-scholarship-scheme' },
        { label: 'महाडीबीटी — योजना तपशील (MahaDBT)', url: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A19A7691F3B40AD4EE0F3DDA5DE324AC54819922BB3D36B63' },
        { label: 'Buddy4Study — योजना आढावा', url: 'https://www.buddy4study.com/scholarship/government-of-india-postmatric-scholarship-maharashtra' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'अर्जापूर्वी स्कॅन करून तयार ठेवावयाची कागदपत्रे',
      requiredDocuments: [
        { title: 'जात प्रमाणपत्र (Caste Certificate)', desc: 'सक्षम प्राधिकारी / उपविभागीय अधिकाऱ्याने दिलेला अधिकृत दाखला' },
        { title: 'उत्पन्न प्रमाणपत्र (Income Certificate)', desc: 'तहसीलदाराने आर्थिक वर्ष २०२६-२७ साठी दिलेला अधिकृत दाखला' },
        { title: 'मागील वर्षाचे गुणपत्रक (Marksheet)', desc: '१०वी / १२वी / पदविका / मागील सत्राचा उत्तीर्ण दाखला' },
        { title: 'संस्थेची फी पावती (Fee Receipt)', desc: 'चालू शैक्षणिक सत्राची फी पावती किंवा बोनाफाईड प्रमाणपत्र' },
        { title: 'आधार संलग्न बँक खाते (DBT साठी)', desc: 'NPCI मॅपरमध्ये आधारशी लिंक असलेले सक्रिय बँक खाते' }
      ],
      docsAlert: 'महत्त्वाची सूचना: थेट लाभ हस्तांतरण (DBT) विनाअडथळा होण्यासाठी तुमचे बँक खाते सक्रिय असणे आणि NPCI मॅपरमध्ये आधारशी संलग्न असणे आवश्यक आहे.'
    }
  },
  s2: {
    en: {
      title: 'National Scholarship Portal (NSP)',
      dept: 'Ministry of Education / Ministry of Social Justice & Empowerment / Ministry of Minority Affairs, Govt of India',
      badge: 'Central Sector Scheme',
      verifiedBadge: 'VERIFIED GOVERNMENT OF INDIA SCHEME',
      dbtBadge: 'DIRECT BENEFIT TRANSFER (PFMS / DBT)',
      refCode: 'Portal Ref: NSP-GOI2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Direct Bank Transfer (DBT) via PFMS — amounts vary by scheme, from a few thousand rupees (pre-matric) up to ₹80,000+/year (post-matric, UGC/AICTE, professional courses)',
      applyOnline: 'Apply Online (scholarships.gov.in)',
      autofillReady: 'OTR & Live Sync Ready',
      backToCategory: 'Back to Student Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Single unified digital platform under Digital India & National e-Governance Plan',
      overview: "NSP is a single unified digital platform bringing together hundreds of central and state government scholarship schemes, enabling application, verification, approval, and Direct Benefit Transfer to eligible students. It's run under the government's Digital India and National e-Governance Plan initiatives, covering students from Class 1 all the way up to PhD level.",
      facts: [
        { label: 'Eligible Beneficiaries', value: 'SC, ST, OBC, EWS, Minority & Merit Students' },
        { label: 'Academic Coverage', value: 'Class 1 to PhD Level (Pre-Matric, Post-Matric, Higher & Technical)' },
        { label: 'Disbursement Method', value: 'Direct Bank Transfer (DBT) via PFMS to Student Account' },
        { label: 'Nodal Authority', value: 'Ministry of Education, MoSJE & MoMA, Government of India' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Tuition fees, maintenance allowances and single window coverage',
      keyBenefits: [
        {
          title: 'Fee Reimbursement',
          text: 'Tuition, admission, and exam fee support depending on scheme guidelines and course level.'
        },
        {
          title: 'Maintenance / Stipend',
          text: 'Monthly or annual allowance for pre-matric and post-matric students disbursed directly via PFMS.'
        },
        {
          title: 'Wide Coverage',
          text: 'Covers pre-matric (up to class 10) and post-matric (class 11 to college and beyond) students, including SC, ST, OBC, EWS and minority-community students.'
        },
        {
          title: 'Single Window',
          text: 'One registration matches you to all central and state schemes you qualify for without filling separate portals.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Conditions required to qualify for schemes on National Scholarship Portal',
      eligibility: [
        { title: 'Nationality', text: 'Indian nationals only.' },
        { title: 'Academic Level', text: 'Students studying in recognized schools, colleges, or universities from Class 1 up to PhD levels can apply.' },
        { title: 'Category', text: 'SC / ST / OBC / EWS / Minority community students (scheme-dependent criteria apply).' },
        { title: 'One Time Registration (OTR)', text: "Mandatory unique ID required before applying, valid throughout the student's academic journey on NSP." },
        { title: 'Aadhaar Linkage', text: "Aadhaar linkage to the student's own active bank account is mandatory for DBT processing." }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Application Procedure',
      sec4Sub: 'Transparent 4-stage online process on scholarships.gov.in',
      applicationSteps: [
        { step: 'STAGE 01', title: 'OTR Registration', text: 'Complete One Time Registration (OTR) on scholarships.gov.in using Aadhaar / FaceAuth to generate a lifetime OTR ID.' },
        { step: 'STAGE 02', title: 'Scheme Selection', text: 'Log in with OTR, review all matched Central and State scholarships based on category and course, and select scheme.' },
        { step: 'STAGE 03', title: 'Document Upload', text: 'Upload required income, caste, and academic marksheets and submit online for institute level scrutiny.' },
        { step: 'STAGE 04', title: 'Scrutiny & PFMS DBT', text: 'Application is verified by School/College (L1) and District/State (L2); approved funds are disbursed via PFMS into bank account.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Important Dates & Schedule',
      sec5Sub: 'Academic Year 2026–27 official timelines',
      datesBadge: 'ACTIVE APPLICATION WINDOW',
      datesHeading: 'Academic Year 2026–27 Applications',
      datesRange: 'Portal Opened: 1 June 2026 | Most Schemes Close: 31 October 2026',
      datesNote: 'Some pre-matric schemes may close earlier — around 31 August 2026. Advice: Finish well before October — the portal slows significantly during the final rush, and applications go through institute + district/state verification after submission.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Verified National Scholarship Portal endpoints',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of India portals:',
      sources: [
        { label: 'National Scholarship Portal — scholarships.gov.in', url: 'https://scholarships.gov.in' },
        { label: 'Ministry of Social Justice & Empowerment, Govt of India', url: 'https://socialjustice.gov.in' },
        { label: 'Ministry of Education / Ministry of Minority Affairs', url: 'https://www.education.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Verified documents checklist to upload before final submission',
      requiredDocuments: [
        { title: 'Aadhaar card', desc: 'Valid Aadhaar with updated biometric / mobile link' },
        { title: "Bank account in student's own name, Aadhaar-linked", desc: 'Active bank account seeded with Aadhaar for PFMS DBT credit' },
        { title: 'Income certificate', desc: 'Issued by designated competent revenue authority for current fiscal year' },
        { title: 'Caste/category certificate (if applicable)', desc: 'Valid community / category certificate from competent state authority' },
        { title: "Previous year's marksheets", desc: 'Marksheet or passing grade certificate of previous qualifying examination' },
        { title: 'Institute-verified enrollment/fee details', desc: 'Bonafide certificate and admission fee receipts from educational institution' }
      ],
      docsAlert: 'Common Rejection Reasons: Wrong Aadhaar-bank detail mismatch, an unverified institute, or a missing income certificate are the most avoidable causes of rejection.'
    },
    hi: {
      title: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)',
      dept: 'शिक्षा मंत्रालय / सामाजिक न्याय एवं अधिकारिता मंत्रालय / अल्पसंख्यक कार्य मंत्रालय, भारत सरकार',
      badge: 'केंद्रीय क्षेत्र योजना',
      verifiedBadge: 'सत्यापित भारत सरकार योजना',
      dbtBadge: 'प्रत्यक्ष लाभ अंतरण (PFMS / DBT)',
      refCode: 'पोर्टल संदर्भ: NSP-GOI2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'PFMS के माध्यम से प्रत्यक्ष बैंक अंतरण (DBT) — कुछ हज़ार रुपये (प्री-मैट्रिक) से लेकर ₹80,000+/वर्ष (पोस्ट-मैट्रिक, UGC/AICTE, व्यावसायिक पाठ्यक्रम)',
      applyOnline: 'ऑनलाइन आवेदन करें (scholarships.gov.in)',
      autofillReady: 'OTR एवं लाइव सिंक उपलब्ध',
      backToCategory: 'छात्र योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'डिजिटल इंडिया एवं राष्ट्रीय ई-गवर्नेंस योजना के अंतर्गत एकल एकीकृत मंच',
      overview: "NSP एक एकल एकीकृत डिजिटल मंच है जो केंद्र और राज्य सरकारों की सैकड़ों छात्रवृत्ति योजनाओं को एक साथ लाता है, जिससे पात्र छात्रों को आवेदन, सत्यापन, अनुमोदन और प्रत्यक्ष लाभ अंतरण (DBT) की सुविधा मिलती है। यह सरकार की डिजिटल इंडिया और राष्ट्रीय ई-गवर्नेंस योजना पहलों के तहत संचालित होता है, जिसमें कक्षा 1 से लेकर पीएचडी स्तर तक के छात्र शामिल हैं।",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'SC, ST, OBC, EWS, अल्पसंख्यक एवं मेधावी छात्र' },
        { label: 'शैक्षणिक स्तर', value: 'कक्षा 1 से पीएचडी तक (प्री-मैट्रिक, पोस्ट-मैट्रिक, उच्च एवं तकनीकी शिक्षा)' },
        { label: 'वितरण का माध्यम', value: 'छात्र के बैंक खाते में PFMS द्वारा प्रत्यक्ष लाभ अंतरण (DBT)' },
        { label: 'नोडल प्राधिकारी', value: 'शिक्षा मंत्रालय, सामाजिक न्याय और अल्पसंख्यक कार्य मंत्रालय, भारत सरकार' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'शुल्क प्रतिपूर्ति, मासिक निर्वाह भत्ता एवं एकल खिड़की सुविधा',
      keyBenefits: [
        {
          title: 'शुल्क प्रतिपूर्ति (Fee Reimbursement)',
          text: 'योजना दिशानिर्देशों और पाठ्यक्रम स्तर के आधार पर शिक्षण, प्रवेश और परीक्षा शुल्क सहायता।'
        },
        {
          title: 'मासिक निर्वाह / वजीफा (Maintenance/Stipend)',
          text: 'प्री-मैट्रिक और पोस्ट-मैट्रिक छात्रों के लिए PFMS के माध्यम से सीधे बैंक खाते में मासिक या वार्षिक भत्ता।'
        },
        {
          title: 'व्यापक दायरा (Wide Coverage)',
          text: 'कक्षा 1 से 10वीं (प्री-मैट्रिक) तथा 11वीं से कॉलेज व उच्च शिक्षा (पोस्ट-मैट्रिक) के SC, ST, OBC, EWS और अल्पसंख्यक छात्रों को कवर करता है।'
        },
        {
          title: 'एकल खिड़की (Single Window)',
          text: 'एक ही पंजीकरण से आप उन सभी केंद्रीय व राज्य योजनाओं से जुड़ जाते हैं जिनके लिए आप पात्र हैं।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'राष्ट्रीय छात्रवृत्ति पोर्टल की योजनाओं हेतु आवश्यक योग्यता शर्तें',
      eligibility: [
        { title: 'राष्ट्रीयता (Nationality)', text: 'केवल भारतीय नागरिक।' },
        { title: 'शैक्षणिक स्तर (Academic Level)', text: 'कक्षा 1 से लेकर पीएचडी स्तर तक के मान्यता प्राप्त विद्यालयों/महाविद्यालयों के छात्र आवेदन कर सकते हैं।' },
        { title: 'आरक्षण श्रेणी (Category)', text: 'SC / ST / OBC / EWS / अल्पसंख्यक समुदाय (संबंधित योजना-अनुसार शर्तें लागू)।' },
        { title: 'वन टाइम रजिस्ट्रेशन (OTR)', text: 'आवेदन से पहले अनिवार्य विशिष्ट आईडी (OTR ID), जो NSP पर छात्र की संपूर्ण शैक्षणिक यात्रा के दौरान मान्य रहती है।' },
        { title: 'आधार लिंकेज (Aadhaar Linkage)', text: 'DBT भुगतान हेतु छात्र के स्वयं के सक्रिय बैंक खाते से आधार लिंक होना अनिवार्य है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध आवेदन प्रक्रिया',
      sec4Sub: 'scholarships.gov.in पर पारदर्शी 4-चरणीय ऑनलाइन प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'OTR पंजीकरण', text: 'scholarships.gov.in पर आधार / FaceAuth से वन टाइम रजिस्ट्रेशन पूरा करें और OTR ID प्राप्त करें।' },
        { step: 'चरण 02', title: 'योजना चयन', text: 'OTR से लॉगिन करें, अपनी पात्रता व पाठ्यक्रम अनुसार सभी केंद्रीय/राज्य योजनाओं की सूची देखें और योजना चुनें।' },
        { step: 'चरण 03', title: 'दस्तावेज़ अपलोड', text: 'आय, जाति प्रमाण पत्र और गत वर्ष की अंकतालिका अपलोड करें तथा संस्थान स्तर पर सत्यापन हेतु सबमिट करें।' },
        { step: 'चरण 04', title: 'सत्यापन व PFMS DBT', text: 'स्कूल/कॉलेज (L1) और जिला/राज्य (L2) स्तर पर सत्यापन; PFMS द्वारा स्वीकृत राशि सीधे आपके बैंक खाते में जमा।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'महत्वपूर्ण तिथियां एवं समय-सारणी',
      sec5Sub: 'शैक्षणिक वर्ष 2026–27 आधिकारिक समय-सीमा',
      datesBadge: 'सक्रिय आवेदन अवधि',
      datesHeading: 'शैक्षणिक वर्ष 2026–27 आवेदन',
      datesRange: 'पोर्टल प्रारंभ: 1 जून 2026 | अधिकांश योजनाएं बंद: 31 अक्टूबर 2026',
      datesNote: 'कुछ प्री-मैट्रिक योजनाएं पहले — लगभग 31 अगस्त 2026 को बंद हो सकती हैं। महत्वपूर्ण सलाह: अक्टूबर से काफी पहले आवेदन पूर्ण करें — अंतिम दिनों में पोर्टल पर भारी लोड रहता है, और सबमिशन के बाद संस्थान व जिला/राज्य सत्यापन की प्रक्रिया होती है।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'सत्यापित पोर्टल एवं आधिकारिक सरकारी दस्तावेज़',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे भारत सरकार के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'राष्ट्रीय छात्रवृत्ति पोर्टल — scholarships.gov.in', url: 'https://scholarships.gov.in' },
        { label: 'सामाजिक न्याय एवं अधिकारिता मंत्रालय, भारत सरकार', url: 'https://socialjustice.gov.in' },
        { label: 'शिक्षा मंत्रालय / अल्पसंख्यक कार्य मंत्रालय, भारत सरकार', url: 'https://www.education.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'आवेदन से पूर्व स्कैन करके तैयार रखने हेतु दस्तावेज़',
      requiredDocuments: [
        { title: 'आधार कार्ड (Aadhaar Card)', desc: 'सक्रिय व मोबाइल से लिंक वैध आधार कार्ड' },
        { title: 'छात्र के स्वयं के नाम पर आधार लिंक बैंक खाता', desc: 'PFMS DBT क्रेडिट हेतु आधार-सीडेड सक्रिय बैंक खाता' },
        { title: 'आय प्रमाण पत्र (Income Certificate)', desc: 'चालू वित्तीय वर्ष हेतु सक्षम राजस्व प्राधिकारी (तहसीलदार) द्वारा जारी' },
        { title: 'जाति/श्रेणी प्रमाण पत्र (यदि लागू हो)', desc: 'सक्षम राज्य प्राधिकारी द्वारा जारी प्रमाण पत्र' },
        { title: 'गत वर्ष की अंकतालिका (Marksheet)', desc: 'पिछली उत्तीर्ण परीक्षा की मूल अंकतालिका' },
        { title: 'संस्थान द्वारा सत्यापित प्रवेश/फीस विवरण', desc: 'शिक्षण संस्थान से बोनाफाइड प्रमाणपत्र एवं शुल्क रसीद' }
      ],
      docsAlert: 'अस्वीकृति के सामान्य कारण: आधार-बैंक विवरण में बेमेल, असत्यापित संस्थान, या आय प्रमाण पत्र न होना अस्वीकृति के सबसे प्रमुख कारण हैं।'
    },
    mr: {
      title: 'राष्ट्रीय शिष्यवृत्ती पोर्टल (NSP)',
      dept: 'शिक्षण मंत्रालय / सामाजिक न्याय आणि विशेष साहाय्य मंत्रालय / अल्पसंख्याक कार्य मंत्रालय, भारत सरकार',
      badge: 'केंद्रीय क्षेत्र योजना',
      verifiedBadge: 'प्रमाणित भारत सरकार योजना',
      dbtBadge: 'थेट लाभ हस्तांतरण (PFMS / DBT)',
      refCode: 'पोर्टल संदर्भ: NSP-GOI2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक साहाय्य',
      benefitsHighlight: 'PFMS द्वारे थेट बँक हस्तांतरण (DBT) — काही हजार रुपयांपासून (मॅट्रिकपूर्व) ते वार्षिक ₹८०,०००+ पर्यंत (मॅट्रिकोत्तर, UGC/AICTE, व्यावसायिक अभ्यासक्रम)',
      applyOnline: 'ऑनलाइन अर्ज करा (scholarships.gov.in)',
      autofillReady: 'OTR आणि थेट सिंक उपलब्ध',
      backToCategory: 'विद्यार्थी योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'डिजिटल इंडिया आणि राष्ट्रीय ई-गव्हर्नन्स योजनेअंतर्गत एकल एकात्मिक व्यासपीठ',
      overview: "NSP हे एकच एकत्रित डिजिटल व्यासपीठ आहे जे केंद्र आणि राज्य शासनाच्या शेकडो शिष्यवृत्ती योजना एकत्र आणते, ज्यामुळे पात्र विद्यार्थ्यांना अर्ज, पडताळणी, मंजुरी आणि थेट लाभ हस्तांतरण (DBT) ची सोय मिळते. हे केंद्र सरकारच्या डिजिटल इंडिया आणि राष्ट्रीय ई-गव्हर्नन्स योजनेअंतर्गत चालवले जाते, ज्यामध्ये इयत्ता पहिलीपासून ते थेट पीएचडी स्तरापर्यंतच्या विद्यार्थ्यांचा समावेश होतो.",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'SC, ST, OBC, EWS, अल्पसंख्याक आणि गुणवत्ताधारक विद्यार्थी' },
        { label: 'शैक्षणिक स्तर', value: 'इयत्ता पहिली ते पीएचडी (मॅट्रिकपूर्व, मॅट्रिकोत्तर, उच्च व तांत्रिक शिक्षण)' },
        { label: 'निधी वितरण पद्धत', value: 'विद्यार्थ्यांच्या बँक खात्यात PFMS द्वारे थेट लाभ हस्तांतरण (DBT)' },
        { label: 'नोडल मंत्रालय', value: 'शिक्षण मंत्रालय, सामाजिक न्याय आणि अल्पसंख्याक कार्य मंत्रालय, भारत सरकार' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: 'फी प्रतिपूर्ती, मासिक निर्वाह भत्ता आणि एकल खिडकी सुविधा',
      keyBenefits: [
        {
          title: 'फी प्रतिपूर्ती (Fee Reimbursement)',
          text: 'योजना नियमांनुसार शिक्षण, प्रवेश व परीक्षा फी साहाय्य.'
        },
        {
          title: 'निर्वाह भत्ता / विद्यावेतन (Maintenance/Stipend)',
          text: 'मॅट्रिकपूर्व आणि मॅट्रिकोत्तर विद्यार्थ्यांसाठी PFMS द्वारे थेट मासिक किंवा वार्षिक भत्ता.'
        },
        {
          title: 'व्यापक व्याप्ती (Wide Coverage)',
          text: 'इयत्ता १०वी पर्यंत (मॅट्रिकपूर्व) आणि ११वी पासून कॉलेज व उच्च शिक्षणापर्यंत (मॅट्रिकोत्तर) SC, ST, OBC, EWS व अल्पसंख्याक विद्यार्थ्यांना संरक्षण.'
        },
        {
          title: 'एकल खिडकी (Single Window)',
          text: 'एकाच नोंदणीतून तुम्ही पात्र असणाऱ्या सर्व केंद्रीय व राज्य योजनांशी जोडले जाता.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'राष्ट्रीय शिष्यवृत्ती पोर्टलच्या योजनांसाठी आवश्यक असणाऱ्या अटी',
      eligibility: [
        { title: 'राष्ट्रीयत्व (Nationality)', text: 'केवळ भारतीय नागरिक.' },
        { title: 'शैक्षणिक स्तर (Academic Level)', text: 'इयत्ता पहिली ते पीएचडी स्तरावरील मान्यताप्राप्त शाळा, कॉलेज किंवा विद्यापीठातील विद्यार्थी अर्ज करू शकतात.' },
        { title: 'प्रवर्ग (Category)', text: 'SC / ST / OBC / EWS / अल्पसंख्याक समाज (विशिष्ट योजनेनुसार निकष लागू).' },
        { title: 'वन टाईम रजिस्ट्रेशन (OTR)', text: 'अर्जापूर्वी अनिवार्य युनिक आयडी (OTR ID), जो NSP वर विद्यार्थ्याच्या संपूर्ण शैक्षणिक प्रवासात वैध राहतो.' },
        { title: 'आधार जोडणी (Aadhaar Linkage)', text: 'DBT प्रक्रियेसाठी विद्यार्थ्याच्या स्वतःच्या बँक खात्याशी आधार लिंक असणे अनिवार्य आहे.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने अर्ज प्रक्रिया',
      sec4Sub: 'scholarships.gov.in वर पारदर्शक ४-टप्प्यांची ऑनलाइन प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'OTR नोंदणी', text: 'scholarships.gov.in वर आधार / FaceAuth द्वारे वन टाईम रजिस्ट्रेशन पूर्ण करा आणि OTR आयडी मिळवा.' },
        { step: 'टप्पा ०२', title: 'योजना निवड', text: 'OTR द्वारे लॉगिन करा, आपल्या प्रवर्गाच्या सर्व शिष्यवृत्तींची यादी तपासा आणि योग्य योजना निवडा.' },
        { step: 'टप्पा ०३', title: 'कागदपत्रे अपलोड', text: 'उत्पन्न, जात आणि शैक्षणिक गुणपत्रिका अपलोड करून संस्थेच्या पडताळणीसाठी ऑनलाइन सादर करा.' },
        { step: 'टप्पा ०४', title: 'पडताळणी व PFMS DBT', text: 'शाळा/कॉलेज (L1) आणि जिल्हा/राज्य (L2) पातळीवर पडताळणी; PFMS द्वारे निधी थेट बँक खात्यात जमा.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'महत्त्वाच्या तारखा व वेळापत्रक',
      sec5Sub: 'शैक्षणिक वर्ष २०२६–२७ अधिकृत वेळापत्रक',
      datesBadge: 'सक्रिय अर्ज कालावधी',
      datesHeading: 'शैक्षणिक वर्ष २०२६–२७ अर्ज',
      datesRange: 'पोर्टल सुरू: १ जून २०२६ | बहुतांश योजनांची मुदत: ३१ ऑक्टोबर २०२६',
      datesNote: 'काही मॅट्रिकपूर्व योजनांची मुदत लवकर — साधारण ३१ ऑगस्ट २०२६ पर्यंत संपू शकते. महत्त्वाची सूचना: ऑक्टोबरच्या गर्दीआधीच अर्ज पूर्ण करा — शेवटच्या दिवसांत पोर्टल संथ चालते आणि अर्जानंतर शाळा/कॉलेज व जिल्हा पातळीवर पडताळणी आवश्यक असते.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'प्रमाणित पोर्टल्स आणि अधिकृत शासकीय माहिती',
      sourcesNote: 'या पृष्ठावरील माहिती थेट भारत सरकारच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'राष्ट्रीय शिष्यवृत्ती पोर्टल — scholarships.gov.in', url: 'https://scholarships.gov.in' },
        { label: 'सामाजिक न्याय आणि अधिकारिता मंत्रालय, भारत सरकार', url: 'https://socialjustice.gov.in' },
        { label: 'शिक्षण मंत्रालय / अल्पसंख्याक कार्य मंत्रालय, भारत सरकार', url: 'https://www.education.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'अर्जापूर्वी स्कॅन करून तयार ठेवावयाची कागदपत्रे',
      requiredDocuments: [
        { title: 'आधार कार्ड (Aadhaar Card)', desc: 'अद्ययावत व सक्रिय आधार कार्ड' },
        { title: "विद्यार्थ्याच्या स्वतःच्या नावावरील आधार-लिंक बँक खाते", desc: 'PFMS DBT जमा होण्यासाठी आधार संलग्न खाते' },
        { title: 'उत्पन्न दाखला (Income Certificate)', desc: 'चालू आर्थिक वर्षाचा सक्षम महसूल अधिकाऱ्याने (तहसीलदार) दिलेला अधिकृत दाखला' },
        { title: 'जात/प्रवर्ग प्रमाणपत्र (लागू असल्यास)', desc: 'सक्षम राज्य प्राधिकाऱ्याने दिलेला दाखला' },
        { title: 'मागील वर्षाचे गुणपत्रक (Marksheet)', desc: 'मागील उत्तीर्ण परीक्षेचे गुणपत्रक' },
        { title: 'संस्थेद्वारे प्रमाणित प्रवेश/फी तपशील', desc: 'शैक्षणिक संस्थेकडून बोनाफाईड प्रमाणपत्र आणि फी पावती' }
      ],
      docsAlert: 'अर्ज फेटाळण्याची प्रमुख कारणे: आधार-बँक खात्यातील विसंगती, संस्थेकडून पडताळणी न होणे, किंवा उत्पन्न दाखला नसणे ही अर्ज फेटाळली जाण्याची टाळता येण्याजोगी प्रमुख कारणे आहेत.'
    }
  },
  s3: {
    en: {
      title: 'TFWS – Tuition Fee Waiver Scheme',
      dept: 'Directorate of Technical Education (DTE), Maharashtra',
      badge: '100% Tuition Fee Waiver',
      verifiedBadge: 'VERIFIED DTE MAHARASHTRA / AICTE SCHEME',
      dbtBadge: 'MERIT-BASED FEE WAIVER',
      refCode: 'Portal Ref: DTE-TFWS2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL COVERAGE',
      benefitsHighlight: '100% Tuition Fee Waiver (other fees like exam, bus, hostel deposit still payable by student)',
      applyOnline: 'Apply via CAP Round',
      autofillReady: 'Integrated CAP Seat Option',
      backToCategory: 'Back to Student Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Statutory fee waiver for technical education across government & unaided institutes',
      overview: "TFWS was introduced in 2007 by the Ministry of Human Resource Development (now Ministry of Education) to provide highly subsidised technical education to economically backward students, women, and physically challenged students. It applies to engineering, pharmacy, and other AICTE-approved technical courses across government, grant-in-aided, and unaided institutes in Maharashtra.",
      facts: [
        { label: 'Eligible Beneficiaries', value: 'Meritorious students (General, OBC, SC, ST, Women, PwD)' },
        { label: 'Covered Disciplines', value: 'AICTE-approved Degree & Diploma (Engineering, Pharmacy, Polytechnic)' },
        { label: 'Seat Structure', value: 'Dedicated 5% Supernumerary Seats over and above regular intake' },
        { label: 'Administering Authority', value: 'Directorate of Technical Education (DTE), Maharashtra' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Full tuition fee waiver, supernumerary quota and merit-based allocation',
      keyBenefits: [
        {
          title: 'Full Tuition Waiver',
          text: 'Complete waiver of tuition fee for the entire duration of the course (typically 4 years for engineering).'
        },
        {
          title: 'Supernumerary Seats',
          text: 'A dedicated 5% quota of total sanctioned seats (over and above regular intake) is set aside for TFWS candidates.'
        },
        {
          title: 'Merit-Based',
          text: 'Allocated strictly on merit rank through the CAP (Centralized Admission Process) round, not a separate application.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Conditions required to qualify for TFWS quota seats',
      eligibility: [
        { title: 'Domicile', text: 'Only Maharashtra State candidature candidates are eligible.' },
        { title: 'Income Limit', text: 'Family annual income from all sources must not exceed the prescribed limit (reported as ₹6 lakh in official AICTE handbook references, though some recent sources cite up to ₹8 lakh — confirm current limit on the DTE portal).' },
        { title: 'Category', text: 'Open to General, OBC, SC, ST and other categories alike — not category-restricted.' },
        { title: 'Course Continuity', text: 'No change of college or branch/course permitted once TFWS is availed; benefit is lost if the student fails a year.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Application Procedure',
      sec4Sub: 'Automatic consideration during DTE Maharashtra CAP admissions',
      applicationSteps: [
        { step: 'STAGE 01', title: 'Entrance Examination', text: 'Appear for MHT-CET / JEE Main / GPAT and obtain a valid State Merit Rank.' },
        { step: 'STAGE 02', title: 'CAP Option Form', text: 'During online CAP admission option form filling, opt "YES" for TFWS seat allocation.' },
        { step: 'STAGE 03', title: 'Document Verification', text: 'Physical or e-Scrutiny verification of valid Tahsildar income certificate and Maharashtra domicile.' },
        { step: 'STAGE 04', title: 'Merit Seat Allotment', text: 'Allocation of 5% supernumerary TFWS seat based strictly on merit rank with 100% tuition waiver.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Important Dates & Schedule',
      sec5Sub: 'Academic Year 2026–27 CAP schedule',
      datesBadge: 'ACTIVE ADMISSIONS WINDOW',
      datesHeading: 'Academic Year 2026–27 CAP Admissions',
      datesRange: 'Concurrent with DTE Maharashtra CAP Rounds (June – August 2026)',
      datesNote: 'Applied automatically during CAP (Centralized Admission Process) rounds each academic year — there is no separate TFWS application form. Income certificate must be submitted at the time of admission/document verification.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Official regulatory portals and handbooks',
      sourcesNote: 'The information presented on this page is compiled directly from authorized technical education portals:',
      sources: [
        { label: 'Directorate of Technical Education, Maharashtra (dte.maharashtra.gov.in)', url: 'https://dte.maharashtra.gov.in' },
        { label: 'AICTE Approval Process Handbook (aicte-india.org)', url: 'https://www.aicte.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Required documents checklist for CAP document verification',
      requiredDocuments: [
        { title: 'Income certificate', desc: 'From competent government authority only (Tahsildar) — ITR or Sarpanch letters not accepted' },
        { title: 'Domicile certificate (Maharashtra)', desc: 'Valid Maharashtra State Candidature Domicile Certificate' },
        { title: 'CAP round admission/allotment letter', desc: 'Official allotment letter indicating TFWS seat status' },
        { title: 'Caste certificate (if applicable, though not mandatory for eligibility)', desc: 'Valid community / category certificate from competent authority' },
        { title: 'Previous academic marksheets', desc: 'SSC (Class 10), HSC (Class 12) / Diploma passing marksheet and CET scorecard' }
      ],
      docsAlert: 'Important Notes: Only the tuition fee is waived — exam fees, development fees, hostel fees, etc. must still be paid. Failing an academic year revokes the benefit for subsequent years. Income must remain within the limit for the entire financial year in question, not just at application time.'
    },
    hi: {
      title: 'टीएफडब्ल्यूएस – शिक्षण शुल्क माफी योजना (TFWS)',
      dept: 'तकनीकी शिक्षा निदेशालय (DTE), महाराष्ट्र शासन',
      badge: '100% शिक्षण शुल्क छूट',
      verifiedBadge: 'सत्यापित डीटीई महाराष्ट्र / एआईसीटीई योजना',
      dbtBadge: 'मेरिट आधारित शुल्क माफी',
      refCode: 'पोर्टल संदर्भ: DTE-TFWS2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: '100% शिक्षण शुल्क माफी (अन्य शुल्क जैसे परीक्षा, बस, छात्रावास शुल्क छात्र द्वारा देय रहेगा)',
      applyOnline: 'कैप (CAP) राउंड द्वारा आवेदन करें',
      autofillReady: 'कैप सीट विकल्प एकीकृत',
      backToCategory: 'छात्र योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'सरकारी व गैर-अनुदानित संस्थानों में तकनीकी शिक्षा हेतु वैधानिक शुल्क माफी',
      overview: "TFWS की शुरुआत 2007 में मानव संसाधन विकास मंत्रालय (अब शिक्षा मंत्रालय) द्वारा आर्थिक रूप से कमजोर छात्रों, महिलाओं और दिव्यांग विद्यार्थियों को अत्यधिक रियायती तकनीकी शिक्षा प्रदान करने के लिए की गई थी। यह महाराष्ट्र के सरकारी, अनुदानित और गैर-अनुदानित संस्थानों में इंजीनियरिंग, फार्मेसी और अन्य AICTE-अनुमोदित तकनीकी पाठ्यक्रमों पर लागू होती है।",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'आर्थिक रूप से कमजोर मेधावी छात्र (सामान्य, ओबीसी, एससी, एसटी, महिला व दिव्यांग)' },
        { label: 'पाठ्यक्रम दायरा', value: 'AICTE अनुमोदित डिग्री व डिप्लोमा तकनीकी पाठ्यक्रम (इंजीनियरिंग, फार्मेसी, पॉलिटेक्निक)' },
        { label: 'सीट संरचना', value: 'नियमित स्वीकृत सीटों के अतिरिक्त 5% सुपरन्यूमरेरी (Supernumerary) कोटा सीटें' },
        { label: 'प्रशासनिक संस्था', value: 'तकनीकी शिक्षा निदेशालय (DTE), महाराष्ट्र शासन' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: '100% शिक्षण शुल्क माफी, सुपरन्यूमरेरी कोटा एवं मेरिट आधारित आवंटन',
      keyBenefits: [
        {
          title: 'पूर्ण शिक्षण शुल्क छूट (Full Tuition Waiver)',
          text: 'पाठ्यक्रम की संपूर्ण अवधि (आमतौर पर इंजीनियरिंग के 4 वर्ष) के लिए अनिवार्य शिक्षण शुल्क की 100% माफी।'
        },
        {
          title: 'सुपरन्यूमरेरी सीटें (Supernumerary Seats)',
          text: 'कुल स्वीकृत सीटों के अतिरिक्त 5% समर्पित कोटा TFWS उम्मीदवारों के लिए निर्धारित किया गया है।'
        },
        {
          title: 'मेरिट आधारित आवंटन (Merit-Based)',
          text: 'बिना किसी अलग आवेदन के, विशुद्ध रूप से CAP (केंद्रीकृत प्रवेश प्रक्रिया) राउंड मेरिट रैंक द्वारा आवंटन।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'TFWS कोटा सीटों हेतु आवश्यक योग्यता शर्तें',
      eligibility: [
        { title: 'अधिवास (Domicile)', text: 'केवल महाराष्ट्र राज्य की उम्मीदवारी (Maharashtra State Candidature) वाले छात्र ही पात्र हैं।' },
        { title: 'आय सीमा (Income Limit)', text: 'सभी स्रोतों से परिवार की वार्षिक आय निर्धारित सीमा से अधिक नहीं होनी चाहिए (AICTE हैंडबुक में ₹6 लाख का उल्लेख है, जबकि कुछ स्रोतों में ₹8 लाख तक — DTE पोर्टल पर वर्तमान सीमा सत्यापित करें)।' },
        { title: 'आरक्षण श्रेणी (Category)', text: 'सामान्य, OBC, SC, ST और अन्य सभी वर्गों के लिए समान रूप से खुला — कोई जातिगत प्रतिबंध नहीं।' },
        { title: 'पाठ्यक्रम निरंतरता (Course Continuity)', text: 'TFWS सीट मिलने के बाद कॉलेज या ब्रांच/कोर्स बदलने की अनुमति नहीं है; छात्र के अनुत्तीर्ण (fail) होने पर लाभ समाप्त हो जाता है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध आवेदन प्रक्रिया',
      sec4Sub: 'DTE महाराष्ट्र CAP प्रवेश प्रक्रिया के दौरान स्वचालित विचार',
      applicationSteps: [
        { step: 'चरण 01', title: 'प्रवेश परीक्षा', text: 'MHT-CET / JEE Main / GPAT परीक्षा दें और वैध राज्य मेरिट रैंक प्राप्त करें।' },
        { step: 'चरण 02', title: 'CAP विकल्प फॉर्म', text: 'ऑनलाइन CAP फॉर्म भरते समय TFWS सीट आवंटन हेतु "YES" का चयन करें।' },
        { step: 'चरण 03', title: 'दस्तावेज़ सत्यापन', text: 'सुविधा केंद्र (FC) पर तहसीलदार द्वारा जारी आय एवं महाराष्ट्र अधिवास प्रमाण पत्र का सत्यापन करवाएं।' },
        { step: 'चरण 04', title: 'मेरिट सीट आवंटन', text: 'मेरिट रैंक अनुसार 100% शिक्षण शुल्क छूट के साथ 5% सुपरन्यूमरेरी सीट पर सीधा प्रवेश आवंटन।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'महत्वपूर्ण तिथियां एवं समय-सारणी',
      sec5Sub: 'शैक्षणिक वर्ष 2026–27 CAP प्रवेश समय-सारणी',
      datesBadge: 'सक्रिय प्रवेश समय-सारणी',
      datesHeading: 'शैक्षणिक वर्ष 2026–27 CAP प्रवेश',
      datesRange: 'DTE महाराष्ट्र CAP राउंड के साथ समवर्ती (जून – अगस्त 2026)',
      datesNote: 'प्रत्येक शैक्षणिक वर्ष CAP (केंद्रीकृत प्रवेश प्रक्रिया) राउंड के दौरान स्वचालित रूप से लागू — कोई अलग TFWS आवेदन फॉर्म नहीं होता। प्रवेश/दस्तावेज़ सत्यापन के समय आय प्रमाण पत्र प्रस्तुत करना अनिवार्य है।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'सत्यापित पोर्टल एवं विनियामक हैंडबुक',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे अधिकृत तकनीकी शिक्षा पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'तकनीकी शिक्षा निदेशालय, महाराष्ट्र (dte.maharashtra.gov.in)', url: 'https://dte.maharashtra.gov.in' },
        { label: 'एआईसीटीई अनुमोदन प्रक्रिया हैंडबुक (aicte-india.org)', url: 'https://www.aicte.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'दस्तावेज़ सत्यापन हेतु आवश्यक प्रमाण पत्रों की चेकलिस्ट',
      requiredDocuments: [
        { title: 'आय प्रमाण पत्र (Income Certificate)', desc: 'केवल सक्षम सरकारी प्राधिकारी (तहसीलदार) द्वारा जारी — ITR या सरपंच का पत्र स्वीकार्य नहीं' },
        { title: 'अधिवास प्रमाण पत्र (महाराष्ट्र डोमिसिल)', desc: 'वैध महाराष्ट्र राज्य उम्मीदवारी अधिवास (Domicile) प्रमाण पत्र' },
        { title: 'CAP राउंड प्रवेश/आवंटन पत्र (Allotment Letter)', desc: 'TFWS सीट की पुष्टि करने वाला आधिकारिक आवंटन पत्र' },
        { title: 'जाति प्रमाण पत्र (यदि लागू हो, हालांकि पात्रता हेतु अनिवार्य नहीं)', desc: 'सक्षम प्राधिकारी द्वारा जारी वैध प्रमाण पत्र' },
        { title: 'पिछली शैक्षणिक अंकतालिकाएं (Marksheets)', desc: '10वीं, 12वीं / डिप्लोमा और CET परीक्षा की मूल अंकतालिका' }
      ],
      docsAlert: 'महत्वपूर्ण निर्देश: केवल शिक्षण शुल्क माफ होता है — परीक्षा शुल्क, विकास शुल्क, छात्रावास शुल्क आदि का भुगतान छात्र को स्वयं करना होगा। वर्ष में अनुत्तीर्ण होने पर अगले वर्षों के लिए लाभ समाप्त हो जाता है। आय केवल आवेदन के समय ही नहीं, बल्कि संपूर्ण वित्तीय वर्ष के दौरान निर्धारित सीमा के भीतर रहनी चाहिए।'
    },
    mr: {
      title: 'टीएफडब्ल्यूएस – शिक्षण शुल्क माफी योजना (TFWS)',
      dept: 'तंत्रशिक्षण संचालनालय (DTE), महाराष्ट्र शासन',
      badge: '१००% शिक्षण फी माफी',
      verifiedBadge: 'प्रमाणित डीटीई महाराष्ट्र / एआयसीटीई योजना',
      dbtBadge: 'गुणवत्ता आधारित फी माफी',
      refCode: 'पोर्टल संदर्भ: DTE-TFWS2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक साहाय्य',
      benefitsHighlight: '१००% शिक्षण फी माफी (परीक्षा, बस, वसतिगृह ठेव यांसारखे इतर शुल्क विद्यार्थ्याने भरणे आवश्यक)',
      applyOnline: 'कॅप (CAP) फेरीद्वारे अर्ज करा',
      autofillReady: 'कॅप जागा पर्याय एकात्मिक',
      backToCategory: 'विद्यार्थी योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'शासकीय व विनाअनुदानित संस्थांमध्ये तांत्रिक शिक्षणासाठी वैधानिक फी सवलत',
      overview: "TFWS योजना २००७ मध्ये मनुष्यबळ विकास मंत्रालयाने (आता शिक्षण मंत्रालय) आर्थिकदृष्ट्या दुर्बल घटकातील विद्यार्थी, महिला आणि दिव्यांग विद्यार्थ्यांना अत्यंत सवलतीच्या दरात तांत्रिक शिक्षण मिळावे म्हणून सुरू केली. ही योजना महाराष्ट्रातील शासकीय, अनुदानित आणि विनाअनुदानित संस्थांमधील अभियांत्रिकी, औषधनिर्माणशास्त्र (फार्मसी) आणि इतर AICTE-मान्यताप्राप्त तांत्रिक अभ्यासक्रमांसाठी लागू आहे.",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'आर्थिकदृष्ट्या दुर्बल गुणवत्ताधारक विद्यार्थी (खुला प्रवर्ग, ओबीसी, एससी, एसटी, महिला व दिव्यांग)' },
        { label: 'अभ्यासक्रम व्याप्ती', value: 'AICTE मान्यताप्राप्त पदवी व पदविका तांत्रिक अभ्यासक्रम (अभियांत्रिकी, फार्मसी, पॉलिटेक्निक)' },
        { label: 'जागांची रचना', value: 'मंजूर प्रवेश क्षमतेव्यतिरिक्त ५% विशेष सुपरन्यूमरेरी (Supernumerary) जागा' },
        { label: 'प्रशासकीय यंत्रणा', value: 'तंत्रशिक्षण संचालनालय (DTE), महाराष्ट्र शासन' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: '१००% शिक्षण फी माफी, सुपरन्यूमरेरी कोटा आणि गुणवत्ता आधारित वाटप',
      keyBenefits: [
        {
          title: 'पूर्ण शिक्षण फी माफी (Full Tuition Waiver)',
          text: 'संपूर्ण अभ्यासक्रम कालावधीसाठी (उदा. अभियांत्रिकीच्या ४ वर्षांसाठी) अनिवार्य शिक्षण शुल्काची १००% पूर्ण माफी.'
        },
        {
          title: 'सुपरन्यूमरेरी जागा (Supernumerary Seats)',
          text: 'एकूण मंजूर प्रवेश क्षमतेव्यतिरिक्त ५% राखीव अतिरिक्त जागा TFWS उमेदवारांसाठी उपलब्ध.'
        },
        {
          title: 'गुणवत्तेवर आधारित (Merit-Based)',
          text: 'कोणत्याही वेगळ्या अर्जाशिवाय केवळ केंद्रीभूत प्रवेश प्रक्रियेतील (CAP) गुणवत्ता क्रमांकावर आधारित थेट जागा वाटप.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'TFWS कोट्यातील जागांसाठी आवश्यक असणाऱ्या अटी',
      eligibility: [
        { title: 'अधिवास (Domicile)', text: 'केवळ महाराष्ट्र राज्य उमेदवारी (Maharashtra State Candidature) असलेले विद्यार्थीच पात्र.' },
        { title: 'उत्पन्न मर्यादा (Income Limit)', text: 'सर्व मार्गांनी मिळणारे कौटुंबिक वार्षिक उत्पन्न विहित मर्यादेपेक्षा जास्त नसावे (AICTE नियमावलीत ₹६ लाखांचा उल्लेख आहे, तर काही स्रोतांमध्ये ₹८ लाखांपर्यंत मर्यादा नमूद आहे — चालू मर्यादा DTE पोर्टलवर तपासा).' },
        { title: 'प्रवर्ग (Category)', text: 'खुला प्रवर्ग, OBC, SC, ST आणि इतर सर्व प्रवर्गांसाठी समान संधी — कोणतीही प्रवर्ग मर्यादा नाही.' },
        { title: 'अभ्यासक्रमात सलगता (Course Continuity)', text: 'TFWS जागा मिळाल्यानंतर कॉलेज किंवा शाखा/अभ्यासक्रम बदलण्यास परवानगी नाही; विद्यार्थी अनुत्तीर्ण (fail) झाल्यास हा लाभ कायमचा रद्द होतो.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने अर्ज प्रक्रिया',
      sec4Sub: 'DTE महाराष्ट्र CAP प्रवेश प्रक्रियेदरम्यान आपोआप समावेश',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'प्रवेश परीक्षा', text: 'MHT-CET / JEE Main / GPAT परीक्षा देऊन राज्य गुणवत्ता क्रमांक (Merit Rank) मिळवा.' },
        { step: 'टप्पा ०२', title: 'CAP पर्याय फॉर्म', text: 'ऑनलाइन CAP पर्याय भरताना TFWS जागेसाठी "YES" हा पर्याय निवडा.' },
        { step: 'टप्पा ०३', title: 'कागदपत्र पडताळणी', text: 'सुविधा केंद्रावर (FC) तहसीलदारांचा अधिकृत उत्पन्न दाखला व महाराष्ट्र अधिवास दाखल्याची पडताळणी.' },
        { step: 'टप्पा ०४', title: 'गुणवत्ता जागा वाटप', text: 'गुणवत्ता क्रमांकानुसार १००% शिक्षण फी माफीसह ५% अतिरिक्त जागेवर थेट प्रवेश वाटप.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'महत्त्वाच्या तारखा व वेळापत्रक',
      sec5Sub: 'शैक्षणिक वर्ष २०२६–२७ CAP प्रवेश वेळापत्रक',
      datesBadge: 'सक्रिय प्रवेश वेळापत्रक',
      datesHeading: 'शैक्षणिक वर्ष २०२६–२७ CAP प्रवेश',
      datesRange: 'DTE महाराष्ट्र CAP फेऱ्यांनुसार (जून – ऑगस्ट २०२६)',
      datesNote: 'दर शैक्षणिक वर्षात CAP (केंद्रीभूत प्रवेश प्रक्रिया) फेऱ्यांदरम्यान ही योजना आपोआप लागू होते — यासाठी कोणताही स्वतंत्र TFWS अर्ज नसतो. प्रवेश व कागदपत्र पडताळणीच्या वेळी अधिकृत उत्पन्न प्रमाणपत्र सादर करणे अनिवार्य आहे.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'प्रमाणित पोर्टल्स आणि अधिकृत शासकीय माहिती',
      sourcesNote: 'या पृष्ठावरील माहिती थेट अधिकृत तांत्रिक शिक्षण पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'तंत्रशिक्षण संचालनालय, महाराष्ट्र (dte.maharashtra.gov.in)', url: 'https://dte.maharashtra.gov.in' },
        { label: 'एआयसीटीई मान्यता प्रक्रिया नियमावली (aicte-india.org)', url: 'https://www.aicte.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'कागदपत्र पडताळणीसाठी आवश्यक प्रमाणपत्रांची यादी',
      requiredDocuments: [
        { title: 'उत्पन्न प्रमाणपत्र (Income Certificate)', desc: 'केवळ सक्षम शासकीय प्राधिकाऱ्याने (तहसीलदार) दिलेले — ITR किंवा सरपंचांचे पत्र ग्राह्य धरले जात नाही' },
        { title: 'अधिवास दाखला (महाराष्ट्र डोमिसिल)', desc: 'महाराष्ट्र राज्य उमेदवारी अधिवास (Domicile) प्रमाणपत्र' },
        { title: 'CAP वाटप पत्र (Allotment Letter)', desc: 'TFWS अंतर्गत मिळालेल्या जागेचा उल्लेख असणारे अधिकृत वाटप पत्र' },
        { title: 'जात प्रमाणपत्र (लागू असल्यास, पात्रतेसाठी बंधनकारक नाही)', desc: 'सक्षम अधिकाऱ्याने दिलेले अधिकृत जात प्रमाणपत्र' },
        { title: 'मागील शैक्षणिक गुणपत्रिका (Marksheets)', desc: '१०वी, १२वी / पदविका आणि CET गुणपत्रिका' }
      ],
      docsAlert: 'महत्त्वाच्या अटी: केवळ शिक्षण शुल्क माफ केले जाते — परीक्षा फी, विकास शुल्क, वसतिगृह शुल्क इत्यादी विद्यार्थ्याला भरावेच लागते. कोणत्याही वर्षात अनुत्तीर्ण झाल्यास पुढील वर्षांसाठी हा लाभ रद्द होतो. उत्पन्न केवळ अर्जाच्या वेळीच नव्हे, तर संपूर्ण आर्थिक वर्षात विहित मर्यादेत असणे आवश्यक आहे.'
    }
  },
  f1: {
    en: {
      title: 'Pradhan Mantri Kisan Samman Nidhi Yojana (PM-KISAN)',
      dept: 'Ministry of Agriculture & Farmers Welfare, Government of India',
      badge: 'Direct Income Support',
      verifiedBadge: 'VERIFIED GOVERNMENT OF INDIA SCHEME',
      dbtBadge: 'DIRECT BENEFIT TRANSFER (DBT)',
      refCode: 'Portal Ref: PMK-GOI2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Direct Bank Transfer (DBT) — ₹6,000/year (₹2,000 × 3 installments, every 4 months)',
      applyOnline: 'Apply Online (pmkisan.gov.in)',
      autofillReady: 'Live Autofill Ready',
      backToCategory: 'Back to Farmers Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Flagship Central Sector income-support scheme for Indian farming families',
      overview: "Launched on 24 February 2019 by PM Narendra Modi in Gorakhpur, Uttar Pradesh (with retrospective effect from 1 December 2018), PM-KISAN is the Centre's flagship Central Sector income-support scheme for farmers. It's the world's largest agricultural DBT programme by beneficiary count, reaching approximately 9–11 crore farmer families each installment cycle, and forms the base scheme on which Maharashtra's own Namo Shetkari Mahasanman Nidhi Yojana is built as a top-up.",
      facts: [
        { label: 'Eligible Beneficiaries', value: 'Small & Marginal Landholding Farmer Families' },
        { label: 'Financial Entitlement', value: '₹6,000 per year in 3 equal installments of ₹2,000' },
        { label: 'Payment Mechanism', value: 'Direct Bank Transfer (DBT) via Aadhaar-linked Bank Account' },
        { label: 'Nodal Authority', value: 'Ministry of Agriculture & Farmers Welfare, GoI' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Direct income support, full transparency and nationwide reach',
      keyBenefits: [
        {
          title: 'Direct Income Support',
          text: 'Eligible farming families receive ₹6,000 a year, credited directly into their bank accounts in three equal installments of ₹2,000 each — roughly every four months.'
        },
        {
          title: 'No Middlemen, Full DBT',
          text: "Funds move straight from the Union Government to the farmer's Aadhaar-linked bank account, cutting delays and leakage."
        },
        {
          title: 'Nationwide Reach',
          text: "Available to eligible small and marginal farmer families across all states and UTs, layered on top by several state top-up schemes (e.g., Maharashtra's NSMNY)."
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Statutory qualification rules and land-record ownership requirements',
      eligibility: [
        { title: 'Citizenship', text: 'Must be an Indian citizen.' },
        { title: 'Landholding', text: 'Small and marginal farmer families owning cultivable agricultural land, as per land records with the respective state/UT; a "family" includes husband, wife, and minor children who jointly own the land.' },
        { title: 'Aadhaar-Bank Linkage', text: 'Bank account must be active, valid, and Aadhaar-linked for DBT processing.' },
        { title: 'Land Records', text: "Must be updated, verified, and correctly reflect the applicant's ownership." },
        { title: 'e-KYC', text: 'Must be completed; incomplete e-KYC can hold up installment disbursal.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Application Procedure',
      sec4Sub: 'Simple online submission on pmkisan.gov.in or CSC assistance',
      applicationSteps: [
        { step: 'STAGE 01', title: 'Portal Access', text: 'Visit pmkisan.gov.in → Click "New Farmer Registration" and select Rural or Urban category.' },
        { step: 'STAGE 02', title: 'Aadhaar & OTP', text: 'Enter Aadhaar number, active mobile number, and select Maharashtra state for OTP verification.' },
        { step: 'STAGE 03', title: 'Land & Bank Details', text: 'Fill personal, bank, and land details, and upload verified land ownership documents (7/12 extract).' },
        { step: 'STAGE 04', title: 'e-KYC & Verification', text: 'State/District scrutinizes records; approved farmers receive ₹2,000 installments direct into bank.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Important Dates & Disbursal Schedule',
      sec5Sub: 'Four-month installment cycles and latest payment status',
      datesBadge: 'ACTIVE 4-MONTH INSTALLMENT CYCLE',
      datesHeading: 'PM-KISAN Disbursal Schedule',
      datesRange: 'Cycle 1: April–July | Cycle 2: August–November | Cycle 3: December–March',
      datesNote: 'Installments follow a fixed four-month cycle. As of the most recent cycle, the 23rd installment has been disbursed, with the 24th expected around October 2026 — exact dates are announced closer to release, so check the official portal.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Official PM-KISAN web portal and ministerial oversight',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of India portals:',
      sources: [
        { label: 'PM-KISAN Official Portal — pmkisan.gov.in', url: 'https://pmkisan.gov.in' },
        { label: 'Ministry of Agriculture & Farmers Welfare, Govt of India', url: 'https://agriwelfare.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Keep these scanned documents ready before registration',
      requiredDocuments: [
        { title: 'Aadhaar card (linked to bank account)', desc: 'Valid Aadhaar seeded with bank account and active mobile link' },
        { title: 'Land ownership records', desc: 'Updated 7/12 extract, 8A Khata, or Land Possession Certificate' },
        { title: 'Bank passbook (active account)', desc: 'Active savings account seeded with Aadhaar in NPCI mapper' },
        { title: 'Registered mobile number', desc: 'For OTP verification and installment disbursal SMS alerts' }
      ],
      docsAlert: "Common Issues: Most rejections or held-back installments happen due to Aadhaar name-spelling mismatches, outdated/incorrect land ownership records, incomplete e-KYC, or pending land-record verification — check 'Know Your Status' on the portal before each cycle. (Excluded: Institutional landholders, constitutional post holders, serving/retired govt employees, income-tax payers, and registered professionals)."
    },
    hi: {
      title: 'प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN)',
      dept: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
      badge: 'प्रत्यक्ष आय सहायता',
      verifiedBadge: 'सत्यापित भारत सरकार योजना',
      dbtBadge: 'प्रत्यक्ष लाभ अंतरण (DBT)',
      refCode: 'पोर्टल संदर्भ: PMK-GOI2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'प्रत्यक्ष बैंक अंतरण (DBT) — ₹6,000/वर्ष (प्रत्येक 4 माह में ₹2,000 × 3 किस्तें)',
      applyOnline: 'ऑनलाइन आवेदन करें (pmkisan.gov.in)',
      autofillReady: 'लाइव ऑटोफिल उपलब्ध',
      backToCategory: 'किसान योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'भारतीय कृषक परिवारों हेतु केंद्र सरकार की प्रमुख प्रत्यक्ष आय सहायता योजना',
      overview: "24 फरवरी 2019 को गोरखपुर, उत्तर प्रदेश में प्रधानमंत्री नरेंद्र मोदी द्वारा प्रारंभ (1 दिसंबर 2018 से भूतलक्षी प्रभाव सहित), PM-KISAN किसानों के लिए केंद्र सरकार की प्रमुख केंद्रीय क्षेत्र आय-सहायता योजना है। यह लाभार्थी संख्या के आधार पर विश्व का सबसे बड़ा कृषि डीबीटी कार्यक्रम है, जो प्रत्येक किस्त चक्र में लगभग 9-11 करोड़ किसान परिवारों तक पहुंचता है। इसी मूल योजना के आधार पर महाराष्ट्र की अपनी 'नमो शेतकरी महासन्मान निधि योजना' को टॉप-अप के रूप में तैयार किया गया है।",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'कृषि योग्य भूमि वाले छोटे एवं सीमांत किसान परिवार' },
        { label: 'वित्तीय सहायता', value: '₹6,000 प्रति वर्ष (₹2,000 की 3 समान किस्तों में)' },
        { label: 'भुगतान का माध्यम', value: 'आधार से जुड़े बैंक खाते में प्रत्यक्ष लाभ अंतरण (DBT)' },
        { label: 'नोडल मंत्रालय', value: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'सीधी आय सहायता, बिचौलिया-मुक्त डीबीटी एवं देशव्यापी विस्तार',
      keyBenefits: [
        {
          title: 'प्रत्यक्ष आय सहायता (Direct Income Support)',
          text: 'पात्र किसान परिवारों को प्रति वर्ष ₹6,000 सीधे उनके बैंक खातों में ₹2,000 की तीन समान किस्तों में (प्रत्येक चार माह में) प्रदान किए जाते हैं।'
        },
        {
          title: 'कोई बिचौलिया नहीं, पूर्ण डीबीटी',
          text: 'धनराशि सीधे केंद्र सरकार से किसान के आधार-लिंक बैंक खाते में अंतरित होती है, जिससे किसी भी प्रकार के विलंब व रिसाव की गुंजाइश नहीं रहती।'
        },
        {
          title: 'राष्ट्रव्यापी विस्तार (Nationwide Reach)',
          text: 'सभी राज्यों और केंद्र शासित प्रदेशों के छोटे एवं सीमांत किसानों के लिए उपलब्ध, जिस पर कई राज्यों ने अपनी टॉप-अप योजनाएं (जैसे महाराष्ट्र की NSMNY) जोड़ी हैं।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'कृषि भूमि स्वामित्व एवं योग्यता की वैधानिक शर्तें',
      eligibility: [
        { title: 'नागरिकता (Citizenship)', text: 'आवेदक का भारतीय नागरिक होना अनिवार्य है।' },
        { title: 'भूमि स्वामित्व (Landholding)', text: 'संबंधित राज्य/केंद्र शासित प्रदेश के भूमि अभिलेखों के अनुसार कृषि योग्य भूमि का स्वामी होना चाहिए; "परिवार" में पति, पत्नी और नाबालिग बच्चे शामिल हैं।' },
        { title: 'आधार-बैंक लिंकेज', text: 'डीबीटी राशि प्राप्त करने के लिए बैंक खाता सक्रिय, वैध और आधार से लिंक होना अनिवार्य है।' },
        { title: 'भूमि रिकॉर्ड (Land Records)', text: 'राज्य के भू-अभिलेखों (7/12 व खाता) में आवेदक का नाम अद्यतन और सत्यापित होना चाहिए।' },
        { title: 'ई-केवाईसी (e-KYC)', text: 'e-KYC पूर्ण होना अनिवार्य है; अधूरी ई-केवाईसी किस्त के वितरण को रोक सकती है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध आवेदन प्रक्रिया',
      sec4Sub: 'pmkisan.gov.in पर अथवा सीएससी (CSC) द्वारा सरल ऑनलाइन प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'पोर्टल एक्सेस', text: 'pmkisan.gov.in पर जाएं → "New Farmer Registration" पर क्लिक करें और ग्रामीण/शहरी किसान चुनें।' },
        { step: 'चरण 02', title: 'आधार व ओटीपी सत्यापन', text: 'आधार नंबर, सक्रिय मोबाइल नंबर दर्ज करें और ओटीपी सत्यापन पूरा करें।' },
        { step: 'चरण 03', title: 'व्यक्तिगत व भूमि विवरण', text: 'व्यक्तिगत, बैंक व भूमि (7/12 व खतौनी) विवरण भरें तथा भूमि दस्तावेज अपलोड करके सबमिट करें।' },
        { step: 'चरण 04', title: 'सत्यापन एवं डीबीटी भुगतान', text: 'राज्य व जिला स्तर पर भूमि अभिलेखों का सत्यापन; स्वीकृत किसानों को सीधे खाते में ₹2,000 किस्त प्राप्त होती है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'महत्वपूर्ण तिथियां एवं वितरण चक्र',
      sec5Sub: 'चार माह का किस्त चक्र एवं नवीनतम स्थिति',
      datesBadge: 'सक्रिय 4-मासिक किस्त चक्र',
      datesHeading: 'पीएम-किसान किस्त वितरण समय-सारणी',
      datesRange: 'चक्र 1: अप्रैल–जुलाई | चक्र 2: अगस्त–नवंबर | चक्र 3: दिसंबर–मार्च',
      datesNote: 'किस्तें एक निश्चित चार महीने के चक्र का पालन करती हैं। सबसे हालिया चक्र के अनुसार, 23वीं किस्त वितरित की जा चुकी है, और 24वीं किस्त अक्टूबर 2026 के आसपास संभावित है — सटीक तिथियों की पुष्टि आधिकारिक पोर्टल से करें।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'सत्यापित पोर्टल एवं मंत्रालय की वेबसाइट',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे भारत सरकार के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'पीएम-किसान आधिकारिक पोर्टल — pmkisan.gov.in', url: 'https://pmkisan.gov.in' },
        { label: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार', url: 'https://agriwelfare.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'पंजीकरण से पूर्व स्कैन करके तैयार रखने हेतु दस्तावेज़',
      requiredDocuments: [
        { title: 'आधार कार्ड (बैंक खाते से लिंक)', desc: 'सक्रिय व मोबाइल नंबर से लिंक आधार कार्ड' },
        { title: 'भूमि स्वामित्व अभिलेख (Land Records)', desc: 'अद्यतन 7/12 प्रति, 8A खतौनी अथवा भूमि स्वामित्व प्रमाण पत्र' },
        { title: 'बैंक पासबुक (सक्रिय खाता)', desc: 'NPCI मैपर में आधार से लिंक सक्रिय बैंक बचत खाता' },
        { title: 'पंजीकृत मोबाइल नंबर', desc: 'ओटीपी सत्यापन और किस्त क्रेडिट एसएमएस अलर्ट हेतु' }
      ],
      docsAlert: "अस्वीकृति के सामान्य कारण: आधार नाम की वर्तनी में विसंगति, पुराने/गलत भूमि रिकॉर्ड, अधूरी e-KYC या लंबित भूमि सत्यापन के कारण अधिकांश किस्तें रुकती हैं — प्रत्येक चक्र से पहले पोर्टल पर 'Know Your Status' जांचें। (अपवर्जन: संस्थागत भू-स्वामी, संवैधानिक पदों पर रहे व्यक्ति, सरकारी कर्मचारी, आयकर दाता व पेशेवर डॉक्टर/वकील बाहर हैं)।"
    },
    mr: {
      title: 'प्रधानमंत्री किसान सन्मान निधी योजना (PM-KISAN)',
      dept: 'कृषी व शेतकरी कल्याण मंत्रालय, भारत सरकार',
      badge: 'थेट उत्पन्न साहाय्य',
      verifiedBadge: 'प्रमाणित भारत सरकार योजना',
      dbtBadge: 'थेट लाभ हस्तांतरण (DBT)',
      refCode: 'पोर्टल संदर्भ: PMK-GOI2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक साहाय्य',
      benefitsHighlight: 'थेट बँक हस्तांतरण (DBT) — वार्षिक ₹६,००० (दर ४ महिन्यांनी ₹२,००० × ३ हप्ते)',
      applyOnline: 'ऑनलाइन अर्ज करा (pmkisan.gov.in)',
      autofillReady: 'थेट ऑटोफिल उपलब्ध',
      backToCategory: 'शेतकरी योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'भारतीय शेतकरी कुटुंबांसाठी केंद्र शासनाची मुख्य थेट उत्पन्न साहाय्य योजना',
      overview: "२४ फेब्रुवारी २०१९ रोजी गोरखपूर, उत्तर प्रदेश येथे पंतप्रधान नरेंद्र मोदी यांच्या हस्ते सुरू झालेली (१ डिसेंबर २०१८ पासून पूर्वलक्षी प्रभावासह), PM-KISAN ही केंद्र शासनाची शेतकऱ्यांसाठीची प्रमुख केंद्रीय क्षेत्र उत्पन्न साहाय्य योजना आहे. लाभार्थी संख्येनुसार हा जगातील सर्वात मोठा कृषी DBT उपक्रम आहे, जो दर हप्ता चक्रात सुमारे ९ ते ११ कोटी शेतकरी कुटुंबांपर्यंत पोहोचतो. याच मूळ योजनेवर महाराष्ट्राची 'नमो शेतकरी महासन्मान निधी योजना' टॉप-अप स्वरूपात तयार करण्यात आली आहे.",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'लागवडयोग्य शेतजमीन असलेली अल्प व अत्यल्प भूधारक शेतकरी कुटुंबे' },
        { label: 'आर्थिक लाभ', value: 'वार्षिक ₹६,००० (₹२,००० च्या ३ समान हप्त्यांमध्ये)' },
        { label: 'निधी वितरण पद्धत', value: 'आधार संलग्न बँक खात्यात थेट लाभ हस्तांतरण (DBT)' },
        { label: 'नोडल मंत्रालय', value: 'कृषी व शेतकरी कल्याण मंत्रालय, भारत सरकार' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: 'थेट उत्पन्न साहाय्य, मध्यस्थमुक्त डीबीटी आणि देशव्यापी व्याप्ती',
      keyBenefits: [
        {
          title: 'थेट उत्पन्न साहाय्य (Direct Income Support)',
          text: 'पात्र शेतकरी कुटुंबांना प्रति वर्ष ₹६,००० थेट त्यांच्या बँक खात्यात ₹२,००० च्या तीन समान हप्त्यांमध्ये (साधारण दर चार महिन्यांनी) दिले जातात.'
        },
        {
          title: 'कोणताही मध्यस्थ नाही, पूर्ण डीबीटी',
          text: 'निधी थेट केंद्र शासनाकडून शेतकऱ्याच्या आधार-संलग्न बँक खात्यात वर्ग केला जातो, ज्यामुळे कोणताही विलंब किंवा गळती होत नाही.'
        },
        {
          title: 'देशव्यापी व्याप्ती (Nationwide Reach)',
          text: 'सर्व राज्ये आणि केंद्रशासित प्रदेशांमधील अल्प व अत्यल्प भूधारक शेतकऱ्यांसाठी उपलब्ध, ज्यावर राज्य शासनांनी आपल्या टॉप-अप योजना (उदा. महाराष्ट्राची NSMNY) लागू केल्या आहेत.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'जमीन मालकी व पात्रतेच्या वैधानिक अटी',
      eligibility: [
        { title: 'नागरिकत्व (Citizenship)', text: 'अर्जदार भारतीय नागरिक असणे आवश्यक आहे.' },
        { title: 'जमीन धारणा (Landholding)', text: 'संबंधित राज्य/केंद्रशासित प्रदेशाच्या भू-अभिलेखानुसार स्वतःच्या नावावर लागवडयोग्य शेतजमीन असावी; "कुटुंब" यामध्ये पती, पत्नी आणि अल्पवयीन मुलांचा समावेश होतो.' },
        { title: 'आधार-बँक जोडणी', text: 'डीबीटी लाभासाठी बँक खाते सक्रिय, वैध आणि आधारशी लिंक असणे अनिवार्य आहे.' },
        { title: 'जमीन अभिलेख (Land Records)', text: '७/१२ उतारा व ८-अ मधील नाव अद्ययावत आणि पडताळणीकृत असावे.' },
        { title: 'ई-केवायसी (e-KYC)', text: 'e-KYC पूर्ण असणे बंधनकारक आहे; अपूर्ण ई-केवायसीमुळे हप्ता थांबवला जाऊ शकतो.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने अर्ज प्रक्रिया',
      sec4Sub: 'pmkisan.gov.in वर किंवा सीएससी (CSC) केंद्राद्वारे सोपी ऑनलाइन प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'पोर्टल भेट', text: 'pmkisan.gov.in वर जा → "New Farmer Registration" वर क्लिक करून ग्रामीण किंवा नागरी शेतकरी निवडा.' },
        { step: 'टप्पा ०२', title: 'आधार व ओटीपी', text: 'आधार क्रमांक आणि सक्रिय मोबाईल नंबर टाकून ओटीपी पडताळणी पूर्ण करा.' },
        { step: 'टप्पा ०३', title: 'जमीन व बँक तपशील', text: 'वैयक्तिक, बँक आणि जमिनीचा ७/१२ तपशील भरा आणि आवश्यक कागदपत्रे अपलोड करा.' },
        { step: 'टप्पा ०४', title: 'पडताळणी व डीबीटी', text: 'जिल्हा व राज्य पातळीवर जमीन नोंदींची पडताळणी; मंजूर शेतकऱ्यांना थेट खात्यात ₹२,००० हप्ता जमा होतो.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'महत्त्वाच्या तारखा व वितरण वेळापत्रक',
      sec5Sub: 'चार महिन्यांचे हप्ता चक्र व सद्यस्थिती',
      datesBadge: 'सक्रिय ४-महिन्यांचे हप्ता चक्र',
      datesHeading: 'पीएम-किसान हप्ता वेळापत्रक',
      datesRange: 'हप्ता १: एप्रिल–जुलै | हप्ता २: ऑगस्ट–नोव्हेंबर | हप्ता ३: डिसेंबर–मार्च',
      datesNote: 'हप्ते एका ठराविक चार महिन्यांच्या चक्रानुसार वितरित केले जातात. सर्वात अलीकडील चक्रानुसार, २३ वा हप्ता वितरित करण्यात आला आहे, आणि २४ वा हप्ता ऑक्टोबर २०२६ च्या सुमारास अपेक्षित आहे — अधिकृत पोर्टलवर तारीख तपासा.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'प्रमाणित पोर्टल व मंत्रालयाची अधिकृत माहिती',
      sourcesNote: 'या पृष्ठावरील माहिती थेट भारत सरकारच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'पीएम-किसान अधिकृत पोर्टल — pmkisan.gov.in', url: 'https://pmkisan.gov.in' },
        { label: 'कृषी व शेतकरी कल्याण मंत्रालय, भारत सरकार', url: 'https://agriwelfare.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'नोंदणीपूर्वी स्कॅन करून ठेवावयाची कागदपत्रे',
      requiredDocuments: [
        { title: 'आधार कार्ड (बँक खात्याशी संलग्न)', desc: 'सक्रिय मोबाईल क्रमांकाशी संलग्न असलेले आधार कार्ड' },
        { title: 'जमीन मालकी अभिलेख (Land Records)', desc: 'अद्ययावत ७/१२ उतारा, ८-अ खाते नोंद किंवा जमीन धारणा प्रमाणपत्र' },
        { title: 'बँक पासबुक (सक्रिय खाते)', desc: 'NPCI मॅपरमध्ये आधारशी जोडलेले सक्रिय बँक बचत खाते' },
        { title: 'नोंदणीकृत मोबाईल क्रमांक', desc: 'ओटीपी पडताळणी आणि हप्ता जमा झाल्याचे एसएमएस मिळण्यासाठी' }
      ],
      docsAlert: "अपात्रतेचे निकष व सूचना: संस्थात्मक जमीनधारक, घटनात्मक पदे भूषवणारे, शासकीय कर्मचारी, आयकर भरणारे आणि व्यावसायिक (डॉक्टर, वकील) या योजनेतून वगळण्यात आले आहेत. आधार नावातील चुका किंवा प्रलंबित e-KYC मुळे हप्ता अडकू नये म्हणून पोर्टलवर 'Know Your Status' वेळोवेळी तपासा."
    }
  },
  f2: {
    en: {
      title: 'Namo Shetkari Mahasanman Nidhi Yojana (NSMNY)',
      dept: 'Department of Agriculture, Government of Maharashtra',
      badge: 'Maharashtra Special Top-Up',
      verifiedBadge: 'VERIFIED MAHARASHTRA STATE SCHEME',
      dbtBadge: 'DIRECT BENEFIT TRANSFER (DBT)',
      refCode: 'Portal Ref: NSMNY-MH2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Direct Bank Transfer (DBT) — ₹6,000/year (₹2,000 × 3 installments), on top of PM-KISAN = ₹12,000/year combined',
      applyOnline: 'Check Status Online (nsmny.mahait.org)',
      autofillReady: 'Auto-Matched via PM-KISAN',
      backToCategory: 'Back to Farmers Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Maharashtra Government top-up income-support scheme riding on PM-KISAN',
      overview: "Launched by the Maharashtra government via Government Resolution dated 15 June 2023, and formally launched by the PM on 26 October 2023, NSMNY is Maharashtra's own top-up income-support scheme for farmers. It rides on top of the central Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) scheme — using the same beneficiary database, Aadhaar-linked bank accounts, and eligibility filters — so the state doesn't need a separate verification process. It's run by the Department of Agriculture through the Commissionerate of Agriculture, Pune.",
      facts: [
        { label: 'Eligible Beneficiaries', value: 'Maharashtra PM-KISAN verified farmer beneficiaries' },
        { label: 'State Top-Up Amount', value: '₹6,000/year (disbursed in 3 installments of ₹2,000 each)' },
        { label: 'Total Combined Support', value: '₹12,000/year (₹6,000 PM-KISAN + ₹6,000 NSMNY)' },
        { label: 'Administering Body', value: 'Commissionerate of Agriculture, Pune, Maharashtra' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Direct cash support, combined benefits and zero separate application',
      keyBenefits: [
        {
          title: 'Direct Cash Support',
          text: 'Eligible farmer families receive ₹6,000 per year, disbursed in three equal installments of ₹2,000 each directly into Aadhaar-linked bank accounts.'
        },
        {
          title: 'Combined with PM-KISAN',
          text: 'Farmers who are also PM-KISAN beneficiaries receive an additional ₹6,000/year from the Centre, taking total support to ₹12,000/year.'
        },
        {
          title: 'No Separate Application',
          text: "If you're already a live PM-KISAN beneficiary in Maharashtra, you're automatically eligible — no fresh registration needed."
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Conditions required to qualify for Maharashtra NSMNY top-up',
      eligibility: [
        { title: 'Domicile', text: 'Resident of Maharashtra with agriculture land suitable for cultivation in their name.' },
        { title: 'PM-KISAN Status', text: 'Must already be an eligible/registered beneficiary of the Pradhan Mantri Kisan Samman Nidhi Yojana.' },
        { title: 'Aadhaar-Linked Bank Account', text: 'Mandatory; the benefit is credited only into Aadhaar-seeded active bank accounts.' },
        { title: 'Exclusions', text: 'Institutional landholders, serving/retired government employees above lowest grades, income-tax payers in previous assessment year, and professionals (doctors, engineers, lawyers) are excluded, per PM-KISAN criteria.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Application Procedure',
      sec4Sub: 'Automatic enrollment flow based on PM-KISAN database',
      applicationSteps: [
        { step: 'STAGE 01', title: 'PM-KISAN Approval', text: 'Farmer is active and verified as an eligible beneficiary on the central PM-KISAN portal.' },
        { step: 'STAGE 02', title: 'Data Synchronization', text: 'Department of Agriculture, Maharashtra pulls verified landholding farmer list from PM-KISAN.' },
        { step: 'STAGE 03', title: 'Aadhaar & PFMS Verification', text: 'State Treasury verifies Aadhaar linkage and active NPCI mapper status for direct crediting.' },
        { step: 'STAGE 04', title: 'Direct State DBT', text: '₹2,000 installment is credited directly into bank account alongside each PM-KISAN installment cycle.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Important Dates & Disbursal Rhythm',
      sec5Sub: 'Three-cycle annual rhythm synchronized with central disbursements',
      datesBadge: 'AUTOMATIC 3-CYCLE TOP-UP',
      datesHeading: 'Academic & Financial Year 2026–27 Schedule',
      datesRange: 'Three cycles annually (roughly every four months, aligned with PM-KISAN)',
      datesNote: 'No separate application form — enrollment happens automatically through the PM-KISAN beneficiary list. Installments follow the same three-cycle rhythm as PM-KISAN (roughly every four months). Since the scheme piggybacks on PM-KISAN data, any correction needed is done via the PM-KISAN registration/portal, not a separate NSMNY form.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Government of Maharashtra agriculture portals',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of Maharashtra portals:',
      sources: [
        { label: 'NSMNY Official Portal — nsmny.mahait.org', url: 'https://nsmny.mahait.org' },
        { label: 'Department of Agriculture, Government of Maharashtra', url: 'https://krishi.maharashtra.gov.in' },
        { label: 'MyScheme.gov.in Official Overview', url: 'https://www.myscheme.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Credentials verified automatically through PM-KISAN repository',
      requiredDocuments: [
        { title: 'PM-KISAN registration number', desc: 'Active PM-KISAN beneficiary registration ID' },
        { title: 'Aadhaar card (linked to bank account)', desc: 'Aadhaar number seeded in bank account and NPCI mapper' },
        { title: 'Registered mobile number', desc: 'Mobile number linked with PM-KISAN for DBT credit SMS updates' }
      ],
      docsAlert: "Important Notes: Any amount credited to an ineligible beneficiary is recovered as per PM-KISAN's Standard Operating Procedure. The benefit amount has remained ₹6,000/year since the scheme began — always verify against official government resolutions on the NSMNY portal if you see a different figure quoted elsewhere."
    },
    hi: {
      title: 'नमो शेतकरी महासन्मान निधि योजना (NSMNY)',
      dept: 'कृषि विभाग, महाराष्ट्र शासन',
      badge: 'महाराष्ट्र विशेष टॉप-अप',
      verifiedBadge: 'सत्यापित महाराष्ट्र शासन योजना',
      dbtBadge: 'प्रत्यक्ष लाभ अंतरण (DBT)',
      refCode: 'पोर्टल संदर्भ: NSMNY-MH2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'प्रत्यक्ष बैंक अंतरण (DBT) — ₹6,000/वर्ष (₹2,000 × 3 किस्तें), पीएम-किसान के ऊपर = कुल ₹12,000/वर्ष',
      applyOnline: 'स्थिति ऑनलाइन जांचें (nsmny.mahait.org)',
      autofillReady: 'पीएम-किसान द्वारा स्वचालित मिलान',
      backToCategory: 'किसान योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'पीएम-किसान योजना के ऊपर महाराष्ट्र शासन की अतिरिक्त आय सहायता योजना',
      overview: "15 जून 2023 के शासन निर्णय (GR) द्वारा घोषित तथा 26 अक्टूबर 2023 को प्रधानमंत्री द्वारा औपचारिक रूप से प्रारंभ, NSMNY किसानों के लिए महाराष्ट्र की अपनी टॉप-अप आय-सहायता योजना है। यह केंद्र सरकार की 'प्रधानमंत्री किसान सम्मान निधि' (PM-KISAN) योजना के आधार पर संचालित होती है — उसी लाभार्थी डेटाबेस, आधार-लिंक बैंक खातों और पात्रता फिल्टरों का उपयोग करते हुए — ताकि राज्य को अलग सत्यापन प्रक्रिया की आवश्यकता न पड़े। यह योजना कृषि आयुक्तालय, पुणे के माध्यम से कृषि विभाग द्वारा संचालित की जाती है।",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'महाराष्ट्र के पीएम-किसान सत्यापित पात्र किसान' },
        { label: 'राज्य टॉप-अप राशि', value: '₹6,000/वर्ष (₹2,000 की 3 समान किस्तों में)' },
        { label: 'कुल वार्षिक सहायता', value: '₹12,000/वर्ष (₹6,000 केंद्र + ₹6,000 महाराष्ट्र राज्य)' },
        { label: 'प्रशासनिक संस्था', value: 'कृषि आयुक्तालय, पुणे, महाराष्ट्र शासन' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'प्रत्यक्ष नकद सहायता, संयुक्त लाभ एवं अलग आवेदन की आवश्यकता नहीं',
      keyBenefits: [
        {
          title: 'प्रत्यक्ष नकद सहायता (Direct Cash Support)',
          text: 'पात्र किसान परिवारों को प्रति वर्ष ₹6,000 सीधे उनके बैंक खाते में ₹2,000 की तीन समान किस्तों में डीबीटी द्वारा प्रदान किए जाते हैं।'
        },
        {
          title: 'पीएम-किसान के साथ संयुक्त (Combined with PM-KISAN)',
          text: 'जो किसान पीएम-किसान के लाभार्थी हैं, उन्हें केंद्र से ₹6,000 तथा राज्य से ₹6,000 मिलकर कुल ₹12,000 प्रति वर्ष की सहायता मिलती है।'
        },
        {
          title: 'अलग आवेदन की आवश्यकता नहीं (No Separate Application)',
          text: 'यदि आप पहले से ही महाराष्ट्र में पीएम-किसान के सक्रिय लाभार्थी हैं, तो आप स्वतः पात्र हैं — किसी नए पंजीकरण की आवश्यकता नहीं है।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'महाराष्ट्र नमो शेतकरी योजना हेतु आवश्यक योग्यता शर्तें',
      eligibility: [
        { title: 'अधिवास (Domicile)', text: 'महाराष्ट्र राज्य का निवासी होना चाहिए तथा अपने नाम पर कृषि योग्य भूमि होनी चाहिए।' },
        { title: 'पीएम-किसान लाभार्थी स्थिति', text: 'प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN) का पूर्व-पंजीकृत व सत्यापित लाभार्थी होना अनिवार्य है।' },
        { title: 'आधार लिंक बैंक खाता', text: 'अनिवार्य; लाभ की राशि केवल आधार-सीडेड बैंक खाते में ही जमा की जाती है।' },
        { title: 'अपवर्जन (Exclusions)', text: 'संस्थागत भू-धारक, सरकारी कर्मचारी, पिछले वर्ष के आयकर दाता तथा पंजीकृत पेशेवर (डॉक्टर, इंजीनियर, वकील) पीएम-किसान के मानकों अनुसार बाहर हैं।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध आवेदन प्रक्रिया',
      sec4Sub: 'पीएम-किसान डेटाबेस के आधार पर स्वचालित प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'पीएम-किसान स्वीकृति', text: 'किसान केंद्रीय पीएम-किसान पोर्टल पर सत्यापित व सक्रिय लाभार्थी के रूप में दर्ज होता है।' },
        { step: 'चरण 02', title: 'डेटा का मिलान', text: 'महाराष्ट्र कृषि विभाग पीएम-किसान पोर्टल से पात्र किसानों की सूची स्वतः प्राप्त करता है।' },
        { step: 'चरण 03', title: 'आधार व पीएफएमएस सत्यापन', text: 'डीबीटी भुगतान हेतु बैंक खाते का आधार लिंकेज और एनपीसीआई मैपर सत्यापन किया जाता है।' },
        { step: 'चरण 04', title: 'राज्य डीबीटी अंतरण', text: 'प्रत्येक पीएम-किसान किस्त चक्र के साथ ₹2,000 की राज्य किस्त सीधे किसान के खाते में जमा होती है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'महत्वपूर्ण तिथियां एवं वितरण चक्र',
      sec5Sub: 'केंद्रीय किस्तों के साथ समकालिक 3-किस्त वार्षिक चक्र',
      datesBadge: 'स्वचालित 3-किस्त टॉप-अप',
      datesHeading: 'वित्तीय वर्ष 2026–27 समय-सारणी',
      datesRange: 'प्रति वर्ष तीन चक्र (लगभग प्रत्येक 4 माह में, पीएम-किसान के साथ)',
      datesNote: 'कोई अलग आवेदन फॉर्म नहीं है — नामांकन पीएम-किसान लाभार्थी सूची के माध्यम से स्वचालित होता है। किस्तें पीएम-किसान के समान तीन-चक्र लय (लगभग हर चार महीने) का पालन करती हैं। यदि किसी सुधार की आवश्यकता है तो वह पीएम-किसान पोर्टल पर किया जाता है, किसी अलग NSMNY फॉर्म से नहीं।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'महाराष्ट्र शासन के आधिकारिक कृषि पोर्टल',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे महाराष्ट्र शासन के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'नमो शेतकरी आधिकारिक पोर्टल — nsmny.mahait.org', url: 'https://nsmny.mahait.org' },
        { label: 'कृषि विभाग, महाराष्ट्र शासन', url: 'https://krishi.maharashtra.gov.in' },
        { label: 'MyScheme.gov.in आधिकारिक अवलोकन', url: 'https://www.myscheme.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'पीएम-किसान प्रणाली द्वारा स्वतः सत्यापित प्रमाण पत्र',
      requiredDocuments: [
        { title: 'पीएम-किसान पंजीकरण संख्या', desc: 'सक्रिय पीएम-किसान लाभार्थी आईडी' },
        { title: 'आधार कार्ड (बैंक खाते से लिंक)', desc: 'बैंक खाते और एनपीसीआई मैपर में लिंक आधार नंबर' },
        { title: 'पंजीकृत मोबाइल नंबर', desc: 'डीबीटी किस्त क्रेडिट के एसएमएस अलर्ट हेतु' }
      ],
      docsAlert: "महत्वपूर्ण निर्देश: किसी भी अपात्र लाभार्थी के खाते में राशि जाने पर पीएम-किसान की मानक संचालन प्रक्रिया (SOP) के तहत वसूली की जाती है। योजना प्रारंभ से ही लाभ राशि ₹6,000/वर्ष है — किसी अन्य आंकड़े को देखने पर हमेशा NSMNY पोर्टल पर आधिकारिक शासन निर्णयों (GR) से पुष्टि करें।"
    },
    mr: {
      title: 'नमो शेतकरी महासन्मान निधी योजना (NSMNY)',
      dept: 'कृषी विभाग, महाराष्ट्र शासन',
      badge: 'महाराष्ट्र विशेष टॉप-अप',
      verifiedBadge: 'प्रमाणित महाराष्ट्र शासन योजना',
      dbtBadge: 'थेट लाभ हस्तांतरण (DBT)',
      refCode: 'पोर्टल संदर्भ: NSMNY-MH2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक साहाय्य',
      benefitsHighlight: 'थेट बँक हस्तांतरण (DBT) — वार्षिक ₹६,००० (₹२,००० × ३ हप्ते), पीएम-किसान व्यतिरिक्त = एकूण ₹१२,०००/वर्ष',
      applyOnline: 'स्थिती ऑनलाइन तपासा (nsmny.mahait.org)',
      autofillReady: 'पीएम-किसान द्वारे थेट जोडणी',
      backToCategory: 'शेतकरी योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'पीएम-किसान योजनेवर आधारित महाराष्ट्र शासनाची अतिरिक्त उत्पन्न साहाय्य योजना',
      overview: "महाराष्ट्र शासनाने १५ जून २०२३ च्या शासन निर्णयान्वये (GR) जाहीर केलेली आणि २६ ऑक्टोबर २०२३ रोजी पंतप्रधानांच्या हस्ते अधिकृतपणे सुरू झालेली NSMNY ही महाराष्ट्रातील शेतकऱ्यांसाठीची स्वतःची टॉप-अप उत्पन्न साहाय्य योजना आहे. ही योजना केंद्र शासनाच्या 'प्रधानमंत्री किसान सन्मान निधी' (PM-KISAN) योजनेच्या डेटाबेसवर चालते — तोच लाभार्थी डेटा, आधार-संलग्न बँक खाती आणि पात्रता निकष वापरून — ज्यामुळे राज्याला स्वतंत्र पडताळणी प्रक्रियेची गरज पडत नाही. ही योजना कृषी आयुक्तालय, पुणे यांच्यामार्फत कृषी विभागाद्वारे राबवली जाते.",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'महाराष्ट्रातील पीएम-किसान पडताळणीकृत शेतकरी' },
        { label: 'राज्य टॉप-अप रक्कम', value: 'वार्षिक ₹६,००० (₹२,००० च्या ३ समान हप्त्यांमध्ये)' },
        { label: 'एकूण वार्षिक साहाय्य', value: 'वार्षिक ₹१२,००० (₹६,००० केंद्र + ₹६,००० महाराष्ट्र राज्य)' },
        { label: 'प्रशासकीय यंत्रणा', value: 'कृषी आयुक्तालय, पुणे, महाराष्ट्र शासन' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: 'थेट रोख साहाय्य, एकत्रित लाभ आणि वेगळ्या अर्जाची गरज नाही',
      keyBenefits: [
        {
          title: 'थेट रोख साहाय्य (Direct Cash Support)',
          text: 'पात्र शेतकरी कुटुंबांना प्रति वर्ष ₹६,००० थेट त्यांच्या आधार-संलग्न बँक खात्यात ₹२,००० च्या तीन समान हप्त्यांमध्ये वर्ग केले जातात.'
        },
        {
          title: 'पीएम-किसानसह एकत्रित लाभ',
          text: 'जे शेतकरी पीएम-किसानचे लाभार्थी आहेत त्यांना केंद्राचे ₹६,००० आणि राज्याचे ₹६,००० मिळून एकूण ₹१२,००० वार्षिक साहाय्य मिळते.'
        },
        {
          title: 'स्वतंत्र अर्जाची आवश्यकता नाही',
          text: 'तुम्ही महाराष्ट्रात आधीच पीएम-किसानचे सक्रिय लाभार्थी असाल, तर तुम्ही आपोआप पात्र ठरता — नवीन नोंदणीची गरज नाही.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'महाराष्ट्र नमो शेतकरी महासन्मान निधीसाठी आवश्यक अटी',
      eligibility: [
        { title: 'अधिवास (Domicile)', text: 'महाराष्ट्र राज्याचा रहिवासी असावा आणि स्वतःच्या नावावर लागवडयोग्य शेतजमीन असावी.' },
        { title: 'पीएम-किसान लाभार्थी स्थिती', text: 'प्रधानमंत्री किसान सन्मान निधी योजनेचा (PM-KISAN) आधीच पात्र/नोंदणीकृत लाभार्थी असणे अनिवार्य.' },
        { title: 'आधार-संलग्न बँक खाते', text: 'बंधनकारक; लाभाची रक्कम केवळ आधार-सीडेड बँक खात्यातच जमा होते.' },
        { title: 'अपात्रतेचे निकष (Exclusions)', text: 'संस्थात्मक जमीनधारक, शासकीय कर्मचारी, आयकर भरणारे आणि व्यावसायिक (डॉक्टर, इंजिनिअर, वकील) पीएम-किसान नियमांनुसार वगळलेले आहेत.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने अर्ज प्रक्रिया',
      sec4Sub: 'पीएम-किसान डेटाबेसवर आधारित स्वयंचलित प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'पीएम-किसान मंजुरी', text: 'शेतकरी केंद्रीय पीएम-किसान पोर्टलवर पात्र लाभार्थी म्हणून सक्रिय असतो.' },
        { step: 'टप्पा ०२', title: 'डेटा एकत्रीकरण', text: 'महाराष्ट्र कृषी विभाग पीएम-किसान पोर्टलवरून पात्र शेतकऱ्यांची यादी थेट घेतो.' },
        { step: 'टप्पा ०३', title: 'आधार व पीएफएमएस पडताळणी', text: 'डीबीटी वितरणासाठी बँक खात्याची आधार संलग्नता आणि NPCI मॅपर पडताळणी होते.' },
        { step: 'टप्पा ०४', title: 'थेट राज्य डीबीटी', text: 'प्रत्येक पीएम-किसान हप्त्यासोबत राज्याचा ₹२,००० चा हप्ता थेट खात्यात जमा होतो.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'महत्त्वाच्या तारखा व वितरण वेळापत्रक',
      sec5Sub: 'केंद्रीय हप्त्यांशी सुसंगत ३-हप्ता वार्षिक चक्र',
      datesBadge: 'स्वयंचलित ३-हप्ता टॉप-अप',
      datesHeading: 'आर्थिक वर्ष २०२६–२७ वेळापत्रक',
      datesRange: 'वार्षिक तीन चक्रे (साधारण दर चार महिन्यांनी, पीएम-किसानसोबत)',
      datesNote: 'कोणताही वेगळा अर्ज भरण्याची गरज नाही — पीएम-किसान लाभार्थी यादीवरून थेट निवड होते. हप्ते पीएम-किसानच्या तीन-चक्रानुसारच वितरित होतात. कोणत्याही दुरुस्तीसाठी पीएम-किसान पोर्टलवरच दुरुस्ती करावी लागते, वेगळा NSMNY अर्ज नसतो.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'महाराष्ट्र शासनाची अधिकृत कृषी संकेतस्थळे',
      sourcesNote: 'या पृष्ठावरील माहिती थेट महाराष्ट्र शासनाच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'नमो शेतकरी अधिकृत पोर्टल — nsmny.mahait.org', url: 'https://nsmny.mahait.org' },
        { label: 'कृषी विभाग, महाराष्ट्र शासन', url: 'https://krishi.maharashtra.gov.in' },
        { label: 'MyScheme.gov.in अधिकृत माहिती', url: 'https://www.myscheme.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'पीएम-किसान प्रणालीद्वारे आपोआप पडताळली जाणारी कागदपत्रे',
      requiredDocuments: [
        { title: 'पीएम-किसान नोंदणी क्रमांक', desc: 'सक्रिय पीएम-किसान लाभार्थी ओळख क्रमांक' },
        { title: 'आधार कार्ड (बँकेशी संलग्न)', desc: 'बँक खाते व NPCI मॅपरमध्ये जोडलेला आधार क्रमांक' },
        { title: 'नोंदणीकृत मोबाईल क्रमांक', desc: 'डीबीटी हप्ता जमा झाल्याचे एसएमएस संदेश मिळण्यासाठी' }
      ],
      docsAlert: "महत्त्वाची सूचना: कोणत्याही अपात्र व्यक्तीच्या खात्यात रक्कम जमा झाल्यास पीएम-किसानच्या कार्यपद्धतीनुसार (SOP) वसुली केली जाते. योजना सुरू झाल्यापासून लाभाची रक्कम ₹६,०००/वर्ष इतकीच आहे — इतर आकडे दिसल्यास नेहमी NSMNY पोर्टलवरील अधिकृत शासन निर्णयांची (GR) खात्री करा."
    }
  },
  f3: {
    en: {
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      dept: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
      badge: 'Comprehensive Crop Insurance',
      verifiedBadge: 'VERIFIED GOVERNMENT OF INDIA SCHEME',
      dbtBadge: 'TECHNOLOGY-DRIVEN CLAIMS (DBT)',
      refCode: 'Portal Ref: PMFBY-GOI2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Crop Insurance — Sum Insured payout on crop loss, with farmer premium capped at just 1.5%–5% of Sum Insured',
      applyOnline: 'Apply Online (pmfby.gov.in)',
      autofillReady: 'Direct Portal Sync Ready',
      backToCategory: 'Back to Farmers Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: "India's flagship crop insurance scheme providing comprehensive financial cushion against crop failure",
      overview: "Launched in April 2016, PMFBY is India's flagship crop insurance scheme, replacing older unworkable insurance models. It provides financial support to farmers in the event of crop loss or damage from unforeseen events, aiming to stabilize farm income, encourage modern farming practices, and ensure continued credit flow to agriculture. Recently extended through the 2025–26 season with a larger budget and structural reforms effective from Kharif 2026.",
      facts: [
        { label: 'Eligible Beneficiaries', value: 'Loanee, Non-Loanee, Tenant Farmers & Sharecroppers' },
        { label: 'Farmer Premium Cap', value: '2% Kharif food grains/oilseeds, 1.5% Rabi, 5% Commercial/Horticulture' },
        { label: 'Claim Assessment', value: 'Satellite imagery, remote sensing & Crop Cutting Experiments (CCE)' },
        { label: 'Nodal Authority', value: 'Ministry of Agriculture & Farmers Welfare, GoI' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Low premium rate, end-to-end risk cover, and government subsidy',
      keyBenefits: [
        {
          title: 'Low Premium, High Coverage',
          text: 'Farmers pay only a maximum premium rate of 2% for kharif food grain and oilseed crops, 1.5% for rabi crops, and up to 5% for annual commercial or horticulture crops — the rest is government-subsidized.'
        },
        {
          title: 'End-to-End Risk Coverage',
          text: 'Covers crop losses from pre-sowing risks, standing crop losses due to natural calamities, localized calamities, and post-harvest losses caused by events such as cyclones and unseasonal rainfall.'
        },
        {
          title: 'Government Subsidy Support',
          text: 'The remaining premium is shared by the Central and State Governments in a 50:50 ratio, with a 90:10 subsidy ratio for North-Eastern and Himalayan States.'
        },
        {
          title: 'Technology-Driven Claims',
          text: 'Uses satellite imagery, drone monitoring and mobile apps for faster, more transparent claim assessment and direct settlement.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Farmer categories and notified crop conditions',
      eligibility: [
        { title: 'Farmer Type', text: 'Open to loanee farmers, non-loanee farmers, tenant farmers and sharecroppers, subject to prescribed eligibility conditions and submission of valid land or cultivation documents.' },
        { title: 'Loanee Farmers', text: 'Farmers availing seasonal crop loans or active Kisan Credit Card (KCC)-linked loans are covered automatically, with premiums deducted by banks from the loan amount.' },
        { title: 'Non-Loanee Farmers', text: 'Can voluntarily enroll; roughly half of all enrolled farmers historically fall in this category.' },
        { title: 'Notified Crops/Areas', text: 'Must be cultivating notified crops in notified areas as per state government declarations for that season.' },
        { title: 'Aadhaar Mandatory', text: 'Required for enrollment since Kharif 2017.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Application Procedure',
      sec4Sub: 'Seasonal enrollment through pmfby.gov.in, banks, or Common Service Centres (CSC)',
      applicationSteps: [
        { step: 'STAGE 01', title: 'Notification Check', text: 'Verify that your crop and revenue circle are notified by the state government for the current season.' },
        { step: 'STAGE 02', title: 'Application Entry', text: 'Loanee farmers are auto-enrolled by banks; non-loanee farmers register on pmfby.gov.in or at nearest CSC.' },
        { step: 'STAGE 03', title: 'Document & Premium', text: 'Upload 7/12 land extract, sowing certificate, Aadhaar, and pay the nominal subsidized farmer share (1.5%–2%).' },
        { step: 'STAGE 04', title: 'CCE & Claim Payout', text: 'In the event of crop loss, survey/CCE loss is assessed and claim payout is credited directly via DBT.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Important Dates & Seasonal Timelines',
      sec5Sub: 'Separate enrollment cut-off deadlines for Kharif and Rabi seasons',
      datesBadge: 'SEASONAL ENROLLMENT WINDOW',
      datesHeading: 'Kharif & Rabi Season Schedule',
      datesRange: 'Kharif: ~June – July | Rabi: ~November – December',
      datesNote: 'Enrollment windows are announced separately for each season: Kharif season typically opens ~June–July, and Rabi season typically opens ~November–December. Loanee farmers are auto-enrolled unless they submit an opt-out declaration to their bank before the cutoff date. Non-loanee farmers must apply online via the PMFBY portal or through their bank/CSC before the season deadline.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Official PMFBY national portal and ministerial documentation',
      sourcesNote: 'The information presented on this page is compiled directly from authorized crop insurance portals:',
      sources: [
        { label: 'PMFBY Official Portal — pmfby.gov.in', url: 'https://pmfby.gov.in' },
        { label: 'Ministry of Agriculture & Farmers Welfare, Govt of India', url: 'https://agriwelfare.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Required documents checklist to upload before season deadline',
      requiredDocuments: [
        { title: 'Passport-size photograph of the insured farmer', desc: 'Recent clear photograph of the farmer' },
        { title: 'Identity proof', desc: 'Aadhaar / PAN / Voter ID / Bank Passbook with photo / Kisan Photo Book / NREGA Job Card' },
        { title: 'Address proof', desc: 'Aadhaar / PAN / Voter ID / Electricity Bill / Bank Passbook' },
        { title: 'Land ownership records or tenancy agreement', desc: 'State Record of Rights (7/12), Land Possession Certificate, or tenancy/cultivation agreement' },
        { title: 'Declaration of crop sown / intended to be sown', desc: 'Self-declaration or Talathi/Agriculture Assistant sowing certificate' },
        { title: 'Bank account details (Aadhaar-linked)', desc: 'Active bank passbook copy for Direct Benefit Transfer of insurance claims' }
      ],
      docsAlert: 'Important Notice: Ensure bank account is active and seeded with Aadhaar. In case of localized calamities (hailstorm, landslide, inundation), intimations must be reported within 72 hours via the Crop Insurance App or toll-free number for prompt survey.'
    },
    hi: {
      title: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
      dept: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
      badge: 'व्यापक फसल बीमा',
      verifiedBadge: 'सत्यापित भारत सरकार योजना',
      dbtBadge: 'प्रौद्योगिकी आधारित दावा निपटान (DBT)',
      refCode: 'पोर्टल संदर्भ: PMFBY-GOI2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'फसल बीमा — फसल हानि पर बीमित राशि का भुगतान, किसान का प्रीमियम केवल 1.5%–5% तक सीमित',
      applyOnline: 'ऑनलाइन आवेदन करें (pmfby.gov.in)',
      autofillReady: 'पोर्टल सिंक उपलब्ध',
      backToCategory: 'किसान योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'अप्रत्याशित आपदाओं से फसल नुकसान के विरुद्ध सुरक्षा प्रदान करने वाली भारत की प्रमुख फसल बीमा योजना',
      overview: "अप्रैल 2016 में प्रारंभ, PMFBY भारत की प्रमुख फसल बीमा योजना है, जिसने पुराने अव्यवहारिक बीमा मॉडलों का स्थान लिया। यह अप्रत्याशित घटनाओं से फसल हानि या क्षति होने पर किसानों को वित्तीय सहायता प्रदान करती है, जिसका उद्देश्य कृषि आय को स्थिर करना, आधुनिक कृषि पद्धतियों को प्रोत्साहित करना और कृषि क्षेत्र में निरंतर ऋण प्रवाह सुनिश्चित करना है। हाल ही में खरीफ 2026 से प्रभावी संरचनात्मक सुधारों और बढ़े हुए बजट के साथ इसे 2025-26 तक विस्तारित किया गया है।",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'ऋणी, गैर-ऋणी, बटाईदार व काश्तकार किसान' },
        { label: 'किसान प्रीमियम दर', value: 'खरीफ खाद्यान्न/तिलहन 2%, रबी 1.5%, वाणिज्यिक/बागवानी अधिकतम 5%' },
        { label: 'दावा मूल्यांकन', value: 'उपग्रह इमेजरी, रिमोट सेंसिंग और फसल कटाई प्रयोग (CCE)' },
        { label: 'नोडल मंत्रालय', value: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'कम प्रीमियम, व्यापक जोखिम सुरक्षा एवं सरकारी सब्सिडी सहायता',
      keyBenefits: [
        {
          title: 'कम प्रीमियम, व्यापक सुरक्षा',
          text: 'किसान खरीफ खाद्यान्न व तिलहन के लिए अधिकतम 2%, रबी फसलों के लिए 1.5% और वार्षिक वाणिज्यिक/बागवानी फसलों के लिए अधिकतम 5% प्रीमियम देते हैं — शेष प्रीमियम सरकार द्वारा सब्सिडीकृत होता है।'
        },
        {
          title: 'संपूर्ण जोखिम सुरक्षा (End-to-End Risk)',
          text: 'बुवाई पूर्व जोखिमों, प्राकृतिक आपदाओं से खड़ी फसलों के नुकसान, स्थानीयकृत आपदाओं और चक्रवात व बेमौसम बारिश से कटाई उपरांत होने वाले नुकसान को कवर करती है।'
        },
        {
          title: 'सरकारी सब्सिडी सहायता',
          text: 'शेष प्रीमियम केंद्र और राज्य सरकारों द्वारा 50:50 के अनुपात में (पूर्वोत्तर व हिमालयी राज्यों के लिए 90:10 के अनुपात में) वहन किया जाता है।'
        },
        {
          title: 'प्रौद्योगिकी-संचालित दावा निपटान',
          text: 'पारदर्शी व तीव्र दावा मूल्यांकन एवं सीधे बैंक खाते में भुगतान हेतु उपग्रह चित्रों और मोबाइल ऐप का उपयोग।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'किसान श्रेणियां एवं अधिसूचित फसलों की शर्तें',
      eligibility: [
        { title: 'किसान प्रकार (Farmer Type)', text: 'वैध भूमि या खेती के दस्तावेज प्रस्तुत करने पर ऋणी किसानों, गैर-ऋणी किसानों, किरायेदार किसानों और बटाईदारों के लिए खुली है।' },
        { title: 'ऋणी किसान (Loanee Farmers)', text: 'मौसमी फसल ऋण या सक्रिय किसान क्रेडिट कार्ड (KCC) ऋण लेने वाले किसान स्वतः शामिल होते हैं, जिनका प्रीमियम बैंक ऋण राशि से काटते हैं।' },
        { title: 'गैर-ऋणी किसान (Non-Loanee)', text: 'स्वेच्छा से नामांकन करा सकते हैं; ऐतिहासिक रूप से नामांकित किसानों में से लगभग आधे इस श्रेणी में आते हैं।' },
        { title: 'अधिसूचित फसलें/क्षेत्र', text: 'उस मौसम के लिए राज्य सरकार की घोषणाओं के अनुसार अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाना अनिवार्य है।' },
        { title: 'आधार अनिवार्य (Aadhaar Mandatory)', text: 'खरीफ 2017 से नामांकन के लिए आधार कार्ड अनिवार्य है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध आवेदन प्रक्रिया',
      sec4Sub: 'pmfby.gov.in, बैंक या सीएससी (CSC) द्वारा मौसमी आवेदन प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'अधिसूचना जांच', text: 'पुष्टि करें कि आपकी फसल और राजस्व मंडल चालू मौसम के लिए राज्य सरकार द्वारा अधिसूचित हैं।' },
        { step: 'चरण 02', title: 'आवेदन व प्रीमियम', text: 'ऋणी किसान बैंक द्वारा स्वतः नामांकित; गैर-ऋणी किसान pmfby.gov.in या सीएससी पर मामूली किसान अंश (1.5%–2%) भरते हैं।' },
        { step: 'चरण 03', title: 'दस्तावेज़ अपलोड', text: '7/12 भू-अभिलेख, बुवाई स्व-घोषणा, पहचान पत्र, आधार और बैंक खाता विवरण अपलोड करें।' },
        { step: 'चरण 04', title: 'दावा व डीबीटी भुगतान', text: 'फसल नुकसान की स्थिति में उपग्रह/CCE सर्वेक्षण के आधार पर स्वीकृत दावा राशि सीधे बैंक खाते में अंतरित होती है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'महत्वपूर्ण तिथियां एवं मौसमी समय-सारणी',
      sec5Sub: 'खरीफ एवं रबी मौसमों हेतु अलग-अलग आवेदन अंतिम तिथियां',
      datesBadge: 'मौसमी नामांकन अवधि',
      datesHeading: 'खरीफ एवं रबी मौसम समय-सारणी',
      datesRange: 'खरीफ: ~जून – जुलाई | रबी: ~नवंबर – दिसंबर',
      datesNote: 'नामांकन विंडो प्रत्येक मौसम के लिए अलग से घोषित की जाती हैं: खरीफ मौसम सामान्यतः जून-जुलाई में और रबी मौसम नवंबर-दिसंबर में खुलता है। ऋणी किसान स्वतः नामांकित होते हैं जब तक कि वे अंतिम तिथि से पहले बैंक में ऑप्ट-आउट घोषणा जमा न करें। गैर-ऋणी किसानों को अंतिम तिथि से पहले पीएमएफबीवाई पोर्टल या बैंक/सीएससी के माध्यम से आवेदन करना होगा।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'राष्ट्रीय फसल बीमा पोर्टल एवं मंत्रालय के दस्तावेज़',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे अधिकृत फसल बीमा पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'पीएमएफबीवाई आधिकारिक पोर्टल — pmfby.gov.in', url: 'https://pmfby.gov.in' },
        { label: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार', url: 'https://agriwelfare.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'अंतिम तिथि से पूर्व तैयार रखने हेतु आवश्यक दस्तावेज़',
      requiredDocuments: [
        { title: 'बीमित किसान का पासपोर्ट साइज फोटो', desc: 'किसान का हालिया स्पष्ट फोटो' },
        { title: 'पहचान प्रमाण पत्र', desc: 'आधार / पैन / वोटर आईडी / फोटोयुक्त बैंक पासबुक / किसान फोटो बुक / मनरेगा जॉब कार्ड' },
        { title: 'निवास प्रमाण पत्र', desc: 'आधार / वोटर आईडी / बिजली बिल / बैंक पासबुक' },
        { title: 'भूमि स्वामित्व अभिलेख अथवा काश्तकारी अनुबंध', desc: '7/12 उतारा, भू-स्वामित्व प्रमाण पत्र अथवा बटाईदार/किरायेदार अनुबंध' },
        { title: 'बोई गई फसल का घोषणा पत्र', desc: 'स्व-घोषणा अथवा तलाठी/कृषि सहायक द्वारा प्रमाणित बुवाई प्रमाण पत्र' },
        { title: 'आधार-लिंक बैंक खाता विवरण', desc: 'बीमा दावा राशि के प्रत्यक्ष अंतरण (DBT) हेतु सक्रिय बैंक खाता' }
      ],
      docsAlert: 'महत्वपूर्ण सूचना: बैंक खाता सक्रिय और आधार से लिंक होना सुनिश्चित करें। ओलावृष्टि, भूस्खलन, जलभराव जैसी स्थानीय आपदाओं की स्थिति में तत्काल सर्वेक्षण हेतु 72 घंटों के भीतर क्रॉप इंश्योरेंस ऐप अथवा टोल-फ्री नंबर पर सूचना देना अनिवार्य है।'
    },
    mr: {
      title: 'प्रधानमंत्री पीक विमा योजना (PMFBY)',
      dept: 'कृषी व शेतकरी कल्याण मंत्रालय, भारत सरकार',
      badge: 'सर्वसमावेशक पीक विमा',
      verifiedBadge: 'प्रमाणित भारत सरकार योजना',
      dbtBadge: 'तंत्रज्ञान-आधारित नुकसान भरपाई (DBT)',
      refCode: 'पोर्टल संदर्भ: PMFBY-GOI2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक साहाय्य',
      benefitsHighlight: 'पीक विमा — पीक नुकसानीवर विमा संरक्षित रकमेची भरपाई, शेतकऱ्याचा विमा हप्ता केवळ १.५%–५% पर्यंत मर्यादित',
      applyOnline: 'ऑनलाइन अर्ज करा (pmfby.gov.in)',
      autofillReady: 'पोर्टल सिंक उपलब्ध',
      backToCategory: 'शेतकरी योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'अनपेक्षित नैसर्गिक संकटांमुळे होणाऱ्या पीक नुकसानीपासून संरक्षण देणारी भारताची प्रमुख पीक विमा योजना',
      overview: "एप्रिल २०१६ मध्ये सुरू झालेली PMFBY ही भारताची प्रमुख पीक विमा योजना आहे, ज्याने जुन्या अव्यवहार्य विमा प्रारूपांची जागा घेतली. ही योजना अनपेक्षित घटनांमुळे पिकांचे नुकसान झाल्यास शेतकऱ्यांना आर्थिक पाठबळ देते, ज्याचा उद्देश शेतीचे उत्पन्न स्थिर ठेवणे, आधुनिक शेती पद्धतींना प्रोत्साहन देणे आणि कृषी क्षेत्रातील पतपुरवठा अखंड चालू ठेवणे हा आहे. नुकतेच खरीप २०२६ पासून प्रभावी संरचनात्मक सुधारणा आणि वाढीव अर्थसंकल्पासह ही योजना २०२५-२६ हंगामापर्यंत वाढवण्यात आली आहे.",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'कर्जदार, बिगर-कर्जदार, भाडेतत्त्वावरील शेतकरी आणि अल्पभूधारक' },
        { label: 'शेतकरी विमा हप्ता', value: 'खरीप अन्नधान्य/गळीत धान्य २%, रब्बी १.५%, वार्षिक नगदी/फळपिके ५%' },
        { label: 'नुकसान मूल्यांकन', value: 'उपग्रह छायाचित्रे, रिमोट सेन्सिंग आणि पीक कापणी प्रयोग (CCE)' },
        { label: 'नोडल मंत्रालय', value: 'कृषी व शेतकरी कल्याण मंत्रालय, भारत सरकार' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: 'कमी विमा हप्ता, सर्वंकष जोखीम संरक्षण आणि शासकीय अनुदान साहाय्य',
      keyBenefits: [
        {
          title: 'कमी विमा हप्ता, मोठे संरक्षण',
          text: 'शेतकरी खरीप अन्नधान्य व गळीत धान्यासाठी जास्तीत जास्त २%, रब्बी पिकांसाठी १.५% आणि वार्षिक व्यावसायिक किंवा फलोत्पादन पिकांसाठी कमाल ५% विमा हप्ता भरतात — उर्वरित हप्ता शासन अनुदानित करते.'
        },
        {
          title: 'सर्वंकष जोखीम संरक्षण (End-to-End Risk)',
          text: 'पेरणीपूर्व जोखीम, नैसर्गिक आपत्तींमुळे उभ्या पिकांचे नुकसान, स्थानिक आपत्ती आणि चक्रीवादळ व अवकाळी पावसामुळे काढणीनंतर होणाऱ्या नुकसानीला संरक्षण देते.'
        },
        {
          title: 'शासकीय अनुदान साहाय्य',
          text: 'उर्वरित विमा हप्ता केंद्र आणि राज्य शासनाकडून ५०:५० प्रमाणात (ईशान्येकडील राज्यांसाठी ९०:१० प्रमाणात) दिला जातो.'
        },
        {
          title: 'तंत्रज्ञान-आधारित दावा निपटारा',
          text: 'पारदर्शक व जलद नुकसान मूल्यांकन आणि थेट बँक खात्यात भरपाई जमा करण्यासाठी सॅटेलाइट इमेजरी व मोबाईल ॲपचा वापर.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'शेतकरी वर्ग आणि अधिसूचित पिकांची अट',
      eligibility: [
        { title: 'शेतकरी प्रकार (Farmer Type)', text: 'विहित अटी व जमिनीचे/लागवडीचे अधिकृत कागदपत्रे सादर केल्यास कर्जदार, बिगर-कर्जदार, कुळ शेतकरी आणि वाटेकरी शेतकरी या सर्वांसाठी खुली.' },
        { title: 'कर्जदार शेतकरी (Loanee Farmers)', text: 'हंगामी पीक कर्ज किंवा सक्रिय केसीसी (KCC) कर्ज घेणारे शेतकरी आपोआप समाविष्ट होतात, ज्यांचा विमा हप्ता बँका पीक कर्जातून वजा करतात.' },
        { title: 'बिगर-कर्जदार शेतकरी (Non-Loanee)', text: 'स्वेच्छेने सहभाग घेऊ शकतात; आतापर्यंत नोंदणीकृत शेतकऱ्यांपैकी सुमारे निम्मे शेतकरी या श्रेणीतील आहेत.' },
        { title: 'अधिसूचित पिके/क्षेत्र', text: 'त्या हंगामासाठी राज्य शासनाने जाहीर केलेल्या अधिसूचित क्षेत्रात अधिसूचित पिके घेतलेली असणे आवश्यक.' },
        { title: 'आधार कार्ड अनिवार्य', text: 'खरीप २०१७ पासून योजनेतील सहभागासाठी आधार कार्ड अनिवार्य करण्यात आले आहे.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने अर्ज प्रक्रिया',
      sec4Sub: 'pmfby.gov.in, बँक किंवा सीएससी (CSC) द्वारे हंगामी नोंदणी',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'अधिसूचना तपासणी', text: 'चालू हंगामासाठी आपले पीक आणि महसूल मंडळ राज्य शासनाने अधिसूचित केले आहे का ते तपासा.' },
        { step: 'टप्पा ०२', title: 'नोंदणी व हप्ता', text: 'कर्जदार शेतकरी बँकेमार्फत समाविष्ट; बिगर-कर्जदार शेतकरी pmfby.gov.in वर किंवा सीएससी केंद्रावर नाममात्र शेतकरी हप्ता (१.५%–२%) भरतात.' },
        { step: 'टप्पा ०३', title: 'कागदपत्रे अपलोड', text: '७/१२ उतारा, पीक पेरा स्वयंघोषणा, ओळखपत्र आणि आधार संलग्न बँक खाते तपशील अपलोड करा.' },
        { step: 'टप्पा ०४', title: 'नुकसान भरपाई थेट जमा', text: 'पीक नुकसान झाल्यास CCE/सॅटेलाइट मूल्यांकनानुसार मंजूर विम्याची रक्कम थेट बँक खात्यात जमा होते.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'महत्त्वाच्या तारखा व हंगामी वेळापत्रक',
      sec5Sub: 'खरीप आणि रब्बी हंगामासाठी वेगवेगळ्या अंतिम मुदती',
      datesBadge: 'हंगामी नोंदणी कालावधी',
      datesHeading: 'खरीप व रब्बी हंगाम वेळापत्रक',
      datesRange: 'खरीप हंगाम: ~जून – जुलै | रब्बी हंगाम: ~नोव्हेंबर – डिसेंबर',
      datesNote: 'नोंदणी कालावधी प्रत्येक हंगामासाठी स्वतंत्रपणे जाहीर केला जातो: खरीप हंगाम साधारण जून-जुलैमध्ये आणि रब्बी हंगाम नोव्हेंबर-डिसेंबरमध्ये उघडतो. कर्जदार शेतकरी मुदतीपूर्वी बँकेत ऑप्ट-आऊट अर्ज न दिल्यास आपोआप समाविष्ट होतात. बिगर-कर्जदार शेतकऱ्यांनी मुदतीपूर्वी पोर्टल किंवा सीएससीद्वारे अर्ज करणे आवश्यक आहे.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'राष्ट्रीय पीक विमा पोर्टल व मंत्रालयाची अधिकृत संकेतस्थळे',
      sourcesNote: 'या पृष्ठावरील माहिती थेट अधिकृत पीक विमा पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'पीएमएफबीवाय अधिकृत पोर्टल — pmfby.gov.in', url: 'https://pmfby.gov.in' },
        { label: 'कृषी व शेतकरी कल्याण मंत्रालय, भारत सरकार', url: 'https://agriwelfare.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'अंतिम मुदतीपूर्वी तयार ठेवावयाची कागदपत्रे',
      requiredDocuments: [
        { title: 'विमाधारक शेतकऱ्याचा पासपोर्ट आकाराचा फोटो', desc: 'शेतकऱ्याचा अलीकडील स्पष्ट फोटो' },
        { title: 'ओळख पुरावा', desc: 'आधार / पॅन / मतदार ओळखपत्र / छायाचित्र असलेले बँक पासबुक / मनरेगा जॉब कार्ड' },
        { title: 'पत्ता पुरावा', desc: 'आधार कार्ड / मतदार ओळखपत्र / वीज बिल / बँक पासबुक' },
        { title: 'जमीन मालकी अभिलेख किंवा कुळ करार', desc: '७/१२ उतारा, ८-अ उतारा किंवा वाटेकरी/कुळ लागवड करार' },
        { title: 'पेरणी केलेले पीक स्वयंघोषणा पत्र', desc: 'स्वयंघोषणा किंवा तलाठी/कृषी सहाय्यकांनी दिलेला पीक पेरा दाखला' },
        { title: 'बँक खाते तपशील (आधार संलग्न)', desc: 'विमा भरपाई थेट खात्यात (DBT) जमा होण्यासाठी बँक पासबुकची प्रत' }
      ],
      docsAlert: 'महत्त्वाची सूचना: बँक खाते सक्रिय आणि आधारशी संलग्न असल्याची खात्री करा. गारपीट, ढगफुटी, स्थानिक पूर यांसारख्या स्थानिक आपत्तीच्या वेळी तात्काळ सर्वेक्षणासाठी ७२ तासांच्या आत क्रॉप इन्शुरन्स ॲप किंवा टोल-फ्री क्रमांकावर पूर्वसूचना देणे बंधनकारक आहे.'
    }
  },
  w1: {
    en: {
      title: 'Mukhyamantri Majhi Ladki Bahin Yojana (MMLBY)',
      dept: 'Women & Child Development Department, Government of Maharashtra',
      badge: 'Direct Financial Aid',
      verifiedBadge: 'VERIFIED MAHARASHTRA STATE SCHEME',
      dbtBadge: 'DIRECT BENEFIT TRANSFER (DBT)',
      refCode: 'Portal Ref: MMLBY-MH2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Direct Bank Transfer (DBT) — ₹1,500/month (₹18,000/year) + 3 Free Annual LPG Cylinders',
      applyOnline: 'Apply Online (ladakibahin.maharashtra.gov.in)',
      autofillReady: 'Live Portal Sync Ready',
      backToCategory: 'Back to Women & Child Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: "Maharashtra State flagship initiative for women's economic empowerment and nutritional independence",
      overview: "Launched in July 2024 by the Maharashtra State Government, the scheme aims to promote economic independence for women, improve their health and nutrition, and strengthen their decision-making role within the family. Eligible women aged 21–65 receive ₹1,500 per month directly into their bank account. As of December 2024, the state had disbursed roughly ₹17,500 crore to over 2.38 crore women under this scheme.",
      facts: [
        { label: 'Eligible Beneficiaries', value: 'Women aged 21–65 years residing in Maharashtra' },
        { label: 'Financial Benefit', value: '₹1,500 per month (₹18,000 per year via DBT)' },
        { label: 'Allied Entitlements', value: '3 free LPG cylinders/year & higher education fee waivers for OBC/EWS girls' },
        { label: 'Nodal Authority', value: 'Women & Child Development Department, Maharashtra' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Monthly financial assistance, free gas cylinders and college fee waivers',
      keyBenefits: [
        {
          title: 'Monthly Financial Assistance',
          text: "₹1,500 per month via Direct Benefit Transfer to the beneficiary's own Aadhaar-linked bank account."
        },
        {
          title: 'Free LPG Cylinders',
          text: 'Three free LPG domestic gas cylinders provided annually to eligible beneficiaries.'
        },
        {
          title: 'Educational Support',
          text: 'Fee waivers for poor girls belonging to OBC and EWS categories for higher education admissions in colleges.'
        },
        {
          title: 'Broad Coverage',
          text: 'Applicable to married, widowed, divorced, abandoned, and destitute women — plus one unmarried woman per family.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Age, residency and income guidelines prescribed by Maharashtra Govt',
      eligibility: [
        { title: 'Gender & Residency', text: 'Female, permanent resident / domicile of Maharashtra.' },
        { title: 'Age', text: 'Between 21 and 65 years of age.' },
        { title: 'Family Income', text: 'Combined annual family income from all sources must not exceed ₹2.5 lakh.' },
        { title: 'Aadhaar-Linked Bank Account', text: 'Mandatory for direct benefit transfer crediting.' },
        { title: 'Marital/Family Status', text: 'Married, widowed, divorced, abandoned/destitute women, or one unmarried woman per family.' },
        { title: 'Contractual Workers', text: 'Outsourced/contract workers are eligible if family income is within ₹2.5 lakh.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Application Procedure',
      sec4Sub: 'Online portal registration or assisted offline submission',
      applicationSteps: [
        { step: 'STAGE 01', title: 'Portal Access', text: 'Visit ladakibahin.maharashtra.gov.in → Click "Applicant Login" → "Create Account".' },
        { step: 'STAGE 02', title: 'Details & Documents', text: 'Fill personal, residence, and bank details; upload Aadhaar, ration card, and income certificate.' },
        { step: 'STAGE 03', title: 'Verification', text: 'Scrutiny conducted online or via Anganwadi centres, Setu Kendras, or Gram Panchayat/Ward offices.' },
        { step: 'STAGE 04', title: 'Monthly DBT Disbursal', text: '₹1,500 monthly benefit credited directly into beneficiary bank account with SMS notification.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Important Dates & Schedule',
      sec5Sub: 'Continuous enrollment window under Government of Maharashtra',
      datesBadge: 'ACTIVE ONGOING ENROLLMENT',
      datesHeading: 'Financial Year 2026–27 Applications',
      datesRange: 'Continuous online registration & offline facilitation',
      datesNote: 'Applications are accepted continuously through the official portal and field Setu/Anganwadi centres. Benefit disbursals occur on a regular monthly cycle.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Official Maharashtra Government portals and GRs',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of Maharashtra portals:',
      sources: [
        { label: 'Majhi Ladki Bahin Official Portal — ladakibahin.maharashtra.gov.in', url: 'https://ladakibahin.maharashtra.gov.in' },
        { label: 'Women & Child Development Department, Maharashtra', url: 'https://womenchild.maharashtra.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Required document checklist for registration',
      requiredDocuments: [
        { title: 'Aadhaar Card', desc: 'Valid Aadhaar with updated mobile number' },
        { title: 'Bank account details (Aadhaar-linked)', desc: 'Active bank account seeded with Aadhaar in NPCI mapper' },
        { title: 'Age proof', desc: 'Birth certificate, school leaving certificate, or voter ID showing age 21–65' },
        { title: 'Ration card', desc: 'Yellow or saffron ration card indicating family structure' },
        { title: 'Residence/domicile certificate', desc: 'Maharashtra domicile or resident certificate' },
        { title: 'Income certificate (below ₹2.5 lakh)', desc: 'Competent authority income certificate (or yellow/orange ration card where permitted)' }
      ],
      docsAlert: "Who's Excluded: (1) Family income exceeds ₹2.5 lakh or any member pays income tax. (2) Regular/permanent govt/PSU employees or retired pensioners. (3) Already receiving ₹1,500/month from another govt financial scheme. (4) Present/former MP/MLA or board director in govt undertaking. (5) Family owns a four-wheeler (tractors excluded)."
    },
    hi: {
      title: 'मुख्यमंत्री माझी लाड़की बहिन योजना (MMLBY)',
      dept: 'महिला व बाल विकास विभाग, महाराष्ट्र शासन',
      badge: 'प्रत्यक्ष वित्तीय सहायता',
      verifiedBadge: 'सत्यापित महाराष्ट्र शासन योजना',
      dbtBadge: 'प्रत्यक्ष लाभ अंतरण (DBT)',
      refCode: 'पोर्टल संदर्भ: MMLBY-MH2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'प्रत्यक्ष बैंक अंतरण (DBT) — ₹1,500/माह (₹18,000/वर्ष) + 3 निःशुल्क वार्षिक एलपीजी सिलेंडर',
      applyOnline: 'ऑनलाइन आवेदन करें (ladakibahin.maharashtra.gov.in)',
      autofillReady: 'लाइव पोर्टल सिंक उपलब्ध',
      backToCategory: 'महिला एवं बाल विकास योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'महिलाओं के आर्थिक स्वावलंबन और पोषण सुधार हेतु महाराष्ट्र शासन की ऐतिहासिक योजना',
      overview: "जुलाई 2024 में महाराष्ट्र सरकार द्वारा प्रारंभ, इस योजना का उद्देश्य महिलाओं के आर्थिक स्वावलंबन को बढ़ावा देना, उनके स्वास्थ्य और पोषण में सुधार करना और परिवार में उनकी निर्णय लेने की भूमिका को मजबूत करना है। 21 से 65 वर्ष की पात्र महिलाओं को सीधे उनके बैंक खाते में प्रति माह ₹1,500 प्राप्त होते हैं। दिसंबर 2024 तक, राज्य ने इस योजना के तहत 2.38 करोड़ से अधिक महिलाओं को लगभग ₹17,500 करोड़ वितरित किए हैं।",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'महाराष्ट्र की 21 से 65 वर्ष आयु वर्ग की महिलाएं' },
        { label: 'वित्तीय सहायता', value: '₹1,500 प्रति माह (₹18,000 प्रति वर्ष सीधे बैंक खाते में)' },
        { label: 'अन्य लाभ', value: 'सालाना 3 मुफ्त गैस सिलेंडर एवं ओबीसी/ईडब्ल्यूएस छात्राओं को कॉलेज प्रवेश शुल्क माफी' },
        { label: 'नोडल विभाग', value: 'महिला व बाल विकास विभाग, महाराष्ट्र शासन' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'मासिक वित्तीय सहायता, मुफ्त रसोई गैस सिलेंडर व उच्च शिक्षा में शुल्क माफी',
      keyBenefits: [
        {
          title: 'मासिक वित्तीय सहायता (Monthly Aid)',
          text: 'लाभार्थी महिला के स्वयं के आधार-लिंक बैंक खाते में प्रत्यक्ष लाभ अंतरण (DBT) द्वारा ₹1,500 प्रति माह।'
        },
        {
          title: 'निःशुल्क एलपीजी सिलेंडर (Free LPG)',
          text: 'पात्र लाभार्थी परिवारों को प्रति वर्ष 3 घरेलू एलपीजी गैस सिलेंडर पूरी तरह निःशुल्क प्रदान किए जाते हैं।'
        },
        {
          title: 'शैक्षणिक सहायता (Educational Support)',
          text: 'कॉलेजों में उच्च शिक्षा प्रवेश हेतु ओबीसी और ईडब्ल्यूएस वर्ग की गरीब बालिकाओं के लिए पूर्ण शिक्षण शुल्क छूट।'
        },
        {
          title: 'व्यापक सामाजिक दायरा (Broad Coverage)',
          text: 'विवाहित, विधवा, तलाकशुदा, परित्यक्ता एवं निराधार महिलाओं के साथ-साथ प्रति परिवार एक अविवाहित महिला भी शामिल।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'महाराष्ट्र शासन द्वारा निर्धारित आयु, अधिवास एवं आय सीमा',
      eligibility: [
        { title: 'लिंग व अधिवास', text: 'महिला, महाराष्ट्र राज्य की मूल/स्थायी निवासी होना अनिवार्य है।' },
        { title: 'आयु सीमा', text: 'आवेदक की आयु 21 वर्ष से 65 वर्ष के बीच होनी चाहिए।' },
        { title: 'पारिवारिक आय', text: 'परिवार की सभी स्रोतों से कुल वार्षिक आय ₹2.5 लाख से अधिक नहीं होनी चाहिए।' },
        { title: 'आधार-लिंक बैंक खाता', text: 'डीबीटी राशि सीधे प्राप्त करने के लिए स्वयं का आधार-सीडेड बैंक खाता अनिवार्य है।' },
        { title: 'वैवाहिक स्थिति', text: 'विवाहित, विधवा, तलाकशुदा, परित्यक्ता अथवा परिवार की एक अविवाहित वयस्क महिला।' },
        { title: 'अनुबंधित कर्मचारी', text: 'आउटसोर्स/संविदा कर्मचारी महिलाएं भी पात्र हैं, यदि पारिवारिक आय ₹2.5 लाख के भीतर है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध आवेदन प्रक्रिया',
      sec4Sub: 'पोर्टल पर ऑनलाइन अथवा सेतु/आंगनवाड़ी केंद्रों पर ऑफलाइन प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'पोर्टल लॉगिन', text: 'ladakibahin.maharashtra.gov.in पर जाएं → "Applicant Login" → "Create Account" चुनें।' },
        { step: 'चरण 02', title: 'विवरण व दस्तावेज़', text: 'व्यक्तिगत, पते व बैंक विवरण भरें; आधार, राशन कार्ड और आय प्रमाण पत्र अपलोड करें।' },
        { step: 'चरण 03', title: 'सत्यापन प्रक्रिया', text: 'ऑनलाइन जांच अथवा आंगनवाड़ी केंद्र, सेतु सुविधा केंद्र, ग्राम पंचायत कार्यालय द्वारा सत्यापन।' },
        { step: 'चरण 04', title: 'मासिक डीबीटी अंतरण', text: 'सत्यापित बैंक खाते में प्रतिमाह ₹1,500 की सहायता राशि सीधे जमा होती है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'महत्वपूर्ण तिथियां एवं समय-सारणी',
      sec5Sub: 'महाराष्ट्र शासन के अंतर्गत निरंतर नामांकन विंडो',
      datesBadge: 'सक्रिय निरंतर नामांकन',
      datesHeading: 'वित्तीय वर्ष 2026–27 आवेदन',
      datesRange: 'सतत ऑनलाइन व ऑफलाइन आवेदन सुविधा सक्रिय',
      datesNote: 'आधिकारिक पोर्टल तथा स्थानीय सेतु/आंगनवाड़ी केंद्रों के माध्यम से आवेदन निरंतर स्वीकार किए जाते हैं। किस्तें मासिक आधार पर नियमित वितरित की जाती हैं।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'महाराष्ट्र शासन के अधिकृत पोर्टल एवं शासकीय संकल्प',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे महाराष्ट्र शासन के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'माझी लाड़की बहिन आधिकारिक पोर्टल — ladakibahin.maharashtra.gov.in', url: 'https://ladakibahin.maharashtra.gov.in' },
        { label: 'महिला व बाल विकास विभाग, महाराष्ट्र शासन', url: 'https://womenchild.maharashtra.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'आवेदन से पूर्व तैयार रखने हेतु आवश्यक प्रमाण पत्र',
      requiredDocuments: [
        { title: 'आधार कार्ड (Aadhaar Card)', desc: 'सक्रिय मोबाइल नंबर से लिंक वैध आधार कार्ड' },
        { title: 'आधार-लिंक बैंक खाता विवरण', desc: 'NPCI मैपर में आधार से लिंक स्वयं का सक्रिय बचत बैंक खाता' },
        { title: 'आयु प्रमाण पत्र', desc: 'जन्म प्रमाण पत्र, स्कूल छोड़ने का प्रमाण पत्र अथवा वोटर आईडी' },
        { title: 'राशन कार्ड (Ration Card)', desc: 'परिवार के सदस्यों का विवरण दर्शाने वाला राशन कार्ड' },
        { title: 'अधिवास/निवास प्रमाण पत्र', desc: 'महाराष्ट्र राज्य का अधिवास (Domicile) अथवा निवास प्रमाण पत्र' },
        { title: 'आय प्रमाण पत्र (₹2.5 लाख से कम)', desc: 'तहसीलदार द्वारा जारी वार्षिक आय प्रमाण पत्र' }
      ],
      docsAlert: "अपवर्जन की शर्तें (Who's Excluded): (1) परिवार की वार्षिक आय ₹2.5 लाख से अधिक हो या कोई सदस्य आयकरदाता हो। (2) परिवार का कोई सदस्य स्थायी सरकारी/पीएसयू कर्मचारी या पेंशनभोगी हो। (3) अन्य सरकारी योजना से पहले से ₹1,500/माह या अधिक ले रहे हों। (4) परिवार में वर्तमान/पूर्व सांसद, विधायक या सरकारी उपक्रम के निदेशक हों। (5) परिवार के पास चार पहिया वाहन (ट्रैक्टर को छोड़कर) हो।"
    },
    mr: {
      title: 'मुख्यमंत्री माझी लाडकी बहीण योजना (MMLBY)',
      dept: 'महिला व बाल विकास विभाग, महाराष्ट्र शासन',
      badge: 'थेट आर्थिक साहाय्य',
      verifiedBadge: 'प्रमाणित महाराष्ट्र शासन योजना',
      dbtBadge: 'थेट लाभ हस्तांतरण (DBT)',
      refCode: 'पोर्टल संदर्भ: MMLBY-MH2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक साहाय्य',
      benefitsHighlight: 'थेट बँक हस्तांतरण (DBT) — दरमहा ₹१,५०० (वार्षिक ₹१८,०००) + वर्षाला ३ मोफत गॅस सिलिंडर',
      applyOnline: 'ऑनलाइन अर्ज करा (ladakibahin.maharashtra.gov.in)',
      autofillReady: 'थेट पोर्टल जोडणी उपलब्ध',
      backToCategory: 'महिला व बाल विकास योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'महिलांचे आर्थिक स्वावलंबन, आरोग्य व पोषणासाठी महाराष्ट्र शासनाची ऐतिहासिक योजना',
      overview: "जुलै २०२४ मध्ये महाराष्ट्र शासनाने सुरू केलेल्या या योजनेचा उद्देश महिलांचे आर्थिक स्वावलंबन वाढवणे, त्यांचे आरोग्य व पोषण सुधारणे आणि कुटुंबातील त्यांची निर्णय प्रक्रियेतील भूमिका बळकट करणे हा आहे. २१ ते ६५ वयोगटातील पात्र महिलांना थेट त्यांच्या बँक खात्यात दरमहा ₹१,५०० मिळतात. डिसेंबर २०२४ पर्यंत, शासनाने या योजनेअंतर्गत २.३८ कोटींहून अधिक महिलांना सुमारे ₹१७,५०० कोटींचे वाटप केले आहे.",
      facts: [
        { label: 'पात्र लाभार्थी', value: 'महाराष्ट्रातील २१ ते ६५ वयोगटातील महिला' },
        { label: 'आर्थिक साहाय्य', value: 'दरमहा ₹१,५०० (वार्षिक ₹१८,००० थेट बँक खात्यात)' },
        { label: 'इतर लाभ', value: 'वर्षाला ३ मोफत घरगुती गॅस सिलिंडर व उच्च शिक्षणात ओबीसी/ईडब्ल्यूएस मुलींना फी माफी' },
        { label: 'नोडल विभाग', value: 'महिला व बाल विकास विभाग, महाराष्ट्र शासन' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: 'मासिक आर्थिक मदत, मोफत एलपीजी सिलिंडर आणि उच्च शिक्षणात फी सवलत',
      keyBenefits: [
        {
          title: 'मासिक थेट आर्थिक मदत (Monthly Aid)',
          text: 'लाभार्थी महिलेच्या स्वतःच्या आधार-संलग्न बँक खात्यात थेट लाभ हस्तांतरणाद्वारे (DBT) दरमहा ₹१,५००.'
        },
        {
          title: 'मोफत एलपीजी सिलिंडर (Free LPG Cylinders)',
          text: 'पात्र लाभार्थी कुटुंबांना दरवर्षी ३ घरगुती गॅस सिलिंडर मोफत दिले जातात.'
        },
        {
          title: 'शैक्षणिक साहाय्य (Educational Support)',
          text: 'महाविद्यालयीन उच्च शिक्षणासाठी ओबीसी आणि ईडब्ल्यूएस प्रवर्गातील गरीब मुलींना प्रवेश फी माफी.'
        },
        {
          title: 'सर्वसमावेशक व्याप्ती (Broad Coverage)',
          text: 'विवाहित, विधवा, घटस्फोटित, परित्यक्ता आणि निराधार महिला — तसेच कुटुंबातील एका अविवाहित महिलेला लाभ.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'महाराष्ट्र शासनाने विहित केलेल्या वयोमर्यादा, अधिवास व उत्पन्न अटी',
      eligibility: [
        { title: 'लिंग व अधिवास', text: 'केवळ महिला अर्जदार, महाराष्ट्र राज्याची कायमस्वरूपी रहिवासी असणे आवश्यक.' },
        { title: 'वयोमर्यादा', text: 'वय वर्षे २१ पूर्ण ते कमाल ६५ वर्षांपर्यंत असावे.' },
        { title: 'कौटुंबिक उत्पन्न', text: 'कुटुंबाचे सर्व मार्गांनी मिळणारे एकत्रित वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा जास्त नसावे.' },
        { title: 'आधार-संलग्न बँक खाते', text: 'डीबीटीद्वारे थेट लाभ मिळण्यासाठी स्वतःचे बँक खाते आधारशी जोडलेले असणे अनिवार्य.' },
        { title: 'वैवाहिक स्थिती', text: 'विवाहित, विधवा, घटस्फोटित, परित्यक्ता किंवा कुटुंबातील एक अविवाहित महिला.' },
        { title: 'कंत्राटी कामगार', text: 'कंत्राटी/बाह्यस्रोत महिला कामगार देखील उत्पन्न ₹२.५ लाखांच्या आत असल्यास पात्र.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने अर्ज प्रक्रिया',
      sec4Sub: 'ऑनलाइन पोर्टल किंवा अंगणवाडी/सेतू केंद्रांमार्फत सोपी प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'पोर्टल नोंदणी', text: 'ladakibahin.maharashtra.gov.in वर जा → "Applicant Login" → "Create Account" निवडा.' },
        { step: 'टप्पा ०२', title: 'माहिती व कागदपत्रे', text: 'वैयक्तिक, पत्ता व बँक तपशील भरा; आधार, रेशन कार्ड आणि उत्पन्न प्रमाणपत्र अपलोड करा.' },
        { step: 'टप्पा ०३', title: 'छाननी व पडताळणी', text: 'अंगणवाडी केंद्र, सेतू केंद्र किंवा प्रभाग/ग्रामपंचायत कार्यालयामार्फत कागदपत्रांची पडताळणी.' },
        { step: 'टप्पा ०४', title: 'मासिक डीबीटी वितरण', text: 'पडताळणी पूर्ण झाल्यावर दरमहा ₹१,५०० ची रक्कम थेट बँक खात्यात जमा होते.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'महत्त्वाच्या तारखा व वेळापत्रक',
      sec5Sub: 'महाराष्ट्र शासनांतर्गत अखंड चालू असणारी नोंदणी प्रक्रिया',
      datesBadge: 'सक्रिय अखंड नोंदणी',
      datesHeading: 'आर्थिक वर्ष २०२६–२७ अर्ज',
      datesRange: 'सतत चालू असणारी ऑनलाइन व ऑफलाइन अर्ज सुविधा',
      datesNote: 'अधिकृत पोर्टल आणि स्थानिक सेतू/अंगणवाडी केंद्रांमार्फत अर्ज अखंडपणे स्वीकारले जातात. हप्ते दर महिन्याला नियमितपणे वितरित केले जातात.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'महाराष्ट्र शासनाची अधिकृत संकेतस्थळे व शासन निर्णय',
      sourcesNote: 'या पृष्ठावरील माहिती थेट महाराष्ट्र शासनाच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'माझी लाडकी बहीण अधिकृत पोर्टल — ladakibahin.maharashtra.gov.in', url: 'https://ladakibahin.maharashtra.gov.in' },
        { label: 'महिला व बाल विकास विभाग, महाराष्ट्र शासन', url: 'https://womenchild.maharashtra.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'अर्जासाठी आवश्यक असणाऱ्या प्रमाणपत्रांची यादी',
      requiredDocuments: [
        { title: 'आधार कार्ड (Aadhaar Card)', desc: 'सक्रिय मोबाईल क्रमांकाशी जोडलेले आधार कार्ड' },
        { title: 'आधार संलग्न बँक खाते', desc: 'NPCI मॅपरमध्ये आधारशी जोडलेले सक्रिय बचत बँक खाते' },
        { title: 'वयाचा पुरावा', desc: 'जन्म प्रमाणपत्र, शाळा सोडल्याचा दाखला किंवा मतदार ओळखपत्र' },
        { title: 'रेशन कार्ड (Ration Card)', desc: 'कुटुंबाचा तपशील दर्शवणारे पिवळे किंवा केशरी रेशन कार्ड' },
        { title: 'अधिवास प्रमाणपत्र', desc: 'महाराष्ट्र राज्याचे अधिवास (Domicile) किंवा रहिवासी दाखला' },
        { title: 'उत्पन्न दाखला (₹२.५ लाखांपर्यंत)', desc: 'तहसीलदारांचा वैध वार्षिक उत्पन्न दाखला' }
      ],
      docsAlert: 'अपात्रतेचे निकष: (१) कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा जास्त असल्यास किंवा कुटुंबातील कोणी आयकर भरत असल्यास. (२) कुटुंबात नियमित सरकारी/सार्वजनिक उपक्रमातील कर्मचारी किंवा निवृत्तीवेतनधारक असल्यास. (३) इतर योजनेतून आधीच दरमहा ₹१,५०० किंवा अधिक लाभ घेत असल्यास. (४) कुटुंबात माजी/विद्यमान खासदार/आमदार असल्यास. (५) कुटुंबात चारचाकी वाहन (ट्रॅक्टर वगळून) असल्यास.'
    }
  },
  w2: {
    en: {
      title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      dept: 'Ministry of Women & Child Development, Government of India',
      badge: 'Maternity Benefit (DBT)',
      verifiedBadge: 'VERIFIED GOVERNMENT OF INDIA SCHEME',
      dbtBadge: 'MISSION SHAKTI / ICDS (DBT)',
      refCode: 'Portal Ref: PMMVY-GOI2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Direct Bank Transfer (DBT) — ₹5,000 for 1st child (2 installments); ₹6,000 for 2nd child if girl (1 installment)',
      applyOnline: 'Apply Online (pmmvy.wcd.gov.in)',
      autofillReady: 'Anganwadi & CSC Ready',
      backToCategory: 'Back to Women & Child Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Centrally sponsored maternity benefit scheme under National Food Security Act, 2013 & Mission Shakti',
      overview: "Launched in 2017, PMMVY is a maternity benefit scheme implemented across all districts of the country under the provisions of the National Food Security Act, 2013. It provides cash incentives to pregnant women and lactating mothers to compensate for wage loss around childbirth and to encourage healthy practices — timely registration of pregnancy, ante-natal check-ups, and immunization of the child. Under the revamped scheme (Mission Shakti), benefits were extended to a second child, but only if the second child is a girl, to discourage sex-selective practices and promote the girl child.",
      facts: [
        { label: 'Eligible Beneficiaries', value: 'Pregnant women & lactating mothers aged 19 years or above' },
        { label: 'First Child Entitlement', value: '₹5,000 in two installments (₹3,000 + ₹2,000)' },
        { label: 'Second Child (Girl) Benefit', value: '₹6,000 in a single installment post-delivery' },
        { label: 'Institutional Delivery Top-Up', value: '~₹1,000 under Janani Suraksha Yojana (JSY) = ₹6,000 combined' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Staged maternity cash transfers linked to healthcare milestones',
      keyBenefits: [
        {
          title: 'First Child — 2 Installments (₹5,000 total)',
          text: '1st Installment (₹3,000): Pregnancy registered + at least one Ante-Natal Check-up within 6 months of LMP. 2nd Installment (₹2,000): Child birth registered + first cycle of BCG, OPV, DPT, and Hepatitis-B given.'
        },
        {
          title: 'Second Child (Girl Only) — 1 Installment (₹6,000)',
          text: '₹6,000 paid in one go after the child is born, provided the pregnancy was registered during pregnancy, specifically designed to empower the girl child.'
        },
        {
          title: 'Combined with Janani Suraksha Yojana (JSY)',
          text: 'When paired with the ~₹1,000 JSY incentive for institutional delivery, eligible women receive a total of around ₹6,000 for the first child.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Conditions required to qualify under Mission Shakti PMMVY guidelines',
      eligibility: [
        { title: 'Age', text: 'Pregnant or lactating woman aged 19 years or above.' },
        { title: 'Live Birth', text: 'Benefit applies to the first live birth; second child benefit applies only if that child is a girl.' },
        { title: 'Wage-Loss Basis', text: 'Intended for women experiencing wage loss due to pregnancy.' },
        { title: 'Employment Exclusion', text: 'Must NOT be a regular employee of Central/State Government or a PSU, or already receiving similar benefits (paid maternity leave) under existing law.' },
        { title: 'Mandatory Registration', text: 'Must register the pregnancy at an Anganwadi Centre (AWC) or an approved government health facility.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Application Procedure',
      sec4Sub: '4-stage milestone-based process on pmmvy.wcd.gov.in or Anganwadi Centre',
      applicationSteps: [
        { step: 'STAGE 01', title: 'Early Registration', text: 'Register at the nearest Anganwadi Centre within 150 days of LMP or apply online via pmmvy.wcd.gov.in.' },
        { step: 'STAGE 02', title: '1st Installment Claim', text: 'Claim ₹3,000 on early registration + at least one ANC check-up within 6 months of LMP.' },
        { step: 'STAGE 03', title: '2nd Installment Claim', text: 'Claim ₹2,000 after child birth registration and completion of first vaccination cycle (BCG, OPV, DPT, Hep-B).' },
        { step: 'STAGE 04', title: '2nd Child (Girl) Claim', text: 'Direct ₹6,000 single installment claim after birth registration of second girl child.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Important Dates & Health Milelines',
      sec5Sub: 'Timelines linked with pregnancy and child immunization',
      datesBadge: 'GESTATIONAL MILESTONE TIMELINE',
      datesHeading: 'PMMVY Disbursement Milestones',
      datesRange: 'Registration within 150 days of LMP | Claims aligned with ANC and vaccination',
      datesNote: 'Register at the nearest Anganwadi Centre within 150 days of Last Menstrual Period (LMP). Claim 1st installment upon early registration + 1 ANC check-up. Claim 2nd installment after child birth is registered and initial vaccination cycle is completed.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Ministry of Women and Child Development documentation',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of India portals:',
      sources: [
        { label: 'PMMVY Official Portal — pmmvy.wcd.gov.in', url: 'https://pmmvy.wcd.gov.in' },
        { label: 'Ministry of Women & Child Development, Govt of India', url: 'https://wcd.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Official health records and identification checklist',
      requiredDocuments: [
        { title: 'Aadhaar card (with Date of Birth)', desc: 'Valid Aadhaar of the mother with correct DOB' },
        { title: 'Address and phone number', desc: 'Valid residential proof and active mobile number for DBT alerts' },
        { title: 'Bank/post office account details (Aadhaar-linked)', desc: 'Active individual bank account seeded with Aadhaar in NPCI mapper' },
        { title: 'Mother and Child Protection (MCP) card', desc: 'MCP card issued by Anganwadi / Health Sub-Center' },
        { title: 'Ante-Natal Check-up (ANC) report', desc: 'Record of at least one ANC check-up conducted by medical officer' },
        { title: 'Child birth registration certificate + immunization record', desc: 'Birth certificate and proof of BCG, OPV, DPT, Hepatitis-B vaccination for 2nd installment' }
      ],
      docsAlert: 'Common Challenges & Advice: Delayed payments, verification issues, and limited awareness/internet access in rural areas are commonly reported implementation bottlenecks — CSC-assisted applications and Anganwadi worker facilitation can help bridge this gap.'
    },
    hi: {
      title: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)',
      dept: 'महिला एवं बाल विकास मंत्रालय, भारत सरकार',
      badge: 'मातृत्व लाभ (DBT)',
      verifiedBadge: 'सत्यापित भारत सरकार योजना',
      dbtBadge: 'मिशन शक्ति / आईसीडीएस (DBT)',
      refCode: 'पोर्टल संदर्भ: PMMVY-GOI2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'प्रत्यक्ष बैंक अंतरण (DBT) — पहले बच्चे पर ₹5,000 (2 किस्तें); दूसरे बच्चे पर लड़की होने पर ₹6,000 (1 किस्त)',
      applyOnline: 'ऑनलाइन आवेदन करें (pmmvy.wcd.gov.in)',
      autofillReady: 'आंगनवाड़ी एवं सीएससी उपलब्ध',
      backToCategory: 'महिला एवं बाल विकास योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'राष्ट्रीय खाद्य सुरक्षा अधिनियम, 2013 एवं मिशन शक्ति के अंतर्गत केंद्र प्रायोजित मातृत्व लाभ योजना',
      overview: "2017 में प्रारंभ, PMMVY राष्ट्रीय खाद्य सुरक्षा अधिनियम, 2013 के प्रावधानों के तहत देश के सभी जिलों में लागू एक मातृत्व लाभ योजना है। यह गर्भवती महिलाओं और स्तनपान कराने वाली माताओं को प्रसव के दौरान मजदूरी के नुकसान की भरपाई करने और स्वस्थ प्रथाओं — गर्भावस्था का समय पर पंजीकरण, प्रसव पूर्व जांच (ANC) और बच्चे के टीकाकरण को प्रोत्साहित करने के लिए नकद प्रोत्साहन प्रदान करती है। मिशन शक्ति के तहत, लिंग-चयनात्मक प्रथाओं को हतोत्साहित करने और बालिका को बढ़ावा देने के लिए दूसरे बच्चे के बालिका होने पर भी ₹6,000 का लाभ दिया जाता है।",
      facts: [
        { label: 'पात्र लाभार्थी', value: '19 वर्ष या उससे अधिक आयु की गर्भवती महिलाएं व स्तनपान कराने वाली माताएं' },
        { label: 'प्रथम संतान सहायता', value: '₹5,000 दो किस्तों में (₹3,000 + ₹2,000)' },
        { label: 'द्वितीय संतान (बालिका) लाभ', value: 'प्रसव उपरांत एकमुश्त ₹6,000 की राशि' },
        { label: 'जननी सुरक्षा योजना (JSY)', value: 'संस्थागत प्रसव के ₹1,000 JSY प्रोत्साहन के साथ प्रथम संतान पर कुल ₹6,000' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'स्वास्थ्य मील के पत्थरों से जुड़ी चरणबद्ध नकद सहायता',
      keyBenefits: [
        {
          title: 'प्रथम संतान — 2 किस्तें (कुल ₹5,000)',
          text: 'प्रथम किस्त (₹3,000): LMP के 6 माह के भीतर गर्भावस्था पंजीकरण + कम से कम एक प्रसव पूर्व जांच (ANC)। द्वितीय किस्त (₹2,000): जन्म पंजीकरण + BCG, OPV, DPT और हेपेटाइटिस-B टीकाकरण चक्र पूर्ण होने पर।'
        },
        {
          title: 'द्वितीय संतान (केवल बालिका) — 1 किस्त (₹6,000)',
          text: 'बच्ची के जन्म के बाद एकमुश्त ₹6,000 का भुगतान (बशर्ते गर्भावस्था के दौरान पंजीकरण कराया गया हो), जो विशेष रूप से बालिकाओं के प्रोत्साहन हेतु है।'
        },
        {
          title: 'जननी सुरक्षा योजना (JSY) के साथ संयुक्त लाभ',
          text: 'संस्थागत प्रसव के लिए लगभग ₹1,000 के JSY प्रोत्साहन के साथ मिलकर पात्र महिलाओं को पहले बच्चे पर कुल लगभग ₹6,000 प्राप्त होते हैं।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'मिशन शक्ति PMMVY दिशानिर्देशों के तहत आवश्यक शर्तें',
      eligibility: [
        { title: 'आयु सीमा', text: 'गर्भवती अथवा स्तनपान कराने वाली महिला की आयु 19 वर्ष या अधिक होनी चाहिए।' },
        { title: 'जीवित जन्म', text: 'लाभ पहले जीवित जन्म पर लागू होता है; दूसरी संतान का लाभ केवल तभी मिलता है जब वह बालिका हो।' },
        { title: 'मजदूरी नुकसान भरपाई', text: 'गर्भावस्था के दौरान मजदूरी के नुकसान का सामना करने वाली महिलाओं के लिए लक्षित।' },
        { title: 'रोजगार अपवर्जन', text: 'केंद्र/राज्य सरकार या सार्वजनिक उपक्रम (PSU) की नियमित कर्मचारी नहीं होनी चाहिए, और किसी अन्य कानून के तहत मातृत्व अवकाश लाभ न ले रही हों।' },
        { title: 'पंजीकरण', text: 'गर्भावस्था का पंजीकरण आंगनवाड़ी केंद्र (AWC) या अनुमोदित सरकारी स्वास्थ्य केंद्र पर होना अनिवार्य है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध आवेदन प्रक्रिया',
      sec4Sub: 'pmmvy.wcd.gov.in अथवा आंगनवाड़ी केंद्र पर 4-चरणीय प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'प्रारंभिक पंजीकरण', text: 'अंतिम मासिक धर्म (LMP) के 150 दिनों के भीतर निकटतम आंगनवाड़ी केंद्र में पंजीकरण करें या पोर्टल पर आवेदन करें।' },
        { step: 'चरण 02', title: 'प्रथम किस्त दावा', text: 'LMP के 6 माह के भीतर पंजीकरण और कम से कम एक ANC जांच पूरी होने पर ₹3,000 का दावा करें।' },
        { step: 'चरण 03', title: 'द्वितीय किस्त दावा', text: 'बच्चे का जन्म पंजीकरण और टीकाकरण (BCG, OPV, DPT, Hep-B) का प्रथम चक्र पूर्ण होने पर ₹2,000 का दावा करें।' },
        { step: 'चरण 04', title: 'द्वितीय संतान (बालिका) दावा', text: 'दूसरी कन्या संतान के जन्म पंजीकरण के उपरांत ₹6,000 की एकमुश्त किस्त का सीधा दावा करें।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'महत्वपूर्ण तिथियां एवं स्वास्थ्य मील के पत्थर',
      sec5Sub: 'गर्भावस्था चक्र एवं शिशु टीकाकरण से जुड़ी समय-सीमाएं',
      datesBadge: 'गर्भावस्था स्वास्थ्य समय-सीमा',
      datesHeading: 'PMMVY किस्त वितरण मील के पत्थर',
      datesRange: 'LMP के 150 दिनों के भीतर पंजीकरण | ANC व टीकाकरण अनुसार दावे',
      datesNote: 'LMP के 150 दिनों के भीतर निकटतम आंगनवाड़ी केंद्र में पंजीकरण अनिवार्य है। पहली किस्त प्रारंभिक पंजीकरण व 1 ANC जांच पर तथा दूसरी किस्त जन्म पंजीकरण व प्रथम टीकाकरण चक्र पूर्ण होने पर मिलती है।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'महिला एवं बाल विकास मंत्रालय के आधिकारिक दस्तावेज़',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे भारत सरकार के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'PMMVY आधिकारिक पोर्टल — pmmvy.wcd.gov.in', url: 'https://pmmvy.wcd.gov.in' },
        { label: 'महिला एवं बाल विकास मंत्रालय, भारत सरकार', url: 'https://wcd.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'स्वास्थ्य अभिलेख एवं पहचान प्रमाण पत्रों की चेकलिस्ट',
      requiredDocuments: [
        { title: 'आधार कार्ड (जन्म तिथि सहित)', desc: 'माता का वैध आधार कार्ड जिसमें पूर्ण जन्म तिथि दर्ज हो' },
        { title: 'पता एवं फोन नंबर', desc: 'सक्रिय मोबाइल नंबर और पते का वैध प्रमाण' },
        { title: 'बैंक/डाकघर खाता विवरण (आधार-लिंक)', desc: 'NPCI मैपर में आधार से लिंक स्वयं का सक्रिय बैंक बचत खाता' },
        { title: 'मातृ एवं बाल सुरक्षा (MCP) कार्ड', desc: 'आंगनवाड़ी अथवा स्वास्थ्य उप-केंद्र द्वारा जारी वैध MCP कार्ड' },
        { title: 'प्रसव पूर्व जांच (ANC) रिपोर्ट', desc: 'चिकित्सा अधिकारी द्वारा प्रमाणित कम से कम एक ANC जांच रिपोर्ट' },
        { title: 'शिशु जन्म प्रमाण पत्र + टीकाकरण रिकॉर्ड', desc: 'जन्म प्रमाण पत्र तथा BCG, OPV, DPT, हेपेटाइटिस-B टीकाकरण प्रमाण' }
      ],
      docsAlert: 'सामान्य समस्याएं एवं सुझाव: ग्रामीण क्षेत्रों में सत्यापन में विलंब और इंटरनेट की सीमित पहुंच प्रमुख बाधाएं रही हैं — सीएससी (CSC) और आंगनवाड़ी कार्यकर्ताओं की सहायता से आवेदन कर इन समस्याओं से बचा जा सकता है।'
    },
    mr: {
      title: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)',
      dept: 'महिला व बाल विकास मंत्रालय, भारत सरकार',
      badge: 'मातृत्व लाभ (DBT)',
      verifiedBadge: 'प्रमाणित भारत सरकार योजना',
      dbtBadge: 'मिशन शक्ती / आयसीडीएस (DBT)',
      refCode: 'पोर्टल संदर्भ: PMMVY-GOI2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक साहाय्य',
      benefitsHighlight: 'थेट बँक हस्तांतरण (DBT) — पहिल्या अपत्यासाठी ₹५,००० (२ हप्ते); दुसरे अपत्य मुलगी असल्यास ₹६,००० (१ हप्ता)',
      applyOnline: 'ऑनलाइन अर्ज करा (pmmvy.wcd.gov.in)',
      autofillReady: 'अंगणवाडी व सीएससी केंद्र उपलब्ध',
      backToCategory: 'महिला व बाल विकास योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'राष्ट्रीय अन्न सुरक्षा कायदा, २०१३ आणि मिशन शक्ती अंतर्गत केंद्र पुरस्कृत मातृत्व लाभ योजना',
      overview: "२०१७ मध्ये सुरू झालेली PMMVY ही राष्ट्रीय अन्न सुरक्षा कायदा, २०१३ च्या तरतुदींनुसार देशभरातील सर्व जिल्ह्यांमध्ये राबवली जाणारी मातृत्व लाभ योजना आहे. ही योजना गरोदर महिला आणि स्तनदा मातांना बाळंतपणाच्या काळात होणाऱ्या मजुरीच्या नुकसानाची भरपाई करण्यासाठी आणि आरोग्यदायी सवयींना — गरोदरपणाची वेळेवर नोंदणी, प्रसूतीपूर्व तपासणी (ANC) आणि बालकाचे लसीकरण — प्रोत्साहन देण्यासाठी थेट रोख मदत देते. मिशन शक्ती अंतर्गत, लिंग निवडीच्या गैरप्रथांना आळा घालण्यासाठी दुसऱ्या अपत्यासाठीही ₹६,००० चा लाभ दिला जातो, जर ते अपत्य मुलगी असेल.",
      facts: [
        { label: 'पात्र लाभार्थी', value: '१९ वर्षे किंवा त्याहून अधिक वयाच्या गरोदर महिला व स्तनदा माता' },
        { label: 'पहिल्या अपत्यासाठी लाभ', value: 'दोन हप्त्यांमध्ये ₹५,००० (₹३,००० + ₹२,०००)' },
        { label: 'दुसरे अपत्य (मुलगी) लाभ', value: 'बाळंतपणानंतर एकरकमी ₹६,००० ची रक्कम' },
        { label: 'जननी सुरक्षा योजना (JSY)', value: 'संस्थात्मक प्रसूतीच्या ₹१,००० JSY लाभासह पहिल्या बाळावर एकूण ₹६,०००' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: 'आरोग्य टप्प्यांशी जोडलेले थेट मातृत्व आर्थिक साहाय्य',
      keyBenefits: [
        {
          title: 'पहिले अपत्य — २ हप्ते (एकूण ₹५,०००)',
          text: 'पहिला हप्ता (₹३,०००): LMP च्या ६ महिन्यांच्या आत गरोदरपणाची नोंदणी + किमान एक प्रसूतीपूर्व तपासणी (ANC). दुसरा हप्ता (₹२,०००): जन्म नोंदणी + BCG, OPV, DPT आणि हिपॅटायटीस-B लसीकरण चक्र पूर्ण केल्यावर.'
        },
        {
          title: 'दुसरे अपत्य (केवळ मुलगी) — १ हप्ता (₹६,०००)',
          text: 'मुलीच्या जन्मानंतर एकरकमी ₹६,००० चा थेट लाभ (गर्भावस्थेत नोंदणी केलेली असणे आवश्यक), जो केवळ मुलींच्या सक्षमीकरणासाठी राखीव आहे.'
        },
        {
          title: 'जननी सुरक्षा योजनेसह (JSY) एकत्रित लाभ',
          text: 'शासकीय रुग्णालयातील संस्थात्मक प्रसूतीसाठी मिळणाऱ्या सुमारे ₹१,००० च्या JSY लाभासह पहिल्या बाळासाठी एकूण ₹६,००० मिळतात.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'मिशन शक्ती PMMVY मार्गदर्शक तत्त्वांनुसार आवश्यक अटी',
      eligibility: [
        { title: 'वयोमर्यादा', text: 'गरोदर किंवा स्तनदा महिलेचे वय किमान १९ वर्षे किंवा त्याहून अधिक असावे.' },
        { title: 'जिवंत अपत्य', text: 'लाभ पहिल्या जिवंत अपत्यासाठी मिळतो; दुसऱ्या अपत्याचा लाभ केवळ ते अपत्य मुलगी असल्यासच मिळतो.' },
        { title: 'मजुरी नुकसान भरपाई', text: 'गरोदरपणामुळे मजुरीचे नुकसान सहन करणाऱ्या महिलांसाठी हा लाभ दिला जातो.' },
        { title: 'नोकरी अपात्रता', text: 'केंद्र/राज्य शासन किंवा सार्वजनिक उपक्रमातील (PSU) नियमित कर्मचारी नसावी किंवा सशुल्क प्रसूती रजा घेतलेली नसावी.' },
        { title: 'नोंदणी', text: 'अंगणवाडी केंद्र (AWC) किंवा मान्यताप्राप्त शासकीय आरोग्य केंद्रात गरोदरपणाची नोंदणी असणे बंधनकारक.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने अर्ज प्रक्रिया',
      sec4Sub: 'pmmvy.wcd.gov.in किंवा अंगणवाडी केंद्रावर ४-टप्प्यांची सोपी प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'सुरुवातीची नोंदणी', text: 'मासिक पाळीच्या शेवटच्या तारखेपासून (LMP) १५० दिवसांच्या आत अंगणवाडी केंद्रात नोंदणी करा किंवा ऑनलाइन अर्ज करा.' },
        { step: 'टप्पा ०२', title: 'पहिला हप्ता दावा', text: 'LMP च्या ६ महिन्यांच्या आत नोंदणी व किमान एक ANC तपासणी पूर्ण झाल्यावर ₹३,००० चा दावा करा.' },
        { step: 'टप्पा ०३', title: 'दुसरा हप्ता दावा', text: 'बाळाची जन्म नोंदणी आणि पहिल्या टप्प्यातील लसीकरण पूर्ण झाल्यावर ₹२,००० चा दावा करा.' },
        { step: 'टप्पा ०४', title: 'दुसरे अपत्य (मुलगी) दावा', text: 'दुसऱ्या अपत्यात मुलगी जन्माला आल्यावर जन्म नोंदणीनंतर थेट ₹६,००० चा एकरकमी दावा करा.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'महत्त्वाच्या तारखा व आरोग्य टप्पे',
      sec5Sub: 'गरोदरपण आणि बाल लसीकरणाशी जोडलेली समयमर्यादा',
      datesBadge: 'आरोग्य टप्पा वेळापत्रक',
      datesHeading: 'PMMVY हप्ता वितरण टप्पे',
      datesRange: 'LMP च्या १५० दिवसांच्या आत नोंदणी | तपासणी व लसीकरणानुसार दावे',
      datesNote: 'LMP च्या १५० दिवसांच्या आत अंगणवाडी केंद्रात नोंदणी करावी. पहिला हप्ता प्राथमिक नोंदणी व १ ANC तपासणीवर, तर दुसरा हप्ता जन्म नोंदणी व प्राथमिक लसीकरण चक्र पूर्ण केल्यावर मिळतो.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'महिला व बाल विकास मंत्रालयाची अधिकृत माहिती',
      sourcesNote: 'या पृष्ठावरील माहिती थेट भारत सरकारच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'PMMVY अधिकृत पोर्टल — pmmvy.wcd.gov.in', url: 'https://pmmvy.wcd.gov.in' },
        { label: 'महिला व बाल विकास मंत्रालय, भारत सरकार', url: 'https://wcd.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'आरोग्य नोंदी आणि ओळख पुराव्यांची यादी',
      requiredDocuments: [
        { title: 'आधार कार्ड (जन्मतारखेसह)', desc: 'मातेचे पूर्ण जन्मतारीख असलेले वैध आधार कार्ड' },
        { title: 'पत्ता व मोबाईल क्रमांक', desc: 'डीबीटी संदेश मिळण्यासाठी सक्रिय मोबाईल क्रमांक व पत्त्याचा पुरावा' },
        { title: 'बँक/पोस्ट खाते तपशील (आधार संलग्न)', desc: 'NPCI मॅपरमध्ये आधारशी जोडलेले मातेचे सक्रिय बचत बँक खाते' },
        { title: 'माता व बाल संरक्षण (MCP) कार्ड', desc: 'आरोग्य उपकेंद्र किंवा अंगणवाडीने दिलेले वैध MCP कार्ड' },
        { title: 'प्रसूतीपूर्व तपासणी (ANC) अहवाल', desc: 'वैद्यकीय अधिकाऱ्याने स्वाक्षरी केलेला किमान एका ANC चा अहवाल' },
        { title: 'बालक जन्म प्रमाणपत्र + लसीकरण नोंद', desc: 'जन्म प्रमाणपत्र आणि BCG, OPV, DPT, हिपॅटायटीस-B लसीकरण नोंद' }
      ],
      docsAlert: 'सामान्य अडचणी व सल्ला: ग्रामीण भागात पडताळणीतील विलंब व इंटरनेटची अडचण या समस्यांवर मात करण्यासाठी सेतू सुविधा केंद्र किंवा अंगणवाडी सेविकेमार्फत विनाअडथळा अर्ज करता येतो.'
    }
  },
  w3: {
    en: {
      title: 'Sukanya Samriddhi Yojana (SSY)',
      dept: 'National Savings Institute, Ministry of Finance & Department of Posts, Govt of India',
      badge: 'Girl Child Small Savings',
      verifiedBadge: 'SOVEREIGN GUARANTEED SCHEME (GOI)',
      dbtBadge: 'HIGHEST SMALL SAVINGS INTEREST (8.2% p.a.)',
      refCode: 'Portal Ref: SSY-GOI2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL SECURITY',
      benefitsHighlight: 'High-interest, government-backed savings account for a girl child — currently 8.2% p.a. (compounded annually, 100% Tax-Free EEE)',
      applyOnline: 'Open Account at Post Office / Bank',
      autofillReady: 'National Savings Institute',
      backToCategory: 'Back to Women & Child Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Dedicated small savings scheme for a girl child under Beti Bachao, Beti Padhao initiative',
      overview: "Launched on 22 January 2015 under the Beti Bachao, Beti Padhao initiative, SSY is a small savings scheme under the National Small Savings Fund (NSSF), specifically designed to secure a girl child's future education and marriage expenses. It offers one of the highest interest rates among government-backed small savings instruments, with full tax exemption on deposits, interest, and maturity proceeds (EEE status).",
      facts: [
        { label: 'Eligible Beneficiary', value: 'Resident Indian girl child below 10 years of age' },
        { label: 'Current Interest Rate', value: '8.2% p.a. (compounded annually, revised quarterly)' },
        { label: 'Tax Status', value: 'Exempt-Exempt-Exempt (EEE) under Section 80C' },
        { label: 'Operating Network', value: 'India Post (Post Offices), Public Sector & Select Private Banks' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Guaranteed sovereign interest, tax-free returns and long-term compounding',
      keyBenefits: [
        {
          title: 'High, Guaranteed Interest',
          text: 'Currently 8.2% p.a., compounded annually — among the best rates of any government small savings scheme, reviewed every quarter by the Finance Ministry.'
        },
        {
          title: 'Tax-Free Returns (EEE)',
          text: 'Deposits qualify for deduction under Section 80C (up to ₹1.5 lakh/year), and both interest earned and maturity proceeds are 100% tax-exempt.'
        },
        {
          title: 'Long-Term Compounding',
          text: 'Interest is calculated monthly on the lowest balance between the 5th and month-end, then credited annually — depositing before the 5th of the month maximizes returns.'
        },
        {
          title: 'Partial Withdrawal for Education',
          text: 'Up to 50% of the account balance can be withdrawn once the girl turns 18 or passes Class 10, to fund higher education expenses.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Mandatory Eligibility Criteria',
      sec3Sub: 'Account opening limits and qualifying conditions',
      eligibility: [
        { title: 'Age Limit', text: 'Account must be opened by a parent or legal guardian before the girl child turns 10 years old.' },
        { title: 'Residency', text: 'The girl child must be a resident Indian citizen.' },
        { title: 'Accounts per Family', text: 'Maximum of 2 accounts per family (one per girl child); a 3rd account is permitted in case of twin or triplet girls.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Step-by-Step Account Opening Procedure',
      sec4Sub: 'Simple 4-stage process at Post Office or authorized bank branch',
      applicationSteps: [
        { step: 'STAGE 01', title: 'Form-1 Application', text: 'Obtain and complete SSY Account Opening Form (Form-1) at any Post Office or bank.' },
        { step: 'STAGE 02', title: 'KYC & Documentation', text: "Submit the girl child's birth certificate and guardian's identity/address proof (Aadhaar/PAN)." },
        { step: 'STAGE 03', title: 'Initial Deposit', text: 'Deposit initial amount (minimum ₹250) via cash, cheque, or demand draft to generate passbook.' },
        { step: 'STAGE 04', title: 'Passbook & Contributions', text: 'Receive official SSY passbook; contribute annually for 15 years with full tax-free maturity at 21 years.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Deposit & Maturity Parameters',
      sec5Sub: 'Annual investment ranges and tenure rules',
      datesBadge: 'LONG-TERM TAX-FREE SAVINGS',
      datesHeading: 'Deposit & Maturity Timelines',
      datesRange: '15 Years Deposit Duration | 21 Years Total Account Maturity',
      datesNote: 'Minimum deposit: ₹250/financial year. Maximum deposit: ₹1.5 lakh/financial year. Deposits are made for 15 years from account opening. The account matures after 21 years from account opening, or on marriage after age 18 (whichever is earlier). Where to open: Any Post Office, Public Sector Banks, or select private banks (HDFC, ICICI, Axis).',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Ministry of Finance and Department of Posts documentation',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of India portals:',
      sources: [
        { label: 'National Savings Institute, Ministry of Finance', url: 'https://www.nsiindia.gov.in' },
        { label: 'Department of Posts, India Post Official Portal', url: 'https://www.indiapost.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Checklist of documents to submit with Account Opening Form-1',
      requiredDocuments: [
        { title: "Girl child's birth certificate", desc: 'Original birth certificate issued by Municipal Corporation / Registrar of Births' },
        { title: 'Identity & address proof of parent/guardian', desc: 'Aadhaar card, PAN card, Passport, or Voter ID' },
        { title: 'Passport-size photograph of the girl child', desc: 'Recent passport-size photographs of the girl child and guardian' },
        { title: 'SSY account opening form (Form-1)', desc: 'Duly filled Form-1 obtainable at post office or authorized bank' }
      ],
      docsAlert: 'Important Notes: Minimum ₹250 must be deposited every year to keep the account active; a penalty applies if this lapses. Interest rate is subject to quarterly revision by the government — the 8.2% rate is not locked in for the full 21-year tenure. Confirm the current rate and any rule changes at your post office, bank, or the official National Savings Institute page before investing.'
    },
    hi: {
      title: 'सुकन्या समृद्धि योजना (SSY)',
      dept: 'राष्ट्रीय बचत संस्थान, वित्त मंत्रालय एवं डाक विभाग, भारत सरकार',
      badge: 'बालिका बचत योजना',
      verifiedBadge: 'संप्रभु गारंटी योजना (भारत सरकार)',
      dbtBadge: 'सर्वोच्च छोटी बचत ब्याज दर (8.2% वार्षिक)',
      refCode: 'पोर्टल संदर्भ: SSY-GOI2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सुरक्षा',
      benefitsHighlight: 'बालिकाओं के लिए उच्च ब्याज वाली सरकारी बचत योजना — वर्तमान में 8.2% वार्षिक (वार्षिक चक्रवृद्धि, 100% कर-मुक्त EEE)',
      applyOnline: 'डाकघर / बैंक में खाता खोलें',
      autofillReady: 'राष्ट्रीय बचत संस्थान',
      backToCategory: 'महिला एवं बाल विकास योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'बेटी बचाओ, बेटी पढ़ाओ पहल के तहत बालिकाओं के भविष्य हेतु समर्पित बचत योजना',
      overview: "22 जनवरी 2015 को 'बेटी बचाओ, बेटी पढ़ाओ' पहल के तहत प्रारंभ, SSY राष्ट्रीय लघु बचत कोष (NSSF) के अंतर्गत एक विशेष बचत योजना है, जिसे बालिकाओं की उच्च शिक्षा और विवाह खर्चों को सुरक्षित करने के लिए तैयार किया गया है। यह सरकार समर्थित लघु बचत साधनों में सबसे अधिक ब्याज दरों में से एक प्रदान करती है, जिसमें जमा, अर्जित ब्याज और परिपक्वता राशि पर पूर्ण कर छूट (EEE स्थिति) उपलब्ध है।",
      facts: [
        { label: 'पात्र लाभार्थी', value: '10 वर्ष से कम आयु की भारतीय निवासी बालिका' },
        { label: 'वर्तमान ब्याज दर', value: '8.2% वार्षिक (वार्षिक चक्रवृद्धि, त्रैमासिक समीक्षा)' },
        { label: 'कर छूट (Tax Status)', value: 'धारा 80C के तहत पूर्ण कर-मुक्त (EEE स्टेटस)' },
        { label: 'संचालक नेटवर्क', value: 'इंडिया पोस्ट (डाकघर), राष्ट्रीयकृत बैंक एवं चुनिंदा निजी बैंक' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'गारंटीकृत संप्रभु ब्याज, कर-मुक्त प्रतिफल एवं दीर्घकालिक चक्रवृद्धि लाभ',
      keyBenefits: [
        {
          title: 'उच्च व गारंटीकृत ब्याज',
          text: 'वर्तमान में 8.2% प्रति वर्ष (वार्षिक चक्रवृद्धि) — किसी भी सरकारी लघु बचत योजना में सर्वश्रेष्ठ दरों में से एक, जिसकी वित्त मंत्रालय द्वारा प्रत्येक तिमाही समीक्षा की जाती है।'
        },
        {
          title: 'कर-मुक्त प्रतिफल (EEE Status)',
          text: 'जमा राशि धारा 80C के तहत कटौती (₹1.5 लाख/वर्ष तक) हेतु पात्र है, और अर्जित ब्याज व परिपक्वता राशि दोनों 100% कर-मुक्त हैं।'
        },
        {
          title: 'दीर्घकालिक चक्रवृद्धि लाभ',
          text: 'ब्याज की गणना महीने की 5 तारीख से महीने के अंत के न्यूनतम शेष पर की जाती है और वार्षिक रूप से जमा की जाती है — 5 तारीख से पहले जमा करने पर अधिकतम लाभ मिलता है।'
        },
        {
          title: 'उच्च शिक्षा हेतु आंशिक निकासी',
          text: 'बालिका के 18 वर्ष की होने या 10वीं कक्षा उत्तीर्ण करने के बाद उच्च शिक्षा के खर्च हेतु खाते में जमा राशि का 50% तक निकाला जा सकता है।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'खाता खोलने की शर्तें एवं पारिवारिक सीमा',
      eligibility: [
        { title: 'आयु सीमा', text: 'बालिका की आयु 10 वर्ष पूरी होने से पूर्व माता-पिता या कानूनी अभिभावक द्वारा खाता खोला जाना अनिवार्य है।' },
        { title: 'नागरिकता/अधिवास', text: 'बालिका का भारत की निवासी नागरिक होना अनिवार्य है।' },
        { title: 'प्रति परिवार खाते', text: 'प्रति परिवार अधिकतम 2 खाते (प्रत्येक बालिका के लिए एक); जुड़वां या तीन बच्चियां होने पर तीसरे खाते की अनुमति है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'चरणबद्ध खाता खोलने की प्रक्रिया',
      sec4Sub: 'डाकघर अथवा बैंक शाखा में 4-चरणीय सरल प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'फॉर्म-1 आवेदन', text: 'किसी भी डाकघर या अधिकृत बैंक से SSY खाता खोलने का फॉर्म (फॉर्म-1) प्राप्त कर भरें।' },
        { step: 'चरण 02', title: 'दस्तावेज़ सत्यापन', text: 'बालिका का जन्म प्रमाण पत्र और अभिभावक का पहचान/पता प्रमाण पत्र (आधार/पैन) जमा करें।' },
        { step: 'चरण 03', title: 'प्रारंभिक जमा', text: 'खाता सक्रिय करने और पासबुक प्राप्त करने हेतु न्यूनतम ₹250 की प्रारंभिक राशि जमा करें।' },
        { step: 'चरण 04', title: 'पासबुक एवं वार्षिक जमा', text: 'आधिकारिक पासबुक प्राप्त करें; 15 वर्षों तक नियमित अंशदान करें और 21 वर्ष पर 100% कर-मुक्त परिपक्वता पाएं।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'जमा एवं परिपक्वता नियम',
      sec5Sub: 'वार्षिक निवेश सीमाएं एवं परिपक्वता अवधि',
      datesBadge: 'दीर्घकालिक कर-मुक्त बचत',
      datesHeading: 'जमा एवं परिपक्वता समय-सीमा',
      datesRange: '15 वर्ष जमा अवधि | 21 वर्ष कुल खाता परिपक्वता',
      datesNote: 'न्यूनतम जमा: ₹250 प्रति वित्तीय वर्ष। अधिकतम जमा: ₹1.5 लाख प्रति वित्तीय वर्ष। खाता खोलने की तारीख से 15 वर्ष तक जमा किया जाता है। खाता 21 वर्ष पूरे होने पर, अथवा 18 वर्ष की आयु के बाद विवाह होने पर परिपक्व होता है। खाता खोलने का स्थान: कोई भी डाकघर, सार्वजनिक क्षेत्र के बैंक अथवा अधिकृत निजी बैंक (HDFC, ICICI, Axis)।',
      sec6Num: '6.0',
      sec6Title: 'आधिकारिक स्रोत एवं सत्यापन',
      sec6Sub: 'वित्त मंत्रालय एवं डाक विभाग के आधिकारिक दस्तावेज़',
      sourcesNote: 'इस पृष्ठ पर प्रस्तुत जानकारी सीधे भारत सरकार के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'राष्ट्रीय बचत संस्थान, वित्त मंत्रालय', url: 'https://www.nsiindia.gov.in' },
        { label: 'डाक विभाग, इंडिया पोस्ट आधिकारिक पोर्टल', url: 'https://www.indiapost.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'खाता खोलने के फॉर्म-1 के साथ संलग्न किए जाने वाले दस्तावेज़',
      requiredDocuments: [
        { title: 'बालिका का जन्म प्रमाण पत्र', desc: 'नगर निगम अथवा जन्म रजिस्ट्रार द्वारा जारी मूल प्रमाण पत्र' },
        { title: 'माता-पिता/अभिभावक का पहचान व निवास प्रमाण', desc: 'आधार कार्ड, पैन कार्ड, पासपोर्ट अथवा वोटर आईडी' },
        { title: 'बालिका का पासपोर्ट आकार का फोटो', desc: 'बालिका एवं अभिभावक के हालिया पासपोर्ट साइज फोटो' },
        { title: 'SSY खाता खोलने का फॉर्म (फॉर्म-1)', desc: 'डाकघर अथवा बैंक से प्राप्त पूर्ण भरा हुआ फॉर्म-1' }
      ],
      docsAlert: 'महत्वपूर्ण निर्देश: खाते को सक्रिय रखने के लिए हर साल न्यूनतम ₹250 जमा करना अनिवार्य है; ऐसा न करने पर जुर्माना लगता है। ब्याज दर सरकार द्वारा त्रैमासिक संशोधन के अधीन है — 8.2% की दर पूरे 21 साल के लिए तय नहीं है। निवेश से पहले अपने डाकघर, बैंक या आधिकारिक राष्ट्रीय बचत संस्थान पृष्ठ पर वर्तमान दर की पुष्टि अवश्य करें।'
    },
    mr: {
      title: 'सुकन्या समृद्धी योजना (SSY)',
      dept: 'राष्ट्रीय बचत संस्था, वित्त मंत्रालय व टपाल विभाग, भारत सरकार',
      badge: 'बालिका बचत योजना',
      verifiedBadge: 'सार्वभौम हमी योजना (भारत सरकार)',
      dbtBadge: 'सर्वोच्च अल्पबचत व्याजदर (८.२% वार्षिक)',
      refCode: 'पोर्टल संदर्भ: SSY-GOI2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक सुरक्षितता',
      benefitsHighlight: 'मुलींसाठी उच्च व्याज देणारी सुरक्षित सरकारी बचत योजना — सध्या ८.२% वार्षिक (वार्षिक चक्रवाढ, १००% करमुक्त EEE)',
      applyOnline: 'पोस्ट ऑफिस / बँकेत खाते उघडा',
      autofillReady: 'राष्ट्रीय बचत संस्था',
      backToCategory: 'महिला व बाल विकास योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'बेटी बचाओ, बेटी पढाओ उपक्रमांतर्गत मुलींच्या भविष्यासाठी समर्पित बचत योजना',
      overview: "२२ जानेवारी २०१५ रोजी 'बेटी बचाओ, बेटी पढाओ' मोहिमेअंतर्गत सुरू झालेली SSY ही राष्ट्रीय अल्पबचत निधी (NSSF) अंतर्गत चालवली जाणारी विशेष योजना आहे, जी मुलींचे उच्च शिक्षण आणि विवाहाचा खर्च सुरक्षित करण्यासाठी आखण्यात आली आहे. ही योजना सरकार-समर्थित अल्पबचत साधनांमध्ये सर्वाधिक व्याजदरांपैकी एक देते, ज्यामध्ये ठेवी, मिळणारे व्याज आणि मुदतपूर्तीची रक्कम पूर्णपणे करमुक्त (EEE स्टेटस) असते.",
      facts: [
        { label: 'पात्र लाभार्थी', value: '१० वर्षांपेक्षा कमी वयाची भारतीय रहिवासी मुलगी' },
        { label: 'सध्याचा व्याजदर', value: '८.२% वार्षिक (वार्षिक चक्रवाढ, त्रैमासिक आढावा)' },
        { label: 'कर सवलत (Tax Status)', value: 'कलम 80C अंतर्गत १००% करमुक्त (EEE दर्जा)' },
        { label: 'संचालक यंत्रणा', value: 'इंडिया पोस्ट (टपाल कार्यालये), राष्ट्रीयकृत बँका व निवडक खाजगी बँका' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व सवलती',
      sec2Sub: 'हमीभाव व्याजदर, करमुक्त परतावा आणि दीर्घकालीन चक्रवाढीचा फायदा',
      keyBenefits: [
        {
          title: 'उच्च व हमीभाव व्याजदर',
          text: 'सध्या दरवर्षी ८.२% (वार्षिक चक्रवाढ) — सर्व सरकारी अल्पबचत योजनांमध्ये सर्वोत्तम व्याजदरांपैकी एक, ज्याचा वित्त मंत्रालयाकडून दर तीन महिन्यांनी आढावा घेतला जातो.'
        },
        {
          title: 'करमुक्त परतावा (EEE Status)',
          text: 'गुंतवणुकीवर कलम 80C अंतर्गत सवलत मिळते (वार्षिक ₹१.५ लाखांपर्यंत), आणि मिळणारे व्याज व मुदतपूर्तीची संपूर्ण रक्कम १००% करमुक्त असते.'
        },
        {
          title: 'दीर्घकालीन चक्रवाढीचा फायदा',
          text: 'महिन्याच्या ५ तारखेपासून ते महिन्याच्या शेवटपर्यंतच्या किमान शिल्लक रकमेवर व्याजाची गणना होते आणि वार्षिक जमा होते — महिन्याच्या ५ तारखेपूर्वी पैसे भरल्यास जास्तीत जास्त परतावा मिळतो.'
        },
        {
          title: 'शिक्षणासाठी ५०% रक्कम काढण्याची मुभा',
          text: 'मुलगी १८ वर्षांची झाल्यावर किंवा १०वी उत्तीर्ण झाल्यावर उच्च शिक्षणाच्या खर्चासाठी खात्यातील ५०% रक्कम काढता येते.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'अनिवार्य पात्रता निकष',
      sec3Sub: 'खाते उघडण्यासाठी आवश्यक वयोमर्यादा व नियम',
      eligibility: [
        { title: 'वयोमर्यादा', text: 'मुलगी १० वर्षांची होण्यापूर्वी पालक किंवा कायदेशीर पालकांनी खाते उघडणे आवश्यक.' },
        { title: 'नागरिकत्व', text: 'मुलगी भारताची रहिवासी नागरिक असणे बंधनकारक आहे.' },
        { title: 'प्रति कुटुंब खाती', text: 'एका कुटुंबात कमाल २ खाती (प्रत्येक मुलीसाठी एक); जुळ्या किंवा तिळ्या मुली असल्यास तिसऱ्या खात्यास परवानगी.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'टप्प्याटप्प्याने खाते उघडण्याची प्रक्रिया',
      sec4Sub: 'टपाल कार्यालय किंवा बँकेत ४-टप्प्यांची सोपी प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'फॉर्म-१ अर्ज', text: 'कोणत्याही पोस्ट ऑफिस किंवा अधिकृत बँकेतून SSY खाते उघडण्याचा फॉर्म-१ मिळवून भरा.' },
        { step: 'टप्पा ०२', title: 'कागदपत्र पडताळणी', text: 'मुलीचे जन्म प्रमाणपत्र आणि पालकांचा ओळख/पत्ता पुरावा (आधार/पॅन) सादर करा.' },
        { step: 'टप्पा ०३', title: 'प्राथमिक ठेव', text: 'खाते सुरू करण्यासाठी आणि पासबुक मिळवण्यासाठी किमान ₹२५० ची प्राथमिक ठेव भरा.' },
        { step: 'टप्पा ०४', title: 'पासबुक व वार्षिक ठेव', text: 'अधिकृत पासबुक मिळवा; १५ वर्षे नियमित रक्कम भरा आणि २१ वर्षांनंतर करमुक्त परतावा मिळवा.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'ठेव आणि मुदतपूर्तीचे नियम',
      sec5Sub: 'वार्षिक गुंतवणूक मर्यादा आणि कालावधी',
      datesBadge: 'दीर्घकालीन करमुक्त बचत',
      datesHeading: 'ठेव आणि मुदतपूर्ती वेळापत्रक',
      datesRange: '१५ वर्षे ठेव भरण्याचा कालावधी | २१ वर्षे एकूण खाते मुदत',
      datesNote: 'किमान ठेव: ₹२५० प्रति आर्थिक वर्ष. कमाल ठेव: ₹१.५ लाख प्रति आर्थिक वर्ष. खाते उघडल्यापासून १५ वर्षे रक्कम भरावी लागते. खाते २१ वर्षांनंतर किंवा १८ व्या वर्षानंतर मुलीच्या विवाहप्रसंगी मुदतपूर्व बंद करता येते. कुठे उघडावे: कोणतेही पोस्ट ऑफिस, सार्वजनिक क्षेत्रातील बँका किंवा निवडक खाजगी बँका (HDFC, ICICI, Axis).',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'वित्त मंत्रालय व टपाल विभागाची अधिकृत माहिती',
      sourcesNote: 'या पृष्ठावरील माहिती थेट भारत सरकारच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'राष्ट्रीय बचत संस्था, वित्त मंत्रालय', url: 'https://www.nsiindia.gov.in' },
        { label: 'टपाल विभाग, इंडिया पोस्ट अधिकृत पोर्टल', url: 'https://www.indiapost.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'खाते उघडण्यासाठी अर्जासोबत जोडावयाची कागदपत्रे',
      requiredDocuments: [
        { title: 'मुलीचे जन्म प्रमाणपत्र', desc: 'महानगरपालिका किंवा जन्म नोंदणी निबंधकांनी दिलेला अधिकृत दाखला' },
        { title: 'पालकांचा ओळख व पत्ता पुरावा', desc: 'आधार कार्ड, पॅन कार्ड, पासपोर्ट किंवा मतदार ओळखपत्र' },
        { title: 'मुलीचा पासपोर्ट आकाराचा फोटो', desc: 'मुलगी आणि पालकांचे अलीकडील पासपोर्ट आकाराचे फोटो' },
        { title: 'SSY खाते उघडण्याचा फॉर्म-१', desc: 'बँक किंवा पोस्ट ऑफिसमधून मिळणारा पूर्ण भरलेला फॉर्म-१' }
      ],
      docsAlert: 'महत्त्वाच्या अटी: खाते सक्रिय ठेवण्यासाठी दरवर्षी किमान ₹२५० जमा करणे बंधनकारक आहे; न भरल्यास दंड आकारला जातो. व्याजदराचा सरकारकडून दर तीन महिन्यांनी आढावा घेतला जातो — ८.२% दर संपूर्ण २१ वर्षांसाठी निश्चित नसतो. गुंतवणुकीपूर्वी पोस्ट ऑफिस किंवा अधिकृत राष्ट्रीय बचत संस्था संकेतस्थळावर सध्याचा दर तपासा.'
    }
  },
  h1: {
    en: {
      title: 'Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)',
      dept: 'National Health Authority (NHA), Ministry of Health & Family Welfare, Government of India',
      badge: 'Cashless Health Assurance',
      verifiedBadge: "WORLD'S LARGEST HEALTH ASSURANCE SCHEME",
      dbtBadge: '100% CASHLESS & PAPERLESS TREATMENT',
      refCode: 'Portal Ref: PMJAY-NHA2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL COVERAGE',
      benefitsHighlight: 'Cashless Health Insurance — up to ₹5 lakh per family per year, with no cap on family size, age, or gender',
      applyOnline: 'Check Eligibility Online (beneficiary.nha.gov.in)',
      autofillReady: 'National Health Authority',
      backToCategory: 'Back to Healthcare Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: "World's largest government-funded health assurance scheme covering 55 crore beneficiaries",
      overview: "Launched on 23 September 2018 from Ranchi, PM-JAY is the world's largest government-funded health assurance scheme, covering roughly 55 crore beneficiaries from the bottom 40% of India's population — larger by population than the US's Obamacare or Germany's statutory health insurance. As of the latest expansion, West Bengal became the 36th State/UT to implement the scheme. It's implemented nationally by the National Health Authority (NHA) and locally by State Health Agencies (SHAs).",
      facts: [
        { label: 'Beneficiary Population', value: 'Bottom 40% of India (~55 Crore citizens / 12 Crore families)' },
        { label: 'Annual Entitlement', value: '₹5,00,000 per family per year (Family Floater basis)' },
        { label: 'Package Procedures', value: '1,961 medical & surgical procedures across 27 specialities' },
        { label: 'Hospital Network', value: 'Empaneled Public & Private Hospitals nationwide with portability' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Zero out-of-pocket expenses, comprehensive treatments and senior citizen top-up',
      keyBenefits: [
        {
          title: 'Cashless & Paperless Treatment',
          text: 'Free treatment at any public or empaneled private hospital across India — beneficiaries pay nothing at the point of care.'
        },
        {
          title: 'Comprehensive Package Coverage',
          text: 'Covers 1,961 medical procedures across 27 specialities including cardiology, oncology, neurosurgery, orthopaedics, urology, and burns management. Includes medical consultations, medicines, diagnostics, ICU charges, surgery, and food/lodging during hospitalization.'
        },
        {
          title: 'Pre & Post-Hospitalization Cover',
          text: '3 days of pre-hospitalization and 15 days of post-hospitalization expenses (diagnostics, consultations, medicines) are included.'
        },
        {
          title: 'Pre-Existing Conditions Covered from Day 1',
          text: 'No waiting period whatsoever — unlike most private health insurance policies, all pre-existing illnesses are covered immediately.'
        },
        {
          title: 'Nationwide Portability',
          text: 'A beneficiary identified in one state can use the benefit at any empaneled hospital anywhere across India without restriction.'
        },
        {
          title: 'Senior Citizen Top-Up (Ayushman Vay Vandana Card)',
          text: 'All citizens aged 70+ are covered up to ₹5 lakh regardless of income. Seniors already in a PM-JAY-covered family get an additional ₹5 lakh top-up just for themselves; other seniors 70+ get ₹5 lakh cover on a family basis.'
        },
        {
          title: 'No Premium, No Co-payment',
          text: 'Entirely free for the beneficiary — no enrolment fee, no premium contribution, and no co-pay at the point of treatment.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Eligibility Criteria',
      sec3Sub: 'Deprivation-based automatic eligibility criteria under SECC-2011',
      eligibility: [
        { title: 'Automatic SECC-2011 Determination', text: "Eligibility is determined automatically from the Socio-Economic Caste Census 2011 (SECC-2011) deprivation criteria — there's no income-based application process for the base scheme." },
        { title: 'Rural Household Criteria', text: 'Identified via 6 deprivation criteria (e.g., no adult member aged 16–59, female-headed households with no adult male, manual scavenger households, landless households deriving major income from manual casual labour).' },
        { title: 'Urban Occupational Categories', text: 'Identified via 11 defined occupational categories (e.g., rag pickers, domestic workers, street vendors, construction workers, transport workers, sanitation workers).' },
        { title: 'Senior Citizens 70+ Universal Cover', text: 'All citizens aged 70 and above are automatically eligible regardless of socio-economic status or income, via the Ayushman Vay Vandana Card.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Application & Verification Process',
      sec4Sub: 'Simple 4-step verification and Ayushman Card generation process',
      applicationSteps: [
        { step: 'Step 01', title: 'Check Eligibility', text: 'Visit "Am I Eligible" portal on beneficiary.nha.gov.in or the Ayushman App and search using Mobile Number, Ration Card ID, or Aadhaar.' },
        { step: 'Step 02', title: 'Aadhaar e-KYC Verification', text: 'Authenticate identity via Aadhaar OTP / Biometric verification at an authorized Common Service Centre (CSC) or hospital.' },
        { step: 'Step 03', title: 'Ayushman Card Issuance', text: 'Download your digital Ayushman Card with unique PM-JAY ID or collect physical card at CSC or hospital kiosk.' },
        { step: 'Step 04', title: 'Avail Cashless Hospitalization', text: 'Present your Ayushman Card at the "Ayushman Mitra" desk of any empaneled public or private hospital across India.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Funding Pattern & Helpline Support',
      sec5Sub: 'Centre-State financial partnership and 24x7 citizen support',
      datesBadge: 'National Coverage & Annual Floater',
      datesHeading: 'Funding Pattern & Coverage Cycle',
      datesRange: '60:40 Centre:State | 90:10 NE & Himalayan | 100% UTs without Legislature',
      datesNote: 'Funding Pattern: 60:40 (Centre:State) for general states and UTs with legislature; 90:10 for North-Eastern and Himalayan states; 100% central funding for UTs without legislature. Benefit renews annually on a floater basis up to ₹5,00,000 per family. National Toll-free Helpline: 14555.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'National Health Authority and Ministry of Health portals',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of India portals:',
      sources: [
        { label: 'National Health Authority — beneficiary.nha.gov.in', url: 'https://beneficiary.nha.gov.in' },
        { label: 'Ministry of Health & Family Welfare', url: 'https://www.mohfw.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Identity and family verification documents for e-KYC and Ayushman card issuance',
      requiredDocuments: [
        { title: 'Aadhaar Card', desc: 'Mandatory for biometric/OTP e-KYC authentication and beneficiary identity verification' },
        { title: 'Ration Card / Family ID', desc: 'Valid state ration card or family ID details to confirm SECC-linked family composition' },
        { title: 'Active Mobile Number', desc: 'Required for OTP generation, e-KYC completion, and card issuance notifications' }
      ],
      docsAlert: 'Important Notes: AB PM-JAY does not require any application fee, enrollment fee, or paid intermediary. Beware of fraudulent agencies asking for money to issue Ayushman cards. Free Ayushman cards can be generated via beneficiary.nha.gov.in, the official Ayushman App, or any authorized CSC / Ayushman Mitra kiosk at empaneled hospitals. For queries or grievances, call 14555.'
    },
    hi: {
      title: 'आयुष्मान भारत – प्रधानमंत्री जन आरोग्य योजना (AB PM-JAY)',
      dept: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA), स्वास्थ्य एवं परिवार कल्याण मंत्रालय, भारत सरकार',
      badge: 'कैशलेस स्वास्थ्य सुरक्षा',
      verifiedBadge: 'विश्व की सबसे बड़ी स्वास्थ्य सुरक्षा योजना',
      dbtBadge: '100% कैशलेस एवं पेपरलेस उपचार',
      refCode: 'पोर्टल संदर्भ: PMJAY-NHA2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सुरक्षा',
      benefitsHighlight: 'कैशलेस स्वास्थ्य बीमा — प्रति परिवार प्रति वर्ष ₹5 लाख तक (परिवार के आकार, आयु या लिंग पर कोई सीमा नहीं)',
      applyOnline: 'पात्रता की ऑनलाइन जांच करें (beneficiary.nha.gov.in)',
      autofillReady: 'राष्ट्रीय स्वास्थ्य प्राधिकरण',
      backToCategory: 'स्वास्थ्य सेवाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'भारत के 55 करोड़ नागरिकों को कवर करने वाली दुनिया की सबसे बड़ी सरकारी स्वास्थ्य आश्वासन योजना',
      overview: '23 सितंबर 2018 को रांची से शुरू की गई PM-JAY दुनिया की सबसे बड़ी सरकारी वित्तपोषित स्वास्थ्य सुरक्षा योजना है, जो भारत की 40% आबादी के लगभग 55 करोड़ लाभार्थियों को कवर करती है — जो अमेरिका के ओबामाकेयर या जर्मनी के वैधानिक स्वास्थ्य बीमा से भी बड़ी है। नवीनतम विस्तार के अनुसार, पश्चिम बंगाल इस योजना को लागू करने वाला 36वां राज्य/केंद्र शासित प्रदेश बन गया। यह राष्ट्रीय स्तर पर राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA) और राज्य स्तर पर राज्य स्वास्थ्य एजेंसियों (SHAs) द्वारा कार्यान्वित है।',
      facts: [
        { label: 'लक्षित जनसंख्या', value: 'भारत की निचली 40% आबादी (~55 करोड़ नागरिक / 12 करोड़ परिवार)' },
        { label: 'वार्षिक सुरक्षा', value: '₹5,00,000 प्रति परिवार प्रति वर्ष (फैमिली फ्लोटर आधार)' },
        { label: 'चिकित्सा पैकेज', value: '27 विशेषताओं में 1,961 चिकित्सा एवं सर्जिकल प्रक्रियाएं' },
        { label: 'अस्पताल नेटवर्क', value: 'देश भर के सभी सूचीबद्ध सरकारी एवं निजी अस्पताल (पोर्टेबिलिटी सहित)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'शून्य जेब खर्च, गंभीर बीमारियों का व्यापक इलाज एवं वरिष्ठ नागरिकों हेतु टॉप-अप',
      keyBenefits: [
        {
          title: 'कैशलेस एवं पेपरलेस उपचार',
          text: 'पूरे भारत में किसी भी सार्वजनिक या सूचीबद्ध निजी अस्पताल में निःशुल्क उपचार — लाभार्थियों को अस्पताल में भर्ती के समय कोई भुगतान नहीं करना पड़ता।'
        },
        {
          title: 'व्यापक प्रक्रिया कवरेज',
          text: 'कार्डियोलॉजी, ऑन्कोलॉजी, न्यूरोसर्जरी, ऑर्थोपेडिक्स, यूरोलॉजी और बर्न मैनेजमेंट सहित 27 विशेषताओं में 1,961 चिकित्सा प्रक्रियाओं को कवर करता है। इसमें परामर्श, दवाएं, डायग्नोस्टिक्स, आईसीयू, सर्जरी और भोजन/आवास शामिल हैं।'
        },
        {
          title: 'अस्पताल में भर्ती से पूर्व व बाद का खर्च',
          text: 'अस्पताल में भर्ती से 3 दिन पहले और छुट्टी मिलने के 15 दिन बाद तक के खर्च (जांच, दवाएं) योजना में शामिल हैं।'
        },
        {
          title: 'पहले दिन से पहले से मौजूद बीमारियों का कवरेज',
          text: 'निजी स्वास्थ्य बीमा पॉलिसियों के विपरीत कोई प्रतीक्षा अवधि (waiting period) नहीं है — सभी पूर्व-मौजूदा बीमारियां पहले दिन से कवर होती हैं।'
        },
        {
          title: 'राष्ट्रव्यापी पोर्टेबिलिटी',
          text: 'एक राज्य में पहचाना गया लाभार्थी पूरे भारत में किसी भी सूचीबद्ध अस्पताल में बिना किसी परेशानी के लाभ ले सकता है।'
        },
        {
          title: 'वरिष्ठ नागरिक टॉप-अप (आयुष्मान वय वंदना कार्ड)',
          text: '70 वर्ष और उससे अधिक आयु के सभी नागरिकों को आय की परवाह किए बिना ₹5 लाख तक का कवर मिलता है। पहले से कवर परिवारों के वरिष्ठों को ₹5 लाख का अतिरिक्त टॉप-अप मिलता है।'
        },
        {
          title: 'कोई प्रीमियम नहीं, कोई सह-भुगतान नहीं',
          text: 'लाभार्थी के लिए पूरी तरह निःशुल्क — कोई नामांकन शुल्क नहीं, कोई प्रीमियम योगदान नहीं और उपचार के समय कोई को-पेमेंट नहीं।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'SECC-2011 अभाव मानदंडों पर आधारित स्वचालित पात्रता',
      eligibility: [
        { title: 'स्वचालित SECC-2011 निर्धारण', text: 'पात्रता स्वचालित रूप से सामाजिक-आर्थिक जाति जनगणना 2011 (SECC-2011) के अभाव मानदंडों से तय होती है — आधार योजना के लिए कोई आवेदन प्रक्रिया नहीं है।' },
        { title: 'ग्रामीण परिवारों हेतु मानदंड', text: '6 अभाव श्रेणियों द्वारा पहचाने गए (जैसे: 16-59 आयु का कोई वयस्क पुरुष न होना, मैला ढोने वाले परिवार, भूमिहीन दिहाड़ी मजदूर परिवार)।' },
        { title: 'शहरी परिवारों हेतु श्रेणियां', text: '11 व्यावसायिक श्रेणियों द्वारा चिन्हित (जैसे: कचरा बीनने वाले, घरेलू कामगार, रेहड़ी-पटरी वाले, निर्माण मजदूर, स्वच्छता कार्यकर्ता)।' },
        { title: '70+ वर्ष के वरिष्ठ नागरिक', text: 'आयुष्मान वय वंदना कार्ड के माध्यम से आय की परवाह किए बिना 70 वर्ष से अधिक आयु के सभी नागरिक स्वतः पात्र हैं।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'सत्यापन एवं कार्ड प्राप्ति प्रक्रिया',
      sec4Sub: '4-चरणीय सरल प्रमाणीकरण एवं आयुष्मान कार्ड डाउनलोड प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'पात्रता की जांच करें', text: 'beneficiary.nha.gov.in पर "Am I Eligible" टूल या आयुष्मान ऐप पर मोबाइल नंबर, राशन कार्ड या आधार से जांचें।' },
        { step: 'चरण 02', title: 'आधार e-KYC प्रमाणीकरण', text: 'नजदीकी सीएससी केंद्र, सूचीबद्ध अस्पताल या ऐप पर आधार ओटीपी / बायोमेट्रिक e-KYC पूर्ण करें।' },
        { step: 'चरण 03', title: 'आयुष्मान कार्ड प्राप्त करें', text: 'सत्यापन उपरांत अपनी विशिष्ट PM-JAY आईडी के साथ डिजिटल आयुष्मान कार्ड डाउनलोड करें या सीएससी से प्राप्त करें।' },
        { step: 'चरण 04', title: 'कैशलेस उपचार प्राप्त करें', text: 'किसी भी सूचीबद्ध अस्पताल के "आयुष्मान मित्र" डेस्क पर अपना कार्ड प्रस्तुत कर कैशलेस भर्ती व उपचार कराएं।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'फंडिंग पैटर्न एवं हेल्पलाइन सहायता',
      sec5Sub: 'केंद्र-राज्य वित्तीय साझेदारी एवं 24x7 नागरिक सहायता',
      datesBadge: 'राष्ट्रीय कवरेज एवं वार्षिक फ्लोटर',
      datesHeading: 'फंडिंग व्यवस्था एवं नवीनीकरण',
      datesRange: '60:40 केंद्र:राज्य | 90:10 पूर्वोत्तर व हिमालयी | 100% केंद्र शासित प्रदेश',
      datesNote: 'फंडिंग व्यवस्था: विधायिका वाले राज्यों/केंद्र शासित प्रदेशों के लिए 60:40 (केंद्र:राज्य); पूर्वोत्तर और हिमालयी राज्यों के लिए 90:10; विधायिका रहित केंद्र शासित प्रदेशों के लिए 100% केंद्रीय वित्त पोषण। योजना प्रति परिवार ₹5,00,000 की वार्षिक फ्लोटर सीमा पर स्वतः नवीनीकृत होती है। हेल्पलाइन: 14555।',
      sec6Num: '6.0',
      sec6Title: 'अधिकृत स्रोत व सत्यापन',
      sec6Sub: 'राष्ट्रीय स्वास्थ्य प्राधिकरण एवं स्वास्थ्य मंत्रालय के आधिकारिक पोर्टल',
      sourcesNote: 'इस पृष्ठ पर दी गई जानकारी सीधे भारत सरकार के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'राष्ट्रीय स्वास्थ्य प्राधिकरण — beneficiary.nha.gov.in', url: 'https://beneficiary.nha.gov.in' },
        { label: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय', url: 'https://www.mohfw.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'e-KYC और आयुष्मान कार्ड जारी करने हेतु आवश्यक प्रमाण',
      requiredDocuments: [
        { title: 'आधार कार्ड', desc: 'बायोमेट्रिक अथवा ओटीपी आधारित पहचान सत्यापन (e-KYC) हेतु अनिवार्य' },
        { title: 'राशन कार्ड / परिवार पहचान पत्र', desc: 'SECC से जुड़े परिवार के सदस्यों का विवरण और पात्रता प्रमाणित करने हेतु' },
        { title: 'सक्रिय मोबाइल नंबर', desc: 'ओटीपी सत्यापन और कार्ड जनरेशन संबंधी सूचनाएं प्राप्त करने हेतु' }
      ],
      docsAlert: 'महत्वपूर्ण सूचना: आयुष्मान भारत PM-JAY योजना पूरी तरह निःशुल्क है। कार्ड बनवाने के नाम पर पैसे मांगने वाले अनधिकृत व्यक्तियों या फर्जी वेबसाइटों से सावधान रहें। कार्ड beneficiary.nha.gov.in, आयुष्मान ऐप या सूचीबद्ध अस्पताल के आयुष्मान मित्र केंद्र से निःशुल्क बनवाएं। सहायता हेतु राष्ट्रीय हेल्पलाइन 14555 पर संपर्क करें।'
    },
    mr: {
      title: 'आयुष्मान भारत – प्रधानमंत्री जन आरोग्य योजना (AB PM-JAY)',
      dept: 'राष्ट्रीय आरोग्य प्राधिकरण (NHA), आरोग्य आणि कुटुंब कल्याण मंत्रालय, भारत सरकार',
      badge: 'कॅशलेस आरोग्य सुरक्षा',
      verifiedBadge: 'जगातील सर्वात मोठी आरोग्य हमी योजना',
      dbtBadge: '१००% कॅशलेस आणि कागदपत्र विरहित उपचार',
      refCode: 'पोर्टल संदर्भ: PMJAY-NHA2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक संरक्षण',
      benefitsHighlight: 'कॅशलेस आरोग्य विमा — प्रति कुटुंब प्रति वर्ष ₹५ लाखांपर्यंत (कुटुंबाचा आकार, वय किंवा लिंगाची कोणतीही मर्यादा नाही)',
      applyOnline: 'पात्रता ऑनलाइन तपासा (beneficiary.nha.gov.in)',
      autofillReady: 'राष्ट्रीय आरोग्य प्राधिकरण',
      backToCategory: 'आरोग्य सेवा योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'भारतातील ५५ कोटी नागरिकांना मोफत आरोग्य हमी देणारी जगातील सर्वात मोठी योजना',
      overview: '२३ सप्टेंबर २०१८ रोजी रांची येथून सुरू झालेली PM-JAY ही जगातील सर्वात मोठी सरकारी आरोग्य हमी योजना आहे, ज्यामध्ये भारतातील खालच्या ४०% लोकसंख्येतील सुमारे ५५ कोटी लाभार्थी समाविष्ट आहेत — ही अमेरिकेच्या ओबामाकेअर किंवा जर्मनीच्या वैधानिक आरोग्य विम्याच्या लोकसंख्येपेक्षाही मोठी आहे. ताज्या विस्तारानुसार, पश्चिम बंगाल ही योजना लागू करणारे ३६ वे राज्य/केंद्रशासित प्रदेश ठरले. राष्ट्रीय स्तरावर NHA आणि राज्य स्तरावर राज्य आरोग्य यंत्रणेद्वारे (SHA) ही राबवली जाते.',
      facts: [
        { label: 'लक्षित लोकसंख्या', value: 'भारतातील तळाची ४०% लोकसंख्या (~५५ कोटी नागरिक / १२ कोटी कुटुंबे)' },
        { label: 'वार्षिक संरक्षण मर्यादा', value: '₹५,००,००० प्रति कुटुंब प्रति वर्ष (फॅमिली फ्लोटर तत्त्वावर)' },
        { label: 'उपचार पॅकेजेस', value: '२७ विशेष विभागांमधील १,९६१ वैद्यकीय व शस्त्रक्रिया प्रक्रिया' },
        { label: 'रुग्णालय नेटवर्क', value: 'देशभरातील सर्व नोंदणीकृत शासकीय व खाजगी रुग्णालये (पोर्टेबिलिटी)' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व फायदे',
      sec2Sub: 'शून्य खर्च, गंभीर आजारांवर उपचार आणि ज्येष्ठ नागरिकांना अतिरिक्त टॉप-अप',
      keyBenefits: [
        {
          title: 'कॅशलेस आणि पेपरलेस उपचार',
          text: 'भारतातील कोणत्याही शासकीय किंवा नोंदणीकृत खाजगी रुग्णालयात मोफत उपचार — उपचाराच्या वेळी लाभार्थ्यांना एकही रुपया द्यावा लागत नाही.'
        },
        {
          title: 'सर्वसमावेशक पॅकेज संरक्षण',
          text: 'कार्डिओलॉजी, ऑन्कोलॉजी, न्यूरोसर्जरी, ऑर्थोपेडिक्स, युरोलॉजी आणि बर्न्स व्यवस्थापनासह २७ विशेष विभागांतील १,९६१ वैद्यकीय प्रक्रियांचा समावेश. यामध्ये तपासण्या, औषधे, आयसीयू, शस्त्रक्रिया व भोजन समाविष्ट आहे.'
        },
        {
          title: 'दाखल होण्यापूर्वी व नंतरचा खर्च',
          text: 'रुग्णालयात दाखल होण्यापूर्वीचे ३ दिवस आणि डिस्चार्जनंतरचे १५ दिवसांचे खर्च (तपासण्या, औषधे) योजनेत समाविष्ट आहेत.'
        },
        {
          title: 'पहिल्या दिवसापासून जुने आजार समाविष्ट',
          text: 'खाजगी विम्याच्या उलट कोणताही वेटिंग पिरियड नाही — सर्व जुने व पूर्वनियोजित आजार पहिल्या दिवसापासून पूर्णपणे कव्हर केले जातात.'
        },
        {
          title: 'देशव्यापी पोर्टेबिलिटी',
          text: 'एका राज्यातील पात्र लाभार्थी देशभरातील कोणत्याही नोंदणीकृत रुग्णालयात थेट मोफत उपचाराचा लाभ घेऊ शकतो.'
        },
        {
          title: 'ज्येष्ठ नागरिक टॉप-अप (आयुष्मान वय वंदना कार्ड)',
          text: '७० वर्षे आणि त्याहून अधिक वयाच्या सर्व नागरिकांना उत्पन्नाची कोणतीही अट न ठेवता ₹५ लाखांपर्यंतचे कव्हर मिळते. आधीच समाविष्ट कुटुंबातील ज्येष्ठांना स्वतंत्र ₹५ लाखांचा अतिरिक्त टॉप-अप मिळतो.'
        },
        {
          title: 'कोणताही प्रीमियम अथवा सह-पेमेंट नाही',
          text: 'लाभार्थ्यासाठी पूर्णपणे मोफत — कोणतीही नोंदणी फी नाही, कोणताही मासिक प्रीमियम नाही आणि उपचाराच्या वेळी कोणतेही सह-पेमेंट नाही.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'पात्रतेचे निकष',
      sec3Sub: 'SECC-2011 जनगणनेवर आधारित स्वयंचलित निवड प्रक्रिया',
      eligibility: [
        { title: 'स्वयंचलित SECC-2011 निवड', text: 'पात्रता सामाजिक-आर्थिक जात जनगणना २०११ (SECC-2011) च्या आधारे आपोआप ठरवली जाते — मूळ योजनेसाठी कोणताही स्वतंत्र अर्ज करण्याची आवश्यकता नसते.' },
        { title: 'ग्रामीण कुटुंब निकष', text: '६ वंचित श्रेणींद्वारे ओळख (उदा. १६-५९ वयोगटातील प्रौढ नसलेली कुटुंबे, सफाई कामगार कुटुंबे, भूमिहीन शेतमजूर कुटुंबे).' },
        { title: 'शहरी व्यावसायिक प्रवर्ग', text: '११ व्यावसायिक श्रेणींमधील कामगार (उदा. कचरा वेचक, घरकामगार, फेरीवाले, बांधकाम कामगार, स्वच्छता कर्मचारी).' },
        { title: '७०+ वयोगटातील ज्येष्ठ नागरिक', text: 'आयुष्मान वय वंदना कार्डाद्वारे उत्पन्नाची कोणतीही अट न ठेवता ७० वर्षांवरील सर्व ज्येष्ठ नागरिक स्वयंचलितपणे पात्र ठरतात.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'पडताळणी व कार्ड मिळवण्याची पद्धत',
      sec4Sub: '४ टप्प्यांत सोपी पडताळणी आणि आयुष्मान कार्ड मिळवा',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'पात्रता तपासा', text: 'beneficiary.nha.gov.in वरील "Am I Eligible" किंवा आयुष्मान ॲपवर जाऊन मोबाईल, रेशन कार्ड किंवा आधार क्रमांकाने पात्रता तपासा.' },
        { step: 'टप्पा ०२', title: 'आधार e-KYC पडताळणी', text: 'जवळच्या सीएससी केंद्रावर, रुग्णालयात किंवा ॲपवरून आधार ओटीपी / बायोमेट्रिक e-KYC पूर्ण करा.' },
        { step: 'टप्पा ०३', title: 'आयुष्मान कार्ड प्राप्त करा', text: 'पडताळणीनंतर तुमची विशिष्ट PM-JAY ओळख क्रमांक असलेले डिजिटल आयुष्मान कार्ड डाउनलोड करा.' },
        { step: 'टप्पा ०४', title: 'कॅशलेस उपचार मिळवा', text: 'नोंदणीकृत रुग्णालयातील "आयुष्मान मित्र" कक्षात कार्ड दाखवून त्वरित मोफत उपचार सुरू करा.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'निधी रचना आणि हेल्पलाइन संपर्क',
      sec5Sub: 'केंद्र-राज्य आर्थिक सहभाग आणि २४x७ नागरिक मदत केंद्र',
      datesBadge: 'राष्ट्रीय व्याप्ती व वार्षिक फ्लोटर',
      datesHeading: 'निधी वाटप आणि नूतनीकरण',
      datesRange: '६०:४० केंद्र:राज्य | ९०:१० ईशान्य व हिमालयीन | १००% केंद्रशासित प्रदेश',
      datesNote: 'निधी व्यवस्था: सर्वसाधारण घटक राज्यांसाठी ६०:४० (केंद्र:राज्य); ईशान्य व हिमालयीन राज्यांसाठी ९०:१०; विधीमंडळ नसलेल्या केंद्रशासित प्रदेशांसाठी १००% केंद्रीय निधी. प्रति कुटुंब दरवर्षी ₹५,००,००० ची मर्यादा आपोआप नूतनीकरण होते. राष्ट्रीय हेल्पलाइन: १४५५५.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'राष्ट्रीय आरोग्य प्राधिकरण व आरोग्य मंत्रालयाची संकेतस्थळे',
      sourcesNote: 'या पृष्ठावरील माहिती थेट भारत सरकारच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'राष्ट्रीय आरोग्य प्राधिकरण — beneficiary.nha.gov.in', url: 'https://beneficiary.nha.gov.in' },
        { label: 'आरोग्य आणि कुटुंब कल्याण मंत्रालय', url: 'https://www.mohfw.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'e-KYC आणि कार्ड वितरणासाठी सादर करावयाचे पुरावे',
      requiredDocuments: [
        { title: 'आधार कार्ड', desc: 'बायोमेट्रिक किंवा ओटीपी आधारित e-KYC पडताळणीसाठी अनिवार्य' },
        { title: 'रेशन कार्ड / कौटुंबिक ओळखपत्र', desc: 'SECC नोंदणीशी संबंधित कुटुंबातील सदस्यांची पडताळणी करण्यासाठी' },
        { title: 'सक्रिय मोबाईल क्रमांक', desc: 'ओटीपी पडताळणी आणि कार्ड वितरणाच्या सूचना प्राप्त करण्यासाठी' }
      ],
      docsAlert: 'महत्त्वाची सूचना: AB PM-JAY योजना पूर्णपणे मोफत असून कार्ड काढण्यासाठी कोणतेही शुल्क आकारले जात नाही. पैसे मागणाऱ्या अनधिकृत दलालांपासून किंवा खोट्या संकेतस्थळांपासून सावध राहा. अधिकृत कार्ड beneficiary.nha.gov.in, आयुष्मान ॲप किंवा रुग्णालयातील आयुष्मान मित्र केंद्रावरून मोफत काढा. तक्रारी किंवा माहितीसाठी १४५५५ वर संपर्क साधा.'
    }
  },
  h2: {
    en: {
      title: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)',
      dept: 'Public Health Department, Government of Maharashtra (Integrated with Ayushman Bharat — PM-JAY)',
      badge: 'Maharashtra Health Cover',
      verifiedBadge: 'UNIVERSAL HEALTH COVERAGE (MAHARASHTRA)',
      dbtBadge: 'INTEGRATED WITH AB PM-JAY (FLOATER BASIS)',
      refCode: 'Portal Ref: MJPJAY-MH2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL COVERAGE',
      benefitsHighlight: 'Cashless Health Coverage — up to ₹5 lakh per family per year (combined MJPJAY + AB PM-JAY, floater basis)',
      applyOnline: 'Apply at Empanelled Hospital (phd.maharashtra.gov.in)',
      autofillReady: 'Public Health Department',
      backToCategory: 'Back to Healthcare Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Flagship health assurance scheme providing universal cashless secondary & tertiary hospital care in Maharashtra',
      overview: "Formerly known as Rajiv Gandhi Jeevandayee Arogya Yojana (RGJAY), MJPJAY is a health insurance/assurance scheme run by Maharashtra's Public Health Department, providing cashless medical and surgical treatment to residents through empanelled government and private hospitals. It was integrated with the central Ayushman Bharat – PM-JAY scheme on 1 April 2020, operating in a mixed Insurance and Assurance mode — MJPJAY is fully funded by the Government of Maharashtra, while PM-JAY is jointly funded by the Centre and State in a 60:40 ratio. From 1 July 2024, coverage was expanded from low-income families to the entire population of Maharashtra.",
      facts: [
        { label: 'Beneficiary Scope', value: 'Universal Coverage (Post 1 July 2024 — All families in Maharashtra)' },
        { label: 'Procedures Covered', value: '1,356 Health Benefit Packages across 34 specialities (+ 184 for accident care)' },
        { label: 'Road Accident Cover', value: 'Up to ₹1 Lakh per person per year (Category D patients)' },
        { label: 'Renal Transplant Cover', value: 'Enhanced hospitalization cover up to ₹2.5 Lakh per family per policy annually' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Comprehensive cashless surgical/medical packages, accident care and renal transplant cover',
      keyBenefits: [
        {
          title: 'Wide Financial Cover',
          text: 'Categories A to E (excluding D): ₹5 lakh per family per year on a floater basis, combining MJPJAY and Ayushman Bharat coverage. Category D (road accident patients): ₹1 lakh per person per year.'
        },
        {
          title: 'Extensive Procedure Coverage',
          text: '1,356 Health Benefit Packages across 34 specialities for Categories A–E (excluding D); 184 packages specifically for road accident patients under Category D. Includes cardiac bypass, angioplasty, cancer surgeries, joint replacements, brain/spinal surgeries, and renal transplants.'
        },
        {
          title: 'Family Floater Basis',
          text: 'Family sum insured can be used by one member or shared across the whole family within the policy year.'
        },
        {
          title: '100% Cashless Treatment',
          text: 'No upfront payment at empanelled hospitals — treatment costs are settled directly with the hospital under the scheme.'
        },
        {
          title: 'Renal Transplant Enhancement',
          text: 'Hospitalization cover for renal transplant is enhanced up to ₹2.5 lakh per family per policy annually (under the earlier MJPJAY-only structure; now subsumed within the ₹5 lakh combined cover for most categories).'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Eligibility Criteria',
      sec3Sub: 'Universal coverage for permanent residents of Maharashtra with valid documentation',
      eligibility: [
        { title: 'Maharashtra Domicile / Residency', text: 'Permanent resident of Maharashtra with valid state-issued address proof or domicile.' },
        { title: 'Universal Coverage (Post July 2024)', text: 'All families in Maharashtra are now covered, not just BPL/APL households — universal healthcare assurance.' },
        { title: 'Ration Card Categories', text: 'Yellow, Orange, Antyodaya Anna Yojana, and select White ration card holders based on income limits.' },
        { title: 'Special Identified Categories', text: 'Farmers from distressed/suicide-prone districts, and other vulnerable/marginalized groups are specifically included.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Application & Admission Process',
      sec4Sub: '4-step hospital assistance via authorized Arogya Mitra desks',
      applicationSteps: [
        { step: 'Step 01', title: 'Check Eligibility', text: 'Check eligibility under the scheme (now near-universal for Maharashtra residents with valid ration card / address proof).' },
        { step: 'Step 02', title: 'Visit Empanelled Hospital', text: 'Visit an empanelled hospital or an authorized Arogya Mitra desk/kendra located in the hospital lobby.' },
        { step: 'Step 03', title: 'Submit Documents & e-KYC', text: 'Submit identity, income, and residence documents; complete biometric/Aadhaar verification with the Arogya Mitra.' },
        { step: 'Step 04', title: 'Card Issuance & Cashless Admission', text: "Once verified, the beneficiary's MJPJAY/Ayushman card is issued, enabling cashless access and direct pre-authorization." }
      ],
      sec5Num: '5.0',
      sec5Title: 'Coverage Limits & State Society Support',
      sec5Sub: 'Annual policy renewal cycle and grievance redressal helpline',
      datesBadge: 'Universal State Floater',
      datesHeading: 'Annual Floater Limits & Accident Care',
      datesRange: '₹5,00,000 Annual Floater (Cat A-E) | ₹1,00,000 Road Accident (Cat D)',
      datesNote: 'Coverage operates on an annual policy year renewal cycle. Combined floater of ₹5 lakh covers the entire family. Category D golden hour accident cover provides up to ₹1 lakh per person. Integrated claims are administered by the State Health Assurance Society (SHAS). Toll-Free Helplines: 155388 / 1800 233 2200.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'State Health Assurance Society and Maharashtra Health Department',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government portals:',
      sources: [
        { label: 'Public Health Department, Government of Maharashtra (phd.maharashtra.gov.in)', url: 'https://phd.maharashtra.gov.in' },
          { label: 'National Health Authority (Unified Ayushman - MJPJAY Portal)', url: 'https://beneficiary.nha.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Identity and residency proofs required at Arogya Mitra desk',
      requiredDocuments: [
        { title: 'Identity Proof', desc: 'Aadhaar Card / Voter ID / PAN Card of the patient and family head' },
        { title: 'Residence Proof / Ration Card', desc: 'Yellow, Orange, Antyodaya, or White Ration Card / Domicile Certificate / Valid address proof' },
        { title: 'Income Certificate (where applicable)', desc: 'Income certificate issued by an authorized revenue authority (Tahsildar) where applicable' }
      ],
      docsAlert: 'Important Instructions: Approach the designated "Arogya Mitra" at the hospital helpdesk before admission. No empanelled hospital can demand cash advance for approved MJPJAY treatments. In case of grievance or assistance, contact 155388 or 1800 233 2200.'
    },
    hi: {
      title: 'महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)',
      dept: 'सार्वजनिक स्वास्थ्य विभाग, महाराष्ट्र सरकार (आयुष्मान भारत — PM-JAY के साथ एकीकृत)',
      badge: 'महाराष्ट्र स्वास्थ्य सुरक्षा',
      verifiedBadge: 'सार्वभौमिक स्वास्थ्य सुरक्षा (महाराष्ट्र)',
      dbtBadge: 'AB PM-JAY के साथ एकीकृत (फ्लोटर आधार)',
      refCode: 'पोर्टल संदर्भ: MJPJAY-MH2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सुरक्षा',
      benefitsHighlight: 'कैशलेस स्वास्थ्य सुरक्षा — प्रति परिवार प्रति वर्ष ₹5 लाख तक (MJPJAY + AB PM-JAY संयुक्त, फ्लोटर आधार)',
      applyOnline: 'सूचीबद्ध अस्पताल में आवेदन करें (phd.maharashtra.gov.in)',
      autofillReady: 'राज्य स्वास्थ्य आश्वासन सोसायटी',
      backToCategory: 'स्वास्थ्य सेवाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'महाराष्ट्र के सभी परिवारों को सार्वभौमिक कैशलेस द्वितीयक एवं तृतीयक स्वास्थ्य सुरक्षा',
      overview: 'पूर्व में राजीव गांधी जीवनदायी आरोग्य योजना (RGJAY) के नाम से प्रसिद्ध, MJPJAY महाराष्ट्र के सार्वजनिक स्वास्थ्य विभाग द्वारा संचालित एक स्वास्थ्य आश्वासन योजना है, जो सूचीबद्ध सरकारी एवं निजी अस्पतालों के माध्यम से नागरिकों को कैशलेस चिकित्सा एवं सर्जिकल उपचार प्रदान करती है। इसे 1 अप्रैल 2020 को केंद्रीय आयुष्मान भारत - PM-JAY योजना के साथ एकीकृत किया गया था, जो मिश्रित बीमा और आश्वासन मोड में संचालित होती है — MJPJAY पूरी तरह से महाराष्ट्र सरकार द्वारा वित्तपोषित है, जबकि PM-JAY केंद्र और राज्य द्वारा 60:40 के अनुपात में संयुक्त रूप से वित्तपोषित है। 1 जुलाई 2024 से, कवरेज को कम आय वाले परिवारों से बढ़ाकर महाराष्ट्र की पूरी आबादी के लिए सार्वभौमिक कर दिया गया है।',
      facts: [
        { label: 'लाभार्थी दायरा', value: 'सार्वभौमिक कवरेज (1 जुलाई 2024 से — महाराष्ट्र के सभी परिवार)' },
        { label: 'उपचार पैकेज', value: '34 विशेषताओं में 1,356 स्वास्थ्य लाभ पैकेज (+ 184 दुर्घटना पैकेज)' },
        { label: 'सड़क दुर्घटना कवर', value: 'प्रति व्यक्ति प्रति वर्ष ₹1 लाख तक (श्रेणी D मरीज)' },
        { label: 'गुर्दा प्रत्यारोपण', value: 'प्रति परिवार वार्षिक पॉलिसी में ₹2.5 लाख तक की बढ़ी हुई अस्पताल भर्ती सीमा' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'व्यापक कैशलेस सर्जिकल/मेडिकल पैकेज, दुर्घटना देखभाल एवं गुर्दा प्रत्यारोपण कवर',
      keyBenefits: [
        {
          title: 'विस्तृत वित्तीय सुरक्षा',
          text: 'श्रेणी A से E (D को छोड़कर): फ्लोटर आधार पर प्रति परिवार प्रति वर्ष ₹5 लाख, जिसमें MJPJAY और आयुष्मान भारत दोनों का संयुक्त कवरेज शामिल है। श्रेणी D (सड़क दुर्घटना मरीज): ₹1 लाख प्रति व्यक्ति प्रति वर्ष।'
        },
        {
          title: 'व्यापक प्रक्रिया कवरेज',
          text: 'श्रेणी A-E के लिए 34 विशेषताओं में 1,356 स्वास्थ्य लाभ पैकेज; श्रेणी D के तहत सड़क दुर्घटना पीड़ितों के लिए विशेष 184 पैकेज। इसमें कार्डियक बाईपास, एंजियोप्लास्टी, कैंसर सर्जरी, जॉइंट रिप्लेसमेंट, मस्तिष्क/रीढ़ की सर्जरी और रीनल ट्रांसप्लांट शामिल हैं।'
        },
        {
          title: 'फैमिली फ्लोटर आधार',
          text: 'पॉलिसी वर्ष के भीतर परिवार की बीमा राशि का उपयोग किसी एक सदस्य द्वारा या पूरे परिवार द्वारा संयुक्त रूप से किया जा सकता है।'
        },
        {
          title: '100% कैशलेस उपचार',
          text: 'सूचीबद्ध अस्पतालों में कोई अग्रिम भुगतान नहीं — उपचार लागत योजना के तहत सीधे अस्पताल के साथ निपटाई जाती है।'
        },
        {
          title: 'गुर्दा प्रत्यारोपण वृद्धि',
          text: 'गुर्दा प्रत्यारोपण हेतु अस्पताल में भर्ती का कवर प्रति परिवार प्रति पॉलिसी वार्षिक ₹2.5 लाख तक बढ़ाया गया है (पूर्व संरचना; अब अधिकांश श्रेणियों के लिए ₹5 लाख संयुक्त कवर में समाहित)।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'वैध दस्तावेजों के साथ महाराष्ट्र के सभी स्थायी निवासियों हेतु सार्वभौमिक कवरेज',
      eligibility: [
        { title: 'महाराष्ट्र निवास/अधिवास', text: 'वैध राज्य-जारी पते के प्रमाण या अधिवास प्रमाण पत्र के साथ महाराष्ट्र का स्थायी निवासी होना अनिवार्य।' },
        { title: 'सार्वभौमिक कवरेज (जुलाई 2024 से)', text: 'महाराष्ट्र के सभी परिवार अब कवर हैं, केवल बीपीएल/एपीएल परिवार ही नहीं — सार्वभौमिक स्वास्थ्य सुरक्षा।' },
        { title: 'राशन कार्ड श्रेणियां', text: 'पीला, नारंगी, अंत्योदय अन्न योजना, और आय सीमा के आधार पर चुनिंदा सफेद राशन कार्ड धारक।' },
        { title: 'विशेष चिन्हित श्रेणियां', text: 'संकटग्रस्त/आत्महत्या संभावित जिलों के किसान और अन्य संवेदनशील/हाशिए पर मौजूद समूह भी विशेष रूप से शामिल।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'आवेदन एवं अस्पताल प्रवेश प्रक्रिया',
      sec4Sub: 'अधिकृत आरोग्य मित्र डेस्क के माध्यम से 4-चरणीय सरल प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'पात्रता की पुष्टि करें', text: 'योजना के तहत पात्रता की पुष्टि करें (वैध राशन कार्ड / पते के प्रमाण के साथ महाराष्ट्र के सभी नागरिकों के लिए सार्वभौमिक)।' },
        { step: 'चरण 02', title: 'सूचीबद्ध अस्पताल जाएं', text: 'किसी भी सूचीबद्ध अस्पताल या अस्पताल के मुख्य द्वार पर स्थित अधिकृत आरोग्य मित्र डेस्क/केंद्र पर जाएं।' },
        { step: 'चरण 03', title: 'दस्तावेज़ एवं e-KYC जमा करें', text: 'पहचान, राशन कार्ड एवं पते के प्रमाण प्रस्तुत करें; आरोग्य मित्र के साथ बायोमेट्रिक/आधार सत्यापन पूरा करें।' },
        { step: 'चरण 04', title: 'कार्ड जारी व कैशलेस भर्ती', text: 'सत्यापन के बाद लाभार्थी का MJPJAY/आयुष्मान कार्ड सक्रिय हो जाता है, जिससे सीधे कैशलेस उपचार शुरू होता है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'कवरेज सीमाएं एवं हेल्पलाइन सहायता',
      sec5Sub: 'वार्षिक नवीनीकरण एवं राज्य स्वास्थ्य आश्वासन सोसायटी सहायता',
      datesBadge: 'सार्वभौमिक राज्य फ्लोटर',
      datesHeading: 'वार्षिक फ्लोटर सीमाएं एवं दुर्घटना सुरक्षा',
      datesRange: '₹5,00,000 वार्षिक फ्लोटर (श्रेणी A-E) | ₹1,00,000 सड़क दुर्घटना (श्रेणी D)',
      datesNote: 'कवरेज वार्षिक पॉलिसी नवीनीकरण चक्र पर कार्य करता है। ₹5 लाख का संयुक्त फ्लोटर पूरे परिवार को कवर करता है। श्रेणी D गोल्डन ऑवर दुर्घटना देखभाल प्रति व्यक्ति ₹1 लाख तक प्रदान करती है। एकीकृत दावों का प्रबंधन राज्य स्वास्थ्य आश्वासन सोसायटी (SHAS) द्वारा किया जाता है। टोल-फ्री हेल्पलाइन: 155388 / 1800 233 2200।',
      sec6Num: '6.0',
      sec6Title: 'अधिकृत स्रोत व सत्यापन',
      sec6Sub: 'राज्य स्वास्थ्य आश्वासन सोसायटी एवं महाराष्ट्र स्वास्थ्य विभाग',
      sourcesNote: 'इस पृष्ठ पर दी गई जानकारी सीधे आधिकारिक सरकारी पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'राज्य स्वास्थ्य आश्वासन सोसायटी, महाराष्ट्र (jeevandayee.gov.in)', url: 'https://phd.maharashtra.gov.in' },
        { label: 'सार्वजनिक स्वास्थ्य विभाग, महाराष्ट्र सरकार', url: 'https://phd.maharashtra.gov.in' },
        { label: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (एकीकृत AB PM-JAY घटक हेतु)', url: 'https://beneficiary.nha.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'आरोग्य मित्र डेस्क पर प्रस्तुत किए जाने वाले आवश्यक प्रमाण',
      requiredDocuments: [
        { title: 'पहचान प्रमाण', desc: 'मरीज एवं परिवार के मुखिया का आधार कार्ड / मतदाता पहचान पत्र / पैन कार्ड' },
        { title: 'निवास प्रमाण / राशन कार्ड', desc: 'पीला, नारंगी, अंत्योदय या सफेद राशन कार्ड / अधिवास प्रमाण पत्र / वैध आवासीय पता प्रमाण' },
        { title: 'आय प्रमाण पत्र (जहां लागू हो)', desc: 'सक्षम राजस्व प्राधिकारी (तहसीलदार) द्वारा जारी आय प्रमाण पत्र (विशिष्ट श्रेणियों के लिए जहां आवश्यक हो)' }
      ],
      docsAlert: 'महत्वपूर्ण निर्देश: अस्पताल में भर्ती से पूर्व हेल्पडेस्क पर तैनात "आरोग्य मित्र" से संपर्क करें। कोई भी सूचीबद्ध अस्पताल स्वीकृत MJPJAY पैकेज के लिए नकद अग्रिम की मांग नहीं कर सकता। किसी भी शिकायत या मार्गदर्शन के लिए टोल-फ्री हेल्पलाइन 155388 अथवा 1800 233 2200 पर कॉल करें।'
    },
    mr: {
      title: 'महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)',
      dept: 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन (आयुष्मान भारत — PM-JAY सह एकत्रित)',
      badge: 'महाराष्ट्र आरोग्य संरक्षण',
      verifiedBadge: 'सार्वत्रिक आरोग्य संरक्षण (महाराष्ट्र)',
      dbtBadge: 'AB PM-JAY सह एकत्रित (फ्लोटर तत्त्वावर)',
      refCode: 'पोर्टल संदर्भ: MJPJAY-MH2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक संरक्षण',
      benefitsHighlight: 'कॅशलेस आरोग्य संरक्षण — प्रति कुटुंब प्रति वर्ष ₹५ लाखांपर्यंत (MJPJAY + AB PM-JAY संयुक्त, फ्लोटर तत्त्वावर)',
      applyOnline: 'नोंदणीकृत रुग्णालयात अर्ज करा (phd.maharashtra.gov.in)',
      autofillReady: 'राज्य आरोग्य हमी सोसायटी',
      backToCategory: 'आरोग्य सेवा योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'महाराष्ट्रातील सर्व कुटुंबांना मोफत कॅशलेस दुय्यम व तृतीयक रुग्णालयीन उपचारांची हमी',
      overview: 'पूर्वी राजीव गांधी जीवनदायी आरोग्य योजना (RGJAY) म्हणून ओळखली जाणारी, MJPJAY ही महाराष्ट्र शासनाच्या सार्वजनिक आरोग्य विभागामार्फत चालवली जाणारी आरोग्य विमा/हमी योजना आहे, ज्याद्वारे नोंदणीकृत शासकीय व खाजगी रुग्णालयांतून नागरिकांना कॅशलेस वैद्यकीय व शस्त्रक्रिया उपचार मिळतात. १ एप्रिल २०२० रोजी ही योजना केंद्र सरकारच्या आयुष्मान भारत - PM-JAY योजनेशी एकत्रित करण्यात आली, जी विमा व हमी अशा मिश्र पद्धतीत चालवली जाते — MJPJAY चा खर्च पूर्णपणे महाराष्ट्र शासन उचलते, तर PM-JAY चा खर्च केंद्र आणि राज्य ६०:४० प्रमाणात वाटून घेतात. १ जुलै २०२४ पासून ही योजना महाराष्ट्रातील सर्व कुटुंबांसाठी सार्वत्रिक करण्यात आली आहे.',
      facts: [
        { label: 'लाभार्थी व्याप्ती', value: 'सार्वत्रिक संरक्षण (१ जुलै २०२४ पासून — महाराष्ट्रातील सर्व कुटुंबे)' },
        { label: 'उपचार पॅकेजेस', value: '३४ विशेष विभागांमधील १,३५६ आरोग्य लाभ पॅकेजेस (+ १८४ अपघात पॅकेजेस)' },
        { label: 'रस्ते अपघात संरक्षण', value: 'प्रति व्यक्ती प्रति वर्ष ₹१ लाखांपर्यंत (प्रवर्ग D रुग्ण)' },
        { label: 'मूत्रपिंड प्रत्यारोपण', value: 'प्रति कुटुंब वार्षिक पॉलिसीमध्ये ₹२.५ लाखांपर्यंत वाढीव मर्यादा' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व फायदे',
      sec2Sub: 'सर्वसमावेशक कॅशलेस शस्त्रक्रिया व उपचार पॅकेजेस, अपघात सेवा आणि अवयव प्रत्यारोपण',
      keyBenefits: [
        {
          title: 'विस्तृत आर्थिक संरक्षण',
          text: 'प्रवर्ग A ते E (D वगळून): MJPJAY आणि आयुष्मान भारत एकत्रित करून प्रति कुटुंब प्रति वर्ष ₹५ लाख फ्लोटर तत्त्वावर संरक्षण. प्रवर्ग D (रस्ते अपघात रुग्ण): प्रति व्यक्ती प्रति वर्ष ₹१ लाख.'
        },
        {
          title: 'व्यापक उपचार पॅकेजेस',
          text: 'प्रवर्ग A-E साठी ३४ विशेष विभागांमधील १,३५६ आरोग्य लाभ पॅकेजेस; प्रवर्ग D अंतर्गत रस्ते अपघातग्रस्तांसाठी १८४ विशेष पॅकेजेस. यात बायपास, अँजिओप्लास्टी, कर्करोग शस्त्रक्रिया, सांधे बदल, मेंदू/मणक्याच्या शस्त्रक्रिया आणि मूत्रपिंड प्रत्यारोपण समाविष्ट आहेत.'
        },
        {
          title: 'फॅमिली फ्लोटर तत्त्व',
          text: 'कुटुंबाच्या विम्याच्या रकमेचा वापर एका सदस्याद्वारे किंवा संपूर्ण कुटुंबातील सदस्यांद्वारे संयुक्तपणे वर्षात केला जाऊ शकतो.'
        },
        {
          title: '१००% कॅशलेस उपचार',
          text: 'नोंदणीकृत रुग्णालयात उपचाराच्या वेळी कोणतेही पैसे द्यावे लागत नाहीत — खर्चाची प्रतिपूर्ती शासनामार्फत थेट रुग्णालयाला केली जाते.'
        },
        {
          title: 'मूत्रपिंड प्रत्यारोपण वाढीव मर्यादा',
          text: 'मूत्रपिंड प्रत्यारोपणासाठी रुग्णालयीन उपचारांची मर्यादा प्रति कुटुंब प्रति वर्ष ₹२.५ लाखांपर्यंत वाढवण्यात आली आहे (आता बहुतेक प्रवर्गांसाठी ₹५ लाखांच्या संयुक्त कव्हरमध्ये समाविष्ट).'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'पात्रतेचे निकष',
      sec3Sub: 'वैध पुराव्यासह महाराष्ट्रातील सर्व कायमस्वरूपी रहिवाशांसाठी सार्वत्रिक संरक्षण',
      eligibility: [
        { title: 'महाराष्ट्र रहिवासी / अधिवास', text: 'वैध पत्त्याच्या पुराव्यासह किंवा अधिवास दाखल्यासह महाराष्ट्राचा कायमस्वरूपी रहिवासी असणे आवश्यक.' },
        { title: 'सार्वत्रिक संरक्षण (जुलै २०२४ नंतर)', text: 'महाराष्ट्रातील सर्व कुटुंबे आता संरक्षित आहेत, केवळ दारिद्र्यरेषेखालील (BPL) नव्हे — सार्वत्रिक आरोग्य संरक्षण.' },
        { title: 'रेशन कार्ड प्रवर्ग', text: 'पिवळे, केशरी, अंत्योदय अन्न योजना आणि उत्पन्न मर्यादेवर आधारित पांढरे रेशन कार्डधारक.' },
        { title: 'विशेष घटक प्रवर्ग', text: 'शेतकरी आत्महत्याग्रस्त/संकटग्रस्त जिल्ह्यातील शेतकरी आणि इतर दुर्बल/उपेक्षित घटकांचाही विशेष समावेश.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'अर्ज व रुग्णालय प्रवेश प्रक्रिया',
      sec4Sub: 'आरोग्य मित्रांच्या मदतीने ४ टप्प्यांत सोपी कॅशलेस प्रवेश प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'पात्रता तपासा', text: 'वैध रेशन कार्ड किंवा रहिवासी पुराव्यासह योजनेअंतर्गत पात्रतेची खात्री करा (महाराष्ट्रातील सर्व नागरिकांसाठी खुली).' },
        { step: 'टप्पा ०२', title: 'नोंदणीकृत रुग्णालयास भेट', text: 'कोणत्याही नोंदणीकृत शासकीय किंवा खाजगी रुग्णालयातील "आरोग्य मित्र" कक्षाला भेट द्या.' },
        { step: 'टप्पा ०३', title: 'कागदपत्रे व e-KYC पडताळणी', text: 'ओळखपत्र, रेशन कार्ड सादर करा आणि आरोग्य मित्राच्या मदतीने बायोमेट्रिक/आधार पडताळणी पूर्ण करा.' },
        { step: 'टप्पा ०४', title: 'कार्ड वितरण व कॅशलेस उपचार', text: 'पडताळणीनंतर MJPJAY/आयुष्मान कार्ड सक्रिय होते आणि थेट कॅशलेस प्रवेश मिळून उपचार सुरू होतात.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'संरक्षण मर्यादा आणि मदत कक्ष',
      sec5Sub: 'वार्षिक नूतनीकरण चक्र आणि २४ तास सुरू असणारी हेल्पलाइन',
      datesBadge: 'सार्वत्रिक राज्य फ्लोटर',
      datesHeading: 'वार्षिक फ्लोटर मर्यादा व अपघात उपचार',
      datesRange: '₹५,००,००० वार्षिक फ्लोटर (प्रवर्ग A-E) | ₹१,००,००० रस्ते अपघात (प्रवर्ग D)',
      datesNote: 'संरक्षण वार्षिक पॉलिसी नूतनीकरण चक्रानुसार चालते. ₹५ लाखांचे संयुक्त फ्लोटर संपूर्ण कुटुंबाला संरक्षण देते. प्रवर्ग D गोल्डन अवर अपघात उपचारासाठी प्रति व्यक्ती ₹१ लाख पुरवले जातात. क्लेम प्रक्रिया राज्य आरोग्य हमी सोसायटी (SHAS) द्वारे पार पाडली जाते. टोल-फ्री हेल्पलाइन: १५५३८८ / १८०० २३३ २२००.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'राज्य आरोग्य हमी सोसायटी आणि महाराष्ट्र आरोग्य विभाग',
      sourcesNote: 'या पृष्ठावरील माहिती थेट अधिकृत शासकीय पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन (phd.maharashtra.gov.in)', url: 'https://phd.maharashtra.gov.in' },
          { label: 'राष्ट्रीय आरोग्य प्राधिकरण (एकात्मिक आयुष्मान - MJPJAY पोर्टल)', url: 'https://beneficiary.nha.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'आरोग्य मित्र कक्षात सादर करावयाचे अधिकृत पुरावे',
      requiredDocuments: [
        { title: 'ओळख पुरावा', desc: 'रुग्ण आणि कुटुंबप्रमुखाचे आधार कार्ड / मतदार ओळखपत्र / पॅन कार्ड' },
        { title: 'रहिवासी पुरावा / रेशन कार्ड', desc: 'पिवळे, केशरी, अंत्योदय किंवा पांढरे रेशन कार्ड / अधिवास प्रमाणपत्र / वैध पत्ता पुरावा' },
        { title: 'उत्पन्न दाखला (लागू असल्यास)', desc: 'सक्षम महसूल प्राधिकाऱ्याने (तहसीलदार) दिलेला अधिकृत उत्पन्न दाखला (विशिष्ट प्रवर्गांसाठी)' }
      ],
      docsAlert: 'महत्त्वाच्या सूचना: रुग्णालयात दाखल होण्यापूर्वी मदत कक्षावरील "आरोग्य मित्र" यांच्याशी संपर्क साधा. कोणत्याही नोंदणीकृत रुग्णालयाला मंजूर उपचारासाठी आगाऊ रोख रक्कम मागण्याचा अधिकार नाही. तक्रार किंवा मार्गदर्शनासाठी १५५३८८ किंवा १८०० २३३ २२०० या टोल-फ्री क्रमांकावर संपर्क साधा.'
    }
  },
  h3: {
    en: {
      title: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)',
      dept: 'Department of Pharmaceuticals, Ministry of Chemicals & Fertilizers, Government of India',
      badge: 'Affordable Generic Medicines',
      verifiedBadge: 'PHARMA & MEDICAL BUREAU OF INDIA (PMBI)',
      dbtBadge: '50%–90% SAVINGS ON ESSENTIAL MEDICINES',
      refCode: 'Portal Ref: PMBJP-PMBI2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / CITIZEN & ENTREPRENEUR ENTITLEMENT',
      benefitsHighlight: 'Quality generic medicines at 50–90% lower prices than branded equivalents, through Jan Aushadhi Kendras (JAKs) — plus self-employment incentives for those opening a Kendra',
      applyOnline: 'Locate Nearest Kendra / Apply (janaushadhi.gov.in)',
      autofillReady: 'PMBI Sugam Portal',
      backToCategory: 'Back to Healthcare Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Affordable generic medicines for citizens & sustainable livelihood for entrepreneurs',
      overview: "Originally launched in November 2008 as 'Jan Aushadhi Medical Store,' the scheme was revamped in 2015 as 'Pradhan Mantri Jan Aushadhi Yojana' and renamed again in 2016 to its current name. It aims to make quality-assured generic medicines and surgical devices accessible and affordable to all citizens, while also generating self-employment opportunities through Kendra ownership. As of the latest update, there are over 18,000 functional Jan Aushadhi Kendras across the country, with a target of 25,000 by March 2027, and the scheme has saved citizens an estimated ₹38,000 crore compared to branded medicine prices (as of June 2025).",
      facts: [
        { label: 'Product Basket', value: '1,759 generic medicines & 280 surgical devices across all therapeutic groups' },
        { label: 'Functional Network', value: 'Over 18,000 Jan Aushadhi Kendras nationwide (Target: 25,000 by March 2027)' },
        { label: 'Citizen Savings', value: 'Over ₹38,000 Crore saved compared to branded alternatives (as of June 2025)' },
        { label: 'Women\'s Health', value: 'Jan Aushadhi Suvidha oxo-biodegradable sanitary napkins at just ₹1 each' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Substantial medicine cost savings for citizens and lucrative business incentives for Kendra owners',
      keyBenefits: [
        {
          title: 'Affordable Generic Medicines (Citizens)',
          text: 'Product basket of 1,759 medicines and 280 surgical devices across all major therapeutic groups, priced 50–90% lower than branded alternatives — same active ingredients, dosage, and therapeutic effect.'
        },
        {
          title: 'Nationwide Access & Rural Penetration',
          text: 'Over 18,000 Kendras across all districts, with rapid expansion into rural areas via Primary Agricultural Credit Societies (PACS).'
        },
        {
          title: 'Digital Locator (Janaushadhi Sugam App)',
          text: 'The Janaushadhi Sugam mobile app (Android/iOS) helps locate the nearest Kendra, compare generic vs. branded medicine prices, and check potential savings.'
        },
        {
          title: 'Special Initiative (Jan Aushadhi Suvidha)',
          text: 'Includes "Jan Aushadhi Suvidha" oxo-biodegradable sanitary napkins priced at ₹1 each, supporting menstrual health access across the country.'
        },
        {
          title: 'Normal Entrepreneur Incentive',
          text: 'Up to ₹5 lakh, at 15% of monthly purchases (capped at ₹15,000/month) as reimbursement for Kendra owners.'
        },
        {
          title: 'Special Entrepreneur Incentive',
          text: 'Additional ₹2 lakh for Kendras opened in North-Eastern states, Himalayan/island territories, backward areas, or by Women Entrepreneurs, Divyangjan (persons with disabilities), SC/ST applicants, and veterans.'
        },
        {
          title: 'Margin on Sales',
          text: '20% retail margin on MRP of medicines sold for operating entrepreneurs.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Eligibility Criteria (To Open a Kendra)',
      sec3Sub: 'Statutory qualification, premise space and licensing requirements',
      eligibility: [
        { title: 'Who Can Apply', text: 'State Governments, reputed NGOs/Trusts, private hospitals, charitable institutions, doctors, unemployed pharmacists, Primary Agricultural Credit Societies (PACS), or individual entrepreneurs.' },
        { title: 'Mandatory Staffing', text: 'Must employ at least one B.Pharma or D.Pharma degree holder registered with State Pharmacy Council as the store pharmacist.' },
        { title: 'Premise Space Requirement', text: 'Minimum 120 sq. ft. of owned or leased commercial space supported by a registered lease agreement.' },
        { title: 'Statutory Drug License', text: 'Required in the name of "Pradhan Mantri Bhartiya Janaushadhi Kendra," complying with all drug-storage and temperature norms.' },
        { title: 'Distance Policy Compliance', text: 'Location norms apply based on city category (e.g., metro cities and districts with population >=10 lakh fall under Category A with stricter spacing rules).' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Application Process (To Open a Kendra)',
      sec4Sub: '5-step procedure to establish and operate a Jan Aushadhi Kendra',
      applicationSteps: [
        { step: 'Step 01', title: 'Submit Application to PMBI', text: 'Apply online through janaushadhi.gov.in or submit prescribed offline form with initial processing documents.' },
        { step: 'Step 02', title: 'Secure Commercial Space', text: 'Secure eligible space (owned/leased, meeting 120 sq. ft. minimum) with proper commercial layout.' },
        { step: 'Step 03', title: 'Employ Pharmacist & Get Drug License', text: 'Employ a qualified B.Pharma/D.Pharma pharmacist and obtain drug license in the Kendra\'s official name.' },
        { step: 'Step 04', title: 'Comply with Distance Policy & Sign MoU', text: 'Comply with PMBI distance norms, execute agreement, and receive software ID and initial medicine supply.' },
        { step: 'Step 05', title: 'Inaugurate & Dispense Medicines', text: 'Start dispensing quality generic medicines and claim monthly 15% purchase incentives from PMBI.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Entrepreneur Incentives & Commission Schedule',
      sec5Sub: 'Capital assistance, monthly purchase reimbursements and retail margins',
      datesBadge: 'Sustainable Entrepreneurship',
      datesHeading: 'Incentive & Margin Structure',
      datesRange: 'Up to ₹5 Lakh Normal Incentive | ₹2 Lakh Special Incentive | 20% Retail Margin',
      datesNote: 'Normal incentive is reimbursed at 15% of monthly purchase (max ₹15,000/month) up to ₹5 lakh. Special one-time ₹2 lakh incentive is provided for women, Divyangjan, SC/ST, and difficult terrain. 20% margin on MRP of medicines sold. For assistance, contact PMBI or use Janaushadhi Sugam App.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Pharmaceuticals & Medical Devices Bureau of India (PMBI) portals',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of India portals:',
      sources: [
        { label: 'Pharma & Medical Bureau of India (PMBI) — janaushadhi.gov.in', url: 'https://janaushadhi.gov.in' },
        { label: 'Department of Pharmaceuticals, Government of India', url: 'https://dop.gov.in' },
        { label: 'Janaushadhi Sugam App (Android/iOS)', url: 'https://janaushadhi.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents (To Open a Kendra)',
      sec7Sub: 'Application checklist for Kendra approval and drug licensing',
      requiredDocuments: [
        { title: 'Identity & Address Proof of Applicant', desc: 'Aadhaar card, PAN card, and valid residential address proof of the applicant or institution head' },
        { title: "Pharmacist's Degree / Diploma Certificate", desc: 'B.Pharma / D.Pharma degree certificate and active registration certificate from State Pharmacy Council' },
        { title: 'Space Ownership / Lease Agreement', desc: 'Registered commercial lease agreement or ownership deed for minimum 120 sq. ft. premise' },
        { title: 'Drug License Application Documents', desc: 'Statutory drug license application (Form 20 / Form 21) filed in the name of Pradhan Mantri Bhartiya Janaushadhi Kendra' }
      ],
      docsAlert: 'Important Information for Citizens & Applicants: All generic medicines distributed under PMBJP undergo rigorous quality testing in NABL-accredited laboratories to ensure therapeutic equivalence with branded drugs. Citizens can use the "Janaushadhi Sugam" mobile app to locate stores and check price savings. Beware of unauthorized agents seeking processing fees.'
    },
    hi: {
      title: 'प्रधानमंत्री भारतीय जनऔषधि परियोजना (PMBJP)',
      dept: 'फार्मास्यूटिकल्स विभाग, रसायन एवं उर्वरक मंत्रालय, भारत सरकार',
      badge: 'सस्ती गुणवत्तापूर्ण जेनेरिक दवाएं',
      verifiedBadge: 'भारतीय फार्मा एवं चिकित्सा ब्यूरो (PMBI)',
      dbtBadge: 'आवश्यक दवाओं पर 50%–90% की बचत',
      refCode: 'पोर्टल संदर्भ: PMBJP-PMBI2026',
      highlightLabel: 'आधिकारिक योजना लाभ / नागरिक एवं उद्यमी अधिकार',
      benefitsHighlight: 'जन औषधि केंद्रों (JAK) के माध्यम से ब्रांडेड दवाओं से 50-90% कम कीमत पर गुणवत्तापूर्ण जेनेरिक दवाएं — साथ ही केंद्र खोलने वालों हेतु स्वरोजगार प्रोत्साहन',
      applyOnline: 'निकटतम केंद्र खोजें / आवेदन करें (janaushadhi.gov.in)',
      autofillReady: 'PMBI सुगम पोर्टल',
      backToCategory: 'स्वास्थ्य सेवाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'नागरिकों हेतु किफायती जेनेरिक दवाएं एवं उद्यमियों हेतु टिकाऊ स्वरोजगार का अवसर',
      overview: 'मूल रूप से नवंबर 2008 में "जन औषधि मेडिकल स्टोर" के रूप में शुरू की गई इस योजना को 2015 में "प्रधानमंत्री जन औषधि योजना" के रूप में नया रूप दिया गया और 2016 में इसका नाम बदलकर वर्तमान नाम कर दिया गया। इसका उद्देश्य सभी नागरिकों के लिए गुणवत्ता-आश्वासन वाली जेनेरिक दवाओं और सर्जिकल उपकरणों को सुलभ और किफायती बनाना है, साथ ही केंद्र के स्वामित्व के माध्यम से स्वरोजगार के अवसर पैदा करना है। नवीनतम आंकड़ों के अनुसार, देश भर में 18,000 से अधिक कार्यात्मक जन औषधि केंद्र हैं (मार्च 2027 तक 25,000 का लक्ष्य), और इस योजना ने नागरिकों को ब्रांडेड दवाओं की तुलना में अनुमानित ₹38,000 करोड़ की बचत कराई है (जून 2025 तक)।',
      facts: [
        { label: 'दवाओं का बास्केट', value: 'सभी प्रमुख उपचारात्मक श्रेणियों में 1,759 दवाएं एवं 280 सर्जिकल उपकरण' },
        { label: 'कार्यात्मक केंद्र', value: 'देश भर में 18,000 से अधिक जन औषधि केंद्र (मार्च 2027 तक 25,000 का लक्ष्य)' },
        { label: 'नागरिक बचत', value: 'ब्रांडेड विकल्पों की तुलना में ₹38,000 करोड़ से अधिक की बचत (जून 2025 तक)' },
        { label: 'महिला स्वास्थ्य', value: '"जन औषधि सुविधा" ऑक्सो-बायोडिग्रेडेबल सैनिटरी नैपकिन मात्र ₹1 प्रति पैड' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'नागरिकों हेतु दवा खर्च में भारी कटौती एवं केंद्र संचालकों हेतु आकर्षक प्रोत्साहन',
      keyBenefits: [
        {
          title: 'किफायती जेनेरिक दवाएं (नागरिकों हेतु)',
          text: 'सभी प्रमुख उपचारात्मक समूहों में 1,759 दवाओं और 280 सर्जिकल उपकरणों का बास्केट, जो ब्रांडेड विकल्पों की तुलना में 50-90% कम कीमत पर उपलब्ध हैं — समान सक्रिय तत्व, खुराक और उपचारात्मक प्रभाव।'
        },
        {
          title: 'राष्ट्रव्यापी पहुंच एवं ग्रामीण विस्तार',
          text: 'सभी जिलों में 18,000 से अधिक केंद्र, प्राथमिक कृषि ऋण समितियों (PACS) के माध्यम से ग्रामीण क्षेत्रों में तीव्र विस्तार।'
        },
        {
          title: 'डिजिटल लोकेटर (जनऔषधि सुगम ऐप)',
          text: 'जनऔषधि सुगम मोबाइल ऐप (एंड्रॉइड/आईओएस) निकटतम केंद्र का पता लगाने, जेनेरिक बनाम ब्रांडेड दवा की कीमतों की तुलना करने और बचत की गणना करने में मदद करता है।'
        },
        {
          title: 'विशेष पहल (जन औषधि सुविधा नैपकिन)',
          text: 'मासिक धर्म स्वास्थ्य को बढ़ावा देने हेतु ₹1 प्रति पैड की दर से "जन औषधि सुविधा" सैनिटरी नैपकिन उपलब्ध कराए जाते हैं।'
        },
        {
          title: 'सामान्य उद्यमी प्रोत्साहन',
          text: 'मासिक खरीद के 15% की दर से प्रति माह अधिकतम ₹15,000 की सीमा के साथ कुल ₹5 लाख तक का पुनर्भुगतान।'
        },
        {
          title: 'विशेष उद्यमी प्रोत्साहन',
          text: 'पूर्वोत्तर राज्यों, हिमालयी/द्वीपीय क्षेत्रों, पिछड़े क्षेत्रों में या महिला उद्यमियों, दिव्यांगजन, एससी/एसटी और पूर्व सैनिकों द्वारा खोले गए केंद्रों हेतु ₹2 लाख का अतिरिक्त प्रोत्साहन।'
        },
        {
          title: 'बिक्री पर मार्जिन',
          text: 'केंद्र संचालक उद्यमियों के लिए बेची गई दवाओं के एमआरपी पर 20% का खुदरा मार्जिन।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड (केंद्र खोलने हेतु)',
      sec3Sub: 'वैधानिक योग्यता, परिसर क्षेत्र और ड्रग लाइसेंस संबंधी आवश्यकताएं',
      eligibility: [
        { title: 'कौन आवेदन कर सकता है', text: 'राज्य सरकारें, प्रतिष्ठित गैर सरकारी संगठन/ट्रस्ट, निजी अस्पताल, धर्मार्थ संस्थान, डॉक्टर, बेरोजगार फार्मासिस्ट, प्राथमिक कृषि ऋण समितियां (PACS), या व्यक्तिगत उद्यमी।' },
        { title: 'अनिवार्य स्टाफिंग', text: 'स्टोर फार्मासिस्ट के रूप में राज्य फार्मेसी काउंसिल में पंजीकृत कम से कम एक बी.फार्मा या डी.फार्मा डिग्री धारक को नियुक्त करना अनिवार्य है।' },
        { title: 'परिसर स्थान आवश्यकता', text: 'उचित वाणिज्यिक लेआउट के साथ न्यूनतम 120 वर्ग फुट का स्वामित्व या पंजीकृत पट्टे वाला स्थान।' },
        { title: 'ड्रग लाइसेंस', text: 'सभी वैधानिक दवा-भंडारण आवश्यकताओं के अनुपालन के साथ "प्रधानमंत्री भारतीय जनऔषधि केंद्र" के नाम से ड्रग लाइसेंस अनिवार्य है।' },
        { title: 'दूरी नीति अनुपालन', text: 'शहर की श्रेणी के आधार पर स्थान मानदंड लागू होते हैं (उदा. मेट्रो शहरों और >=10 लाख आबादी वाले जिलों में श्रेणी A के तहत सख्त नियम)।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'आवेदन प्रक्रिया (केंद्र खोलने हेतु)',
      sec4Sub: 'जन औषधि केंद्र की स्थापना एवं संचालन हेतु 5-चरणीय प्रक्रिया',
      applicationSteps: [
        { step: 'चरण 01', title: 'PMBI को आवेदन प्रस्तुत करें', text: 'janaushadhi.gov.in के माध्यम से ऑनलाइन आवेदन करें या निर्धारित ऑफ़लाइन फॉर्म भरकर आवश्यक दस्तावेजों के साथ जमा करें।' },
        { step: 'चरण 02', title: 'वाणिज्यिक स्थान सुनिश्चित करें', text: 'न्यूनतम 120 वर्ग फुट का उपयुक्त व्यावसायिक स्थान (स्वामित्व या वैध लीज एग्रीमेंट) तैयार करें।' },
        { step: 'चरण 03', title: 'फार्मासिस्ट नियुक्ति एवं ड्रग लाइसेंस', text: 'योग्य बी.फार्मा/डी.फार्मा फार्मासिस्ट को नियुक्त करें और केंद्र के नाम से ड्रग लाइसेंस प्राप्त करें।' },
        { step: 'चरण 04', title: 'दूरी नीति एवं अनुबंध हस्ताक्षर', text: 'PMBI के दूरी मानदंडों का पालन करें, समझौते पर हस्ताक्षर करें, सॉफ्टवेयर आईडी और दवाओं की प्रारंभिक आपूर्ति प्राप्त करें।' },
        { step: 'चरण 05', title: 'उद्घाटन एवं दवाओं का वितरण', text: 'नागरिकों को गुणवत्तापूर्ण जेनेरिक दवाओं का वितरण प्रारंभ करें और PMBI से 15% मासिक प्रोत्साहन प्राप्त करें।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'उद्यमी प्रोत्साहन एवं कमीशन संरचना',
      sec5Sub: 'पूंजीगत सहायता, मासिक खरीद प्रतिपूर्ति एवं खुदरा मार्जिन',
      datesBadge: 'टिकाऊ स्वरोजगार पहल',
      datesHeading: 'प्रोत्साहन एवं कमीशन शेड्यूल',
      datesRange: '₹5 लाख तक सामान्य प्रोत्साहन | ₹2 लाख विशेष प्रोत्साहन | 20% एमआरपी मार्जिन',
      datesNote: 'सामान्य प्रोत्साहन मासिक खरीद के 15% (अधिकतम ₹15,000/माह) की दर से ₹5 लाख तक दिया जाता है। महिलाओं, दिव्यांगों, एससी/एसटी और दुर्गम क्षेत्रों के लिए ₹2 लाख का एकमुश्त अतिरिक्त प्रोत्साहन। बेची गई दवाओं के एमआरपी पर 20% का मार्जिन। सहायता हेतु जनऔषधि सुगम ऐप डाउनलोड करें या PMBI से संपर्क करें।',
      sec6Num: '6.0',
      sec6Title: 'अधिकृत स्रोत व सत्यापन',
      sec6Sub: 'भारतीय फार्मा एवं चिकित्सा उपकरण ब्यूरो (PMBI) पोर्टल',
      sourcesNote: 'इस पृष्ठ पर दी गई जानकारी सीधे भारत सरकार के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'भारतीय फार्मा एवं चिकित्सा ब्यूरो (PMBI) — janaushadhi.gov.in', url: 'https://janaushadhi.gov.in' },
        { label: 'फार्मास्यूटिकल्स विभाग, भारत सरकार', url: 'https://dop.gov.in' },
        { label: 'जनऔषधि सुगम ऐप (Android/iOS)', url: 'https://janaushadhi.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़ (केंद्र खोलने हेतु)',
      sec7Sub: 'केंद्र स्वीकृति एवं ड्रग लाइसेंस हेतु आवेदन चेकलिस्ट',
      requiredDocuments: [
        { title: 'आवेदक का पहचान एवं पता प्रमाण', desc: 'आवेदक या संस्था प्रमुख का आधार कार्ड, पैन कार्ड और वैध आवासीय पता प्रमाण' },
        { title: 'फार्मासिस्ट का डिग्री/डिप्लोमा प्रमाण पत्र', desc: 'बी.फार्मा / डी.फार्मा डिग्री प्रमाण पत्र एवं राज्य फार्मेसी काउंसिल का सक्रिय पंजीकरण' },
        { title: 'स्थान स्वामित्व / लीज डीड', desc: 'न्यूनतम 120 वर्ग फुट दुकान का पंजीकृत वाणिज्यिक लीज एग्रीमेंट अथवा स्वामित्व दस्तावेज' },
        { title: 'ड्रग लाइसेंस आवेदन प्रपत्र', desc: 'प्रधानमंत्री भारतीय जन औषधि केंद्र के नाम से लागू फॉर्म 20 एवं फॉर्म 21 वैधानिक ड्रग लाइसेंस दस्तावेज' }
      ],
      docsAlert: 'नागरिकों एवं आवेदकों हेतु महत्वपूर्ण सूचना: PMBJP के तहत वितरित सभी जेनेरिक दवाएं NABL-मान्यता प्राप्त प्रयोगशालाओं में कठोर गुणवत्ता परीक्षण से गुजरती हैं ताकि ब्रांडेड दवाओं के समान प्रभाव सुनिश्चित किया जा सके। नजदीकी केंद्र खोजने और दवाओं की कीमतों की जांच हेतु "जनऔषधि सुगम" ऐप का उपयोग करें। अनधिकृत दलालों से सावधान रहें।'
    },
    mr: {
      title: 'प्रधानमंत्री भारतीय जनऔषधी परियोजना (PMBJP)',
      dept: 'औषधनिर्माण विभाग, रसायने आणि खते मंत्रालय, भारत सरकार',
      badge: 'स्वस्त दर्जेदार जेनेरिक औषधे',
      verifiedBadge: 'भारतीय फार्मा आणि वैद्यकीय ब्युरो (PMBI)',
      dbtBadge: 'अत्यावश्यक औषधांवर ५०%–९०% बचत',
      refCode: 'पोर्टल संदर्भ: PMBJP-PMBI2026',
      highlightLabel: 'अधिकृत योजना लाभ / नागरिक व उद्योजक अधिकार',
      benefitsHighlight: 'जन औषधी केंद्रांमार्फत (JAK) ब्रँडेड औषधांपेक्षा ५०-९०% कमी दरात दर्जेदार जेनेरिक औषधे — तसेच केंद्र सुरू करणाऱ्यांसाठी स्वयंरोजगार प्रोत्साहन',
      applyOnline: 'जवळचे केंद्र शोधा / अर्ज करा (janaushadhi.gov.in)',
      autofillReady: 'PMBI सुगम पोर्टल',
      backToCategory: 'आरोग्य सेवा योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'नागरिकांसाठी परवडणारी दर्जेदार जेनेरिक औषधे आणि सुशिक्षित बेरोजगारांसाठी स्वयंरोजगाराची सुवर्णसंधी',
      overview: 'मूलतः नोव्हेंबर २००८ मध्ये "जन औषधी मेडिकल स्टोअर" म्हणून सुरू झालेली ही योजना २०१५ मध्ये "प्रधानमंत्री जन औषधी योजना" म्हणून पुनरुज्जीवित करण्यात आली आणि २०१६ मध्ये तिला सध्याचे नाव देण्यात आले. सर्व नागरिकांना गुणवत्तापूर्ण जेनेरिक औषधे आणि सर्जिकल उपकरणे परवडणाऱ्या दरात उपलब्ध करून देणे, तसेच केंद्र मालकीद्वारे स्वयंरोजगाराच्या संधी निर्माण करणे हे याचे उद्दिष्ट आहे. ताज्या माहितीनुसार, देशभरात १८,००० हून अधिक कार्यरत जन औषधी केंद्रे आहेत (मार्च २०२७ पर्यंत २५,००० चे उद्दिष्ट), आणि या योजनेने ब्रँडेड औषधांच्या तुलनेत नागरिकांचे अंदाजे ₹३८,००० कोटी वाचवले आहेत (जून २०२५ पर्यंत).',
      facts: [
        { label: 'उपलब्ध उत्पादने', value: 'सर्व महत्त्वाच्या उपचारांमधील १,७५९ जेनेरिक औषधे आणि २८० सर्जिकल उत्पादने' },
        { label: 'कार्यरत केंद्रे', value: 'देशभरात १८,००० हून अधिक जन औषधी केंद्रे (मार्च २०२७ पर्यंत २५,००० चे लक्ष्य)' },
        { label: 'नागरिकांची बचत', value: 'ब्रँडेड औषधांच्या तुलनेत ₹३८,००० कोटींपेक्षा जास्त बचत (जून २०२५ पर्यंत)' },
        { label: 'महिला आरोग्य', value: '"जन औषधी सुविधा" ऑक्सो-बायोडिग्रेडेबल सॅनिटरी नॅपकिन अवघ्या ₹१ प्रति पॅड' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व फायदे',
      sec2Sub: 'नागरिकांना औषध खर्चात ५०-९०% बचत आणि केंद्र चालकांसाठी आकर्षक व्यवसाय प्रोत्साहन',
      keyBenefits: [
        {
          title: 'परवडणारी जेनेरिक औषधे (नागरिकांसाठी)',
          text: 'सर्व प्रमुख उपचारांमधील १,७५९ औषधे आणि २८० सर्जिकल उपकरणांची बास्केट, जी ब्रँडेड पर्यायांपेक्षा ५०-९०% कमी दरात उपलब्ध आहेत — समान सक्रिय घटक, डोस आणि उपचारात्मक परिणाम.'
        },
        {
          title: 'देशव्यापी उपलब्धता व ग्रामीण विस्तार',
          text: 'सर्व जिल्ह्यांमध्ये १८,००० हून अधिक केंद्रे, प्राथमिक कृषी पतसंस्थांच्या (PACS) माध्यमातून ग्रामीण भागात जलद विस्तार.'
        },
        {
          title: 'डिजिटल लोकेटर (जनऔषधी सुगम ॲप)',
          text: 'जनऔषधी सुगम मोबाईल ॲप (Android/iOS) जवळचे केंद्र शोधणे, जेनेरिक विरुद्ध ब्रँडेड औषधांच्या किमतींची तुलना करणे आणि बचतीचा अंदाज लावण्यास मदत करते.'
        },
        {
          title: 'विशेष उपक्रम (जन औषधी सुविधा नॅपकिन)',
          text: 'मासिक पाळी आरोग्याला प्रोत्साहन देण्यासाठी ₹१ प्रति पॅड दराने "जन औषधी सुविधा" सॅनिटरी नॅपकिन उपलब्ध करून दिले जातात.'
        },
        {
          title: 'सर्वसाधारण उद्योजक प्रोत्साहन',
          text: 'मासिक खरेदीच्या १५% दराने (कमाल ₹१५,०००/महिना मर्यादेसह) एकूण ₹५ लाखांपर्यंत प्रोत्साहन परतावा.'
        },
        {
          title: 'विशेष उद्योजक प्रोत्साहन',
          text: 'ईशान्येकडील राज्ये, हिमालयीन/बेट प्रदेश, मागास भागात किंवा महिला उद्योजक, दिव्यांग, एससी/एसटी आणि माजी सैनिकांनी सुरू केलेल्या केंद्रांसाठी ₹२ लाखांचे अतिरिक्त प्रोत्साहन.'
        },
        {
          title: 'विक्रीवर नफा (मार्जिन)',
          text: 'केंद्र चालकांसाठी औषधांच्या कमाल किरकोळ किमतीवर (MRP) २०% थेट किरकोळ नफा.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'पात्रतेचे निकष (केंद्र सुरू करण्यासाठी)',
      sec3Sub: 'वैधानिक पात्रता, जागेचे क्षेत्रफळ आणि औषध परवान्याच्या अटी',
      eligibility: [
        { title: 'कोण अर्ज करू शकते', text: 'राज्य सरकारे, नामांकित स्वयंसेवी संस्था/ट्रस्ट, खाजगी रुग्णालये, धर्मादाय संस्था, डॉक्टर, बेरोजगार फार्मासिस्ट, प्राथमिक कृषी पतसंस्था (PACS), किंवा वैयक्तिक उद्योजक.' },
        { title: 'अनिवार्य कर्मचारी पात्रता', text: 'स्टोअर फार्मासिस्ट म्हणून राज्य फार्मसी कौन्सिलकडे नोंदणीकृत किमान एक B.Pharma किंवा D.Pharma पदवीधर असणे अनिवार्य आहे.' },
        { title: 'जागेचे क्षेत्रफळ आवश्यकता', text: 'किमान १२० चौरस फूट स्वतःची मालकीची किंवा नोंदणीकृत भाडेकरारावर घेतलेली व्यावसायिक जागा.' },
        { title: 'औषध परवाना (ड्रग लायसन्स)', text: '"प्रधानमंत्री भारतीय जनऔषधी केंद्र" या नावाने सर्व वैधानिक औषध साठवणूक नियमांचे पालन करणारा औषध परवाना आवश्यक.' },
        { title: 'अंतर धोरण (Distance Norms)', text: 'शहराच्या श्रेणीनुसार अंतराचे निकष लागू (उदा. मेट्रो शहरे आणि १० लाखांपेक्षा जास्त लोकसंख्या असलेल्या शहरांमध्ये श्रेणी A अंतर्गत कठोर अंतराचे नियम).' }
      ],
      sec4Num: '४.०',
      sec4Title: 'अर्ज प्रक्रिया (केंद्र सुरू करण्यासाठी)',
      sec4Sub: 'जन औषधी केंद्र स्थापन व सुरू करण्यासाठी ५ टप्प्यांची सोपी प्रक्रिया',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'PMBI कडे अर्ज सादर करा', text: 'janaushadhi.gov.in द्वारे ऑनलाइन अर्ज करा किंवा विहित ऑफलाइन फॉर्म भरून आवश्यक कागदपत्रांसह सादर करा.' },
        { step: 'टप्पा ०२', title: 'व्यावसायिक जागा निश्चित करा', text: 'किमान १२० चौरस फूट व्यावसायिक जागा (मालकीची किंवा वैध भाडेकरार) तयार करा.' },
        { step: 'टप्पा ०३', title: 'फार्मासिस्ट नेमणूक व परवाना', text: 'पात्र B.Pharma/D.Pharma फार्मासिस्टची नेमणूक करा आणि केंद्राच्या नावाने औषध परवाना प्राप्त करा.' },
        { step: 'टप्पा ०४', title: 'अंतर तपासणी व सामंजस्य करार', text: 'PMBI च्या अंतराच्या नियमांची पूर्तता करा, करारावर स्वाक्षरी करा आणि सॉफ्टवेअर आयडी व औषधांचा पुरवठा मिळवा.' },
        { step: 'टप्पा ०५', title: 'उद्घाटन व औषध वितरण', text: 'नागरिकांना दर्जेदार जेनेरिक औषधांचे वितरण सुरू करा आणि PMBI कडून १५% मासिक खरेदी प्रोत्साहन मिळवा.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'उद्योजक प्रोत्साहन व कमिशन रचना',
      sec5Sub: 'भांडवली मदत, मासिक खरेदी परतावा आणि किरकोळ नफा',
      datesBadge: 'शाश्वत स्वयंरोजगार उपक्रम',
      datesHeading: 'प्रोत्साहन आणि कमिशन वेळापत्रक',
      datesRange: '₹५ लाखांपर्यंत सर्वसाधारण प्रोत्साहन | ₹२ लाख विशेष प्रोत्साहन | २०% एमआरपी मार्जिन',
      datesNote: 'सर्वसाधारण प्रोत्साहन मासिक खरेदीच्या १५% (कमाल ₹१५,०००/महिना) दराने ₹५ लाखांपर्यंत परत केले जाते. महिला, दिव्यांग, एससी/एसटी आणि दुर्गम भागातील केंद्रांसाठी ₹२ लाखांचे एकरकमी अतिरिक्त प्रोत्साहन. औषधांच्या छापील किमतीवर २०% किरकोळ नफा. मदतीसाठी जनऔषधी सुगम ॲप वापरा किंवा PMBI शी संपर्क साधा.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'भारतीय फार्मा आणि वैद्यकीय साधने ब्युरो (PMBI) पोर्टल',
      sourcesNote: 'या पृष्ठावरील माहिती थेट भारत सरकारच्या अधिकृत संकेतस्थळावरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'भारतीय फार्मा आणि वैद्यकीय ब्युरो (PMBI) — janaushadhi.gov.in', url: 'https://janaushadhi.gov.in' },
        { label: 'औषधनिर्माण विभाग, भारत सरकार', url: 'https://dop.gov.in' },
        { label: 'जनऔषधी सुगम ॲप (Android/iOS)', url: 'https://janaushadhi.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे (केंद्र सुरू करण्यासाठी)',
      sec7Sub: 'केंद्र मंजुरी आणि औषध परवान्यासाठी कागदपत्रांची यादी',
      requiredDocuments: [
        { title: 'अर्जदाराचा ओळख व पत्ता पुरावा', desc: 'अर्जदार किंवा संस्थाप्रमुखाचे आधार कार्ड, पॅन कार्ड आणि वैध रहिवासी पत्ता पुरावा' },
        { title: 'फार्मासिस्टचे पदवी/पदविका प्रमाणपत्र', desc: 'B.Pharma / D.Pharma पदवी प्रमाणपत्र आणि राज्य फार्मसी कौन्सिलचे सक्रिय नोंदणी प्रमाणपत्र' },
        { title: 'जागेचा मालकी हक्क / भाडेकरार', desc: 'किमान १२० चौरस फूट व्यावसायिक जागेचा नोंदणीकृत भाडेकरार किंवा मालकी हक्क दस्तऐवज' },
        { title: 'औषध परवाना अर्ज कागदपत्रे', desc: 'प्रधानमंत्री भारतीय जन औषधी केंद्राच्या नावाने लागू केलेले फॉर्म २० व फॉर्म २१ वैधानिक औषध परवाना अर्ज' }
      ],
      docsAlert: 'नागरिक व अर्जदारांसाठी महत्त्वाची माहिती: PMBJP अंतर्गत वितरित केली जाणारी सर्व जेनेरिक औषधे ब्रँडेड औषधांइतकीच प्रभावी असल्याची खात्री करण्यासाठी NABL-मान्यताप्राप्त प्रयोगशाळांमध्ये कसून तपासली जातात. जवळचे केंद्र शोधण्यासाठी आणि औषधांच्या किमती तपासण्यासाठी "जनऔषधी सुगम" ॲप वापरा. अनधिकृत दलालांपासून सावध राहा.'
    }
  },
  hs1: {
    en: {
      title: 'Pradhan Mantri Awas Yojana – Urban & Gramin (PMAY)',
      dept: 'Urban: Ministry of Housing and Urban Affairs | Gramin: Ministry of Rural Development, GoI',
      badge: 'Housing for All',
      verifiedBadge: 'HOUSING FOR ALL MISSION (PMAY-U & PMAY-G)',
      dbtBadge: 'DIRECT CONSTRUCTION GRANT & INTEREST SUBSIDY',
      refCode: 'Portal Ref: PMAY-GOI2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Interest subsidy up to ₹1.80 lakh (Urban) / Direct construction assistance up to ₹1.20–1.30 lakh (Gramin)',
      applyOnline: 'Apply Online (pmay-urban.gov.in)',
      autofillReady: 'MoHUA & MoRD Portal',
      backToCategory: 'Back to Housing Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Flagship national mission providing pucca houses with basic amenities to urban and rural households',
      overview: 'PMAY is the Centre\'s "Housing for All" mission, launched 25 June 2015, split into two verticals: PMAY-Urban for city households and PMAY-Gramin for rural households. PMAY-Urban 2.0 aims to provide financial assistance to one crore families to purchase, construct, or improve a house, offering a subsidy of up to ₹1.80 lakh on home interest and financial assistance of up to ₹2.5 lakh to beneficiaries. On the rural side, the Union Cabinet approved a fresh phase of PMAY-Gramin for FY 2024-25 to FY 2028-29, adding a target of 2 crore more rural houses with an outlay of ₹3.06 lakh crore.',
      facts: [
        { label: 'PMAY-Urban 2.0 Target', value: '1 Crore urban families (Subsidy up to ₹1.80L / Grant up to ₹2.5L)' },
        { label: 'PMAY-Gramin Outlay', value: '2 Crore additional rural houses (FY 2024–29, ₹3.06 Lakh Crore)' },
        { label: 'Rural Assistance Amount', value: '₹1.20 Lakh (Plain) / ₹1.30 Lakh (Hilly, NE & IAP areas)' },
        { label: 'Women Ownership', value: 'Mandatory female ownership/co-ownership (80% houses owned by women)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Urban interest subsidies, rural construction grants, and mandatory female property ownership',
      keyBenefits: [
        {
          title: 'PMAY-Urban 2.0 Subsidy & Construction Aid',
          text: 'Financial assistance of up to ₹2.50 lakh per eligible family to help build a new pucca house or buy one, with home loan interest subsidy of up to ₹1.80 lakh.'
        },
        {
          title: 'Multiple Urban Verticals',
          text: 'Four different components tailored to income level, funding access, and land availability (Beneficiary-led Construction, Affordable Rental Housing, Interest Subsidy, In-situ Slum Redevelopment).'
        },
        {
          title: 'Mandatory Women\'s Ownership',
          text: 'Mandatory statutory provision that the female head of the family should be the owner or co-owner of the property built under PMAY-Urban; women own 80% of the houses sanctioned under the scheme.'
        },
        {
          title: 'PMAY-Gramin Direct Construction Assistance',
          text: '₹1.20 lakh direct financial grant in plain areas and ₹1.30 lakh in hilly, North-Eastern, or IAP (Integrated Action Plan) areas disbursed stage-wise via DBT.'
        },
        {
          title: 'Relaxed Gramin Eligibility (2024–29 Phase)',
          text: 'The monthly household income ceiling was raised from ₹10,000 to ₹15,000, and owning a two-wheeler or a refrigerator no longer disqualifies a rural family.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Eligibility Criteria (Urban & Gramin)',
      sec3Sub: 'Income ceilings, homeless status and pucca house ownership restrictions',
      eligibility: [
        { title: 'PMAY-Urban Income Categories', text: 'Economically Weaker Sections (EWS) with annual household income up to ₹3 lakh, plus separate Low Income Group (LIG) and Middle Income Group (MIG) brackets.' },
        { title: 'PMAY-Urban Ownership Condition', text: 'The applicant and family members must not already own a pucca house anywhere in India.' },
        { title: 'PMAY-Gramin Income Ceiling', text: 'Monthly household income up to ₹15,000 (revised upward in the 2024–29 fresh implementation phase).' },
        { title: 'PMAY-Gramin Housing Status', text: 'Household must be houseless or living in a zero/one/two-room kutcha or dilapidated house, as identified through the official rural housing survey.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Application & Identification Process',
      sec4Sub: 'Urban online application vs rural transparent survey-based identification',
      applicationSteps: [
        { step: 'Step 01', title: 'Urban Direct Online Application', text: 'Urban citizens apply directly online via the official PMAY-U portal (pmay-urban.gov.in / pmaymis.gov.in) with Aadhaar authentication.' },
        { step: 'Step 02', title: 'Gramin Survey-Based Identification', text: 'Rural households do not submit direct online applications; beneficiaries are identified through survey-based enumeration by Gram Panchayat and block authorities.' },
        { step: 'Step 03', title: 'Site Inspection & Geotagging', text: 'Municipal/Gram Panchayat officials inspect land ownership, existing kutcha dwelling, and capture geo-tagged foundation photos.' },
        { step: 'Step 04', title: 'Stage-wise DBT Disbursement', text: 'Financial assistance is released directly into Aadhaar-seeded bank accounts at foundation, plinth, lintel, and completion stages.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Implementation Framework & Budget Outlay',
      sec5Sub: 'PMAY-Urban 2.0 and PMAY-Gramin 2024-29 budgetary allocations',
      datesBadge: 'National Housing Mission',
      datesHeading: 'Active Implementation Cycles',
      datesRange: 'PMAY-U 2.0 Active | PMAY-Gramin Phase (FY 2024-25 to 2028-29, ₹3.06 Lakh Cr)',
      datesNote: 'PMAY-Urban 2.0 invites direct citizen applications online. PMAY-Gramin 2024-29 phase has a targeted allocation of 2 crore houses. Helplines: 011-23063285 (Urban) / 1800-11-6446 (Gramin).',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Ministry of Housing & Urban Affairs and Ministry of Rural Development portals',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government of India portals:',
      sources: [
        { label: 'PMAY-Urban Portal — pmay-urban.gov.in / pmaymis.gov.in', url: 'https://pmay-urban.gov.in' },
        { label: 'PMAY-Gramin Official Portal — pmayg.nic.in', url: 'https://pmayg.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Checklist of verified documents required for application and field verification',
      requiredDocuments: [
        { title: 'Aadhaar Card', desc: 'Mandatory for applicant and all adult family members for biometric and deduplication verification' },
        { title: 'Income Certificate', desc: 'Official certificate issued by competent authority establishing EWS/LIG or rural income criteria' },
        { title: 'Bank Account Details', desc: 'Active bank passbook copy / cancelled cheque with Aadhaar-NPCI seeding for direct grant transfer' },
        { title: 'Proof of No Pucca House', desc: 'Self-declaration affidavit confirming no family member owns a permanent pucca house in India' },
        { title: 'Land Documents (Where Applicable)', desc: '7/12 extract, property card, or patta papers for rural or beneficiary-led construction' }
      ],
      docsAlert: 'Important Notice: Government housing assistance under PMAY is 100% free of middlemen charges. Do not pay any agent claiming to guarantee allotment. PMAY-Urban applications are filed directly online at pmay-urban.gov.in, while PMAY-Gramin beneficiaries are selected via official Gram Sabha verification.'
    },
    hi: {
      title: 'प्रधानमंत्री आवास योजना – शहरी एवं ग्रामीण (PMAY)',
      dept: 'शहरी: आवासन एवं शहरी कार्य मंत्रालय | ग्रामीण: ग्रामीण विकास मंत्रालय, भारत सरकार',
      badge: 'सबके लिए आवास',
      verifiedBadge: 'सबके लिए आवास मिशन (PMAY-U एवं PMAY-G)',
      dbtBadge: 'प्रत्यक्ष निर्माण अनुदान एवं ब्याज सब्सिडी',
      refCode: 'पोर्टल संदर्भ: PMAY-GOI2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'ब्याज सब्सिडी ₹1.80 लाख तक (शहरी) / प्रत्यक्ष निर्माण सहायता ₹1.20–1.30 लाख तक (ग्रामीण)',
      applyOnline: 'ऑनलाइन आवेदन करें (pmay-urban.gov.in)',
      autofillReady: 'MoHUA एवं MoRD पोर्टल',
      backToCategory: 'आवास योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'शहरी और ग्रामीण परिवारों को पक्के घर उपलब्ध कराने का केंद्र सरकार का प्रमुख राष्ट्रीय मिशन',
      overview: 'PMAY केंद्र सरकार का "सबके लिए आवास" मिशन है, जिसे 25 जून 2015 को शुरू किया गया था। यह दो कार्यक्षेत्रों में विभाजित है: शहरी परिवारों हेतु PMAY-शहरी और ग्रामीण परिवारों हेतु PMAY-ग्रामीण। PMAY-शहरी 2.0 का लक्ष्य एक करोड़ परिवारों को घर खरीदने, निर्माण करने या सुधारने हेतु वित्तीय सहायता प्रदान करना है, जिसमें गृह ऋण ब्याज पर ₹1.80 लाख तक की सब्सिडी और ₹2.5 लाख तक की वित्तीय सहायता शामिल है। ग्रामीण क्षेत्र में, केंद्रीय मंत्रिमंडल ने वित्तीय वर्ष 2024-25 से 2028-29 हेतु ₹3.06 लाख करोड़ के परिव्यय के साथ 2 करोड़ अतिरिक्त ग्रामीण घरों के लक्ष्य को मंजूरी दी है।',
      facts: [
        { label: 'PMAY-शहरी 2.0 लक्ष्य', value: '1 करोड़ शहरी परिवार (सब्सिडी ₹1.80 लाख / सहायता ₹2.5 लाख तक)' },
        { label: 'PMAY-ग्रामीण परिव्यय', value: '2 करोड़ अतिरिक्त ग्रामीण घर (वित्त वर्ष 2024-29, ₹3.06 लाख करोड़)' },
        { label: 'ग्रामीण सहायता राशि', value: '₹1.20 लाख (मैदानी क्षेत्र) / ₹1.30 लाख (पहाड़ी, पूर्वोत्तर व IAP क्षेत्र)' },
        { label: 'महिला स्वामित्व', value: 'महिला का अनिवार्य स्वामित्व/सह-स्वामित्व (80% स्वीकृत मकान महिलाओं के नाम)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'शहरी ब्याज सब्सिडी, ग्रामीण प्रत्यक्ष अनुदान और अनिवार्य महिला संपत्ति अधिकार',
      keyBenefits: [
        {
          title: 'PMAY-शहरी 2.0 सब्सिडी एवं निर्माण सहायता',
          text: 'नया पक्का मकान बनाने या खरीदने हेतु प्रति पात्र परिवार ₹2.50 लाख तक की वित्तीय सहायता, तथा होम लोन ब्याज पर ₹1.80 लाख तक की सब्सिडी।'
        },
        {
          title: 'बहुआयामी शहरी घटक (Multiple Verticals)',
          text: 'आय स्तर, धन की उपलब्धता और भूमि के अनुसार तैयार 4 अलग-अलग घटक (लाभार्थी नेतृत्व वाला निर्माण, किफायती किराया आवास, ब्याज सब्सिडी, इन-सिटू स्लम पुनर्विकास)।'
        },
        {
          title: 'अनिवार्य महिला स्वामित्व',
          text: 'PMAY-शहरी के तहत निर्मित संपत्ति की मालकिन या सह-मालकिन परिवार की महिला मुखिया होना अनिवार्य है; योजना के 80% घर महिलाओं के स्वामित्व में हैं।'
        },
        {
          title: 'PMAY-ग्रामीण प्रत्यक्ष निर्माण सहायता',
          text: 'मैदानी क्षेत्रों में ₹1.20 लाख और पहाड़ी, पूर्वोत्तर व IAP (एकीकृत कार्य योजना) क्षेत्रों में ₹1.30 लाख की प्रत्यक्ष सहायता DBT के जरिए।'
        },
        {
          title: 'आसान ग्रामीण पात्रता (2024-29 चरण)',
          text: 'मासिक पारिवारिक आय सीमा ₹10,000 से बढ़ाकर ₹15,000 कर दी गई है, और दोपहिया वाहन या फ्रिज होना अब परिवार को अयोग्य नहीं ठहराता।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'पात्रता मानदंड (शहरी एवं ग्रामीण)',
      sec3Sub: 'आय सीमा, आवासहीन स्थिति और पक्के मकान के स्वामित्व संबंधी नियम',
      eligibility: [
        { title: 'PMAY-शहरी आय वर्ग', text: '₹3 लाख तक की वार्षिक आय वाले आर्थिक रूप से कमजोर वर्ग (EWS), तथा निम्न आय वर्ग (LIG) और मध्यम आय वर्ग (MIG)।' },
        { title: 'PMAY-शहरी पक्का मकान शर्त', text: 'आवेदक या उसके परिवार के किसी भी सदस्य के पास भारत में कहीं भी पक्का मकान नहीं होना चाहिए।' },
        { title: 'PMAY-ग्रामीण आय सीमा', text: 'मासिक पारिवारिक आय ₹15,000 तक (2024-29 चरण में संशोधित)।' },
        { title: 'PMAY-ग्रामीण आवास स्थिति', text: 'परिवार बेघर होना चाहिए या ग्रामीण आवास सर्वेक्षण (Awaas+) द्वारा पहचाने गए कच्चे/जर्जर घर में रहता हो।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'आवेदन एवं चयन प्रक्रिया',
      sec4Sub: 'शहरी नागरिकों हेतु सीधा ऑनलाइन पोर्टल और ग्रामीणों हेतु पारदर्शी सर्वेक्षण',
      applicationSteps: [
        { step: 'चरण 01', title: 'शहरी ऑनलाइन आवेदन', text: 'शहरी नागरिक PMAY-U आधिकारिक पोर्टल (pmay-urban.gov.in / pmaymis.gov.in) पर आधार प्रमाणीकरण द्वारा सीधे आवेदन करते हैं।' },
        { step: 'चरण 02', title: 'ग्रामीण सर्वेक्षण पहचान', text: 'ग्रामीण लाभार्थी सीधे ऑनलाइन आवेदन नहीं करते; उनकी पहचान ग्राम पंचायत और ग्रामीण प्रशासन के आधिकारिक सर्वेक्षण द्वारा होती है।' },
        { step: 'चरण 03', title: 'स्थलीय निरीक्षण व जियोटैगिंग', text: 'अधिकारियों द्वारा भूमि, मौजूदा कच्चे मकान की जांच और निर्माण के प्रत्येक चरण की जियो-टैग्ड तस्वीरें ली जाती हैं।' },
        { step: 'चरण 04', title: 'चरणबद्ध DBT किस्त भुगतान', text: 'नींव, लिंटेल, छत और पूर्णता स्तर पर वित्तीय सहायता सीधे आधार से जुड़े बैंक खाते में हस्तांतरित की जाती है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'कार्यान्वयन ढांचा एवं बजट परिव्यय',
      sec5Sub: 'PMAY-शहरी 2.0 और PMAY-ग्रामीण 2024-29 आवंटन विवरण',
      datesBadge: 'राष्ट्रीय आवास मिशन',
      datesHeading: 'सक्रिय कार्यान्वयन चक्र',
      datesRange: 'PMAY-U 2.0 सक्रिय | PMAY-ग्रामीण चरण (वित्त वर्ष 2024-25 से 2028-29, ₹3.06 लाख करोड़)',
      datesNote: 'PMAY-शहरी 2.0 पर सीधे ऑनलाइन आवेदन लिए जा रहे हैं। PMAY-ग्रामीण के नए चरण में 2 करोड़ अतिरिक्त घरों का लक्ष्य रखा गया है। हेल्पलाइन: 011-23063285 (शहरी) / 1800-11-6446 (ग्रामीण)।',
      sec6Num: '6.0',
      sec6Title: 'अधिकृत स्रोत व सत्यापन',
      sec6Sub: 'आवासन एवं शहरी कार्य मंत्रालय तथा ग्रामीण विकास मंत्रालय के पोर्टल',
      sourcesNote: 'इस पृष्ठ पर दी गई जानकारी सीधे भारत सरकार के अधिकृत पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'PMAY-शहरी पोर्टल — pmay-urban.gov.in / pmaymis.gov.in', url: 'https://pmay-urban.gov.in' },
        { label: 'PMAY-ग्रामीण पोर्टल — pmayg.nic.in', url: 'https://pmayg.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'सत्यापन और किस्त भुगतान हेतु आवश्यक अधिकृत प्रमाणपत्र',
      requiredDocuments: [
        { title: 'आधार कार्ड', desc: 'आवेदक और परिवार के सभी वयस्क सदस्यों का पहचान एवं बायोमेट्रिक सत्यापन हेतु अनिवार्य' },
        { title: 'आय प्रमाण पत्र', desc: 'सक्षम राजस्व प्राधिकारी द्वारा जारी EWS/LIG या ग्रामीण आय सीमा प्रमाणित करने वाला दस्तावेज' },
        { title: 'बैंक खाता विवरण', desc: 'डीबीटी के जरिए राशि सीधे खाते में प्राप्त करने हेतु आधार-NPCI लिंक बैंक पासबुक' },
        { title: 'पक्का मकान न होने का प्रमाण', desc: 'भारत में कहीं भी पक्का मकान न होने का स्व-घोषणा पत्र / हलफनामा' },
        { title: 'जमीन के दस्तावेज़ (जहां लागू हो)', desc: 'ग्रामीण या व्यक्तिगत निर्माण हेतु भूमि स्वामित्व दस्तावेज (7/12, पट्टा या प्रॉपर्टी कार्ड)' }
      ],
      docsAlert: 'महत्वपूर्ण सूचना: PMAY योजना के तहत घर आवंटन पूर्णतः निःशुल्क और पारदर्शी है। किसी भी बिचौलिए या दलाल को पैसे न दें। शहरी नागरिक सीधे pmay-urban.gov.in पर आवेदन करें और ग्रामीण नागरिक अपनी ग्राम पंचायत से संपर्क करें।'
    },
    mr: {
      title: 'प्रधानमंत्री आवास योजना – शहरी व ग्रामीण (PMAY)',
      dept: 'शहरी: गृहनिर्माण आणि शहरी व्यवहार मंत्रालय | ग्रामीण: ग्रामीण विकास मंत्रालय, भारत सरकार',
      badge: 'सर्वांसाठी घरे',
      verifiedBadge: 'सर्वांसाठी घरे राष्ट्रीय मोहीम (PMAY-U व PMAY-G)',
      dbtBadge: 'थेट बांधकाम अनुदान व व्याज सवलत',
      refCode: 'पोर्टल संदर्भ: PMAY-GOI2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक सहाय्य',
      benefitsHighlight: 'व्याज सबसिडी ₹१.८० लाखांपर्यंत (शहरी) / थेट बांधकाम सहाय्य ₹१.२०–१.३० लाख (ग्रामीण)',
      applyOnline: 'ऑनलाइन अर्ज करा (pmay-urban.gov.in)',
      autofillReady: 'MoHUA व MoRD पोर्टल',
      backToCategory: 'गृहनिर्माण योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'शहरी आणि ग्रामीण भागातील बेघर व कच्च्या घरातील नागरिकांसाठी केंद्र सरकारची घरे देण्याची मोहीम',
      overview: 'PMAY ही केंद्र सरकारची "सर्वांसाठी घरे" ही राष्ट्रीय मोहीम आहे, जी २५ जून २०१५ रोजी सुरू झाली. याचे दोन विभाग आहेत: शहरी कुटुंबांसाठी PMAY-शहरी आणि ग्रामीण भागासाठी PMAY-ग्रामीण. PMAY-शहरी २.० अंतर्गत १ कोटी कुटुंबांना घरे खरेदी, बांधकाम किंवा सुधारणेसाठी आर्थिक सहाय्य दिले जात असून यात गृहकर्जावर ₹१.८० लाखांपर्यंत व्याज सवलत आणि ₹२.५ लाखांपर्यंत थेट सहाय्य मिळते. ग्रामीण भागात, केंद्रीय मंत्रिमंडळाने आर्थिक वर्ष २०२४-२५ ते २०२८-२९ साठी ₹३.०६ लाख कोटी खर्चासह २ कोटी अतिरिक्त ग्रामीण घरांचे उद्दिष्ट मंजूर केले आहे.',
      facts: [
        { label: 'PMAY-शहरी २.० उद्दिष्ट', value: '१ कोटी शहरी कुटुंबे (सवलत ₹१.८० लाखांपर्यंत / सहाय्य ₹२.५ लाख)' },
        { label: 'PMAY-ग्रामीण आर्थिक तरतूद', value: '२ कोटी अतिरिक्त ग्रामीण घरे (आर्थिक वर्ष २०२४-२९, ₹३.०६ लाख कोटी)' },
        { label: 'ग्रामीण अनुदान रक्कम', value: '₹१.२० लाख (सपाट भाग) / ₹१.३० लाख (डोंगर, ईशान्य व नक्षलग्रस्त भाग)' },
        { label: 'महिला मालकी हक्क', value: 'महिला कुटुंबप्रमुखाची मालकी किंवा सह-मालकी बंधनकारक (८०% घरे महिलांच्या नावावर)' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व फायदे',
      sec2Sub: 'शहरी व्याज सबसिडी, ग्रामीण थेट बांधकाम अनुदान आणि महिलांच्या नावे घर मालकी हक्क',
      keyBenefits: [
        {
          title: 'PMAY-शहरी २.० सबसिडी व बांधकाम मदत',
          text: 'पात्र कुटुंबाला नवीन पक्के घर बांधण्यासाठी किंवा खरेदी करण्यासाठी ₹२.५० लाखांपर्यंतचे सहाय्य आणि ₹१.८० लाखांपर्यंत गृहकर्ज व्याज सबसिडी.'
        },
        {
          title: 'विविध शहरी घटक (Multiple Verticals)',
          text: 'उत्पन्न आणि जागेच्या उपलब्धतेनुसार ४ स्वतंत्र घटक (लाभार्थीच्या जागेवर बांधकाम, परवडणारी भाडे घरे, व्याज सबसिडी, झोपडपट्टी पुनर्विकास).'
        },
        {
          title: 'महिलांची अनिवार्य मालकी',
          text: 'PMAY-शहरी अंतर्गत बांधल्या जाणाऱ्या घराची मालक किंवा सह-मालक कुटुंबातील महिला असणे बंधनकारक आहे; योजनेतील ८०% घरे महिलांच्या मालकीची आहेत.'
        },
        {
          title: 'PMAY-ग्रामीण थेट बांधकाम मदत',
          text: 'सर्वसाधारण सपाट भागासाठी ₹१.२० लाख आणि डोंगराळ, ईशान्य व नक्षलग्रस्त (IAP) भागासाठी ₹१.३० लाखांचे थेट अनुदान DBT द्वारे थेट खात्यात.'
        },
        {
          title: 'ग्रामीण पात्रता निकष शिथिल (२०२४-२९ टप्पा)',
          text: 'मासिक कौटुंबिक उत्पन्नाची मर्यादा ₹१०,००० वरून ₹१५,००० करण्यात आली आहे, तसेच दुचाकी किंवा फ्रिज असणाऱ्या कुटुंबांना अपात्र ठरवले जात नाही.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'पात्रतेचे निकष (शहरी व ग्रामीण)',
      sec3Sub: 'उत्पन्न मर्यादा, बेघर स्थिती आणि पक्क्या घराच्या मालकीविषयीच्या अटी',
      eligibility: [
        { title: 'PMAY-शहरी उत्पन्न प्रवर्ग', text: 'वार्षिक ₹३ लाखांपर्यंत उत्पन्न असलेले आर्थिक दुर्बल घटक (EWS), तसेच अल्प उत्पन्न गट (LIG) आणि मध्यम उत्पन्न गट (MIG).' },
        { title: 'PMAY-शहरी पक्के घर नसण्याची अट', text: 'अर्जदाराच्या किंवा त्याच्या कुटुंबातील कोणाच्याही नावावर भारतात कुठेही स्वतःचे पक्के घर नसावे.' },
        { title: 'PMAY-ग्रामीण मासिक उत्पन्न मर्यादा', text: 'मासिक कौटुंबिक उत्पन्न ₹१५,००० पर्यंत (२०२४-२९ च्या नवीन टप्प्यानुसार).' },
        { title: 'PMAY-ग्रामीण घराची स्थिती', text: 'कुटुंब बेघर असणे किंवा अधिकृत ग्रामीण आवास सर्वेक्षणात (Awaas+) नोंदवलेल्या कच्च्या/पडक्या घरात राहणारे असणे आवश्यक.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'अर्ज व निवड प्रक्रिया',
      sec4Sub: 'शहरी नागरिकांसाठी थेट ऑनलाइन अर्ज आणि ग्रामीण भागात पारदर्शक सर्वेक्षण',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'शहरी थेट ऑनलाइन अर्ज', text: 'शहरी नागरिक अधिकृत PMAY-U पोर्टलवर (pmay-urban.gov.in / pmaymis.gov.in) आधार पडताळणीसह थेट अर्ज करू शकतात.' },
        { step: 'टप्पा ०२', title: 'ग्रामीण सर्वेक्षण नोंदणी', text: 'ग्रामीण लाभार्थी थेट ऑनलाइन अर्ज करत नाहीत; ग्रामपंचायत आणि ग्रामीण प्रशासनाच्या अधिकृत सर्वेक्षणातून यादी तयार केली जाते.' },
        { step: 'टप्पा ०३', title: 'जागेची पाहणी व जिओटॅगिंग', text: 'प्रशासकीय अधिकाऱ्यांमार्फत जागेची पाहणी, कच्च्या घराची खात्री आणि बांधकामाच्या प्रत्येक टप्प्याचे जिओ-टॅग फोटो घेतले जातात.' },
        { step: 'टप्पा ०४', title: 'हप्त्यांमध्ये थेट DBT वितरण', text: 'पाया, लिंटेल, छत आणि पूर्णत्वाच्या टप्प्यानुसार अनुदानाची रक्कम थेट आधार संलग्न बँक खात्यात जमा होते.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'अंमलबजावणी व आर्थिक तरतूद',
      sec5Sub: 'PMAY-शहरी २.० आणि ग्रामीण २०२४-२९ उद्दिष्टे',
      datesBadge: 'राष्ट्रीय गृहनिर्माण मोहीम',
      datesHeading: 'सध्याचे अंमलबजावणी टप्पे',
      datesRange: 'PMAY-U २.० सक्रिय | PMAY-ग्रामीण टप्पा (आर्थिक वर्ष २०२४-२५ ते २०२८-२९, ₹३.०६ लाख कोटी)',
      datesNote: 'PMAY-शहरी २.० साठी ऑनलाइन नागरिक अर्ज सुरू आहेत. ग्रामीण भागात २ कोटी नवीन घरे बांधण्याचे उद्दिष्ट आहे. अधिकृत हेल्पलाइन: ०११-२३०६३२८५ (शहरी) / १८००-११-६४४६ (ग्रामीण).',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'शहरी व्यवहार मंत्रालय आणि ग्रामीण विकास मंत्रालयाची अधिकृत संकेतस्थळे',
      sourcesNote: 'या पृष्ठावरील माहिती थेट भारत सरकारच्या अधिकृत पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'PMAY-शहरी पोर्टल — pmay-urban.gov.in / pmaymis.gov.in', url: 'https://pmay-urban.gov.in' },
        { label: 'PMAY-ग्रामीण अधिकृत पोर्टल — pmayg.nic.in', url: 'https://pmayg.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'पडताळणी आणि अनुदान मंजुरीसाठी सादर करावयाचे पुरावे',
      requiredDocuments: [
        { title: 'आधार कार्ड', desc: 'अर्जदार आणि कुटुंबातील सर्व प्रौढ सदस्यांचे बायोमेट्रिक पडताळणीसाठी अनिवार्य' },
        { title: 'उत्पन्न दाखला', desc: 'सक्षम महसूल अधिकाऱ्याने दिलेला अधिकृत उत्पन्न दाखला' },
        { title: 'बँक खाते तपशील', desc: 'डीबीटीद्वारे अनुदान थेट मिळण्यासाठी आधार व एनपीसीआयशी जोडलेले बँक पासबुक' },
        { title: 'पक्के घर नसण्याचे प्रतिज्ञापत्र', desc: 'भारतात कुठेही स्वतःचे पक्के घर नसल्याबाबतचे स्वयंघोषणापत्र किंवा प्रतिज्ञापत्र' },
        { title: 'जागेची कागदपत्रे (लागू असल्यास)', desc: 'ग्रामीण किंवा वैयक्तिक बांधकामासाठी ७/१२ उतारा, मालमत्ता पत्रक किंवा पट्टा' }
      ],
      docsAlert: 'महत्त्वाची सूचना: PMAY अंतर्गत घर मिळवून देण्यासाठी कोणत्याही दलालाला पैसे देऊ नका. ही सरकारी प्रक्रिया पूर्णपणे मोफत आणि पारदर्शक आहे. शहरी अर्जांसाठी pmay-urban.gov.in वापरावे आणि ग्रामीण नागरिकांनी आपल्या ग्रामपंचायतीशी संपर्क साधावा.'
    }
  },
  hs2: {
    en: {
      title: 'Ramai Awas Gharkul Yojana',
      dept: 'Social Justice & Special Assistance Department, Government of Maharashtra',
      badge: 'Permanent Home Grant',
      verifiedBadge: 'MAHARASHTRA SOCIAL JUSTICE HOUSING',
      dbtBadge: 'DIRECT GRANT & CONVERGENCE ASSISTANCE',
      refCode: 'Portal Ref: RAMAI-MH2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Direct grant for house construction — ₹1,00,000 to ₹2,00,000 depending on area (plus MGNREGA & Swachh Bharat convergence up to ₹1,58,730 in rural areas)',
      applyOnline: 'Apply Online / District Social Welfare (sjsa.maharashtra.gov.in)',
      autofillReady: 'Social Justice Dept Portal',
      backToCategory: 'Back to Housing Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Maharashtra state housing scheme for Scheduled Caste & Neo-Buddhist (Nav-Buddha) families',
      overview: 'This is a housing scheme by Maharashtra\'s Social Justice & Special Assistance Department aimed at raising the standard of living of Scheduled Caste (SC) and Neo-Buddhist (Nav-Buddha) communities in both rural and urban areas, by providing financial assistance to construct a pucca house on their own land.',
      facts: [
        { label: 'Target Beneficiaries', value: 'Scheduled Caste (SC) & Neo-Buddhist (Nav-Buddha) families' },
        { label: 'Rural Base Grant', value: '₹1,00,000 (Beneficiary contribution: Nil)' },
        { label: 'Municipal Area Grant', value: '₹1,50,000 (Beneficiary share: 7.5%)' },
        { label: 'Municipal Corporation Grant', value: '₹2,00,000 (Beneficiary share: 10%)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Area-specific housing grants, convergence with MGNREGA wages and Swachh Bharat toilets',
      keyBenefits: [
        {
          title: 'Area-Based Grant Amount',
          text: 'Benefits vary by where the beneficiary lives: Rural Area: ₹1,00,000 (own share: Nil); Municipal Area: ₹1,50,000 (beneficiary share: 7.5%); Municipal Corporation: ₹2,00,000 (beneficiary share: 10%).'
        },
        {
          title: 'Convergence with Other Schemes',
          text: 'Additional support on top of the housing grant for rural beneficiaries: 90 days of unskilled labour wages under MGNREGA (₹26,730), plus up to ₹12,000 for toilet construction under Swachh Bharat Mission/MGNREGA if not already provided — bringing total rural assistance to roughly ₹1,58,730.'
        },
        {
          title: 'Direct Bank Transfer (DBT)',
          text: 'Funds credited directly to the beneficiary\'s bank account, released in installments as construction progresses from foundation to completion.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Eligibility Criteria',
      sec3Sub: 'Category, residency, income limits and land ownership conditions',
      eligibility: [
        { title: 'Category Requirement', text: 'Must belong to Scheduled Caste (SC) or Neo-Buddhist (Nav-Buddha) community.' },
        { title: 'Maharashtra Residency', text: 'Must have lived in Maharashtra for at least 15 continuous years (domicile proof required).' },
        { title: 'Income Limits (Varies by Area)', text: 'Rural: up to ₹1,00,000/year; Municipal Area: up to ₹1,50,000/year; Municipal Corporation: up to ₹2,00,000/year.' },
        { title: 'Land Ownership Condition', text: 'Applicant must own land, since the house is to be constructed on it (or built in-situ where an existing kutcha house stands).' },
        { title: 'Single Benefit Rule', text: 'Only one person per family can receive the benefit; must not already be receiving benefits under any other government housing scheme.' },
        { title: 'Priority to BPL', text: 'Preference is given to Below Poverty Line (BPL) applicants.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Application & Sanction Process',
      sec4Sub: 'Offline through District Social Welfare / DRDA or online through state portal',
      applicationSteps: [
        { step: 'Step 01', title: 'Obtain & Submit Application', text: 'Visit the Assistant Commissioner (Social Welfare Office), Project Director (District Rural Development Agency - DRDA), or District Council/Municipal Commissioner\'s office, or apply online via the official portal.' },
        { step: 'Step 02', title: 'Document & Domicile Verification', text: 'Social Welfare officials verify 15-year Maharashtra residence proof, caste certificate, and land ownership titles (7/12 extract / property card).' },
        { step: 'Step 03', title: 'Approval & Sanction Order', text: 'District Social Welfare Committee reviews and issues the administrative sanction order for the eligible applicant.' },
        { step: 'Step 04', title: 'Phased DBT Disbursement', text: 'Grant is credited into the bank account in 3 to 4 installments matched to construction progress (plinth, lintel, roof completion).' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Grant Revisions & Regional Norms',
      sec5Sub: 'Annual variations and district-level convergence frameworks',
      datesBadge: 'State SC Welfare Grant',
      datesHeading: 'Financial Framework & Variations',
      datesRange: '₹1.00L to ₹2.00L Base Grant | + ₹58,730 Convergence Support',
      datesNote: 'Note: Grant amounts appear to have been revised over time and vary by district/scheme year (some district portals show a flat ₹1.20 lakh base + convergence benefits). Confirm the current applicable amount for your area on the official portal or District Social Welfare office.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Social Justice & Special Assistance Department and AwaasSoft',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government portals:',
      sources: [
        { label: 'Social Justice & Special Assistance Dept — sjsa.maharashtra.gov.in', url: 'https://sjsa.maharashtra.gov.in' },
        { label: 'AwaasSoft (Beneficiary Tracking) — awaassoft.nic.in', url: 'https://pmayg.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Application checklist required by Social Welfare department',
      requiredDocuments: [
        { title: 'Aadhaar Card', desc: 'Identity verification of the applicant and bank account linking' },
        { title: 'Address Proof / Domicile', desc: 'Proof of continuous residence in Maharashtra for at least 15 years' },
        { title: 'Caste Certificate', desc: 'Valid Scheduled Caste (SC) or Neo-Buddhist (Nav-Buddha) certificate issued by competent authority' },
        { title: 'Identity Card / Ration Card', desc: 'Voter ID or valid family ration card' },
        { title: 'Land Ownership Documents', desc: '7/12 extract, property card, or title deed confirming ownership of the construction plot' },
        { title: 'Photograph & Mobile Number', desc: 'Passport-size photograph and active mobile number for SMS stage alerts' }
      ],
      docsAlert: 'Important Verification Note: Grant amounts appear to have been revised over time and vary by district/scheme year (some district portals show a flat ₹1.20 lakh base + convergence benefits). Confirm the current applicable amount for your specific municipal council or gram panchayat with the District Social Welfare Office.'
    },
    hi: {
      title: 'रमाई आवास घरकुल योजना',
      dept: 'सामाजिक न्याय एवं विशेष सहायता विभाग, महाराष्ट्र सरकार',
      badge: 'पक्का आवास अनुदान',
      verifiedBadge: 'महाराष्ट्र सामाजिक न्याय आवास योजना',
      dbtBadge: 'प्रत्यक्ष अनुदान एवं अभिसरण सहायता',
      refCode: 'पोर्टल संदर्भ: RAMAI-MH2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'मकान निर्माण हेतु प्रत्यक्ष अनुदान — क्षेत्र के आधार पर ₹1,00,000 से ₹2,00,000 (ग्रामीण में मनरेगा एवं स्वच्छ भारत अभिसरण सहित लगभग ₹1,58,730)',
      applyOnline: 'ऑनलाइन आवेदन / समाज कल्याण कार्यालय (sjsa.maharashtra.gov.in)',
      autofillReady: 'सामाजिक न्याय विभाग पोर्टल',
      backToCategory: 'आवास योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'अनुसूचित जाति एवं नव-बौद्ध परिवारों के जीवन स्तर में सुधार हेतु महाराष्ट्र सरकार की आवास योजना',
      overview: 'यह महाराष्ट्र के सामाजिक न्याय और विशेष सहायता विभाग द्वारा ग्रामीण और शहरी दोनों क्षेत्रों में अनुसूचित जाति (SC) और नव-बौद्ध (Nav-Buddha) समुदायों के जीवन स्तर को ऊपर उठाने के उद्देश्य से चलाई जाने वाली एक आवास योजना है, जिसके तहत अपनी जमीन पर पक्का घर बनाने के लिए वित्तीय सहायता दी जाती है।',
      facts: [
        { label: 'लक्षित लाभार्थी', value: 'अनुसूचित जाति (SC) एवं नव-बौद्ध (Nav-Buddha) परिवार' },
        { label: 'ग्रामीण मूल अनुदान', value: '₹1,00,000 (लाभार्थी अंशदान: शून्य)' },
        { label: 'नगरपालिका क्षेत्र अनुदान', value: '₹1,50,000 (लाभार्थी अंशदान: 7.5%)' },
        { label: 'महानगरपालिका अनुदान', value: '₹2,00,000 (लाभार्थी अंशदान: 10%)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'क्षेत्रवार मकान निर्माण अनुदान, मनरेगा मजदूरी एवं शौचालय निर्माण अभिसरण',
      keyBenefits: [
        {
          title: 'क्षेत्र-आधारित अनुदान राशि',
          text: 'लाभार्थी के निवास स्थान के आधार पर लाभ: ग्रामीण क्षेत्र: ₹1,00,000 (लाभार्थी हिस्सा: शून्य); नगरपालिका क्षेत्र: ₹1,50,000 (लाभार्थी हिस्सा: 7.5%); महानगरपालिका: ₹2,00,000 (लाभार्थी हिस्सा: 10%)।'
        },
        {
          title: 'अन्य योजनाओं के साथ अभिसरण (Convergence)',
          text: 'ग्रामीण लाभार्थियों को आवास अनुदान के अलावा अतिरिक्त सहायता — मनरेगा के तहत 90 दिनों की अकुशल मजदूरी (₹26,730), तथा स्वच्छ भारत मिशन/मनरेगा के तहत शौचालय निर्माण हेतु ₹12,000 तक — जिससे कुल सहायता लगभग ₹1,58,730 हो जाती है।'
        },
        {
          title: 'प्रत्यक्ष बैंक अंतरण (DBT)',
          text: 'राशि सीधे लाभार्थी के बैंक खाते में जमा की जाती है, जो निर्माण कार्य की प्रगति के अनुसार किस्तों में जारी होती है।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'जाति वर्ग, 15 वर्ष का अधिवास, आय सीमा एवं भूमि स्वामित्व की शर्तें',
      eligibility: [
        { title: 'जाति प्रवर्ग', text: 'अनुसूचित जाति (SC) या नव-बौद्ध (Nav-Buddha) समुदाय से संबंधित होना अनिवार्य।' },
        { title: 'महाराष्ट्र में निवास', text: 'कम से कम 15 वर्षों से महाराष्ट्र में रहना अनिवार्य है (अधिवास प्रमाण पत्र आवश्यक)।' },
        { title: 'आय सीमा (क्षेत्रवार)', text: 'ग्रामीण: ₹1,00,000/वर्ष तक; नगरपालिका क्षेत्र: ₹1,50,000/वर्ष तक; महानगरपालिका: ₹2,00,000/वर्ष तक।' },
        { title: 'भूमि का स्वामित्व', text: 'आवेदक के पास अपनी जमीन होनी चाहिए, क्योंकि मकान उसी पर बनना है (या जहां मौजूदा कच्चा मकान है वहां पुनर्निर्माण)।' },
        { title: 'प्रति परिवार एक लाभ', text: 'प्रति परिवार केवल एक व्यक्ति को लाभ मिल सकता है; किसी अन्य सरकारी आवास योजना का लाभ न ले रहा हो।' },
        { title: 'बीपीएल को प्राथमिकता', text: 'गरीबी रेखा से नीचे (BPL) वाले आवेदकों को प्राथमिकता दी जाती है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'आवेदन एवं स्वीकृति प्रक्रिया',
      sec4Sub: 'जिला समाज कल्याण / DRDA कार्यालय से ऑफलाइन अथवा आधिकारिक पोर्टल से ऑनलाइन',
      applicationSteps: [
        { step: 'चरण 01', title: 'आवेदन पत्र प्राप्त व जमा करना', text: 'सहायक आयुक्त (समाज कल्याण), परियोजना निदेशक (जिला ग्रामीण विकास एजेंसी - DRDA), या जिला परिषद/महानगरपालिका कार्यालय से फॉर्म लें, या आधिकारिक पोर्टल से ऑनलाइन आवेदन करें।' },
        { step: 'चरण 02', title: 'दस्तावेज़ एवं निवास सत्यापन', text: 'समाज कल्याण विभाग द्वारा 15 वर्षीय निवास प्रमाण, जाति प्रमाण पत्र और भूमि स्वामित्व दस्तावेजों (7/12 उतारा / प्रॉपर्टी कार्ड) की जांच।' },
        { step: 'चरण 03', title: 'जिला समिति द्वारा स्वीकृति', text: 'जिला समाज कल्याण समिति पात्र आवेदकों की समीक्षा कर प्रशासनिक स्वीकृति आदेश जारी करती है।' },
        { step: 'चरण 04', title: 'चरणबद्ध DBT भुगतान', text: 'निर्माण की प्रगति (नींव, लिंटेल, छत) के आधार पर 3 से 4 किस्तों में अनुदान राशि सीधे बैंक खाते में जमा की जाती है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'अनुदान संशोधन एवं क्षेत्रीय नियम',
      sec5Sub: 'समय-समय पर होने वाले संशोधन एवं जिला अभिसरण व्यवस्था',
      datesBadge: 'महाराष्ट्र एससी कल्याण योजना',
      datesHeading: 'वित्तीय रूपरेखा एवं विविधताएं',
      datesRange: '₹1.00 लाख से ₹2.00 लाख मूल अनुदान | + ₹58,730 अभिसरण सहायता',
      datesNote: 'नोट: अनुदान राशि समय के साथ संशोधित होती रही है और जिले/योजना वर्ष के अनुसार भिन्न हो सकती है (कुछ जिला पोर्टल ₹1.20 लाख फ्लैट बेस + अभिसरण लाभ दर्शाते हैं)। अपने क्षेत्र के लिए लागू वर्तमान राशि की पुष्टि आधिकारिक पोर्टल या जिला समाज कल्याण कार्यालय से करें।',
      sec6Num: '6.0',
      sec6Title: 'अधिकृत स्रोत व सत्यापन',
      sec6Sub: 'सामाजिक न्याय एवं विशेष सहायता विभाग तथा आवाससॉफ्ट',
      sourcesNote: 'इस पृष्ठ पर दी गई जानकारी सीधे आधिकारिक सरकारी पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'सामाजिक न्याय एवं विशेष सहायता विभाग — sjsa.maharashtra.gov.in', url: 'https://sjsa.maharashtra.gov.in' },
        { label: 'AwaasSoft (लाभार्थी ट्रैकिंग) — awaassoft.nic.in', url: 'https://pmayg.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'समाज कल्याण विभाग द्वारा निर्धारित आवेदन चेकलिस्ट',
      requiredDocuments: [
        { title: 'आधार कार्ड', desc: 'आवेदक की पहचान और बैंक खाते के सत्यापन हेतु' },
        { title: 'निवास / अधिवास प्रमाण पत्र', desc: 'महाराष्ट्र में न्यूनतम 15 वर्षों के निरंतर निवास का प्रमाण' },
        { title: 'जाति प्रमाण पत्र', desc: 'सक्षम प्राधिकारी द्वारा जारी अनुसूचित जाति (SC) अथवा नव-बौद्ध प्रमाण पत्र' },
        { title: 'पहचान पत्र / राशन कार्ड', desc: 'मतदाता पहचान पत्र या वैध पारिवारिक राशन कार्ड' },
        { title: 'भूमि स्वामित्व दस्तावेज़', desc: '7/12 उतारा, प्रॉपर्टी कार्ड या जमीन का मालिकाना हक दर्शाने वाला दस्तावेज' },
        { title: 'पासपोर्ट फोटो एवं मोबाइल नंबर', desc: 'पासपोर्ट साइज फोटो और एसएमएस अलर्ट हेतु सक्रिय मोबाइल नंबर' }
      ],
      docsAlert: 'महत्वपूर्ण सूचना: अनुदान राशि समय के साथ संशोधित होती रही है और जिले/योजना वर्ष के अनुसार भिन्न हो सकती है (कुछ जिला पोर्टल ₹1.20 लाख फ्लैट बेस + अभिसरण लाभ दर्शाते हैं)। अपने क्षेत्र के लिए लागू सटीक राशि की पुष्टि जिला समाज कल्याण कार्यालय या आधिकारिक पोर्टल से करें।'
    },
    mr: {
      title: 'रमाई आवास घरकुल योजना',
      dept: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
      badge: 'पक्के घरकुल अनुदान',
      verifiedBadge: 'महाराष्ट्र सामाजिक न्याय गृहनिर्माण',
      dbtBadge: 'थेट अनुदान व इतर योजनांचे अभिसरण',
      refCode: 'पोर्टल संदर्भ: RAMAI-MH2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक सहाय्य',
      benefitsHighlight: 'घर बांधकामासाठी थेट अनुदान — क्षेत्रानुसार ₹१,००,००० ते ₹२,००,००० (ग्रामीण भागात मनरेगा व स्वच्छ भारत अभिसरणासह एकूण अंदाजे ₹१,५८,७३०)',
      applyOnline: 'ऑनलाइन अर्ज / समाज कल्याण कार्यालय (sjsa.maharashtra.gov.in)',
      autofillReady: 'सामाजिक न्याय विभाग पोर्टल',
      backToCategory: 'गृहनिर्माण योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'अनुसूचित जाती व नवबौद्ध घटकांतील कुटुंबांना स्वतःच्या जागेवर पक्के घर बांधण्यासाठी महाराष्ट्र शासनाची योजना',
      overview: 'महाराष्ट्रातील ग्रामीण व शहरी भागातील अनुसूचित जाती (SC) आणि नवबौद्ध (Nav-Buddha) घटकांचे राहणीमान उंचावण्यासाठी आणि त्यांना स्वतःच्या जागेवर पक्के घर बांधता यावे यासाठी सामाजिक न्याय व विशेष सहाय्य विभागामार्फत ही योजना राबवली जाते.',
      facts: [
        { label: 'लक्षित लाभार्थी', value: 'अनुसूचित जाती (SC) व नवबौद्ध (Nav-Buddha) कुटुंबे' },
        { label: 'ग्रामीण मूळ अनुदान', value: '₹१,००,००० (लाभार्थी हिस्सा: शून्य)' },
        { label: 'नगरपालिका क्षेत्र अनुदान', value: '₹१,५०,००० (लाभार्थी हिस्सा: ७.५%)' },
        { label: 'महानगरपालिका अनुदान', value: '₹२,००,००० (लाभार्थी हिस्सा: १०%)' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व फायदे',
      sec2Sub: 'क्षेत्रनिहाय घरकुल अनुदान, मनरेगा मजुरी आणि शौचालय बांधकामाचे अभिसरण',
      keyBenefits: [
        {
          title: 'क्षेत्रनिहाय अनुदान रक्कम',
          text: 'लाभार्थ्याच्या रहिवासी क्षेत्रानुसार लाभ: ग्रामीण भाग: ₹१,००,००० (स्वतःचा हिस्सा: शून्य); नगरपालिका क्षेत्र: ₹१,५०,००० (लाभार्थी हिस्सा: ७.५%); महानगरपालिका: ₹२,००,००० (लाभार्थी हिस्सा: १०%).'
        },
        {
          title: 'इतर योजनांशी अभिसरण (Convergence)',
          text: 'ग्रामीण लाभार्थ्यांना घरकुल अनुदानासोबत अतिरिक्त मदत — मनरेगा अंतर्गत ९० दिवसांची अकुशल मजुरी (₹२६,७३०), तसेच स्वच्छ भारत अभियान/मनरेगा अंतर्गत शौचालय बांधकामासाठी ₹१२,००० — यामुळे ग्रामीण भागात एकूण मदत अंदाजे ₹१,५८,७३० पर्यंत होते.'
        },
        {
          title: 'थेट बँक खात्यात वितरण (DBT)',
          text: 'बांधकामाच्या प्रगतीनुसार (पाया, लिंटेल, छत) थेट लाभार्थ्याच्या आधार संलग्न बँक खात्यात हप्त्यांमध्ये रक्कम जमा होते.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'पात्रतेचे निकष',
      sec3Sub: 'प्रवर्ग, १५ वर्षे अधिवास, उत्पन्न मर्यादा आणि जागेच्या मालकीच्या अटी',
      eligibility: [
        { title: 'प्रवर्ग पात्रता', text: 'महाराष्ट्र राज्यातील अनुसूचित जाती किंवा नवबौद्ध समाजातील असणे बंधनकारक.' },
        { title: 'महाराष्ट्रात वास्तव्य', text: 'किमान १५ वर्षे महाराष्ट्रात सलग वास्तव्य असणे आवश्यक (अधिवास दाखला बंधनकारक).' },
        { title: 'उत्पन्न मर्यादा (क्षेत्रनिहाय)', text: 'ग्रामीण भाग: वार्षिक ₹१,००,००० पर्यंत; नगरपालिका क्षेत्र: वार्षिक ₹१,५०,००० पर्यंत; महानगरपालिका: वार्षिक ₹२,००,००० पर्यंत.' },
        { title: 'जागेची मालकी', text: 'अर्जदाराकडे स्वतःची जागा असणे आवश्यक आहे किंवा त्या जागेवर आधीचे कच्चे घर असावे ज्यावर बांधकाम केले जाईल.' },
        { title: 'कुटुंबात एकच लाभ', text: 'एका कुटुंबात एकाच व्यक्तीला लाभ मिळेल; इतर कोणत्याही शासकीय गृहनिर्माण योजनेचा लाभ घेतलेला नसावा.' },
        { title: 'दारिद्र्यरेषेखालील (BPL) प्राधान्य', text: 'दारिद्र्यरेषेखालील (BPL) अर्जदारांना या योजनेत प्राधान्य दिले जाते.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'अर्ज व मंजुरी प्रक्रिया',
      sec4Sub: 'जिल्हा समाज कल्याण / DRDA मार्फत ऑफलाइन किंवा राज्य पोर्टलवरून ऑनलाइन अर्ज',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'अर्ज मिळवणे व सादर करणे', text: 'सहायक आयुक्त (समाज कल्याण कार्यालय), प्रकल्प संचालक (जिल्हा ग्रामीण विकास यंत्रणा - DRDA) किंवा जिल्हा परिषद/महानगरपालिका कार्यालयातून अर्ज घ्यावा किंवा अधिकृत पोर्टलवरून ऑनलाइन भरावा.' },
        { step: 'टप्पा ०२', title: 'कागदपत्रे व १५ वर्षे रहिवास तपासणी', text: 'समाज कल्याण अधिकाऱ्यांमार्फत १५ वर्षांचा रहिवास दाखला, जात प्रमाणपत्र आणि जागेच्या मालकी हक्काची (७/१२ उतारा / मालमत्ता पत्रक) पडताळणी केली जाते.' },
        { step: 'टप्पा ०३', title: 'जिल्हा समितीची प्रशासकीय मंजुरी', text: 'जिल्हा समाज कल्याण समिती पात्र लाभार्थ्यांची छाननी करून प्रशासकीय मंजुरी आदेश जारी करते.' },
        { step: 'टप्पा ०४', title: 'टप्प्याटप्प्याने DBT अनुदान जमा', text: 'बांधकामाच्या प्रत्येक टप्प्यावर (पाया, लिंटेल, छत) थेट बँक खात्यात अनुदानाचे हप्ते जमा होतात.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'अनुदान सुधारणा आणि जिल्हास्तरीय नियम',
      sec5Sub: 'वेळोवेळी होणारे बदल आणि जिल्हा अभिसरण माहिती',
      datesBadge: 'महाराष्ट्र एससी कल्याण योजना',
      datesHeading: 'आर्थिक रचना व बदल',
      datesRange: '₹१.०० लाख ते ₹२.०० लाख मूळ अनुदान | + ₹५८,७३० अभिसरण सहाय्य',
      datesNote: 'टीप: अनुदानाच्या रकमेत वेळोवेळी सुधारणा झाली असून जिल्हा/योजनेच्या वर्षानुसार रकमेत तफावत असू शकते (काही जिल्हा संकेतस्थळांवर ₹१.२० लाख मूळ + अभिसरण लाभ नमूद आहेत). आपल्या भागासाठी लागू असलेली रक्कम अधिकृत पोर्टल किंवा जिल्हा समाज कल्याण कार्यालयाकडून तपासावी.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'सामाजिक न्याय व विशेष सहाय्य विभाग आणि आवाससॉफ्ट पोर्टल',
      sourcesNote: 'या पृष्ठावरील माहिती थेट अधिकृत शासकीय संकेतस्थळांवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'सामाजिक न्याय व विशेष सहाय्य विभाग — sjsa.maharashtra.gov.in', url: 'https://sjsa.maharashtra.gov.in' },
        { label: 'आवाससॉफ्ट (लाभार्थी ट्रॅकिंग) — awaassoft.nic.in', url: 'https://pmayg.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'समाज कल्याण कार्यालयात अर्जासोबत जोडावयाची कागदपत्रे',
      requiredDocuments: [
        { title: 'आधार कार्ड', desc: 'अर्जदाराची ओळख व बँक खाते पडताळणीसाठी' },
        { title: 'रहिवासी दाखला / अधिवास', desc: 'महाराष्ट्रात सलग १५ वर्षे राहत असल्याचा अधिकृत पुरावा' },
        { title: 'जात प्रमाणपत्र', desc: 'सक्षम अधिकाऱ्याने दिलेले अनुसूचित जाती (SC) किंवा नवबौद्ध जात प्रमाणपत्र' },
        { title: 'मतदार ओळखपत्र / रेशन कार्ड', desc: 'कुटुंबाचे रेशन कार्ड किंवा निवडणूक ओळखपत्र' },
        { title: 'जागेच्या मालकीची कागदपत्रे', desc: '७/१२ उतारा, ८-अ उतारा, मालमत्ता पत्रक किंवा मालकी हक्क दस्तऐवज' },
        { title: 'पासपोर्ट फोटो व मोबाईल क्रमांक', desc: 'अर्जदाराचे पासपोर्ट आकाराचे फोटो व संदेशासाठी सक्रिय मोबाईल' }
      ],
      docsAlert: 'महत्त्वाची पडताळणी सूचना: अनुदानाच्या रकमेत वेळोवेळी सुधारणा झाली असून जिल्हा/योजनेच्या वर्षानुसार रकमेत तफावत असू शकते (काही जिल्हा संकेतस्थळांवर ₹१.२० लाख मूळ + अभिसरण लाभ नमूद आहेत). अर्जापूर्वी चालू लागू अनुदानाची खात्री संबंधित जिल्हा समाज कल्याण कार्यालयातून करून घ्यावी.'
    }
  },
  hs3: {
    en: {
      title: 'Shabari Gharkul Yojana (Shabari Awas Yojana)',
      dept: 'Tribal Development Department, Government of Maharashtra',
      badge: 'Tribal Housing',
      verifiedBadge: 'MAHARASHTRA TRIBAL HOUSING SCHEME',
      dbtBadge: 'DIRECT CONSTRUCTION GRANT (ST FAMILIES)',
      refCode: 'Portal Ref: SHABARI-MH2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / FINANCIAL ASSISTANCE',
      benefitsHighlight: 'Direct grant for house construction (aligned with Gharkul norms at ~₹1.20–2.00 lakh depending on area)',
      applyOnline: 'Apply via Gram Panchayat / ITDP (tribal.maharashtra.gov.in)',
      autofillReady: 'Tribal Development Portal',
      backToCategory: 'Back to Housing Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Dedicated pucca housing scheme for homeless Scheduled Tribe families in Maharashtra',
      overview: 'This is a housing scheme run by Maharashtra\'s Tribal Development Department to provide pucca houses to homeless Scheduled Tribe (ST) families, particularly those who couldn\'t be covered under central/state schemes and ST beneficiaries left out of the SECC-2011 Exclusion List. It works alongside sister schemes like the Pardhi Awas Yojana, which uses the same benefit and eligibility structure for the Pardhi community specifically.',
      facts: [
        { label: 'Target Beneficiaries', value: 'Homeless Scheduled Tribe (ST) families in Maharashtra' },
        { label: 'Exclusion Coverage', value: 'Specifically covers ST families left out of SECC-2011 lists' },
        { label: 'Sister Scheme Coordination', value: 'Parallel execution with Pardhi Awas Yojana for Pardhi community' },
        { label: 'Implementation Level', value: 'Gram Panchayat & Integrated Tribal Development Projects (ITDP)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Pucca home construction grants for excluded and vulnerable tribal households',
      keyBenefits: [
        {
          title: 'Housing Construction Grant',
          text: 'A direct financial grant to build a pucca house — dedicated to tribal beneficiaries not already covered under central or state housing schemes.'
        },
        {
          title: 'Coverage for Excluded ST Families',
          text: 'Specifically targets ST beneficiaries who were left out of the SECC-2011 Exclusion List and other central housing programs, ensuring no deserving tribal household is missed.'
        },
        {
          title: 'Alignment with Pardhi Awas Yojana',
          text: 'Operates with equivalent benefit norms and streamlined eligibility for the Pardhi tribal community under sister welfare provisions.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Eligibility Criteria',
      sec3Sub: 'Category, homeless status, income limits and prior coverage exclusions',
      eligibility: [
        { title: 'Tribal Category', text: 'Must belong to a recognized Scheduled Tribe (ST) of Maharashtra.' },
        { title: 'Housing Status', text: 'Must be homeless or have no fixed/permanent home (living in temporary or kutcha shelter).' },
        { title: 'Income Limit', text: 'Monthly family income should be less than ₹10,000 for rural areas.' },
        { title: 'No Prior Coverage', text: 'Should not have already availed benefits under any central or state-sponsored housing scheme.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Application & Sanction Process',
      sec4Sub: 'Direct submission through local Gram Panchayat or Project Officer (ITDP)',
      applicationSteps: [
        { step: 'Step 01', title: 'Submit Application to Gram Panchayat', text: 'Apply through your local Gram Panchayat office or the Project Officer at the Integrated Tribal Development Project (ITDP).' },
        { step: 'Step 02', title: 'Gram Sabha Recommendation', text: 'Gram Sabha reviews tribal status, verifies homelessness / lack of pucca shelter, and prepares priority recommendation.' },
        { step: 'Step 03', title: 'ITDP Administrative Approval', text: 'Project Officer (Tribal Development) inspects the plot/site and issues administrative sanction order.' },
        { step: 'Step 04', title: 'Phased Construction Disbursement', text: 'Grant is disbursed in installments into the beneficiary\'s Aadhaar-linked bank account as construction progresses.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Grant Notice & District Guidelines',
      sec5Sub: 'Verification of current financial grant amount through local authorities',
      datesBadge: 'Tribal Welfare Grant',
      datesHeading: 'Grant Guidelines & Verification Notice',
      datesRange: 'Approx. ₹1.20 Lakh to ₹2.00 Lakh (Area Dependent)',
      datesNote: 'Notice: The exact benefit amount wasn\'t clearly available in current open sources — district portals reference a comprehensive scheme document ("SHABRI") but don\'t state the exact ₹ figure directly. Confirm the current grant amount with your Gram Panchayat or the Tribal Development Department before applying.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Tribal Development Department and District Zilla Parishad portals',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government portals:',
      sources: [
        { label: 'Tribal Development Department, Maharashtra — tribal.maharashtra.gov.in', url: 'https://tribal.maharashtra.gov.in' },
        { label: 'District Zilla Parishad Portals (e.g. Satara ZP)', url: 'https://zpsatara.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Official proofs required by Gram Panchayat and ITDP',
      requiredDocuments: [
        { title: 'Caste Certificate (Scheduled Tribe)', desc: 'Valid Scheduled Tribe certificate issued by competent Sub-Divisional Officer / Scrutiny Committee' },
        { title: 'Income Certificate', desc: 'Income certificate showing monthly family income under ₹10,000 for rural areas' },
        { title: 'Proof of Homelessness', desc: 'Certificate from Gram Sevak / Sarpanch verifying applicant is homeless or lives in a kutcha shelter' },
        { title: 'Residence Proof', desc: 'Maharashtra domicile or valid ration card / voter ID showing residence' },
        { title: 'Land Ownership Documents', desc: 'Proof of plot ownership or village gaothan permission if constructing on own plot' }
      ],
      docsAlert: 'Important Verification Warning: The exact benefit amount wasn\'t clearly stated in current online district sources — district portals reference a PDF document ("SHABRI") with full details but don\'t state the ₹ figure directly. Always confirm the latest applicable grant amount with your local Gram Panchayat or Project Officer (ITDP) before starting construction.'
    },
    hi: {
      title: 'शबरी घरकुल योजना (शबरी आवास योजना)',
      dept: 'आदिवासी विकास विभाग, महाराष्ट्र सरकार',
      badge: 'आदिवासी आवास',
      verifiedBadge: 'महाराष्ट्र आदिवासी आवास योजना',
      dbtBadge: 'प्रत्यक्ष निर्माण अनुदान (एसटी परिवार)',
      refCode: 'पोर्टल संदर्भ: SHABARI-MH2026',
      highlightLabel: 'आधिकारिक योजना लाभ / वित्तीय सहायता',
      benefitsHighlight: 'मकान निर्माण हेतु प्रत्यक्ष अनुदान (घरकुल मानकों के अनुरूप क्षेत्रानुसार लगभग ₹1.20–2.00 लाख; आधिकारिक पोर्टल पर पुष्टि करें)',
      applyOnline: 'ग्राम पंचायत / ITDP द्वारा आवेदन (tribal.maharashtra.gov.in)',
      autofillReady: 'आदिवासी विकास पोर्टल',
      backToCategory: 'आवास योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'महाराष्ट्र में बेघर अनुसूचित जनजाति (ST) परिवारों हेतु समर्पित पक्का आवास योजना',
      overview: 'यह महाराष्ट्र के आदिवासी विकास विभाग द्वारा बेघर अनुसूचित जनजाति (ST) परिवारों को पक्के मकान उपलब्ध कराने हेतु चलाई जाने वाली एक आवास योजना है, विशेष रूप से उन परिवारों के लिए जो केंद्रीय/राज्य योजनाओं में शामिल नहीं हो सके और जो SECC-2011 बहिष्करण सूची से बाहर रह गए थे। यह पारधी समुदाय हेतु संचालित पारधी आवास योजना जैसी सहयोगी योजनाओं के साथ मिलकर समान लाभ और पात्रता के आधार पर कार्य करती है।',
      facts: [
        { label: 'लक्षित लाभार्थी', value: 'महाराष्ट्र के बेघर अनुसूचित जनजाति (ST) परिवार' },
        { label: 'छूटे हुए परिवारों को कवर', value: 'SECC-2011 सूची से छूटे एसटी परिवारों को विशेष रूप से शामिल करना' },
        { label: 'सहयोगी योजना', value: 'पारधी समुदाय हेतु पारधी आवास योजना के साथ समान रूप से संचालित' },
        { label: 'कार्यान्वयन स्तर', value: 'स्थानीय ग्राम पंचायत एवं एकीकृत आदिवासी विकास परियोजना (ITDP)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'वंचित आदिवासी परिवारों हेतु पक्के घर का निर्माण अनुदान',
      keyBenefits: [
        {
          title: 'आवास निर्माण अनुदान',
          text: 'पक्का घर बनाने के लिए प्रत्यक्ष वित्तीय अनुदान — उन एसटी लाभार्थियों हेतु जो पहले से किसी केंद्रीय/राज्य आवास योजना में शामिल नहीं हैं।'
        },
        {
          title: 'छूटे हुए एसटी परिवारों को कवरेज',
          text: 'विशेष रूप से उन एसटी लाभार्थियों को लक्षित करता है जो SECC-2011 बहिष्करण सूची और अन्य केंद्रीय योजनाओं से छूट गए थे, ताकि कोई भी जरूरतमंद आदिवासी परिवार वंचित न रहे।'
        },
        {
          title: 'पारधी आवास योजना के साथ समानता',
          text: 'पारधी समुदाय के लिए समान लाभ और पात्रता संरचना के साथ सहयोगी योजना के रूप में संचालित।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'एसटी प्रवर्ग, बेघर स्थिति, आय सीमा एवं पूर्व आवास योजना की शर्त',
      eligibility: [
        { title: 'अनुसूचित जनजाति प्रवर्ग', text: 'महाराष्ट्र राज्य की अनुसूचित जनजाति (ST) से संबंधित होना अनिवार्य।' },
        { title: 'आवास स्थिति', text: 'बेघर होना चाहिए या कोई स्थायी पक्का घर नहीं होना चाहिए (कच्चे या अस्थायी आश्रय में रहना)।' },
        { title: 'आय सीमा', text: 'ग्रामीण क्षेत्रों के लिए मासिक पारिवारिक आय ₹10,000 से कम होनी चाहिए।' },
        { title: 'पूर्व लाभ न लिया हो', text: 'पहले किसी केंद्रीय या राज्य प्रायोजित आवास योजना का लाभ न लिया हो।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'आवेदन एवं स्वीकृति प्रक्रिया',
      sec4Sub: 'स्थानीय ग्राम पंचायत अथवा परियोजना अधिकारी (ITDP) के माध्यम से',
      applicationSteps: [
        { step: 'चरण 01', title: 'ग्राम पंचायत में आवेदन', text: 'अपनी स्थानीय ग्राम पंचायत या एकीकृत आदिवासी विकास परियोजना (ITDP) कार्यालय में आवेदन जमा करें।' },
        { step: 'चरण 02', title: 'ग्राम सभा सत्यापन व अनुशंसा', text: 'ग्राम सभा द्वारा एसटी स्थिति, बेघर होने और कच्चे मकान की पुष्टि कर प्राथमिकता सूची तैयार की जाती है।' },
        { step: 'चरण 03', title: 'ITDP परियोजना अधिकारी द्वारा स्वीकृति', text: 'परियोजना अधिकारी (आदिवासी विकास) द्वारा स्थल निरीक्षण के उपरांत प्रशासनिक स्वीकृति आदेश जारी किया जाता है।' },
        { step: 'चरण 04', title: 'चरणबद्ध बैंक खाते में DBT', text: 'मकान निर्माण की प्रगति के अनुसार अनुदान राशि सीधे आधार लिंक बैंक खाते में किस्तों में जमा की जाती है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'अनुदान राशि संबंधी सूचना',
      sec5Sub: 'स्थानीय प्रशासन से वर्तमान अनुदान राशि की पुष्टि संबंधी निर्देश',
      datesBadge: 'आदिवासी कल्याण अनुदान',
      datesHeading: 'अनुदान दिशा-निर्देश एवं पुष्टि सूचना',
      datesRange: 'अंदाजन ₹1.20 लाख से ₹2.00 लाख (क्षेत्रानुसार)',
      datesNote: 'महत्वपूर्ण सूचना: वर्तमान खुले स्रोतों में सटीक लाभ राशि स्पष्ट रूप से उपलब्ध नहीं थी — जिला पोर्टल विवरण सहित एक पीडीएफ ("SHABRI") का उल्लेख करते हैं लेकिन सीधे ₹ के आंकड़े का उल्लेख नहीं करते। आवेदन करने से पहले अपनी ग्राम पंचायत या आदिवासी विकास विभाग से वर्तमान लागू अनुदान राशि की पुष्टि अवश्य करें।',
      sec6Num: '6.0',
      sec6Title: 'अधिकृत स्रोत व सत्यापन',
      sec6Sub: 'आदिवासी विकास विभाग एवं जिला परिषद पोर्टल',
      sourcesNote: 'इस पृष्ठ पर दी गई जानकारी सीधे आधिकारिक सरकारी पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'आदिवासी विकास विभाग, महाराष्ट्र — tribal.maharashtra.gov.in', url: 'https://tribal.maharashtra.gov.in' },
        { label: 'जिला परिषद पोर्टल (उदा. सतारा जिला परिषद)', url: 'https://zpsatara.gov.in' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'ग्राम पंचायत एवं आदिवासी विकास विभाग हेतु आवश्यक चेकलिस्ट',
      requiredDocuments: [
        { title: 'जाति प्रमाण पत्र (अनुसूचित जनजाति)', desc: 'सक्षम प्राधिकारी द्वारा जारी वैध अनुसूचित जनजाति (ST) प्रमाण पत्र' },
        { title: 'आय प्रमाण पत्र', desc: 'ग्रामीण क्षेत्रों के लिए मासिक पारिवारिक आय ₹10,000 से कम दर्शाने वाला प्रमाण पत्र' },
        { title: 'बेघर होने का प्रमाण', desc: 'ग्राम सेवक / सरपंच द्वारा जारी प्रमाण पत्र कि आवेदक बेघर है या कच्चे मकान में रहता है' },
        { title: 'निवास प्रमाण पत्र', desc: 'महाराष्ट्र का अधिवास प्रमाण पत्र या राशन कार्ड / मतदाता पहचान पत्र' },
        { title: 'भूमि स्वामित्व दस्तावेज़', desc: 'यदि अपने भूखंड पर निर्माण कर रहे हैं तो जमीन के मालिकाना हक का दस्तावेज या गांव ठाण सहमति' }
      ],
      docsAlert: 'सावधानी सूचना: वर्तमान स्रोतों में सटीक लाभ राशि स्पष्ट रूप से उपलब्ध नहीं थी — जिला पोर्टल विस्तृत विवरण वाली एक पीडीएफ ("SHABRI") का संदर्भ देते हैं लेकिन सीधे ₹ का आंकड़ा नहीं बताते। आवेदन करने से पहले अपनी ग्राम पंचायत या आदिवासी विकास विभाग से चालू अनुदान राशि की पुष्टि अवश्य कर लें।'
    },
    mr: {
      title: 'शबरी घरकुल योजना (शबरी आवास योजना)',
      dept: 'आदिवासी विकास विभाग, महाराष्ट्र शासन',
      badge: 'आदिवासी घरकुल',
      verifiedBadge: 'महाराष्ट्र आदिवासी गृहनिर्माण योजना',
      dbtBadge: 'थेट बांधकाम अनुदान (एसटी कुटुंबे)',
      refCode: 'पोर्टल संदर्भ: SHABARI-MH2026',
      highlightLabel: 'अधिकृत योजना लाभ / आर्थिक सहाय्य',
      benefitsHighlight: 'घर बांधकामासाठी थेट अनुदान (घरकुल मानकांनुसार क्षेत्रानुसार अंदाजे ₹१.२०–२.०० लाख; अधिकृत पोर्टलवर पडताळा)',
      applyOnline: 'ग्रामपंचायत / ITDP मार्फत अर्ज (tribal.maharashtra.gov.in)',
      autofillReady: 'आदिवासी विकास विभाग पोर्टल',
      backToCategory: 'गृहनिर्माण योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'महाराष्ट्रातील बेघर अनुसूचित जमातीच्या (ST) कुटुंबांना पक्के घर देणारी योजना',
      overview: 'महाराष्ट्र शासनाच्या आदिवासी विकास विभागामार्फत बेघर अनुसूचित जमातीच्या (ST) कुटुंबांना पक्की घरे उपलब्ध करून देण्यासाठी ही योजना राबवली जाते, विशेषतः ज्यांना केंद्र/राज्य योजनांचा लाभ मिळाला नाही आणि जे SECC-2011 च्या वगळलेल्या यादीत राहिले होते. ही योजना पारधी समाजासाठी राबवल्या जाणाऱ्या पारधी आवास योजनेसारख्याच लाभ व निकषांवर आधारित आहे.',
      facts: [
        { label: 'लक्षित लाभार्थी', value: 'महाराष्ट्रातील बेघर अनुसूचित जमातीची (ST) कुटुंबे' },
        { label: 'वगळलेल्या कुटुंबांचा समावेश', value: 'SECC-2011 यादीतून सुटलेल्या एसटी कुटुंबांना प्राधान्य' },
        { label: 'सहयोगी योजना', value: 'पारधी आवास योजनेशी सुसंगत व समान लाभ रचना' },
        { label: 'अंमलबजावणी पातळी', value: 'स्थानिक ग्रामपंचायत आणि एकात्मिक आदिवासी विकास प्रकल्प (ITDP)' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व फायदे',
      sec2Sub: 'वंचित आदिवासी कुटुंबांना पक्के घर बांधण्यासाठी थेट अनुदान सहाय्य',
      keyBenefits: [
        {
          title: 'घरकुल बांधकाम अनुदान',
          text: 'पक्के घर बांधण्यासाठी थेट आर्थिक अनुदान — ज्या आदिवासी कुटुंबांना इतर कोणत्याही केंद्रीय किंवा राज्य योजनेतून घर मिळालेले नाही त्यांच्यासाठी.'
        },
        {
          title: 'वगळलेल्या एसटी कुटुंबांना संरक्षण',
          text: 'विशेषतः SECC-2011 यादीतून आणि इतर योजनांतून सुटलेल्या आदिवासी बांधवांना घरे मिळवून देणे, जेणेकरून एकही पात्र आदिवासी कुटुंब घरापासून वंचित राहणार नाही.'
        },
        {
          title: 'पारधी आवास योजनेशी सुसंगतता',
          text: 'पारधी समाजासाठी राबवल्या जाणाऱ्या स्वतंत्र पारधी आवास योजनेप्रमाणेच समान नियम व लाभांची रचना.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'पात्रतेचे निकष',
      sec3Sub: 'एसटी प्रवर्ग, बेघर स्थिती, उत्पन्न मर्यादा आणि आधी घरकुल न मिळाल्याची अट',
      eligibility: [
        { title: 'अनुसूचित जमाती प्रवर्ग', text: 'महाराष्ट्र राज्यातील अनुसूचित जमाती (ST) प्रवर्गातील असणे आवश्यक.' },
        { title: 'घराची स्थिती', text: 'स्वतःचे पक्के घर नसलेले किंवा बेघर असणे आवश्यक (कच्च्या झोपडीत राहणारे).' },
        { title: 'मासिक उत्पन्न मर्यादा', text: 'ग्रामीण भागासाठी कुटुंबाचे मासिक उत्पन्न ₹१०,००० पेक्षा कमी असणे आवश्यक.' },
        { title: 'आधी लाभ न घेतलेला', text: 'यापूर्वी केंद्र किंवा राज्य शासनाच्या कोणत्याही गृहनिर्माण योजनेचा लाभ घेतलेला नसावा.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'अर्ज व मंजुरी प्रक्रिया',
      sec4Sub: 'स्थानिक ग्रामपंचायत किंवा प्रकल्प अधिकारी (ITDP) यांच्याकडे थेट अर्ज',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'ग्रामपंचायतीत अर्ज सादर करणे', text: 'आपल्या ग्रामपंचायतीमध्ये किंवा एकात्मिक आदिवासी विकास प्रकल्प (ITDP) कार्यालयात अर्ज सादर करावा.' },
        { step: 'टप्पा ०२', title: 'ग्रामसभेकडून छाननी व शिफारस', text: 'ग्रामसभेत एसटी प्रवर्ग, बेघर असणे व कच्च्या घराची पडताळणी करून पात्र लाभार्थ्यांची यादी शिफारस केली जाते.' },
        { step: 'टप्पा ०३', title: 'प्रकल्प अधिकाऱ्यांकडून प्रशासकीय मंजुरी', text: 'प्रकल्प अधिकारी (आदिवासी विकास) जागेची पाहणी करून घरकुलासाठी प्रशासकीय मंजुरी आदेश जारी करतात.' },
        { step: 'टप्पा ०४', title: 'हप्त्यांमध्ये थेट बँक खात्यात रक्कम', text: 'बांधकामाच्या प्रगतीनुसार थेट लाभार्थ्याच्या आधार संलग्न बँक खात्यात अनुदानाची रक्कम हप्त्यांमध्ये जमा होते.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'अनुदान रक्कम मार्गदर्शक सूचना',
      sec5Sub: 'स्थानिक स्तरावर चालू अनुदान रकमेची पडताळणी करण्याबाबत',
      datesBadge: 'आदिवासी कल्याण अनुदान',
      datesHeading: 'अनुदान तपशील व खात्री सूचना',
      datesRange: 'अंदाजे ₹१.२० लाख ते ₹२.०० लाख (क्षेत्रानुसार)',
      datesNote: 'सूचना: सध्याच्या उपलब्ध माहितीमध्ये अचूक अनुदानाची रक्कम स्पष्टपणे दिलेली नाही — जिल्हा संकेतस्थळे संपूर्ण तपशीलासह एका पीडीएफचा ("SHABRI") संदर्भ देतात परंतु थेट ₹ चा आकडा नमूद करत नाहीत. अर्ज करण्यापूर्वी चालू अनुदान रकमेची माहिती आपल्या ग्रामपंचायतीकडून किंवा आदिवासी विकास विभागाकडून अवश्य करून घ्यावी.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'आदिवासी विकास विभाग आणि जिल्हा परिषद संकेतस्थळे',
      sourcesNote: 'या पृष्ठावरील माहिती थेट अधिकृत शासकीय पोर्टलवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'आदिवासी विकास विभाग, महाराष्ट्र शासन — tribal.maharashtra.gov.in', url: 'https://tribal.maharashtra.gov.in' },
        { label: 'जिल्हा परिषद संकेतस्थळे (उदा. सातारा जिल्हा परिषद)', url: 'https://zpsatara.gov.in' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'ग्रामपंचायत व आदिवासी विकास विभागाकडे सादर करावयाचे पुरावे',
      requiredDocuments: [
        { title: 'जात प्रमाणपत्र (अनुसूचित जमाती)', desc: 'सक्षम अधिकाऱ्याने दिलेले अनुसूचित जमातीचे (ST) अधिकृत जात प्रमाणपत्र' },
        { title: 'उत्पन्नाचा दाखला', desc: 'ग्रामीण भागासाठी मासिक कौटुंबिक उत्पन्न ₹१०,००० पेक्षा कमी असल्याचा दाखला' },
        { title: 'बेघर असल्याचा दाखला', desc: 'ग्रामसेवक किंवा सरपंचांनी दिलेला बेघर असल्याचा किंवा कच्च्या घरात राहत असल्याचा दाखला' },
        { title: 'रहिवासी दाखला', desc: 'महाराष्ट्राचा अधिवास दाखला किंवा रेशन कार्ड / मतदार ओळखपत्र' },
        { title: 'जागेचा पुरावा', desc: 'स्वतःच्या जागेवर घर बांधत असल्यास जागेचा मालकी हक्क किंवा ग्रामपंचायत संमती' }
      ],
      docsAlert: 'महत्त्वाची पडताळणी सूचना: सध्याच्या संकेतस्थळांवर थेट अनुदानाची अचूक रक्कम नमूद केलेली नाही — जिल्हा पोर्टल संपूर्ण तपशीलासह एका पीडीएफचा ("SHABRI") संदर्भ देतात. अर्ज करण्यापूर्वी आणि बांधकाम सुरू करण्यापूर्वी चालू लागू अनुदानाची खात्री ग्रामपंचायत किंवा संबंधित ITDP कार्यालयाकडून करून घ्यावी.'
    }
  },
  hs5: {
    en: {
      title: 'Slum Rehabilitation Scheme (SRA Tenements)',
      dept: 'Slum Rehabilitation Authority (SRA), Housing Department, Government of Maharashtra',
      badge: 'In-Kind Housing / Rehabilitation',
      verifiedBadge: 'SLUM REHABILITATION AUTHORITY (SRA MAHARASHTRA)',
      dbtBadge: 'FREE / SUBSIDIZED PERMANENT 300 SQ FT TENEMENT',
      refCode: 'Portal Ref: SRA-MH2026',
      highlightLabel: 'OFFICIAL SCHEME BENEFIT / CITIZEN ENTITLEMENT',
      benefitsHighlight: 'Free (or discounted) permanent tenement — 300 sq ft carpet area — in place of an existing slum dwelling',
      applyOnline: 'Check Eligibility & Projects (sra.gov.in)',
      autofillReady: 'SRA BPAMS Portal',
      backToCategory: 'Back to Housing Schemes',
      sec1Num: '1.0',
      sec1Title: 'About the Scheme',
      sec1Sub: 'Public-Private Partnership model redeveloping slum settlements into permanent self-contained apartments',
      overview: 'Launched in December 1995, the Slum Rehabilitation Scheme (SRS) is Maharashtra\'s flagship mechanism for redeveloping slum land through a public-private partnership model: private developers rehabilitate slum-dwellers on-site in exchange for incentive Floor Space Index (FSI), which lets them build extra units for sale on the open market. This cross-subsidizes the tenements given to eligible slum-dwellers. The SRA acts as the sole planning authority overseeing the process across Mumbai, its suburbs, and (since 2014) Thane.',
      facts: [
        { label: 'Tenement Norm', value: '300 sq ft carpet area (Bedroom, kitchen, bath & WC)' },
        { label: 'Pre-2000 Settlement', value: '100% Free permanent tenement (Protected under Slum Act 1971)' },
        { label: '2000–2011 Settlement', value: 'Rehabilitation at ₹2.5 Lakh per dwelling (State GR May 2026)' },
        { label: 'Maintenance Deposit', value: '₹40,000 per tenement developer corpus (covers ~10 yrs upkeep)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'Key Benefits & Entitlements',
      sec2Sub: 'Permanent concrete housing, tiered pricing by cut-off date and dedicated maintenance corpus',
      keyBenefits: [
        {
          title: 'Free/Subsidized Permanent Tenement',
          text: 'Eligible slum inhabitants are given a new, on-site tenement — bedroom, kitchen, bathroom, and toilet — currently at a 300 sq ft carpet area norm (increased over the years from 269 sq ft).'
        },
        {
          title: 'Tiered Pricing by Settlement Date',
          text: 'Slums existing before 1 January 2000: fully free tenement, protected under the Maharashtra Slum Areas Act, 1971 — cannot be displaced without a free unit. Slums from 2000–2011: recently approved for a paid rehabilitation route at ₹2.5 lakh per dwelling (state GR, May 2026), benefiting an estimated 12+ lakh families. A statewide survey of pre-2011 slums on government/forest/public land was launched in July 2026.'
        },
        {
          title: '10-Year Maintenance Corpus',
          text: 'Developers pay a one-time maintenance deposit of ₹40,000 per tenement into a registered cooperative society corpus that funds building upkeep for roughly the first 10 years.'
        },
        {
          title: 'Single-Window Clearance',
          text: 'SRA handles co-operative society formation, eligibility certification, survey/measurement, building permissions, and leasing — all under one single authority.'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'Eligibility Criteria',
      sec3Sub: 'Cut-off dates, 75% society consent threshold and premise structure norms',
      eligibility: [
        { title: 'Settlement Cut-off Date', text: 'Slum dwelling must generally predate 1 January 2011 (with different treatment for pre-2000 vs. 2000–2011 occupants); policies are actively evolving, so confirm current cut-off.' },
        { title: '75% Consent Threshold', text: 'A rehabilitation scheme can only proceed once at least 75% of slum inhabitants in that pocket consent to participate and form a cooperative society.' },
        { title: 'Chawl Residents (Proposed Expansion)', text: 'Currently only ground-floor residents, or units not exceeding 14 feet in height, are eligible; a proposal under review would extend eligibility to first-floor chawl residents based on documentation rather than floor height.' },
        { title: 'Non-Obstruction Rule', text: 'Slum-dwellers who obstruct the rehabilitation scheme can face eviction and punitive action under SRA\'s statutory powers.' }
      ],
      sec4Num: '4.0',
      sec4Title: 'Project & Eligibility Certification Process',
      sec4Sub: 'Society formation, Annexure-II certification and on-site rehabilitation',
      applicationSteps: [
        { step: 'Step 01', title: 'Scheme Initiation & Society Formation', text: 'Slum dwellers form a proposed Co-operative Housing Society and choose an approved developer with at least 75% written consent.' },
        { step: 'Step 02', title: 'SRA Socio-Demographic Survey', text: 'SRA conducting officials execute a door-to-door joint survey to inspect existing huts, photo-passes, and electric meters.' },
        { step: 'Step 03', title: 'Annexure-II Eligibility Certification', text: 'Competent Authority publishes Annexure-II certifying eligible (pre-2000 free or 2000-2011 subsidized) and ineligible occupants.' },
        { step: 'Step 04', title: 'Transit Camp & Permanent Allotment', text: 'Eligible residents receive transit rent / temporary shelter during construction, followed by a computer-drawn lottery for permanent 300 sq ft flats.' }
      ],
      sec5Num: '5.0',
      sec5Title: 'Policy Updates & Survey Drives',
      sec5Sub: 'Recent Government Resolutions and ongoing slum re-surveys',
      datesBadge: 'Urban Slum Redevelopment',
      datesHeading: 'Cut-off Dates & Policy Evolution',
      datesRange: 'Pre-2000 Free | 2000–2011 Paid Route (₹2.5 Lakh) | July 2026 Survey Active',
      datesNote: 'Note: Eligibility cut-off dates and pricing tiers have been actively changing through 2026 (new GRs, proposed chawl inclusion, statewide re-survey). Always confirm your pocket\'s Annexure-II status directly with SRA. SRA Head Office: Bandra (East), Mumbai. Official Helpline: 022-26565800.',
      sec6Num: '6.0',
      sec6Title: 'Official Sources & Verification',
      sec6Sub: 'Slum Rehabilitation Authority statutory portals',
      sourcesNote: 'The information presented on this page is compiled directly from authorized Government portals:',
      sources: [
        { label: 'Slum Rehabilitation Authority (SRA) — sra.gov.in', url: 'https://sra.gov.in' },
        { label: 'SRA Building Permission & Monitoring System (BPAMS)', url: 'https://kavach.sra.gov.in/doc/1/search' }
      ],
      sec7Num: '7.0',
      sec7Title: 'Mandatory Required Documents',
      sec7Sub: 'Proofs required for Annexure-II beneficiary certification',
      requiredDocuments: [
        { title: 'Proof of Residence Predating Cut-off Date', desc: 'Electricity bills, old ration card, voter ID list extract, or photo-pass issued prior to 1 Jan 2000 / 1 Jan 2011' },
        { title: 'Identity Proof', desc: 'Aadhaar Card, Voter ID, or PAN Card of the occupant family head' },
        { title: 'Slum Survey / Photo-Pass Documentation', desc: 'Any existing photo-pass, slum census receipt from SRA or Municipal Corporation (BMC/TMC)' }
      ],
      docsAlert: 'Important Statutory Notice: Eligibility cut-off dates and pricing tiers have been actively changing through 2026 (new GRs, proposed chawl inclusion, statewide re-survey). There is no individual direct online application — eligibility is determined via project-level Annexure-II verification. Confirm your building\'s current status directly with SRA.'
    },
    hi: {
      title: 'झोपड़पट्टी पुनर्वास योजना (SRA टेनमेंट्स)',
      dept: 'झोपड़पट्टी पुनर्वास प्राधिकरण (SRA), आवास विभाग, महाराष्ट्र सरकार',
      badge: 'आवासीय पुनर्वास',
      verifiedBadge: 'झोपड़पट्टी पुनर्वास प्राधिकरण (SRA महाराष्ट्र)',
      dbtBadge: 'मुफ्त / रियायती स्थायी 300 वर्ग फुट फ्लैट',
      refCode: 'पोर्टल संदर्भ: SRA-MH2026',
      highlightLabel: 'आधिकारिक योजना लाभ / नागरिक अधिकार',
      benefitsHighlight: 'मौजूदा झुग्गी झोपड़ी के बदले 300 वर्ग फुट कारपेट क्षेत्र का मुफ्त (या रियायती) स्थायी पक्का मकान',
      applyOnline: 'पात्रता व परियोजनाएं जांचें (sra.gov.in)',
      autofillReady: 'SRA BPAMS पोर्टल',
      backToCategory: 'आवास योजनाओं पर वापस जाएं',
      sec1Num: '1.0',
      sec1Title: 'योजना के बारे में',
      sec1Sub: 'पीपीपी मॉडल के तहत स्लम बस्तियों का पुनर्विकास कर स्थायी अपार्टमेंट प्रदान करने की प्रमुख योजना',
      overview: 'दिसंबर 1995 में शुरू की गई, झोपड़पट्टी पुनर्वास योजना (SRS) सार्वजनिक-निजी भागीदारी (PPP) मॉडल के माध्यम से स्लम भूमि के पुनर्विकास हेतु महाराष्ट्र का प्रमुख तंत्र है: निजी बिल्डर प्रोत्साहन एफएसआई (FSI) के बदले में साइट पर ही झुग्गीवासियों का पुनर्वास करते हैं, जिससे उन्हें खुले बाजार में बेचने के लिए अतिरिक्त फ्लैट बनाने की अनुमति मिलती है। यह पात्र झुग्गीवासियों को दिए जाने वाले मकानों को क्रॉस-सब्सिडी प्रदान करता है। SRA मुंबई, उपनगरों और (2014 से) ठाणे में इस प्रक्रिया की देखरेख करने वाला एकमात्र योजना प्राधिकरण है।',
      facts: [
        { label: 'मकान का आकार', value: '300 वर्ग फुट कारपेट एरिया (बेडरूम, किचन, बाथरूम और टॉयलेट)' },
        { label: '2000 से पूर्व का निवास', value: '100% मुफ्त स्थायी मकान (महाराष्ट्र स्लम एक्ट 1971 के तहत संरक्षित)' },
        { label: '2000–2011 का निवास', value: '₹2.5 लाख में सशुल्क पुनर्वास (महाराष्ट्र सरकार जीआर, मई 2026)' },
        { label: 'रखरखाव कोष', value: 'डेवलपर द्वारा ₹40,000 प्रति टेनमेंट कॉर्पस (लगभग 10 वर्ष का रखरखाव)' }
      ],
      sec2Num: '2.0',
      sec2Title: 'प्रमुख लाभ एवं सुविधाएं',
      sec2Sub: 'पक्के स्थायी मकान, कट-ऑफ तिथि अनुसार मूल्य निर्धारण एवं समर्पित मेंटेनेंस फंड',
      keyBenefits: [
        {
          title: 'मुफ्त/रियायती स्थायी मकान',
          text: 'पात्र झुग्गीवासियों को उसी स्थान पर नया फ्लैट दिया जाता है — बेडरूम, किचन, बाथरूम और टॉयलेट — वर्तमान में 300 वर्ग फुट कारपेट एरिया (पहले के 269 वर्ग फुट से बढ़ाया गया)।'
        },
        {
          title: 'कट-ऑफ तिथि के अनुसार मूल्य निर्धारण',
          text: '1 जनवरी 2000 से पहले की झुग्गियां: पूरी तरह से मुफ्त मकान, महाराष्ट्र स्लम एरियाज एक्ट 1971 के तहत संरक्षित। 2000-2011 की झुग्गियां: ₹2.5 लाख प्रति मकान पर सशुल्क पुनर्वास (मई 2026 जीआर), जिससे 12 लाख से अधिक परिवारों को लाभ। जुलाई 2026 में सरकारी/वन भूमि पर पूर्व-2011 झुग्गियों का राज्यव्यापी सर्वेक्षण शुरू किया गया।'
        },
        {
          title: '10 वर्ष का रखरखाव कोष (Corpus)',
          text: 'बिल्डर प्रति फ्लैट ₹40,000 का एकमुश्त रखरखाव शुल्क एक कॉर्पस फंड में जमा करते हैं जो पहले 10 वर्षों के लिए इमारत की देखभाल हेतु उपयोग होता है।'
        },
        {
          title: 'सिंगल-विंडो क्लीयरेंस',
          text: 'सोसायटी गठन, पात्रता प्रमाणीकरण, सर्वेक्षण, भवन अनुमति और पट्टा — सभी कार्य SRA द्वारा एकल खिड़की से किए जाते हैं।'
        }
      ],
      sec3Num: '3.0',
      sec3Title: 'अनिवार्य पात्रता मानदंड',
      sec3Sub: 'कट-ऑफ तिथियां, 75% निवासियों की सहमति और चॉल संबंधी नियम',
      eligibility: [
        { title: 'निवास कट-ऑफ तिथि', text: 'झुग्गी 1 जनवरी 2011 से पहले की होनी चाहिए (2000 से पहले वालों को मुफ्त और 2000-2011 वालों को रियायती दर पर); नीतियां बदल रही हैं इसलिए वर्तमान कट-ऑफ की पुष्टि करें।' },
        { title: '75% सहमति की अनिवार्यता', text: 'योजना तभी आगे बढ़ सकती है जब उस स्लम पॉकेट के कम से कम 75% निवासी भाग लेने के लिए लिखित सहमति दें।' },
        { title: 'चॉल निवासी (प्रस्तावित विस्तार)', text: 'वर्तमान में केवल भूतल या 14 फीट तक की ऊंचाई वाले पात्र हैं; एक प्रस्ताव के तहत पहली मंजिल के चॉल निवासियों को भी ऊंचाई के बजाय दस्तावेजों के आधार पर शामिल करने पर विचार चल रहा है।' },
        { title: 'असहयोग न करने का नियम', text: 'पुनर्विकास में बाधा डालने वाले झुग्गीवासियों पर SRA की शक्तियों के तहत कानूनी व निष्कासन कार्रवाई की जा सकती है।' }
      ],
      sec4Num: '4.0',
      sec4Title: 'परियोजना एवं पात्रता निर्धारण प्रक्रिया',
      sec4Sub: 'सोसायटी गठन, परिशिष्ट-II (Annexure-II) प्रमाणीकरण एवं आवंटन',
      applicationSteps: [
        { step: 'चरण 01', title: 'सोसायटी गठन एवं बिल्डर चयन', text: 'झुग्गीवासी मिलकर प्रस्तावित सहकारी गृहनिर्माण संस्था बनाते हैं और 75% सहमति से अधिकृत डेवलपर चुनते हैं।' },
        { step: 'चरण 02', title: 'SRA संयुक्त सर्वेक्षण', text: 'SRA अधिकारियों द्वारा घर-घर जाकर सर्वेक्षण किया जाता है, बिजली मीटर और फोटो-पास की जांच की जाती है।' },
        { step: 'चरण 03', title: 'परिशिष्ट-II (Annexure-II) जारी होना', text: 'सक्षम प्राधिकारी पात्र (2000 पूर्व मुफ्त या 2000-2011 सशुल्क) और अपात्र निवासियों की सूची (परिशिष्ट-II) प्रकाशित करते हैं।' },
        { step: 'चरण 04', title: 'ट्रांजिट कैंप व स्थायी फ्लैट लॉटरी', text: 'निर्माण के दौरान किराया/अस्थायी आवास दिया जाता है, फिर लॉटरी द्वारा स्थायी 300 वर्ग फुट के पक्के फ्लैट का आवंटन होता है।' }
      ],
      sec5Num: '5.0',
      sec5Title: 'नीतिगत संशोधन एवं सर्वेक्षण अभियान',
      sec5Sub: 'नवीनतम सरकारी प्रस्ताव (GR) और राज्यव्यापी स्लम सर्वेक्षण',
      datesBadge: 'शहरी स्लम पुनर्विकास',
      datesHeading: 'कट-ऑफ तिथियां एवं नीतिगत स्थिति',
      datesRange: '2000 पूर्व मुफ्त | 2000–2011 सशुल्क (₹2.5 लाख) | जुलाई 2026 सर्वेक्षण सक्रिय',
      datesNote: 'नोट: 2026 के दौरान पात्रता कट-ऑफ तिथियां और मूल्य निर्धारण नियम बदलते रहे हैं (नए जीआर, चॉल प्रस्ताव, राज्यव्यापी सर्वेक्षण)। अपनी इमारत या स्लम की स्थिति की पुष्टि सीधे SRA से करें। SRA मुख्यालय: बांद्रा (पूर्व), मुंबई। फोन: 022-26565800।',
      sec6Num: '6.0',
      sec6Title: 'अधिकृत स्रोत व सत्यापन',
      sec6Sub: 'झोपड़पट्टी पुनर्वास प्राधिकरण आधिकारिक पोर्टल',
      sourcesNote: 'इस पृष्ठ पर दी गई जानकारी सीधे आधिकारिक सरकारी पोर्टलों से संकलित की गई है:',
      sources: [
        { label: 'झोपड़पट्टी पुनर्वास प्राधिकरण (SRA) — sra.gov.in', url: 'https://sra.gov.in' },
        { label: 'SRA भवन अनुमति एवं निगरानी प्रणाली (BPAMS)', url: 'https://kavach.sra.gov.in/doc/1/search' }
      ],
      sec7Num: '7.0',
      sec7Title: 'अनिवार्य आवश्यक दस्तावेज़',
      sec7Sub: 'परिशिष्ट-II पात्रता प्रमाणन हेतु आवश्यक दस्तावेज',
      requiredDocuments: [
        { title: 'कट-ऑफ तिथि से पूर्व का निवास प्रमाण', desc: '1 जनवरी 2000 या 1 जनवरी 2011 से पूर्व का बिजली बिल, पुराना राशन कार्ड, मतदाता सूची का नाम, या फोटो-पास' },
        { title: 'पहचान प्रमाण पत्र', desc: 'परिवार के मुखिया का आधार कार्ड, मतदाता पहचान पत्र या पैन कार्ड' },
        { title: 'स्लम सर्वेक्षण / फोटो-पास दस्तावेज़', desc: 'SRA या नगर निगम (BMC/TMC) द्वारा पूर्व में जारी किया गया फोटो-पास या सर्वेक्षण रसीद' }
      ],
      docsAlert: 'महत्वपूर्ण सूचना: 2026 में पात्रता कट-ऑफ और शुल्क में नए बदलाव हुए हैं (नए जीआर, चॉल प्रस्ताव, सर्वेक्षण)। सामान्य नागरिकों के लिए कोई व्यक्तिगत सीधा ऑनलाइन आवेदन नहीं होता — पूरी बस्ती के पुनर्विकास सर्वेक्षण (परिशिष्ट-II) द्वारा ही पात्रता तय होती है। किसी भी जानकारी के लिए सीधे SRA से संपर्क करें।'
    },
    mr: {
      title: 'झोपडपट्टी पुनर्वसन योजना (SRA घरे)',
      dept: 'झोपडपट्टी पुनर्वसन प्राधिकरण (SRA), गृहनिर्माण विभाग, महाराष्ट्र शासन',
      badge: 'गृहनिर्माण पुनर्वसन',
      verifiedBadge: 'झोपडपट्टी पुनर्वसन प्राधिकरण (SRA महाराष्ट्र)',
      dbtBadge: 'मोफत / सवलतीच्या दरात कायमस्वरूपी ३०० चौ. फूट घर',
      refCode: 'पोर्टल संदर्भ: SRA-MH2026',
      highlightLabel: 'अधिकृत योजना लाभ / नागरिक हक्क',
      benefitsHighlight: 'सध्याच्या झोपडीच्या जागी मोफत (किंवा सवलतीत) ३०० चौरस फूट चटई क्षेत्राचे कायमस्वरूपी पक्के घर',
      applyOnline: 'पात्रता व प्रकल्प तपासा (sra.gov.in)',
      autofillReady: 'SRA BPAMS पोर्टल',
      backToCategory: 'गृहनिर्माण योजनांकडे परत जा',
      sec1Num: '१.०',
      sec1Title: 'योजनेविषयी माहिती',
      sec1Sub: 'खाजगी सहभागातून झोपडपट्ट्यांचा पुनर्विकास करून मोफत पक्की घरे देणारी महाराष्ट्राची योजना',
      overview: 'डिसेंबर १९९५ मध्ये सुरू झालेली झोपडपट्टी पुनर्वसन योजना (SRS) ही सार्वजनिक-खाजगी भागीदारी (PPP) मॉडेलद्वारे झोपडपट्टी पुनर्विकासाची महाराष्ट्राची प्रमुख यंत्रणा आहे: खाजगी विकासक प्रोत्साहन एफएसआय (FSI) च्या मोबदल्यात त्याच जागेवर झोपडपट्टीवासीयांचे मोफत पुनर्वसन करतात. विकासकांना खुल्या बाजारात विकण्यासाठी अतिरिक्त घरे बांधता येतात, ज्यामुळे झोपडीधारकांच्या घरांचा खर्च निघतो. मुंबई, उपनगरे आणि (२०१४ पासून) ठाण्यासाठी SRA हे एकमेव नियोजन प्राधिकरण आहे.',
      facts: [
        { label: 'घराचे क्षेत्रफळ', value: '३०० चौरस फूट चटई क्षेत्र (बेडरूम, किचन, स्वतंत्र स्नानगृह व शौचालय)' },
        { label: '२००० पूर्वीचे रहिवासी', value: '१००% मोफत कायमस्वरूपी घर (झोपडपट्टी कायदा १९७१ अंतर्गत संरक्षित)' },
        { label: '२००० ते २०११ मधील रहिवासी', value: '₹२.५ लाख भरून सशुल्क पुनर्वसन (शासन निर्णय, मे २०२६)' },
        { label: 'देखभाल ठेव (Corpus)', value: 'विकासकाकडून प्रति घर ₹४०,००० जमा (१० वर्षांच्या देखभालीसाठी)' }
      ],
      sec2Num: '२.०',
      sec2Title: 'प्रमुख लाभ व फायदे',
      sec2Sub: 'कायमस्वरूपी पक्की घरे, कट-ऑफ तारखेनुसार दर आणि १० वर्षांची देखभाल ठेव',
      keyBenefits: [
        {
          title: 'मोफत/सवलतीच्या दरातील पक्के घर',
          text: 'पात्र झोपडीधारकांना त्याच जागेवर नवीन इमारत — बेडरूम, किचन, स्वतंत्र बाथरूम व शौचालय — सध्या ३०० चौ. फूट चटई क्षेत्र (पूर्वीच्या २६९ चौ. फुटांवरून वाढवले).'
        },
        {
          title: 'कट-ऑफ तारखेनुसार दर',
          text: '१ जानेवारी २००० पूर्वीच्या झोपड्या: पूर्णपणे मोफत घर, महाराष्ट्र झोपडपट्टी कायदा १९७१ अंतर्गत संरक्षित. २००० ते २०११ मधील झोपड्या: ₹२.५ लाख भरून सशुल्क पुनर्वसन (मे २०२६ चा जीआर), ज्यामुळे १२ लाख कुटुंबांना लाभ. जुलै २०२६ मध्ये २०११ पूर्वीच्या झोपड्यांचे राज्यव्यापी सर्वेक्षण सुरू झाले.'
        },
        {
          title: '१० वर्षांचा देखभाल निधी (Corpus)',
          text: 'इमारतीच्या पहिल्या १० वर्षांच्या देखभालीसाठी विकासक प्रति सदनिका ₹४०,००० ची एकरकमी ठेव सहकारी गृहनिर्माण संस्थेच्या खात्यात जमा करतात.'
        },
        {
          title: 'एक खिडकी मंजुरी (Single-Window)',
          text: 'संस्था नोंदणी, पात्रता प्रमाणपत्र (परिशिष्ट-२), सर्वेक्षण, बांधकाम परवानग्या आणि भाडेपट्टा हे सर्व काम एकाच SRA प्राधिकरणाकडून केले जाते.'
        }
      ],
      sec3Num: '३.०',
      sec3Title: 'पात्रतेचे निकष',
      sec3Sub: 'कट-ऑफ तारखा, ७५% रहिवाशांची संमती आणि चाळींविषयीचे नियम',
      eligibility: [
        { title: 'रहिवास कट-ऑफ तारीख', text: 'झोपडी १ जानेवारी २०११ पूर्वीची असणे आवश्यक (२००० पूर्वीच्या मोफत आणि २०००-२०११ मधील सशुल्क); नियमांची खात्री SRA कडे करा.' },
        { title: '७५% संमतीची अट', text: 'त्या झोपडपट्टी भागातील किमान ७५% रहिवाशांनी पुनर्विकासात सहभागी होण्यासाठी लेखी संमती दिल्यावरच योजना पुढे जाऊ शकते.' },
        { title: 'चाळ रहिवासी (प्रस्तावित बदल)', text: 'सध्या केवळ तळमजला किंवा १४ फुटांपेक्षा कमी उंची असलेले पात्र आहेत; पहिल्या मजल्यावरील चाळ रहिवाशांना उंचीऐवजी कागदपत्रांवर पात्र करण्याचा प्रस्ताव विचाराधीन आहे.' },
        { title: 'अडथळा न आणण्याचा नियम', text: 'पुनर्विकास योजनेत अडथळा निर्माण करणाऱ्यांवर SRA च्या अधिकारांतर्गत निष्कासन व कायदेशीर कारवाई केली जाऊ शकते.' }
      ],
      sec4Num: '४.०',
      sec4Title: 'प्रकल्प व पात्रता निश्चिती प्रक्रिया',
      sec4Sub: 'सोसायटी नोंदणी, परिशिष्ट-२ पात्रता निश्चिती आणि सदनिका वाटप',
      applicationSteps: [
        { step: 'टप्पा ०१', title: 'सोसायटी स्थापना व बिल्डर निवड', text: 'झोपडीधारक एकत्र येऊन प्रस्तावित सहकारी गृहनिर्माण संस्था स्थापन करतात आणि ७५% संमतीने मान्यताप्राप्त विकासक निवडतात.' },
        { step: 'टप्पा ०२', title: 'SRA कडून प्रत्यक्ष सर्वेक्षण', text: 'SRA चे अधिकारी घरोघरी जाऊन प्रत्यक्ष पाहणी करतात, वीज बिल व फोटो-पासची तपासणी करतात.' },
        { step: 'टप्पा ०३', title: 'परिशिष्ट-२ पात्रता यादी प्रसिद्धी', text: 'सक्षम प्राधिकारी पात्र (२००० पूर्वीचे मोफत किंवा २०००-२०११ सशुल्क) आणि अपात्र रहिवाशांचे परिशिष्ट-२ प्रसिद्ध करतात.' },
        { step: 'टप्पा ०४', title: 'संक्रमण शिबिर व कायमस्वरूपी घर वाटप', text: 'बांधकाम काळात भाडे किंवा तात्पुरते घर दिले जाते; त्यानंतर संगणकीय सोडतीद्वारे कायमस्वरूपी ३०० चौ. फूट पक्के घर मिळते.' }
      ],
      sec5Num: '५.०',
      sec5Title: 'धोरणात्मक बदल आणि सर्वेक्षण मोहीम',
      sec5Sub: 'नवीन शासन निर्णय आणि राज्यव्यापी झोपडपट्टी सर्वेक्षण माहिती',
      datesBadge: 'शहरी झोपडपट्टी पुनर्वसन',
      datesHeading: 'कट-ऑफ तारखा आणि सद्यस्थिती',
      datesRange: '२००० पूर्वीचे मोफत | २०००–२०११ सशुल्क (₹२.५ लाख) | जुलै २०२६ सर्वेक्षण सुरू',
      datesNote: 'टीप: २०२६ मध्ये पात्रता कट-ऑफ तारखा आणि नियमांत नवीन बदल झाले आहेत (नवीन जीआर, चाळ प्रस्ताव, सर्वेक्षण). आपल्या जागेची किंवा इमारतीची सद्यस्थिती थेट SRA कडून तपासावी. SRA मुख्यालय: वांद्रे (पूर्व), मुंबई. संपर्क: ०२२-२६५६५८००.',
      sec6Num: '६.०',
      sec6Title: 'अधिकृत स्रोत व पडताळणी',
      sec6Sub: 'झोपडपट्टी पुनर्वसन प्राधिकरण अधिकृत संकेतस्थळे',
      sourcesNote: 'या पृष्ठावरील माहिती थेट अधिकृत शासकीय संकेतस्थळांवरून संकलित करण्यात आली आहे:',
      sources: [
        { label: 'झोपडपट्टी पुनर्वसन प्राधिकरण (SRA) — sra.gov.in', url: 'https://sra.gov.in' },
        { label: 'SRA इमारत परवानगी व नियंत्रण प्रणाली (BPAMS)', url: 'https://kavach.sra.gov.in/doc/1/search' }
      ],
      sec7Num: '७.०',
      sec7Title: 'अनिवार्य आवश्यक कागदपत्रे',
      sec7Sub: 'परिशिष्ट-२ पात्रता सिद्ध करण्यासाठी सादर करावयाचे पुरावे',
      requiredDocuments: [
        { title: 'कट-ऑफ तारखेपूर्वीचा वास्तव्याचा पुरावा', desc: '१ जानेवारी २००० किंवा १ जानेवारी २०११ पूर्वीचे वीज बिल, जुने रेशन कार्ड, मतदार यादीतील उतारा किंवा फोटो-पास' },
        { title: 'ओळख पुरावा', desc: 'कुटुंबप्रमुखाचे आधार कार्ड, मतदार ओळखपत्र किंवा पॅन कार्ड' },
        { title: 'झोपडपट्टी सर्वेक्षण / फोटो-पास कागदपत्रे', desc: 'SRA किंवा महानगरपालिकेने (BMC/TMC) पूर्वी दिलेला फोटो-पास किंवा सर्वेक्षण पावती' }
      ],
      docsAlert: 'महत्त्वाची वैधानिक सूचना: २०२६ मध्ये पात्रता कट-ऑफ आणि नियमांत नवीन बदल झाले आहेत (नवीन जीआर, चाळ प्रस्ताव, सर्वेक्षण). नागरिकांना थेट वैयक्तिक ऑनलाइन अर्ज करता येत नाही — संपूर्ण वस्तीच्या पुनर्विकास प्रकल्प सर्वेक्षणाद्वारे (परिशिष्ट-२) पात्रता निश्चित होते. कोणत्याही माहितीसाठी थेट SRA शी संपर्क साधावा.'
    }
  }
};

// -- Look up a scheme's card summary (title/dept/badge/etc.) --------
function findSchemeCardById(schemeId) {
  if (typeof SERVICE_CATEGORIES === 'undefined') return null;
  for (const cat of SERVICE_CATEGORIES) {
    const found = (cat.schemes || []).find(s => s.id === schemeId);
    if (found) return { ...found, categoryKey: cat.key, categoryTitleKey: cat.titleKey };
  }
  return null;
}

// Fallback HTML escaper
function escapeSchemeHtml(val) {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

  const navbarHtml = typeof renderPublicNavbar === 'function' ? renderPublicNavbar('services') : '';
  const footerHtml = typeof renderFooter === 'function' ? renderFooter() : '';

  if (!card) {
    return `
      ${navbarHtml}
      <div class="page-layout">
        <div class="container" style="padding:var(--sp-12) 0">
          <div class="scheme-detail-empty">
            <h2>${(typeof I18N !== 'undefined' && I18N.t('schemeDetails')) || 'Scheme details'}</h2>
            <p>We couldn't find that scheme. It may have moved — please go back and pick it again.</p>
            <button class="btn btn-primary" onclick="navigateTo('services')">${(typeof I18N !== 'undefined' && I18N.t('backToCategories')) || 'Back to Services'}</button>
          </div>
        </div>
        ${footerHtml}
      </div>
    `;
  }

  return `
    ${navbarHtml}
    <div class="page-layout gov-scheme-layout">
      ${renderSchemeDetailTemplate(card, detail)}
      ${footerHtml}
    </div>
  `;
}

// -- THE single reusable government portal template with 3-language support --
function renderSchemeDetailTemplate(card, detail) {
  const lang = (typeof I18N !== 'undefined' && I18N.currentLang) ? I18N.currentLang : 'en';

  // Multi-language resolution for current scheme
  const schemeData = detail ? (detail[lang] || detail.en || detail) : {};

  const titleText = schemeData.title || card.title;
  const deptText = schemeData.dept || card.dept || 'Government of Maharashtra';
  const badgeText = schemeData.badge || card.badge || 'Official Government Scheme';
  const benefitsText = schemeData.benefitsHighlight || card.benefits || 'Full Tuition & Examination Fee Reimbursement';
  const verifiedBadge = schemeData.verifiedBadge || 'VERIFIED GOVERNMENT SCHEME';
  const dbtBadge = schemeData.dbtBadge || 'DIRECT BENEFIT TRANSFER (DBT)';
  const refCode = schemeData.refCode || `Portal Ref: ${escapeSchemeHtml(card.id.toUpperCase())}-MH2026`;
  const highlightLabel = schemeData.highlightLabel || 'OFFICIAL SCHEME BENEFIT / FINANCIAL COVERAGE';
  const applyOnlineBtn = schemeData.applyOnline || ((typeof I18N !== 'undefined' && I18N.t('applyOnline')) || 'Apply Online');
  const autofillPill = schemeData.autofillReady || 'Live Autofill Ready';
  const backToCategoryLabel = schemeData.backToCategory || ((typeof I18N !== 'undefined' && I18N.t('backToCategories')) || 'Back to Schemes');
  const categoryLabel = (typeof I18N !== 'undefined' && card.categoryTitleKey && I18N.t(card.categoryTitleKey)) || 'Student Services';

  return `
    <!-- Top Breadcrumbs Bar with 3-Language Toggle -->
    <div class="gov-scheme-breadcrumb-bar">
      <div class="container gov-bc-container">
        <nav class="gov-scheme-breadcrumbs" aria-label="Breadcrumb">
          <span class="gov-bc-item" onclick="navigateTo('home')">${(typeof I18N !== 'undefined' && I18N.t('navHome')) || 'Home'}</span>
          <span class="gov-bc-sep">/</span>
          <span class="gov-bc-item" onclick="navigateTo('services')">${(typeof I18N !== 'undefined' && I18N.t('navServices')) || 'Services'}</span>
          <span class="gov-bc-sep">/</span>
          <span class="gov-bc-item" onclick="backToSchemeCategory()">${escapeSchemeHtml(categoryLabel)}</span>
          <span class="gov-bc-sep">/</span>
          <span class="gov-bc-item active">${escapeSchemeHtml(titleText)}</span>
        </nav>

        <!-- In-page Quick 3-Language Switcher (EN, HI, MR) -->
        <div class="gov-lang-pills" role="group" aria-label="Language Selector">
          <button type="button" class="gov-lang-pill ${lang === 'en' ? 'active' : ''}" onclick="I18N.setLanguage('en')">English</button>
          <button type="button" class="gov-lang-pill ${lang === 'hi' ? 'active' : ''}" onclick="I18N.setLanguage('hi')">हिंदी</button>
          <button type="button" class="gov-lang-pill ${lang === 'mr' ? 'active' : ''}" onclick="I18N.setLanguage('mr')">मराठी</button>
        </div>
      </div>
    </div>

    <div class="container gov-scheme-detail-container">
      <!-- 1. OFFICIAL SCHEME HEADER -->
      <header class="gov-scheme-hero">
        <div class="gov-scheme-hero-tricolor" aria-hidden="true"></div>
        <div class="gov-scheme-hero-inner">
          <div class="gov-scheme-hero-top">
            <div class="gov-scheme-badges-wrap">
              <span class="gov-badge-verified">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ${escapeSchemeHtml(verifiedBadge)}
              </span>
              <span class="gov-badge-dbt">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><line x1="2" x2="22" y1="9"/></svg>
                ${escapeSchemeHtml(dbtBadge)}
              </span>
              <span class="gov-badge-category">${escapeSchemeHtml(badgeText)}</span>
              <span class="gov-badge-ref">${escapeSchemeHtml(refCode)}</span>
            </div>

            <button class="gov-back-btn" onclick="backToSchemeCategory()" title="Back to Category">
              &larr; ${escapeSchemeHtml(backToCategoryLabel)}
            </button>
          </div>

          <h1 class="gov-scheme-title">${escapeSchemeHtml(titleText)}</h1>

          <div class="gov-scheme-dept-line">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
            <span>${escapeSchemeHtml(deptText)}</span>
          </div>

          <!-- Official Entitlement Highlight Banner -->
          <div class="gov-scheme-highlight-banner">
            <div class="gov-scheme-highlight-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            </div>
            <div class="gov-scheme-highlight-body">
              <span class="gov-scheme-highlight-label">${escapeSchemeHtml(highlightLabel)}</span>
              <div class="gov-scheme-highlight-value">${escapeSchemeHtml(benefitsText)}</div>
            </div>
          </div>

          <!-- Header Action Buttons -->
          <div class="gov-scheme-actions-row">
            <button class="btn btn-primary btn-lg gov-btn-apply" onclick="handleSchemeApply('${card.id}', '${escapeSchemeHtml(card.title).replace(/'/g, "\\'")}', ${card.serviceId ? `'${card.serviceId}'` : 'null'})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <span>${escapeSchemeHtml(applyOnlineBtn)}</span>
              ${card.serviceId ? `<span class="gov-autofill-pill">${escapeSchemeHtml(autofillPill)}</span>` : ''}
            </button>
          </div>
        </div>
      </header>

      ${!detail ? `
        <!-- Fallback if detail data is being indexed -->
        <div class="gov-scheme-card gov-scheme-placeholder">
          <div style="font-size:36px;color:var(--clr-accent-700)">&#9432;</div>
          <h2 style="margin:var(--sp-2) 0;color:var(--clr-gray-900)">Detailed Guidelines are being indexed</h2>
          <p style="color:var(--clr-gray-600);max-width:640px;margin:0 auto var(--sp-6)">The summary and verified entitlement above are active. For online submission, proceed via "Apply Online".</p>
          <button class="btn btn-primary" onclick="handleSchemeApply('${card.id}', '${escapeSchemeHtml(card.title).replace(/'/g, "\\'")}', ${card.serviceId ? `'${card.serviceId}'` : 'null'})">
            ${escapeSchemeHtml(applyOnlineBtn)} &rarr;
          </button>
        </div>
      ` : `
        <!-- 2. OVERVIEW / ABOUT THE SCHEME -->
        <section class="gov-scheme-card gov-scheme-overview-card">
          <div class="gov-card-header">
            <span class="gov-section-num">${escapeSchemeHtml(schemeData.sec1Num || '1.0')}</span>
            <div>
              <h2 class="gov-card-title">${escapeSchemeHtml(schemeData.sec1Title || 'About the Scheme')}</h2>
              <p class="gov-card-subtitle">${escapeSchemeHtml(schemeData.sec1Sub || 'Official objective and statutory scope under Government of Maharashtra')}</p>
            </div>
          </div>
          <div class="gov-card-body">
            <p class="gov-overview-text">${escapeSchemeHtml(schemeData.overview || '')}</p>

            <!-- At-A-Glance Quick Facts Matrix -->
            ${schemeData.facts && schemeData.facts.length ? `
              <div class="gov-facts-matrix">
                ${schemeData.facts.map(f => `
                  <div class="gov-fact-box">
                    <span class="gov-fact-label">${escapeSchemeHtml(f.label)}</span>
                    <strong class="gov-fact-value">${escapeSchemeHtml(f.value)}</strong>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </section>

        <!-- 3. INFORMATION GROUPING: 2-COLUMN DESKTOP (Benefits + Eligibility) -->
        <div class="gov-scheme-grid-2col">
          <!-- Left Column: Key Benefits -->
          <section class="gov-scheme-card">
            <div class="gov-card-header">
              <span class="gov-section-num">${escapeSchemeHtml(schemeData.sec2Num || '2.0')}</span>
              <div>
                <h2 class="gov-card-title">${escapeSchemeHtml(schemeData.sec2Title || 'Key Benefits & Entitlements')}</h2>
                <p class="gov-card-subtitle">${escapeSchemeHtml(schemeData.sec2Sub || 'Fee coverage and monthly maintenance allowances')}</p>
              </div>
            </div>
            <div class="gov-card-body">
              <div class="gov-benefits-list">
                ${(schemeData.keyBenefits || []).map(b => `
                  <div class="gov-benefit-row">
                    <div class="gov-benefit-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div class="gov-benefit-content">
                      <div class="gov-benefit-name">${escapeSchemeHtml(b.title)}</div>
                      <div class="gov-benefit-desc">${escapeSchemeHtml(b.text)}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- Right Column: Eligibility Criteria -->
          <section class="gov-scheme-card">
            <div class="gov-card-header">
              <span class="gov-section-num">${escapeSchemeHtml(schemeData.sec3Num || '3.0')}</span>
              <div>
                <h2 class="gov-card-title">${escapeSchemeHtml(schemeData.sec3Title || 'Mandatory Eligibility Criteria')}</h2>
                <p class="gov-card-subtitle">${escapeSchemeHtml(schemeData.sec3Sub || 'Conditions required to qualify for this scholarship')}</p>
              </div>
            </div>
            <div class="gov-card-body">
              <div class="gov-eligibility-list">
                ${(schemeData.eligibility || []).map(e => `
                  <div class="gov-eligibility-row">
                    <span class="gov-eligibility-tag">${escapeSchemeHtml(e.title)}</span>
                    <div class="gov-eligibility-desc">${escapeSchemeHtml(e.text)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        </div>

        <!-- 4. APPLICATION PROCESS (Numbered Step-by-Step Flow) -->
        <section class="gov-scheme-card">
          <div class="gov-card-header">
            <span class="gov-section-num">${escapeSchemeHtml(schemeData.sec4Num || '4.0')}</span>
            <div>
              <h2 class="gov-card-title">${escapeSchemeHtml(schemeData.sec4Title || 'Step-by-Step Application Procedure')}</h2>
              <p class="gov-card-subtitle">${escapeSchemeHtml(schemeData.sec4Sub || 'Simple, transparent 4-stage process to submit and track your scholarship')}</p>
            </div>
          </div>
          <div class="gov-card-body">
            <div class="gov-stepper-grid">
              ${(schemeData.applicationSteps || []).map((step, idx, arr) => `
                <div class="gov-step-box">
                  <div class="gov-step-badge">${escapeSchemeHtml(step.step)}</div>
                  <div class="gov-step-title">${escapeSchemeHtml(step.title)}</div>
                  <p class="gov-step-text">${escapeSchemeHtml(step.text)}</p>
                </div>
                ${idx < arr.length - 1 ? '<div class="gov-step-arrow" aria-hidden="true">&rarr;</div>' : ''}
              `).join('')}
            </div>
          </div>
        </section>

        <!-- 5. DATES, DOCUMENTS & OFFICIAL SOURCES (Grouped 2-Column, Helpdesk removed) -->
        <div class="gov-scheme-grid-2col">
          <!-- Left Column: Dates & Official Sources -->
          <div class="gov-col-vertical">
            <!-- Important Dates Area -->
            <section class="gov-scheme-card">
              <div class="gov-card-header">
                <span class="gov-section-num">${escapeSchemeHtml(schemeData.sec5Num || '5.0')}</span>
                <div>
                  <h2 class="gov-card-title">${escapeSchemeHtml(schemeData.sec5Title || 'Important Dates & Schedule')}</h2>
                  <p class="gov-card-subtitle">${escapeSchemeHtml(schemeData.sec5Sub || 'Official application timelines and notification window')}</p>
                </div>
              </div>
              <div class="gov-card-body">
                <div class="gov-dates-box">
                  <div class="gov-dates-badge">${escapeSchemeHtml(schemeData.datesBadge || 'ACTIVE APPLICATION WINDOW')}</div>
                  <div class="gov-dates-heading">${escapeSchemeHtml(schemeData.datesHeading || '')}</div>
                  <div class="gov-dates-range">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <strong>${escapeSchemeHtml(schemeData.datesRange || '')}</strong>
                  </div>
                  ${schemeData.datesNote ? `
                    <div class="gov-dates-note">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                      <span>${escapeSchemeHtml(schemeData.datesNote)}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            </section>

            <!-- Official Sources -->
            <section class="gov-scheme-card">
              <div class="gov-card-header">
                <span class="gov-section-num">${escapeSchemeHtml(schemeData.sec6Num || '6.0')}</span>
                <div>
                  <h2 class="gov-card-title">${escapeSchemeHtml(schemeData.sec6Title || 'Official Sources & Verification')}</h2>
                  <p class="gov-card-subtitle">${escapeSchemeHtml(schemeData.sec6Sub || 'Verified portals and official government documentation')}</p>
                </div>
              </div>
              <div class="gov-card-body">
                <p class="gov-sources-note">${escapeSchemeHtml(schemeData.sourcesNote || 'The information presented on this page is compiled directly from authorized Government of Maharashtra portals:')}</p>
                <div class="gov-sources-list">
                  ${(schemeData.sources || []).map(s => `
                    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="gov-source-btn">
                      <span class="gov-source-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      </span>
                      <span class="gov-source-label">${escapeSchemeHtml(s.label)}</span>
                      <span class="gov-source-tag">Official Link &nearr;</span>
                    </a>
                  `).join('')}
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column: Required Documents Checklist -->
          <div class="gov-col-vertical">
            <section class="gov-scheme-card">
              <div class="gov-card-header">
                <span class="gov-section-num">${escapeSchemeHtml(schemeData.sec7Num || '7.0')}</span>
                <div>
                  <h2 class="gov-card-title">${escapeSchemeHtml(schemeData.sec7Title || 'Mandatory Required Documents')}</h2>
                  <p class="gov-card-subtitle">${escapeSchemeHtml(schemeData.sec7Sub || 'Scanned documents to keep ready prior to submission')}</p>
                </div>
              </div>
              <div class="gov-card-body">
                <div class="gov-docs-list">
                  ${(schemeData.requiredDocuments || []).map((doc, idx) => `
                    <div class="gov-doc-item">
                      <span class="gov-doc-index">0${idx + 1}</span>
                      <div class="gov-doc-body">
                        <strong class="gov-doc-title">${escapeSchemeHtml(typeof doc === 'string' ? doc : doc.title)}</strong>
                        <span class="gov-doc-sub">${escapeSchemeHtml(typeof doc === 'object' && doc.desc ? doc.desc : 'Original copy issued by competent authority / institution')}</span>
                      </div>
                      <span class="gov-doc-check" aria-hidden="true">&#10003;</span>
                    </div>
                  `).join('')}
                </div>
                <div class="gov-docs-alert">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <div>
                    ${escapeSchemeHtml(schemeData.docsAlert || 'Ensure your bank account is active and seeded with Aadhaar in the NPCI mapper for uninterrupted Direct Benefit Transfer (DBT).')}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      `}

      <!-- Bottom Actions Bar (Helpdesk removed) -->
      <div class="gov-scheme-bottom-bar">
        <button class="btn btn-secondary btn-lg" onclick="backToSchemeCategory()">
          &larr; ${escapeSchemeHtml(backToCategoryLabel)}
        </button>
        <button class="btn btn-primary btn-lg" onclick="handleSchemeApply('${card.id}', '${escapeSchemeHtml(card.title).replace(/'/g, "\\'")}', ${card.serviceId ? `'${card.serviceId}'` : 'null'})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <span>${escapeSchemeHtml(applyOnlineBtn)}</span>
        </button>
      </div>
    </div>
  `;
}


