-- Sarathi Database Schema
-- Remember: All schema edits have to take place in Supabase GUI
-- This file is for documentation purposes only - SQL will be executed manually

-- =====================================================
-- SARATHI_USER TABLE
-- =====================================================
-- This table stores all user information for the Sarathi platform
-- Admin and Superadmin users have full access to all tables and fields

-- Create sarathi_user table
-- Execute this in Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS public.sarathi_user (
    -- Primary key using Supabase auth UUID
    uuid UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Basic user information
    name TEXT,
    first_name TEXT,
    date_of_birth DATE,
    email TEXT UNIQUE NOT NULL,
    telephone TEXT,
    
    -- User type/role
    user_type TEXT NOT NULL CHECK (user_type IN (
        'admin',
        'superadmin',
        'moderator',
        'amputee',
        'caregiver',
        'doctor',
        'practitioner',
        'volunteer'
    )) DEFAULT 'amputee',
    
    -- Prosthesis information
    prosthesis_type TEXT CHECK (prosthesis_type IN (
        'above_knee',
        'below_knee'
    )),
    
    -- Length of usage
    length_usage TEXT CHECK (length_usage IN (
        'less_than_6_month',
        'more_than_1_year',
        'more_than_5_years'
    )),
    
    -- Main challenges (stored as array)
    main_challenge TEXT[] CHECK (
        main_challenge <@ ARRAY[
            'fit_comfort',
            'mobility',
            'community',
            'cost_access',
            'training',
            'emotional'
        ]::TEXT[]
    ),
    
    -- Activities (stored as array)
    activities TEXT[] CHECK (
        activities <@ ARRAY[
            'rehabilitation',
            'social_life',
            'emotions',
            'pain_relief',
            'work',
            'independence',
            'education',
            'confidence',
            'training',
            'sports',
            'guidance',
            'community',
            'maintenance'
        ]::TEXT[]
    ),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on the table
ALTER TABLE public.sarathi_user ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can read own data"
    ON public.sarathi_user
    FOR SELECT
    USING (auth.uid() = uuid);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
    ON public.sarathi_user
    FOR UPDATE
    USING (auth.uid() = uuid);

-- Policy: Users can insert their own data
CREATE POLICY "Users can insert own data"
    ON public.sarathi_user
    FOR INSERT
    WITH CHECK (auth.uid() = uuid);

-- NOTE: For admin access, you need to create a separate function
-- that uses SECURITY DEFINER to bypass RLS. 
-- Alternatively, disable RLS for service role key access only.

-- To give admins full access, you can either:
-- 1. Use the Supabase service role key (bypasses RLS)
-- 2. Create a function with SECURITY DEFINER
-- 3. Or use this simplified policy (less secure but works):

-- Uncomment ONLY if you need admin policies (may cause issues):
/*
CREATE POLICY "Admins can do everything"
    ON public.sarathi_user
    FOR ALL
    USING (
        (SELECT user_type FROM public.sarathi_user WHERE uuid = auth.uid()) 
        IN ('admin', 'superadmin')
    );
*/

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_sarathi_user_email
    ON public.sarathi_user(email);

-- Index on user_type for role-based queries
CREATE INDEX IF NOT EXISTS idx_sarathi_user_type
    ON public.sarathi_user(user_type);

-- =====================================================
-- TRIGGER FOR UPDATED_AT
-- =====================================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_sarathi_user_updated_at
    BEFORE UPDATE ON public.sarathi_user
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- FUNCTION TO CREATE USER PROFILE AUTOMATICALLY
-- =====================================================

-- This function creates a sarathi_user profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.sarathi_user (uuid, email, user_type)
    VALUES (
        NEW.id,
        NEW.email,
        'amputee'  -- Default user type
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Admin and Superadmin users are already created
-- 2. No kv_store is used in this implementation
-- 3. All arrays can be empty or null
-- 4. prosthesis_type, length_usage can be null for non-amputee users
-- 5. main_challenge and activities are stored as PostgreSQL arrays
-- 6. Email verification should be enabled in Supabase Auth settings
-- 7. OAuth providers (Google, Facebook, Apple) should be configured in Supabase Auth settings

-- =====================================================
-- USER_STORIES TABLE
-- =====================================================
-- This table stores user stories with media files (images/videos)
-- Media files are stored in the 'profile-media' storage bucket

-- Create user_stories table
CREATE TABLE IF NOT EXISTS public.user_stories (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign key to sarathi_user
    user_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    
    -- Story content
    story_text TEXT,
    
    -- Media URLs (array of URLs pointing to storage bucket files)
    -- Format: ['profile-media/user-id/story-id/filename.jpg', ...]
    media_urls TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- USER_STORIES RLS POLICIES
-- =====================================================

-- Enable RLS on the table
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to make script idempotent)
DROP POLICY IF EXISTS "Users can read own stories" ON public.user_stories;
DROP POLICY IF EXISTS "Public can read all stories" ON public.user_stories;
DROP POLICY IF EXISTS "Users can insert own stories" ON public.user_stories;
DROP POLICY IF EXISTS "Users can update own stories" ON public.user_stories;
DROP POLICY IF EXISTS "Users can delete own stories" ON public.user_stories;

-- Policy: Users can read their own stories
CREATE POLICY "Users can read own stories"
    ON public.user_stories
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Public can read all stories (for viewing other profiles)
CREATE POLICY "Public can read all stories"
    ON public.user_stories
    FOR SELECT
    USING (true);

-- Policy: Users can insert their own stories
CREATE POLICY "Users can insert own stories"
    ON public.user_stories
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own stories
CREATE POLICY "Users can update own stories"
    ON public.user_stories
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy: Users can delete their own stories
CREATE POLICY "Users can delete own stories"
    ON public.user_stories
    FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- USER_STORIES INDEXES
-- =====================================================

-- Index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_stories_user_id
    ON public.user_stories(user_id);

-- Index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_user_stories_created_at
    ON public.user_stories(created_at DESC);

-- =====================================================
-- USER_STORIES TRIGGER
-- =====================================================

-- Drop trigger if it exists (to make script idempotent)
DROP TRIGGER IF EXISTS update_user_stories_updated_at ON public.user_stories;

-- Create trigger to auto-update updated_at timestamp
CREATE TRIGGER update_user_stories_updated_at
    BEFORE UPDATE ON public.user_stories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- STORAGE BUCKET: profile-media
-- =====================================================
-- Note: Storage buckets are created via Supabase Dashboard or API
-- Bucket name: 'profile-media'
-- Public: false (controlled by policies below)
-- File size limit: Configure in dashboard (e.g., 50MB)
-- Allowed MIME types: image/*, video/*

-- =====================================================
-- STORAGE POLICIES FOR PROFILE-MEDIA BUCKET
-- =====================================================

-- Drop existing policies if they exist (to make script idempotent)
DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
DROP POLICY IF EXISTS "Public can view profile media" ON storage.objects;

-- Policy: Authenticated users can upload to their own folder
CREATE POLICY "Users can upload to own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Authenticated users can update their own files
CREATE POLICY "Users can update own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Authenticated users can delete their own files
CREATE POLICY "Users can delete own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Anyone can view profile media files (public read)
CREATE POLICY "Public can view profile media"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-media');

-- =====================================================
-- USER_STORIES NOTES
-- =====================================================
-- 1. Each user can have multiple stories
-- 2. Media files should be uploaded to 'profile-media' bucket first
-- 3. Store the full storage path in media_urls array
-- 4. Frontend should use supabase.storage.from('profile-media').getPublicUrl() 
--    to get the actual URL for display
-- 5. When deleting a story, remember to also delete associated media files 
--    from storage bucket
-- 6. story_text and media_urls can be null/empty, but at least one should exist
-- 7. File structure in bucket: profile-media/{user_id}/{story_id}/{filename}
-- 8. First folder must match the authenticated user's ID for upload policies

