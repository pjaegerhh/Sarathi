# Content Moderation Edge Function

This Supabase Edge Function provides secure, server-side content moderation using OpenAI's Moderation API.

## Purpose

This function prevents exposing your OpenAI API key in client-side code by acting as a secure proxy for moderation requests.

## Setup

### 1. Deploy the Function

```bash
# Login to Supabase CLI
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy the function
supabase functions deploy moderate-content
```

### 2. Set the OpenAI API Key as a Secret

```bash
# Set the secret (this is stored securely on Supabase, NOT in your code)
supabase secrets set OPENAI_API_KEY=sk-your-new-openai-key
```

### 3. Verify Secrets

```bash
supabase secrets list
```

## Usage

The function is called from the client-side `moderationService.ts`:

```typescript
const response = await supabase.functions.invoke('moderate-content', {
  body: {
    text: "Content to moderate",
    language: "en" // or "hi"
  }
})

const result: ModerationResult = response.data
```

## Security Features

- ✅ **Authentication Required**: Only authenticated users can call this function
- ✅ **API Key Hidden**: OpenAI key is stored as Supabase secret, never exposed to client
- ✅ **CORS Configured**: Only allows requests from your domain
- ✅ **Rate Limiting**: Inherits Supabase's rate limiting
- ✅ **Logging**: Optionally logs moderation results to database

## API

### Request

```json
{
  "text": "Content to moderate",
  "language": "en"
}
```

### Response

```json
{
  "isApproved": true,
  "confidence": 0.1,
  "flaggedCategories": [],
  "reason": null
}
```

## Error Handling

- If OpenAI API is down → Returns `{ isApproved: true }` (fail open)
- If rate limit hit → Returns `{ isApproved: true }` (fail open)
- If user not authenticated → Returns 401 error

## Cost

- OpenAI Moderation API: **FREE** (no official limit)
- Supabase Edge Functions: **FREE** up to 500K requests/month

## Troubleshooting

1. **Function not found**: Make sure you deployed it with `supabase functions deploy moderate-content`
2. **401 Unauthorized**: Ensure the user is logged in before calling the function
3. **Missing API key**: Set the secret with `supabase secrets set OPENAI_API_KEY=...`
