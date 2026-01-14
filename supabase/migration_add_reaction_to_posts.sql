-- Add reaction_type field to posts and post_comments tables
-- This is for the author's feeling/reaction when creating the post/comment
-- (different from reactions by other users)

-- Add reaction_type column to posts table
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS reaction_type TEXT CHECK (reaction_type IN (
    'sad',
    'shocked',
    'angry',
    'crying',
    'excited',
    'loved',
    'wonderful',
    'relaxed',
    'good',
    'nervous',
    'in_disbelief',
    'amazing',
    'disappointed',
    'wow',
    'happy',
    'annoyed'
));

-- Add reaction_type column to post_comments table
ALTER TABLE public.post_comments
ADD COLUMN IF NOT EXISTS reaction_type TEXT CHECK (reaction_type IN (
    'sad',
    'shocked',
    'angry',
    'crying',
    'excited',
    'loved',
    'wonderful',
    'relaxed',
    'good',
    'nervous',
    'in_disbelief',
    'amazing',
    'disappointed',
    'wow',
    'happy',
    'annoyed'
));

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_reaction_type ON public.posts(reaction_type);
CREATE INDEX IF NOT EXISTS idx_post_comments_reaction_type ON public.post_comments(reaction_type);

-- Add comment
COMMENT ON COLUMN public.posts.reaction_type IS 'Author''s feeling/reaction when creating the post';
COMMENT ON COLUMN public.post_comments.reaction_type IS 'Author''s feeling/reaction when creating the comment';
