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
    "keywords": [
      "hello",
      "hi",
      "hey",
      "namaste",
      "namaskar",
      "pranam",
      "shubh prabhat",
      "good morning",
      "good afternoon",
      "good evening",
      "नमस्ते",
      "नमस्कार",
      "शुभ प्रभात",
      "प्रणाम",
      "राम राम",
      "kasa ahes",
      "kashi ahes",
      "kese ho"
    ],
    "response": {
      "en": "🙏 **Namaste! I am MITRA — your official e-Samanvit Citizen AI Companion.**\nHow may I assist you today? You can ask me about:\n• 🎓 **Student Scholarships** (MahaDBT, NSP, Savitribai Phule)\n• 🌾 **Farmer Welfare & Subsidies** (PM-KISAN, Namo Shetkari, ₹1 Crop Insurance, Mandi Rates)\n• 👩‍👧 **Women Schemes** (Majhi Ladki Bahin ₹1,500, Kanya Bhagyashree)\n• 🏥 **Healthcare & Treatment** (MJPJAY ₹5 Lakh cashless, ABHA Card)\n• 📝 **How to apply online, documents needed, or track your application status!**",
      "hi": "🙏 **नमस्ते! मैं मित्रा (MITRA) हूँ — ई-समन्वित का आधिकारिक नागरिक एआई साथी।**\nमैं आपकी क्या सहायता कर सकता हूँ? आप मुझसे इनके बारे में पूछ सकते हैं:\n• 🎓 **विद्यार्थी छात्रवृत्तियां** (महाडीबीटी, एनएसपी, तकनीकी शिक्षा शुल्क माफी)\n• 🌾 **किसान कल्याण व अनुदान** (पीएम-किसान, नमो शेतकरी, ₹1 फसल बीमा, लाइव मंडी भाव)\n• 👩‍👧 **महिला कल्याण योजनाएं** (माझी लाडकी बहीण ₹1,500, कन्या भाग्यश्री)\n• 🏥 **स्वास्थ्य एवं मुफ्त इलाज** (महात्मा फुले जन आरोग्य ₹5 लाख कैशलेस, आभा कार्ड)\n• 📝 **ऑनलाइन आवेदन कैसे करें, आवश्यक कागजात, या आवेदन की लाइव स्थिति!**",
      "mr": "🙏 **नमस्कार! मी मित्रा (MITRA) — ई-समन्वितचा अधिकृत नागरिक AI सहाय्यक.**\nमी आपल्याला कशी मदत करू शकेन? आपण मला खालील विषयांवर विचारू शकता:\n• 🎓 **विद्यार्थी शिष्यवृत्ती** (महाडीबीटी, एनएसपी, सावित्रीबाई फुले शिष्यवृत्ती)\n• 🌾 **शेतकरी कल्याण व अनुदान** (पीएम-किसान, नमो शेतकरी, ₹1 पीक विमा, थेट बाजारभाव)\n• 👩‍👧 **महिला व बाल कल्याण** (माझी लाडकी बहीण ₹1,500, कन्या भाग्यश्री)\n• 🏥 **आरोग्य व मोफत उपचार** (महात्मा फुले जन आरोग्य ₹5 लाख कॅशलेस, आभा कार्ड)\n• 📝 **ऑनलाइन अर्ज कसा करावा, लागणारी कागदपत्रे किंवा अर्जाची सद्यस्थिती!**"
    },
    "action": {
      "text": {
        "en": "Explore All Services",
        "hi": "सभी सेवाएं देखें",
        "mr": "सर्व सेवा पहा"
      },
      "page": "services"
    }
  },
  {
    "keywords": [
      "thank",
      "thanks",
      "thank you",
      "dhanyawad",
      "dhanyavad",
      "aabhar",
      "shukriya",
      "धन्यवाद",
      "आभार",
      "शुक्रिया",
      "खूप खूप धन्यवाद",
      "thx"
    ],
    "response": {
      "en": "🌸 **You're most welcome!**\nI am always here 24x7 to assist every citizen of Maharashtra. If you need any more information about government schemes, documents, or subsidies, feel free to ask anytime!",
      "hi": "🌸 **आपका बहुत-बहुत स्वागत है!**\nमैं महाराष्ट्र के सभी नागरिकों की सहायता के लिए 24x7 उपलब्ध हूँ। यदि आपको सरकारी योजनाओं, दस्तावेजों या सब्सिडी से संबंधित कोई और जानकारी चाहिए, तो बेझिझक पूछें!",
      "mr": "🌸 **आपले मनःपूर्वक स्वागत आहे!**\nमहाराष्ट्रातील सर्व नागरिकांच्या सेवेसाठी मी २४ तास तत्पर आहे. शासकीय योजना, कागदपत्रे किंवा अनुदानाविषयी आणखी काही माहिती हवी असल्यास कधीही विचारा!"
    }
  },
  {
    "keywords": [
      "what is e-samanvit",
      "about e-samanvit",
      "esamanvit meaning",
      "e-samanvit portal",
      "what is esamanvit",
      "who created",
      "government portal",
      "ई-समन्वित काय आहे",
      "ई-समन्वित क्या है",
      "समन्वित म्हणजे काय",
      "समन्वित का अर्थ",
      "portal story"
    ],
    "response": {
      "en": "🏛️ **About e-Samanvit (Government of Maharashtra Initiative):**\n• **Meaning:** \"Integrated Digital Coordination\" (एकात्मिक डिजिटल समन्वय).\n• **Mission:** Interconnecting 15+ Maharashtra government departments (Agriculture, Higher Education, Revenue, Social Justice, Health, Women & Child, Food Supplies) into one single-window citizen gateway.\n• **Key Pillars:**\n  1. **Zero Middlemen:** Benefits disbursed directly via DBT to Aadhaar-linked accounts.\n  2. **100% Paperless:** Instant digital verification through MeriPehchaan SSO and DigiLocker.\n  3. **Real-time Tracking:** End-to-end transparent visibility with SMS updates for all 36 districts.",
      "hi": "🏛️ **ई-समन्वित पोर्टल के बारे में (महाराष्ट्र शासन की पहल):**\n• **अर्थ:** \"एकात्मिक डिजिटल समन्वय\" (Integrated Digital Coordination)।\n• **उद्देश्य:** महाराष्ट्र शासन के 15 से अधिक विभागों (कृषि, उच्च शिक्षा, राजस्व, सामाजिक न्याय, स्वास्थ्य, महिला व बाल, अन्न व नागरिक आपूर्ति) को एक ही डिजिटल मंच से जोड़ना।\n• **मुख्य विशेषताएं:**\n  1. **बिचौलियों से मुक्ति:** सरकारी लाभ सीधे डीबीटी द्वारा आधार लिंक बैंक खाते में।\n  2. **100% कागजरहित:** डिजिलॉकर और मेरी पहचान एसएसओ द्वारा त्वरित डिजिटल सत्यापन।\n  3. **लाइव ट्रैकिंग:** सभी 36 जिलों के लिए एसएमएस अलर्ट के साथ पारदर्शी निगरानी।",
      "mr": "🏛️ **ई-समन्वित पोर्टलबद्दल (महाराष्ट्र शासनाचा अधिकृत उपक्रम):**\n• **अर्थ:** \"एकात्मिक डिजिटल समन्वय\" (Integrated Digital Coordination).\n• **उद्देश:** महाराष्ट्र शासनाचे १५+ प्रमुख विभाग (कृषी, उच्च व तंत्रशिक्षण, महसूल, सामाजिक न्याय, आरोग्य, महिला व बालविकास, अन्न व नागरी पुरवठा) एकाच डिजिटल खिडकीद्वारे जोडणे.\n• **मुख्य वैशिष्ट्ये:**\n  1. **मध्यस्थांशिवाय सेवा:** सर्व शासकीय अनुदान थेट आधारसंलग्न बँक खात्यात (DBT).\n  2. **१००% कागदपत्रविरहित:** डिजीलॉकर व मेरी पहचानद्वारे झटपट पडताळणी.\n  3. **थेट ट्रॅकिंग:** राज्यातील सर्व ३६ जिल्ह्यांसाठी पारदर्शक व एसएमएस अलर्टसह सेवा."
    },
    "action": {
      "text": {
        "en": "Read Portal Story",
        "hi": "पोर्टल के बारे में पढ़ें",
        "mr": "पोर्टलबद्दल अधिक वाचा"
      },
      "page": "about"
    }
  },
  {
    "keywords": [
      "who are you",
      "who is mitra",
      "what can you do",
      "mitra assistant",
      "mitra ai",
      "tu kon ahes",
      "tum kaun ho",
      "तू कोण आहेस",
      "तुम कौन हो",
      "मित्रा म्हणजे काय",
      "मित्रा काय आहे",
      "ai companion"
    ],
    "response": {
      "en": "🤖 **Namaste! I am MITRA (Maharashtra Interoperable Tech Response Assistant):**\nI am your official AI Citizen Companion for the e-Samanvit platform.\n• **What can I do?**\n  1. Explain eligibility criteria and benefits for any Maharashtra government scheme.\n  2. Tell you the exact list of documents required before applying.\n  3. Guide you through the 3-step online application process.\n  4. Help you track your submitted application status in real-time.\n  5. Provide official toll-free helpline numbers and district office addresses.\n  6. Support you in Marathi, Hindi, and English fluently!",
      "hi": "🤖 **नमस्ते! मैं मित्रा (MITRA) हूँ — आधिकारिक नागरिक एआई साथी:**\nमैं ई-समन्वित पोर्टल पर नागरिकों के मार्गदर्शन हेतु महाराष्ट्र शासन द्वारा विकसित एआई सहायक हूँ।\n• **मैं आपकी क्या सहायता कर सकता हूँ?**\n  1. किसी भी सरकारी योजना की पात्रता और मिलने वाले लाभ की जानकारी।\n  2. आवेदन के लिए आवश्यक दस्तावेजों की सही सूची।\n  3. 3 आसान चरणों में ऑनलाइन आवेदन करने का तरीका।\n  4. आपके आवेदन की लाइव स्थिति (Track Status) जांचने में मदद।\n  5. आधिकारिक टोल-फ्री हेल्पलाइन और जिला कार्यालयों की जानकारी।\n  6. मराठी, हिंदी और अंग्रेजी में सहज संवाद!",
      "mr": "🤖 **नमस्कार! मी मित्रा (MITRA) — अधिकृत नागरिक AI सहाय्यक:**\nमी ई-समन्वित लोकसेवा व्यासपीठावर आपल्या सेवेसाठी महाराष्ट्र शासनाचा डिजिटल मित्र आहे.\n• **मी काय मदत करू शकतो?**\n  1. कोणत्याही शासकीय योजनेची पात्रता व मिळणारे लाभ समजावून सांगणे.\n  2. अर्जासाठी लागणाऱ्या आवश्यक कागदपत्रांची अचूक यादी देणे.\n  3. ३ सोप्या पायऱ्यांमध्ये ऑनलाइन अर्ज सादर करण्याचे मार्गदर्शन करणे.\n  4. सादर केलेल्या अर्जाची सद्यस्थिती (Track Status) तपासणे.\n  5. अधिकृत टोल-फ्री हेल्पलाइन व संपर्क क्रमांक देणे.\n  6. मराठी, हिंदी व इंग्रजीत संवाद साधणे!"
    }
  },
  {
    "keywords": [
      "how to apply",
      "online arj",
      "arj kasa karaycha",
      "steps",
      "procedure",
      "kaise apply kare",
      "form kasa bharaycha",
      "online arj kasa",
      "application process",
      "steps to apply",
      "online application",
      "how do i apply",
      "form kaise bhare",
      "arj kasa karava",
      "अर्ज कसा करावा",
      "आवेदन कैसे करें",
      "फॉर्म कसा भरायचा",
      "ऑनलाइन अर्ज प्रक्रिया",
      "apply online",
      "online form"
    ],
    "response": {
      "en": "📝 **How to Apply Online on e-Samanvit (3 Easy Steps):**\n1. **Choose Service:** Click on **Services** in the top navigation and select your citizen category (Students, Farmers, Women, Health, Seniors, Housing).\n2. **Authenticate & Auto-Fill:** Select your scheme and authenticate with your Aadhaar OTP. Your profile, income details, and education records will be auto-fetched from DigiLocker.\n3. **Submit & Download:** Review your details, submit the form, and get your instant **Application Reference ID** (e.g. `MGOV-2026-00123`) along with a digitally signed receipt.\n\n✨ **100% Free, Zero Paperwork, and No Physical Queues!**",
      "hi": "📝 **ई-समन्वित पर ऑनलाइन आवेदन कैसे करें (3 आसान चरण):**\n1. **सेवा चुनें:** शीर्ष मेनू से **Services** पर जाएं और अपनी नागरिक श्रेणी (विद्यार्थी, किसान, महिला, स्वास्थ्य, वरिष्ठ नागरिक, आवास) चुनें।\n2. **आधार सत्यापन:** संबंधित योजना चुनें और आधार ओटीपी द्वारा सत्यापन करें। आपके आय व शैक्षणिक दस्तावेज डिजिलॉकर से स्वतः प्राप्त हो जाएंगे।\n3. **सबमिट करें और रसीद लें:** विवरण जांचें, आवेदन सबमिट करें और तुरंत अपना **आवेदन संदर्भ क्रमांक (Application ID)** एवं डिजिटल रसीद प्राप्त करें।\n\n✨ **पूरी तरह मुफ्त, कागजरहित और कतार-मुक्त व्यवस्था!**",
      "mr": "📝 **ई-समन्वितवर ऑनलाइन अर्ज कसा करावा (3 सोप्या पायऱ्या):**\n1. **योजना निवडा:** मुख्य मेनूमधून **Services** विभागात जा आणि आपला संवर्ग निवडा (विद्यार्थी, शेतकरी, महिला, आरोग्य, ज्येष्ठ नागरिक, घरकुल).\n2. **आधार ओटीपी पडताळणी:** हवी ती योजना निवडून आधार ओटीपीने लॉगिन करा. आपले उत्पन्न व शैक्षणिक दाखले डिजीलॉकरमधून थेट उपलब्ध होतील.\n3. **अर्ज सादर करा:** माहिती तपासून सबमिट करा आणि तत्काळ आपला **अर्ज संदर्भ क्रमांक (Application ID)** व डिजिटल पावती मिळवा.\n\n✨ **१००% मोफत, कागदपत्रविरहित व घरबसल्या सोय!**"
    },
    "action": {
      "text": {
        "en": "Start Online Application",
        "hi": "ऑनलाइन आवेदन शुरू करें",
        "mr": "ऑनलाइन अर्ज सुरू करा"
      },
      "page": "services"
    }
  },
  {
    "keywords": [
      "fees",
      "fee",
      "cost",
      "charge",
      "free",
      "is it free",
      "how much fee",
      "paise lagtat ka",
      "kitne paise",
      "पैसे लागतात का",
      "फी किती आहे",
      "शुल्क",
      "फीस",
      "मुफ्त",
      "मोफत",
      "charhes",
      "free of cost"
    ],
    "response": {
      "en": "💰 **Application Fees & Portal Charges:**\n• **100% FREE OF COST:** The Government of Maharashtra charges **₹0 (Zero Fees)** for registering, applying for schemes, downloading certificates, or tracking status on e-Samanvit.\n• **Alert:** Never pay any fee or bribe to agents or third parties. All official welfare disbursements are deposited directly to your bank account with zero deduction.",
      "hi": "💰 **पोर्टल शुल्क एवं लागत की जानकारी:**\n• **100% बिल्कुल मुफ्त:** ई-समन्वित पोर्टल पर पंजीकरण, योजनाओं में आवेदन, प्रमाणपत्र डाउनलोड या स्टेटस चेक करने का कोई सरकारी शुल्क नहीं है (**₹0 फीस**)।\n• **सावधानी:** किसी भी दलाल या अनधिकृत व्यक्ति को पैसे न दें। सरकारी योजनाओं का लाभ सीधे आपके बैंक खाते में बिना किसी कटौती के आता है।",
      "mr": "💰 **अर्ज शुल्क व खर्चाबद्दल माहिती:**\n• **१००% पूर्णपणे मोफत:** ई-समन्वित पोर्टलवर नोंदणी, योजनांसाठी अर्ज करणे, दाखले डाउनलोड करणे किंवा स्थिती तपासण्यासाठी **कोणतेही शासकीय शुल्क आकारले जात नाही (₹० शुल्क)**.\n• **दक्षता सूचना:** कोणत्याही एजंट किंवा मध्यस्थाला पैसे देऊ नका. सर्व योजनांचे आर्थिक अनुदान थेट आपल्या बँक खात्यात विना कपात जमा होते."
    }
  },
  {
    "keywords": [
      "documents",
      "required docs",
      "what documents",
      "kagadpatre",
      "dastavej",
      "कागदपत्रे",
      "दस्तावेज",
      "कागदपत्रे कोणती लागतात",
      "दस्तावेज क्या चाहिए",
      "document list",
      "necessary documents"
    ],
    "response": {
      "en": "📄 **Key Documents Required for Welfare Schemes:**\nMost schemes on e-Samanvit require:\n1. **Aadhaar Card:** With active mobile number linked for instant OTP.\n2. **Income Certificate:** Issued by Tahsildar / Revenue Dept (valid for the current financial year).\n3. **Domicile Certificate:** Proof of 15+ years continuous residence in Maharashtra.\n4. **Bank Passbook:** Aadhaar-seeded bank account for Direct Benefit Transfer (DBT).\n5. **Scheme-Specific:**\n   • *Farmers:* 7/12 (Satbara) & 8A Land Extract\n   • *Students:* Previous exam marksheet & college admission receipt\n   • *Women / Ration:* Ration Card (Yellow/Orange)\n   • *Caste Beneficiaries:* Caste Certificate & Caste Validity Certificate",
      "hi": "📄 **सरकारी योजनाओं के लिए आवश्यक मुख्य दस्तावेज:**\nई-समन्वित पर योजनाओं के लिए सामान्यतः ये दस्तावेज आवश्यक हैं:\n1. **आधार कार्ड:** ओटीपी सत्यापन हेतु मोबाइल नंबर से लिंक होना जरूरी।\n2. **आय प्रमाण पत्र:** तहसीलदार / राजस्व विभाग द्वारा जारी (वर्तमान वित्तीय वर्ष का)।\n3. **अधिवास प्रमाण पत्र (Domicile):** महाराष्ट्र में 15 वर्ष के निवास का प्रमाण।\n4. **बैंक पासबुक:** डीबीटी भुगतान हेतु आधार से जुड़ा बैंक खाता।\n5. **योजना अनुसार विशेष दस्तावेज:**\n   • *किसान:* 7/12 (सातबारा) व 8A जमीन का उतारा\n   • *विद्यार्थी:* पिछली कक्षा की अंकतालिका व कॉलेज प्रवेश रसीद\n   • *महिला / राशन:* राशन कार्ड (पीला अथवा केसरी)\n   • *आरक्षित वर्ग:* जाति प्रमाण पत्र एवं जाति वैधता प्रमाण पत्र",
      "mr": "📄 **शासकीय योजनांसाठी लागणारी आवश्यक कागदपत्रे:**\nई-समन्वितवरील योजनांसाठी सामान्यतः खालील कागदपत्रे आवश्यक असतात:\n1. **आधार कार्ड:** ओटीपी पडताळणीसाठी मोबाईल नंबर संलग्न असणे आवश्यक.\n2. **उत्पन्न दाखला:** तहसीलदार / महसूल विभागाचा चालू आर्थिक वर्षाचा दाखला.\n3. **अधिवास प्रमाणपत्र (Domicile):** महाराष्ट्रातील १५ वर्षांच्या सलग वास्तव्याचा दाखला.\n4. **बँक पासबुक:** थेट डीबीटी अनुदानासाठी आधारसंलग्न बँक खाते.\n5. **योजनेनुसार विशेष कागदपत्रे:**\n   • *शेतकरी:* ७/१२ (सातबारा) व ८अ उतारा\n   • *विद्यार्थी:* गुणपत्रिका व चालू वर्षाची कॉलेज फी पावती\n   • *महिला / अन्न सुरक्षा:* पिवळे किंवा केशरी रेशन कार्ड\n   • *मागासवर्गीय घटक:* जात प्रमाणपत्र व जात वैधता प्रमाणपत्र"
    },
    "action": {
      "text": {
        "en": "View All Schemes & Docs",
        "hi": "योजनाएं व दस्तावेज देखें",
        "mr": "योजना व कागदपत्रे पहा"
      },
      "page": "services"
    }
  },
  {
    "keywords": [
      "track",
      "status",
      "application status",
      "where is my application",
      "reference number",
      "application id",
      "check status",
      "अर्जाची स्थिती",
      "स्टेटस",
      "आवेदन की स्थिति",
      "तपासा",
      "ट्रॅक",
      "arj kuthe ahe",
      "kasa check karaycha"
    ],
    "response": {
      "en": "🔍 **Track Your Application Live Status:**\nYou can track any submitted application in seconds:\n1. Click **My Applications** in the top navigation bar.\n2. Enter your 15-digit **Application Reference Number** (e.g. `MGOV-2026-00123`) or registered mobile number.\n3. Check the live milestone progress:\n   • **Step 1: Submitted** — Application logged in unified database.\n   • **Step 2: Scrutiny & Verification** — Verified with DigiLocker and field department.\n   • **Step 3: Approval** — Officer sanction order issued.\n   • **Step 4: Benefit Disbursed** — DBT deposited to bank account!\nAutomatic SMS alerts are also sent to your phone!",
      "hi": "🔍 **आवेदन की लाइव स्थिति (Track Application) कैसे जांचें:**\nआप कभी भी अपने आवेदन की स्थिति ऑनलाइन देख सकते हैं:\n1. शीर्ष मेनू से **My Applications** पर क्लिक करें।\n2. अपना **आवेदन संदर्भ क्रमांक (Application ID)** या पंजीकृत मोबाइल नंबर दर्ज करें।\n3. लाइव प्रगति देखें:\n   • **चरण 1: जमा (Submitted)** — आवेदन पोर्टल पर दर्ज हुआ।\n   • **चरण 2: विभागीय जांच (Verification)** — डिजिलॉकर व संबंधित विभाग द्वारा सत्यापन जारी।\n   • **चरण 3: स्वीकृति (Approved)** — मंजूरी आदेश जारी।\n   • **चरण 4: लाभ वितरण (DBT Disbursed)** — राशि सीधे बैंक खाते में जमा!\nप्रत्येक चरण पर मोबाइल पर एसएमएस भी भेजा जाता है!",
      "mr": "🔍 **अर्जाची सद्यस्थिती (Track Status) कशी तपासावी:**\nआपण आपल्या अर्जाची स्थिती काही सेकंदात ऑनलाइन तपासू शकता:\n1. वरील मेनूमधून **My Applications** पर्यायावर क्लिक करा.\n2. आपला **अर्ज संदर्भ क्रमांक (Application ID)** किंवा नोंदणीकृत मोबाईल नंबर प्रविष्ट करा.\n3. थेट प्रगती तपासा:\n   • **टप्पा १: अर्ज सादर (Submitted)** — अर्ज पोर्टलवर यशस्वीरीत्या नोंदवला गेला.\n   • **टप्पा २: विभागीय छाननी (Verification)** — कागदपत्रे व महसूल तपासणी सुरू.\n   • **टप्पा ३: मंजुरी (Approved)** — सक्षम अधिकाऱ्यांकडून मंजुरी आदेश निर्गमित.\n   • **टप्पा ४: लाभ जमा (Benefit Disbursed)** — थेट बँक खात्यात अनुदान जमा!\nआपल्या मोबाईलवर प्रत्येक टप्प्याचा एसएमएसही येतो!"
    },
    "action": {
      "text": {
        "en": "Open My Applications",
        "hi": "आवेदन स्थिति देखें",
        "mr": "अर्जांची स्थिती तपासा"
      },
      "page": "my-applications"
    }
  },
  {
    "keywords": [
      "department verification",
      "status meaning",
      "under verification",
      "approved status",
      "benefit disbursed",
      "छाननी चालू",
      "पडताळणी",
      "मंजूर",
      "स्टेटसचा अर्थ",
      "status ka matlab"
    ],
    "response": {
      "en": "📋 **Understanding Your Application Status Stages:**\n• **Submitted:** Your application has been received and queued for automatic API verification with DigiLocker and Revenue records.\n• **Department Verification:** The local Tahsildar, Taluka Agriculture Officer, or Education Inspector is reviewing the uploaded information. Standard time: 7–12 working days.\n• **Approved:** Your application meets all government criteria. Sanction letter has been generated.\n• **Benefit Disbursed:** The DBT payment has been transferred to your Aadhaar-linked bank account, or your digitally signed certificate is ready to download!",
      "hi": "📋 **आवेदन स्थिति (Status) के विभिन्न चरणों का अर्थ:**\n• **जमा (Submitted):** आपका आवेदन प्राप्त हो चुका है और स्वतः सत्यापन प्रक्रिया में है।\n• **विभागीय जांच (Department Verification):** संबंधित तालुका अधिकारी (तहसीलदार/कृषि/शिक्षा अधिकारी) द्वारा दस्तावेजों की जांच की जा रही है। सामान्य समय: 7-12 कार्यदिवस।\n• **स्वीकृत (Approved):** सभी मानदंड पूरे होने पर आवेदन को आधिकारिक स्वीकृति मिल चुकी है।\n• **लाभ वितरित (Benefit Disbursed):** डीबीटी राशि सीधे आपके बैंक खाते में भेज दी गई है या डिजिटल प्रमाणपत्र डाउनलोड के लिए तैयार है!",
      "mr": "📋 **अर्जाच्या विविध टप्प्यांचा (Status) अर्थ:**\n• **अर्ज सादर (Submitted):** आपला अर्ज प्राप्त झाला असून संगणकीय पडताळणी सुरू आहे.\n• **विभागीय छाननी (Department Verification):** स्थानिक तहसीलदार, कृषी अधिकारी किंवा शिक्षण विभागाकडून कागदपत्रांची तपासणी सुरू आहे. कालावधी: ७ ते १२ दिवस.\n• **मंजूर (Approved):** सर्व निकष पूर्ण झाल्याने अर्जास अधिकृत शासकीय मंजुरी मिळाली आहे.\n• **लाभ जमा (Benefit Disbursed):** डीबीटीद्वारे अनुदान थेट बँक खात्यात वर्ग झाले आहे किंवा डिजिटल दाखला डाउनलोडसाठी उपलब्ध आहे!"
    }
  },
  {
    "keywords": [
      "dbt",
      "bank transfer",
      "pfms",
      "direct benefit transfer",
      "bank account",
      "money in account",
      "aadhaar bank link",
      "थेट बँक हस्तांतरण",
      "डीबीटी",
      "बँक खाते",
      "पैसे कधी जमा होणार",
      "dbt link",
      "npci mapping",
      "paise account me kab"
    ],
    "response": {
      "en": "🏦 **Direct Benefit Transfer (DBT) & Aadhaar Bank Seeding:**\n• **How it works:** All financial benefits (PM-KISAN, Ladki Bahin ₹1,500, Scholarships) are credited through the Public Financial Management System (PFMS) directly into your Aadhaar-linked bank account.\n• **Important Requirement:** Your bank account **MUST be seeded with Aadhaar** in the NPCI mapper.\n• **How to check Aadhaar Seeding?**\n  1. Visit your bank branch and request \"Aadhaar Seeding for DBT\".\n  2. Or check online on the UIDAI resident portal under \"Bank Seeding Status\".\n  3. Ensure SMS banking is active to receive deposit alerts instantly.",
      "hi": "🏦 **प्रत्यक्ष लाभ अंतरण (DBT) एवं आधार बैंक सीडिंग:**\n• **प्रक्रिया:** सभी वित्तीय लाभ (पीएम-किसान, लाडकी बहीण ₹1,500, छात्रवृत्ति) पीएफएमएस द्वारा सीधे आपके आधार-सीडेड बैंक खाते में ट्रांसफर किए जाते हैं।\n• **अनिवार्य शर्त:** आपका बैंक खाता भारतीय राष्ट्रीय भुगतान निगम (NPCI) में **आधार से लिंक (Seeded)** होना चाहिए।\n• **सीडिंग कैसे जांचें व कराएं?**\n  1. अपनी बैंक शाखा में जाकर 'Aadhaar DBT Seeding Form' भरें।\n  2. या यूआईडीएआई (UIDAI) की वेबसाइट पर 'Check Aadhaar Bank Seeding Status' देखें।\n  3. पैसे जमा होने की सूचना तुरंत आपके मोबाइल पर एसएमएस से मिलती है।",
      "mr": "🏦 **थेट बँक हस्तांतरण (DBT) व आधार बँक संलग्नता:**\n• **कार्यपद्धती:** सर्व शासकीय अनुदाने (पीएम-किसान, लाडकी बहीण ₹1,500, शिष्यवृत्ती) पीएफएमएस प्रणालीद्वारे थेट आपल्या आधारसंलग्न बँक खात्यात जमा होतात.\n• **महत्त्वाची अट:** आपले बँक खाते एनपीसीआय (NPCI) मॅपरवर **आधारशी जोडलेले (Seeded)** असणे बंधनकारक आहे.\n• **आधार सीडिंग कसे तपासावे व करावे?**\n  1. आपल्या बँकेत जाऊन 'आधार डीबीटी सीडिंग'चा अर्ज सादर करा.\n  2. किंवा UIDAI पोर्टलवर 'Bank Seeding Status' तपासा.\n  3. खात्यात रक्कम जमा होताच आपल्या मोबाईलवर एसएमएस संदेश येतो."
    }
  },
  {
    "keywords": [
      "aadhaar",
      "uidai",
      "aadhaar otp",
      "without aadhaar",
      "aadhaar mandatory",
      "आधार कार्ड",
      "ओटीपी",
      "आधार लिंक",
      "aadhaar card compulsory"
    ],
    "response": {
      "en": "🆔 **Aadhaar Verification on e-Samanvit:**\n• **Why Aadhaar?** To ensure secure, fraud-free delivery of benefits directly to genuine citizens without paper proofs or forgery.\n• **Instant OTP:** You receive an OTP on the mobile number linked with your Aadhaar. Entering the OTP verifies your identity in under 5 seconds.\n• **Mobile not linked?** Please visit your nearest Post Office or Aadhaar Seva Kendra to link your active mobile number.",
      "hi": "🆔 **ई-समन्वित पर आधार सत्यापन की जानकारी:**\n• **आधार क्यों जरूरी है?** पात्र नागरिकों को बिना किसी फर्जीवाड़े और बिना कागजी झंझट के सीधे सरकारी लाभ देने के लिए आधार सत्यापन आवश्यक है।\n• **त्वरित ओटीपी:** आपके आधार से जुड़े मोबाइल पर 6 अंकों का ओटीपी आता है, जिससे 5 सेकंड में पहचान सत्यापित हो जाती है।\n• **मोबाइल लिंक नहीं है?** कृपया अपने नजदीकी डाकघर या आधार सेवा केंद्र जाकर अपना वर्तमान मोबाइल नंबर लिंक करवाएं।",
      "mr": "🆔 **ई-समन्वित पोर्टलवर आधार पडताळणी:**\n• **आधार का आवश्यक?** कोणत्याही मध्यस्थांशिवाय व बोगसगिरी न होता खऱ्या पात्र लाभार्थ्याला थेट लाभ मिळण्यासाठी आधार अनिवार्य आहे.\n• **झटपट ओटीपी:** आपल्या आधारशी संलग्न मोबाईलवर ६ अंकी ओटीपी येतो, ज्याद्वारे ५ सेकंदात डिजिटल ओळख सिद्ध होते.\n• **मोबाईल लिंक नसेल तर?** जवळच्या पोस्ट ऑफिस किंवा आधार सेवा केंद्रात जाऊन आपला चालू मोबाईल नंबर आधारशी त्वरित लिंक करून घ्या."
    }
  },
  {
    "keywords": [
      "digilocker",
      "document vault",
      "auto fetch",
      "digi locker",
      "डिजीलॉकर",
      "कागदपत्रे अपलोड",
      "digilocker account"
    ],
    "response": {
      "en": "📂 **DigiLocker Integration on e-Samanvit:**\n• **Paperless Convenience:** e-Samanvit connects directly with the National DigiLocker Document Vault (Government of India).\n• **Auto-Fetch:** Your 10th/12th marksheets, caste certificate, domicile, and driving license are pulled automatically using your consent — you don't need to physically scan or photocopy documents!\n• All fetched documents bear a valid digital signature recognized across all Maharashtra government departments.",
      "hi": "📂 **डिजिलॉकर (DigiLocker) की सुविधा:**\n• **कागजरहित सुविधा:** ई-समन्वित पोर्टल राष्ट्रीय डिजिलॉकर से सीधे जुड़ा हुआ है।\n• **स्वतः दस्तावेज प्राप्ति:** आपकी सहमति से अंकतालिका, जाति प्रमाण पत्र, डोमिसाइल और ड्राइविंग लाइसेंस सीधे सरकारी रिकॉर्ड से फेच हो जाते हैं — फोटोकॉपी या स्कैनिंग की कोई जरूरत नहीं!\n• डिजिलॉकर के डिजिटल हस्ताक्षरित दस्तावेज सभी सरकारी कार्यों में 100% मान्य हैं।",
      "mr": "📂 **डिजीलॉकर (DigiLocker) सुविधा:**\n• **कागदपत्रविरहित कारभार:** ई-समन्वित पोर्टल राष्ट्रीय डिजीलॉकर यंत्रणेशी थेट जोडलेले आहे.\n• **थेट कागदपत्रे उपलब्ध:** आपल्या संमतीने गुणपत्रिका, जात दाखला, अधिवास प्रमाणपत्र थेट उपलब्ध होतात — झेरॉक्स किंवा स्कॅनिंग करण्याची आवश्यकता नाही!\n• डिजीलॉकरवरील डिजिटल स्वाक्षरी असलेले सर्व दाखले शासकीय कामांसाठी पूर्णतः वैध मानले जातात."
    }
  },
  {
    "keywords": [
      "scholarship",
      "student",
      "college",
      "school",
      "post matric",
      "mahadbt scholarship",
      "nsp",
      "shikshan",
      "विद्यार्थी",
      "शिष्यवृत्ती",
      "छात्रवृत्ति",
      "शाळा",
      "महाविद्यालय",
      "study",
      "education grant"
    ],
    "response": {
      "en": "🎓 **Student Scholarships & Education Services:**\ne-Samanvit integrates all major state and national educational welfare programs:\n• **MahaDBT Post-Matric Scholarship:** Full tuition fee reimbursement & maintenance allowance for SC, ST, VJNT, OBC, SEBC, and EWS college students.\n• **Technical Education Fee Waiver (DTE):** Fee concession for Engineering, Polytechnic, Pharmacy, and MBA professional courses.\n• **Savitribai Phule Scheme:** Financial assistance for girl students to promote higher education.\n• **National Scholarship Portal (NSP):** Central merit and minority scholarships.\n\n**Required Docs:** Aadhaar, Income Certificate (< ₹2.5–8 Lakhs), Caste Certificate (if applicable), Marksheet, and Domicile.",
      "hi": "🎓 **विद्यार्थी छात्रवृत्तियां एवं शिक्षा सेवाएं:**\nई-समन्वित पर महाराष्ट्र के छात्रों के लिए प्रमुख छात्रवृत्तियां उपलब्ध हैं:\n• **महाडीबीटी मैट्रिकोत्तर छात्रवृत्ति:** एससी, एसटी, ओबीसी, एसईबीसी और ईडब्ल्यूएस छात्रों के लिए ट्यूशन फीस एवं निर्वाह भत्ता।\n• **तकनीकी शिक्षा शुल्क माफी (DTE):** इंजीनियरिंग, पॉलिटेक्निक, फार्मेसी और एमबीए के लिए शुल्क प्रतिपूर्ति।\n• **सावित्रीबाई फुले योजना:** बालिकाओं की उच्च शिक्षा हेतु विशेष वित्तीय अनुदान।\n• **नेशनल स्कॉलरशिप पोर्टल (NSP):** केंद्र सरकार की मेरिट एवं अल्पसंख्यक छात्रवृत्तियां।\n\n**दस्तावेज:** आधार, आय प्रमाण पत्र (< ₹2.5-8 लाख), जाति प्रमाण पत्र (यदि लागू हो), अंकतालिका, डोमिसाइल।",
      "mr": "🎓 **विद्यार्थी शिष्यवृत्ती व शैक्षणिक लोकसेवा:**\nई-समन्वित पोर्टलवर राज्यातील विद्यार्थ्यांसाठी सर्व प्रमुख योजना उपलब्ध आहेत:\n• **महाडीबीटी मॅट्रिकोत्तर शिष्यवृत्ती:** SC, ST, VJNT, OBC, SEBC व EWS विद्यार्थ्यांसाठी संपूर्ण शिक्षण शुल्क व निर्वाह भत्ता थेट बँक खात्यात.\n• **तंत्रशिक्षण शुल्क सवलत (DTE):** इंजिनिअरिंग, पॉलिटेक्निक, फार्मसी व व्यवस्थापन अभ्यासक्रमांसाठी शुल्क प्रतिपूर्ती.\n• **सावित्रीबाई फुले शिष्यवृत्ती:** विद्यार्थिनींच्या उच्च शिक्षणासाठी विशेष आर्थिक सहाय्य.\n• **नॅशनल स्कॉलरशिप पोर्टल (NSP):** केंद्र शासनाच्या गुणवत्ता शिष्यवृत्ती.\n\n**कागदपत्रे:** आधार कार्ड, उत्पन्न दाखला, जात प्रमाणपत्र (लागू असल्यास), गुणपत्रिका व अधिवास प्रमाणपत्र."
    },
    "action": {
      "text": {
        "en": "View Student Schemes",
        "hi": "विद्यार्थी योजनाएं देखें",
        "mr": "विद्यार्थी योजना पहा"
      },
      "page": "services",
      "cat": "students"
    }
  },
  {
    "keywords": [
      "fee waiver",
      "technical education",
      "engineering fee",
      "polytechnic fee",
      "dte",
      "फी माफी",
      "तंत्रशिक्षण शुल्क सवलत",
      "college fee discount",
      "ebc fee concession"
    ],
    "response": {
      "en": "🏫 **Technical Education Fee Waiver (DTE / MahaDBT):**\n• **Eligibility:** Students admitted to government or approved private Engineering, Polytechnic, Pharmacy, Architecture, and Hotel Management colleges in Maharashtra.\n• **Benefit:** 50% to 100% reimbursement of tuition and examination fees.\n• **Income Limit:** Annual family income must be under ₹8,00,000 for EBC and under ₹2,50,000 for reserved categories.\n• **Verification:** Verified directly via DTE Merit CAP round admission data and Revenue Department income records.",
      "hi": "🏫 **तकनीकी शिक्षा शुल्क प्रतिपूर्ति (DTE / MahaDBT):**\n• **पात्रता:** महाराष्ट्र के इंजीनियरिंग, पॉलिटेक्निक, फार्मेसी एवं अन्य तकनीकी पाठ्यक्रमों में कैपरउंड (CAP) से प्रवेश लेने वाले छात्र।\n• **लाभ:** 50% से 100% तक शिक्षण एवं परीक्षा शुल्क की सरकारी प्रतिपूर्ति।\n• **आय सीमा:** ईबीसी छात्रों के लिए परिवार की वार्षिक आय ₹8 लाख तक तथा आरक्षित वर्ग के लिए ₹2.5 लाख तक।\n• **सत्यापन:** डीटीई प्रवेश रिकॉर्ड और राजस्व विभाग के आय प्रमाण पत्र द्वारा सीधा ऑनलाइन सत्यापन।",
      "mr": "🏫 **उच्च व तंत्रशिक्षण शुल्क सवलत (DTE / MahaDBT):**\n• **पात्रता:** महाराष्ट्रातील इंजिनिअरिंग, पॉलिटेक्निक, फार्मसी, एमबीए अभ्यासक्रमात कॅप (CAP) राउंडद्वारे प्रवेश घेतलेले विद्यार्थी.\n• **मिळणारा लाभ:** ५०% ते १००% पर्यंत शैक्षणिक व परीक्षा शुल्काची शासकीय प्रतिपूर्ती.\n• **उत्पन्न मर्यादा:** ईबीसी घटकांसाठी वार्षिक उत्पन्न ₹८ लाखांपर्यंत, तर मागासवर्गीय प्रवर्गासाठी ₹२.५ लाखांपर्यंत.\n• **पडताळणी:** डीटीई प्रवेश डेटा व महसूल विभागाच्या उत्पन्न दाखल्याद्वारे थेट ऑनलाइन छाननी."
    },
    "action": {
      "text": {
        "en": "Check Tech Education Schemes",
        "hi": "तकनीकी शिक्षा योजना देखें",
        "mr": "तंत्रशिक्षण सवलत पहा"
      },
      "page": "services",
      "cat": "students"
    }
  },
  {
    "keywords": [
      "savitribai phule",
      "girl scholarship",
      "mulinchi shishyavruti",
      "सावित्रीबाई फुले",
      "मुलींची शिष्यवृत्ती",
      "balika scholarship"
    ],
    "response": {
      "en": "👩‍🎓 **Krantijyoti Savitribai Phule Girl Student Scholarship:**\n• **Objective:** Eliminating female dropouts and supporting girl students from 5th standard to higher secondary education across Maharashtra.\n• **Benefit:** Monthly educational stipend disbursed directly to the mother/parent's bank account.\n• **Documents:** School bonafide certificate, previous year marksheet, and Aadhaar card.",
      "hi": "👩‍🎓 **क्रांतिज्योति सावित्रीबाई फुले बालिका छात्रवृत्ति:**\n• **उद्देश्य:** बालिकाओं में शिक्षा को बढ़ावा देना और स्कूल छोड़ने की दर को शून्य करना।\n• **लाभ:** कक्षा 5वीं से 10वीं एवं उच्च माध्यमिक स्तर तक अध्ययनरत छात्राओं को मासिक वित्तीय सहायता।\n• **दस्तावेज:** स्कूल बोनाफाइड प्रमाणपत्र, अंकतालिका और आधार कार्ड।",
      "mr": "👩‍🎓 **क्रांतिज्योती सावित्रीबाई फुले विद्यार्थिनी शिष्यवृत्ती:**\n• **उद्देश:** राज्यातील मुलींचे शिक्षण अखंड चालू राहावे व शाळा गळतीचे प्रमाण रोखणे.\n• **लाभ:** इयत्ता ५ वी ते १० वी व उच्च माध्यमिक शिक्षणातील विद्यार्थिनींना थेट शैक्षणिक आर्थिक सहाय्य.\n• **कागदपत्रे:** शाळेचा बोनाफाइड दाखला, मागील वर्षाची गुणपत्रिका आणि आधार कार्ड."
    },
    "action": {
      "text": {
        "en": "Explore Student Schemes",
        "hi": "विद्यार्थी योजनाएं देखें",
        "mr": "विद्यार्थी योजना पहा"
      },
      "page": "services",
      "cat": "students"
    }
  },
  {
    "keywords": [
      "library",
      "e-library",
      "ncert",
      "study material",
      "books",
      "question papers",
      "पुस्तके",
      "अभ्यास",
      "ई-लायब्ररी",
      "प्रश्नपत्रिका",
      "download books",
      "mpsc preparation"
    ],
    "response": {
      "en": "📚 **Digital E-Library & Learning Repository:**\nUnder the **Resources** section, students can freely access:\n• **NCERT & Balbharati E-Textbooks:** Classes 1st to 12th in Marathi, Hindi, and English.\n• **Board Model Question Papers:** SSC (10th) and HSC (12th) previous years solved papers.\n• **Competitive Exam Handbooks:** Study modules for MPSC, Police Bharti, and Talathi exams.\n• **Skill India Learning Catalog:** Free digital certifications in programming, AI basics, and accounting.",
      "hi": "📚 **डिजिटल ई-लाइब्रेरी एवं अध्ययन सामग्री:**\nपोर्टल के **Resources** पृष्ठ पर छात्र मुफ्त में अध्ययन सामग्री प्राप्त कर सकते हैं:\n• **एनसीईआरटी एवं बालभारती पुस्तकें:** कक्षा 1 से 12 तक मराठी, हिंदी और अंग्रेजी में।\n• **बोर्ड मॉडल प्रश्न पत्र:** 10वीं और 12वीं के पिछले वर्षों के हल किए गए पेपर।\n• **प्रतियोगी परीक्षा मार्गदर्शिका:** एमपीएससी, पुलिस भर्ती और तलाठी परीक्षा के स्टडी मॉड्यूल।\n• **स्किल इंडिया डिजिटल पाठ्यक्रम:** कंप्यूटर, प्रोग्रामिंग व रोजगारोन्मुखी मुफ्त कोर्सेज।",
      "mr": "📚 **डिजिटल ई-लायब्ररी व अभ्यास साहित्य:**\nपोर्टलच्या **Resources** विभागात विद्यार्थ्यांसाठी मोफत उपलब्ध:\n• **बालभारती व NCERT ई-पुस्तके:** पहिली ते बारावीपर्यंत मराठी, हिंदी व इंग्रजी माध्यमात.\n• **बोर्ड प्रश्नपत्रिका संच:** १० वी व १२ वीच्या मागील वर्षांच्या सोडवलेल्या प्रश्नपत्रिका.\n• **स्पर्धा परीक्षा मार्गदर्शिका:** MPSC, पोलीस भरती व तलाठी भरतीसाठी अभ्यास साहित्य.\n• **स्किल इंडिया डिजिटल कोर्सेस:** कोडिंग, संगणक साक्षरता व मोफत प्रमाणपत्र कोर्सेस."
    },
    "action": {
      "text": {
        "en": "Open Resources & Books",
        "hi": "संसाधन व पुस्तकें देखें",
        "mr": "अभ्यास साहित्य डाउनलोड करा"
      },
      "page": "resources"
    }
  },
  {
    "keywords": [
      "farmer",
      "kisan",
      "shetkari",
      "krishi",
      "agriculture",
      "शेती",
      "शेतकरी",
      "किसान",
      "कृषी",
      "farming services",
      "shetkari sahayya"
    ],
    "response": {
      "en": "🌾 **Agriculture & Farmer Welfare Services:**\ne-Samanvit is dedicated to empowering Maharashtra's farming community:\n• **PM-KISAN & Namo Shetkari:** Combined ₹12,000 yearly financial subsidy directly into your bank account.\n• **PMFBY ₹1 Crop Insurance:** Comprehensive weather and crop damage compensation.\n• **Kisan Credit Card (KCC):** Low-interest farm loans at an effective 4% annual rate.\n• **Drip Irrigation Subsidy:** Up to 80% grant on micro-irrigation systems through MahaDBT Krishi.\n• **Live APMC Mandi Rates:** Transparent daily commodity auction prices across all state mandis.\n• **Soil Health Card:** Free nutrient testing at Taluka Krishi Bhavans.",
      "hi": "🌾 **कृषि एवं किसान कल्याण सेवाएं:**\nई-समन्वित महाराष्ट्र के किसानों के लिए समर्पित डिजिटल केंद्र है:\n• **पीएम-किसान व नमो शेतकरी महासन्मान:** प्रतिवर्ष कुल ₹12,000 का सीधा वित्तीय लाभ।\n• **एक रुपया पीक विमा (PMFBY):** मौसम व प्राकृतिक आपदा से फसल सुरक्षा।\n• **किसान क्रेडिट कार्ड (KCC):** मात्र 4% प्रभावी वार्षिक ब्याज पर आसान कृषि ऋण।\n• **ठिबक सिंचन अनुदान:** महाडीबीटी कृषी द्वारा सूक्ष्म सिंचाई पर 80% तक की सब्सिडी।\n• **लाइव मंडी भाव:** राज्य की सभी एपीएमसी मंडियों के पारदर्शी दैनिक बाजार भाव।\n• **मृदा स्वास्थ्य कार्ड:** तालुका कृषि कार्यालयों में मुफ्त मिट्टी परीक्षण।",
      "mr": "🌾 **कृषी व शेतकरी कल्याण सेवा:**\nई-समन्वित पोर्टल महाराष्ट्रातील बळीराजासाठी सर्वसमावेशक सेवा देते:\n• **पीएम-किसान व नमो शेतकरी योजना:** वर्षाला एकूण ₹१२,००० थेट बँक खात्यात.\n• **१ रुपयात पीक विमा योजना (PMFBY):** हवामान व नैसर्गिक आपत्तीपासून पिकांना पूर्ण संरक्षण.\n• **किसान क्रेडिट कार्ड (KCC):** अवघ्या ४% व्याजदराने सुलभ अल्पमुदत पीक कर्ज.\n• **ठिबक सिंचन अनुदान:** महाडीबीटी कृषीद्वारे सूक्ष्म सिंचनावर ८०% पर्यंत भरघोस अनुदान.\n• **थेट कृषी बाजारभाव:** राज्यातील सर्व प्रमुख बाजार समित्यांचे ताजे शेतीमाल भाव.\n• **माती परीक्षण (Soil Health):** तालुका कृषी भवनात मोफत माती तपासणी व खत शिफारसी."
    },
    "action": {
      "text": {
        "en": "View Farmer Schemes",
        "hi": "किसान योजनाएं देखें",
        "mr": "शेतकरी योजना पहा"
      },
      "page": "services",
      "cat": "farmers"
    }
  },
  {
    "keywords": [
      "pm kisan",
      "pm-kisan",
      "6000",
      "kisan samman nidhi",
      "2000 installment",
      "पीएम किसान",
      "सन्मान निधी",
      "pm kisan installment",
      "pm kisan status"
    ],
    "response": {
      "en": "🌾 **PM-KISAN Samman Nidhi (Central Scheme):**\n• **Benefit:** ₹6,000 per year transferred directly to the bank account of landholder farmer families in 3 installments of ₹2,000 every 4 months.\n• **Eligibility:** Farmer families holding cultivable land verified on the 7/12 extract.\n• **Mandatory:** Aadhaar e-KYC must be completed, and bank account must be seeded in NPCI.",
      "hi": "🌾 **पीएम-किसान सम्मान निधि (केंद्र सरकार की योजना):**\n• **लाभ:** किसान परिवारों को प्रतिवर्ष ₹6,000 की वित्तीय सहायता, जो ₹2,000 की 3 किश्तों में हर 4 महीने पर सीधे बैंक खाते में जमा होती है।\n• **पात्रता:** 7/12 भूलेख में दर्ज कृषि योग्य भूमिधारक किसान परिवार।\n• **अनिवार्य:** आधार ई-केवाईसी पूर्ण होना और बैंक खाता एनपीसीआई में आधार से जुड़ा होना चाहिए।",
      "mr": "🌾 **पीएम-किसान सन्मान निधी (केंद्रीय योजना):**\n• **मिळणारा लाभ:** वर्षाला ₹६,००० चे अनुदान, जे दर चार महिन्यांनी ₹२,००० च्या ३ हप्त्यांमध्ये थेट बँक खात्यात जमा होते.\n• **पात्रता:** सातबारा उताऱ्यावर नोंद असणारे सर्व शेतकरी कुटुंब.\n• **महत्त्वाचे:** आधार ई-केवायसी पूर्ण असणे व बँक खाते एनपीसीआयवर सीड असणे बंधनकारक आहे."
    },
    "action": {
      "text": {
        "en": "Check Farmer Schemes",
        "hi": "किसान योजनाएं देखें",
        "mr": "शेतकरी योजना तपासा"
      },
      "page": "services",
      "cat": "farmers"
    }
  },
  {
    "keywords": [
      "namo shetkari",
      "namo kisan",
      "maharashtra 6000",
      "नमो शेतकरी",
      "महा सन्मान निधी",
      "namo shetkari kiti ahe",
      "state farmer grant"
    ],
    "response": {
      "en": "🌱 **Namo Shetkari Mahasanman Nidhi (Maharashtra State Scheme):**\n• **Benefit:** Maharashtra Government provides an **additional ₹6,000 per year** (in 3 installments of ₹2,000) over and above the Central PM-KISAN scheme.\n• **Total Farmer Support:** Beneficiary farmers in Maharashtra receive a grand total of **₹12,000 every year** (₹6,000 Central + ₹6,000 State).\n• **Eligibility:** All farmers who are active beneficiaries of PM-KISAN in Maharashtra are automatically eligible.",
      "hi": "🌱 **नमो शेतकरी महासन्मान निधी (महाराष्ट्र शासन योजना):**\n• **लाभ:** महाराष्ट्र सरकार द्वारा केंद्र की पीएम-किसान योजना के अतिरिक्त **₹6,000 प्रतिवर्ष** (₹2,000 की 3 किश्तों में) दिया जाता है।\n• **कुल लाभ:** महाराष्ट्र के किसानों को प्रतिवर्ष कुल **₹12,000** की सम्मान निधि प्राप्त होती है (₹6,000 केंद्र + ₹6,000 राज्य)।\n• **पात्रता:** पीएम-किसान के सभी सक्रिय लाभार्थी किसान स्वतः इस योजना के पात्र हैं।",
      "mr": "🌱 **नमो शेतकरी महासन्मान निधी (महाराष्ट्र शासन योजना):**\n• **मिळणारा लाभ:** महाराष्ट्र शासनाकडून केंद्रीय पीएम-किसान योजनेव्यतिरिक्त **दरवर्षी आणखी ₹६,०००** (₹२,००० च्या ३ हप्त्यांमध्ये) दिले जातात.\n• **एकूण वार्षिक लाभ:** राज्यातील शेतकऱ्यांना वर्षाला एकूण **₹१२,०००** मिळतात (₹६,००० केंद्र + ₹६,००० राज्य).\n• **पात्रता:** पीएम-किसान योजनेचे राज्यातील सर्व पात्र लाभार्थी शेतकरी या अनुदानास थेट पात्र आहेत."
    },
    "action": {
      "text": {
        "en": "Explore Farmer Schemes",
        "hi": "किसान योजनाएं देखें",
        "mr": "शेतकरी योजना पहा"
      },
      "page": "services",
      "cat": "farmers"
    }
  },
  {
    "keywords": [
      "fasal bima",
      "pik vima",
      "crop insurance",
      "pmfby",
      "72 hours",
      "crop damage",
      "flood",
      "drought",
      "पीक विमा",
      "फसल बीमा",
      "नुकसान भरपाई",
      "७२ तास",
      "unseasonal rain",
      "ek rupya pik vima"
    ],
    "response": {
      "en": "🛡️ **Pradhan Mantri Fasal Bima Yojana (₹1 Scheme) & 72h Rule:**\n• **Token Premium:** Maharashtra farmers can insure Kharif and Rabi crops by paying only **₹1 token premium**.\n• **⚠️ CRITICAL 72-HOUR NOTICE RULE:**\n  If crops are damaged due to hailstorms, flood, unseasonal heavy rain, or localized pests, farmers **MUST report the damage within 72 hours** through the portal, mobile app, or toll-free helpline **1800-180-1551**.\n• Surveys are conducted by Agriculture Officers, and compensation is transferred directly to the farmer's bank account.",
      "hi": "🛡️ **प्रधानमंत्री फसल बीमा योजना (₹1 योजना) एवं 72 घंटे का नियम:**\n• **टोकन प्रीमियम:** महाराष्ट्र के किसान मात्र **₹1 टोकन प्रीमियम** देकर खरीफ और रबी फसलों का संपूर्ण बीमा करवा सकते हैं।\n• **⚠️ महत्वपूर्ण 72 घंटे का नियम:**\n  यदि बेमौसम बारिश, ओलावृष्टि, बाढ़ या कीट प्रकोप से फसल नष्ट होती है, तो किसान को **72 घंटे के भीतर सूचना देना अनिवार्य** है। सूचना पोर्टल, मोबाइल ऐप अथवा टोल-फ्री 1800-180-1551 पर दर्ज कराएं।\n• कृषि अधिकारी पंचनामा कर बीमा क्लेम की राशि सीधे बैंक खाते में जमा कराते हैं।",
      "mr": "🛡️ **१ रुपयात पीक विमा योजना (PMFBY) व ७२ तासांचा नियम:**\n• **टोकन हप्ता:** महाराष्ट्रातील शेतकरी केवळ **₹१ टोकन भरून** खरीप व रब्बी पिकांचा सर्वसमावेशक पीक विमा उतरवू शकतात.\n• **⚠️ अत्यंत महत्त्वाचा ७२ तासांचा नियम:**\n  गारपीट, अवकाळी पाऊस, पूर किंवा कीटक हल्ल्यामुळे पिकाचे नुकसान झाल्यास **७२ तासांच्या आत नुकसानीची पूर्वसूचना देणे बंधनकारक** आहे. सूचना पोर्टलवरून किंवा टोल-फ्री क्रमांक १८००-१८०-१५५१ वर द्यावी.\n• कृषी विभागामार्फत पंचनामा होऊन भरपाईची रक्कम थेट बँक खात्यात वर्ग होते."
    },
    "action": {
      "text": {
        "en": "View Crop Insurance Details",
        "hi": "फसल बीमा विवरण देखें",
        "mr": "पीक विमा माहिती पहा"
      },
      "page": "services",
      "cat": "farmers"
    }
  },
  {
    "keywords": [
      "kcc",
      "kisan credit card",
      "farmer loan",
      "4% interest",
      "crop loan",
      "कृषी कर्ज",
      "किसान क्रेडिट कार्ड",
      "kcc limit",
      "low interest loan"
    ],
    "response": {
      "en": "💳 **Kisan Credit Card (KCC) — 4% Subsidized Loan:**\n• **Purpose:** Timely institutional credit for crop cultivation, purchasing seeds/fertilizers, and farm machinery maintenance.\n• **Effective Interest Rate: Only 4% p.a.** on prompt repayment (due to central 3% interest subvention and state government prompt repayment incentive).\n• **Limit:** Up to ₹3 Lakhs collateral-free based on 7/12 land records.",
      "hi": "💳 **किसान क्रेडिट कार्ड (KCC) — 4% रियायती ब्याज दर:**\n• **उद्देश्य:** फसलों की बुआई, बीज, उर्वरक, ट्रैक्टर डीजल और कृषि रखरखाव के लिए सुलभ बैंक ऋण।\n• **प्रभावी ब्याज दर: मात्र 4% वार्षिक** (समय पर ऋण चुकाने पर केंद्र व राज्य सरकार की 3% ब्याज छूट मिलने के बाद)।\n• **ऋण सीमा:** 7/12 जमीन के आधार पर ₹3 लाख तक का आसान ऋण।",
      "mr": "💳 **किसान क्रेडिट कार्ड (KCC) — ४% सवलतीचे पीक कर्ज:**\n• **उद्देश:** पिकांची लागवड, खते-बियाणे खरेदी व शेती अवजारांसाठी त्वरित बँक पतपुरवठा.\n• **प्रभावी व्याजदर: अवघा ४% वार्षिक** (वेळेवर परतफेड केल्यास केंद्र व राज्य शासनाच्या व्याज सवलतीमुळे).\n• **मर्यादा:** ७/१२ उताऱ्यावरील क्षेत्राच्या आधारे ₹३ लाखांपर्यंत सुलभ कर्ज मर्यादा उपलब्ध."
    },
    "action": {
      "text": {
        "en": "Check KCC Schemes",
        "hi": "किसान क्रेडिट कार्ड देखें",
        "mr": "पीक कर्ज योजना पहा"
      },
      "page": "services",
      "cat": "farmers"
    }
  },
  {
    "keywords": [
      "mandi",
      "bazarbhav",
      "apmc",
      "mandi rates",
      "commodity price",
      "cotton rate",
      "soybean rate",
      "onion rate",
      "बाजारभाव",
      "मंडी भाव",
      "कांदा भाव",
      "सोयाबीन भाव",
      "कापूस भाव",
      "bhav kitna hai"
    ],
    "response": {
      "en": "📊 **Live Mandi Rates & APMC Commodity Index:**\ne-Samanvit provides real-time daily commodity auction prices across major Maharashtra mandis (Pune, Nashik, Lasalgaon, Vashi, Nagpur, Kolhapur, Amravati):\n• **Cotton (कापूस):** ₹7,100 – ₹7,650 / Quintal\n• **Soybean (सोयाबीन):** ₹4,400 – ₹4,850 / Quintal\n• **Onion (कांदा - Lasalgaon):** ₹1,800 – ₹2,450 / Quintal\n• **Wheat (गहू):** ₹2,450 – ₹2,900 / Quintal\nCheck the Dashboard tab for live updates refreshed every hour!",
      "hi": "📊 **लाइव मंडी भाव एवं एपीएमसी कमोडिटी दर:**\nई-समन्वित पोर्टल पर महाराष्ट्र की प्रमुख मंडियों (पुणे, नाशिक, लासलगांव, वाशी, नागपुर, कोल्हापुर) के दैनिक ताज़ा भाव उपलब्ध हैं:\n• **कपास (Cotton):** ₹7,100 – ₹7,650 प्रति क्विंटल\n• **सोयाबीन (Soybean):** ₹4,400 – ₹4,850 प्रति क्विंटल\n• **प्याज (Onion - लासलगांव):** ₹1,800 – ₹2,450 प्रति क्विंटल\n• **गेहूं (Wheat):** ₹2,450 – ₹2,900 प्रति क्विंटल\nताज़ा भाव देखने के लिए पोर्टल के Dashboard टैब पर जाएं!",
      "mr": "📊 **थेट बाजारभाव व कृषी उत्पन्न बाजार समिती दर:**\nई-समन्वित पोर्टलवर राज्यातील प्रमुख बाजार समित्यांचे (पुणे, नाशिक, लासलगाव, वाशी, नागपूर, कोल्हापूर) ताजे दैनिक बाजारभाव उपलब्ध आहेत:\n• **कापूस:** ₹७,१०० ते ₹७,६५० / क्विंटल\n• **सोयाबीन:** ₹४,४०० ते ₹४,८५० / क्विंटल\n• **कांदा (लासलगाव):** ₹१,८०० ते ₹२,४५० / क्विंटल\n• **गहू:** ₹२,४५० ते ₹२,९०० / क्विंटल\nथेट बाजारभाव पाहण्यासाठी पोर्टलच्या Dashboard पर्यायावर भेट द्या!"
    },
    "action": {
      "text": {
        "en": "Check Dashboard Mandi Rates",
        "hi": "मंडी भाव देखें",
        "mr": "थेट बाजारभाव पहा"
      },
      "page": "dashboard"
    }
  },
  {
    "keywords": [
      "soil health",
      "soil testing",
      "fertilizer",
      "krishi bhavan",
      "माती परीक्षण",
      "मृदा स्वास्थ्य",
      "खत",
      "soil test report",
      "fertilizer advisory"
    ],
    "response": {
      "en": "🧪 **Soil Health Card & Free Soil Testing Campaign:**\n• **Free Service:** Taluka Krishi Bhavans conduct free soil nutrient testing for farmers.\n• **12 Parameters:** Nitrogen (N), Phosphorus (P), Potassium (K), pH, Organic Carbon, Zinc, and Micronutrients.\n• **Benefits:** Tailored dosage guidance avoids over-fertilization, saves ₹3,000–₹5,000 per acre, and improves soil fertility.",
      "hi": "🧪 **मृदा स्वास्थ्य कार्ड एवं मुफ्त मिट्टी परीक्षण:**\n• **निःशुल्क सेवा:** प्रत्येक तालुका कृषि कार्यालय में किसानों के लिए मिट्टी की मुफ्त वैज्ञानिक जांच की जाती है।\n• **12 पोषक तत्वों की जांच:** नाइट्रोजन (N), फास्फोरस (P), पोटाश (K), पीएच मान, जिंक एवं सूक्ष्म पोषक तत्व।\n• **लाभ:** संतुलित खाद उपयोग से प्रति एकड़ ₹3,000–₹5,000 की बचत होती है और फसल पैदावार बढ़ती है।",
      "mr": "🧪 **मृदा स्वास्थ्य कार्ड व मोफत माती परीक्षण मोहीम:**\n• **मोफत सेवा:** प्रत्येक तालुका कृषी कार्यालयात शेतकऱ्यांच्या शेतातील मातीची मोफत रासायनिक तपासणी केली जाते.\n• **१२ घटकांची तपासणी:** नायट्रोजन (N), फॉस्फरस (P), पोटॅश (K), सामू (pH), सेंद्रिय कर्ब व सूक्ष्मद्रव्ये.\n• **फायदे:** खतांचा संतुलित वापर झाल्याने एकरी ₹३,००० ते ₹५,००० ची बचत होते आणि जमिनीचा कस टिकून राहतो."
    },
    "action": {
      "text": {
        "en": "Explore Farmer Services",
        "hi": "किसान सेवाएं देखें",
        "mr": "शेतकरी सेवा पहा"
      },
      "page": "services",
      "cat": "farmers"
    }
  },
  {
    "keywords": [
      "drip irrigation",
      "thibak sinchan",
      "sprinkler",
      "micro irrigation",
      "ठिबक सिंचन",
      "तुषार सिंचन",
      "सिंचन अनुदान",
      "irrigation subsidy"
    ],
    "response": {
      "en": "💧 **Drip & Micro-Irrigation Subsidy (MahaDBT Krishi):**\n• **Subsidy Percentage:** Up to **75% to 80% grant** for small and marginal farmers, and 50% for other farmers.\n• **Eligibility:** Farmers with verified water source and electricity connection listed on 7/12 extract.\n• **Benefits:** Saves up to 60% water, cuts electricity bills, and boosts crop yield by 30%.",
      "hi": "💧 **ठिबक एवं सूक्ष्म सिंचाई अनुदान (महाडीबीटी कृषी):**\n• **अनुदान दर:** छोटे एवं सीमांत किसानों को **75% से 80% तक सरकारी सब्सिडी**, अन्य किसानों को 50% तक।\n• **पात्रता:** 7/12 उताऱ्यावर जलस्रोत (कुआं/बोरवेल) एवं बिजली कनेक्शन दर्ज होना आवश्यक।\n• **लाभ:** 60% पानी की बचत, कम बिजली खर्च और 30% अधिक फसल उत्पादन।",
      "mr": "💧 **ठिबक व सूक्ष्म सिंचन अनुदान योजना (महाडीबीटी कृषी):**\n• **शासकीय अनुदान:** अल्प व अत्यल्प भूधारक शेतकऱ्यांना **७५% ते ८०% पर्यंत थेट अनुदान**, इतर शेतकऱ्यांना ५०%.\n• **पात्रता:** ७/१२ उताऱ्यावर विहीर, बोअरवेल किंवा इतर जलस्रोताची नोंद असणे आवश्यक.\n• **फायदे:** ६०% पाण्याची बचत, विजेचा कमी वापर आणि उत्पादनात ३०% पर्यंत वाढ."
    },
    "action": {
      "text": {
        "en": "View Irrigation Schemes",
        "hi": "सिंचाई योजनाएं देखें",
        "mr": "सिंचन योजना पहा"
      },
      "page": "services",
      "cat": "farmers"
    }
  },
  {
    "keywords": [
      "women",
      "woman",
      "mahila",
      "kanya",
      "female",
      "महिला",
      "स्त्री",
      "नारी कल्याण",
      "women welfare",
      "mahila sahayya"
    ],
    "response": {
      "en": "👩‍👧 **Women & Child Welfare Services:**\nGovernment of Maharashtra empowers women through dedicated security, financial dignity, and healthcare programs:\n• **Mukhyamantri Majhi Ladki Bahin Yojana:** ₹1,500/month direct financial aid for eligible women.\n• **Majhi Kanya Bhagyashree:** Financial security grants for girl children.\n• **Mahila Samman Bachat Patra:** High 7.5% interest safe savings certificate.\n• **Pradhan Mantri Matru Vandana Yojana:** Cash nutrition grants for pregnant & lactating mothers.",
      "hi": "👩‍👧 **महिला एवं बाल कल्याण योजनाएं:**\nमहाराष्ट्र शासन महिलाओं के आर्थिक स्वावलंबन और सुरक्षा हेतु समर्पित है:\n• **मुख्यमंत्री माझी लाडकी बहीण योजना:** पात्र महिलाओं के खाते में ₹1,500 प्रति माह सीधे डीबीटी द्वारा।\n• **माझी कन्या भाग्यश्री योजना:** बालिकाओं के उज्ज्वल भविष्य के लिए सरकारी वित्तीय सुरक्षा।\n• **महिला सम्मान बचत प्रमाणपत्र:** महिलाओं के लिए 7.5% सुरक्षित वार्षिक ब्याज दर।\n• **प्रधानमंत्री मातृ वंदना योजना:** गर्भवती व धात्री माताओं को पोषण आहार सहायता।",
      "mr": "👩‍👧 **महिला व बाल कल्याण लोकसेवा:**\nमहाराष्ट्र शासन महिलांच्या आर्थिक स्वावलंबनासाठी आणि सक्षमीकरणासाठी कटिबद्ध आहे:\n• **मुख्यमंत्री माझी लाडकी बहीण योजना:** पात्र महिलांना दरमहा ₹१,५०० थेट बँक खात्यात.\n• **माझी कन्या भाग्यश्री योजना:** मुलींच्या सुरक्षित भविष्यासाठी व शिक्षणासाठी आर्थिक अनुदान.\n• **महिला सन्मान बचत प्रमाणपत्र:** ७.५% सुरक्षित व्याज देणारी सरकारी ठेव योजना.\n• **प्रधानमंत्री मातृ वंदना व पोषण अभियान:** गरोदर व स्तनदा मातांसाठी पोषण अनुदान."
    },
    "action": {
      "text": {
        "en": "View Women Schemes",
        "hi": "महिला योजनाएं देखें",
        "mr": "महिला योजना पहा"
      },
      "page": "services",
      "cat": "women"
    }
  },
  {
    "keywords": [
      "ladki bahin",
      "majhi ladki bahin",
      "1500",
      "ladki bahin yojana",
      "mahila 1500",
      "लाडकी बहीण",
      "माझी लाडकी बहीण",
      "१५००",
      "लाडकी बहीण कधी येणार",
      "ladki bahin status",
      "ladki bahin installment"
    ],
    "response": {
      "en": "🌸 **Mukhyamantri Majhi Ladki Bahin Yojana (₹1,500 Monthly DBT):**\n• **Benefit:** Eligible women receive **₹1,500 per month** (₹18,000 per year) directly in their Aadhaar-linked bank account.\n• **Eligibility:**\n  1. Women residents of Maharashtra aged **21 to 65 years**.\n  2. Annual family income must be under **₹2,50,000**.\n  3. Holding Yellow or Orange Ration Card (or verified income certificate).\n• **Required Docs:** Aadhaar card, Ration card, Domicile certificate/Voter ID, and Aadhaar-seeded bank passbook.\nDisbursements are released every month directly via PFMS DBT!",
      "hi": "🌸 **मुख्यमंत्री माझी लाडकी बहीण योजना (₹1,500 मासिक डीबीटी):**\n• **लाभ:** पात्र महिलाओं को प्रति माह **₹1,500** (वार्षिक ₹18,000) सीधे उनके आधार से जुड़े बैंक खाते में दिए जाते हैं।\n• **पात्रता:**\n  1. महाराष्ट्र की निवासी महिलाएं जिनकी आयु **21 से 65 वर्ष** के बीच हो।\n  2. परिवार की वार्षिक आय **₹2,50,000 से कम** होनी चाहिए।\n  3. पीला या केसरी राशन कार्ड धारक।\n• **दस्तावेज:** आधार कार्ड, राशन कार्ड, अधिवास प्रमाणपत्र/वोटर आईडी, और आधार-लिंक बैंक खाता पासबुक।\nराशि हर महीने बिना किसी बिचौलिए के सीधे खाते में भेजी जाती है!",
      "mr": "🌸 **मुख्यमंत्री माझी लाडकी बहीण योजना (दरमहा ₹१,५०० थेट DBT):**\n• **मिळणारा लाभ:** पात्र महिलांच्या आधारसंलग्न बँक खात्यात **दरमहा ₹१,५००** (वार्षिक ₹१८,०००) थेट जमा होतात.\n• **पात्रता अटी:**\n  1. महाराष्ट्रातील रहिवासी महिला, वय **२१ ते ६५ वर्षे**.\n  2. कुटुंबाचे वार्षिक उत्पन्न **₹२,५०,००० पेक्षा कमी** असावे.\n  3. पिवळे किंवा केशरी रेशन कार्डधारक.\n• **लागणारी कागदपत्रे:** आधार कार्ड, रेशन कार्ड, अधिवास दाखला/मतदान ओळखपत्र आणि आधार जोडलेले बँक पासबुक.\nदरमहा थेट बँक खात्यात रक्कम जमा केली जाते!"
    },
    "action": {
      "text": {
        "en": "Apply for Ladki Bahin",
        "hi": "लाडकी बहीण योजना देखें",
        "mr": "लाडकी बहीण योजना माहिती"
      },
      "page": "services",
      "cat": "women"
    }
  },
  {
    "keywords": [
      "kanya bhagyashree",
      "girl child",
      "sukanya",
      "कन्या भाग्यश्री",
      "मुलगी योजना",
      "majhi kanya",
      "sukanya samriddhi"
    ],
    "response": {
      "en": "👧 **Majhi Kanya Bhagyashree Yojana:**\n• **Objective:** Promoting the birth, care, and education of girl children across Maharashtra.\n• **Benefit:** Government deposits ₹50,000 in the name of the girl child (for families opting for family planning after 1 girl) or ₹25,000 each for 2 girls.\n• Interest accrued can be withdrawn for the girl's school fees and education at ages 6, 12, and 18.",
      "hi": "👧 **माझी कन्या भाग्यश्री योजना:**\n• **उद्देश्य:** कन्या भ्रूण हत्या रोकना, बालिकाओं के अनुपात में सुधार और उनकी उच्च शिक्षा सुनिश्चित करना।\n• **लाभ:** एक बालिका के बाद परिवार नियोजन कराने पर बालिका के नाम ₹50,000 की सरकारी एफडी (दो बालिकाओं पर ₹25,000-₹25,000)।\n• 6, 12 और 18 वर्ष की आयु में शिक्षा के लिए ब्याज राशि निकाली जा सकती है।",
      "mr": "👧 **माझी कन्या भाग्यश्री योजना:**\n• **उद्देश:** मुलींच्या जन्माचे स्वागत करणे, स्त्रीभ्रूणहत्या रोखणे व मुलींचे आरोग्य आणि शिक्षण सुरक्षित करणे.\n• **लाभ:** एका मुलीच्या जन्मानंतर कुटुंब नियोजन शस्त्रक्रिया केल्यास मुलीच्या नावे ₹५०,००० (दोन मुली असल्यास प्रत्येकी ₹२५,०००) मुदत ठेव.\n• वयाच्या ६ व्या, १२ व्या व १८ व्या वर्षी मिळणारे व्याज मुलीच्या शिक्षणासाठी वापरता येते."
    },
    "action": {
      "text": {
        "en": "Explore Women Schemes",
        "hi": "महिला योजनाएं देखें",
        "mr": "महिला योजना पहा"
      },
      "page": "services",
      "cat": "women"
    }
  },
  {
    "keywords": [
      "mahila samman",
      "mssc",
      "women savings",
      "महिला सन्मान बचत पत्र",
      "bacht patra",
      "savings certificate"
    ],
    "response": {
      "en": "🪙 **Mahila Samman Bachat Patra (MSSC):**\n• **Tenure & Return:** 2-year government-backed savings deposit offering **7.5% fixed interest per annum**.\n• **Deposit Range:** From ₹1,000 up to ₹2,00,000 in the name of any woman or girl child.\n• **Safety:** 100% sovereign guarantee with partial withdrawal option after 1 year.",
      "hi": "🪙 **महिला सम्मान बचत पत्र (MSSC):**\n• **अवधि व ब्याज:** महिलाओं के लिए 2 वर्ष की सुरक्षित सरकारी बचत योजना, जिसमें **7.5% वार्षिक निश्चित ब्याज** मिलता है।\n• **जमा सीमा:** किसी भी महिला या बालिका के नाम पर ₹1,000 से लेकर ₹2,00,000 तक।\n• **सुरक्षा:** पूर्ण सरकारी गारंटी और 1 वर्ष बाद आंशिक निकासी की सुविधा।",
      "mr": "🪙 **महिला सन्मान बचत प्रमाणपत्र (MSSC):**\n• **मुदत व व्याजदर:** २ वर्षांची सुरक्षित शासकीय बचत ठेव, ज्यावर **७.५% निश्चित वार्षिक चक्रवाढ व्याज** मिळते.\n• **गुंतवणूक मर्यादा:** कोणत्याही महिला किंवा मुलीच्या नावे ₹१,००० ते ₹२ लाखांपर्यंत ठेव ठेवता येते.\n• **सुरक्षितता:** पूर्ण शासकीय सुरक्षितता आणि १ वर्षानंतर ४०% पर्यंत रक्कम काढण्याची मुभा."
    }
  },
  {
    "keywords": [
      "matru vandana",
      "pmmvy",
      "pregnancy",
      "pregnant",
      "poshan",
      "मातृ वंदना",
      "पोषण आहार",
      "गरोदर माता",
      "maternity benefit"
    ],
    "response": {
      "en": "🤱 **Pradhan Mantri Matru Vandana Yojana (PMMVY):**\n• **Benefit:** Cash assistance of ₹5,000 in DBT installments for pregnant women for their first child, and ₹6,000 for a second girl child.\n• **Purpose:** Compensates wage loss and promotes institutional delivery, mother's nutrition, and newborn vaccination.\n• Register at your nearest Anganwadi center or PHC with your Aadhaar and MCP card.",
      "hi": "🤱 **प्रधानमंत्री मातृ वंदना योजना (PMMVY):**\n• **लाभ:** पहले बच्चे के समय गर्भवती महिलाओं को पोषण हेतु ₹5,000 तथा दूसरी बालिका के जन्म पर ₹6,000 सीधे बैंक खाते में।\n• **उद्देश्य:** प्रसवपूर्व जांच, संस्थागत प्रसव और नवजात शिशु के टीकाकरण को बढ़ावा देना।\n• अपने नजदीकी आंगनवाड़ी केंद्र या प्राथमिक स्वास्थ्य केंद्र (PHC) में पंजीकरण कराएं।",
      "mr": "🤱 **प्रधानमंत्री मातृ वंदना योजना (PMMVY):**\n• **मिळणारा लाभ:** पहिल्या अपत्याच्या वेळी गरोदर व स्तनदा मातेला पोषणासाठी ₹५,००० आणि दुसऱ्यांदा मुलगी झाल्यास ₹६,००० थेट बँक खात्यात.\n• **उद्देश:** गरोदरपणातील मजुरीचे नुकसान भरून काढणे, सुरक्षित प्रसूती आणि बाळाचे लसीकरण सुनिश्चित करणे.\n• जवळच्या अंगणवाडी केंद्रात किंवा प्राथमिक आरोग्य केंद्रात (PHC) नोंदणी करा."
    }
  },
  {
    "keywords": [
      "health",
      "hospital",
      "doctor",
      "treatment",
      "medical",
      "medicine",
      "आरोग्य",
      "दवाखाना",
      "इलाज",
      "रुग्णालय",
      "वैद्यकीय",
      "healthcare",
      "cashless treatment"
    ],
    "response": {
      "en": "🏥 **Healthcare & Medical Services in Maharashtra:**\ne-Samanvit delivers comprehensive health access for all citizens:\n• **Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY):** Free cashless hospital treatment and surgeries up to **₹5,00,000 per family per year** across 1,000+ empaneled hospitals.\n• **Ayushman Bharat Health Account (ABHA):** Create your unified 14-digit digital health ID.\n• **Emergency Medical Response (Dial 108):** 24/7 free ambulance response for trauma and maternity.",
      "hi": "🏥 **स्वास्थ्य एवं चिकित्सा लोकसेवाएं:**\nई-समन्वित महाराष्ट्र के प्रत्येक नागरिक तक मुफ्त व गुणवत्तापूर्ण इलाज पहुंचाता है:\n• **महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY):** प्रति परिवार प्रति वर्ष **₹5,00,000 तक का मुफ्त कैशलेस इलाज व सर्जरी** 1,000 से अधिक अंगीकृत अस्पतालों में।\n• **आभा डिजिटल हेल्थ आईडी (ABHA Card):** अपना 14 अंकों का डिजिटल हेल्थ कार्ड बनाएं।\n• **आपातकालीन एम्बुलेंस (डायल 108):** 24 घंटे मुफ्त आपातकालीन एम्बुलेंस सेवा।",
      "mr": "🏥 **आरोग्य व वैद्यकीय लोकसेवा:**\nई-समन्वित पोर्टलद्वारे राज्यातील नागरिकांना मोफत व दर्जेदार उपचारांची हमी:\n• **महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY):** प्रति कुटुंब प्रति वर्ष **₹५,००,००० पर्यंत मोफत कॅशलेस उपचार व शस्त्रक्रिया** राज्यातील १,०००+ रुग्णालयांमध्ये.\n• **आयुष्मान भारत डिजिटल हेल्थ कार्ड (ABHA):** १४ अंकी डिजिटल हेल्थ आयडी त्वरित बनवा.\n• **आपत्कालीन रुग्णवाहिका (१०८ डायल करा):** २४/७ मोफत तत्काळ रुग्णवाहिका सेवा उपलब्ध."
    },
    "action": {
      "text": {
        "en": "View Healthcare Services",
        "hi": "स्वास्थ्य सेवाएं देखें",
        "mr": "आरोग्य सेवा पहा"
      },
      "page": "services",
      "cat": "healthcare"
    }
  },
  {
    "keywords": [
      "mjpjay",
      "jan arogya",
      "5 lakh",
      "free treatment",
      "cashless surgery",
      "hospital list",
      "महात्मा फुले जन आरोग्य",
      "मोफत उपचार",
      "५ लाख",
      "mjpjay hospital"
    ],
    "response": {
      "en": "🩺 **Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY):**\n• **Coverage:** Up to **₹5,00,000 per family per year** on a family floater basis.\n• **Procedures Covered:** 1,356 medical and surgical procedures including heart surgeries, cancer chemotherapy/radiation, kidney dialysis, neurosurgery, and pediatric care.\n• **Eligibility:** All families in Maharashtra holding Yellow, Orange, Antyodaya, or Annapurna Ration Cards.\n• **How to avail:** Walk into any empaneled hospital with your Ration Card and Aadhaar card. The hospital's **Arogyamitra** will assist you at the reception desk for cashless admission!",
      "hi": "🩺 **महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY):**\n• **बीमा कवर:** प्रति परिवार प्रति वर्ष **₹5,00,000 तक का पूर्णतः कैशलेस उपचार**।\n• **शामिल उपचार:** 1,356 से अधिक गंभीर बीमारियां एवं सर्जरी (हृदय रोग, कैंसर, डायलिसिस, ब्रेन सर्जरी, मोतियाबिंद आदि)।\n• **पात्रता:** पीला, केसरी, अंत्योदय अथवा अन्नपूर्णा राशन कार्ड धारक सभी परिवार।\n• **लाभ कैसे लें:** राशन कार्ड व आधार लेकर किसी भी सूचीबद्ध अस्पताल में जाएं। वहां रिसेप्शन पर मौजूद **आरोग्यमित्र** आपकी कैशलेस भर्ती कराएंगे!",
      "mr": "🩺 **महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY):**\n• **कव्हर:** प्रति कुटुंब प्रति वर्ष **₹५,००,००० पर्यंत मोफत कॅशलेस उपचार**.\n• **समाविष्ट उपचार:** १,३५६ आजार व शस्त्रक्रिया (हृदयविकार, कॅन्सर, किडनी डायलिसिस, मेंदूच्या शस्त्रक्रिया व बालरोग).\n• **पात्रता:** पिवळे, केशरी, अंत्योदय किंवा अन्नपूर्णा रेशन कार्ड असणारे सर्व कुटुंब.\n• **कसा लाभ घ्यावा:** रेशन कार्ड व आधार कार्ड घेऊन कोणत्याही अंगीकृत रुग्णालयात जा. तिथे मदत कक्षावर असणारे **आरोग्यमित्र** आपल्याला मोफत दाखल करून घेतील!"
    },
    "action": {
      "text": {
        "en": "Explore MJPJAY Schemes",
        "hi": "जन आरोग्य योजना देखें",
        "mr": "महात्मा फुले योजना पहा"
      },
      "page": "services",
      "cat": "healthcare"
    }
  },
  {
    "keywords": [
      "abha",
      "abha card",
      "health id",
      "ayushman card",
      "आभा कार्ड",
      "आयुष्मान भारत कार्ड",
      "digital health id",
      "create abha"
    ],
    "response": {
      "en": "🪪 **Ayushman Bharat Health Account (ABHA Card):**\n• **What is it?** A 14-digit unique digital health identity created using your Aadhaar.\n• **Benefits:**\n  1. Paperless storage of lab reports, prescriptions, and diagnosis records.\n  2. Share medical history instantly with doctors across India without carrying physical files.\n  3. 100% consent-driven and secure.",
      "hi": "🪪 **आयुष्मान भारत हेल्थ अकाउंट (ABHA Card):**\n• **यह क्या है?** आधार के माध्यम से बना 14 अंकों का डिजिटल स्वास्थ्य पहचान पत्र।\n• **लाभ:**\n  1. रक्त जांच रिपोर्ट, पर्चे और डिस्चार्ज समरी डिजिटल रूप से सुरक्षित रहती है।\n  2. डॉक्टर को पुरानी फाइलें ले जाए बिना मेडिकल हिस्ट्री सुरक्षित साझा कर सकते हैं।\n  3. पूरी तरह आपकी सहमति पर आधारित और सुरक्षित।",
      "mr": "🪪 **आयुष्मान भारत डिजिटल हेल्थ कार्ड (ABHA Card):**\n• **हे काय आहे?** आधार क्रमांकाद्वारे तयार होणारा १४ अंकी डिजिटल आरोग्य ओळख क्रमांक.\n• **फायदे:**\n  1. रक्त तपासणी अहवाल, डॉक्टरांचे औषधोपचार कागदपत्रे डिजिटल स्वरूपात सुरक्षित.\n  2. जुन्या फाईल्स न बाळगता डॉक्टरांशी डिजिटल मेडिकल हिस्ट्री शेअर करण्याची सोय.\n  3. पूर्णपणे सुरक्षित व गोपनीय."
    },
    "action": {
      "text": {
        "en": "Check Health Services",
        "hi": "स्वास्थ्य सेवाएं देखें",
        "mr": "आरोग्य सेवा पहा"
      },
      "page": "services",
      "cat": "healthcare"
    }
  },
  {
    "keywords": [
      "ambulance",
      "108",
      "emergency medical",
      "accident",
      "रुग्णवाहिका",
      "एम्बुलेंस",
      "१०८",
      "dial 108",
      "emergency contact"
    ],
    "response": {
      "en": "🚑 **Emergency Medical Ambulance Response (Dial 108):**\n• **Toll-Free Emergency Number:** **108** (available 24/7 across Maharashtra).\n• **Services:** Basic Life Support (BLS) and Advanced Life Support (ALS) ambulances equipped with ventilators, ECG, and oxygen.\n• Covers road traffic accidents, cardiac emergencies, maternal deliveries, and natural disasters. 100% free response!",
      "hi": "🚑 **आपातकालीन एम्बुलेंस सेवा (डायल 108):**\n• **टोल-फ्री नंबर:** **108** (महाराष्ट्र भर में 24 घंटे निःशुल्क सेवा)।\n• **सुविधाएं:** ऑक्सीजन, वेंटिलेटर एवं ईसीजी युक्त अत्याधुनिक एम्बुलेंस।\n• सड़क दुर्घटना, हृदयघात, प्रसव पीड़ा एवं गंभीर आपातकालीन स्थितियों में तुरंत सहायता।",
      "mr": "🚑 **तातडीची आपत्कालीन रुग्णवाहिका सेवा (१०८ डायल करा):**\n• **टोल-फ्री क्रमांक:** **१०८** (संपूर्ण महाराष्ट्रात २४ तास मोफत उपलब्ध).\n• **सुविधा:** व्हेंटिलेटर, ऑक्सिजन व प्राथमिक उपचार सुविधांनी सुसज्ज रुग्णवाहिका.\n• अपघात, हृदयविकार, प्रसूती व आपत्कालीन वैद्यकीय मदतीसाठी तत्काळ सेवा."
    }
  },
  {
    "keywords": [
      "senior citizen",
      "old age",
      "elderly",
      "vridha",
      "aaji ajoba",
      "ज्येष्ठ नागरिक",
      "वृद्ध",
      "बुजुर्ग",
      "senior care",
      "elderly pension"
    ],
    "response": {
      "en": "👴 **Senior Citizen Services & Social Security:**\ne-Samanvit honors and protects our senior citizens:\n• **Sanjay Gandhi Niradhar Anudan Yojana:** Monthly financial pension for destitute elders and disabled persons.\n• **Shravan Bal Seva Rajya Nivruttivetan:** Dedicated pension for citizens aged 65+.\n• **Senior Citizen ID Card:** Concessions on MSRTC / ST bus travel, hospital priority, and banking preference.",
      "hi": "👴 **वरिष्ठ नागरिक कल्याण एवं सामाजिक सुरक्षा:**\nमहाराष्ट्र शासन वरिष्ठ नागरिकों के सम्मानजनक जीवन हेतु प्रतिबद्ध है:\n• **संजय गांधी निराधार अनुदान योजना:** निराधार एवं वृद्धजनों के लिए मासिक सामाजिक पेंशन।\n• **श्रावण बाळ सेवा राज्य निवृत्तिवेतन:** 65 वर्ष व उससे अधिक आयु के बुजुर्गों के लिए मासिक पेंशन।\n• **वरिष्ठ नागरिक पहचान पत्र:** एसटी बस यात्रा में छूट, सरकारी अस्पतालों में विशेष सुविधा।",
      "mr": "👴 **ज्येष्ठ नागरिक लोकसेवा व सामाजिक सुरक्षा:**\nमहाराष्ट्र शासन ज्येष्ठ नागरिकांच्या सन्मानजनक जीवनासाठी कटिबद्ध आहे:\n• **संजय गांधी निराधार अनुदान योजना:** निराधार वृद्ध व दिव्यांग व्यक्तींसाठी मासिक निवृत्तीवेतन.\n• **श्रावण बाळ सेवा राज्य निवृत्तीवेतन:** ६५ वर्षे व त्यावरील वयाच्या नागरिकांसाठी मासिक पेन्शन.\n• **ज्येष्ठ नागरिक ओळखपत्र:** एसटी बस प्रवासात भरघोस सवलत, रुग्णालयात प्राधान्य."
    },
    "action": {
      "text": {
        "en": "View Senior Citizen Services",
        "hi": "वरिष्ठ नागरिक सेवाएं देखें",
        "mr": "ज्येष्ठ नागरिक सेवा पहा"
      },
      "page": "services",
      "cat": "senior"
    }
  },
  {
    "keywords": [
      "sanjay gandhi niradhar",
      "shravan bal",
      "pension",
      "monthly pension",
      "श्रावण बाळ",
      "संजय गांधी निराधार",
      "पेन्शन",
      "निवृत्तीवेतन",
      "old age pension amount"
    ],
    "response": {
      "en": "👵 **Sanjay Gandhi Niradhar & Shravan Bal Pensions:**\n• **Shravan Bal Yojana:** Provides monthly pension for senior citizens aged **65 years and above** whose annual family income is under ₹21,000 (Cat A - BPL) or ₹50,000 (Cat B).\n• **Sanjay Gandhi Niradhar Yojana:** Supports destitute senior citizens, widows, and persons with 40%+ disability who have no source of independent income.\n• **Application Docs:** Age proof (Aadhaar/School leaving), Income certificate from Tahsildar, and Domicile proof.",
      "hi": "👵 **श्रावण बाळ व संजय गांधी निराधार पेंशन योजना:**\n• **श्रावण बाळ योजना:** 65 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिकों के लिए मासिक पेंशन, जिनकी वार्षिक पारिवारिक आय ₹21,000 (बीपीएल) या ₹50,000 तक हो।\n• **संजय गांधी निराधार योजना:** निराधार बुजुर्गों, विधवाओं एवं 40% से अधिक दिव्यांग व्यक्तियों को मासिक वित्तीय सहायता।\n• **दस्तावेज:** आयु प्रमाण (आधार कार्ड), तहसीलदार का आय प्रमाण पत्र, और अधिवास प्रमाण पत्र।",
      "mr": "👵 **श्रावण बाळ व संजय गांधी निराधार पेन्शन योजना:**\n• **श्रावण बाळ योजना:** ६५ वर्षे व त्यावरील वयाच्या ज्येष्ठ नागरिकांना मासिक निवृत्तीवेतन थेट बँक खात्यात.\n• **संजय गांधी निराधार योजना:** निराधार वृद्ध, विधवा व ४०% पेक्षा अधिक अपंगत्व असणाऱ्या व्यक्तींना मासिक पेन्शन.\n• **लागणारी कागदपत्रे:** वयाचा दाखला (आधार/शाळा सोडल्याचा दाखला), तहसीलदारांचा उत्पन्न दाखला आणि अधिवास प्रमाणपत्र."
    },
    "action": {
      "text": {
        "en": "Check Senior Schemes",
        "hi": "वरिष्ठ नागरिक योजनाएं",
        "mr": "ज्येष्ठ नागरिक योजना पहा"
      },
      "page": "services",
      "cat": "senior"
    }
  },
  {
    "keywords": [
      "senior id",
      "st bus",
      "st bus concession",
      "bus concession",
      "75 years free",
      "senior bus",
      "senior bus concession",
      "travel discount",
      "st bus discount",
      "bus free",
      "free travel",
      "msrtc free",
      "senior concession",
      "ज्येष्ठ नागरिक ओळखपत्र",
      "एसटी बस सवलत",
      "senior citizen card",
      "msrtc concession"
    ],
    "response": {
      "en": "🎫 **Senior Citizen ID Card & Travel Concessions:**\n• **MSRTC / ST Bus Concession:** Senior citizens aged 65 to 74 get **50% discount** on all state transport buses; citizens aged **75 and above travel 100% FREE** across Maharashtra!\n• **How to apply:** Apply online on e-Samanvit or through the local Tahsildar / Social Welfare office with your Aadhaar and 2 photographs.",
      "hi": "🎫 **वरिष्ठ नागरिक पहचान पत्र एवं यात्रा छूट:**\n• **एसटी बस यात्रा में छूट:** 65 से 74 वर्ष के बुजुर्गों को महाराष्ट्र एसटी बसों में **50% छूट** मिलती है, तथा **75 वर्ष या उससे अधिक आयु के नागरिक 100% मुफ्त यात्रा** कर सकते हैं!\n• **पहचान पत्र कैसे बनाएं:** ई-समन्वित पर आधार कार्ड व फोटो अपलोड कर ऑनलाइन आवेदन करें।",
      "mr": "🎫 **ज्येष्ठ नागरिक ओळखपत्र व एसटी बस प्रवास सवलत:**\n• **एसटी बस प्रवास सवलत:** ६५ ते ७४ वयोगटातील ज्येष्ठ नागरिकांना एसटी बसेसमध्ये **५०% सवलत**, तर **७५ वर्षे व त्यावरील नागरिकांना १००% मोफत प्रवास** उपलब्ध!\n• **ओळखपत्र कसे काढावे:** ई-समन्वित पोर्टलवरून आधार कार्ड व फोटो जोडून ऑनलाइन अर्ज करता येतो."
    },
    "action": {
      "text": {
        "en": "Senior Citizen Portal",
        "hi": "वरिष्ठ नागरिक सेवाएं",
        "mr": "ज्येष्ठ नागरिक सेवा पहा"
      },
      "page": "services",
      "cat": "senior"
    }
  },
  {
    "keywords": [
      "housing",
      "house",
      "home",
      "gharkul",
      "awas",
      "shelter",
      "घरकूल",
      "आवास",
      "घर",
      "मकान",
      "housing scheme",
      "pucca makaan"
    ],
    "response": {
      "en": "🏡 **Housing & Shelter Schemes:**\nEnsuring every underprivileged family in Maharashtra has a permanent pucca house:\n• **Pradhan Mantri Awas Yojana (PMAY):** Financial subsidy up to ₹2,50,000 for urban & rural pucca house construction.\n• **Ramai Awas Yojana:** State housing assistance for Scheduled Caste (SC) and Neo-Buddhist families.\n• **Shabari Awas Yojana:** Dedicated housing scheme for tribal (ST) families in forest & rural pockets.",
      "hi": "🏡 **आवास एवं गृहनिर्माण योजनाएं:**\nमहाराष्ट्र के प्रत्येक बेघर व कच्चे मकान में रहने वाले परिवार को पक्का मकान देने की योजनाएं:\n• **प्रधानमंत्री आवास योजना (PMAY):** ग्रामीण व शहरी परिवारों को पक्का घर बनाने हेतु ₹2.5 लाख तक की सब्सिडी।\n• **रमाई आवास योजना:** अनुसूचित जाति एवं नवबौद्ध परिवारों के लिए विशेष पक्का घर योजना।\n• **शबरी आवास योजना:** आदिवासी (ST) परिवारों के लिए समर्पित घरकुल योजना।",
      "mr": "🏡 **गृहनिर्माण व घरकुल योजना:**\nमहाराष्ट्रातील बेघर व कच्च्या घरात राहणाऱ्या प्रत्येक कुटुंबाला हक्काचे पक्के घर देण्याच्या योजना:\n• **प्रधानमंत्री आवास योजना (PMAY):** ग्रामीण व शहरी भागात पक्के घर बांधण्यासाठी ₹२.५ लाखांपर्यंत शासकीय अनुदान.\n• **रमाई आवास योजना:** अनुसूचित जाती व नवबौद्ध घटकांसाठी राज्य शासनाची घरकुल योजना.\n• **शबरी आदिवासी घरकुल योजना:** दुर्गम व ग्रामीण भागातील आदिवासी बांधवांसाठी पक्के घर योजना."
    },
    "action": {
      "text": {
        "en": "View Housing Schemes",
        "hi": "आवास योजनाएं देखें",
        "mr": "घरकुल योजना पहा"
      },
      "page": "services",
      "cat": "housing"
    }
  },
  {
    "keywords": [
      "pmay",
      "pradhan mantri awas",
      "2.5 lakh",
      "pucca house",
      "प्रधानमंत्री आवास",
      "पीएमएवाय",
      "pmay urban",
      "pmay gramin"
    ],
    "response": {
      "en": "🧱 **Pradhan Mantri Awas Yojana (PMAY Urban & Gramin):**\n• **Subsidy:** Direct bank assistance up to **₹2,50,000** for building a 25 sq. meter pucca concrete home with toilet and water facility.\n• **Eligibility:** Families without a pucca house anywhere in India. The house must be registered in the name of the female head of the family or jointly.\n• **Stages:** Grant is disbursed in installments linked to construction geo-tagged stages (Plinth → Lintel → Roof → Completion).",
      "hi": "🧱 **प्रधानमंत्री आवास योजना (PMAY ग्रामीण व शहरी):**\n• **अनुदान राशि:** शौचालय व बिजली युक्त पक्का घर बनाने के लिए सीधे बैंक खाते में **₹2,50,000 तक की सहायता**।\n• **पात्रता:** ऐसा परिवार जिसके पास भारत में कहीं भी पक्का मकान न हो। मकान का मालिकाना हक परिवार की महिला मुखिया के नाम या संयुक्त रूप से होना अनिवार्य है।\n• **भुगतान:** निर्माण कार्य की प्रगति के अनुसार 3-4 किश्तों में जियो-टैगिंग के बाद सीधे खाते में राशि आती है।",
      "mr": "🧱 **प्रधानमंत्री आवास योजना (PMAY ग्रामीण व शहरी):**\n• **अनुदान रक्कम:** शौचालय व नळ जोडणीसह पक्के घर बांधण्यासाठी **₹२,५०,००० पर्यंत थेट शासकीय अनुदान**.\n• **पात्रता:** ज्या कुटुंबाच्या नावावर भारतात कुठेही पक्के घर नाही. घराची मालकी घरातील महिला प्रमुखाच्या नावावर किंवा संयुक्त असणे आवश्यक.\n• **हप्ते:** बांधकामाच्या टप्प्यांनुसार (पाया → भिंती → स्लॅब → पूर्णत्व) जिओ-टॅगिंगनंतर थेट बँक खात्यात अनुदान जमा."
    },
    "action": {
      "text": {
        "en": "Explore Housing Schemes",
        "hi": "आवास योजनाएं देखें",
        "mr": "घरकुल योजना पहा"
      },
      "page": "services",
      "cat": "housing"
    }
  },
  {
    "keywords": [
      "ramai awas",
      "shabari awas",
      "sc housing",
      "st housing",
      "रमाई आवास",
      "शबरी घरकुल",
      "ramai gharkul",
      "shabari gharkul"
    ],
    "response": {
      "en": "🛖 **Ramai & Shabari Awas Yojana (Maharashtra State Schemes):**\n• **Ramai Awas Yojana:** Designed specifically for Scheduled Caste (SC) and Neo-Buddhist families living in rural/urban areas without pucca homes.\n• **Shabari Awas Yojana:** Tailored for Scheduled Tribe (ST) tribal families across forest and rural blocks of Maharashtra.\n• **Grant Amount:** Up to ₹2.5 Lakhs disbursed in verified construction stages.",
      "hi": "🛖 **रमाई एवं शबरी आवास योजना (महाराष्ट्र शासन):**\n• **रमाई आवास योजना:** महाराष्ट्र के अनुसूचित जाति (SC) एवं नवबौद्ध परिवारों के पक्के मकान के लिए समर्पित योजना।\n• **शबरी आवास योजना:** राज्य के आदिवासी (ST) वनवासी परिवारों के लिए घरकुल योजना।\n• **अनुदान:** ₹2.5 लाख तक की राशि निर्माण के चरणों के अनुसार सीधे बैंक खाते में दी जाती है।",
      "mr": "🛖 **रमाई व शबरी घरकुल योजना (महाराष्ट्र शासन):**\n• **रमाई आवास योजना:** अनुसूचित जाती (SC) व नवबौद्ध संवर्गातील बेघर कुटुंबांना पक्के घर बांधण्यासाठी समर्पित योजना.\n• **शबरी आदिवासी घरकुल योजना:** राज्यातील आदिवासी (ST) बांधवांसाठी पक्के घर बांधून देण्याची विशेष योजना.\n• **अनुदान:** ₹२.५ लाखांपर्यंतची रक्कम टप्प्याटप्प्याने थेट बँक खात्यात दिली जाते."
    },
    "action": {
      "text": {
        "en": "View Housing Schemes",
        "hi": "घरकुल योजनाएं देखें",
        "mr": "घरकुल योजना पहा"
      },
      "page": "services",
      "cat": "housing"
    }
  },
  {
    "keywords": [
      "7/12",
      "satbara",
      "8a",
      "mahabhulekh",
      "land extract",
      "gut number",
      "survey number",
      "सातबारा",
      "८अ",
      "महाभूलेख",
      "जमीन",
      "satbara kasa kadhava",
      "land record download"
    ],
    "response": {
      "en": "📜 **7/12 (Satbara) & 8A Digitally Signed Land Records:**\n• **What is Satbara?** The official agricultural land register extract issued by the Maharashtra Revenue Department showing land ownership, survey/gut numbers, area, and crop cultivation history.\n• **Digital Download:** Download digitally signed 7/12 and 8A extracts instantly via **Mahabhulekh** integration on e-Samanvit.\n• **Validity:** Digitally signed extracts with QR codes are 100% legally valid for bank loans, court registries, and subsidies.",
      "hi": "📜 **7/12 (सातबारा) एवं 8A डिजिटल भूलेख उतारा:**\n• **सातबारा क्या है?** महाराष्ट्र राजस्व विभाग द्वारा जारी जमीन का कानूनी दस्तावेज, जिसमें भूमि मालिक का नाम, गट क्रमांक, क्षेत्रफल और फसल की जानकारी दर्ज होती है।\n• **डिजिटल डाउनलोड:** ई-समन्वित पर **महाभूलेख** के माध्यम से डिजिटल रूप से हस्ताक्षरित 7/12 एवं 8A मिनटों में डाउनलोड करें।\n• **मान्यता:** क्यूआर कोड युक्त डिजिटल सातबारा सभी बैंकों, अदालतों और सरकारी योजनाओं में 100% मान्य है।",
      "mr": "📜 **७/१२ (सातबारा) व ८अ डिजिटल स्वाक्षरीत उतारा:**\n• **सातबारा म्हणजे काय?** महसूल विभागाकडील जमिनीचा अधिकृत हक्कनोंदणी उतारा, ज्यामध्ये जमीनमालकाचे नाव, गट नंबर, क्षेत्रफळ व पिकांची नोंद असते.\n• **डिजिटल डाउनलोड:** ई-समन्वितवर **महाभूलेख** प्रणालीद्वारे डिजिटल स्वाक्षरी असलेला ७/१२ व ८अ उतारा तत्काळ डाउनलोड करा.\n• **वैधता:** क्यूआर कोड असलेला हा डिजिटल उतारा बँक कर्ज, शासकीय अनुदान व न्यायालयासाठी पूर्णपणे कायदेशीर आहे."
    },
    "action": {
      "text": {
        "en": "Access Land & Revenue Services",
        "hi": "राजस्व सेवाएं देखें",
        "mr": "महसूल सेवा पहा"
      },
      "page": "services"
    }
  },
  {
    "keywords": [
      "income certificate",
      "tahsildar",
      "income proof",
      "annual income",
      "उत्पन्न दाखला",
      "आय प्रमाण पत्र",
      "तहसीलदार उत्पन्न",
      "income certificate time",
      "income cert process"
    ],
    "response": {
      "en": "📑 **Income Certificate (Revenue Department / Aaple Sarkar):**\n• **Purpose:** Required to determine eligibility for scholarships, Ladki Bahin, fee waivers, and PMAY subsidies.\n• **Issuing Authority:** Tahsildar / Sub-Divisional Officer.\n• **Processing Time:** **7 working days**.\n• **Required Docs:** Aadhaar card, ration card, previous year income declaration, or electricity bill. Download directly to DigiLocker once issued!",
      "hi": "📑 **तहसीलदार आय प्रमाण पत्र (राजस्व विभाग):**\n• **उपयोग:** छात्रवृत्ति, लाडकी बहीण योजना, कॉलेज फीस माफी और आवास योजना हेतु आय प्रमाण पत्र अनिवार्य होता है।\n• **जारीकर्ता:** तहसीलदार / उप-विभागीय अधिकारी।\n• **समय सीमा:** **7 कार्यदिवस**।\n• **दस्तावेज:** आधार कार्ड, राशन कार्ड, आय स्व-घोषणा पत्र। जारी होते ही इसे डिजिलॉकर से डाउनलोड किया जा सकता है!",
      "mr": "📑 **तहसीलदार उत्पन्न दाखला (महसूल विभाग / आपले सरकार):**\n• **उपयोग:** शिष्यवृत्ती, लाडकी बहीण योजना, शैक्षणिक फी सवलत व घरकुल अनुदानासाठी उत्पन्न दाखला आवश्यक असतो.\n• **देणारे अधिकारी:** तहसीलदार / उपविभागीय अधिकारी.\n• **कालावधी:** **७ कामाचे दिवस**.\n• **लागणारी कागदपत्रे:** आधार कार्ड, रेशन कार्ड, स्वयंघोषणापत्र. तयार झाल्यावर थेट डिजीलॉकरमधून डाउनलोड करता येतो!"
    },
    "action": {
      "text": {
        "en": "Explore Certificates",
        "hi": "प्रमाणपत्र सेवाएं देखें",
        "mr": "दाखले सेवा पहा"
      },
      "page": "services"
    }
  },
  {
    "keywords": [
      "domicile",
      "residence certificate",
      "15 years",
      "nationality",
      "अधिवास प्रमाणपत्र",
      "रहिवासी दाखला",
      "डोमिसाइल",
      "domicile certificate maharashtra",
      "age and nationality"
    ],
    "response": {
      "en": "🇮🇳 **Domicile & Age Nationality Certificate:**\n• **Requirement:** Proof that the applicant has continuously resided in Maharashtra for **at least 15 years**.\n• **Importance:** Mandatory for all Maharashtra Government job recruitments (MPSC, Mega Bharti) and 85% state quota admissions in Medical (NEET) and Engineering (MHT-CET) colleges.\n• **Processing Time:** **12 working days**.",
      "hi": "🇮🇳 **अधिवास एवं राष्ट्रीयता प्रमाणपत्र (Domicile Certificate):**\n• **शर्त:** आवेदक का कम से कम **15 वर्षों से महाराष्ट्र में निरंतर निवास** होना आवश्यक है।\n• **उपयोग:** महाराष्ट्र सरकार की सभी सरकारी नौकरियों (एमपीएससी, पुलिस भर्ती) तथा मेडिकल/इंजीनियरिंग में 85% राज्य कोटे की सीटों के लिए अनिवार्य।\n• **समय सीमा:** **12 कार्यदिवस**।",
      "mr": "🇮🇳 **अधिवास व राष्ट्रीयत्व प्रमाणपत्र (Domicile Certificate):**\n• **अट:** अर्जदाराचे महाराष्ट्रात **किमान १५ वर्षे सलग वास्तव्य** असणे आवश्यक आहे.\n• **महत्त्व:** राज्यातील सर्व शासकीय नोकरभरती (MPSC, पोलीस भरती) तसेच मेडिकल (NEET) व इंजिनिअरिंग (MHT-CET) च्या ८५% राज्य कोट्यातील प्रवेशासाठी अनिवार्य.\n• **कालावधी:** **१२ कामाचे दिवस**."
    },
    "action": {
      "text": {
        "en": "Check Certificate Services",
        "hi": "प्रमाणपत्र सेवाएं देखें",
        "mr": "दाखले सेवा पहा"
      },
      "page": "services"
    }
  },
  {
    "keywords": [
      "caste certificate",
      "caste validity",
      "non creamy layer",
      "obc",
      "sc",
      "st",
      "sebc",
      "जात प्रमाणपत्र",
      "जात वैधता",
      "जाति प्रमाण पत्र",
      "caste validity process"
    ],
    "response": {
      "en": "🏷️ **Caste Certificate & Caste Validity:**\n• **Caste Certificate:** Issued by the Sub-Divisional Officer (SDO) verifying Scheduled Caste (SC), Scheduled Tribe (ST), VJNT, OBC, or SEBC category.\n• **Caste Validity Certificate:** Mandatory for college admissions and contesting local elections; scrutinized by the District Caste Scrutiny Committee.\n• **Non-Creamy Layer (NCL):** Valid for 3 financial years for OBC/VJNT/SEBC candidates with family income below ₹8 Lakhs.",
      "hi": "🏷️ **जाति प्रमाण पत्र एवं जाति वैधता (Caste Validity):**\n• **जाति प्रमाण पत्र:** उप-विभागीय अधिकारी (SDO) द्वारा एससी, एसटी, ओबीसी, एसईबीसी वर्ग के लिए जारी।\n• **जाति वैधता प्रमाण पत्र:** कॉलेज प्रवेश एवं सरकारी आरक्षण के लिए जिला जाति पड़ताल समिति द्वारा जारी।\n• **नॉन-क्रीमी लेयर (NCL):** ₹8 लाख से कम वार्षिक आय वाले ओबीसी छात्रों के लिए 3 वर्ष की वैधता।",
      "mr": "🏷️ **जात प्रमाणपत्र व जात वैधता प्रमाणपत्र (Caste Validity):**\n• **जात प्रमाणपत्र:** उपविभागीय अधिकारी (SDO) यांच्याकडून SC, ST, VJNT, OBC, SEBC प्रवर्गासाठी दिले जाते.\n• **जात वैधता प्रमाणपत्र (Validity):** व्यावसायिक महाविद्यालयीन प्रवेश व निवडणुकीसाठी जिल्हा जात पडताळणी समितीकडून दिले जाते.\n• **नॉन-क्रिमीलेअर (NCL):** ₹८ लाखांपेक्षा कमी कौटुंबिक उत्पन्न असणाऱ्या उमेदवारांसाठी ३ वर्षांसाठी वैध असते."
    },
    "action": {
      "text": {
        "en": "Explore Certificates",
        "hi": "प्रमाणपत्र सेवाएं देखें",
        "mr": "दाखले सेवा पहा"
      },
      "page": "services"
    }
  },
  {
    "keywords": [
      "ration card",
      "pds",
      "food grain",
      "ration dukan",
      "one nation one ration",
      "रेशन कार्ड",
      "राशन कार्ड",
      "धान्य",
      "ration card ekyc",
      "annapurna"
    ],
    "response": {
      "en": "🌾 **Ration Card & Food Security (One Nation One Ration Card):**\n• **Aadhaar e-KYC:** Linking Aadhaar with Ration Card allows eligible citizens to collect subsidized food grains at any PDS Fair Price Shop across India.\n• **Benefits:** Subsidized rice, wheat, and coarse grains for Yellow and Orange ration card holders.\n• Verify and link your biometric consent through the e-Samanvit portal or visit your nearest Fair Price Shop.",
      "hi": "🌾 **राशन कार्ड एवं खाद्य सुरक्षा (वन नेशन वन राशन कार्ड):**\n• **आधार ई-केवाईसी:** राशन कार्ड को आधार से लिंक करने पर पूरे भारत में किसी भी उचित मूल्य की दुकान (PDS) से राशन प्राप्त किया जा सकता है।\n• **लाभ:** पीला और केसरी राशन कार्ड धारकों को रियायती दर पर गेंहू, चावल व मोटा अनाज।\n• ई-समन्वित पोर्टल पर अपनी राशन कार्ड स्थिति आसानी से सत्यापित करें।",
      "mr": "🌾 **रेशन कार्ड व अन्न सुरक्षा (वन नेशन वन रेशन कार्ड):**\n• **आधार ई-केवायसी:** रेशन कार्ड आधारशी जोडल्यास देशात कुठेही कोणत्याही रास्त भाव दुकानातून अनुदानित धान्य घेता येते.\n• **लाभ:** पिवळे व केशरी रेशन कार्ड असणाऱ्या नागरिकांना सवलतीच्या दरात गहू, तांदूळ व अन्नधान्य.\n• ई-समन्वित पोर्टलवरून आपल्या रेशन कार्डची जोडणी स्थिती त्वरित तपासा."
    },
    "action": {
      "text": {
        "en": "Food Security Services",
        "hi": "खाद्य सुरक्षा सेवाएं देखें",
        "mr": "अन्न सुरक्षा सेवा पहा"
      },
      "page": "services"
    }
  },
  {
    "keywords": [
      "job",
      "employment",
      "skill india",
      "rojgar melava",
      "job fair",
      "mahaskills",
      "ncs",
      "रोजगार मेळावा",
      "नोकरी",
      "कौशल्य विकास",
      "बेरोजगारी",
      "job search",
      "skill course"
    ],
    "response": {
      "en": "💼 **Employment & Skill India Programs:**\n• **MahaSkills Registration:** Register on the Maharashtra State Employment Exchange to access verified job openings and government placement alerts.\n• **Rojgar Melava (Mega Job Fairs):** Regular placement drives held in Pune, Mumbai, Nagpur, and Sambhajinagar with 10,000+ vacancies.\n• **Free Skill India Courses:** Certified vocational courses in IT, solar installation, digital marketing, electrical, and drone operation under the Resources tab.",
      "hi": "💼 **रोजगार एवं कौशल विकास (Skill India):**\n• **महा-स्किल्स पंजीयन:** महाराष्ट्र रोजगार विनिमय केंद्र पर पंजीयन कर राज्य सरकार व निजी क्षेत्र की नौकरियों की सूचना पाएं।\n• **रोजगार मेला (Mega Job Fair):** पुणे, मुंबई, नागपुर आदि में आयोजित होने वाले रोजगार मेलों में सीधी भर्ती।\n• **मुफ्त कौशल पाठ्यक्रम:** कंप्यूटर, सोलर इंस्टॉलेशन, डिजिटल मार्केटिंग एवं व्यावसायिक ट्रेड्स में सरकारी प्रमाणपत्र कोर्सेज।",
      "mr": "💼 **रोजगार व कौशल्य विकास (Skill India):**\n• **महा-स्किल्स नोंदणी:** महाराष्ट्र रोजगार सेवा केंद्रावर नोंदणी करून शासकीय व खाजगी क्षेत्रातील नोकऱ्यांच्या संधी मिळवा.\n• **पंडित दीनदयाळ उपाध्याय रोजगार मेळावे:** पुणे, मुंबई, नागपूर, छत्रपती संभाजीनगर येथे थेट मुलाखती व भरती मेळावे.\n• **मोफत कौशल्य कोर्सेस:** सौर ऊर्जा, आयटी, इलेक्ट्रिकल व व्यावसायिक प्रशिक्षणाचे मोफत प्रमाणपत्र कोर्सेस उपलब्ध."
    },
    "action": {
      "text": {
        "en": "Open Skill India Resources",
        "hi": "कौशल्य पाठ्यक्रम देखें",
        "mr": "कौशल्य कोर्सेस पहा"
      },
      "page": "resources"
    }
  },
  {
    "keywords": [
      "districts",
      "36 districts",
      "all districts",
      "pune",
      "mumbai",
      "nagpur",
      "nashik",
      "coverage",
      "जिल्हे",
      "३६ जिल्हे",
      "जिले",
      "कोणत्या जिल्ह्यात",
      "which districts"
    ],
    "response": {
      "en": "🗺️ **Integrated Coverage Across All 36 Districts of Maharashtra:**\ne-Samanvit serves every citizen across all administrative divisions of Maharashtra:\n• **Konkan:** Mumbai City, Mumbai Suburban, Thane, Palghar, Raigad, Ratnagiri, Sindhudurg\n• **Pune Division:** Pune, Satara, Sangli, Kolhapur, Solapur\n• **Nashik Division:** Nashik, Dhule, Nandurbar, Jalgaon, Ahmednagar\n• **Chhatrapati Sambhajinagar (Marathwada):** Sambhajinagar, Jalna, Parbhani, Hingoli, Nanded, Beed, Latur, Dharashiv\n• **Nagpur Division (Vidarbha):** Nagpur, Wardha, Bhandara, Gondia, Chandrapur, Gadchiroli\n• **Amravati Division:** Amravati, Akola, Yavatmal, Buldhana, Washim",
      "hi": "🗺️ **महाराष्ट्र के सभी 36 जिलों में पूर्ण सेवाएं उपलब्ध:**\nई-समन्वित पोर्टल राज्य के सभी 6 प्रशासनिक संभागों और 36 जिलों में सक्रिय है:\n• **कोंकण:** मुंबई शहर, मुंबई उपनगर, ठाणे, पालघर, रायगढ़, रत्नागिरी, सिंधुदुर्ग\n• **पुणे संभाग:** पुणे, सातारा, सांगली, कोल्हापुर, सोलापुर\n• **नाशिक संभाग:** नाशिक, धुले, नंदुरबार, जलगांव, अहमदनगर\n• **छत्रपति संभाजीनगर (मराठवाड़ा):** संभाजीनगर, जालना, परभणी, हिंगोली, नांदेड़, बीड, लातूर, धाराशिव\n• **नागपुर संभाग (विदर्भ):** नागपुर, वर्धा, भंडारा, गोंदिया, चंद्रपुर, गड़चिरोली\n• **अमरावती संभाग:** अमरावती, अकोला, यवतमाल, बुलढाणा, वाशिम",
      "mr": "🗺️ **महाराष्ट्रातील सर्व ३६ जिल्ह्यांमध्ये एकात्मिक सेवा:**\nई-समन्वित पोर्टल राज्यातील सर्व ६ महसूल विभाग आणि ३६ जिल्ह्यांमध्ये कार्यरत आहे:\n• **कोकण:** मुंबई शहर, मुंबई उपनगर, ठाणे, पालघर, रायगड, रत्नागिरी, सिंधुदुर्ग\n• **पुणे विभाग:** पुणे, सातारा, सांगली, कोल्हापूर, सोलापूर\n• **नाशिक विभाग:** नाशिक, धुळे, नंदुरबार, जळगाव, अहमदनगर\n• **छत्रपती संभाजीनगर (मराठवाडा):** संभाजीनगर, जालना, परभणी, हिंगोली, नांदेड, बीड, लातूर, धाराशिव\n• **नागपूर विभाग (विदर्भ):** नागपूर, वर्धा, भंडारा, गोंदिया, चंद्रपूर, गडचिरोली\n• **अमरावती विभाग:** अमरावती, अकोला, यवतमाळ, बुलढाणा, वाशिम"
    }
  },
  {
    "keywords": [
      "helpline",
      "toll free",
      "phone number",
      "contact number",
      "email",
      "mantralaya address",
      "office address",
      "support hours",
      "संपर्क",
      "फोन नंबर",
      "हेल्पलाइन",
      "मंत्रालय पत्ता",
      "tollfree",
      "customer care"
    ],
    "response": {
      "en": "📞 **Official Citizen Helpline & Contact Details:**\n• **Toll-Free Citizen Helpline:** **1800-120-8040** (24/7 Citizen Support)\n• **National Portal Support:** **1800-180-1551**\n• **Emergency Ambulance:** **108**\n• **Women in Distress Helpline:** **181**\n• **Support Email:** helpdesk@esamanvit.gov.in\n• **Headquarters Address:** Directorate of Public Services Delivery, Mantralaya, Nariman Point, Mumbai, Maharashtra - 400032.\n• **Support Timings:** Monday to Saturday, 9:00 AM – 6:00 PM IST (Helplines active 24/7).",
      "hi": "📞 **आधिकारिक नागरिक हेल्पलाइन एवं संपर्क विवरण:**\n• **टोल-फ्री नागरिक हेल्पलाइन:** **1800-120-8040** (24 घंटे उपलब्ध)\n• **राष्ट्रीय पोर्टल सहायता:** **1800-180-1551**\n• **आपातकालीन एम्बुलेंस:** **108**\n• **महिला सुरक्षा हेल्पलाइन:** **181**\n• **ईमेल:** helpdesk@esamanvit.gov.in\n• **मुख्यालय:** लोकसेवा वितरण संचालनालय, मंत्रालय, नरीमन पॉइंट, मुंबई - 400032।\n• **कार्य समय:** सोमवार से शनिवार, सुबह 9:00 बजे से शाम 6:00 बजे तक।",
      "mr": "📞 **अधिकृत नागरिक मदत केंद्र व संपर्क तपशील:**\n• **टोल-फ्री नागरिक हेल्पलाइन:** **१८००-१२०-८०४०** (२४/७ सेवा)\n• **राष्ट्रीय पोर्टल मदत कक्ष:** **१८००-१८०-१५५१**\n• **तातडीची रुग्णवाहिका:** **१०८**\n• **महिला हेल्पलाइन:** **१८१**\n• **ईमेल पत्ता:** helpdesk@esamanvit.gov.in\n• **मुख्यालय:** लोकसेवा हक्क संचालनालय, मंत्रालय, नरिमन पॉइंट, मुंबई - ४०००३२.\n• **कार्यालयीन वेळ:** सोमवार ते शनिवार, सकाळी ९:०० ते संध्याकाळी ६:०० (हेल्पलाइन २४ तास)."
    },
    "action": {
      "text": {
        "en": "Go to Contact Helpdesk",
        "hi": "सहायता केंद्र संपर्क",
        "mr": "मदत केंद्र संपर्क"
      },
      "page": "contact"
    }
  },
  {
    "keywords": [
      "complaint",
      "grievance",
      "cpgrams",
      "officer",
      "problem",
      "takraar",
      "shikayat",
      "तक्रार",
      "शिकायत",
      "फीडबॅक",
      "निवारण",
      "lodge complaint",
      "officer delay"
    ],
    "response": {
      "en": "📢 **Public Grievance Redressal (Aaple Sarkar / CPGRAMS):**\n• **Right to Public Services:** Under the Maharashtra Right to Public Services Act, citizens have the legal right to time-bound service delivery.\n• **Lodge a Complaint:** If an officer delays your application or demands physical presence, lodge a complaint directly on the Contact page under \"Public Grievance\".\n• **Tracking:** You receive an immediate Grievance Ticket ID with mandatory resolution within **15 to 30 working days**.",
      "hi": "📢 **लोक शिकायत निवारण (आपले सरकार / CPGRAMS):**\n• **लोकसेवा अधिकार:** महाराष्ट्र लोकसेवा अधिकार अधिनियम के तहत नागरिकों को समयबद्ध सेवा पाने का कानूनी अधिकार है।\n• **शिकायत दर्ज करें:** यदि कोई अधिकारी आवेदन में अकारण देरी करे, तो Contact पृष्ठ पर 'Grievance' विकल्प चुनकर सीधी शिकायत दर्ज करें।\n• **ट्रैकिंग:** आपको एक शिकायत टिकट आईडी मिलती है, जिसका निवारण **15 से 30 कार्यदिवसों** में अनिवार्य रूप से किया जाता है।",
      "mr": "📢 **लोक तक्रार निवारण (आपले सरकार / CPGRAMS):**\n• **लोकसेवा हमी हक्क:** महाराष्ट्र लोकसेवा हक्क अधिनियमानुसार प्रत्येक नागरिकाला विहित वेळेत सेवा मिळण्याचा कायदेशीर अधिकार आहे.\n• **तक्रार कशी नोंदवावी:** अर्जास अकारण विलंब झाल्यास Contact पृष्ठावरून थेट तक्रार नोंदवा.\n• **ट्रॅकिंग:** आपल्याला तक्रार तिकीट क्रमांक मिळतो आणि **१५ ते ३० दिवसांत** तक्रारीचे निवारण करणे प्रशासनावर बंधनकारक असते."
    },
    "action": {
      "text": {
        "en": "Submit Grievance on Contact Page",
        "hi": "शिकायत दर्ज करें",
        "mr": "तक्रार नोंदवा"
      },
      "page": "contact"
    }
  },
  {
    "keywords": [
      "language",
      "marathi",
      "hindi",
      "english",
      "change language",
      "bhasha",
      "भाषा",
      "मराठी",
      "हिंदी",
      "भाषा बदला",
      "marathi madhe sanga",
      "hindi me batao"
    ],
    "response": {
      "en": "🌐 **Multilingual Language Support:**\n• e-Samanvit is available in **Marathi (मराठी)**, **Hindi (हिंदी)**, and **English**.\n• **How to switch?**\n  1. Click on the language buttons at the top right of the website navigation bar.\n  2. Or inside this MITRA chat window, click the **मरा**, **हिं**, or **EN** buttons in the header bar!",
      "hi": "🌐 **बहुभाषी सुविधा (भाषा कैसे बदलें):**\n• ई-समन्वित पोर्टल **मराठी (मराठी)**, **हिंदी (हिंदी)** और **अंग्रेजी** में उपलब्ध है।\n• **भाषा कैसे बदलें?**\n  1. वेबसाइट के शीर्ष-दाएं कोने में स्थित भाषा बटन पर क्लिक करें।\n  2. या इसी चैट विंडो के शीर्ष पर बने **मरा**, **हिं** या **EN** बटन पर क्लिक करें!",
      "mr": "🌐 **भाषा बदलण्याची सोय:**\n• ई-समन्वित पोर्टल **मराठी**, **हिंदी** व **इंग्रजी** अशा तिन्ही भाषांमध्ये उपलब्ध आहे.\n• **भाषा कशी बदलावी?**\n  1. संकेतस्थळाच्या वरील उजव्या कोपऱ्यातील भाषा बटनावर क्लिक करा.\n  2. किंवा या चॅट विंडोच्या वरील हेडरमधील **मरा**, **हिं** किंवा **EN** बटनावर क्लिक करून तत्काळ भाषा बदला!"
    }
  },
  {
    "keywords": [
      "dark mode",
      "light mode",
      "theme",
      "black screen",
      "night mode",
      "डार्क मोड",
      "थीम",
      "स्क्रीन काळी",
      "light theme",
      "dark theme"
    ],
    "response": {
      "en": "🌙 **Theme Toggle (Dark Mode & Light Mode):**\n• **Eye Comfort:** You can switch between Light Mode and Dark Mode anytime.\n• **How to Toggle:** Click the **Sun / Moon icon button** in the top navigation bar (next to the language buttons). The entire site and this chat widget will adapt instantly!",
      "hi": "🌙 **डार्क मोड एवं थीम बदलने की सुविधा:**\n• **सुविधाजनक डिस्प्ले:** आप दिन या रात के अनुसार लाइट मोड और डार्क मोड में बदल सकते हैं।\n• **कैसे बदलें:** शीर्ष नेविगेशन बार में दिए गए **सूर्य / चंद्र (Sun/Moon) आइकन** पर क्लिक करें। पूरा पोर्टल और यह चैट सहायक तुरंत डार्क मोड में बदल जाएगा!",
      "mr": "🌙 **डार्क मोड व थीम बदलण्याची सोय:**\n• **डोळ्यांसाठी आरामदायी:** आपण कधीही लाइट मोड किंवा डार्क मोडमध्ये संकेतस्थळ पाहू शकता.\n• **कसा बदलावा:** मुख्य नेव्हिगेशन बारमधील **सूर्य / चंद्र (Sun/Moon) आयकॉन** बटनावर क्लिक करा. संपूर्ण पोर्टल व हा चॅट सहाय्यक तत्काळ डार्क मोडमध्ये रूपांतरित होईल!"
    }
  },
  {
    "keywords": [
      "download",
      "handbook",
      "guidelines",
      "manual",
      "circular",
      "pdf",
      "मॅन्युअल",
      "मार्गदर्शिका",
      "डाउनलोड",
      "download guide",
      "circular pdf"
    ],
    "response": {
      "en": "📑 **Download Government Handbooks & Resources:**\nUnder the **Resources** tab, you can download official PDF handbooks:\n• PM-KISAN Operational Guidelines\n• National Scholarship Portal (NSP) Manual\n• Pradhan Mantri Fasal Bima Claim Procedure\n• Kisan Credit Card Application Handbook\n• NCERT & Balbharati E-Books and MPSC preparation materials.",
      "hi": "📑 **सरकारी हैंडबुक एवं मार्गदर्शिका डाउनलोड करें:**\nपोर्टल के **Resources** पृष्ठ पर जाकर आप आधिकारिक पीडीएफ डाउनलोड कर सकते हैं:\n• पीएम-किसान परिचालन मार्गदर्शिका\n• नेशनल स्कॉलरशिप पोर्टल (NSP) हैंडबुक\n• फसल बीमा दावा प्रक्रिया गाइड\n• किसान क्रेडिट कार्ड आवेदन नियमावली\n• एनसीईआरटी पुस्तकें एवं प्रतियोगी परीक्षा अध्ययन सामग्री।",
      "mr": "📑 **शासकीय मार्गदर्शिका व पुस्तके डाउनलोड करा:**\nपोर्टलच्या **Resources** विभागात सर्व प्रमुख शासकीय मार्गदर्शिका PDF स्वरूपात उपलब्ध आहेत:\n• पीएम-किसान योजना मार्गदर्शिका\n• नॅशनल स्कॉलरशिप पोर्टल (NSP) मॅन्युअल\n• पीक विमा दावा प्रक्रिया पुस्तिका\n• किसान क्रेडिट कार्ड अर्ज नियमावली\n• बालभारती ई-पुस्तके व स्पर्धा परीक्षा अभ्यास साहित्य."
    },
    "action": {
      "text": {
        "en": "Open Resources Page",
        "hi": "संसाधन पृष्ठ खोलें",
        "mr": "मार्गदर्शिका डाउनलोड करा"
      },
      "page": "resources"
    }
  },
  {
    "keywords": [
      "privacy",
      "security",
      "safe",
      "data protection",
      "encryption",
      "aadhar safe",
      "सुरक्षित",
      "डेटा सुरक्षा",
      "गोपनीयता",
      "is my data safe",
      "cyber security"
    ],
    "response": {
      "en": "🔒 **Data Privacy & Citizen Security:**\n• **Enterprise Encryption:** e-Samanvit uses 256-bit TLS/SSL encryption for all data transmissions.\n• **Explicit Citizen Consent:** Your Aadhaar, land records, or income data is accessed only when you authorize it via OTP.\n• **No Third-Party Sharing:** The portal strictly complies with the Digital Personal Data Protection (DPDP) Act and never shares citizen records with commercial marketing entities.",
      "hi": "🔒 **डेटा सुरक्षा एवं नागरिक गोपनीयता:**\n• **उच्चस्तरीय एन्क्रिप्शन:** ई-समन्वित पोर्टल 256-बिट सुरक्षित एन्क्रिप्शन तकनीक का उपयोग करता है।\n• **नागरिक सहमति अनिवार्य:** आपके आधार या राजस्व रिकॉर्ड केवल आपकी ओटीपी सहमति के बाद ही उपयोग किए जाते हैं।\n• **निजी डेटा साझा नहीं:** आपका कोई भी व्यक्तिगत डेटा किसी भी व्यावसायिक कंपनी से साझा नहीं किया जाता।",
      "mr": "🔒 **डेटा सुरक्षा व नागरिक गोपनीयता:**\n• **उच्चस्तरीय सुरक्षा:** ई-समन्वित पोर्टल २५६-बिट टीएलएस एन्क्रिप्शनद्वारे पूर्णपणे सुरक्षित आहे.\n• **नागरिकांची संमती अनिवार्य:** आधार किंवा महसूल माहिती केवळ आपल्या ओटीपी संमतीनेच पडताळली जाते.\n• **डेटा सुरक्षितता:** कोणताही वैयक्तिक डेटा खाजगी किंवा व्यावसायिक कंपन्यांशी कधीही शेअर केला जात नाही."
    },
    "action": {
      "text": {
        "en": "About e-Samanvit",
        "hi": "पोर्टल सुरक्षा विवरण",
        "mr": "पोर्टलबद्दल माहिती"
      },
      "page": "about"
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
    if (!query) return null;
    const cleanQuery = query.toLowerCase().trim();
    let bestMatch = null;
    let highestScore = 0;

    for (const item of this.knowledge) {
      let score = 0;
      for (const k of item.keywords) {
        const kw = k.toLowerCase().trim();
        if (!kw) continue;

        if (cleanQuery === kw) {
          // Exact full phrase match gets highest boost
          score += 180;
        } else if (kw.length <= 3) {
          // Short acronyms (sc, st, kcc, dbt, otp, 8a, etc.) MUST match as discrete tokens
          const safeKw = kw.replace(/[^a-zA-Z0-9]/g, '\\$&');
          const regex = new RegExp('(?:^|\\s|[.,!?;:()\\/])' + safeKw + '(?:$|\\s|[.,!?;:()\\/])', 'i');
          if (regex.test(cleanQuery)) {
            score += 40;
          }
        } else if (cleanQuery.includes(kw)) {
          // Substring match: multi-word phrases and longer terms get strong weighting
          const wordCount = kw.split(/\s+/).length;
          score += (kw.length * 4) + (wordCount * 25);
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    return highestScore > 0 ? bestMatch : null;
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
    if (cat && typeof navigateToServiceCategory === 'function') {
      navigateToServiceCategory(cat);
    } else if (typeof navigateTo === 'function') {
      navigateTo(page);
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
