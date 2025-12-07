import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are loaded correctly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Validate required environment variables
if (!supabaseUrl || supabaseUrl === 'undefined') {
  console.error('❌ Missing VITE_SUPABASE_URL environment variable');
  console.error('Please add VITE_SUPABASE_URL to your .env file:');
  console.error('VITE_SUPABASE_URL=https://axytclwosgvuanglpvii.supabase.co');
  throw new Error('Missing VITE_SUPABASE_URL environment variable. Check your .env file.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'undefined') {
  console.error('❌ Missing VITE_SUPABASE_ANON_KEY environment variable');
  console.error('Please add VITE_SUPABASE_ANON_KEY to your .env file.');
  console.error('Get your anon key from: https://supabase.com/dashboard/project/axytclwosgvuanglpvii/settings/api');
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'sarathi-auth-token',
  },
});

// Database types
export interface SarathiUser {
  uuid: string;
  name: string | null;
  first_name: string | null;
  date_of_birth: string | null; // ISO date string
  email: string;
  telephone: string | null;
  age: number | null; // Age of the user
  user_type: 'admin' | 'superadmin' | 'moderator' | 'amputee' | 'caregiver' | 'doctor' | 'practitioner' | 'volunteer';
  prosthesis_type: 'above_knee' | 'below_knee' | null;
  length_usage: 'less_than_6_month' | 'more_than_1_year' | 'more_than_5_years' | null;
  main_challenge: string[] | null; // Array of: fit_comfort, mobility, community, cost_access, training, emotional
  activities: string[] | null; // Array of: rehabilitation, social_life, emotions, pain_relief, work, independence, education, confidence, training, sports, guidance, community, maintenance
  onboarding_completed: boolean | null; // Whether onboarding has been completed
  // New profile page fields
  profession: string | null; // User profession/occupation
  workplace: string | null; // User workplace/company
  place_of_residence: string | null; // User place of residence/city
  my_story: string | null; // User story in HTML format
  cover_picture_url: string | null; // URL to cover picture in Supabase storage
  profile_picture_url: string | null; // URL to profile picture in Supabase storage
  created_at: string;
  updated_at: string;
}

// User activity types
export type ActivityType = 
  | 'post_created'
  | 'comment_created'
  | 'like_given'
  | 'like_received'
  | 'comment_received'
  | 'group_joined'
  | 'badge_earned'
  | 'connection_added';

export interface UserActivity {
  id: number;
  user_id: string;
  activity_type: ActivityType;
  activity_content: string | null;
  related_post_id: number | null;
  related_user_id: string | null;
  created_at: string;
}

