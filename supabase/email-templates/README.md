# Sarathi Supabase Email Templates

These HTML templates are designed for Supabase Auth emails using Sarathi branding (primary `#388896`, secondary `#8AC0AD`) and the Sarathi logo.

## Where the logo lives in the production package

- **Source:** `public/sarathilogo-512.png`
- **Build:** Vite copies `public/` into `dist/`, so the built app has `dist/sarathilogo-512.png`
- **Deploy:** The GitHub workflow also runs `cp -r public/* dist/`. Azure Static Web Apps serves files from `dist/` at the site root, so the logo is available at **`/sarathilogo-512.png`** on your production origin.
- **Email templates** use a full URL so the logo loads in email clients. That URL is set to **https://sarthiapp.co.in/sarathilogo-512.png**. If your production site is different (e.g. `https://jolly-bush-0d2030500.3.azurestaticapps.net` or another domain), change the `src` in `otp.html` and `confirm-signup.html` to `<your-origin>/sarathilogo-512.png`.

## Prerequisites

1. The logo URL in the templates must point at your live site (same origin as the app). Ensure that URL is reachable from the internet.
2. **Site URL** in Supabase should still match your app origin for confirmation/redirect links.

## Where to set templates

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **Authentication** → **Email Templates**.

## 1. Magic Link (OTP only — no magic link)

Used when users request a **password reset code** or **email OTP**. The template sends only the **6-digit code**; there is no clickable link.

- **Template:** Magic Link  
- **Subject:** set to something like:  
  `Your Sarathi verification code`  
  or  
  `Your verification code`

- **Body:** paste the full contents of `otp.html` into the template body.

The template uses `{{ .Token }}` for the 6-digit OTP. Do **not** include `{{ .ConfirmationURL }}` or any magic link in this template if you want OTP-only flow.

## 2. Confirm signup (register user email)

Used when a new user **registers** and must confirm their email.

- **Template:** Confirm signup  
- **Subject:** set to something like:  
  `Confirm your Sarathi account`  
  or  
  `Confirm your email`

- **Body:** paste the full contents of `confirm-signup.html` into the template body.

The template uses `{{ .ConfirmationURL }}` for the “Confirm your email” button and includes a plain link fallback.

## Copy-paste steps

1. Open `otp.html` or `confirm-signup.html` in an editor.
2. Copy the **entire** file (including `<!DOCTYPE html>` and all content).
3. In Supabase → Authentication → Email Templates, select **Magic Link** or **Confirm signup**.
4. Paste into the **Message body** (replace any existing content).
5. Set the **Subject** as above.
6. Save.

## Template variables (Supabase)

| Variable             | Description                    |
|----------------------|--------------------------------|
| `{{ .Token }}`       | 6-digit OTP (use in OTP template only). |
| `{{ .ConfirmationURL }}` | Full confirmation URL (use in confirm signup). |
| `{{ .SiteURL }}`     | Your app Site URL from Auth settings. Logo is hardcoded to `https://sarthiapp.co.in/sarathilogo-512.png`. |
| `{{ .Email }}`       | User’s email address.         |

## Brand colors

- Primary: `#388896`
- Secondary / accent: `#8AC0AD`
- Header gradient: `linear-gradient(180deg, #8AC0AD 0%, #388896 100%)`
