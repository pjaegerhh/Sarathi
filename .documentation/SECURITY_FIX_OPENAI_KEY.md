# SECURITY FIX: OpenAI API Key Exposure

## 🚨 Critical Security Issue Found

**Issue:** OpenAI API key was being exposed in client-side JavaScript code, allowing anyone to steal and abuse it.

**Date Fixed:** January 20, 2026

---

## ❌ The Vulnerability

The OpenAI API key was being used directly in the browser via `src/services/moderationService.ts`:

```typescript
// INSECURE CODE (now fixed):
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const response = await fetch('https://api.openai.com/v1/moderations', {
  headers: { 'Authorization': `Bearer ${API_KEY}` }
})
```

### Why This Was Dangerous

1. **API Key in Compiled Code**: The key was embedded in `dist/assets/index-*.js` 
2. **Visible in DevTools**: Anyone could open Network tab and see the key in requests
3. **Publicly Accessible**: Anyone visiting the website could extract the key
4. **Abuse Potential**: Stolen keys can be used to make unlimited API calls, costing money or hitting rate limits

---

## ✅ The Fix

### 1. Created Secure Backend (Supabase Edge Function)

Created `supabase/functions/moderate-content/index.ts` which:
- Runs on Supabase's servers (not in the browser)
- Stores the API key as an encrypted secret
- Requires user authentication
- Acts as a secure proxy to OpenAI

### 2. Updated Client Code

Modified `src/services/moderationService.ts` to call the backend:

```typescript
// SECURE CODE:
const { data } = await supabase.functions.invoke('moderate-content', {
  body: { text, language }
})
```

### 3. Removed Environment Variable from Build

Updated GitHub Actions workflows to stop injecting `VITE_OPENAI_API_KEY` into the build.

---

## 🔧 Required Setup Steps

### Step 1: Revoke the Compromised Key

**⚠️ DO THIS IMMEDIATELY:**

1. Go to https://platform.openai.com/api-keys
2. Find the compromised key
3. Click "Revoke" to delete it
4. Create a new API key

### Step 2: Install Supabase CLI

```bash
# Windows (PowerShell)
scoop install supabase

# Mac
brew install supabase/tap/supabase

# Or use npm
npm install -g supabase
```

### Step 3: Login to Supabase

```bash
supabase login
```

### Step 4: Link Your Project

```bash
# Find your project ref at: https://supabase.com/dashboard/project/_/settings/general
supabase link --project-ref your-project-ref
```

### Step 5: Deploy the Edge Function

```bash
# From the project root directory
supabase functions deploy moderate-content
```

### Step 6: Set the API Key as a Secure Secret

```bash
# Replace sk-your-new-key with your NEW OpenAI API key
supabase secrets set OPENAI_API_KEY=sk-your-new-key
```

### Step 7: Verify the Secret

```bash
supabase secrets list
```

You should see:
```
OPENAI_API_KEY | secret-value-******
```

### Step 8: Remove GitHub Secret (Optional)

Since we no longer use `VITE_OPENAI_API_KEY` in builds:

1. Go to https://github.com/your-username/sarathi/settings/secrets/actions
2. Delete the `VITE_OPENAI_API_KEY` secret (if it exists)

### Step 9: Test the Function

```bash
# Test locally (optional)
supabase functions serve moderate-content

# Or test in production after deploying your app
# The moderation service will automatically use the new backend
```

---

## 📝 How It Works Now

### Before (Insecure)
```
Browser → OpenAI API (with exposed key in JS)
```

### After (Secure)
```
Browser → Supabase Edge Function → OpenAI API (key stored securely)
         (authenticated)          (server-side only)
```

---

## 🛡️ Security Best Practices

### ✅ DO:
- Store API keys in backend/environment secrets
- Use backend proxies for third-party API calls
- Require authentication for sensitive operations
- Rotate API keys regularly
- Monitor API usage for anomalies

### ❌ DON'T:
- Put API keys in environment variables starting with `VITE_`, `REACT_APP_`, `NEXT_PUBLIC_`
- Make API calls to paid services directly from client-side code
- Commit `.env` files to git
- Share API keys in Slack, email, or documentation
- Reuse the same API key across multiple projects

---

## 🔍 How to Check for Similar Issues

### 1. Search for Client-Side API Calls

```bash
# Search for fetch calls with Authorization headers
rg "Authorization.*Bearer" --type ts --type tsx

# Search for API keys in environment variables
rg "VITE_.*API.*KEY|VITE_.*SECRET" --type ts --type tsx
```

### 2. Check Build Output

After running `npm run build`, search the compiled JavaScript:

```bash
# Search for API key patterns in compiled code
rg "sk-[a-zA-Z0-9]{20,}|AIza[a-zA-Z0-9_-]{35}" dist/
```

If you find any matches, those keys are exposed!

### 3. Monitor OpenAI Dashboard

Check https://platform.openai.com/usage for unexpected usage spikes.

---

## 💰 Potential Cost Impact

If your key was used by others, check your OpenAI usage:
1. Go to https://platform.openai.com/usage
2. Look for unusual spikes in API calls
3. Check the date range around when the key was first deployed

OpenAI Moderation API is free, but other OpenAI APIs (GPT-4, etc.) are paid.

---

## 📚 Additional Resources

- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
- [OpenAI API Key Security](https://platform.openai.com/docs/api-reference/authentication)
- [Securing API Keys in Web Apps](https://owasp.org/www-community/vulnerabilities/Exposed_API_Keys)

---

## ✅ Verification Checklist

- [ ] Revoked old OpenAI API key
- [ ] Created new OpenAI API key
- [ ] Installed Supabase CLI
- [ ] Deployed Edge Function: `supabase functions deploy moderate-content`
- [ ] Set new API key: `supabase secrets set OPENAI_API_KEY=...`
- [ ] Verified secret: `supabase secrets list`
- [ ] Removed `VITE_OPENAI_API_KEY` from GitHub Secrets (optional)
- [ ] Tested moderation in the app
- [ ] Checked OpenAI usage dashboard for anomalies
- [ ] Built the app and verified no keys in `dist/` folder

---

## 🆘 Troubleshooting

### "Function not found" error

Make sure you deployed the function:
```bash
supabase functions deploy moderate-content
```

### "Unauthorized" error

The user must be logged in to use moderation. Check that `supabase.auth.getUser()` returns a user.

### "OpenAI API key not configured"

Set the secret on Supabase:
```bash
supabase secrets set OPENAI_API_KEY=sk-your-new-key
```

### Still seeing the old key in builds

1. Clear the build cache: `rm -rf dist node_modules/.vite`
2. Rebuild: `npm run build`
3. Search for keys: `rg "sk-" dist/`

---

**Status: ✅ FIXED**

All API keys are now stored securely on the backend. Client-side code can no longer expose sensitive credentials.
