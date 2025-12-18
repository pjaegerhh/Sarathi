-- =====================================================
-- USER_STORIES TABLE MIGRATION
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
-- ROW LEVEL SECURITY (RLS) POLICIES
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
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_stories_user_id
    ON public.user_stories(user_id);

-- Index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_user_stories_created_at
    ON public.user_stories(created_at DESC);

-- =====================================================
-- TRIGGER FOR UPDATED_AT
-- =====================================================

-- Drop trigger if it exists (to make script idempotent)
DROP TRIGGER IF EXISTS update_user_stories_updated_at ON public.user_stories;

-- Create trigger to auto-update updated_at timestamp
CREATE TRIGGER update_user_stories_updated_at
    BEFORE UPDATE ON public.user_stories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Each user can have multiple stories
-- 2. Media files should be uploaded to 'profile-media' bucket first
-- 3. Store the full storage path in media_urls array
-- 4. Frontend should use supabase.storage.from('profile-media').getPublicUrl() 
--    to get the actual URL for display
-- 5. When deleting a story, remember to also delete associated media files 
--    from storage bucket
-- 6. story_text and media_urls can be null/empty, but at least one should exist
