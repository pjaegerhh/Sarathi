# Automated Storage Setup - Quick Start Guide

## ✨ What's New

I've created an **automated setup script** that creates Supabase storage buckets via API instead of manual setup!

## 🚀 Quick Setup (3 Steps)

### Step 1: Add Service Role Key to .env

Add this line to your `.env` file:

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find it:**
1. Go to: https://supabase.com/dashboard/project/axytclwosgvuanglpvii/settings/api
2. Look for **"service_role"** key (marked as "secret")
3. Copy the entire key (starts with `eyJ...`)
4. Paste it in your `.env` file

⚠️ **Important**: This is NOT the anon key! The service role key has admin access.

### Step 2: Install Dependencies

```bash
npm install
```

This installs `tsx`, `dotenv`, and `@types/node` for running the setup script.

### Step 3: Run Automated Setup

```bash
npm run setup:storage
```

This will:
- ✅ Create `profile-media` bucket (10MB, private)
- ✅ Create `post-media` bucket (50MB, private)
- ✅ Generate `supabase/storage_policies.sql` file
- ✅ Show you the next steps

### Step 4: Apply RLS Policies (Manual)

The script generates a SQL file that you need to run **once**:

1. Go to: https://supabase.com/dashboard/project/axytclwosgvuanglpvii/editor
2. Open the file: `supabase/storage_policies.sql`
3. Copy all the SQL
4. Paste into Supabase SQL Editor
5. Click "Run"

**Why manual?** Storage RLS policies can't be created via API, only via SQL.

## 📦 What Gets Created

### Buckets

| Bucket | Size Limit | File Types | Purpose |
|--------|-----------|------------|---------|
| `profile-media` | 10 MB | Images (JPEG, PNG, WebP, GIF) | Profile & cover pictures |
| `post-media` | 50 MB | Images + Videos (MP4, WebM) | Post attachments |

### RLS Policies (Applied via SQL)

For each bucket:
- ✅ Users can upload to their own folder
- ✅ Users can update their own files
- ✅ Users can delete their own files  
- ✅ All authenticated users can view files

## 🧪 Testing

After setup, test in your app:

1. Login to your profile page
2. Click "Edit Profile"
3. Click camera icon on cover picture → upload image
4. Click camera icon on profile picture → upload image
5. Save changes
6. Verify images display correctly

## 📁 Files Created

```
c:\sarathi\
├── scripts/
│   ├── setup-storage.ts        ← Main automation script
│   └── README.md               ← Detailed documentation
├── supabase/
│   ├── storage_policies.sql    ← Auto-generated RLS policies (run this!)
│   └── migration_profile_page.sql  ← Database migration (run this too!)
└── package.json                ← Added "setup:storage" script
```

## 🔧 Troubleshooting

### "Missing SUPABASE_SERVICE_ROLE_KEY"

You're missing the service role key in `.env`. Make sure you:
- Use the **service_role** key (not anon key)
- Copy the entire key
- Add it to `.env` file

### "Bucket already exists"

That's fine! The script will update the existing bucket configuration.

### "Upload fails with permission denied"

Make sure you:
1. Ran the SQL file: `supabase/storage_policies.sql`
2. Are logged in as an authenticated user
3. File path follows pattern: `{user_id}/filename.ext`

## 🎯 Complete Setup Checklist

Profile Page Setup:
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env`
- [ ] Run `npm install`
- [ ] Run `npm run setup:storage`
- [ ] Run `supabase/storage_policies.sql` in SQL Editor
- [ ] Run `supabase/migration_profile_page.sql` in SQL Editor
- [ ] Test profile picture upload
- [ ] Test cover picture upload

## 📝 Environment Variables Needed

Your `.env` should have:

```env
# Existing
VITE_SUPABASE_URL=https://axytclwosgvuanglpvii.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# New (for automated setup)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🔐 Security

**⚠️ NEVER commit the service role key to git!**

The service role key:
- Has **full admin access** to your Supabase project
- Should **only** be used server-side or in trusted scripts
- Should **never** be in client-side code
- Is already in `.gitignore` (via `.env`)

## 🎉 That's It!

You now have:
- ✅ Automated bucket creation via script
- ✅ SQL file for RLS policies
- ✅ Complete documentation
- ✅ Working profile picture uploads

No more manual bucket creation! Just run `npm run setup:storage` 🚀

---

**See also:**
- Full docs: `scripts/README.md`
- Profile page docs: `PROFILE_PAGE_IMPLEMENTATION.md`






