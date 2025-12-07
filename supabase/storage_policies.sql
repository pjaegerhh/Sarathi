-- =====================================================
-- STORAGE RLS POLICIES
-- =====================================================
-- Execute this in Supabase SQL Editor if automatic setup fails
-- Or run: npm run setup:storage

-- RLS Policies for profile-media bucket

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can upload to their own profile folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view all profile pictures" ON storage.objects;

-- Create new policies
CREATE POLICY "Users can upload to their own profile folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own profile files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own profile files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users can view all profile pictures"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'profile-media');

-- RLS Policies for post-media bucket

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can upload to their own post folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own post files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own post files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view all post media" ON storage.objects;

-- Create new policies
CREATE POLICY "Users can upload to their own post folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own post files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'post-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own post files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users can view all post media"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'post-media');

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;
