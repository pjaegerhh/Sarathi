/**
 * Content Moderation Service
 * 
 * This service provides secure AI-powered content moderation via Supabase Edge Function.
 * The OpenAI API key is stored securely on the server, not exposed to clients.
 * 
 * SECURITY: Never call OpenAI or other AI APIs directly from client-side code!
 * Always use a backend/edge function to protect API keys.
 */

import { supabase } from '../lib/supabase';

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
 * Moderate content using AI via secure backend
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
  
  // OPTION 2: Use secure backend moderation (Supabase Edge Function)
  const result = await moderateWithBackend(text, language);
  
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
 * @deprecated INSECURE - DO NOT USE
 * This function exposes API keys in client-side code.
 * If you want to use Perspective API, create a Supabase Edge Function for it.
 */
async function moderateWithPerspectiveAPI_INSECURE_DO_NOT_USE(text: string): Promise<ModerationResult> {
  // ❌ SECURITY VULNERABILITY: Same issue as OpenAI - API keys exposed in client code
  // Use a backend/edge function instead
  
  console.warn('Perspective API called from client - this is insecure!');
  return { isApproved: true };
}

/**
 * Moderate content using secure backend (Supabase Edge Function)
 * This calls our Edge Function which securely stores the OpenAI API key
 * 
 * SECURITY: This is the correct way to use third-party APIs from a web app.
 * The API key never leaves the server and cannot be stolen from client code.
 */
async function moderateWithBackend(
  text: string,
  language: 'en' | 'hi' = 'en'
): Promise<ModerationResult> {
  // Skip backend moderation in development if Edge Function is not available
  // This prevents CORS errors during local development
  const isDev = import.meta.env.DEV || window.location.hostname === 'localhost';
  const skipModeration = import.meta.env.VITE_SKIP_MODERATION === 'true';
  
  if (skipModeration) {
    // Moderation explicitly disabled via environment variable
    return { isApproved: true };
  }
  
  try {
    const { data, error } = await supabase.functions.invoke('moderate-content', {
      body: { text, language }
    });

    if (error) {
      // On error, approve content (don't block users due to API issues)
      // In dev mode, this is expected if Edge Function is not deployed
      if (isDev) {
        // Silently approve in dev mode
        return { isApproved: true };
      }
      return { isApproved: true };
    }

    return data as ModerationResult;
  } catch (error) {
    // On error, approve content (don't block users due to API issues)
    // In dev mode, this is expected if Edge Function is not deployed
    return { isApproved: true };
  }
}

/**
 * @deprecated INSECURE - DO NOT USE
 * This function exposes API keys in client-side code. Use moderateWithBackend() instead.
 * Keeping this here as a reference for what NOT to do.
 */
async function moderateWithOpenAI_INSECURE_DO_NOT_USE(text: string): Promise<ModerationResult> {
  // ❌ SECURITY VULNERABILITY: API keys in client-side code can be stolen!
  // ❌ Anyone can view your compiled JavaScript and extract the key
  // ❌ Anyone can open DevTools and see the key in network requests
  // ❌ Your key will be used by others, costing you money or hitting rate limits
  
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
  
  if (!API_KEY) {
    console.warn('OpenAI API key not configured - approving by default');
    return { isApproved: true };
  }
  
  // DO NOT UNCOMMENT THIS CODE - IT'S INSECURE!
  // Use moderateWithBackend() instead
  
  return { isApproved: true };
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
