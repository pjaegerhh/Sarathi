-- Add mentioned_display_names to posts and post_comments
-- Stores display names (e.g. "FirstName LastName") for @mentions that resolved to real users.
-- Used when rendering to only show @mentions in bold when they match a known user.

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS mentioned_display_names TEXT[] DEFAULT '{}';

ALTER TABLE public.post_comments
  ADD COLUMN IF NOT EXISTS mentioned_display_names TEXT[] DEFAULT '{}';

COMMENT ON COLUMN public.posts.mentioned_display_names IS 'Display names of users mentioned in post_text (e.g. "John Doe") that resolved to real users';
COMMENT ON COLUMN public.post_comments.mentioned_display_names IS 'Display names of users mentioned in comment_text that resolved to real users';
