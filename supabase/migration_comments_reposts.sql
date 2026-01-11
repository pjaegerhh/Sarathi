-- =====================================================
-- COMMENTS AND REPOSTS MIGRATION
-- =====================================================
-- This migration adds support for:
-- 1. Comments on posts
-- 2. Reposting functionality
-- 3. Prepared for AI content moderation
-- 4. Prepared for translation features
--
-- Execute this in Supabase SQL Editor

-- =====================================================
-- COMMENTS TABLE
-- =====================================================
-- Stores comments on posts

CREATE TABLE IF NOT EXISTS public.post_comments (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign keys
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    
    -- Comment content
    comment_text TEXT NOT NULL,
    
    -- Parent comment for nested replies (optional)
    parent_comment_id UUID REFERENCES public.post_comments(id) ON DELETE CASCADE,
    
    -- Like count (denormalized)
    like_count INTEGER DEFAULT 0 NOT NULL,
    
    -- AI moderation fields (prepared for future use)
    is_flagged BOOLEAN DEFAULT FALSE,
    moderation_status TEXT CHECK (moderation_status IN (
        'pending',    -- Awaiting moderation
        'approved',   -- Passed moderation
        'rejected',   -- Failed moderation
        'reviewed'    -- Manually reviewed
    )) DEFAULT 'pending',
    moderation_reason TEXT,
    
    -- Translation fields (prepared for future use)
    original_language TEXT,  -- 'en' or 'hi'
    translated_text_en TEXT, -- English translation
    translated_text_hi TEXT, -- Hindi translation
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Constraints
    CONSTRAINT comment_text_length CHECK (char_length(comment_text) <= 2000)
);

-- =====================================================
-- COMMENT_LIKES TABLE
-- =====================================================
-- Tracks which users liked which comments

CREATE TABLE IF NOT EXISTS public.comment_likes (
    -- Composite primary key
    comment_id UUID NOT NULL REFERENCES public.post_comments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Primary key constraint
    PRIMARY KEY (comment_id, user_id)
);

-- =====================================================
-- REPOSTS TABLE
-- =====================================================
-- Tracks when users repost content

CREATE TABLE IF NOT EXISTS public.reposts (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign keys
    original_post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    
    -- Optional comment on repost
    repost_comment TEXT,
    
    -- AI moderation fields (prepared for future use)
    is_flagged BOOLEAN DEFAULT FALSE,
    moderation_status TEXT CHECK (moderation_status IN (
        'pending',
        'approved',
        'rejected',
        'reviewed'
    )) DEFAULT 'pending',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Ensure user can't repost same post multiple times
    CONSTRAINT unique_repost UNIQUE (original_post_id, user_id),
    
    -- Constraint for comment length
    CONSTRAINT repost_comment_length CHECK (char_length(repost_comment) <= 500)
);

-- =====================================================
-- UPDATE POSTS TABLE
-- =====================================================
-- Add comment and repost counts to posts table

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS repost_count INTEGER DEFAULT 0 NOT NULL;

-- Update comment_count if it exists but wasn't used
-- (It was already defined in the original schema)

-- =====================================================
-- AI MODERATION LOG TABLE (Optional - for tracking)
-- =====================================================
-- Logs all AI moderation checks for audit purposes

CREATE TABLE IF NOT EXISTS public.moderation_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- What was moderated
    content_type TEXT NOT NULL CHECK (content_type IN ('post', 'comment', 'repost_comment')),
    content_id UUID NOT NULL,
    
    -- Moderation results
    ai_service TEXT, -- 'openai', 'perspective_api', 'local_model', etc.
    is_flagged BOOLEAN NOT NULL,
    confidence_score DECIMAL(3,2), -- 0.00 to 1.00
    flagged_categories TEXT[], -- ['profanity', 'harassment', 'hate_speech', etc.]
    
    -- Original content
    original_text TEXT,
    detected_language TEXT,
    
    -- Timestamps
    checked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- TRANSLATION CACHE TABLE (Optional - for performance)
-- =====================================================
-- Caches translations to avoid repeated API calls

CREATE TABLE IF NOT EXISTS public.translation_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Source
    source_text TEXT NOT NULL,
    source_language TEXT NOT NULL CHECK (source_language IN ('en', 'hi')),
    
    -- Translation
    translated_text TEXT NOT NULL,
    target_language TEXT NOT NULL CHECK (target_language IN ('en', 'hi')),
    
    -- Service used
    translation_service TEXT, -- 'google_translate', 'libre_translate', etc.
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Index for fast lookups
    CONSTRAINT unique_translation UNIQUE (source_text, source_language, target_language)
);

-- =====================================================
-- RLS POLICIES FOR COMMENTS
-- =====================================================

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read comments on visible posts" ON public.post_comments;
DROP POLICY IF EXISTS "Users can create comments" ON public.post_comments;
DROP POLICY IF EXISTS "Users can update own comments" ON public.post_comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON public.post_comments;

-- Read: Users can see comments on posts they can see
CREATE POLICY "Users can read comments on visible posts"
    ON public.post_comments
    FOR SELECT
    USING (
        post_id IN (SELECT id FROM public.posts)
        AND moderation_status != 'rejected'
    );

-- Create: Users can comment on posts they can see
CREATE POLICY "Users can create comments"
    ON public.post_comments
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND post_id IN (SELECT id FROM public.posts)
    );

-- Update: Users can update their own comments
CREATE POLICY "Users can update own comments"
    ON public.post_comments
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Delete: Users can delete their own comments
CREATE POLICY "Users can delete own comments"
    ON public.post_comments
    FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- RLS POLICIES FOR COMMENT LIKES
