# 🚨 URGENT: Fix 406 Error - Database Migration Required

## The Problem

You're seeing this error:
```
Failed to load resource: the server responded with a status of 406
❌ Error fetching user profile
```

**Cause**: The database table `sarathi_user` is missing the `last_name` and `date_of_birth` columns that the app is trying to save.

## ✅ Solution - Run This SQL Migration NOW

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project: `axytclwosgvuanglpvii`
3. Click on **SQL Editor** in the left sidebar

### Step 2: Run This SQL Script

Copy and paste this **entire script** into the SQL Editor and click **RUN**:

```sql
-- =====================================================
-- MIGRATION: Add missing columns to sarathi_user table
-- =====================================================

-- Add last_name column
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Add date_of_birth column  
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Add comments for documentation
COMMENT ON COLUMN public.sarathi_user.last_name IS 'User last name';
COMMENT ON COLUMN public.sarathi_user.date_of_birth IS 'User date of birth';

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'sarathi_user' 
  AND column_name IN ('last_name', 'date_of_birth');
```

### Step 3: Verify Migration Worked

After running the SQL, you should see output like:

| column_name    | data_type |
|----------------|-----------|
| last_name      | text      |
| date_of_birth  | date      |

If you see this, the migration succeeded! ✅

### Step 4: Test Registration

1. **Clear your browser cache** or open an incognito window
2. Go to your app and try registering a new user
3. Fill in all fields (first name, last name, date of birth, etc.)
4. Complete registration
5. Check your email and verify the account
6. You should now be logged in successfully!

## What Happens After Migration

✅ New users can register with first name, last name, and date of birth  
✅ All fields will be saved to the database  
✅ Email verification will work properly  
✅ Users will be auto-logged in after verification  
✅ No more 406 errors!

## Troubleshooting

### If you still see 406 errors after migration:

1. **Check the Table Structure**:
   ```sql
   SELECT column_name, data_type, is_nullable
   FROM information_schema.columns
   WHERE table_name = 'sarathi_user'
   ORDER BY ordinal_position;
   ```

2. **Check existing users**:
   ```sql
   SELECT uuid, email, first_name, last_name, date_of_birth, created_at
   FROM public.sarathi_user
   LIMIT 5;
   ```

3. **Clear Test Users** (optional - only if testing):
   ```sql
   -- WARNING: This deletes test users. Only run if needed!
   DELETE FROM auth.users 
   WHERE email LIKE '%test%' OR email LIKE '%example%';
   ```

### If the migration fails:

The columns might already exist but with different types. Run this to check:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'sarathi_user';
```

## Why This Happened

The code was updated to save `last_name` and `date_of_birth`, but the database schema wasn't updated. This is a common issue in development - code and database got out of sync.

**Always remember**: Code changes + Schema changes = Both must be deployed!

## Next Steps After Migration

Once the migration is complete:

1. ✅ Test new user registration
2. ✅ Test email verification  
3. ✅ Test login
4. ✅ Check that user profile shows all fields
5. ✅ Verify no console errors

---

**After running the migration, refresh your app and try again!** 🚀




