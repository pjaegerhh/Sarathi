-- Migration: Restrict reactions to post/comment authors only
-- Description: Updates RLS policies so only the author of a post or comment can add/update/delete reactions on their own content

-- Drop existing policies
DROP POLICY IF EXISTS "Users can add their own post reactions" ON public.post_reactions;
DROP POLICY IF EXISTS "Users can add their own comment reactions" ON public.comment_reactions;
DROP POLICY IF EXISTS "Users can update their own post reactions" ON public.post_reactions;
DROP POLICY IF EXISTS "Users can update their own comment reactions" ON public.comment_reactions;
DROP POLICY IF EXISTS "Users can delete their own post reactions" ON public.post_reactions;
DROP POLICY IF EXISTS "Users can delete their own comment reactions" ON public.comment_reactions;

-- Create new policies that verify the user owns the post/comment
CREATE POLICY "Authors can add reactions to their own posts"
    ON public.post_reactions FOR INSERT
    WITH CHECK (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.posts 
            WHERE id = post_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Authors can add reactions to their own comments"
    ON public.comment_reactions FOR INSERT
    WITH CHECK (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.post_comments 
            WHERE id = comment_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Authors can update reactions on their own posts"
    ON public.post_reactions FOR UPDATE
    USING (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.posts 
            WHERE id = post_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Authors can update reactions on their own comments"
    ON public.comment_reactions FOR UPDATE
    USING (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.post_comments 
            WHERE id = comment_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Authors can delete reactions from their own posts"
    ON public.post_reactions FOR DELETE
    USING (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.posts 
            WHERE id = post_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Authors can delete reactions from their own comments"
    ON public.comment_reactions FOR DELETE
    USING (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.post_comments 
            WHERE id = comment_id 
            AND user_id = auth.uid()
        )
    );
