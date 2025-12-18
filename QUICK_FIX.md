# 🚀 User Stories - Quick Fix Guide

## ⚡ The Problems You Had

1. **`userId` was `undefined`** → Fixed by changing `user.uuid` to `user.id`
2. **Storage upload blocked (400 error)** → Need to run storage policies SQL
3. **Database insert blocked (403 error)** → Need to run table migration SQL
4. **Auth token errors** → User needs to logout/login

## ⚠️ YOU MUST DO THIS NOW

### Step 1: Run This SQL (Database Table)
```bash
File: supabase/migration_user_stories.sql
Location: Supabase Dashboard → SQL Editor → New query
```
**Paste the entire file and click "Run"**

### Step 2: Run This SQL (Storage Permissions)  
```bash
File: supabase/storage_policies_profile_media.sql
Location: Supabase Dashboard → SQL Editor → New query
```
**Paste the entire file and click "Run"**

### Step 3: Check Bucket Settings
```
Location: Supabase Dashboard → Storage
Bucket: profile-media
Public: ✅ YES (must be checked)
```

### Step 4: Test It
1. Logout from your app
2. Login again
3. Go to Profile → Edit Profile
4. Click "Create Your Story"
5. Upload images
6. Click Save
7. ✅ Should work now!

## 🔍 How to Know It's Fixed

### ✅ Good Signs:
- No red errors in console
- "Story created successfully" toast
- Images display in story section
- No "undefined" in network requests
- No 400/403 errors

### ❌ Bad Signs:
- Still seeing "undefined" in URLs
- 400/403 errors in console
- "new row violates row-level security policy"
- Files not uploading

## 🆘 Still Not Working?

### Quick Checks:
```sql
-- Run in Supabase SQL Editor:

-- Should return TRUE
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'user_stories'
);

-- Should return 5 rows
SELECT COUNT(*) FROM pg_policies 
WHERE tablename = 'user_stories';

-- Should return 4 rows
SELECT COUNT(*) FROM storage.policies 
WHERE bucket_id = 'profile-media';
```

If any of these fail, re-run the SQL files!

## 📁 Files Changed

### Code Fixed:
- ✅ `src/components/ProfilePage.tsx` - Changed uuid to id
- ✅ `src/components/EditStoryModal.tsx` - Better errors

### SQL You Need to Run:
- ⚠️ `supabase/migration_user_stories.sql` - TABLE (run first!)
- ⚠️ `supabase/storage_policies_profile_media.sql` - STORAGE (run second!)

### Documentation:
- 📖 `ERROR_FIX_SUMMARY.md` - Detailed explanation
- 📖 `USER_STORIES_SETUP.md` - Full setup guide
- 📖 `.documentation/USER_STORIES_IMPLEMENTATION.md` - Technical docs

## 🎯 The Fix in One Sentence

Changed `user.uuid` to `user.id` in the code, and created storage policies to allow file uploads.

## 💡 Why It Failed Before

1. **Wrong user property**: Used `user.uuid` (doesn't exist) instead of `user.id`
2. **No storage policies**: Supabase blocked uploads by default
3. **Maybe missing table**: If migration wasn't run

## ⚡ TL;DR - Do This Now:

1. Run `migration_user_stories.sql` in Supabase
2. Run `storage_policies_profile_media.sql` in Supabase
3. Check bucket is public
4. Logout/login in your app
5. Try creating a story
6. Should work! 🎉

---

**Need more help?** Read `USER_STORIES_SETUP.md` for detailed troubleshooting.
