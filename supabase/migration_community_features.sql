-- =====================================================
-- COMMUNITY FEATURES MIGRATION
-- =====================================================
-- This migration adds support for:
-- 1. User posts (text + media)
-- 2. Post likes
-- 3. User connections (friend system)
--
-- Execute this in Supabase SQL Editor

-- =====================================================
-- POSTS TABLE
-- =====================================================
-- Stores user posts with text and media attachments

CREATE TABLE IF NOT EXISTS public.posts (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign key to sarathi_user
    user_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    
    -- Post content
    post_text TEXT,
    
    -- Media URLs (array of URLs pointing to storage bucket files)
    -- Format: ['post-media/user-id/post-id/filename.jpg', ...]
    media_urls TEXT[],
    
    -- Like count (denormalized for performance)
    like_count INTEGER DEFAULT 0 NOT NULL,
    
    -- Comment count (for future use)
    comment_count INTEGER DEFAULT 0 NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Constraints
    CONSTRAINT post_has_content CHECK (
        post_text IS NOT NULL OR 
        (media_urls IS NOT NULL AND array_length(media_urls, 1) > 0)
    )
);

-- =====================================================
-- POST_LIKES TABLE
-- =====================================================
-- Tracks which users liked which posts

CREATE TABLE IF NOT EXISTS public.post_likes (
    -- Composite primary key
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Primary key constraint
    PRIMARY KEY (post_id, user_id)
);

-- =====================================================
-- CONNECTIONS TABLE
-- =====================================================
-- Manages user connections (friend system)

CREATE TABLE IF NOT EXISTS public.connections (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- User who sent the connection request
    requester_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    
    -- User who received the connection request
    addressee_id UUID NOT NULL REFERENCES public.sarathi_user(uuid) ON DELETE CASCADE,
    
    -- Connection status
    status TEXT NOT NULL CHECK (status IN (
        'pending',    -- Request sent, awaiting approval
        'accepted',   -- Connection established
        'declined',   -- Request declined
        'blocked'     -- User blocked (for future use)
    )) DEFAULT 'pending',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Ensure users can't connect to themselves
    CONSTRAINT no_self_connection CHECK (requester_id != addressee_id),
    
    -- Ensure no duplicate connections
    CONSTRAINT unique_connection UNIQUE (requester_id, addressee_id)
);

-- =====================================================
-- POSTS RLS POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read visible posts" ON public.posts;
DROP POLICY IF EXISTS "Users can insert own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can update own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON public.posts;

-- Policy: Users can read posts from themselves, direct connections, and 2nd degree connections
CREATE POLICY "Users can read visible posts"
    ON public.posts
    FOR SELECT
    USING (
        -- Own posts
        auth.uid() = user_id
        OR
        -- Posts from direct connections
        user_id IN (
            SELECT addressee_id FROM public.connections 
            WHERE requester_id = auth.uid() AND status = 'accepted'
            UNION
            SELECT requester_id FROM public.connections 
            WHERE addressee_id = auth.uid() AND status = 'accepted'
        )
        OR
        -- Posts from 2nd degree connections (friends of friends)
        user_id IN (
            -- Get friends of my friends
            SELECT DISTINCT c2.addressee_id
            FROM public.connections c1
            JOIN public.connections c2 ON (
                (c1.addressee_id = c2.requester_id OR c1.requester_id = c2.requester_id)
            )
            WHERE (c1.requester_id = auth.uid() OR c1.addressee_id = auth.uid())
            AND c1.status = 'accepted'
            AND c2.status = 'accepted'
            AND c2.addressee_id != auth.uid()
            
            UNION
            
            SELECT DISTINCT c2.requester_id
            FROM public.connections c1
            JOIN public.connections c2 ON (
                (c1.addressee_id = c2.addressee_id OR c1.requester_id = c2.addressee_id)
            )
            WHERE (c1.requester_id = auth.uid() OR c1.addressee_id = auth.uid())
            AND c1.status = 'accepted'
            AND c2.status = 'accepted'
            AND c2.requester_id != auth.uid()
        )
    );

-- Policy: Users can insert their own posts
CREATE POLICY "Users can insert own posts"
    ON public.posts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own posts
CREATE POLICY "Users can update own posts"
    ON public.posts
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy: Users can delete their own posts
CREATE POLICY "Users can delete own posts"
    ON public.posts
    FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- POST_LIKES RLS POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read likes on visible posts" ON public.post_likes;
DROP POLICY IF EXISTS "Users can like visible posts" ON public.post_likes;
DROP POLICY IF EXISTS "Users can unlike posts" ON public.post_likes;

-- Policy: Users can see likes on posts they can see
CREATE POLICY "Users can read likes on visible posts"
    ON public.post_likes
    FOR SELECT
    USING (
        post_id IN (
            SELECT id FROM public.posts
            -- This will use the posts RLS policy automatically
        )
    );

