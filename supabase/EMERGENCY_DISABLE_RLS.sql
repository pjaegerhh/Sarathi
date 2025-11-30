-- EMERGENCY FIX: Temporarily disable RLS to test
-- This is JUST FOR TESTING to prove RLS is the problem
-- We'll re-enable with proper policies after testing

-- Step 1: DISABLE RLS temporarily
ALTER TABLE public.sarathi_user DISABLE ROW LEVEL SECURITY;

-- Step 2: Verify RLS is disabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'sarathi_user';
-- Should show: rowsecurity = false

-- Now test registration in your app
-- It should work!

-- ============================================
-- After testing works, RE-ENABLE RLS with this:
-- ============================================

-- Step 3: Re-enable RLS
-- ALTER TABLE public.sarathi_user ENABLE ROW LEVEL SECURITY;

-- Step 4: Create the SIMPLEST possible policies
-- CREATE POLICY "allow_all_authenticated"
-- ON public.sarathi_user
-- FOR ALL
-- TO authenticated
-- USING (true)
-- WITH CHECK (true);








