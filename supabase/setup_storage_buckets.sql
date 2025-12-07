-- =====================================================
-- SUPABASE STORAGE BUCKETS SETUP
-- =====================================================
-- This script creates storage buckets for profile and post media
-- Execute this in Supabase SQL Editor or Dashboard

-- Note: Storage buckets are usually created via Supabase Dashboard or API
-- This is documentation for manual setup

/*
MANUAL SETUP INSTRUCTIONS:

1. Go to Supabase Dashboard → Storage
2. Create the following buckets:

Bucket 1: "profile-media"
- Public: No (keep private, use signed URLs)
- File size limit: 10 MB
- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif
- Purpose: Store cover pictures and profile pictures

Bucket 2: "post-media"
- Public: No (keep private, use signed URLs)
- File size limit: 50 MB
- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm
- Purpose: Store post images and videos

3. Set up RLS policies for each bucket:

For profile-media bucket:
- Users can upload to their own folder: user_id/{filename}
- Users can read their own files
- All authenticated users can read other users' profile pictures (for display)

For post-media bucket:
- Users can upload to their own folder: user_id/{filename}
- Users can read their own files
- All authenticated users can read other users' post media (for display)
*/

-- RLS Policies for profile-media bucket
-- (These need to be set in Supabase Dashboard → Storage → Policies)

/*
Policy 1: Users can upload to their own profile folder
- Operation: INSERT
- Target: profile-media
- Policy: bucket_id = 'profile-media' AND (storage.foldername(name))[1] = auth.uid()::text

Policy 2: Users can update their own profile files
- Operation: UPDATE
- Target: profile-media
- Policy: bucket_id = 'profile-media' AND (storage.foldername(name))[1] = auth.uid()::text

Policy 3: Users can delete their own profile files
- Operation: DELETE
- Target: profile-media
- Policy: bucket_id = 'profile-media' AND (storage.foldername(name))[1] = auth.uid()::text

Policy 4: Anyone authenticated can view profile pictures
- Operation: SELECT
- Target: profile-media
- Policy: bucket_id = 'profile-media'
*/

-- RLS Policies for post-media bucket

/*
Policy 1: Users can upload to their own post folder
- Operation: INSERT
- Target: post-media
- Policy: bucket_id = 'post-media' AND (storage.foldername(name))[1] = auth.uid()::text

Policy 2: Users can update their own post files
- Operation: UPDATE
- Target: post-media
- Policy: bucket_id = 'post-media' AND (storage.foldername(name))[1] = auth.uid()::text

Policy 3: Users can delete their own post files
- Operation: DELETE
- Target: post-media
- Policy: bucket_id = 'post-media' AND (storage.foldername(name))[1] = auth.uid()::text

Policy 4: Anyone authenticated can view post media
- Operation: SELECT
- Target: post-media
- Policy: bucket_id = 'post-media'
*/

-- File naming convention:
-- profile-media/{user_id}/cover-{timestamp}.{ext}
-- profile-media/{user_id}/profile-{timestamp}.{ext}
-- post-media/{user_id}/{post_id}-{timestamp}.{ext}

SELECT 'Storage buckets setup documentation created!' as status;



