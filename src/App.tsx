import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DesktopNavigation } from './components/DesktopNavigation';
import { MobileNavigation } from './components/MobileNavigation';
import { HomePageDesktop, HomePageMobile } from './components/homepage';
import { LoginPage } from './components/LoginPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ProfileSelectionPage } from './components/ProfileSelectionPage';
import { ProfileCompletePage } from './components/ProfileCompletePage';
import { ProfileVerifiedPage } from './components/ProfileVerifiedPage';
import { ProfileOnboardingPage } from './components/ProfileOnboardingPage';
import { CommunityPage } from './components/CommunityPage';
import { StoriesPage } from './components/StoriesPage';
import { ProfilePage } from './components/ProfilePage';
import { UserProfileView } from './components/UserProfileView';
import { AllStoriesPage } from './components/AllStoriesPage';
import { AdminDashboard } from './components/AdminDashboard';
import { OnboardingPage } from './components/OnboardingPage';
import { OnboardingFlowPage } from './components/OnboardingFlowPage';
import { Toaster } from './components/ui/sonner';
import { supabase } from './lib/supabase';

type Page = 'home' | 'auth' | 'forgot-password' | 'register' | 'profile-selection' | 'profile-complete' | 'profile-verified' | 'profile-onboarding' | 'onboarding-flow' | 'community' | 'stories' | 'profile' | 'user-profile' | 'all-stories' | 'daily-tips' | 'help-center' | 'tutorial' | 'admin';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Check immediately on mount if this is an email verification redirect
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/profile-verified' || hash.includes('type=email_confirmation')) {
      return 'profile-verified';
    }
    return 'home';
  });
  const [pageData, setPageData] = useState<unknown>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const { user, loading } = useAuth();

  // Protected pages that require authentication
  const protectedPages: Page[] = ['community', 'stories', 'profile', 'user-profile', 'all-stories', 'daily-tips', 'help-center', 'admin'];

  // Set initial history state on mount
  useEffect(() => {
    // Only set if there's no existing state (first load)
    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState(
        { page: currentPage, data: pageData },
        '',
        currentPage === 'home' ? '/' : `/${currentPage}`
      );
    }
   
  }, []);

  useEffect(() => {
    // Detect if mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for email verification status when user logs in
  useEffect(() => {
    if (user && currentPage === 'home') {
      // Check if user's email is not verified
      const checkEmailVerification = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && !session.user.email_confirmed_at) {
          setShowEmailVerificationModal(true);
        }
      };
      checkEmailVerification();
    }
  }, [user, currentPage]);

  // Clean up URL for profile-verified page (only after Supabase has processed the verification)
  useEffect(() => {
    if (currentPage === 'profile-verified') {
      const hash = window.location.hash;
      
      // Only clean up if there's a verification token that needs processing
      if (hash && (hash.includes('access_token') || hash.includes('type=signup'))) {
        // Wait for Supabase to process the hash before cleaning up
        const timer = setTimeout(() => {
          window.history.replaceState({}, '', '/profile-verified');
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // No verification token, clean up immediately
        window.history.replaceState({}, '', '/profile-verified');
      }
    }
  }, [currentPage]);

  // Redirect to login if trying to access protected page without authentication
  useEffect(() => {
    if (!loading && !user && protectedPages.includes(currentPage)) {
      setCurrentPage('auth');
    }
   
  }, [user, loading, currentPage]);

  // After login: if we're on auth and user is now set, honor post-login redirect (e.g. to profile after onboarding)
  useEffect(() => {
    if (loading || !user || currentPage !== 'auth') return;
    const redirectTo =
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('postLoginRedirect')) ||
      pageData?.returnTo;
    if (redirectTo === 'profile') {
      try {
        sessionStorage.removeItem('postLoginRedirect');
      } catch { /* ignore */ }
      setCurrentPage('profile');
      setPageData(null);
      window.history.pushState({ page: 'profile', data: null }, '', '/profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [user, loading, currentPage, pageData?.returnTo]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page as Page);
        setPageData(event.state.data || null);
      } else {
        // If no state, try to infer from URL
        const path = window.location.pathname;
        if (path === '/') {
          setCurrentPage('home');
          setPageData(null);
        } else {
          const page = path.replace('/', '') as Page;
          setCurrentPage(page);
          setPageData(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Add PWA meta tags
  useEffect(() => {
    // Add manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    // Add theme color meta - read from CSS variable
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    themeColorMeta.content = primaryColor || 'rgba(56, 136, 150, 1)';
    document.head.appendChild(themeColorMeta);

    // Add mobile web app capable (updated from deprecated apple-mobile-web-app-capable)
    const mobileWebAppMeta = document.createElement('meta');
    mobileWebAppMeta.name = 'mobile-web-app-capable';
    mobileWebAppMeta.content = 'yes';
    document.head.appendChild(mobileWebAppMeta);

    // Update viewport meta if it exists, or create it if it doesn't
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    // Ensure viewport has proper PWA settings
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

    return () => {
      document.head.removeChild(manifestLink);
      document.head.removeChild(themeColorMeta);
      document.head.removeChild(mobileWebAppMeta);
    };
  }, []);

  const handleNavigate = (page: string, data?: unknown) => {
    // Check if page requires authentication
    if (!user && protectedPages.includes(page as Page)) {
      setCurrentPage('auth');
      window.history.pushState({ page: 'auth', data: null }, '', '/');
      return;
    }
    setCurrentPage(page as Page);
    setPageData(data || null);
    
    // Update browser URL to match the page
    const pageUrl = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({ page, data }, '', pageUrl);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    // Show loading state while checking authentication
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return isMobile ? (
          <HomePageMobile onNavigate={handleNavigate} isLoggedIn={!!user} />
        ) : (
          <HomePageDesktop onNavigate={handleNavigate} isLoggedIn={!!user} />
        );
      case 'auth':
        return <LoginPage onNavigate={handleNavigate} returnTo={pageData?.returnTo} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegistrationPage onNavigate={handleNavigate} />;
      case 'profile-selection':
        return <ProfileSelectionPage onNavigate={handleNavigate} userName={pageData?.userName} />;
      case 'profile-complete':
        return <ProfileCompletePage onNavigate={handleNavigate} />;
      case 'profile-verified':
        return <ProfileVerifiedPage onNavigate={handleNavigate} />;
      case 'profile-onboarding':
        return <ProfileOnboardingPage onNavigate={handleNavigate} />;
      case 'onboarding-flow':
        return <OnboardingFlowPage onNavigate={handleNavigate} />;
      case 'community':
        return <CommunityPage onNavigate={handleNavigate} scrollToPostId={pageData?.scrollToPostId} />;
      case 'stories':
        return <StoriesPage />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'user-profile':
        return (
          <UserProfileView
            userId={pageData?.userId}
            onBack={() => {
              // Use browser's back button to maintain proper history
              window.history.back();
            }}
            onNavigate={handleNavigate}
          />
        );
      case 'all-stories':
        return <AllStoriesPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'tutorial':
        return <OnboardingPage onNavigate={handleNavigate} />;
      case 'daily-tips':
      case 'help-center':
        return (
          <div className="min-h-screen flex items-center justify-center bg-background pt-spacing-5xl pb-spacing-5xl">
            <div className="w-full max-w-[1280px] mx-auto px-spacing-xl">
              <div className="text-center">
                <h2 className="mb-spacing-xl capitalize">{currentPage.replace('-', ' ')}</h2>
                <p className="text-muted-foreground mb-spacing-4xl">Coming soon!</p>
                <button
                  onClick={() => handleNavigate('home')}
                  className="px-spacing-4xl py-spacing-sm bg-primary text-primary-foreground rounded-button"
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return isMobile ? (
          <HomePageMobile onNavigate={handleNavigate} />
        ) : (
          <HomePageDesktop onNavigate={handleNavigate} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - Hidden only on auth, register, profile-selection, profile-complete, profile-verified, profile-onboarding, onboarding-flow and admin pages */}
      {currentPage !== 'auth' && currentPage !== 'forgot-password' && currentPage !== 'register' && currentPage !== 'profile-selection' && currentPage !== 'profile-complete' && currentPage !== 'profile-verified' && currentPage !== 'profile-onboarding' && currentPage !== 'onboarding-flow' && currentPage !== 'admin' && (
        <>
          {isMobile ? (
            <MobileNavigation onNavigate={handleNavigate} currentPage={currentPage} />
          ) : (
            currentPage === 'home' ? null : (
              <DesktopNavigation onNavigate={handleNavigate} currentPage={currentPage} />
            )
          )}
        </>
      )}

      {/* Page Content */}
      <main className={currentPage !== 'auth' && currentPage !== 'forgot-password' && currentPage !== 'register' && currentPage !== 'profile-selection' && currentPage !== 'profile-complete' && currentPage !== 'profile-verified' && currentPage !== 'profile-onboarding' && currentPage !== 'onboarding-flow' && currentPage !== 'admin' && currentPage !== 'home' && currentPage !== 'tutorial' && currentPage !== 'profile' && currentPage !== 'user-profile' && !isMobile ? 'pt-[72px]' : ''}>
        {renderPage()}
      </main>

      {/* Email Verification Modal */}
      {showEmailVerificationModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '32px',
            maxWidth: '450px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              background: 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                <polyline points="3,7 12,13 21,7"></polyline>
              </svg>
            </div>

            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#192126',
              marginBottom: '16px'
            }}>
              Verify Your Email
            </h2>

            <p style={{
              fontSize: '16px',
              color: '#979797',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>

            <p style={{
              fontSize: '14px',
              color: '#979797',
              lineHeight: '1.5',
              marginBottom: '24px'
            }}>
              Can't find the email? Check your spam folder or click below to resend.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowEmailVerificationModal(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#388896',
                  color: 'white',
                  border: 'none',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Got it
              </button>
              <button
                onClick={async () => {
                  const { data: { session } } = await supabase.auth.getSession();
                  if (session?.user?.email) {
                    await supabase.auth.resend({
                      type: 'signup',
                      email: session.user.email
                    });
                    alert('Verification email resent! Please check your inbox.');
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'white',
                  color: '#388896',
                  border: '2px solid #388896',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Resend Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