-- =====================================================

ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read comment likes" ON public.comment_likes;
DROP POLICY IF EXISTS "Users can like comments" ON public.comment_likes;
DROP POLICY IF EXISTS "Users can unlike comments" ON public.comment_likes;

CREATE POLICY "Users can read comment likes"
    ON public.comment_likes
    FOR SELECT
    USING (comment_id IN (SELECT id FROM public.post_comments));

CREATE POLICY "Users can like comments"
    ON public.comment_likes
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND comment_id IN (SELECT id FROM public.post_comments)
    );

CREATE POLICY "Users can unlike comments"
    ON public.comment_likes
    FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- RLS POLICIES FOR REPOSTS
-- =====================================================

ALTER TABLE public.reposts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read reposts" ON public.reposts;
DROP POLICY IF EXISTS "Users can create reposts" ON public.reposts;
DROP POLICY IF EXISTS "Users can delete own reposts" ON public.reposts;

-- Read: Users can see reposts from visible posts
CREATE POLICY "Users can read reposts"
    ON public.reposts
    FOR SELECT
    USING (
        original_post_id IN (SELECT id FROM public.posts)
        AND moderation_status != 'rejected'
    );

-- Create: Users can repost visible posts
CREATE POLICY "Users can create reposts"
    ON public.reposts
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND original_post_id IN (SELECT id FROM public.posts)
    );

-- Delete: Users can delete their own reposts
CREATE POLICY "Users can delete own reposts"
    ON public.reposts
    FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.post_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON public.post_comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_comments_created ON public.post_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_moderation ON public.post_comments(moderation_status);

CREATE INDEX IF NOT EXISTS idx_comment_likes_comment ON public.comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_user ON public.comment_likes(user_id);

CREATE INDEX IF NOT EXISTS idx_reposts_post ON public.reposts(original_post_id);
CREATE INDEX IF NOT EXISTS idx_reposts_user ON public.reposts(user_id);
CREATE INDEX IF NOT EXISTS idx_reposts_created ON public.reposts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_moderation_log_content ON public.moderation_log(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_moderation_log_checked ON public.moderation_log(checked_at DESC);

CREATE INDEX IF NOT EXISTS idx_translation_cache_lookup ON public.translation_cache(source_text, source_language, target_language);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Update updated_at for comments
DROP TRIGGER IF EXISTS update_comments_updated_at ON public.post_comments;
CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON public.post_comments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Update comment count on posts
CREATE OR REPLACE FUNCTION public.update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.posts
        SET comment_count = comment_count + 1
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.posts
        SET comment_count = GREATEST(comment_count - 1, 0)
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_comment_count_on_insert ON public.post_comments;
CREATE TRIGGER update_comment_count_on_insert
    AFTER INSERT ON public.post_comments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_post_comment_count();

DROP TRIGGER IF EXISTS update_comment_count_on_delete ON public.post_comments;
CREATE TRIGGER update_comment_count_on_delete
    AFTER DELETE ON public.post_comments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_post_comment_count();

-- Update comment like count
CREATE OR REPLACE FUNCTION public.update_comment_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.post_comments
        SET like_count = like_count + 1
        WHERE id = NEW.comment_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.post_comments
        SET like_count = GREATEST(like_count - 1, 0)
        WHERE id = OLD.comment_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_comment_like_count_on_insert ON public.comment_likes;
CREATE TRIGGER update_comment_like_count_on_insert
    AFTER INSERT ON public.comment_likes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_comment_like_count();

DROP TRIGGER IF EXISTS update_comment_like_count_on_delete ON public.comment_likes;
CREATE TRIGGER update_comment_like_count_on_delete
    AFTER DELETE ON public.comment_likes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_comment_like_count();

-- Update repost count on posts
CREATE OR REPLACE FUNCTION public.update_post_repost_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.posts
        SET repost_count = repost_count + 1
        WHERE id = NEW.original_post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.posts
        SET repost_count = GREATEST(repost_count - 1, 0)
        WHERE id = OLD.original_post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_repost_count_on_insert ON public.reposts;
CREATE TRIGGER update_repost_count_on_insert
    AFTER INSERT ON public.reposts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_post_repost_count();

DROP TRIGGER IF EXISTS update_repost_count_on_delete ON public.reposts;
CREATE TRIGGER update_repost_count_on_delete
    AFTER DELETE ON public.reposts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_post_repost_count();

-- =====================================================
-- HELPER FUNCTIONS FOR AI INTEGRATION
-- =====================================================

-- Function to mark content for moderation review
CREATE OR REPLACE FUNCTION public.flag_content_for_review(
    p_content_type TEXT,
    p_content_id UUID,
    p_reason TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
    IF p_content_type = 'post' THEN
        UPDATE public.posts
        SET moderation_status = 'pending'
        WHERE id = p_content_id;
    ELSIF p_content_type = 'comment' THEN
        UPDATE public.post_comments
        SET is_flagged = TRUE,
            moderation_status = 'pending',
            moderation_reason = p_reason
        WHERE id = p_content_id;
    ELSIF p_content_type = 'repost' THEN
        UPDATE public.reposts
        SET is_flagged = TRUE,
            moderation_status = 'pending'
        WHERE id = p_content_id;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Comments support nested replies via parent_comment_id
-- 2. Reposts create a reference to original post (doesn't duplicate)
-- 3. AI moderation fields are prepared but not yet implemented
-- 4. Translation cache will improve performance when AI translation is added
-- 5. Moderation log helps track false positives and improve AI model
-- 6. comment_count and repost_count auto-update via triggers
