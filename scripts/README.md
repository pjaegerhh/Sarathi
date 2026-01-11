# Storage Setup Automation

This directory contains scripts to automatically set up Supabase storage buckets and policies.

## Prerequisites

1. **Supabase Service Role Key**: You need your Supabase service role key (NOT the anon key)
   - Get it from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
   - Look for "service_role" key (secret, server-side only)

2. **Environment Variables**: Add to your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

## Installation

Install the required dependencies:

```bash
npm install
```

This will install:
- `tsx` - TypeScript execution engine
- `dotenv` - Environment variable loader
- `@types/node` - Node.js type definitions

## Usage

### Automatic Setup (Recommended)

Run the automated setup script:

```bash
npm run setup:storage
```

This script will:
1. ✅ Create `profile-media` bucket (10MB limit, private)
2. ✅ Create `post-media` bucket (50MB limit, private)
3. ✅ Generate SQL file for RLS policies: `supabase/storage_policies.sql`
4. ✅ List all created buckets

**Note**: RLS policies must be applied manually via Supabase SQL Editor (step 2 below).

### Manual Steps After Automated Setup

1. **Verify Buckets**: Check Supabase Dashboard → Storage to confirm buckets were created

2. **Apply RLS Policies**: Run the generated SQL in Supabase SQL Editor:
   - Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/editor
   - Open: `supabase/storage_policies.sql`
   - Copy and paste the SQL
   - Click "Run"

3. **Test**: Try uploading a profile picture in the app

## What Gets Created

### Buckets

#### profile-media
- **Purpose**: Store user profile and cover pictures
- **Size Limit**: 10 MB per file
- **Allowed Types**: JPEG, PNG, WebP, GIF
- **Public**: No (uses signed URLs)
- **Folder Structure**: `{user_id}/cover-{timestamp}.{ext}` and `{user_id}/profile-{timestamp}.{ext}`

#### post-media
- **Purpose**: Store post images and videos
- **Size Limit**: 50 MB per file
- **Allowed Types**: JPEG, PNG, WebP, GIF, MP4, WebM
- **Public**: No (uses signed URLs)
- **Folder Structure**: `{user_id}/{post_id}-{timestamp}.{ext}`

### RLS Policies

For each bucket, the following policies are created:

1. **Upload Policy**: Users can upload to their own folder (`{user_id}/...`)
2. **Update Policy**: Users can update their own files
3. **Delete Policy**: Users can delete their own files
4. **View Policy**: All authenticated users can view all files (for displaying profile pictures, posts, etc.)

## Troubleshooting

### "Missing SUPABASE_SERVICE_ROLE_KEY"

Make sure you're using the **service role key**, not the anon key:
- Service role key starts with `eyJ...` and is much longer
- Has full admin access (keep it secret!)
- Found in: Dashboard → Settings → API → "service_role" (secret)

### "Error creating bucket: Bucket already exists"

The script will automatically update existing buckets. If you see this message, the bucket was already created and has been updated with new configuration.

### "Policies not created automatically"

Storage RLS policies cannot be created via the JavaScript API. You must:
1. Open Supabase SQL Editor
2. Run the generated SQL file: `supabase/storage_policies.sql`

### "Permission denied when uploading"

Check that:
1. RLS policies were applied correctly (run the SQL file)
2. User is authenticated
3. File follows naming convention: `{user_id}/filename.ext`

## Files

- `scripts/setup-storage.ts` - Main setup script
- `supabase/storage_policies.sql` - Auto-generated RLS policies (run this in SQL Editor)
- `supabase/setup_storage_buckets.sql` - Old manual documentation (deprecated)

## Complete Setup Checklist

- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env`
- [ ] Run `npm install`
- [ ] Run `npm run setup:storage`
- [ ] Verify buckets created in Supabase Dashboard
- [ ] Run `supabase/storage_policies.sql` in SQL Editor
- [ ] Run `supabase/migration_profile_page.sql` in SQL Editor
- [ ] Test profile picture upload in app
- [ ] Test cover picture upload in app

## Security Notes

⚠️ **IMPORTANT**: Never commit your `.env` file or service role key to git!

The service role key:
- Has full admin access to your Supabase project
- Should only be used server-side or in trusted scripts
- Should never be exposed in client-side code
- Should be kept in `.env` and added to `.gitignore`

## Next Steps

After storage is set up:
1. Run the database migration: `supabase/migration_profile_page.sql`
2. Test the profile page in your app
3. Upload profile and cover pictures
4. Verify images display correctly

## Support

If you encounter issues:
1. Check Supabase Dashboard → Storage for bucket status
2. Check Supabase Dashboard → Storage → Policies for RLS policies
3. Check browser console for upload errors
4. Check Supabase Dashboard → Logs for server-side errors









