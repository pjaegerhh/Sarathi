-- Migration: Add date_of_birth column to sarathi_user table
-- Execute this in Supabase SQL Editor

-- Add date_of_birth column
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Add comment for documentation
COMMENT ON COLUMN public.sarathi_user.date_of_birth IS 'User date of birth (ISO date format)';

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'sarathi_user' 
  AND column_name = 'date_of_birth';








