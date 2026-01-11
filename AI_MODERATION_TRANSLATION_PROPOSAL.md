# AI Content Moderation & Translation Solutions
## Free/Low-Cost Proposals for Sarathi

---

## 🛡️ Content Moderation Solution

### Recommended Approach: Multi-Layer Free Solution

#### **Layer 1: Client-Side Pre-Filtering (Free)**

**bad-words npm package**
- **Cost**: 100% Free, Open Source
- **Languages**: English + Custom Hindi words
- **Installation**: `npm install bad-words`

```typescript
import Filter from 'bad-words';

const filter = new Filter();
// Add Hindi profanity
filter.addWords('गाली', 'बेवकूफ', /* add more */);

// Usage
const cleanText = filter.clean(userInput);
const isProfane = filter.isProfane(userInput);
```

**Pros:**
- Instant, no API calls
- Works offline
- Zero cost
- Can customize word list

**Cons:**
- Basic pattern matching
- Can be bypassed with creative spelling
- Requires manual Hindi word list maintenance

---

#### **Layer 2: Server-Side AI Moderation (Free Tier)**

### **Option A: Perspective API by Google (Recommended)**

**Cost**: FREE up to 1M requests/day
- **Endpoint**: `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze`
- **Languages**: English, Spanish, French, German, Portuguese, Italian, Russian
- **Hindi Support**: Limited (can use English transliteration)

**Setup:**
1. Get API key: https://perspectiveapi.com/
2. Free tier: 1,000,000 requests/day
3. Response time: ~1 second

**Attributes Detected:**
- TOXICITY
- SEVERE_TOXICITY
- IDENTITY_ATTACK
- INSULT
- PROFANITY
- THREAT
- SEXUALLY_EXPLICIT

```typescript
async function moderateContent(text: string) {
  const response = await fetch(
    `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment: { text },
        languages: ['en'],
        requestedAttributes: {
          TOXICITY: {},
          SEVERE_TOXICITY: {},
          INSULT: {},
          PROFANITY: {}
        }
      })
    }
  );
  
  const data = await response.json();
  const toxicityScore = data.attributeScores.TOXICITY.summaryScore.value;
  
  return {
    isApproved: toxicityScore < 0.7, // threshold
    toxicityScore,
    details: data.attributeScores
  };
}
```

**Pros:**
- Free and reliable
- Multiple toxicity categories
- Confidence scores
- Industry-standard (used by NY Times, Wikipedia)

**Cons:**
- Limited Hindi support
- Requires internet connection
- 1-second latency

---

### **Option B: OpenAI Moderation API**

**Cost**: FREE (no usage limits published)
- **Endpoint**: `https://api.openai.com/v1/moderations`
- **Languages**: Multi-lingual including Hindi

**Setup:**
1. Get API key: https://platform.openai.com/
2. Free tier available
3. Very fast response

```typescript
async function moderateWithOpenAI(text: string) {
  const response = await fetch('https://api.openai.com/v1/moderations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input: text })
  });
  
  const data = await response.json();
  const result = data.results[0];
  
  return {
    isApproved: !result.flagged,
    categories: result.categories,
    categoryScores: result.category_scores
  };
}
```

**Categories:**
- hate
- hate/threatening
- harassment
- harassment/threatening
- self-harm
- sexual
- sexual/minors
- violence
- violence/graphic

**Pros:**
- Excellent Hindi support
- Very accurate
- Fast (<500ms)
- Free tier generous

**Cons:**
- Requires OpenAI account
- May have rate limits
- Depends on OpenAI service

---

### **Option C: Hybrid Approach (Recommended for Hindi)**

**For English**: Perspective API
**For Hindi**: OpenAI Moderation API + Custom word list

