-- =====================================================
-- COMPLETE MIGRATION: Add missing columns and fix existing data
-- =====================================================
-- Execute this entire script in Supabase SQL Editor
-- This will add the missing columns and handle existing users

-- Step 1: Add last_name column
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Step 2: Add date_of_birth column  
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Step 3: For existing users with NULL last_name, try to split name field
-- (This is optional - only runs if there are existing users)
UPDATE public.sarathi_user
SET last_name = CASE
    WHEN name IS NOT NULL AND name LIKE '% %' THEN
        TRIM(SUBSTRING(name FROM POSITION(' ' IN name) + 1))
    ELSE
        NULL
END,
first_name = CASE
    WHEN first_name IS NULL AND name IS NOT NULL AND name LIKE '% %' THEN
        TRIM(SUBSTRING(name FROM 1 FOR POSITION(' ' IN name) - 1))
    WHEN first_name IS NULL AND name IS NOT NULL THEN
        name
    ELSE
        first_name
END
WHERE last_name IS NULL;

-- Step 4: Add comments for documentation
COMMENT ON COLUMN public.sarathi_user.last_name IS 'User last name';
COMMENT ON COLUMN public.sarathi_user.date_of_birth IS 'User date of birth (ISO date)';

-- Step 5: Verify the migration
SELECT 
    'Migration Complete!' as status,
    COUNT(*) as total_users,
    COUNT(last_name) as users_with_last_name,
    COUNT(date_of_birth) as users_with_dob
FROM public.sarathi_user;

-- Step 6: Show the updated schema
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'sarathi_user' 
ORDER BY ordinal_position;













