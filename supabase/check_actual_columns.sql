-- Run this in Supabase SQL Editor to see exactly what columns exist
-- This will help us match the code to the actual database schema

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'sarathi_user'
ORDER BY ordinal_position;




