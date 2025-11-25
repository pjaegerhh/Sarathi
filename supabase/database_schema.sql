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

