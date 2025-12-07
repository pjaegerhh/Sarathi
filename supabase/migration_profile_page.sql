-- =====================================================
-- PROFILE PAGE MIGRATION
-- =====================================================
-- This migration adds the necessary fields and tables for the profile page redesign
-- Execute this entire script in Supabase SQL Editor

-- Step 1: Add new profile fields to sarathi_user table
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS profession TEXT,
ADD COLUMN IF NOT EXISTS workplace TEXT,
ADD COLUMN IF NOT EXISTS place_of_residence TEXT,
ADD COLUMN IF NOT EXISTS my_story TEXT, -- HTML content for user story
ADD COLUMN IF NOT EXISTS cover_picture_url TEXT, -- URL to cover picture in storage
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT; -- URL to profile picture in storage

-- Add comments for documentation
COMMENT ON COLUMN public.sarathi_user.profession IS 'User profession/occupation';
COMMENT ON COLUMN public.sarathi_user.workplace IS 'User workplace/company';
COMMENT ON COLUMN public.sarathi_user.place_of_residence IS 'User place of residence/city';
COMMENT ON COLUMN public.sarathi_user.my_story IS 'User story in HTML format';
COMMENT ON COLUMN public.sarathi_user.cover_picture_url IS 'URL to cover picture in Supabase storage';
COMMENT ON COLUMN public.sarathi_user.profile_picture_url IS 'URL to profile picture in Supabase storage';

-- Step 2: Create activities table for tracking user activities
CREATE TABLE IF NOT EXISTS public.user_activities (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL CHECK (activity_type IN (
        'post_created',
        'comment_created',
        'like_given',
        'like_received',
        'comment_received',
        'group_joined',
        'badge_earned',
        'connection_added'
    )),
    activity_content TEXT, -- JSON or text content describing the activity
    related_post_id BIGINT, -- Reference to post if applicable (will be added when posts table exists)
    related_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Other user involved in activity
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on user_id and created_at for fast queries
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id_created_at 
    ON public.user_activities(user_id, created_at DESC);

-- Add RLS policies for user_activities
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Users can view their own activities
CREATE POLICY "Users can view their own activities"
    ON public.user_activities FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own activities
CREATE POLICY "Users can insert their own activities"
    ON public.user_activities FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all activities
CREATE POLICY "Admins can view all activities"
    ON public.user_activities FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.sarathi_user
            WHERE uuid = auth.uid()
            AND user_type IN ('admin', 'superadmin')
        )
    );

-- Add comment for documentation
COMMENT ON TABLE public.user_activities IS 'Stores user activity history for display on profile page';

-- Step 3: Verify the migration
SELECT 
    'Migration Complete!' as status,
    'New columns added to sarathi_user table' as user_table_status,
    'user_activities table created' as activities_table_status;

-- Show updated user table schema
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'sarathi_user' 
AND column_name IN ('profession', 'workplace', 'place_of_residence', 'my_story', 'cover_picture_url', 'profile_picture_url')
ORDER BY ordinal_position;

-- Show activities table schema
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_activities'
ORDER BY ordinal_position;

