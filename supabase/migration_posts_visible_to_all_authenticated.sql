-- Allow all logged-in users to see all posts (temporary: no connection filter)
-- Replaces "Users can read visible posts" which restricted to own + connections + 2nd degree.

DROP POLICY IF EXISTS "Users can read visible posts" ON public.posts;

CREATE POLICY "Users can read visible posts"
    ON public.posts
    FOR SELECT
    USING (auth.uid() IS NOT NULL);
