# Quick Fix Checklist - 406 Error

## 🚨 YOU MUST RUN THE SQL MIGRATION FIRST! 🚨

### ✅ Step-by-Step Fix

1. [ ] Open Supabase Dashboard (https://supabase.com/dashboard)
2. [ ] Select your project: `axytclwosgvuanglpvii`
3. [ ] Click **SQL Editor** in left sidebar
4. [ ] Click **New Query**
5. [ ] Copy the contents of `supabase/migration_complete.sql`
6. [ ] Paste into SQL Editor
7. [ ] Click **RUN** button
8. [ ] Verify you see "Migration Complete!" message
9. [ ] Refresh your app in the browser
10. [ ] Clear browser cache (Ctrl+Shift+Delete) or use incognito
11. [ ] Try registering a new test user
12. [ ] Verify email and login

## The SQL to Run

```sql
-- Add last_name column
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Add date_of_birth column  
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS date_of_birth DATE;
```

## Why This Error Happened

- ✅ Code expects `last_name` and `date_of_birth` columns
- ❌ Database doesn't have these columns yet
- 🔧 Solution: Add the columns with the migration

## After Migration

The error will be fixed and:
- New users can register with all fields
- All fields save to database correctly
- Email verification works
- Auto-login works
- No more 406 errors!

---

**RUN THE MIGRATION NOW!** Then test registration.




