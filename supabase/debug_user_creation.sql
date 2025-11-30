-- Check if the trigger exists and is working correctly
-- Run this in Supabase SQL Editor to debug

-- 1. Check if the trigger function exists
SELECT 
    routine_name,
    routine_definition
FROM information_schema.routines
WHERE routine_name = 'handle_new_user';

-- 2. Check if the trigger is active
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 3. Check recent users in auth.users
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- 4. Check recent users in sarathi_user
SELECT 
    uuid,
    email,
    name,
    first_name,
    telephone,
    user_type,
    created_at
FROM public.sarathi_user
ORDER BY created_at DESC
LIMIT 5;

-- 5. Check if there are orphaned auth users (in auth.users but not in sarathi_user)
SELECT 
    au.id,
    au.email,
    au.created_at,
    CASE WHEN su.uuid IS NULL THEN 'MISSING' ELSE 'EXISTS' END as sarathi_user_status
FROM auth.users au
LEFT JOIN public.sarathi_user su ON au.id = su.uuid
ORDER BY au.created_at DESC
LIMIT 10;








