// Internationalization utility for English and Hindi
export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation
  nav: {
    profile: string;
    community: string;
    dailyTips: string;
    helpCenter: string;
    tutorial: string;
    home: string;
    stories: string;
  };
  
  // Auth
  auth: {
    login: string;
    register: string;
    signup: string;
    email: string;
    password: string;
    mobileNumber: string;
    magicLink: string;
    sendMagicLink: string;
    loginWithGoogle: string;
    loginWithFacebook: string;
    loginWithApple: string;
    forgotPassword: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    logout: string;
    name: string;
  };
  
  // Homepage
  home: {
    heroQuote: string;
    heroAuthor: string;
    heroAuthorDetail: string;
    heroTextWithYou: string;
    heroTextRedefining: string;
    heroTextLimitlessPossibilities: string;
    redefiningHealing: string;
    redefiningSubtext: string;
    trainingTitle: string;
    trainingDesc: string;
    rehabilitationTitle: string;
    rehabilitationDesc: string;
    findWhatFits: string;
    findWhatFitsDesc: string;
    belowKnee: string;
    aboveKnee: string;
    wheelchair: string;
    closingTitle: string;
    closingSubtext: string;
    membersInCommunity: string;
    joinCommunity: string;
    communityTitle: string;
    communitySubtext: string;
    viewProfile: string;
    connect: string;
    shareStoryTitle: string;
    shareStorySubtext: string;
    shareYourStory: string;
    helpCenterTitle: string;
    helpCenterSubtext: string;
    searchLocation: string;
    centerType: string;
    priceRange: string;
    selectCenterCategory: string;
    viewAll: string;
    statsBMVSS: string;
    statsBMVSSDesc: string;
    statsThroughRehabilitation: string;
    statsCenters: string;
    statsPrivateAndPublic: string;
    statsCentersNationwide: string;
    statsBeneficiaries: string;
    statsBeneficiariesAssisted: string;
    statsThroughCamps: string;
    // Service Centers
    govCentersTitle: string;
    govCentersSubtitle: string;
    ngoCentersTitle: string;
    ngoCentersSubtitle: string;
    privateClinicsTitle: string;
    privateClinicsSubtitle: string;
    govCentersFeature1: string;
    govCentersFeature2: string;
    govCentersFeature3: string;
    ngoCentersFeature1: string;
    ngoCentersFeature2: string;
    ngoCentersFeature3: string;
    privateClinicsFeature1: string;
    privateClinicsFeature2: string;
    privateClinicsFeature3: string;
    // Service Centers Locations
    govCentersLocation: string;
    ngoCentersLocation: string;
    privateClinicsLocation: string;
    // Community Cards
    communityCard1Name: string;
    communityCard1Location: string;
    communityCard1Achievement: string;
    communityCard1ProfileType: string;
    communityCard2Name: string;
    communityCard2Location: string;
    communityCard2Achievement: string;
    communityCard2ProfileType: string;
    communityCard3Name: string;
    communityCard3Location: string;
    communityCard3Achievement: string;
    communityCard3ProfileType: string;
    communityCard4Name: string;
    communityCard4Location: string;
    communityCard4Achievement: string;
    communityCard4ProfileType: string;
    // Community Card Tags
    tagSkincare: string;
    tagFatigue: string;
    tagPhantomPain: string;
    tagDailyTips: string;
    tagSkinCare: string;
    tagAthletics: string;
    tagRehabilitation: string;
    tagSports: string;
    tagCommunity: string;
    tagArt: string;
    tagAccessibility: string;
  };
  
  // Footer
  footer: {
    copyright: string;
    designedForInclusion: string;
    builtForChange: string;
    about: string;
    contact: string;
    privacy: string;
    exploreStories: string;
  };
  
  // User roles
  roles: {
    admin: string;
    contentModerator: string;
    user: string;
    guest: string;
  };
  
  // Admin
  admin: {
    title: string;
    userManagement: string;
    contentModeration: string;
    pendingApprovals: string;
    activateUser: string;
    deactivateUser: string;
    approveContent: string;
    rejectContent: string;
    status: string;
    actions: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    submit: string;
    cancel: string;
    close: string;
    save: string;
    delete: string;
    edit: string;
    view: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      profile: 'Profile',
      community: 'Community',
      dailyTips: 'Daily Tips',
      helpCenter: 'Help Center',
      tutorial: 'Tutorial',
      home: 'Home',
      stories: 'Stories',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      mobileNumber: 'Mobile Number',
      magicLink: 'Magic Link',
      sendMagicLink: 'Send Magic Link',
      loginWithGoogle: 'Login with Google',
      loginWithFacebook: 'Login with Facebook',
      loginWithApple: 'Login with Apple',
      forgotPassword: 'Forgot Password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      logout: 'Logout',
      name: 'Name',
    },
    home: {
      heroQuote: "It's time we shared the global knowledge of the developers of the prosthesis community and worked together on shared solutions to better and better help those in need",
      heroAuthor: 'Dr. Pooja Mukul, MD',
      heroAuthorDetail: 'B.M.V.S.S, Jaipur',
      heroTextWithYou: 'With you, ',
      heroTextRedefining: 'Redefining',
      heroTextLimitlessPossibilities: 'Limitless Possibilities.',
      redefiningHealing: 'Redefining the Way You Heal',
      redefiningSubtext: 'Your journey is unique — our platform adapts to your rhythm, supporting confidence and comfort at every stage.',
      trainingTitle: 'Training',
      trainingDesc: 'Relearning motion, rebuilding trust through training',
      rehabilitationTitle: 'Rehabilitation',
      rehabilitationDesc: 'Reconnecting body and mind in  motion with rehabilitation',
      findWhatFits: 'Find What Fits You Best',
      findWhatFitsDesc: 'Explore prosthetic solutions designed around your needs, comfort, and lifestyle.',
      belowKnee: 'Below knee',
      aboveKnee: 'Above knee',
      wheelchair: 'Wheelchair',
      closingTitle: 'Together, we move forward.Every step, with you.',
      closingSubtext: 'Restoring confidence through human connection. Built with care, made for you.',
      membersInCommunity: 'Members in the community',
      joinCommunity: 'Join the Community',
      communityTitle: 'Join a community that understands you.',
      communitySubtext: 'Connect with inspiring members who share your journey, celebrate milestones, exchange tips, and support each other every step of the way',
      viewProfile: 'View profile',
      connect: 'Connect',
      shareStoryTitle: 'Your story can inspire someone today',
      shareStorySubtext: 'Add photos, videos, or proud moments to inspire, motivate, and support others.',
      shareYourStory: 'Share your story',
      helpCenterTitle: 'Help Is Closer Than You Think',
      helpCenterSubtext: 'Discover all nearby centers in one click and connect with the support you need.',
      searchLocation: 'Search Location',
      centerType: 'Center Type',
      priceRange: 'Price Range',
      selectCenterCategory: 'Select Center Category',
      viewAll: 'View All',
      statsBMVSS: '+2 million',
      statsBMVSSDesc: 'BMVSS: Changing lives',
      statsThroughRehabilitation: 'through rehabilitation.',
      statsCenters: '+700',
      statsPrivateAndPublic: 'Private and public',
      statsCentersNationwide: 'centers nationwide.',
      statsBeneficiaries: '380,000+',
      statsBeneficiariesAssisted: 'Beneficiaries assisted',
      statsThroughCamps: 'through camps',
      // Service Centers
      govCentersTitle: 'Government Centers',
      govCentersSubtitle: 'Offer prosthesis fitting, financial aid, and personalized rehabilitation services.',
      ngoCentersTitle: 'NGO/Non-Profit',
      ngoCentersSubtitle: 'Affordable solutions and inclusive care programs. Offering customized fittings, high-end materials',
      privateClinicsTitle: 'Private Clinics',
      privateClinicsSubtitle: 'Offering customized fittings, high-end materials',
      govCentersFeature1: '170+ ALIMCO centers nationwide',
      govCentersFeature2: 'Subsidized cost, ADIP scheme',
      govCentersFeature3: 'Accessible for All, Certified Specialists',
      ngoCentersFeature1: 'BMVSS 23 branches in India',
      ngoCentersFeature2: 'Free- subsidized cost',
      ngoCentersFeature3: 'Community Outreach, Schemes for rehabilitation',
      privateClinicsFeature1: 'Endolite India: 250+ clinics / franchises (network)',
      privateClinicsFeature2: 'Basic model from Rs.20,000+',
      privateClinicsFeature3: 'Personal Care',
      // Service Centers Locations
      govCentersLocation: 'Kanpur, UP',
      ngoCentersLocation: 'Jaipur, Rajasthan',
      privateClinicsLocation: 'Delhi, India',
      // Community Cards
      communityCard1Name: 'Manisha Rajput',
      communityCard1Location: 'Andhra Pradesh, India',
      communityCard1Achievement: 'Professional Yoga Teacher',
      communityCard1ProfileType: 'Community Volunteer',
      communityCard2Name: 'Ramesh Raj',
      communityCard2Location: 'Rajasthan, India',
      communityCard2Achievement: 'Jaipur Marathon Winner',
      communityCard2ProfileType: 'Peer Mentor',
      communityCard3Name: 'Hakim Ali',
      communityCard3Location: 'UP, India',
      communityCard3Achievement: 'Cricket State Player',
      communityCard3ProfileType: 'Public Speaker in Community',
      communityCard4Name: 'Raj Mohan',
      communityCard4Location: 'Bangalore, India',
      communityCard4Achievement: 'Artist/Speaker',
      communityCard4ProfileType: 'Peer Mentor',
      // Community Card Tags
      tagSkincare: 'Skincare',
      tagFatigue: 'Fatigue',
      tagPhantomPain: 'Phantom Pain',
      tagDailyTips: 'Daily Tips',
      tagSkinCare: 'Skin care',
      tagAthletics: 'Athletics',
      tagRehabilitation: 'Rehabilitation',
      tagSports: 'Sports',
      tagCommunity: 'Community',
      tagArt: 'Art',
      tagAccessibility: 'Accessibility',
    },
    footer: {
      copyright: '© 2025 Sarathi.co.in',
      designedForInclusion: 'Designed for inclusion',
      builtForChange: 'Built for change',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      exploreStories: 'Explore Stories',
    },
    roles: {
      admin: 'Admin',
      contentModerator: 'Content Moderator',
      user: 'User',
      guest: 'Guest',
    },
    admin: {
      title: 'Admin Dashboard',
      userManagement: 'User Management',
      contentModeration: 'Content Moderation',
      pendingApprovals: 'Pending Approvals',
      activateUser: 'Activate User',
      deactivateUser: 'Deactivate User',
      approveContent: 'Approve',
      rejectContent: 'Reject',
      status: 'Status',
      actions: 'Actions',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      submit: 'Submit',
      cancel: 'Cancel',
      close: 'Close',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
    },
  },
  hi: {
    nav: {
      profile: 'प्रोफ़ाइल',
      community: 'समुदाय',
      dailyTips: 'दैनिक सुझाव',
      helpCenter: 'सहायता केंद्र',
      tutorial: 'ट्यूटोरियल',
      home: 'होम',
      stories: 'कहानियाँ',
    },
    auth: {
      login: 'लॉग इन करें',
      register: 'रजिस्टर करें',
      signup: 'साइन अप करें',
      email: 'ईमेल',
      password: 'पासवर्ड',
      mobileNumber: 'मोबाइल नंबर',
      magicLink: 'मैजिक लिंक',
      sendMagicLink: 'मैजिक लिंक भेजें',
      loginWithGoogle: 'Google से लॉगिन करें',
      loginWithFacebook: 'Facebook से लॉगिन करें',
      loginWithApple: 'Apple से लॉगिन करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      dontHaveAccount: 'खाता नहीं है?',
      alreadyHaveAccount: 'पहले से खाता है?',
      logout: 'लॉग आउट',
      name: 'नाम',
    },
    home: {
      heroQuote: 'अब समय आ गया है कि हम प्रोस्थेसिस समुदाय के डेवलपर्स के वैश्विक ज्ञान को साझा करें और जरूरतमंदों की बेहतर मदद के लिए साझा समाधानों पर एक साथ काम करें',
      heroAuthor: 'डॉ. पूजा मुकुल, एमडी',
      heroAuthorDetail: 'बी.एम.वी.एस.एस, जयपुर',
      heroTextWithYou: 'आपके साथ, ',
      heroTextRedefining: 'पुनर्परिभाषित करना',
      heroTextLimitlessPossibilities: 'असीमित संभावनाएं।',
      redefiningHealing: 'उपचार के तरीके को फिर से परिभाषित करना',
      redefiningSubtext: 'आपकी यात्रा अद्वितीय है — हमारा प्लेटफ़ॉर्म आपकी गति के अनुकूल है, हर चरण में आत्मविश्वास और आराम का समर्थन करता है।',
      trainingTitle: 'प्रशिक्षण',
      trainingDesc: 'गति को फिर से सीखना, प्रशिक्षण के माध्यम से विश्वास का पुनर्निर्माण',
      rehabilitationTitle: 'पुनर्वास',
      rehabilitationDesc: 'पुनर्वास के साथ गति में शरीर और मन को फिर से जोड़ना',
      findWhatFits: 'वह खोजें जो आपके लिए सबसे अच्छा हो',
      findWhatFitsDesc: 'अपनी जरूरतों, आराम और जीवनशैली के अनुसार डिज़ाइन किए गए कृत्रिम समाधानों का अन्वेषण करें।',
      belowKnee: 'घुटने के नीचे',
      aboveKnee: 'घुटने के ऊपर',
      wheelchair: 'व्हीलचेयर',
      closingTitle: 'एक साथ, हम आगे बढ़ते हैं। हर कदम, आपके साथ।',
      closingSubtext: 'मानवीय संबंध के माध्यम से आत्मविश्वास बहाल करना। देखभाल के साथ बनाया गया, आपके लिए बनाया गया।',
      membersInCommunity: 'समुदाय में सदस्य',
      joinCommunity: 'समुदाय में शामिल हों',
      communityTitle: 'एक ऐसे समुदाय से जुड़ें जो आपको समझता है।',
      communitySubtext: 'प्रेरणादायक सदस्यों से जुड़ें जो आपकी यात्रा साझा करते हैं, मील के पत्थर मनाते हैं, सुझाव साझा करते हैं, और हर कदम पर एक-दूसरे का समर्थन करते हैं',
      viewProfile: 'प्रोफ़ाइल देखें',
      connect: 'जुड़ें',
      shareStoryTitle: 'आपकी कहानी आज किसी को प्रेरित कर सकती है',
      shareStorySubtext: 'दूसरों को प्रेरित, प्रोत्साहित और समर्थन देने के लिए तस्वीरें, वीडियो या गर्व के क्षण जोड़ें।',
      shareYourStory: 'अपनी कहानी साझा करें',
      helpCenterTitle: 'मदद आपकी सोच से कहीं ज़्यादा करीब है',
      helpCenterSubtext: 'एक क्लिक में आस-पास के सभी केंद्रों की खोज करें और आवश्यक सहायता से जुड़ें।',
      searchLocation: 'स्थान खोजें',
      centerType: 'केंद्र प्रकार',
      priceRange: 'मूल्य सीमा',
      selectCenterCategory: 'केंद्र श्रेणी चुनें',
      viewAll: 'सभी देखें',
      statsBMVSS: '+2 मिलियन',
      statsBMVSSDesc: 'BMVSS: जीवन बदलना',
      statsThroughRehabilitation: 'पुनर्वास के माध्यम से।',
      statsCenters: '+700',
      statsPrivateAndPublic: 'निजी और सार्वजनिक',
      statsCentersNationwide: 'केंद्र देश भर में।',
      statsBeneficiaries: '3,80,000+',
      statsBeneficiariesAssisted: 'लाभार्थियों की सहायता की गई',
      statsThroughCamps: 'शिविरों के माध्यम से',
      // Service Centers
      govCentersTitle: 'सरकारी केंद्र',
      govCentersSubtitle: 'कृत्रिम अंग फिटिंग, वित्तीय सहायता और व्यक्तिगत पुनर्वास सेवाएं प्रदान करते हैं।',
      ngoCentersTitle: 'एनजीओ/गैर-लाभकारी',
      ngoCentersSubtitle: 'सस्ती समाधान और समावेशी देखभाल कार्यक्रम। अनुकूलित फिटिंग, उच्च-गुणवत्ता वाली सामग्री प्रदान करना',
      privateClinicsTitle: 'निजी क्लीनिक',
      privateClinicsSubtitle: 'अनुकूलित फिटिंग, उच्च-गुणवत्ता वाली सामग्री प्रदान करना',
      govCentersFeature1: '170+ ALIMCO केंद्र देश भर में',
      govCentersFeature2: 'सब्सिडी वाली लागत, ADIP योजना',
      govCentersFeature3: 'सभी के लिए सुलभ, प्रमाणित विशेषज्ञ',
      ngoCentersFeature1: 'BMVSS भारत में 23 शाखाएं',
      ngoCentersFeature2: 'मुफ्त-सब्सिडी वाली लागत',
      ngoCentersFeature3: 'समुदाय आउटरीच, पुनर्वास के लिए योजनाएं',
      privateClinicsFeature1: 'Endolite India: 250+ क्लीनिक/फ्रेंचाइज़ी (नेटवर्क)',
      privateClinicsFeature2: 'मूल मॉडल ₹20,000+ से',
      privateClinicsFeature3: 'व्यक्तिगत देखभाल',
      // Service Centers Locations
      govCentersLocation: 'कानपुर, यूपी',
      ngoCentersLocation: 'जयपुर, राजस्थान',
      privateClinicsLocation: 'दिल्ली, भारत',
      // Community Cards
      communityCard1Name: 'मनीषा राजपूत',
      communityCard1Location: 'आंध्र प्रदेश, भारत',
      communityCard1Achievement: 'पेशेवर योग शिक्षक',
      communityCard1ProfileType: 'समुदाय स्वयंसेवक',
      communityCard2Name: 'रमेश राज',
      communityCard2Location: 'राजस्थान, भारत',
      communityCard2Achievement: 'जयपुर मैराथन विजेता',
      communityCard2ProfileType: 'साथी मार्गदर्शक',
      communityCard3Name: 'हकीम अली',
      communityCard3Location: 'यूपी, भारत',
      communityCard3Achievement: 'क्रिकेट राज्य खिलाड़ी',
      communityCard3ProfileType: 'समुदाय में सार्वजनिक वक्ता',
      communityCard4Name: 'राज मोहन',
      communityCard4Location: 'बैंगलोर, भारत',
      communityCard4Achievement: 'कलाकार/वक्ता',
      communityCard4ProfileType: 'साथी मार्गदर्शक',
      // Community Card Tags
      tagSkincare: 'त्वचा की देखभाल',
      tagFatigue: 'थकान',
      tagPhantomPain: 'फैंटम दर्द',
      tagDailyTips: 'दैनिक सुझाव',
      tagSkinCare: 'त्वचा देखभाल',
      tagAthletics: 'एथलेटिक्स',
      tagRehabilitation: 'पुनर्वास',
      tagSports: 'खेल',
      tagCommunity: 'समुदाय',
      tagArt: 'कला',
      tagAccessibility: 'सुलभता',
    },
    footer: {
      copyright: '© 2025 Sarathi.co.in',
      designedForInclusion: 'समावेश के लिए डिज़ाइन किया गया',
      builtForChange: 'परिवर्तन के लिए बनाया गया',
      about: 'के बारे में',
      contact: 'संपर्क करें',
      privacy: 'गोपनीयता',
      exploreStories: 'कहानियों का अन्वेषण करें',
    },
    roles: {
      admin: 'व्यवस्थापक',
      contentModerator: 'सामग्री संचालक',
      user: 'उपयोगकर्ता',
      guest: 'अतिथि',
    },
    admin: {
      title: 'व्यवस्थापक डैशबोर्ड',
      userManagement: 'उपयोगकर्ता प्रबंधन',
      contentModeration: 'सामग्री संचालन',
      pendingApprovals: 'लंबित अनुमोदन',
      activateUser: 'उपयोगकर्ता सक्रिय करें',
      deactivateUser: 'उपयोगकर्ता निष्क्रिय करें',
      approveContent: 'स्वीकृत करें',
      rejectContent: 'अस्वीकार करें',
      status: 'स्थिति',
      actions: 'क्रियाएँ',
    },
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      submit: 'सबमिट करें',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      view: 'देखें',
    },
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}
