# Simple Fix - Add date_of_birth Column Only

## What Changed

The code now uses the existing `name` field (which stores the full name "FirstName LastName") instead of a separate `last_name` field.

You only need to add the `date_of_birth` column.

## ✅ Run This SQL Migration

1. Go to: https://supabase.com/dashboard
2. Select your project: `axytclwosgvuanglpvii`
3. Click: **SQL Editor**
4. Copy and paste this SQL:

```sql
-- Add date_of_birth column
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS date_of_birth DATE;
```

5. Click **RUN**
6. Refresh your app

## What the Registration Does

When a user registers with:
- First name: "John"
- Last name: "Doe"
- Date of birth: "1990-01-15"

The database saves:
- `name`: "John Doe" (full name combined)
- `first_name`: "John"
- `date_of_birth`: "1990-01-15"
- `telephone`: user's phone number
- `email`: user's email

## Files Updated

✅ `src/lib/supabase.ts` - Removed `last_name` from interface
✅ `src/components/RegistrationPage.tsx` - Saves to `name` field instead of `last_name`
✅ `supabase/database_schema.sql` - Updated documentation
✅ `supabase/migration_add_date_of_birth.sql` - Simple migration file

## After Migration

Everything will work:
- ✅ Registration saves all fields
- ✅ Email verification works
- ✅ Auto-login works
- ✅ No more 406 errors

---

**Just add the `date_of_birth` column and you're good to go!** 🚀




