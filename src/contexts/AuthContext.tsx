import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { supabase, SarathiUser } from '../lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'superadmin' | 'moderator' | 'amputee' | 'caregiver' | 'doctor' | 'practitioner' | 'volunteer';

export interface User {
  id: string;
  email: string;
  name: string | null;
  firstName: string | null;
  telephone: string | null;
  age: number | null;
  userType: UserRole;
  prosthesisType: 'above_knee' | 'below_knee' | null;
  lengthUsage: 'less_than_6_month' | 'more_than_1_year' | 'more_than_5_years' | null;
  mainChallenge: string[] | null;
  activities: string[] | null;
  onboardingCompleted: boolean | null;
  // New profile page fields
  profession: string | null;
  workplace: string | null;
  place_of_residence: string | null;
  my_story: string | null;
  cover_picture_url: string | null;
  profile_picture_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, firstName?: string) => Promise<void>;
  sendPasswordResetCode: (email: string) => Promise<void>;
  verifyPasswordResetCode: (email: string, token: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'facebook' | 'apple') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<SarathiUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to clear auth storage
const clearAuthStorage = () => {
  try {
    localStorage.removeItem('sarathi-auth-token');
    // Also clear any other Supabase-related keys
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('sb-') || key.includes('supabase')) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.error('Error clearing auth storage:', e);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const isSigningOut = useRef(false); // Prevent signout loops

  // Function to safely sign out and clear state
  const safeSignOut = async () => {
    if (isSigningOut.current) {
      return;
    }
    
    isSigningOut.current = true;
    
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Error during signOut:', e);
    }
    
    // Clear storage as a failsafe
    clearAuthStorage();
    
    // Clear state
    setUser(null);
    setSession(null);
    setLoading(false);
    
    isSigningOut.current = false;
  };

  // Function to convert Supabase user to our User type
  const mapSupabaseUserToUser = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      // Add a timeout for the database query - reduced to 5 seconds for faster recovery
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const { data: userData, error } = await supabase
        .from('sarathi_user')
        .select('uuid, name, first_name, email, telephone, user_type, prosthesis_type, length_usage, main_challenge, activities, created_at, updated_at, date_of_birth, age, onboarding_completed, profession, workplace, place_of_residence, my_story, cover_picture_url, profile_picture_url')
        .eq('uuid', supabaseUser.id)
        .single()
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);

      if (error) {
        console.error('❌ Error fetching user profile:', error);
        
        // Check if error is "no rows returned" (PGRST116), timeout, or abort - user was deleted from database
        if (error.code === 'PGRST116' || error.message?.includes('no rows') || error.name === 'AbortError' || error.message?.includes('aborted')) {
          console.warn('⚠️ User not found in database or timeout - signing out...');
          // Don't await here to prevent blocking - let it happen async
          safeSignOut();
          return null;
        }
        
        // For other errors, fallback to basic user from auth metadata
        return {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.full_name || null,
          firstName: supabaseUser.user_metadata?.first_name || null,
          telephone: supabaseUser.user_metadata?.telephone || null,
          age: null,
          userType: 'amputee',
          prosthesisType: null,
          lengthUsage: null,
          mainChallenge: null,
          activities: null,
          onboardingCompleted: null,
          profession: null,
          workplace: null,
          place_of_residence: null,
          my_story: null,
          cover_picture_url: null,
          profile_picture_url: null,
        };
      }
      
      if (!userData) {
        console.warn('⚠️ No user data found for:', supabaseUser.id);
        safeSignOut();
        return null;
      }

      return {
        id: userData.uuid,
        email: userData.email,
        name: userData.name,
        firstName: userData.first_name,
        telephone: userData.telephone,
        age: (userData as any).age || null,
        userType: userData.user_type,
        prosthesisType: userData.prosthesis_type,
        lengthUsage: userData.length_usage,
        mainChallenge: userData.main_challenge,
        activities: userData.activities,
        onboardingCompleted: (userData as any).onboarding_completed || null,
        profession: (userData as any).profession || null,
        workplace: (userData as any).workplace || null,
        place_of_residence: (userData as any).place_of_residence || null,
        my_story: (userData as any).my_story || null,
        cover_picture_url: (userData as any).cover_picture_url || null,
        profile_picture_url: (userData as any).profile_picture_url || null,
      };
    } catch (error) {
      console.error('❌ Exception in mapSupabaseUserToUser:', error);
      safeSignOut();
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    if (initialized) {
      return;
    }
    
    let isMounted = true;
    
    // Failsafe timeout - always complete loading after 8 seconds for faster recovery
    const failsafeTimeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('⚠️ Auth initialization timeout - forcing completion');
        setUser(null);
        setSession(null);
        setLoading(false);
        setInitialized(true);
      }
    }, 8000);
    
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (error) {
          console.error('❌ Error getting session:', error);
          clearAuthStorage(); // Clear on error
          setLoading(false);
          setInitialized(true);
          return;
        }
        
        setSession(session);
        
        if (session?.user) {
          const mappedUser = await mapSupabaseUserToUser(session.user);
          
          if (!isMounted) return;
          
          setUser(mappedUser);
          
          // If mappedUser is null, it means user was deleted - state is already cleared by safeSignOut
        }
        
        setLoading(false);
        setInitialized(true);
        
      } catch (error) {
        console.error('❌ Error initializing auth:', error);
        if (isMounted) {
          clearAuthStorage(); // Clear on error
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;
      
      // Handle sign out event
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        setLoading(false);
        return;
      }
      
      setSession(session);
      
      if (session?.user) {
        // Only fetch profile if we're already initialized to avoid double fetch
        if (initialized) {
          try {
            const mappedUser = await mapSupabaseUserToUser(session.user);
            
            if (!isMounted) return;
            
            setUser(mappedUser);
          } catch (e) {
            console.error('❌ Auth change - profile fetch failed:', e);
          }
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(failsafeTimeout);
      subscription.unsubscribe();
    };
  }, [initialized]);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || 'Login failed');
      }

      if (data.user) {
        const mappedUser = await mapSupabaseUserToUser(data.user);
        setUser(mappedUser);
        setSession(data.session);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, firstName?: string) => {
    try {
      // First, sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            first_name: firstName || name,
          },
        },
      });

      if (error) {
        throw new Error(error.message || 'Signup failed');
      }

      if (data.user) {
        // Update the user profile with the name
        const { error: updateError } = await supabase
          .from('sarathi_user')
          .update({
            name,
            first_name: firstName || name,
          })
          .eq('uuid', data.user.id);

        if (updateError) {
          console.error('Error updating user profile:', updateError);
        }

        const mappedUser = await mapSupabaseUserToUser(data.user);
        setUser(mappedUser);
        setSession(data.session);
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const sendPasswordResetCode = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    if (error) {
      const status = (error as { status?: number }).status;
      if (status === 429) throw new Error('RATE_LIMIT_OTP');
      throw new Error(error.message);
    }
  };

  const verifyPasswordResetCode = async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) throw new Error(error.message);
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      const msg = error.message?.toLowerCase() ?? '';
      const isSamePassword =
        (error as any).status === 422 ||
        msg.includes('same') ||
        msg.includes('different from the old') ||
        msg.includes('reuse') ||
        msg.includes('current password');
      if (isSamePassword) throw new Error('PASSWORD_SAME_AS_OLD');
      throw new Error(error.message);
    }
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session?.user) {
      const mappedUser = await mapSupabaseUserToUser(sessionData.session.user);
      setUser(mappedUser);
      setSession(sessionData.session);
    }
  };

  const loginWithProvider = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        throw new Error(error.message || `${provider} login failed`);
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Check if there's an active session before trying to sign out
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (currentSession) {
        // Only call signOut if there's an active session to avoid 403 errors
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error) {
          console.error('Logout error from Supabase:', error);
        }
      }
      
      // Always clear local state
      setUser(null);
      setSession(null);
      
      // Clear any stored auth data
      clearAuthStorage();
    } catch (error: any) {
      console.error('Logout error:', error);
      
      // Still clear local state even on error
      setUser(null);
      setSession(null);
      clearAuthStorage();
    }
  };

  const updateProfile = async (updates: Partial<SarathiUser>) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      const { error } = await supabase
        .from('sarathi_user')
        .update(updates)
        .eq('uuid', user.id);

      if (error) {
        throw new Error(error.message || 'Failed to update profile');
      }

      // Refresh user data from database to get updated fields
      if (session?.user) {
        const mappedUser = await mapSupabaseUserToUser(session.user);
        if (mappedUser) {
          setUser(mappedUser);
        }
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, login, signup, sendPasswordResetCode, verifyPasswordResetCode, updatePassword, loginWithProvider, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
