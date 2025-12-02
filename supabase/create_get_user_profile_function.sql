-- Create a function to get user profile (bypasses some RLS issues)
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION public.get_user_profile(user_uuid UUID)
RETURNS TABLE (
    uuid UUID,
    email TEXT,
    name TEXT,
    first_name TEXT,
    telephone TEXT,
    user_type TEXT,
    prosthesis_type TEXT,
    length_usage TEXT,
    main_challenge TEXT[],
    activities TEXT[],
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER -- This bypasses RLS
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        su.uuid,
        su.email,
        su.name,
        su.first_name,
        su.telephone,
        su.user_type,
        su.prosthesis_type,
        su.length_usage,
        su.main_challenge,
        su.activities,
        su.created_at,
        su.updated_at
    FROM public.sarathi_user su
    WHERE su.uuid = user_uuid;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_profile(UUID) TO authenticated;











