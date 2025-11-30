import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, SarathiUser } from '../lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'superadmin' | 'moderator' | 'amputee' | 'caregiver' | 'doctor' | 'practitioner' | 'volunteer';

export interface User {
  id: string;
  email: string;
  name: string | null;
  firstName: string | null;
  telephone: string | null;
  userType: UserRole;
  prosthesisType: 'above_knee' | 'below_knee' | null;
  lengthUsage: 'less_than_6_month' | 'more_than_1_year' | 'more_than_5_years' | null;
  mainChallenge: string[] | null;
  activities: string[] | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, firstName?: string) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'facebook' | 'apple') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<SarathiUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  console.log('🔐 AuthProvider mounting...', { initialized, loading, hasUser: !!user });

  // Function to convert Supabase user to our User type
  const mapSupabaseUserToUser = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      console.log('👤 Fetching user profile for:', supabaseUser.id);
      
      // Select exact columns that exist in the database
      const { data: userData, error } = await supabase
        .from('sarathi_user')
        .select('uuid, name, first_name, email, telephone, user_type, prosthesis_type, length_usage, main_challenge, activities, created_at, updated_at, date_of_birth')
        .eq('uuid', supabaseUser.id)
        .single();

      if (error) {
        console.error('❌ Error fetching user profile:', error);
        // Fallback to basic user
        return {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.full_name || null,
          firstName: supabaseUser.user_metadata?.first_name || null,
          telephone: supabaseUser.user_metadata?.telephone || null,
          userType: 'amputee',
          prosthesisType: null,
          lengthUsage: null,
          mainChallenge: null,
          activities: null,
        };
      }
      
      if (!userData) {
        console.warn('⚠️ No user data found for:', supabaseUser.id);
        return null;
      }

      console.log('✅ User profile loaded from database:', userData);

      return {
        id: userData.uuid,
        email: userData.email,
        name: userData.name,
        firstName: userData.first_name,
        telephone: userData.telephone,
        userType: userData.user_type,
        prosthesisType: userData.prosthesis_type,
        lengthUsage: userData.length_usage,
        mainChallenge: userData.main_challenge,
        activities: userData.activities,
      };
    } catch (error) {
      console.error('❌ Exception in mapSupabaseUserToUser:', error);
      
      // Ultimate fallback
      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: null,
        firstName: null,
        telephone: null,
        userType: 'amputee',
        prosthesisType: null,
        lengthUsage: null,
        mainChallenge: null,
        activities: null,
      };
    }
  };

  // Initialize auth state
  useEffect(() => {
    if (initialized) {
      console.log('⏭️ Already initialized, skipping');
      return;
    }
    
    console.log('🚀 Auth initialization starting...');
    let isMounted = true;
    
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (error) {
          console.error('❌ Error getting session:', error);
          setLoading(false);
          setInitialized(true);
          return;
        }
        
        console.log('📦 Initial session:', session ? 'Found' : 'None');
        setSession(session);
        
        if (session?.user) {
          console.log('👤 Has user in session, fetching profile...');
          const mappedUser = await mapSupabaseUserToUser(session.user);
          
          if (!isMounted) return;
          
          console.log('✅ Profile mapping complete:', mappedUser ? 'Success' : 'Failed');
          setUser(mappedUser);
        } else {
          console.log('👤 No user in session');
        }
        
        setLoading(false);
        setInitialized(true);
        console.log('✅ Auth initialization complete');
        
      } catch (error) {
        console.error('❌ Error initializing auth:', error);
        if (isMounted) {
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
      
      console.log('🔔 Auth state changed:', event, session ? 'Has session' : 'No session');
      
      // Process all events, including during initialization for email verification
      // Don't skip SIGNED_IN during initialization as it could be email verification
      
      setSession(session);
      
      if (session?.user) {
        console.log('👤 Auth change - fetching profile...');
        const mappedUser = await mapSupabaseUserToUser(session.user);
        
        if (!isMounted) return;
        
        console.log('✅ Auth change - profile mapped:', mappedUser ? 'Success' : 'Failed');
        setUser(mappedUser);
      } else {
        console.log('👤 Auth change - no user');
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('🧹 Auth cleanup');
      isMounted = false;
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
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message || 'Logout failed');
      }
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
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

      // Refresh user data
      if (session?.user) {
        const mappedUser = await mapSupabaseUserToUser(session.user);
        setUser(mappedUser);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, login, signup, loginWithProvider, logout, updateProfile }}
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
