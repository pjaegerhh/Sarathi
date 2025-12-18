# User Stories Setup Guide - CRITICAL STEPS

## ⚠️ IMPORTANT: You must complete ALL steps below for the feature to work!

## Step 1: Run Database Migration (REQUIRED)

Execute in Supabase SQL Editor:

```sql
-- File: supabase/migration_user_stories.sql
-- This creates the user_stories table with RLS policies
```

Copy and paste the entire contents of `supabase/migration_user_stories.sql` into the Supabase SQL Editor and run it.

## Step 2: Configure Storage Bucket (REQUIRED)

### A. Create/Verify the Bucket

1. Go to Supabase Dashboard → Storage
2. Check if `profile-media` bucket exists
3. If not, create it:
   - Click "New bucket"
   - Name: `profile-media`
   - **Public bucket: YES** (important for viewing images)
   - File size limit: 50MB
   - Allowed MIME types: Leave empty for all types

### B. Apply Storage RLS Policies (CRITICAL)

Execute in Supabase SQL Editor:

```sql
-- File: supabase/storage_policies_profile_media.sql
-- This allows users to upload to their own folders
```

Copy and paste the entire contents of `supabase/storage_policies_profile_media.sql` into the Supabase SQL Editor and run it.

**What these policies do:**
- ✅ Users can upload files to `profile-media/{their-user-id}/...`
- ✅ Users can update/delete their own files
- ✅ Everyone can view/read all media (public access)
- ❌ Users CANNOT upload to other users' folders

## Step 3: Verify the Setup

### Check Database Table:
```sql
SELECT * FROM user_stories LIMIT 1;
```
Should return "no rows" (not an error).

### Check RLS Policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'user_stories';
```
Should show 5 policies.

### Check Storage Policies:
```sql
SELECT * FROM storage.policies WHERE bucket_id = 'profile-media';
```
Should show 4 policies.

## Step 4: Test the Feature

1. **Login** to your app
2. Go to **Profile page**
3. Click **"Edit Profile"**
4. In the **"My Story"** section:
   - Click **"Create Your Story"** button
   - Upload 1-3 images
   - Write some text
   - Click **"Save"**
5. If successful, you'll see a success toast
6. Exit edit mode to view your story

## Common Errors and Solutions

### Error: "new row violates row-level security policy"

**Problem:** Storage RLS policies not applied or incorrect

**Solution:**
1. Run `supabase/storage_policies_profile_media.sql` again
2. Make sure the bucket is named exactly `profile-media`
3. Check that user is authenticated (try logging out and back in)

### Error: "Failed to load resource: 400" with path containing "undefined"

**Problem:** User ID is not available

**Solution:**
1. Check that user is logged in
2. Clear browser cache and cookies
3. Logout and login again
4. Check console for `userId is undefined` error

### Error: "Invalid Refresh Token"

**Problem:** Auth session expired or corrupted

**Solution:**
1. Clear all cookies for your domain
2. Clear localStorage
3. Logout
4. Login again
5. If persists, check Supabase Auth settings

### Error: 403 on /rest/v1/user_stories

**Problem:** Table RLS policies blocking insert

**Solution:**
1. Run `supabase/migration_user_stories.sql` again
2. Verify policies with:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'user_stories';
   ```
3. Make sure user is authenticated

## Debugging Checklist

- [ ] Database table `user_stories` exists
- [ ] Storage bucket `profile-media` exists
- [ ] Storage bucket is **public**
- [ ] All 5 RLS policies exist on `user_stories` table
- [ ] All 4 storage policies exist on `profile-media` bucket
- [ ] User is logged in (check console for auth errors)
- [ ] User ID is not undefined (check browser console)
- [ ] No CORS errors in console

## SQL to Check Everything

```sql
-- Check table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'user_stories'
);

-- Check RLS is enabled
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'user_stories';

-- Check policies
SELECT schemaname, tablename, policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'user_stories';

-- Check storage bucket
SELECT id, name, public 
FROM storage.buckets 
WHERE name = 'profile-media';

-- Check storage policies
SELECT name, definition 
FROM storage.policies 
WHERE bucket_id = 'profile-media';
```

## File Structure

After setup, your file structure should be:
```
supabase/
  ├── migration_user_stories.sql (DATABASE - run this first)
  └── storage_policies_profile_media.sql (STORAGE - run this second)

src/
  ├── components/
  │   ├── EditStoryModal.tsx
  │   ├── ViewStoryModal.tsx
  │   └── ProfilePage.tsx (updated)
  └── utils/
      └── i18n.ts (updated with translations)
```

## Quick Test Query

After setup, test if everything works:

```sql
-- This should work without errors (will fail if policies are wrong)
INSERT INTO user_stories (user_id, story_text) 
VALUES (auth.uid(), 'Test story');

-- Clean up
DELETE FROM user_stories WHERE story_text = 'Test story';
```

## Still Having Issues?

1. Check browser console for errors
2. Check Supabase logs (Dashboard → Logs)
3. Verify user is authenticated: `console.log(supabase.auth.getUser())`
4. Verify bucket permissions in Supabase Dashboard → Storage → profile-media → Policies
5. Try with a fresh browser session (incognito mode)

## Support

For detailed technical docs, see:
- `.documentation/USER_STORIES_IMPLEMENTATION.md`

For quick start, see:
- `USER_STORIES_QUICKSTART.md`
