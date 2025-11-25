-- 🚨 NUCLEAR OPTION - Run this to completely bypass RLS and see the real error
-- This will tell us EXACTLY what's wrong

-- Step 1: Temporarily disable RLS to test
ALTER TABLE public.sarathi_user DISABLE ROW LEVEL SECURITY;

-- Step 2: Try to select the user directly
SELECT * FROM public.sarathi_user WHERE uuid = '8e53be60-d707-4233-8a2e-eeb461511eaa';

-- Step 3: If that works, the problem is RLS. Re-enable it:
ALTER TABLE public.sarathi_user ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop ALL existing policies
DROP POLICY IF EXISTS "Users can read own data" ON public.sarathi_user;
DROP POLICY IF EXISTS "Users can update own data" ON public.sarathi_user;
DROP POLICY IF EXISTS "Users can insert own data" ON public.sarathi_user;

-- Step 5: Create simple, working policies
CREATE POLICY "Enable read for users"
    ON public.sarathi_user
    FOR SELECT
    TO authenticated
    USING (uuid = auth.uid());

CREATE POLICY "Enable update for users"
    ON public.sarathi_user
    FOR UPDATE
    TO authenticated
    USING (uuid = auth.uid())
    WITH CHECK (uuid = auth.uid());

CREATE POLICY "Enable insert for users"
    ON public.sarathi_user
    FOR INSERT
    TO authenticated
    WITH CHECK (uuid = auth.uid());

-- Step 6: Check if policies are correct now
SELECT * FROM pg_policies WHERE tablename = 'sarathi_user';




