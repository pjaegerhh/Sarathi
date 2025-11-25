# Supabase Authentication Setup Guide

This document explains how to set up Supabase authentication for the Sarathi application across different environments.

## Table of Contents
1. [Supabase Project Configuration](#supabase-project-configuration)
2. [GitHub Secrets Setup](#github-secrets-setup)
3. [Azure Static Web Apps Configuration](#azure-static-web-apps-configuration)
4. [Local Development Setup](#local-development-setup)
5. [Database Schema Setup](#database-schema-setup)

## Supabase Project Configuration

### Project Details
- **Project ID**: `axytclwosgvuanglpvii`
- **Project URL**: `https://axytclwosgvuanglpvii.supabase.co`

### Required Keys
You need two keys from your Supabase project:
1. **Supabase URL**: The API URL for your project
2. **Supabase Anon Key**: The public anonymous key (safe to use in the browser)

### Getting Your Keys
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/axytclwosgvuanglpvii)
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL**: Under "Project URL"
   - **anon/public key**: Under "Project API keys"

## GitHub Secrets Setup

### Adding Secrets to GitHub Repository

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://axytclwosgvuanglpvii.supabase.co` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `your_anon_key_here` | Your Supabase anonymous/public key |

### How to Add Each Secret

1. Click **New repository secret**
2. Enter the **Name** (e.g., `VITE_SUPABASE_URL`)
3. Enter the **Value** (the actual key from Supabase)
4. Click **Add secret**
5. Repeat for each secret

### Verification

After adding the secrets, your GitHub Actions workflows will automatically use them during deployment. The secrets are:
- Used in both `deploy-testing.yml` and `deploy-production.yml`
- Injected as environment variables during the build process
- Available as `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY` in the code

## Azure Static Web Apps Configuration

Azure Static Web Apps can use environment variables in two ways:

### Method 1: GitHub Actions (Recommended - Already Configured)

The GitHub Actions workflows automatically inject the Supabase keys during build time. No additional configuration is needed in Azure if you've set up GitHub secrets correctly.

### Method 2: Azure Configuration (Optional - For Runtime Variables)

If you need to configure environment variables directly in Azure:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Static Web App resource
3. Go to **Configuration** under Settings
4. Click **+ Add** under "Application settings"
5. Add the following settings:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://axytclwosgvuanglpvii.supabase.co` | Testing & Production |
| `VITE_SUPABASE_ANON_KEY` | `your_anon_key_here` | Testing & Production |

**Note**: For Vite applications, environment variables must be set during **build time** (via GitHub Actions), not runtime. The Azure configuration is mainly for reference.

### Testing Environment
- **Resource Group**: `sarathi-test-rg`
- **Static Web App Name**: `sarathi-test`
- **URL**: `https://zealous-beach-09b974100.3.azurestaticapps.net`

### Production Environment
- **Resource Group**: `sarathi-rg`
- **Static Web App Name**: `sarathi`
- **URL**: `https://jolly-bush-0d2030500.3.azurestaticapps.net`

## Local Development Setup

### 1. Create `.env` File

Create a `.env` file in the project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://axytclwosgvuanglpvii.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here

# App Environment
VITE_APP_ENVIRONMENT=development
```

### 2. Add `.env` to `.gitignore`

Ensure `.env` is in your `.gitignore` file (it should already be there):

```gitignore
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

## Database Schema Setup

### Important Notes
- ⚠️ **All schema edits must be done in the Supabase GUI**
- ⚠️ **SQL files will be executed manually**
- ⚠️ **Do NOT use kv_store**

### Setting Up the Database

1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/axytclwosgvuanglpvii/sql)
2. Copy the SQL from `supabase/database_schema.sql`
3. Execute the SQL in the Supabase SQL Editor
4. Verify the table was created correctly

### Database Schema Overview

The `sarathi_user` table includes:
- **uuid**: Primary key (references auth.users)
- **name**: User's full name
- **first_name**: User's first name
- **email**: User's email (unique)
- **telephone**: User's phone number
- **user_type**: One of: admin, superadmin, moderator, amputee, caregiver, doctor, practitioner, volunteer
- **prosthesis_type**: above_knee, below_knee, or null
- **length_usage**: Duration of prosthesis usage
- **main_challenge**: Array of challenges
- **activities**: Array of activities
- **created_at/updated_at**: Timestamps

### Admin Users

- Admin and Superadmin users are already created
- They have full access to all tables and fields

## Authentication Features

### Session Management

- **Session Persistence**: 30 days (configured in Supabase client)
- **Storage**: Browser localStorage
- **Storage Key**: `sarathi-auth-token`
- **Auto Refresh**: Enabled

### Protected Routes

The following pages require authentication:
- Community (`/community`)
- Stories (`/stories`)
- Profile (`/profile`)
- Daily Tips (`/daily-tips`)
- Help Center (`/help-center`)
- Tutorial (`/tutorial`)
- Admin Dashboard (`/admin`)

When a non-authenticated user tries to access these pages, they are automatically redirected to the login page.

### OAuth Providers (Currently Disabled in UI)

The following OAuth providers are configured in code but grayed out in the UI:
- Google Login
- Facebook Login
- Apple Login

To enable them:
1. Configure each provider in Supabase Dashboard: **Authentication** → **Providers**
2. Remove the `disabled` and `opacity-30` classes from the buttons in `LoginPage.tsx`
3. Add the respective OAuth credentials in Supabase

## Testing the Setup

### 1. Test Local Development

```bash
npm run dev
```

Visit `http://localhost:5173` and try:
- Signing up with a new account
- Logging in with existing credentials
- Accessing protected pages
- Logging out

### 2. Test GitHub Actions

1. Push changes to the `testing` branch
2. Check the Actions tab in GitHub
3. Verify the build passes and environment variables are injected

### 3. Test Deployed Application

Visit your deployed URLs and verify:
- Authentication works
- Protected routes redirect to login
- Session persists after page refresh

## Troubleshooting

### Common Issues

**Issue**: "Missing VITE_SUPABASE_ANON_KEY environment variable"
- **Solution**: Ensure the `.env` file exists locally or GitHub secrets are set correctly

**Issue**: "Failed to fetch" or CORS errors
- **Solution**: Check that the Supabase URL is correct and the project is active

**Issue**: Authentication works locally but not in production
- **Solution**: Verify GitHub secrets are set and the workflows are using them

**Issue**: "Invalid API key" error
- **Solution**: Regenerate the anon key in Supabase dashboard and update all environments

### Getting Help

- Check Supabase logs: [Supabase Dashboard](https://supabase.com/dashboard/project/axytclwosgvuanglpvii/logs)
- Review GitHub Actions logs in the Actions tab
- Check browser console for client-side errors

## Security Best Practices

1. ✅ **Never commit `.env` files** to the repository
2. ✅ **Use GitHub Secrets** for sensitive data
3. ✅ **Rotate keys** if they are exposed
4. ✅ **Use Row Level Security (RLS)** in Supabase (already configured)
5. ✅ **Enable email verification** in Supabase Auth settings
6. ✅ **Set up proper CORS** policies in Supabase

## Summary Checklist

- [ ] Supabase project created with ID `axytclwosgvuanglpvii`
- [ ] Database schema executed in Supabase SQL Editor
- [ ] GitHub secrets added (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
- [ ] Local `.env` file created for development
- [ ] Tested signup and login locally
- [ ] Verified protected routes redirect to login
- [ ] Pushed to testing branch and verified deployment
- [ ] Tested authentication on deployed application
- [ ] Admin and Superadmin users created in Supabase

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)

