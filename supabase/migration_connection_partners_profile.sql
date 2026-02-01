-- Migration: Allow users to read basic profile of connection partners
-- Required for: Profile page "My Connections" and "Connection requests" to show
-- the other user's name and profile picture (RLS on sarathi_user otherwise blocks the nested read).
-- Run this in Supabase SQL Editor after migration_community_features.sql.

-- Policy: Users can read limited profile of users they have a connection with (any status)
CREATE POLICY "Users can read connection partners profile"
    ON public.sarathi_user
    FOR SELECT
    USING (
        uuid IN (
            SELECT requester_id FROM public.connections WHERE addressee_id = auth.uid()
            UNION
            SELECT addressee_id FROM public.connections WHERE requester_id = auth.uid()
        )
    );