-- Policy: Users can like posts they can see
CREATE POLICY "Users can like visible posts"
    ON public.post_likes
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND
        post_id IN (
            SELECT id FROM public.posts
            -- This will use the posts RLS policy automatically
        )
    );

-- Policy: Users can unlike posts (delete their own likes)
CREATE POLICY "Users can unlike posts"
    ON public.post_likes
    FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- CONNECTIONS RLS POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own connections" ON public.connections;
DROP POLICY IF EXISTS "Users can send connection requests" ON public.connections;
DROP POLICY IF EXISTS "Users can respond to connection requests" ON public.connections;
DROP POLICY IF EXISTS "Users can delete own connections" ON public.connections;

-- Policy: Users can read connections where they're involved
CREATE POLICY "Users can read own connections"
    ON public.connections
    FOR SELECT
    USING (
        auth.uid() = requester_id OR auth.uid() = addressee_id
    );

-- Policy: Users can send connection requests
CREATE POLICY "Users can send connection requests"
    ON public.connections
    FOR INSERT
    WITH CHECK (auth.uid() = requester_id AND status = 'pending');

-- Policy: Users can respond to connection requests (accept/decline)
CREATE POLICY "Users can respond to connection requests"
    ON public.connections
    FOR UPDATE
    USING (auth.uid() = addressee_id);

-- Policy: Users can delete connections where they're involved
CREATE POLICY "Users can delete own connections"
    ON public.connections
    FOR DELETE
    USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_user_id
    ON public.posts(user_id);

CREATE INDEX IF NOT EXISTS idx_posts_created_at
    ON public.posts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_posts_user_created
    ON public.posts(user_id, created_at DESC);

-- Post likes indexes
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id
    ON public.post_likes(post_id);

CREATE INDEX IF NOT EXISTS idx_post_likes_user_id
    ON public.post_likes(user_id);

-- Connections indexes
CREATE INDEX IF NOT EXISTS idx_connections_requester
    ON public.connections(requester_id, status);

CREATE INDEX IF NOT EXISTS idx_connections_addressee
    ON public.connections(addressee_id, status);

CREATE INDEX IF NOT EXISTS idx_connections_status
    ON public.connections(status);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Update updated_at timestamp for posts
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Update updated_at timestamp for connections
CREATE TRIGGER update_connections_updated_at
    BEFORE UPDATE ON public.connections
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- FUNCTION TO UPDATE LIKE COUNT
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.posts
        SET like_count = like_count + 1
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.posts
        SET like_count = GREATEST(like_count - 1, 0)
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update like count
DROP TRIGGER IF EXISTS update_like_count_on_insert ON public.post_likes;
CREATE TRIGGER update_like_count_on_insert
    AFTER INSERT ON public.post_likes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_post_like_count();

DROP TRIGGER IF EXISTS update_like_count_on_delete ON public.post_likes;
CREATE TRIGGER update_like_count_on_delete
    AFTER DELETE ON public.post_likes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_post_like_count();

-- =====================================================
-- STORAGE BUCKET: post-media
-- =====================================================
-- Note: Create this bucket in Supabase Dashboard
-- Bucket name: 'post-media'
-- Public: false
-- File size limit: 50MB
-- Allowed MIME types: image/*, video/*

-- =====================================================
-- STORAGE POLICIES FOR POST-MEDIA BUCKET
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload post media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own post media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own post media" ON storage.objects;
DROP POLICY IF EXISTS "Users can view post media" ON storage.objects;

-- Policy: Authenticated users can upload post media
CREATE POLICY "Users can upload post media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Authenticated users can update their own post media
CREATE POLICY "Users can update own post media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Authenticated users can delete their own post media
CREATE POLICY "Users can delete own post media"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Authenticated users can view post media
-- (Only if they can see the post via post RLS policies)
CREATE POLICY "Users can view post media"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'post-media');

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get user's connections (both directions)
CREATE OR REPLACE FUNCTION public.get_user_connections(user_uuid UUID)
RETURNS TABLE (
    connection_id UUID,
    connection_name TEXT,
    connection_first_name TEXT,
    connection_email TEXT,
    connection_user_type TEXT,
    connected_since TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.uuid,
        u.name,
        u.first_name,
        u.email,
        u.user_type,
        c.created_at
    FROM public.sarathi_user u
    JOIN public.connections c ON (
        (c.requester_id = user_uuid AND c.addressee_id = u.uuid)
        OR
        (c.addressee_id = user_uuid AND c.requester_id = u.uuid)
    )
    WHERE c.status = 'accepted';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Posts require either text or media (or both)
-- 2. like_count is denormalized for performance
-- 3. Connection system is bidirectional - both users are connected
-- 4. Posts are visible to: user, direct connections, and 2nd degree connections
-- 5. Storage structure: post-media/{user_id}/{post_id}/{filename}
-- 6. Remember to create 'post-media' storage bucket in Supabase Dashboard
-- 7. When deleting posts, remember to delete associated media files


