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
