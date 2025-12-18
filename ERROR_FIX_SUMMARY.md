# User Stories Feature - Error Fix Summary

## Errors Fixed

### 1. ❌ `userId` was `undefined` in upload path
**Error:** `profile-media/undefined/8f0193f4-3adb-43ea-bc01-e6beb2518daa/...`

**Root Cause:** 
- ProfilePage was using `user.uuid` 
- But User interface has `id` (not `uuid`)
- AuthContext maps `userData.uuid` → `user.id`

**Fix:**
```typescript
// Before (WRONG):
userId={user.uuid}
eq('user_id', user.uuid)

// After (CORRECT):
userId={user.id}
eq('user_id', user.id)
```

**Files Changed:**
- `src/components/ProfilePage.tsx` (2 locations)

---

### 2. ❌ Storage RLS policies missing
**Error:** `StorageApiError: new row violates row-level security policy`

**Root Cause:**
- No storage policies configured for `profile-media` bucket
- Supabase blocks uploads by default

**Fix:**
Created `supabase/storage_policies_profile_media.sql` with 4 policies:
1. Users can INSERT (upload) to their own folder
2. Users can UPDATE their own files
3. Users can DELETE their own files
4. Public can SELECT (view) all files

**Action Required:**
Run this SQL file in Supabase SQL Editor!

---

### 3. ❌ 403 Error on database insert
**Error:** `Failed to load resource: 403` on `/rest/v1/user_stories`

**Root Cause:**
- User stories table RLS policies might not be applied
- Or auth token issues

**Fix:**
- Enhanced error messages in EditStoryModal
- Added userId validation
- Better error handling with toast messages

**Action Required:**
Make sure `supabase/migration_user_stories.sql` was executed!

---

### 4. ❌ Auth refresh token errors
**Error:** `AuthApiError: Invalid Refresh Token: Refresh Token Not Found`

**Root Cause:**
- Session might be expired
- Browser localStorage corrupted

**Solution:**
User needs to:
1. Logout
2. Clear browser cache/cookies
3. Login again

---

## Files Created/Updated

### New Files:
1. ✅ `supabase/storage_policies_profile_media.sql` - Storage RLS policies
2. ✅ `USER_STORIES_SETUP.md` - Comprehensive setup guide with troubleshooting

### Updated Files:
1. ✅ `src/components/ProfilePage.tsx` - Fixed user.uuid → user.id
2. ✅ `src/components/EditStoryModal.tsx` - Better error handling

---

## Setup Checklist (USER MUST COMPLETE)

### ⚠️ CRITICAL - Must run these SQL files:

- [ ] **Step 1:** Run `supabase/migration_user_stories.sql`
  - Creates user_stories table
  - Adds 5 RLS policies for table access
  
- [ ] **Step 2:** Run `supabase/storage_policies_profile_media.sql`
  - Creates 4 RLS policies for storage
  - Allows users to upload to their folders
  
- [ ] **Step 3:** Verify bucket exists
  - Bucket name: `profile-media`
  - Must be PUBLIC
  - In Supabase Dashboard → Storage

- [ ] **Step 4:** Test the feature
  - Login to app
  - Edit Profile → Create Story
  - Upload images and save

---

## Testing the Fix

### Quick Test:
```sql
-- In Supabase SQL Editor:

-- 1. Check table exists
SELECT * FROM user_stories LIMIT 1;

-- 2. Check RLS policies (should show 5)
SELECT * FROM pg_policies WHERE tablename = 'user_stories';

-- 3. Check storage bucket
SELECT * FROM storage.buckets WHERE name = 'profile-media';

-- 4. Check storage policies (should show 4)
SELECT * FROM storage.policies WHERE bucket_id = 'profile-media';
```

### In App:
1. Open browser console (F12)
2. Login
3. Go to Profile → Edit Profile
4. Click "Create Your Story"
5. Upload 1-2 images
6. Write some text
7. Click Save
8. Check console for errors
9. Should see success toast

---

## Common Errors After Fix

### Still getting 400/403 errors?
1. Run both SQL files again
2. Logout and login
3. Clear browser cache
4. Check Supabase logs

### userId still undefined?
1. Check console: `console.log(user)`
2. Verify user object has `id` property
3. Try logout/login

### Images not displaying?
1. Verify bucket is PUBLIC
2. Check storage policies are applied
3. Verify file paths in database

---

## What Changed in Code

### ProfilePage.tsx
```typescript
// Line ~119 - useEffect dependency
- }, [user?.uuid]);
+ }, [user?.id]);

// Line ~121 - fetchUserStory function
- if (!user?.uuid) return;
+ if (!user?.id) return;

// Line ~128 - query
- .eq('user_id', user.uuid)
+ .eq('user_id', user.id)

// Line ~2099 - Modal prop
- userId={user.uuid}
+ userId={user.id}
```

### EditStoryModal.tsx
```typescript
// Added validation
if (!userId) {
  toast.error('User not authenticated');
  console.error('userId is undefined');
  return;
}

// Enhanced error messages
toast.error(`Failed to upload: ${uploadError.message}`);
toast.error(`Failed to create story: ${error.message}`);

// Added console logging
console.log('Uploading file to:', filePath);
console.log('Creating story with user_id:', userId);
```

---

## Debug Commands

### Check user ID in browser console:
```javascript
// Get current user
const user = JSON.parse(localStorage.getItem('supabase.auth.token'));
console.log('User:', user);

// Check if authenticated
const { data: { user: authUser } } = await supabase.auth.getUser();
console.log('Auth User:', authUser);
```

### Check storage policies:
```sql
SELECT 
  name,
  definition,
  check_expression
FROM storage.policies 
WHERE bucket_id = 'profile-media';
```

---

## Next Steps for User

1. **Run SQL files** (most important!)
   - migration_user_stories.sql
   - storage_policies_profile_media.sql

2. **Verify bucket settings**
   - Name: profile-media
   - Public: YES
   - Check in Supabase Dashboard

3. **Test in app**
   - Logout/Login
   - Try creating a story
   - Check console for errors

4. **If still errors:**
   - Read `USER_STORIES_SETUP.md`
   - Check Supabase logs
   - Verify all policies exist

---

## Success Indicators

✅ No console errors
✅ Files upload successfully  
✅ Success toast appears
✅ Story displays in view mode
✅ Images show correctly
✅ Can edit and delete story

---

## Files to Review

1. `USER_STORIES_SETUP.md` - Complete setup guide
2. `supabase/storage_policies_profile_media.sql` - RUN THIS!
3. `supabase/migration_user_stories.sql` - RUN THIS TOO!
4. `.documentation/USER_STORIES_IMPLEMENTATION.md` - Technical docs
