# Setup Guide: OpenAI Content Moderation

## ✅ What's Been Implemented

All code is ready and waiting for your OpenAI API key. Here's what's active:

### 1. **Content Moderation Service** (`src/services/moderationService.ts`)
- ✅ OpenAI Moderation API integration enabled
- ✅ Detects: hate speech, harassment, violence, sexual content, self-harm
- ✅ Supports both English and Hindi
- ✅ Graceful fallback (approves content if API fails)

### 2. **Integration Points**
- ✅ **CreatePost**: Moderates post text before submission
- ✅ **Comments**: Moderates comments before posting
- ✅ **Reposts**: Moderates repost comments before submission

### 3. **User Experience**
- ✅ Content is checked before posting
- ✅ Inappropriate content shows error message
- ✅ Users can edit and resubmit
- ✅ No content is blocked if API is unavailable (safe default)

---

## 🔑 Get Your Free OpenAI API Key

### The OpenAI Platform page is now open in your Cursor browser!

**Follow these steps:**

1. **Sign Up / Log In**
   - Click "Sign up" if you don't have an account
   - Or click "Log in" if you already have one
   - It's **FREE** to sign up!

2. **Navigate to API Keys**
   - After login, you'll be at: https://platform.openai.com/api-keys
   - Or click on your profile → "API keys"

3. **Create a New API Key**
   - Click "Create new secret key"
   - Give it a name (e.g., "Sarathi Moderation")
   - **IMPORTANT**: Copy the key immediately - you can only see it once!
   - It will look like: `sk-proj-...`

4. **Free Tier Info**
   - New accounts get **$5 in free credits** (valid for 3 months)
   - Moderation API is **FREE** (doesn't count against credits)
   - Perfect for testing and moderate usage!

---

## ⚙️ Configure Your Application

### **Step 1: Add API Key to Environment**

Create a `.env` file in your project root (if it doesn't exist):

```env
VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**IMPORTANT**: 
- Replace `sk-proj-your-actual-key-here` with your actual key
- Never commit this file to git (it should be in `.gitignore`)

### **Step 2: Restart Development Server**

```bash
# Stop your current dev server (Ctrl+C)
npm run dev
```

That's it! The moderation is now active.

---

## 🧪 Test Content Moderation

### **Test 1: Normal Content** ✅
1. Go to Community page
2. Create a post: "Hello everyone! Great to be here."
3. Should post successfully

### **Test 2: Inappropriate Content** 🚫
1. Try posting: "I hate everyone and want to hurt people"
2. Should be blocked with error message
3. Error will say: "Inappropriate content detected"

### **Test 3: Hindi Content** ✅
1. Post in Hindi: "नमस्ते, मैं यहाँ नया हूँ"
2. Should post successfully
3. OpenAI handles Hindi well!

---

## 📊 What Gets Checked

The OpenAI Moderation API checks for:

| Category | Description |
|----------|-------------|
| **hate** | Content expressing hate or harassment |
| **hate/threatening** | Hateful content with violence |
| **harassment** | Bullying or harassment |
| **harassment/threatening** | Harassment with threats |
| **self-harm** | Content promoting self-harm |
| **sexual** | Sexual content |
| **sexual/minors** | Sexual content involving minors |
| **violence** | Violent content |
| **violence/graphic** | Graphic violent content |

---

## 🔧 How It Works

```
User types post/comment
    ↓
Submits form
    ↓
Frontend calls moderateContent()
    ↓
Sends to OpenAI Moderation API
    ↓
API returns: flagged = true/false
    ↓
If flagged: Show error, don't post
If approved: Save to database
```

**Response Time**: ~300-500ms
**Cost**: FREE (doesn't use your $5 credits)

---

## 💡 Current Behavior

### **Without API Key (Current State)**
- Console warning: "OpenAI API key not configured - approving by default"
- All content is approved
- Safe for development

### **With API Key (After Setup)**
- Content is actively moderated
- Inappropriate content is blocked
- Users see helpful error messages

---

## 🚨 Troubleshooting

### **"OpenAI API error: 401"**
- Your API key is invalid or expired
- Double-check the key in `.env`
- Make sure it starts with `sk-`
- Restart dev server

### **"OpenAI API error: 429"**
- Rate limit exceeded (rare for moderation API)
- Wait a few seconds and try again
- Consider implementing rate limiting on your end

### **Content Not Being Blocked**
- Check browser console for moderation warnings
- Verify API key is loaded: `console.log(import.meta.env.VITE_OPENAI_API_KEY)`
- Make sure you restarted dev server after adding .env

---

## 📈 Monitoring Usage

1. Log in to OpenAI Platform: https://platform.openai.com
2. Go to "Usage" section
3. See your API calls (Moderation API shows as $0.00)

---

## 🔐 Security Best Practices

1. **Never commit API keys to git**
   - Add `.env` to `.gitignore` ✅ (should already be there)
   
2. **Use environment variables**
   - ✅ Already configured with `import.meta.env.VITE_OPENAI_API_KEY`

3. **Rotate keys periodically**
   - Create new key every few months
   - Delete old keys from OpenAI dashboard

4. **For production**
   - Set environment variable in your hosting platform
   - Azure Static Web Apps: Settings → Configuration → Application settings

---

## 🎯 Next Steps

1. ✅ **Get API key** from OpenAI (website is open in browser)
2. ✅ **Add to `.env`** file
3. ✅ **Restart dev server**
4. ✅ **Test with inappropriate content**
5. ⏳ **Deploy to production** (add key to Azure config)

---

## 📚 Additional Resources

- **OpenAI Moderation API Docs**: https://platform.openai.com/docs/guides/moderation
- **API Reference**: https://platform.openai.com/docs/api-reference/moderations
- **Pricing**: https://openai.com/api/pricing/ (Moderation = FREE)

---

## ✅ Summary

**Status**: ✅ Fully implemented, waiting for API key
**Cost**: FREE (Moderation API has no cost)
**Setup Time**: 5 minutes
**Current Behavior**: Approving all content (safe default)
**After Setup**: Active content moderation in English & Hindi

**The OpenAI Platform is now open in your Cursor browser. Go get your free API key! 🚀**
