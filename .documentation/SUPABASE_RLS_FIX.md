# URGENT: Fix Infinite Recursion Error in Supabase

## Error
```
infinite recursion detected in policy for relation "sarathi_user"
```

## Problem
The RLS policies for admin access are causing infinite recursion because they query the same table they're protecting.

## IMMEDIATE FIX - Execute in Supabase SQL Editor NOW:

### Step 1: Drop the problematic policies
```sql
-- Drop the recursive admin policies
DROP POLICY IF EXISTS "Admins can read all data" ON public.sarathi_user;
DROP POLICY IF EXISTS "Admins can update all data" ON public.sarathi_user;
```

### Step 2: Verify remaining policies
```sql
-- Check what policies exist
SELECT * FROM pg_policies WHERE tablename = 'sarathi_user';
```

You should only see these three policies:
- `Users can read own data`
- `Users can update own data`  
- `Users can insert own data`

## Testing
After dropping the policies, try logging in again. Users should now be able to:
- ✅ Read their own profile
- ✅ Update their own profile
- ✅ Sign up (create their own profile)

## Admin Access (Future Implementation)

For now, admins will use the **Supabase service role key** to access all data (bypasses RLS).

When you need admin functionality:
1. Use the service role key in backend/admin functions
2. OR create a SECURITY DEFINER function like this:

```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT user_type IN ('admin', 'superadmin')
    FROM public.sarathi_user
    WHERE uuid = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Then use it in policies:
CREATE POLICY "Admins can read all"
    ON public.sarathi_user
    FOR SELECT
    USING (is_admin());
```

## Quick Fix Commands

Copy and paste this into Supabase SQL Editor:

```sql
-- Remove problematic policies
DROP POLICY IF EXISTS "Admins can read all data" ON public.sarathi_user;
DROP POLICY IF EXISTS "Admins can update all data" ON public.sarathi_user;

-- Verify
SELECT policyname FROM pg_policies WHERE tablename = 'sarathi_user';
```

## After Fix
1. Refresh your browser
2. Try logging in again
3. The error should be gone

The updated `database_schema.sql` file has been corrected with these fixes.