```typescript
async function moderateContent(text: string, language: 'en' | 'hi') {
  // Layer 1: Quick client-side check
  const filter = new Filter();
  if (filter.isProfane(text)) {
    return { isApproved: false, reason: 'profanity_detected' };
  }
  
  // Layer 2: AI moderation
  if (language === 'en') {
    return await moderateWithPerspective(text);
  } else {
    return await moderateWithOpenAI(text);
  }
}
```

---

### **Option D: Self-Hosted (Free, but requires setup)**

**LibreTranslate + Profanity List**
- **Cost**: 100% Free, Open Source
- **Setup**: Docker container
- **Languages**: All including Hindi

```bash
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

**Pros:**
- Completely free
- No external dependencies
- Full control
- Privacy-friendly

**Cons:**
- Requires server setup
- Less accurate than cloud AI
- Need to maintain
- Compute resources needed

---

## 🌐 Translation Solution

### **Option 1: LibreTranslate (Recommended - FREE)**

**Cost**: 100% Free, Open Source
- **API**: Self-hosted or free public instance
- **Languages**: 30+ including English ↔ Hindi
- **Limit**: No official limits on self-hosted

**Public Instance:**
```typescript
async function translate(text: string, from: 'en' | 'hi', to: 'en' | 'hi') {
  const response = await fetch('https://libretranslate.com/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: from,
      target: to,
      format: 'text'
    })
  });
  
  const data = await response.json();
  return data.translatedText;
}
```

**Self-Hosted:**
```bash
# Install
docker run -d -p 5000:5000 libretranslate/libretranslate

# Use your own instance
const TRANSLATION_API = 'http://your-server:5000/translate';
```

**Pros:**
- Completely free
- Good quality for English-Hindi
- Can self-host for unlimited usage
- Privacy-friendly
- No API key needed

**Cons:**
- Public instance has rate limits (slower)
- Self-hosted requires server
- Quality lower than Google/DeepL

---

### **Option 2: Google Translate (Free Tier)**

**Cost**: FREE for first 500,000 characters/month
- **After**: $20 per 1M characters
- **Quality**: Excellent for Hindi
- **API**: Google Cloud Translation API

```typescript
import { Translate } from '@google-cloud/translate';
const translate = new Translate({ key: API_KEY });

