-- =====================================================
-- STORAGE POLICIES FOR PROFILE-MEDIA BUCKET
-- =====================================================
-- These policies allow authenticated users to upload media
-- and anyone to view media files

-- Enable RLS on storage.objects for profile-media bucket
-- Note: This might already be enabled, running it again won't hurt

-- Drop existing policies if they exist (to make script idempotent)
DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
DROP POLICY IF EXISTS "Public can view profile media" ON storage.objects;

-- Policy: Authenticated users can upload to their own folder
CREATE POLICY "Users can upload to own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Authenticated users can update their own files
CREATE POLICY "Users can update own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Authenticated users can delete their own files
CREATE POLICY "Users can delete own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Anyone can view profile media files (public read)
CREATE POLICY "Public can view profile media"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-media');

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Make sure the 'profile-media' bucket exists
-- 2. File structure: profile-media/{user_id}/{story_id}/{filename}
-- 3. First folder must match the authenticated user's ID
-- 4. Public can read but only owners can write/delete
