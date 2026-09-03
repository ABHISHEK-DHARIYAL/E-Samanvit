/**
 * MITRA — e-Samanvit Citizen AI Assistant
 * Multilingual (Marathi, Hindi, English) Citizen AI Companion
 * Supports instant language switching with localized greetings, chips, knowledge base and replies.
 */

const MitraChatbot = {
  isOpen: false,
  isPillVisible: false,
  messages: [],
  isTyping: false,

  // Localized UI strings for Marathi, Hindi, and English
  uiStrings: {
    en: {
      pillText: 'Ask to MITRA',
      headerTitle: 'MITRA',
      headerSub: 'Citizen AI Companion • e-Samanvit',
      welcomeBadge: '✨ OFFICIAL CITIZEN AI COMPANION',
      welcomeTitle: 'Namaste! I am MITRA',
      welcomeDesc: 'How may I assist you today? Ask me about Maharashtra government welfare schemes, student scholarships, farmer benefits, or how to apply online.',
      topicsTitle: 'Common Topics:',
      chips: [
        { label: '🎓 Scholarships', query: 'Scholarships for Students' },
        { label: '🌾 Farmer Welfare', query: 'Farmer Subsidies & Mandi Rates' },
        { label: '👩‍👧 Women & Child', query: 'Women Welfare Schemes' },
        { label: '🏥 Healthcare MJPJAY', query: 'Free Healthcare & Hospitals' },
        { label: '📝 How to Apply', query: 'How do I apply online?' },
        { label: '🔍 Track Application', query: 'Track application status' }
      ],
      placeholder: 'Type your question here...',
      footerNote: 'Official Citizen AI Service • Government of Maharashtra',
      langSwitchNote: '🌐 Language switched to English. I am ready to help you!',
      clearTitle: 'Clear Chat',
      closeTitle: 'Close Chat',
      sendAria: 'Send Message'
    },
    hi: {
      pillText: 'मित्रा से पूछें',
      headerTitle: 'मित्रा (MITRA)',
      headerSub: 'नागरिक एआई साथी • ई-समन्वित',
      welcomeBadge: '✨ आधिकारिक नागरिक एआई साथी',
      welcomeTitle: 'नमस्ते! मैं मित्रा (MITRA) हूँ',
      welcomeDesc: 'मैं आपकी क्या सहायता कर सकती हूँ? महाराष्ट्र शासन की जनकल्याणकारी योजनाओं, छात्रवृत्तियों, किसान अनुदान अथवा ऑनलाइन आवेदन के बारे में पूछें।',
      topicsTitle: 'प्रमुख विषय:',
      chips: [
        { label: '🎓 छात्रवृत्ति योजनाएं', query: 'विद्यार्थी छात्रवृत्ति योजनाओं की जानकारी दें' },
        { label: '🌾 किसान कल्याण व फसल', query: 'किसान अनुदान एवं फसल बीमा योजना' },
        { label: '👩‍👧 महिला एवं बाल कल्याण', query: 'लाडकी बहीण एवं महिला कल्याण योजनाएं' },
        { label: '🏥 मुफ्त इलाज (MJPJAY)', query: 'जन आरोग्य योजना एवं मुफ्त इलाज' },
        { label: '📝 आवेदन कैसे करें', query: 'ऑनलाइन आवेदन कैसे करें?' },
        { label: '🔍 आवेदन की स्थिति', query: 'आवेदन की स्थिति कैसे जांचें?' }
      ],
      placeholder: 'अपना प्रश्न यहाँ लिखें...',
      footerNote: 'आधिकारिक नागरिक एआई सेवा • महाराष्ट्र शासन',
      langSwitchNote: '🌐 भाषा बदलकर हिंदी कर दी गई है। मैं आपकी सहायता के लिए तैयार हूँ!',
      clearTitle: 'चैट साफ करें',
      closeTitle: 'चैट बंद करें',
      sendAria: 'संदेश भेजें'
    },
    mr: {
      pillText: 'मित्राला विचारा',
      headerTitle: 'मित्रा (MITRA)',
      headerSub: 'नागरिक AI सहाय्यक • ई-समन्वित',
      welcomeBadge: '✨ अधिकृत नागरिक AI सहाय्यक',
      welcomeTitle: 'नमस्कार! मी मित्रा (MITRA)',
      welcomeDesc: 'मी आपल्याला कशी मदत करू शकते? महाराष्ट्र शासनाच्या लोककल्याणकारी योजना, विद्यार्थी शिष्यवृत्ती, शेतकरी अनुदान किंवा ऑनलाइन अर्जाविषयी विचारा.',
      topicsTitle: 'वारंवार विचारले जाणारे विषय:',
      chips: [
        { label: '🎓 विद्यार्थी शिष्यवृत्ती', query: 'विद्यार्थी शिष्यवृत्ती योजनांची माहिती द्या' },
        { label: '🌾 शेतकरी व पीक विमा', query: 'शेतकरी अनुदान व पीक विमा माहिती' },
        { label: '👩‍👧 महिला व बाल कल्याण', query: 'लाडकी बहीण व महिला योजना' },
        { label: '🏥 मोफत उपचार (MJPJAY)', query: 'महात्मा फुले जन आरोग्य योजना व उपचार' },
        { label: '📝 अर्ज कसा करावा', query: 'ऑनलाइन अर्ज कसा करावा?' },
        { label: '🔍 अर्जाची सद्यस्थिती', query: 'अर्जाची स्थिती कशी तपासावी?' }
      ],
      placeholder: 'आपला प्रश्न येथे टाईप करा...',
      footerNote: 'अधिकृत नागरिक AI सेवा • महाराष्ट्र शासन',
      langSwitchNote: '🌐 भाषा मराठीत बदलली आहे. मी आपल्या सेवेसाठी तत्पर आहे!',
      clearTitle: 'चॅट साफ करा',
      closeTitle: 'चॅट बंद करा',
      sendAria: 'संदेश पाठवा'
    }
  },

  // Knowledge base of e-Samanvit portal services & FAQs
  knowledge: [
    {
      keywords: ['scholarship', 'student', 'shikshan', 'college', 'school', 'fee', 'fees', 'study', 'विद्यार्थी', 'शिष्यवृत्ती', 'छात्रवृत्ति', 'पढ़ाई'],
      response: {
        en: `🎓 **Education & Student Services:**
e-Samanvit integrates all higher education and post-matric welfare schemes:
• **Post-Matric Scholarship:** Financial assistance for tuition and hostel expenses.
• **Technical Education Fee Waiver:** Directorate of Higher & Tech Education benefit for eligible students.
• **Savitribai Phule Scheme:** Special scholarship for girl students across Maharashtra.

**Eligibility & Documents:** Aadhaar card, income certificate, caste certificate (if applicable), marksheet, and domicile certificate.`,
        hi: `🎓 **शिक्षा एवं छात्रवृत्ति सेवाएं:**
ई-समन्वित पोर्टल पर छात्रों के लिए प्रमुख योजनाएं उपलब्ध हैं:
• **मैट्रिकोत्तर छात्रवृत्ति:** ट्यूशन फीस और छात्रावास सहायता।
• **तकनीकी शिक्षा शुल्क प्रतिपूर्ति:** उच्च एवं तकनीकी शिक्षा विभाग द्वारा शुल्क माफी।
• **सावित्रीबाई फुले योजना:** बालिकाओं की शिक्षा हेतु विशेष वित्तीय सहायता।

**आवश्यक दस्तावेज:** आधार कार्ड, आय प्रमाण पत्र, जाति प्रमाण पत्र, अंकतालिका और अधिवास प्रमाण पत्र।`,
        mr: `🎓 **शिक्षण व विद्यार्थी योजना:**
ई-समन्वित पोर्टलवर विद्यार्थ्यांसाठी खालील प्रमुख योजना उपलब्ध आहेत:
• **मॅट्रिकोत्तर शिष्यवृत्ती:** शिक्षण शुल्क व वसतिगृह भत्ता थेट बँक खात्यात.
• **उच्च व तंत्रशिक्षण शुल्क सवलत:** पात्र विद्यार्थ्यांना शैक्षणिक शुल्क प्रतिपूर्ती.
• **सावित्रीबाई फुले शिष्यवृत्ती:** विद्यार्थिनींसाठी विशेष शैक्षणिक सहाय्य.

**लागणारी कागदपत्रे:** आधार कार्ड, उत्पन्न दाखला, जात प्रमाणपत्र, गुणपत्रिका आणि अधिवास प्रमाणपत्र.`
      },
      action: {
        text: { en: "View Student Schemes", hi: "विद्यार्थी योजनाएं देखें", mr: "विद्यार्थी योजना पहा" },
        page: "services",
        cat: "students"
      }
    },
    {
      keywords: ['farmer', 'kisan', 'shetkari', 'crop', 'mandi', 'namo', 'krishi', 'soil', 'weather', 'irrigation', 'शेती', 'शेतकरी', 'फसल', 'किसान', 'बाजारभाव'],
      response: {
        en: `🌾 **Agriculture & Farmer Welfare:**
e-Samanvit provides comprehensive single-window support for Maharashtra farmers:
• **PM-Kisan & Namo Shetkari Mahasanman Nidhi:** Direct financial subsidy deposited into bank accounts.
• **PMFBY Crop Insurance (₹1 Scheme):** Comprehensive crop loss and climate damage protection.
• **Drip Irrigation Subsidy (Mahadbt Krishi):** Subsidies for micro-irrigation and farm equipment.
• **Live APMC Mandi Rates:** Transparent crop market rates across all Maharashtra APMCs.`,
        hi: `🌾 **कृषि एवं किसान कल्याण सेवाएं:**
महाराष्ट्र के किसानों के लिए ई-समन्वित पर उपलब्ध प्रमुख योजनाएं:
• **नमो शेतकरी महासन्मान निधी व पीएम-किसान:** वित्तीय सहायता सीधे बैंक खाते में।
• **एक रुपया पीक विमा (PMFBY):** फसल नुकसान से सुरक्षा हेतु बीमा।
• **ठिबक सिंचन अनुदान:** सूक्ष्म सिंचाई और कृषि उपकरणों पर सरकारी सब्सिडी।
• **लाइव एपीएमसी मंडी भाव:** महाराष्ट्र की सभी कृषि उपज मंडियों के ताज़ा भाव।`,
        mr: `🌾 **कृषी व शेतकरी कल्याण सेवा:**
महाराष्ट्रातील बळीराजासाठी ई-समन्वित पोर्टलवर सर्वसमावेशक सेवा:
• **नमो शेतकरी महासन्मान निधी व पीएम-किसान:** वार्षिक आर्थिक अनुदान थेट बँक खात्यात.
• **एक रुपया पीक विमा योजना (PMFBY):** नैसर्गिक आपत्ती व नुकसानीपासून संपूर्ण संरक्षण.
• **ठिबक सिंचन व कृषी अवजारे अनुदान:** महाडीबीटी कृषी पोर्टलद्वारे थेट अनुदान.
• **थेट कृषी बाजारभाव:** राज्यातील सर्व प्रमुख बाजार समित्यांचे ताजे दर.`
      },
      action: {
        text: { en: "View Farmer Schemes", hi: "किसान योजनाएं देखें", mr: "शेतकरी योजना पहा" },
        page: "services",
        cat: "farmers"
      }
    },
    {
      keywords: ['women', 'woman', 'child', 'mahila', 'ladki bahin', 'kanya', 'safety', 'girl', 'maternity', 'poshan', 'महिला', 'मुलगी', 'बेटी', 'लाडकी बहीण'],
      response: {
        en: `👩‍👧 **Women & Child Welfare:**
Dedicated safety, financial independence, and maternal schemes:
• **Mukhyamantri Majhi Ladki Bahin Yojana:** Monthly direct financial aid for eligible women.
• **Majhi Kanya Bhagyashree:** Life insurance and education grants for girl children.
• **Mahila Samman Bachat Patra (MSSC):** High-interest safe savings certificate for women.
• **Poshan Abhiyaan & Matru Vandana:** Nutritional and healthcare support for pregnant & lactating mothers.`,
        hi: `👩‍👧 **महिला एवं बाल कल्याण योजनाएं:**
महिलाओं और बच्चों के सशक्तिकरण के लिए योजनाएं:
• **मुख्यमंत्री माझी लाडकी बहीण योजना:** पात्र महिलाओं के बैंक खाते में मासिक आर्थिक सहायता।
• **माझी कन्या भाग्यश्री:** बालिकाओं के पोषण और शिक्षा हेतु सरकारी सहायता।
• **महिला सम्मान बचत पत्र:** सुरक्षित बचत और आकर्षक ब्याज योजना।
• **प्रधानमंत्री मातृ वंदना योजना:** गर्भवती व धात्री माताओं के लिए मातृत्व पोषण लाभ।`,
        mr: `👩‍👧 **महिला व बाल कल्याण सेवा:**
महिला व बालकांच्या सक्षमीकरणासाठी प्रमुख शासकीय योजना:
• **मुख्यमंत्री माझी लाडकी बहीण योजना:** पात्र महिलांना दरमहा थेट आर्थिक मदत.
• **माझी कन्या भाग्यश्री योजना:** मुलींच्या शिक्षणासाठी व सुरक्षेसाठी अनुदान.
• **महिला सन्मान बचत प्रमाणपत्र:** महिलांसाठी सुरक्षित गुंतवणूक व भरघोस व्याज.
• **मातृ वंदना व पोषण अभियान:** गरोदर व स्तनदा मातांसाठी पोषण आहार व आर्थिक सहाय्य.`
      },
      action: {
        text: { en: "View Women Schemes", hi: "महिला योजनाएं देखें", mr: "महिला योजना पहा" },
        page: "services",
        cat: "women"
      }
    },
    {
      keywords: ['health', 'hospital', 'doctor', 'treatment', 'medical', 'medicine', 'jan arogya', 'aarogya', 'mjpjay', 'ayushman', 'आरोग्य', 'दवाखाना', 'इलाज', 'रुग्णालय'],
      response: {
        en: `🏥 **Health & Wellness Services:**
Quality healthcare and cashless hospital treatment:
• **Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY):** Free cashless medical and surgical treatment up to ₹5,00,000 across empaneled hospitals.
• **Ayushman Bharat Digital Health Card (ABHA):** Create your unified digital health ID to store and share medical records securely.
• **Emergency Ambulance:** Dial 108 for 24/7 free emergency medical response.`,
        hi: `🏥 **स्वास्थ्य एवं चिकित्सा सेवाएं:**
सभी नागरिकों के लिए कैशलेस एवं गुणवत्तापूर्ण स्वास्थ्य सेवाएं:
• **महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY):** चयनित अस्पतालों में ₹5 लाख तक का कैशलेस इलाज।
• **आयुष्मान भारत डिजिटल हेल्थ आईडी (ABHA):** अपनी डिजिटल स्वास्थ्य पहचान पत्र ऑनलाइन बनाएं।
• **आपातकालीन एम्बुलेंस सेवा:** 24 घंटे आपातकालीन सेवा के लिए 108 डायल करें।`,
        mr: `🏥 **आरोग्य व वैद्यकीय लोकसेवा:**
राज्यातील सर्व नागरिकांसाठी मोफत व कॅशलेस उपचार सेवा:
• **महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY):** अंगीकृत रुग्णालयांमध्ये ₹5 लाखांपर्यंत मोफत कॅशलेस उपचार.
• **आयुष्मान भारत डिजिटल हेल्थ कार्ड (ABHA):** डिजिटल आरोग्य कार्ड त्वरित बनवा.
• **आपत्कालीन रुग्णवाहिका सेवा:** 24/7 मोफत वैद्यकीय मदतीसाठी 108 वर संपर्क साधा.`
      },
      action: {
        text: { en: "View Health Schemes", hi: "स्वास्थ्य योजनाएं देखें", mr: "आरोग्य योजना पहा" },
        page: "services",
        cat: "health"
      }
    },
    {
      keywords: ['senior', 'pension', 'old age', 'vridha', 'elderly', 'shravan bal', 'sanjay gandhi', 'ज्येष्ठ नागरिक', 'पेन्शन', 'वृद्धावस्था'],
      response: {
        en: `👴 **Senior Citizen Support & Welfare:**
Dignified social security and assistive care:
• **Sanjay Gandhi Niradhar Anudan Yojana:** Monthly financial pension for destitute senior citizens and persons with disabilities.
• **Shravan Bal Seva Rajya Nivruttivetan Yojana:** Dedicated pension support for senior citizens aged 65 and above.
• **Senior Citizen ID Card:** Official state card for transportation discounts and hospital concessions.`,
        hi: `👴 **वरिष्ठ नागरिक कल्याण एवं पेंशन:**
बुजुर्ग नागरिकों के लिए सम्मानजनक सामाजिक सुरक्षा:
• **संजय गांधी निराधार अनुदान योजना:** निराधार वरिष्ठ नागरिकों के लिए मासिक पेंशन।
• **श्रावण बाळ सेवा राज्य निवृत्तिवेतन योजना:** 65 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिकों के लिए मासिक पेंशन।
• **वरिष्ठ नागरिक पहचान पत्र:** राज्य परिवहन में छूट और अस्पतालों में विशेष सुविधाएं।`,
        mr: `👴 **ज्येष्ठ नागरिक लोकसेवा व पेन्शन:**
ज्येष्ठ नागरिकांसाठी सन्मानजनक सामाजिक सुरक्षा:
• **संजय गांधी निराधार अनुदान योजना:** निराधार ज्येष्ठ नागरिकांना दरमहा थेट पेन्शन.
• **श्रावण बाळ सेवा राज्य निवृत्तीवेतन योजना:** 65 वर्षे व त्यावरील वयाच्या नागरिकांसाठी मासिक निवृत्तीवेतन.
• **ज्येष्ठ नागरिक ओळखपत्र:** प्रवास सवलती व शासकीय रुग्णालयांमध्ये प्राधान्य.`
      },
      action: {
        text: { en: "View Senior Schemes", hi: "वरिष्ठ नागरिक योजनाएं देखें", mr: "ज्येष्ठ नागरिक योजना पहा" },
        page: "services",
        cat: "senior"
      }
    },
    {
      keywords: ['housing', 'house', 'home', 'awas', 'gharkul', 'pmay', 'ramai', 'shabari', 'shelter', 'घरकूल', 'आवास', 'घर'],
      response: {
        en: `🏡 **Housing & Shelter Schemes:**
Affordable and permanent pucca housing for eligible families:
• **Pradhan Mantri Awas Yojana (PMAY Urban & Gramin):** Financial subsidy up to ₹2.5 Lakhs for construction of permanent home.
• **Ramai Awas Yojana:** Dedicated housing assistance for Scheduled Caste and Neo-Buddhist families in Maharashtra.
• **Shabari Awas Yojana:** Housing scheme for tribal (ST) rural families across Maharashtra.`,
        hi: `🏡 **आवास एवं गृहनिर्माण योजनाएं:**
पात्र परिवारों के लिए पक्के मकान की सुविधा:
• **प्रधानमंत्री आवास योजना (PMAY ग्रामीण व शहरी):** पक्का मकान बनाने के लिए ₹2.5 लाख तक का सरकारी अनुदान।
• **रमाई आवास योजना:** अनुसूचित जाति एवं नवबौद्ध परिवारों के लिए पक्के घर की योजना।
• **शबरी आवास योजना:** महाराष्ट्र के आदिवासी परिवारों के लिए विशेष गृहनिर्माण सहायता।`,
        mr: `🏡 **गृहनिर्माण व घरकुल योजना:**
पात्र कुटुंबांना स्वतःचे हक्काचे पक्के घर देण्यासाठी योजना:
• **प्रधानमंत्री आवास योजना (PMAY):** पक्के घर बांधण्यासाठी ₹2.5 लाखांपर्यंत शासकीय अनुदान.
• **रमाई आवास योजना:** अनुसूचित जाती व नवबौद्ध घटकांसाठी घरकुल योजना.
• **शबरी आदिवासी घरकुल योजना:** आदिवासी ग्रामीण भागातील कुटुंबांसाठी पक्के घर योजना.`
      },
      action: {
        text: { en: "View Housing Schemes", hi: "आवास योजनाएं देखें", mr: "घरकुल योजना पहा" },
        page: "services",
        cat: "housing"
      }
    },
    {
      keywords: ['apply', 'how to', 'online', 'process', 'step', 'form', 'documents', 'अर्ज', 'आवेदन', 'फॉर्म', 'कसा करावा', 'कैसे करें'],
      response: {
        en: `📝 **How to Apply Online on e-Samanvit (3 Easy Steps):**
1. **Explore Services:** Visit the "Services" tab and select your citizen category.
2. **Fill Details:** Choose your scheme, enter your basic profile and authenticate via Aadhaar OTP.
3. **Submit & Download:** Upload required documents, submit your form, and get your digital receipt with tracking Application ID instantly.

Zero queues, zero processing fees, and 100% paperless!`,
        hi: `📝 **ई-समन्वित पर ऑनलाइन आवेदन कैसे करें (3 आसान चरण):**
1. **सेवाएं चुनें:** 'Services' टैब पर जाएं और अपनी नागरिक श्रेणी चुनें।
2. **विवरण भरें:** संबंधित योजना चुनें, आधार ओटीपी द्वारा सत्यापन करें और जरूरी दस्तावेज अपलोड करें।
3. **सबमिट करें:** आवेदन सबमिट करते ही आपको ट्रैकिंग आईडी और डिजिटल रसीद प्राप्त होगी।

पूरी तरह कागजरहित और कतार-मुक्त प्रक्रिया!`,
        mr: `📝 **ई-समन्वितवर ऑनलाइन अर्ज कसा करावा (3 सोप्या पायऱ्या):**
1. **योजना निवडा:** 'Services' विभागात जाऊन आपल्या गरजेनुसार नागरिक संवर्ग निवडा.
2. **माहिती भरा:** हवी ती योजना निवडून आधार ओटीपीद्वारे पडताळणी करा आणि कागदपत्रे अपलोड करा.
3. **अर्ज सादर करा:** अर्ज सबमिट करताच आपल्याला तत्काळ डिजिटल पावती आणि ट्रॅकिंग आयडी मिळेल.

रांगेत उभे न राहता घरबसल्या पूर्णपणे कागदपत्रविरहित अर्ज करा!`
      },
      action: {
        text: { en: "Go to Services", hi: "सेवाएं देखें", mr: "सर्व सेवा पहा" },
        page: "services"
      }
    },
    {
      keywords: ['track', 'status', 'application', 'reference', 'where', 'check', 'ट्रॅक', 'स्थिती', 'स्टेटस', 'तपासा', 'जांचें'],
      response: {
        en: `🔍 **Track Your Application Status:**
You can track your submitted applications anytime:
1. Go to **Dashboard** or **My Applications** from the top menu.
2. Enter your Application Reference Number or login with your mobile number.
3. View real-time status: *Submitted → Department Verified → Approved → Benefit Disbursed*.
You also receive automatic SMS updates at every milestone!`,
        hi: `🔍 **आवेदन की स्थिति (Track Status) कैसे जांचें:**
आप कभी भी अपने आवेदन की लाइव स्थिति देख सकते हैं:
1. शीर्ष मेनू से **Dashboard** या **My Applications** पर जाएं।
2. अपना आवेदन संदर्भ क्रमांक (Application ID) दर्ज करें।
3. लाइव स्थिति देखें: *Submitted → Verified → Approved → DBT Disbursed*।
आपको मोबाइल पर रियल-टाइम एसएमएस भी प्राप्त होता है।`,
        mr: `🔍 **अर्जाची सद्यस्थिती (Status) कशी तपासावी:**
आपण आपल्या अर्जाची स्थिती कधीही तपासू शकता:
1. वरील मेनूमधून **Dashboard** किंवा **My Applications** वर जा.
2. आपला अर्ज क्रमांक (Application ID) प्रविष्ट करा.
3. थेट स्थिती पहा: *अर्ज सादर → छाननी पूर्ण → मंजूर → लाभ जमा*.
प्रत्येक टप्प्यावर आपल्या मोबाईलवर एसएमएस संदेशही पाठवला जातो.`
      },
      action: {
        text: { en: "Open My Applications", hi: "आवेदन की स्थिति देखें", mr: "अर्जांची स्थिती पहा" },
        page: "my-applications"
      }
    },
    {
      keywords: ['dbt', 'bank', 'transfer', 'money', 'paise', 'account', 'खाते', 'पैसे', 'डीबीटी', 'रुपये'],
      response: {
        en: `🏦 **Direct Benefit Transfer (DBT):**
e-Samanvit directly connects state welfare disbursements to the Public Financial Management System (PFMS):
• All monetary subsidies and scholarships are credited directly to your Aadhaar-linked bank account.
• No intermediaries, brokers, or cash handovers.
• 100% transparent with instant digital bank transaction reference receipts.`,
        hi: `🏦 **प्रत्यक्ष लाभ अंतरण (DBT):**
ई-समन्वित पोर्टल पर सभी सरकारी लाभ सीधे बैंक खाते में भेजे जाते हैं:
• छात्रवृत्ति और किसान अनुदान बिना किसी बिचौलिए के सीधे आधार से जुड़े बैंक खाते में जमा होते हैं।
• नकद लेनदेन या दलालों की कोई आवश्यकता नहीं।
• पूर्णतः पारदर्शी और त्वरित प्रक्रिया।`,
        mr: `🏦 **थेट बँक हस्तांतरण (DBT):**
ई-समन्वित पोर्टलवरून मिळणारा सर्व शासकीय लाभ थेट आपल्या बँक खात्यात जमा होतो:
• सर्व शिष्यवृत्ती आणि शेतकरी अनुदान थेट आधारसंलग्न बँक खात्यात वर्ग केले जाते.
• कोणत्याही मध्यस्थांची किंवा एजंटची गरज नाही.
• पूर्णपणे पारदर्शक आणि सुरक्षित डिजिटल व्यवस्था.`
      }
    },
    {
      keywords: ['contact', 'help', 'phone', 'call', 'number', 'helpline', 'email', 'support', 'मदत', 'संपर्क', 'फोन', 'हेल्पलाइन'],
      response: {
        en: `📞 **Official Citizen Helpline & Support:**
We are here to assist you 24x7:
• **Toll-Free Citizen Helpline:** 1800-120-8040
• **Support Email:** helpdesk@esamanvit.gov.in
• **Technical Assistance:** Available in Marathi, Hindi & English
• **Office:** Mantralaya, Public Services Delivery Directorate, Mumbai 400032.`,
        hi: `📞 **नागरिक सहायता केंद्र एवं हेल्पलाइन:**
नागरिकों की सहायता के लिए उपलब्ध संपर्क सूत्र:
• **टोल-फ्री नागरिक हेल्पलाइन:** 1800-120-8040 (24 घंटे उपलब्ध)
• **सहायता ईमेल:** helpdesk@esamanvit.gov.in
• **भाषा सहयोग:** मराठी, हिंदी एवं अंग्रेजी
• **मुख्यालय:** मंत्रालय, लोकसेवा अधिकार कक्ष, मुंबई 400032।`,
        mr: `📞 **अधिकृत नागरिक मदत केंद्र व संपर्क:**
आपल्या मदतीसाठी सदैव तत्पर:
• **टोल-फ्री नागरिक हेल्पलाइन:** 1800-120-8040 (24/7 सेवेत)
• **मदत ईमेल:** helpdesk@esamanvit.gov.in
• **भाषा सहाय्य:** मराठी, हिंदी व इंग्रजी भाषेत मार्गदर्शन
• **पत्ता:** मंत्रालय, लोकसेवा हक्क कक्ष, मुंबई 400032.`
      },
      action: {
        text: { en: "Contact Support Page", hi: "सहायता केंद्र देखें", mr: "मदत केंद्र संपर्क" },
        page: "contact"
      }
    },
    {
      keywords: ['about', 'mitra', 'who are you', 'what is', 'esamanvit', 'e-samanvit', 'काय आहे', 'क्या है', 'तू कोण आहेस', 'तुम कौन हो'],
      response: {
        en: `🤖 **Namaste! I am MITRA — e-Samanvit Citizen AI Assistant:**
I am designed by the Government of Maharashtra to guide every citizen.
• **What is e-Samanvit?** It is Maharashtra's official Public Services Interoperability Platform connecting all government departments.
• **What can I do?** Ask me about any government scheme, eligibility criteria, required documents, how to apply online, or how to track your submitted application!`,
        hi: `🤖 **नमस्ते! मैं मित्रा (MITRA) हूँ — ई-समन्वित नागरिक एआई सहायक:**
मैं महाराष्ट्र सरकार के ई-समन्वित पोर्टल का आधिकारिक डिजिटल साथी हूँ।
• **ई-समन्वित क्या है?** यह महाराष्ट्र शासन का एकीकृत जनसेवा पोर्टल है जो सभी विभागों को एक मंच पर जोड़ता है।
• **मैं आपकी क्या सहायता कर सकता हूँ?** आप मुझसे किसी भी सरकारी योजना, पात्रता, आवश्यक दस्तावेज, ऑनलाइन आवेदन या आवेदन स्थिति के बारे में पूछ सकते हैं!`,
        mr: `🤖 **नमस्कार! मी मित्रा (MITRA) — ई-समन्वित नागरिक AI सहाय्यक:**
मी महाराष्ट्र शासनाचा अधिकृत डिजिटल मित्र आहे.
• **ई-समन्वित म्हणजे काय?** हे महाराष्ट्र शासनाचे एकात्मिक लोकसेवा व्यासपीठ आहे, जिथे सर्व शासकीय योजना एकाच ठिकाणी उपलब्ध आहेत.
• **मी काय मदत करू शकतो?** आपण मला कोणत्याही शासकीय योजनेबद्दल, आवश्यक कागदपत्रांबद्दल, ऑनलाइन अर्जाबद्दल किंवा अर्जाच्या स्थितीबद्दल विचारू शकता!`
      }
    }
  ],

  // Fallback response if query does not match knowledge base
  getFallbackResponse(query) {
    const lang = (typeof I18N !== 'undefined' && I18N.currentLang) || 'en';
    if (lang === 'mr') {
      return `मी आपल्या प्रश्नाचा अभ्यास करत आहे. आपण खालीलपैकी कोणत्याही विषयावर विचारू शकता:
• 🎓 **विद्यार्थी शिष्यवृत्ती** किंवा शैक्षणिक योजना
• 🌾 **शेतकरी योजना, पीक विमा व थेट अनुदान**
• 👩‍👧 **महिला व बाल कल्याण योजना (लाडकी बहीण इ.)**
• 🏥 **आरोग्य सेवा व महात्मा फुले जन आरोग्य योजना**
• 📝 **ऑनलाइन अर्ज कसा करावा किंवा अर्जाची स्थिती**
किंवा अधिक माहितीसाठी थेट **'Services'** विभागात भेट द्या.`;
    } else if (lang === 'hi') {
      return `मैं आपके प्रश्न का अध्ययन कर रहा हूँ। आप मुझसे इन विषयों पर पूछ सकते हैं:
• 🎓 **छात्रवृत्तियां एवं शिक्षा योजनाएं**
• 🌾 **किसान कल्याण, नमो शेतकरी व पीक विमा**
• 👩‍👧 **महिला एवं बाल कल्याण योजनाएं (लाडकी बहीण आदि)**
• 🏥 **स्वास्थ्य सेवाएं एवं जन आरोग्य योजना**
• 📝 **ऑनलाइन आवेदन की प्रक्रिया या आवेदन की स्थिति**
या अधिक विवरण के लिए 'Services' पृष्ठ पर जाएं।`;
    } else {
      return `I'm happy to help you with anything on the e-Samanvit portal! You can ask me about:
• 🎓 **Student Scholarships & Higher Education**
• 🌾 **Farmer Subsidies, Mandi Rates & Crop Insurance**
• 👩‍👧 **Women & Child Welfare Schemes (Ladki Bahin, etc.)**
• 🏥 **Healthcare & Cashless Hospitalization (MJPJAY)**
• 📝 **How to Apply Online or Track Your Application Status**
You can also explore our **Services** section for the full directory.`;
    }
  },

  getCurrentLang() {
    return (typeof I18N !== 'undefined' && I18N.currentLang) || 'en';
  },

  getUI() {
    const lang = this.getCurrentLang();
    return this.uiStrings[lang] || this.uiStrings.en;
  },

  // Initialize the Chatbot Widget in DOM
  init() {
    if (document.getElementById('mitraChatWidget')) return;
    this.injectMarkup();
    this.attachEvents();
    
    // Automatically peek the "Ask to MITRA" pill after 4 seconds to invite newcomers
    setTimeout(() => {
      if (!this.isOpen && !this.isPillVisible) {
        this.showPill();
      }
    }, 4000);
  },

  // Generate DOM markup
  injectMarkup() {
    const lang = this.getCurrentLang();
    const ui = this.getUI();

    const widget = document.createElement('div');
    widget.id = 'mitraChatWidget';
    widget.className = 'mitra-chat-widget';
    widget.innerHTML = `
      <!-- Sliding Trigger Component -->
      <div class="mitra-trigger-wrap" id="mitraTriggerWrap">
        <!-- Sliding Pill (Left of circular button) -->
        <button class="mitra-slide-pill" id="mitraSlidePill" aria-label="${ui.pillText}" onclick="MitraChatbot.openChat()">
          <span class="mitra-pill-sparkle">✨</span>
          <span class="mitra-pill-text" id="mitraPillText">${ui.pillText}</span>
          <span class="mitra-pill-arrow">→</span>
        </button>

        <!-- Circular Logo Button with Avatar Mascot -->
        <button class="mitra-logo-btn" id="mitraLogoBtn" aria-label="Toggle MITRA Assistant" onclick="MitraChatbot.handleLogoClick()" onmouseenter="MitraChatbot.showPill()">
          <div class="mitra-logo-inner">
            <img src="assets/mitra_mascot.png" alt="MITRA Mascot" class="mitra-logo-img">
          </div>
          <span class="mitra-online-pulse" title="MITRA Online"></span>
        </button>
      </div>

      <!-- Main Interactive Chat Window -->
      <div class="mitra-chat-window" id="mitraChatWindow" role="dialog" aria-label="MITRA Citizen AI Assistant">
        <!-- Header -->
        <div class="mitra-header">
          <div class="mitra-header-left">
            <div class="mitra-header-avatar">
              <img src="assets/mitra_mascot.png" alt="MITRA" class="mitra-avatar-img">
              <span class="mitra-header-dot"></span>
            </div>
            <div>
              <div class="mitra-header-title" id="mitraHeaderTitle">${ui.headerTitle}</div>
              <div class="mitra-header-sub" id="mitraHeaderSub">${ui.headerSub}</div>
            </div>
          </div>
          <div class="mitra-header-actions">
            <!-- In-Chat Quick Language Switcher -->
            <div class="mitra-lang-switch">
              <button class="mitra-lang-btn ${lang === 'mr' ? 'active' : ''}" onclick="MitraChatbot.switchLanguage('mr')" title="मराठी">मरा</button>
              <button class="mitra-lang-btn ${lang === 'hi' ? 'active' : ''}" onclick="MitraChatbot.switchLanguage('hi')" title="हिंदी">हिं</button>
              <button class="mitra-lang-btn ${lang === 'en' ? 'active' : ''}" onclick="MitraChatbot.switchLanguage('en')" title="English">EN</button>
            </div>
            <button class="mitra-btn-icon" onclick="MitraChatbot.clearChat()" title="${ui.clearTitle}" aria-label="${ui.clearTitle}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
            <button class="mitra-btn-icon" onclick="MitraChatbot.closeChat()" title="${ui.closeTitle}" aria-label="${ui.closeTitle}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div class="mitra-body" id="mitraChatBody">
          <div class="mitra-welcome-card" id="mitraWelcomeCard">
            <div class="mitra-welcome-row">
              <img src="assets/mitra_mascot.png" alt="MITRA Mascot" class="mitra-welcome-avatar">
              <div class="mitra-welcome-text-col">
                <div class="mitra-welcome-badge" id="mitraWelcomeBadge">${ui.welcomeBadge}</div>
                <div class="mitra-welcome-title" id="mitraWelcomeTitle">${ui.welcomeTitle}</div>
                <div class="mitra-welcome-desc" id="mitraWelcomeDesc">${ui.welcomeDesc}</div>
              </div>
            </div>
          </div>

          <!-- Quick Suggestion Chips -->
          <div class="mitra-suggestions-wrap">
            <div class="mitra-suggestions-title" id="mitraTopicsTitle">${ui.topicsTitle}</div>
            <div class="mitra-suggestions-grid" id="mitraSuggestionsGrid">
              ${this.renderChips(ui.chips)}
            </div>
          </div>

          <div id="mitraMessagesList" class="mitra-messages-list"></div>

          <!-- Typing Indicator -->
          <div class="mitra-typing" id="mitraTypingIndicator" style="display:none">
            <div class="mitra-typing-dot"></div>
            <div class="mitra-typing-dot"></div>
            <div class="mitra-typing-dot"></div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="mitra-footer">
          <form class="mitra-input-form" onsubmit="MitraChatbot.handleSubmit(event)">
            <input type="text" id="mitraInput" class="mitra-input" placeholder="${ui.placeholder}" autocomplete="off" maxlength="250">
            <button type="submit" class="mitra-send-btn" id="mitraSendBtn" aria-label="${ui.sendAria}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
          <div class="mitra-footer-note" id="mitraFooterNote">${ui.footerNote}</div>
        </div>
      </div>
    `;

    document.body.appendChild(widget);
  },

  renderChips(chips) {
    return chips.map(c => `
      <button class="mitra-chip" onclick="MitraChatbot.sendQuickPrompt('${c.query.replace(/'/g, "\\'")}')">${c.label}</button>
    `).join('');
  },

  // Called whenever the website or in-chat language changes
  onLanguageChange(lang) {
    const ui = this.uiStrings[lang] || this.uiStrings.en;

    // 1. Sliding pill text
    const pillText = document.getElementById('mitraPillText');
    if (pillText) pillText.textContent = ui.pillText;

    // 2. Chat header
    const title = document.getElementById('mitraHeaderTitle');
    const sub = document.getElementById('mitraHeaderSub');
    if (title) title.textContent = ui.headerTitle;
    if (sub) sub.textContent = ui.headerSub;

    // 3. Header language switcher buttons
    document.querySelectorAll('.mitra-lang-btn').forEach(btn => {
      const match = btn.getAttribute('onclick')?.includes(`'${lang}'`);
      btn.classList.toggle('active', !!match);
    });

    // 4. Welcome card
    const badge = document.getElementById('mitraWelcomeBadge');
    const wTitle = document.getElementById('mitraWelcomeTitle');
    const wDesc = document.getElementById('mitraWelcomeDesc');
    if (badge) badge.textContent = ui.welcomeBadge;
    if (wTitle) wTitle.textContent = ui.welcomeTitle;
    if (wDesc) wDesc.textContent = ui.welcomeDesc;

    // 5. Suggestion topics & chips
    const topicsTitle = document.getElementById('mitraTopicsTitle');
    const grid = document.getElementById('mitraSuggestionsGrid');
    if (topicsTitle) topicsTitle.textContent = ui.topicsTitle;
    if (grid) grid.innerHTML = this.renderChips(ui.chips);

    // 6. Input & footer
    const input = document.getElementById('mitraInput');
    const footerNote = document.getElementById('mitraFooterNote');
    if (input) input.placeholder = ui.placeholder;
    if (footerNote) footerNote.textContent = ui.footerNote;

    // 7. If there are active messages in the chat, append a friendly language switch announcement
    const list = document.getElementById('mitraMessagesList');
    if (list && list.children.length > 0) {
      this.appendNotice(ui.langSwitchNote);
    }
  },

  switchLanguage(lang) {
    if (typeof I18N !== 'undefined' && I18N.setLanguage) {
      I18N.setLanguage(lang);
    } else {
      this.onLanguageChange(lang);
    }
  },

  appendNotice(text) {
    const list = document.getElementById('mitraMessagesList');
    if (!list) return;
    const noticeDiv = document.createElement('div');
    noticeDiv.className = 'mitra-notice-msg';
    noticeDiv.textContent = text;
    list.appendChild(noticeDiv);

    const body = document.getElementById('mitraChatBody');
    if (body) body.scrollTop = body.scrollHeight;
  },

  attachEvents() {
    // Esc key closes chat
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
  },

  // Click on Circular Logo button
  handleLogoClick() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      if (!this.isPillVisible) {
        this.showPill();
      } else {
        this.openChat();
      }
    }
  },

  showPill() {
    this.isPillVisible = true;
    const pill = document.getElementById('mitraSlidePill');
    if (pill) {
      pill.classList.add('visible');
    }
  },

  hidePill() {
    this.isPillVisible = false;
    const pill = document.getElementById('mitraSlidePill');
    if (pill) {
      pill.classList.remove('visible');
    }
  },

  openChat() {
    this.isOpen = true;
    this.hidePill();
    const chatWin = document.getElementById('mitraChatWindow');
    const logoBtn = document.getElementById('mitraLogoBtn');
    if (chatWin) {
      chatWin.classList.add('open');
    }
    if (logoBtn) {
      logoBtn.classList.add('active');
    }
    setTimeout(() => {
      const input = document.getElementById('mitraInput');
      if (input) input.focus();
    }, 200);
  },

  closeChat() {
    this.isOpen = false;
    const chatWin = document.getElementById('mitraChatWindow');
    const logoBtn = document.getElementById('mitraLogoBtn');
    if (chatWin) {
      chatWin.classList.remove('open');
    }
    if (logoBtn) {
      logoBtn.classList.remove('active');
    }
    this.showPill();
  },

  clearChat() {
    this.messages = [];
    const list = document.getElementById('mitraMessagesList');
    if (list) list.innerHTML = '';
  },

  sendQuickPrompt(text) {
    const input = document.getElementById('mitraInput');
    if (input) {
      input.value = text;
      this.processMessage(text);
      input.value = '';
    }
  },

  handleSubmit(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('mitraInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    this.processMessage(text);
  },

  processMessage(userText) {
    // 1. Append User Message
    this.appendMessage('user', userText);

    // 2. Show Typing Indicator
    this.setTyping(true);

    // 3. Match Query against Knowledge Base
    const matched = this.matchKnowledge(userText);

    setTimeout(() => {
      this.setTyping(false);
      const lang = this.getCurrentLang();
      let reply = '';
      let action = null;

      if (matched) {
        reply = matched.response[lang] || matched.response['en'];
        action = matched.action || null;
      } else {
        reply = this.getFallbackResponse(userText);
      }

      this.appendMessage('bot', reply, action);
    }, 600);
  },

  matchKnowledge(query) {
    const cleanQuery = query.toLowerCase();
    for (const item of this.knowledge) {
      const isMatch = item.keywords.some(k => cleanQuery.includes(k.toLowerCase()));
      if (isMatch) {
        return item;
      }
    }
    return null;
  },

  appendMessage(sender, text, action = null) {
    const list = document.getElementById('mitraMessagesList');
    if (!list) return;

    const lang = this.getCurrentLang();
    const msgDiv = document.createElement('div');
    msgDiv.className = `mitra-msg ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

    const formattedText = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    let actionButtonHtml = '';
    if (action) {
      const actionLabel = typeof action.text === 'object' ? (action.text[lang] || action.text.en) : action.text;
      actionButtonHtml = `
        <div class="mitra-msg-action">
          <button class="mitra-action-btn" onclick="MitraChatbot.handleAction('${action.page}', '${action.cat || ''}')">
            ${actionLabel} →
          </button>
        </div>
      `;
    }

    let html = `
      <div class="mitra-msg-bubble">
        <div class="mitra-msg-text">${formattedText}</div>
        ${actionButtonHtml}
        <div class="mitra-msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    `;

    msgDiv.innerHTML = html;
    list.appendChild(msgDiv);

    // Scroll to bottom
    const body = document.getElementById('mitraChatBody');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  },

  handleAction(page, cat) {
    if (typeof navigateTo === 'function') {
      navigateTo(page);
      if (cat && typeof openServiceCategory === 'function') {
        setTimeout(() => {
          openServiceCategory(cat);
        }, 150);
      }
    }
    if (window.innerWidth <= 768) {
      this.closeChat();
    }
  },

  setTyping(typing) {
    this.isTyping = typing;
    const indicator = document.getElementById('mitraTypingIndicator');
    if (indicator) {
      indicator.style.display = typing ? 'flex' : 'none';
      if (typing) {
        const body = document.getElementById('mitraChatBody');
        if (body) body.scrollTop = body.scrollHeight;
      }
    }
  }
};

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MitraChatbot.init());
  } else {
    MitraChatbot.init();
  }
}
