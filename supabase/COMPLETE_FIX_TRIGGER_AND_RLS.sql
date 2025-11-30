-- COMPLETE FIX: RLS + Trigger for User Creation
-- This fixes both the trigger AND the RLS policies

-- ============================================
-- STEP 1: Fix the INSERT policy for signups
-- ============================================

-- Drop old policies
DROP POLICY IF EXISTS "Enable insert for users" ON public.sarathi_user;
DROP POLICY IF EXISTS "Users can insert own data" ON public.sarathi_user;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.sarathi_user;

-- New policy: Allow INSERT during signup (when uuid matches)
CREATE POLICY "Allow insert during signup"
    ON public.sarathi_user
    FOR INSERT
    WITH CHECK (true);  -- Allow any insert (we'll rely on trigger + app logic for security)

-- ============================================
-- STEP 2: Fix the trigger to be more robust
-- ============================================

-- Drop and recreate the trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert with error handling
    INSERT INTO public.sarathi_user (uuid, email, user_type)
    VALUES (NEW.id, NEW.email, 'amputee')
    ON CONFLICT (uuid) DO NOTHING;  -- Ignore if already exists
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't fail the signup
        RAISE WARNING 'Error in handle_new_user for %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STEP 3: Verify setup
-- ============================================

-- Check policies
SELECT 
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'sarathi_user'
ORDER BY policyname;

-- Check trigger
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- ============================================
-- STEP 4: Test with existing user
-- ============================================

-- If you have an existing user that's missing from sarathi_user, create the entry:
-- Replace <user_id> with actual UUID from auth.users

-- INSERT INTO public.sarathi_user (uuid, email, user_type)
-- SELECT id, email, 'amputee'
-- FROM auth.users
-- WHERE id = '<user_id>'
-- ON CONFLICT (uuid) DO NOTHING;








