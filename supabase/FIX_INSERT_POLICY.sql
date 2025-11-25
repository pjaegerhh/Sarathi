-- Fix RLS Policy to Allow Insert During Signup
-- The issue: User can't INSERT their own row during signup because they're not "authenticated" yet
-- Solution: Allow INSERT if the uuid matches the auth user (even during signup)

-- Drop the old INSERT policy
DROP POLICY IF EXISTS "Enable insert for users" ON public.sarathi_user;
DROP POLICY IF EXISTS "Users can insert own data" ON public.sarathi_user;

-- Create new INSERT policy that works during signup
CREATE POLICY "Enable insert for authenticated users"
    ON public.sarathi_user
    FOR INSERT
    TO authenticated, anon  -- Allow both authenticated and anonymous (during signup)
    WITH CHECK (
        uuid = auth.uid()  -- Must be inserting their own UUID
        OR 
        auth.uid() IS NOT NULL  -- Or any authenticated user (for manual creation)
    );

-- Verify policies
SELECT * FROM pg_policies WHERE tablename = 'sarathi_user';




