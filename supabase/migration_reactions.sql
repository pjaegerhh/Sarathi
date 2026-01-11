-- Migration: Add reactions/feelings system for posts, comments, and replies
-- This allows users to react with emotions to content

-- ============================================================================
-- REACTIONS TABLE
-- ============================================================================

-- Table to store user reactions to posts
CREATE TABLE IF NOT EXISTS public.post_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    reaction_type TEXT NOT NULL CHECK (reaction_type IN (
        'sad',          -- 😢 Sad
        'shocked',      -- 😱 Shocked
        'angry',        -- 😠 Angry
        'crying',       -- 😭 Crying
        'excited',      -- 🤩 Excited
        'loved',        -- ❤️ Loved
        'wonderful',    -- 😊 Wonderful
        'relaxed',      -- 😌 Relaxed
        'good',         -- 😃 Good
        'nervous',      -- 😰 Nervous
        'in_disbelief', -- 😲 In disbelief
        'amazing',      -- 🤗 Amazing
        'disappointed', -- 😞 Disappointed
        'wow',          -- 😮 Wow
        'happy',        -- 😄 Happy
        'annoyed'       -- 😒 Annoyed
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one reaction per user per post
    UNIQUE(post_id, user_id)
);

-- Table to store user reactions to comments
CREATE TABLE IF NOT EXISTS public.comment_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    comment_id UUID NOT NULL REFERENCES public.post_comments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    reaction_type TEXT NOT NULL CHECK (reaction_type IN (
        'sad',          -- 😢 Sad
        'shocked',      -- 😱 Shocked
        'angry',        -- 😠 Angry
        'crying',       -- 😭 Crying
        'excited',      -- 🤩 Excited
        'loved',        -- ❤️ Loved
        'wonderful',    -- 😊 Wonderful
        'relaxed',      -- 😌 Relaxed
        'good',         -- 😃 Good
        'nervous',      -- 😰 Nervous
        'in_disbelief', -- 😲 In disbelief
        'amazing',      -- 🤗 Amazing
        'disappointed', -- 😞 Disappointed
        'wow',          -- 😮 Wow
        'happy',        -- 😄 Happy
        'annoyed'       -- 😒 Annoyed
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one reaction per user per comment
    UNIQUE(comment_id, user_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_post_reactions_post_id ON public.post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_user_id ON public.post_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_type ON public.post_reactions(reaction_type);

CREATE INDEX IF NOT EXISTS idx_comment_reactions_comment_id ON public.comment_reactions(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_reactions_user_id ON public.comment_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_comment_reactions_type ON public.comment_reactions(reaction_type);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_reactions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view reactions
CREATE POLICY "Anyone can view post reactions"
    ON public.post_reactions FOR SELECT
    USING (true);

CREATE POLICY "Anyone can view comment reactions"
    ON public.comment_reactions FOR SELECT
    USING (true);

-- Policy: Users can insert their own reactions
CREATE POLICY "Users can add their own post reactions"
    ON public.post_reactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can add their own comment reactions"
    ON public.comment_reactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reactions
CREATE POLICY "Users can update their own post reactions"
    ON public.post_reactions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own comment reactions"
    ON public.comment_reactions FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy: Users can delete their own reactions
CREATE POLICY "Users can delete their own post reactions"
    ON public.post_reactions FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comment reactions"
    ON public.comment_reactions FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS FOR REACTION COUNTS
-- ============================================================================

-- Function to get reaction counts for a post
CREATE OR REPLACE FUNCTION get_post_reaction_counts(post_uuid UUID)
RETURNS TABLE (
    reaction_type TEXT,
    count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pr.reaction_type,
        COUNT(*)::BIGINT as count
    FROM public.post_reactions pr
    WHERE pr.post_id = post_uuid
    GROUP BY pr.reaction_type
    ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get reaction counts for a comment
CREATE OR REPLACE FUNCTION get_comment_reaction_counts(comment_uuid UUID)
RETURNS TABLE (
    reaction_type TEXT,
    count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cr.reaction_type,
        COUNT(*)::BIGINT as count
    FROM public.comment_reactions cr
    WHERE cr.comment_id = comment_uuid
    GROUP BY cr.reaction_type
    ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql STABLE;
