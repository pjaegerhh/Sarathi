/**
 * Content Moderation Service
 * 
 * This service is prepared for AI-powered content moderation.
 * Currently returns { isApproved: true } for all content.
 * 
 * TO IMPLEMENT:
 * 1. Choose moderation provider (see AI_MODERATION_TRANSLATION_PROPOSAL.md)
 * 2. Add API keys to environment variables
 * 3. Uncomment and configure the appropriate provider below
 * 4. Update moderation_status in database after checking
 */

// Simple cache to avoid re-checking same content
const moderationCache = new Map<string, { result: ModerationResult; timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute

export interface ModerationResult {
  isApproved: boolean;
  confidence?: number;
  flaggedCategories?: string[];
  reason?: string;
}

/**
 * Moderate content using AI
 * @param text - The text to moderate
 * @param language - The language of the text ('en' or 'hi')
 * @returns Moderation result
 */
export async function moderateContent(
  text: string,
  language: 'en' | 'hi' = 'en'
): Promise<ModerationResult> {
  // Check cache first
  const cacheKey = `${text}_${language}`;
  const cached = moderationCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.result;
  }
  
  // OPTION 1: Client-side basic check (always run this first)
  if (await basicProfanityCheck(text)) {
    return {
      isApproved: false,
      reason: 'Contains prohibited words',
      flaggedCategories: ['profanity']
    };
  }
  
  // OPTION 2B: Use OpenAI Moderation (for Hindi and English) - ENABLED
  const result = await moderateWithOpenAI(text);
  
  // Cache the result
  moderationCache.set(cacheKey, { result, timestamp: Date.now() });
  
  return result;
}

/**
 * Basic profanity check using simple word list
 * This should always run before AI moderation for fast rejection
 */
async function basicProfanityCheck(text: string): Promise<boolean> {
  // TODO: Install bad-words package: npm install bad-words
  // import Filter from 'bad-words';
  // const filter = new Filter();
  // 
  // // Add Hindi profanity words
  // const hindiProfanity = ['बेवकूफ', 'मूर्ख', 'गधा', /* add more */];
  // filter.addWords(...hindiProfanity);
  // 
  // return filter.isProfane(text);
  
  // For now, return false (no profanity detected)
  return false;
}

/**
 * Moderate content using Perspective API
 * FREE: 1M requests/day
 * Good for: English content
 */
async function moderateWithPerspectiveAPI(text: string): Promise<ModerationResult> {
  const API_KEY = process.env.VITE_PERSPECTIVE_API_KEY || '';
  
  if (!API_KEY) {
    console.warn('Perspective API key not configured');
    return { isApproved: true };
  }
  
  try {
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
            PROFANITY: {},
            THREAT: {}
          }
        })
      }
    );
    
    const data = await response.json();
    const scores = data.attributeScores;
    
    // Get highest toxicity score
    const toxicity = scores.TOXICITY?.summaryScore?.value || 0;
    const severeToxicity = scores.SEVERE_TOXICITY?.summaryScore?.value || 0;
    const insult = scores.INSULT?.summaryScore?.value || 0;
    const profanity = scores.PROFANITY?.summaryScore?.value || 0;
    const threat = scores.THREAT?.summaryScore?.value || 0;
    
    const maxScore = Math.max(toxicity, severeToxicity, insult, profanity, threat);
    const threshold = 0.7; // Adjust based on your needs
    
    const flaggedCategories: string[] = [];
    if (toxicity > threshold) flaggedCategories.push('toxicity');
    if (severeToxicity > threshold) flaggedCategories.push('severe_toxicity');
    if (insult > threshold) flaggedCategories.push('insult');
    if (profanity > threshold) flaggedCategories.push('profanity');
    if (threat > threshold) flaggedCategories.push('threat');
    
    return {
      isApproved: maxScore < threshold,
      confidence: maxScore,
      flaggedCategories,
      reason: flaggedCategories.length > 0 ? `Flagged for: ${flaggedCategories.join(', ')}` : undefined
    };
  } catch (error) {
    console.error('Perspective API error:', error);
    // On error, approve content (don't block users due to API issues)
    return { isApproved: true };
  }
}

/**
 * Moderate content using OpenAI Moderation API
 * FREE: No official limit
 * Good for: Hindi and English content
 */
async function moderateWithOpenAI(text: string): Promise<ModerationResult> {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
  
  if (!API_KEY) {
    console.warn('OpenAI API key not configured - approving by default');
    return { isApproved: true };
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: text })
    });
    
    if (!response.ok) {
      if (response.status === 429) {
        console.warn('OpenAI rate limit hit - approving content by default');
        return { isApproved: true };
      }
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const result = data.results[0];
    
    const flaggedCategories: string[] = [];
    if (result.categories) {
      Object.keys(result.categories).forEach(category => {
        if (result.categories[category]) {
          flaggedCategories.push(category);
        }
      });
    }
    
    return {
      isApproved: !result.flagged,
      confidence: result.flagged ? 0.9 : 0.1,
      flaggedCategories,
      reason: flaggedCategories.length > 0 ? `Flagged for: ${flaggedCategories.join(', ')}` : undefined
    };
  } catch (error) {
    console.error('OpenAI moderation error:', error);
    return { isApproved: true };
  }
}

/**
 * Log moderation result to database
 */
export async function logModerationResult(
  contentType: 'post' | 'comment' | 'repost_comment',
  contentId: string,
  result: ModerationResult,
  originalText: string
) {
  // TODO: Implement database logging
  // This helps track false positives and improve the system
  
  // Example:
  // await supabase.from('moderation_log').insert({
  //   content_type: contentType,
  //   content_id: contentId,
  //   ai_service: 'openai', // or 'perspective_api'
  //   is_flagged: !result.isApproved,
  //   confidence_score: result.confidence,
  //   flagged_categories: result.flaggedCategories,
  //   original_text: originalText,
  //   detected_language: 'en' // or detect automatically
  // });
}