async function translateText(text: string, target: 'en' | 'hi') {
  const [translation] = await translate.translate(text, target);
  return translation;
}
```

**Pricing:**
- 0-500K chars/month: FREE
- After 500K: $20 per 1M characters

**Pros:**
- Best quality for Hindi
- Fast and reliable
- Official Google service
- Large free tier

**Cons:**
- Need Google Cloud account
- Costs after 500K chars
- Requires API key

---

### **Option 3: Bing Translator (Free Tier)**

**Cost**: FREE for 2M characters/month
- **After**: $10 per 1M characters
- **Quality**: Good for Hindi

```typescript
async function translateBing(text: string, from: string, to: string) {
  const response = await fetch(
    `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`,
    {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{ text }])
    }
  );
  
  const data = await response.json();
  return data[0].translations[0].text;
}
```

**Pros:**
- Larger free tier (2M chars)
- Good Hindi quality
- Fast
- Lower cost after free tier

**Cons:**
- Requires Azure account
- Setup more complex
- Not as good as Google for Hindi

---

### **Option 4: MyMemory Translation API (FREE)**

**Cost**: 100% Free (with limits)
- **Limit**: 5,000 chars/day (anonymous)
- **Limit**: 50,000 chars/day (with API key - free)
- **Quality**: Moderate

```typescript
async function translateMyMemory(text: string, langpair: string) {
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`
  );
  
  const data = await response.json();
  return data.responseData.translatedText;
}

// Usage
const hindi = await translateMyMemory('Hello world', 'en|hi');
```

**Pros:**
- Completely free
- No setup needed
- Simple API

**Cons:**
- Low daily limits
- Moderate quality
- Not reliable for production

---

## 📊 Recommended Solution for Sarathi

### **For Content Moderation:**

**Tier 1 (Development/Testing):**
- Client: `bad-words` npm package with custom Hindi words
- Server: OpenAI Moderation API (free tier)

**Tier 2 (Production):**
- English: Perspective API (1M free requests/day)
- Hindi: OpenAI Moderation API
- Fallback: Custom word list

**Estimated Cost**: $0-50/month depending on usage

---

### **For Translation:**

**Tier 1 (Development/Testing):**
- LibreTranslate self-hosted (Docker)
- Cost: $0 (use your existing server)

**Tier 2 (Production - Option A - Zero Cost):**
- LibreTranslate self-hosted on dedicated instance
- Cache translations in database
- Cost: Server costs only (~$5-10/month for small VPS)

**Tier 2 (Production - Option B - Paid):**
- Google Translate API
- First 500K chars FREE
- Then $20 per 1M chars
- With caching, should handle 10K+ posts/month free

**Recommended**: Start with LibreTranslate (free), upgrade to Google if quality needed

---

## 🏗️ Implementation Architecture

### **Database Structure** (Already Prepared)

```sql
-- In post_comments table:
- moderation_status (pending/approved/rejected)
- is_flagged (boolean)
- original_language (en/hi)
- translated_text_en (cached English translation)
- translated_text_hi (cached Hindi translation)

-- Translation cache table:
translation_cache (
  source_text,
  source_language,
  translated_text,
  target_language
)

-- Moderation log table:
moderation_log (
  content_type,
  ai_service,
  is_flagged,
  confidence_score,
  flagged_categories
)
```

### **Frontend Flow**

```
User types post/comment
    ↓
Client-side: Quick profanity check (bad-words)
    ↓ (if passes)
Submit to server
    ↓
Server: AI moderation check
    ↓
Store with moderation_status
    ↓
If approved: Show immediately
If flagged: Hold for review
```

### **Translation Flow**

```
User clicks "Translate" button
    ↓
Check translation_cache for existing translation
    ↓ (if not cached)
Call translation API
    ↓
Store in cache
    ↓
Display translated text inline
```

---

## 💰 Cost Comparison (Monthly, 10K active users)

| Solution | Moderation | Translation | Total |
|----------|------------|-------------|-------|
| **All Free** | bad-words + OpenAI free tier | LibreTranslate self-hosted | $5-10/month (VPS) |
| **Hybrid** | Perspective (free) + OpenAI | LibreTranslate | $5-10/month |
| **Premium** | OpenAI | Google Translate | $50-100/month |

---

## 🎯 Next Steps

1. ✅ **Database schema created** (migration ready)
2. ⏳ **Choose moderation solution** (recommend: Perspective + OpenAI)
3. ⏳ **Choose translation solution** (recommend: LibreTranslate)
4. ⏳ **Implement moderation middleware**
5. ⏳ **Implement translation service**
6. ⏳ **Add UI for translate button**
7. ⏳ **Test with real content**

---

## 📝 Hindi Profanity Word List (Starter)

To add to `bad-words` filter:

```typescript
const hindiProfanity = [
  'बेवकूफ', 'मूर्ख', 'गधा', 'कमीना', 'हरामी',
  'साला', 'कुत्ता', 'सुअर', /* add more carefully */
];

filter.addWords(...hindiProfanity);
```

---

## 🔗 Resources

- Perspective API: https://perspectiveapi.com/
- OpenAI Moderation: https://platform.openai.com/docs/guides/moderation
- LibreTranslate: https://libretranslate.com/
- bad-words package: https://www.npmjs.com/package/bad-words
- Google Translate API: https://cloud.google.com/translate/pricing

---

## ⚠️ Important Notes

1. **Always cache translations** to reduce API calls
2. **Use moderation_status** to filter content in queries
3. **Log false positives** to improve accuracy
4. **Allow manual review** for flagged content
5. **Don't block content immediately** - mark for review first
6. **Hindi moderation** is harder - use multiple layers
