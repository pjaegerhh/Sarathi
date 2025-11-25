-- Migration: Add last_name and date_of_birth columns to sarathi_user table
-- Execute this in Supabase SQL Editor

-- Add last_name column
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Add date_of_birth column
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Add comment for documentation
COMMENT ON COLUMN public.sarathi_user.last_name IS 'User last name';
COMMENT ON COLUMN public.sarathi_user.date_of_birth IS 'User date of birth';

