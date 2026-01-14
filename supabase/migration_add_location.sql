-- Add location field to posts and comments tables

-- Add location column to posts table
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS location TEXT;

-- Add location column to post_comments table
ALTER TABLE public.post_comments
ADD COLUMN IF NOT EXISTS location TEXT;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_location ON public.posts(location);
CREATE INDEX IF NOT EXISTS idx_post_comments_location ON public.post_comments(location);
