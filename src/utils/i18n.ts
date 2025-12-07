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
    signUp: string;
    email: string;
    password: string;
    mobileNumber: string;
    phoneNumber: string;
    telephone: string;
    enterPhoneNumber: string;
    enterEmail: string;
    enterPassword: string;
    loginSubtitle: string;
    magicLink: string;
    sendMagicLink: string;
    loginWithGoogle: string;
    loginWithFacebook: string;
    loginWithApple: string;
    orLoginWith: string;
    forgotPassword: string;
    rememberMe: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    logout: string;
    name: string;
    firstName: string;
    loginButton: string;
    signupButton: string;
    welcomeBack: string;
    createAccount: string;
    invalidCredentials: string;
    loginSuccess: string;
    signupSuccess: string;
    registerNow: string;
    fullName: string;
    dateOfBirth: string;
    confirmPassword: string;
    createAccountSubtitle: string;
    termsOfService: string;
    privacyPolicy: string;
    agreeToTerms: string;
    continueButton: string;
    backButton: string;
    nextButton: string;
    finishButton: string;
    profileVerifiedSuccessfully: string;
    profileVerifiedDescription: string;
    exploreSarathi: string;
  };

  // Onboarding
  onboarding: {
    screen1Title: string;
    screen1Description: string;
    screen2Title: string;
    screen2Description: string;
    screen3Title: string;
    screen3Description: string;
    screen4Title: string;
    screen4Description: string;
    screen5Title: string;
    screen5Description: string;
    screen6Title: string;
    screen6Description: string;
    screen6Button: string;
    next: string;
    back: string;
    skip: string;
    getStarted: string;
    stepOf: string;
    // Age input screen
    welcomeToSarathi: string;
    letsGetToKnowYou: string;
    tellUsYourAge: string;
    pleaseEnterValidAge: string;
    // User type selection
    whoAreYou: string;
    whoAreYouDescription: string;
    iAmAmputee: string;
    iAmCaregiver: string;
    iAmVolunteer: string;
    iAmDoctor: string;
    iAmPractitioner: string;
    // Medical information header
    medicalInformation: string;
    medicalInformationDescription: string;
    // Prosthesis type
    whatTypeOfProsthesis: string;
    aboveKnee: string;
    belowKnee: string;
    // Length of usage
    howLongHaveYouBeenUsing: string;
    lessThan6Months: string;
    moreThan1Year: string;
    moreThan5Years: string;
    // Main challenges
    whatIsYourMainChallenge: string;
    fitAndComfort: string;
    mobility: string;
    community: string;
    costAndAccess: string;
    training: string;
    emotionalWellbeing: string;
    // Activities
    whichActivitiesMatter: string;
    rehabilitation: string;
    socialLife: string;
    emotions: string;
    painRelief: string;
    work: string;
    independence: string;
    education: string;
    confidence: string;
    sports: string;
    guidance: string;
    maintenance: string;
    // Error messages
    pleaseSelectProfileType: string;
    pleaseSelectProsthesisType: string;
    pleaseSelectLengthUsage: string;
    pleaseLoginFirst: string;
    profileCompletedSuccess: string;
  };

  // Registration
  registration: {
    title: string;
    step: string;
    of: string;
    step1Title: string;
    step1Subtitle: string;
    step2Title: string;
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    step4Title: string;
    step4Subtitle: string;
    step5Title: string;
    step5Subtitle: string;
    step6Title: string;
    step6Subtitle: string;
    selectUserType: string;
    amputee: string;
    prosthetist: string;
    caregiver: string;
    doctor: string;
    practitioner: string;
    volunteer: string;
    selectProsthesisType: string;
    selectUsageDuration: string;
    addYourChallenges: string;
    addYourActivities: string;
    typeChallenge: string;
    typeActivity: string;
    reviewYourInfo: string;
    confirmAndCreate: string;
    accountCreated: string;
    accountCreatedMessage: string;
    completeProfile: string;
    skipForNow: string;
    goToHome: string;
    // Form fields and placeholders
    firstName: string;
    lastName: string;
    emailAddress: string;
    enterDateOfBirth: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    createAccount: string;
    alreadyHaveAccount: string;
    loginHere: string;
    // Error messages
    passwordsDoNotMatch: string;
    passwordMinLength: string;
    fillAllFields: string;
    emailAlreadyRegistered: string;
    phoneAlreadyRegistered: string;
      failedToCreateUser: string;
      registrationFailed: string;
      accountCreatedSuccess: string;
      verificationEmailSentPrefix: string;
      verificationEmailSentSuffix: string;
      goToLogin: string;
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
    saving: string;
    delete: string;
    edit: string;
    view: string;
  };

  // Profile
  profile: {
    title: string;
    accountInfo: string;
    personalInfo: string;
    prosthesisInfo: string;
    challengesActivities: string;
    editProfile: string;
    saveChanges: string;
    cancelEdit: string;
    changePassword: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    passwordChanged: string;
    profileUpdated: string;
    userType: string;
    prosthesisType: string;
    lengthUsage: string;
    mainChallenge: string;
    activities: string;
    aboveKnee: string;
    belowKnee: string;
    lessThan6Months: string;
    moreThan1Year: string;
    moreThan5Years: string;
    unsavedChanges: string;
    unsavedChangesMessage: string;
    leaveWithoutSaving: string;
    stayOnPage: string;
    addChallenge: string;
    addActivity: string;
    changeCoverPicture: string;
    changeProfilePicture: string;
    uploadCoverPicture: string;
    uploadProfilePicture: string;
    cropImage: string;
    cropAndSave: string;
    cancel: string;
    uploading: string;
    about: string;
    myStory: string;
    readMore: string;
    profession: string;
    workplace: string;
    placeOfResidence: string;
    worksAt: string;
    from: string;
    prostheticType: string;
    uploads: string;
    seeAllPosts: string;
    connections: string;
    seeAllConnections: string;
    makeAPost: string;
    shareAThought: string;
    photoVideo: string;
    latestActivities: string;
    noRecentActivities: string;
    savingChanges: string;
    removeChallenge: string;
    removeActivity: string;
    passwordMismatch: string;
    passwordTooShort: string;
    oldPasswordRequired: string;
    // New profile page fields
    about: string;
    myStory: string;
    profession: string;
    workplace: string;
    placeOfResidence: string;
    location: string;
    worksAt: string;
    from: string;
    uploads: string;
    connections: string;
    makeAPost: string;
    shareAThought: string;
    photoVideo: string;
    seeAllPosts: string;
    seeAllConnections: string;
    readMore: string;
    verifiedUser: string;
    coverPicture: string;
    profilePicture: string;
    changePicture: string;
    latestActivities: string;
    youCommented: string;
    youLiked: string;
    youJoinedGroup: string;
    youEarnedBadge: string;
    commented: string;
    liked: string;
    agoHours: string;
    agoDays: string;
    agoWeek: string;
    agoWeeks: string;
    ago: string;
    on: string;
    and: string;
    otherPeople: string;
    others: string;
    yourRecentPost: string;
    forFirstCommunityReplies: string;
    interestsAndActivities: string;
    challengesFaced: string;
    communityActivities: string;
    prostheticType: string;
    usageDuration: string;
    addCoverPhoto: string;
    photo: string;
    video: string;
    logOut: string;
    deleteAccount: string;
    coverPhotoUploaded: string;
    profilePhotoUploaded: string;
    profileSaved: string;
    saveProfile: string;
    discard: string;
    saving: string;
    save: string;
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
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      mobileNumber: 'Mobile Number',
      phoneNumber: 'Phone Number',
      telephone: 'Telephone',
      enterPhoneNumber: 'Enter your phone number',
      enterEmail: 'Enter your email',
      enterPassword: 'Password',
      loginSubtitle: 'Enter your phone number and password to log in',
      magicLink: 'Magic Link',
      sendMagicLink: 'Send Magic Link',
      loginWithGoogle: 'Login with Google',
      loginWithFacebook: 'Login with Facebook',
      loginWithApple: 'Login with Apple',
      orLoginWith: 'Or login with',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember me',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      logout: 'Logout',
      name: 'Name',
      firstName: 'First Name',
      loginButton: 'Login',
      signupButton: 'Sign Up',
      welcomeBack: 'Welcome Back',
      createAccount: 'Create Account',
      invalidCredentials: 'Invalid email or password',
      loginSuccess: 'Successfully logged in',
      signupSuccess: 'Account created successfully',
      registerNow: 'Register Now',
      fullName: 'Full name',
      dateOfBirth: 'Date of Birth',
      confirmPassword: 'Confirm Password',
      createAccountSubtitle: 'Create an account to continue',
      termsOfService: 'Terms of service',
      privacyPolicy: 'Privacy Policy',
      agreeToTerms: 'By continuing, you agree to our',
      continueButton: 'Continue',
      backButton: 'Back',
      nextButton: 'Next',
      finishButton: 'Finish',
      profileVerifiedSuccessfully: 'Profile verified successfully!',
      profileVerifiedDescription: 'Your email has been verified. You can now access all features of Sarathi.',
      exploreSarathi: 'Explore Sarathi',
    },
    onboarding: {
      screen1Title: 'Your trusted guide along the path',
      screen1Description: 'Find guidance, share real stories, and join a community that supports you.',
      screen2Title: 'Start small. Go far. We\'ll help.',
      screen2Description: 'Start your journey step by step with us, while we guide you.',
      screen3Title: 'Daily Guidance & Growth',
      screen3Description: 'From guided exercises and training plans to daily tips and expert advice, we help you progress step by step.',
      screen4Title: 'Your Tools & Resources',
      screen4Description: 'Access the right devices and discover local support wherever you are.',
      screen5Title: 'Together We Grow',
      screen5Description: 'Your journey matters — connect, share your story, and find support in real people.',
      screen6Title: 'You are Ready!',
      screen6Description: 'Let\'s begin your journey with us.',
      screen6Button: 'Explore Sarathi',
      next: 'Next',
      back: 'Back',
      skip: 'Skip',
      getStarted: 'Get Started',
      stepOf: 'of',
      // Age input screen
      welcomeToSarathi: 'Welcome to ',
      letsGetToKnowYou: "Let's start by getting to know you better.",
      tellUsYourAge: 'Tell us your age',
      pleaseEnterValidAge: 'Please enter a valid age',
      // User type selection
      whoAreYou: 'Who are you?',
      whoAreYouDescription: 'Select the option that best describes you',
      iAmAmputee: 'I am an amputee',
      iAmCaregiver: 'I am a caregiver',
      iAmVolunteer: 'I am a volunteer',
      iAmDoctor: 'I am a doctor',
      iAmPractitioner: 'I am a practitioner',
      // Medical information header
      medicalInformation: 'Medical Information',
      medicalInformationDescription: 'Help us understand your specific needs to recommend the best prosthetic solution',
      // Prosthesis type
      whatTypeOfProsthesis: 'What type of prosthesis do you use?',
      aboveKnee: 'Above Knee',
      belowKnee: 'Below Knee',
      // Length of usage
      howLongHaveYouBeenUsing: 'How long have you been using a prosthesis?',
      lessThan6Months: 'Less than 6 months',
      moreThan1Year: 'More than 1 year',
      moreThan5Years: 'More than 5 years',
      // Main challenges
      whatIsYourMainChallenge: 'What is your main challenge right now?',
      fitAndComfort: 'Fit and Comfort',
      mobility: 'Mobility',
      community: 'Community',
      costAndAccess: 'Cost and Access',
      training: 'Training',
      emotionalWellbeing: 'Emotional Well-being',
      // Activities
      whichActivitiesMatter: 'Which activities matter the most to you?',
      rehabilitation: 'Rehabilitation',
      socialLife: 'Social Life',
      emotions: 'Emotions',
      painRelief: 'Pain Relief',
      work: 'Work',
      independence: 'Independence',
      education: 'Education',
      confidence: 'Confidence',
      sports: 'Sports',
      guidance: 'Guidance',
      maintenance: 'Maintenance',
      // Error messages
      pleaseSelectProfileType: 'Please select your profile type',
      pleaseSelectProsthesisType: 'Please select your prosthesis type',
      pleaseSelectLengthUsage: 'Please select how long you have been using a prosthesis',
      pleaseLoginFirst: 'Please log in first',
      profileCompletedSuccess: 'Profile completed successfully!',
    },
    registration: {
      title: 'Create Your Account',
      step: 'Step',
      of: 'of',
      step1Title: 'Account Credentials',
      step1Subtitle: 'Create your login credentials',
      step2Title: 'Personal Information',
      step2Subtitle: 'Tell us about yourself',
      step3Title: 'User Type',
      step3Subtitle: 'Select your role in the community',
      step4Title: 'Prosthesis Information',
      step4Subtitle: 'Help us understand your needs',
      step5Title: 'Challenges & Activities',
      step5Subtitle: 'Share your journey and interests',
      step6Title: 'Review & Confirm',
      step6Subtitle: 'Review your information before creating account',
      selectUserType: 'Select your user type',
      amputee: 'Amputee',
      prosthetist: 'Prosthetist',
      caregiver: 'Caregiver',
      doctor: 'Doctor',
      practitioner: 'Practitioner',
      volunteer: 'Volunteer',
      selectProsthesisType: 'Select prosthesis type',
      selectUsageDuration: 'How long have you been using it?',
      addYourChallenges: 'What challenges do you face?',
      addYourActivities: 'What activities do you enjoy?',
      typeChallenge: 'Type a challenge and press Enter',
      typeActivity: 'Type an activity and press Enter',
      reviewYourInfo: 'Review your information',
      confirmAndCreate: 'Confirm and create account',
      accountCreated: 'Account Created!',
      accountCreatedMessage: 'Your account has been created successfully.',
      completeProfile: 'Complete your profile',
      skipForNow: 'Skip for now',
      goToHome: 'Go to Home',
      // Form fields and placeholders
      firstName: 'First name',
      lastName: 'Last name',
      emailAddress: 'Email address',
      enterDateOfBirth: 'Enter date of birth (DD.MM.YY)',
      phoneNumber: 'Enter your phone number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      createAccount: 'Create an account',
      alreadyHaveAccount: 'Already have an account?',
      loginHere: 'Login here',
      // Error messages
      passwordsDoNotMatch: 'Passwords do not match',
      passwordMinLength: 'Password must be at least 6 characters',
      fillAllFields: 'Please fill in all required fields',
      emailAlreadyRegistered: 'Email already registered. Please login instead.',
      phoneAlreadyRegistered: 'Phone number already registered. Please use a different number.',
      failedToCreateUser: 'Failed to create user',
      registrationFailed: 'Registration failed',
      accountCreatedSuccess: 'Account created! Please check your email to verify your account.',
      verificationEmailSentPrefix: "We've sent a verification link to ",
      verificationEmailSentSuffix: ". Please click the link to verify your account and complete your profile setup.",
      goToLogin: 'Go to Login',
    },
    home: {
      heroQuote: "It's time we shared the global knowledge of the developers of the prosthesis community and worked together on shared solutions to better and better help those in need",
      heroAuthor: 'Dr. Pooja Mukul, MD',
      heroAuthorDetail: 'B.M.V.S.S, Jaipur',
      heroTextWithYou: 'With you, ',
      heroTextRedefining: 'Redefining ',
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
      saving: 'Saving...',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
    },
    profile: {
      title: 'Profile',
      accountInfo: 'Account Information',
      personalInfo: 'Personal Information',
      prosthesisInfo: 'Prosthesis Information',
      challengesActivities: 'Challenges & Activities',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancelEdit: 'Cancel',
      changePassword: 'Change Password',
      oldPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      passwordChanged: 'Password changed successfully',
      profileUpdated: 'Profile updated successfully',
      userType: 'User Type',
      prosthesisType: 'Prosthesis Type',
      lengthUsage: 'Usage Duration',
      mainChallenge: 'Main Challenges',
      activities: 'Activities',
      aboveKnee: 'Above Knee',
      belowKnee: 'Below Knee',
      lessThan6Months: 'Less than 6 months',
      moreThan1Year: 'More than 1 year',
      moreThan5Years: 'More than 5 years',
      unsavedChanges: 'Unsaved Changes',
      unsavedChangesMessage: 'You have unsaved changes. Are you sure you want to leave?',
      leaveWithoutSaving: 'Leave without saving',
      stayOnPage: 'Stay on page',
      addChallenge: 'Add Challenge',
      addActivity: 'Add Activity',
      removeChallenge: 'Remove',
      removeActivity: 'Remove',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 6 characters',
      oldPasswordRequired: 'Current password is required',
      changeCoverPicture: 'Change Cover Picture',
      changeProfilePicture: 'Change Profile Picture',
      uploadCoverPicture: 'Upload Cover Picture',
      uploadProfilePicture: 'Upload Profile Picture',
      cropImage: 'Crop Image',
      cropAndSave: 'Crop & Save',
      cancel: 'Cancel',
      uploading: 'Uploading...',
      about: 'About',
      myStory: 'My Story',
      readMore: 'Read More',
      profession: 'Profession',
      workplace: 'Workplace',
      placeOfResidence: 'Place of Residence',
      worksAt: 'Works at',
      from: 'From',
      prostheticType: 'Prosthetic type',
      uploads: 'Uploads',
      seeAllPosts: 'See all posts',
      connections: 'Connections',
      seeAllConnections: 'See all connections',
      makeAPost: 'Make a post',
      shareAThought: 'Share a thought..',
      photoVideo: 'Photo / Video',
      latestActivities: 'Latest Activities',
      noRecentActivities: 'No recent activities',
      savingChanges: 'Saving...',
      // New profile page fields
      about: 'About',
      myStory: 'My Story',
      profession: 'Profession',
      workplace: 'Workplace',
      placeOfResidence: 'Place of Residence',
      location: 'Location',
      worksAt: 'Works at',
      from: 'From',
      uploads: 'Uploads',
      connections: 'Connections',
      makeAPost: 'Make a post',
      shareAThought: 'Share a thought..',
      photoVideo: 'Photo / Video',
      seeAllPosts: 'See all posts',
      seeAllConnections: 'See all connections',
      readMore: 'Read More',
      verifiedUser: 'Verified User',
      coverPicture: 'Cover Picture',
      profilePicture: 'Profile Picture',
      changePicture: 'Change Picture',
      latestActivities: 'Latest Activities',
      youCommented: 'You Commented on',
      youLiked: 'You Liked',
      youJoinedGroup: 'You Joined group:',
      youEarnedBadge: 'You Earned a badge for :',
      commented: 'commented on',
      liked: 'liked your post',
      agoHours: 'hrs ago',
      agoDays: 'days ago',
      agoWeek: 'week ago',
      agoWeeks: 'weeks ago',
      ago: 'ago',
      on: 'on',
      and: 'and',
      otherPeople: 'other people',
      others: 'others',
      yourRecentPost: 'your recent post',
      forFirstCommunityReplies: 'First 5 Community replies',
      interestsAndActivities: 'Interests and Activities',
      challengesFaced: 'Challenges faced',
      communityActivities: 'Community Activities',
      prostheticType: 'Prosthesis type',
      usageDuration: 'Usage Duration',
      addCoverPhoto: 'Add cover photo',
      photo: 'Photo',
      video: 'Video',
      logOut: 'Log Out',
      deleteAccount: 'Delete Account',
      coverPhotoUploaded: 'Cover photo uploaded successfully',
      profilePhotoUploaded: 'Profile photo uploaded successfully',
      profileSaved: 'Profile saved successfully',
      saveProfile: 'Save Profile',
      discard: 'Discard',
      saving: 'Saving...',
      save: 'Save',
      unsavedChangesMessage: 'You have unsaved changes. What would you like to do?',
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
      signUp: 'साइन अप करें',
      email: 'ईमेल',
      password: 'पासवर्ड',
      mobileNumber: 'मोबाइल नंबर',
      phoneNumber: 'फोन नंबर',
      telephone: 'टेलीफोन',
      enterPhoneNumber: 'अपना फोन नंबर दर्ज करें',
      enterEmail: 'अपना ईमेल दर्ज करें',
      enterPassword: 'पासवर्ड',
      loginSubtitle: 'लॉग इन करने के लिए अपना फोन नंबर और पासवर्ड दर्ज करें',
      magicLink: 'मैजिक लिंक',
      sendMagicLink: 'मैजिक लिंक भेजें',
      loginWithGoogle: 'Google से लॉगिन करें',
      loginWithFacebook: 'Facebook से लॉगिन करें',
      loginWithApple: 'Apple से लॉगिन करें',
      orLoginWith: 'या लॉगिन करें के साथ',
      forgotPassword: 'पासवर्ड भूल गए?',
      rememberMe: 'मुझे याद रखें',
      dontHaveAccount: 'खाता नहीं है?',
      alreadyHaveAccount: 'पहले से खाता है?',
      logout: 'लॉग आउट',
      name: 'नाम',
      firstName: 'प्रथम नाम',
      loginButton: 'लॉग इन करें',
      signupButton: 'साइन अप करें',
      welcomeBack: 'फिर से स्वागत है',
      createAccount: 'खाता बनाएं',
      invalidCredentials: 'अमान्य ईमेल या पासवर्ड',
      loginSuccess: 'सफलतापूर्वक लॉग इन',
      signupSuccess: 'खाता सफलतापूर्वक बनाया गया',
      registerNow: 'अभी रजिस्टर करें',
      fullName: 'पूरा नाम',
      dateOfBirth: 'जन्म तिथि',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      createAccountSubtitle: 'जारी रखने के लिए एक खाता बनाएं',
      termsOfService: 'सेवा की शर्तें',
      privacyPolicy: 'गोपनीयता नीति',
      agreeToTerms: 'जारी रखकर, आप हमारी सहमति देते हैं',
      continueButton: 'जारी रखें',
      backButton: 'पीछे',
      nextButton: 'अगला',
      finishButton: 'समाप्त करें',
      profileVerifiedSuccessfully: 'प्रोफ़ाइल सफलतापूर्वक सत्यापित हुआ!',
      profileVerifiedDescription: 'आपका ईमेल सत्यापित हो गया है। अब आप Sarathi की सभी सुविधाओं का उपयोग कर सकते हैं।',
      exploreSarathi: 'Sarathi का अन्वेषण करें',
    },
    onboarding: {
      screen1Title: 'आपके साथ का विश्वसनीय मार्गदर्शक',
      screen1Description: 'मार्गदर्शन प्राप्त करें, वास्तविक कहानियां साझा करें, और एक ऐसे समुदाय से जुड़ें जो आपका समर्थन करता है।',
      screen2Title: 'छोटी शुरुआत। दूर तक जाएं। हम मदद करेंगे।',
      screen2Description: 'हमारे साथ कदम दर कदम अपनी यात्रा शुरू करें, जबकि हम आपका मार्गदर्शन करते हैं।',
      screen3Title: 'दैनिक मार्गदर्शन और विकास',
      screen3Description: 'निर्देशित व्यायाम और प्रशिक्षण योजनाओं से लेकर दैनिक सुझाव और विशेषज्ञ सलाह तक, हम आपको कदम दर कदम आगे बढ़ने में मदद करते हैं।',
      screen4Title: 'आपके उपकरण और संसाधन',
      screen4Description: 'सही उपकरणों तक पहुंचें और जहां भी आप हों स्थानीय समर्थन खोजें।',
      screen5Title: 'एक साथ हम बढ़ते हैं',
      screen5Description: 'आपकी यात्रा महत्वपूर्ण है — जुड़ें, अपनी कहानी साझा करें, और वास्तविक लोगों में समर्थन पाएं।',
      screen6Title: 'आप तैयार हैं!',
      screen6Description: 'आइए हमारे साथ अपनी यात्रा शुरू करें।',
      screen6Button: 'Sarathi का अन्वेषण करें',
      next: 'अगला',
      back: 'पीछे',
      skip: 'छोड़ें',
      getStarted: 'शुरू करें',
      stepOf: 'का',
      // Age input screen
      welcomeToSarathi: 'स्वागत है ',
      letsGetToKnowYou: 'आइए आपको बेहतर जानने से शुरू करें।',
      tellUsYourAge: 'अपनी उम्र बताएं',
      pleaseEnterValidAge: 'कृपया एक वैध उम्र दर्ज करें',
      // User type selection
      whoAreYou: 'आप कौन हैं?',
      whoAreYouDescription: 'वह विकल्प चुनें जो आपका सबसे अच्छा वर्णन करता है',
      iAmAmputee: 'मैं एक विच्छेदक हूँ',
      iAmCaregiver: 'मैं एक देखभालकर्ता हूँ',
      iAmVolunteer: 'मैं एक स्वयंसेवक हूँ',
      iAmDoctor: 'मैं एक डॉक्टर हूँ',
      iAmPractitioner: 'मैं एक प्रैक्टिशनर हूँ',
      // Medical information header
      medicalInformation: 'चिकित्सा जानकारी',
      medicalInformationDescription: 'सर्वोत्तम कृत्रिम समाधान की सिफारिश करने के लिए हमें अपनी विशिष्ट आवश्यकताओं को समझने में मदद करें',
      // Prosthesis type
      whatTypeOfProsthesis: 'आप किस प्रकार के कृत्रिम अंग का उपयोग करते हैं?',
      aboveKnee: 'घुटने के ऊपर',
      belowKnee: 'घुटने के नीचे',
      // Length of usage
      howLongHaveYouBeenUsing: 'आप कब से कृत्रिम अंग का उपयोग कर रहे हैं?',
      lessThan6Months: '6 महीने से कम',
      moreThan1Year: '1 साल से अधिक',
      moreThan5Years: '5 साल से अधिक',
      // Main challenges
      whatIsYourMainChallenge: 'अभी आपकी मुख्य चुनौती क्या है?',
      fitAndComfort: 'फिट और आराम',
      mobility: 'गतिशीलता',
      community: 'समुदाय',
      costAndAccess: 'लागत और पहुंच',
      training: 'प्रशिक्षण',
      emotionalWellbeing: 'भावनात्मक कल्याण',
      // Activities
      whichActivitiesMatter: 'आपके लिए कौन सी गतिविधियाँ सबसे अधिक मायने रखती हैं?',
      rehabilitation: 'पुनर्वास',
      socialLife: 'सामाजिक जीवन',
      emotions: 'भावनाएं',
      painRelief: 'दर्द से राहत',
      work: 'काम',
      independence: 'स्वतंत्रता',
      education: 'शिक्षा',
      confidence: 'आत्मविश्वास',
      sports: 'खेल',
      guidance: 'मार्गदर्शन',
      maintenance: 'रखरखाव',
      // Error messages
      pleaseSelectProfileType: 'कृपया अपना प्रोफ़ाइल प्रकार चुनें',
      pleaseSelectProsthesisType: 'कृपया अपना कृत्रिम अंग प्रकार चुनें',
      pleaseSelectLengthUsage: 'कृपया चुनें कि आप कब से कृत्रिम अंग का उपयोग कर रहे हैं',
      pleaseLoginFirst: 'कृपया पहले लॉग इन करें',
      profileCompletedSuccess: 'प्रोफाइल सफलतापूर्वक पूर्ण हो गया!',
    },
    registration: {
      title: 'अपना खाता बनाएं',
      step: 'चरण',
      of: 'का',
      step1Title: 'खाता क्रेडेंशियल',
      step1Subtitle: 'अपने लॉगिन क्रेडेंशियल बनाएं',
      step2Title: 'व्यक्तिगत जानकारी',
      step2Subtitle: 'हमें अपने बारे में बताएं',
      step3Title: 'उपयोगकर्ता प्रकार',
      step3Subtitle: 'समुदाय में अपनी भूमिका चुनें',
      step4Title: 'कृत्रिम अंग जानकारी',
      step4Subtitle: 'हमें अपनी आवश्यकताओं को समझने में मदद करें',
      step5Title: 'चुनौतियाँ और गतिविधियाँ',
      step5Subtitle: 'अपनी यात्रा और रुचियों को साझा करें',
      step6Title: 'समीक्षा और पुष्टि करें',
      step6Subtitle: 'खाता बनाने से पहले अपनी जानकारी की समीक्षा करें',
      selectUserType: 'अपना उपयोगकर्ता प्रकार चुनें',
      amputee: 'विच्छेदित',
      prosthetist: 'प्रोस्थेटिस्ट',
      caregiver: 'देखभालकर्ता',
      doctor: 'डॉक्टर',
      practitioner: 'चिकित्सक',
      volunteer: 'स्वयंसेवक',
      selectProsthesisType: 'कृत्रिम अंग प्रकार चुनें',
      selectUsageDuration: 'आप इसे कितने समय से उपयोग कर रहे हैं?',
      addYourChallenges: 'आपको कौन सी चुनौतियों का सामना है?',
      addYourActivities: 'आपको कौन सी गतिविधियाँ पसंद हैं?',
      typeChallenge: 'एक चुनौती टाइप करें और Enter दबाएं',
      typeActivity: 'एक गतिविधि टाइप करें और Enter दबाएं',
      reviewYourInfo: 'अपनी जानकारी की समीक्षा करें',
      confirmAndCreate: 'पुष्टि करें और खाता बनाएं',
      accountCreated: 'खाता बनाया गया!',
      accountCreatedMessage: 'आपका खाता सफलतापूर्वक बनाया गया है।',
      completeProfile: 'अपनी प्रोफ़ाइल पूरी करें',
      skipForNow: 'अभी के लिए छोड़ें',
      goToHome: 'होम पर जाएं',
      // Form fields and placeholders
      firstName: 'पहला नाम',
      lastName: 'अंतिम नाम',
      emailAddress: 'ईमेल पता',
      enterDateOfBirth: 'जन्म तिथि दर्ज करें (DD.MM.YY)',
      phoneNumber: 'अपना फोन नंबर दर्ज करें',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      createAccount: 'खाता बनाएं',
      alreadyHaveAccount: 'क्या आपके पास पहले से एक खाता मौजूद है?',
      loginHere: 'यहां लॉगिन करें',
      // Error messages
      passwordsDoNotMatch: 'पासवर्ड मेल नहीं खाते',
      passwordMinLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
      fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
      emailAlreadyRegistered: 'ईमेल पहले से पंजीकृत है। कृपया इसके बजाय लॉगिन करें।',
      phoneAlreadyRegistered: 'फोन नंबर पहले से पंजीकृत है। कृपया एक अलग नंबर का उपयोग करें।',
      failedToCreateUser: 'उपयोगकर्ता बनाने में विफल',
      registrationFailed: 'पंजीकरण विफल',
      accountCreatedSuccess: 'खाता बनाया गया! कृपया अपने खाते की पुष्टि करने के लिए अपना ईमेल जांचें।',
      verificationEmailSentPrefix: 'हमने आपको एक सत्यापन लिंक भेजा है ',
      verificationEmailSentSuffix: '। कृपया अपने खाते को सत्यापित करने और अपनी प्रोफ़ाइल सेटअप पूरा करने के लिए लिंक पर क्लिक करें।',
      goToLogin: 'लॉगिन पर जाएं',
    },
    home: {
      heroQuote: 'अब समय आ गया है कि हम प्रोस्थेसिस समुदाय के डेवलपर्स के वैश्विक ज्ञान को साझा करें और जरूरतमंदों की बेहतर मदद के लिए साझा समाधानों पर एक साथ काम करें',
      heroAuthor: 'डॉ. पूजा मुकुल, एमडी',
      heroAuthorDetail: 'बी.एम.वी.एस.एस, जयपुर',
      heroTextWithYou: 'आपके साथ, ',
      heroTextRedefining: 'पुनर्परिभाषित करना ',
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
      saving: 'सहेज रहे हैं...',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      view: 'देखें',
    },
    profile: {
      title: 'प्रोफ़ाइल',
      accountInfo: 'खाता जानकारी',
      personalInfo: 'व्यक्तिगत जानकारी',
      prosthesisInfo: 'कृत्रिम अंग जानकारी',
      challengesActivities: 'चुनौतियाँ और गतिविधियाँ',
      editProfile: 'प्रोफ़ाइल संपादित करें',
      saveChanges: 'परिवर्तन सहेजें',
      cancelEdit: 'रद्द करें',
      changePassword: 'पासवर्ड बदलें',
      oldPassword: 'वर्तमान पासवर्ड',
      newPassword: 'नया पासवर्ड',
      confirmPassword: 'नए पासवर्ड की पुष्टि करें',
      passwordChanged: 'पासवर्ड सफलतापूर्वक बदल गया',
      profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हुआ',
      userType: 'उपयोगकर्ता प्रकार',
      prosthesisType: 'कृत्रिम अंग प्रकार',
      lengthUsage: 'उपयोग अवधि',
      mainChallenge: 'मुख्य चुनौतियाँ',
      activities: 'गतिविधियाँ',
      aboveKnee: 'घुटने के ऊपर',
      belowKnee: 'घुटने के नीचे',
      lessThan6Months: '6 महीने से कम',
      moreThan1Year: '1 साल से अधिक',
      moreThan5Years: '5 साल से अधिक',
      unsavedChanges: 'असहेजे परिवर्तन',
      unsavedChangesMessage: 'आपके पास असहेजे परिवर्तन हैं। क्या आप वाकई छोड़ना चाहते हैं?',
      leaveWithoutSaving: 'बिना सहेजे छोड़ें',
      stayOnPage: 'पेज पर रहें',
      addChallenge: 'चुनौती जोड़ें',
      addActivity: 'गतिविधि जोड़ें',
      removeChallenge: 'हटाएं',
      removeActivity: 'हटाएं',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      passwordTooShort: 'पासवर्ड कम से कम 6 वर्णों का होना चाहिए',
      oldPasswordRequired: 'वर्तमान पासवर्ड आवश्यक है',
      changeCoverPicture: 'कवर चित्र बदलें',
      changeProfilePicture: 'प्रोफ़ाइल चित्र बदलें',
      uploadCoverPicture: 'कवर चित्र अपलोड करें',
      uploadProfilePicture: 'प्रोफ़ाइल चित्र अपलोड करें',
      cropImage: 'चित्र क्रॉप करें',
      cropAndSave: 'क्रॉप करें और सहेजें',
      cancel: 'रद्द करें',
      uploading: 'अपलोड हो रहा है...',
      about: 'के बारे में',
      myStory: 'मेरी कहानी',
      readMore: 'और पढ़ें',
      profession: 'पेशा',
      workplace: 'कार्यस्थल',
      placeOfResidence: 'निवास स्थान',
      worksAt: 'में काम करते हैं',
      from: 'से',
      prostheticType: 'कृत्रिम अंग प्रकार',
      uploads: 'अपलोड',
      seeAllPosts: 'सभी पोस्ट देखें',
      connections: 'कनेक्शन',
      seeAllConnections: 'सभी कनेक्शन देखें',
      makeAPost: 'एक पोस्ट बनाएं',
      shareAThought: 'एक विचार साझा करें..',
      photoVideo: 'फोटो / वीडियो',
      latestActivities: 'नवीनतम गतिविधियाँ',
      noRecentActivities: 'कोई हाल की गतिविधि नहीं',
      savingChanges: 'सहेज रहे हैं...',
      // New profile page fields
      about: 'के बारे में',
      myStory: 'मेरी कहानी',
      profession: 'पेशा',
      workplace: 'कार्यस्थल',
      placeOfResidence: 'निवास स्थान',
      location: 'स्थान',
      worksAt: 'में काम करता है',
      from: 'से',
      uploads: 'अपलोड',
      connections: 'कनेक्शन',
      makeAPost: 'पोस्ट बनाएं',
      shareAThought: 'एक विचार साझा करें..',
      photoVideo: 'फोटो / वीडियो',
      seeAllPosts: 'सभी पोस्ट देखें',
      seeAllConnections: 'सभी कनेक्शन देखें',
      readMore: 'और पढ़ें',
      verifiedUser: 'सत्यापित उपयोगकर्ता',
      coverPicture: 'कवर चित्र',
      profilePicture: 'प्रोफ़ाइल चित्र',
      changePicture: 'चित्र बदलें',
      latestActivities: 'नवीनतम गतिविधियाँ',
      youCommented: 'आपने टिप्पणी की',
      youLiked: 'आपने पसंद किया',
      youJoinedGroup: 'आप समूह में शामिल हुए:',
      youEarnedBadge: 'आपने बैज अर्जित किया :',
      commented: 'ने टिप्पणी की',
      liked: 'ने आपकी पोस्ट पसंद की',
      agoHours: 'घंटे पहले',
      agoDays: 'दिन पहले',
      agoWeek: 'सप्ताह पहले',
      agoWeeks: 'सप्ताह पहले',
      ago: 'पहले',
      on: 'पर',
      and: 'और',
      otherPeople: 'अन्य लोग',
      others: 'अन्य',
      yourRecentPost: 'आपकी हाल की पोस्ट',
      forFirstCommunityReplies: 'पहले 5 समुदाय उत्तर',
      interestsAndActivities: 'रुचियाँ और गतिविधियाँ',
      challengesFaced: 'चुनौतियाँ',
      communityActivities: 'समुदाय गतिविधियाँ',
      prostheticType: 'कृत्रिम अंग प्रकार',
      usageDuration: 'उपयोग अवधि',
      addCoverPhoto: 'कवर फोटो जोड़ें',
      photo: 'फोटो',
      video: 'वीडियो',
      logOut: 'लॉग आउट',
      deleteAccount: 'खाता हटाएं',
    },
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}
