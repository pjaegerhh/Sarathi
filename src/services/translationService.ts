/**
 * Translation Service
 * 
 * This service is prepared for AI-powered translation.
 * Currently returns original text unchanged.
 * 
 * TO IMPLEMENT:
 * 1. Choose translation provider (see AI_MODERATION_TRANSLATION_PROPOSAL.md)
 * 2. Add API keys to environment variables (if using paid service)
 * 3. Or set up LibreTranslate Docker container (free)
 * 4. Uncomment and configure the appropriate provider below
 * 5. Enable translation caching in database
 */

import { supabase } from '../lib/supabase';

export type SupportedLanguage = 'en' | 'hi';

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  cached: boolean;
}

/**
 * Translate text between English and Hindi
 * @param text - The text to translate
 * @param targetLanguage - Target language ('en' or 'hi')
 * @param sourceLanguage - Source language (optional, will be detected)
 * @returns Translation result
 */
export async function translateText(
  text: string,
  targetLanguage: SupportedLanguage,
  sourceLanguage?: SupportedLanguage
): Promise<TranslationResult> {
  // Detect source language if not provided
  if (!sourceLanguage) {
    sourceLanguage = detectLanguage(text);
  }
  
  // If same language, return original
  if (sourceLanguage === targetLanguage) {
    return {
      translatedText: text,
      sourceLanguage,
      targetLanguage,
      cached: false
    };
  }
  
  // Check cache first
  const cached = await getFromCache(text, sourceLanguage, targetLanguage);
  if (cached) {
    return {
      translatedText: cached,
      sourceLanguage,
      targetLanguage,
      cached: true
    };
  }
  
  // Translate using selected provider
  let translatedText: string;
  
  try {
    // TODO: Choose and implement translation provider
    // See AI_MODERATION_TRANSLATION_PROPOSAL.md for options
    
    // OPTION 1: LibreTranslate (FREE - Recommended)
    // translatedText = await translateWithLibreTranslate(text, sourceLanguage, targetLanguage);
    
    // OPTION 2: Google Translate (500K chars/month free)
    // translatedText = await translateWithGoogle(text, targetLanguage);
    
    // OPTION 3: Bing Translator (2M chars/month free)
    // translatedText = await translateWithBing(text, sourceLanguage, targetLanguage);
    
    // DEFAULT: Return original text (for development)
    translatedText = text;
    
    // Cache the translation
    await saveToCache(text, sourceLanguage, translatedText, targetLanguage);
    
    return {
      translatedText,
      sourceLanguage,
      targetLanguage,
      cached: false
    };
  } catch (error) {
    console.error('Translation error:', error);
    // On error, return original text
    return {
      translatedText: text,
      sourceLanguage,
      targetLanguage,
      cached: false
    };
  }
}

/**
 * Detect language of text (simple heuristic)
 * For production, use a proper language detection library
 */
function detectLanguage(text: string): SupportedLanguage {
  // Simple detection: check for Hindi unicode range
  const hindiRegex = /[\u0900-\u097F]/;
  return hindiRegex.test(text) ? 'hi' : 'en';
}

/**
 * Get translation from cache
 */
async function getFromCache(
  sourceText: string,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('translation_cache')
      .select('translated_text')
      .eq('source_text', sourceText)
      .eq('source_language', sourceLanguage)
      .eq('target_language', targetLanguage)
      .single();
    
    if (error || !data) return null;
    
    return data.translated_text;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

/**
 * Save translation to cache
 */
async function saveToCache(
  sourceText: string,
  sourceLanguage: SupportedLanguage,
  translatedText: string,
  targetLanguage: SupportedLanguage
): Promise<void> {
  try {
    await supabase.from('translation_cache').insert({
      source_text: sourceText,
      source_language: sourceLanguage,
      translated_text: translatedText,
      target_language: targetLanguage,
      translation_service: 'libre_translate' // Update based on provider used
    });
  } catch (error) {
    // Ignore cache errors (unique constraint violations are ok)
    console.debug('Cache write error (this is ok):', error);
  }
}

/**
 * Translate using LibreTranslate (FREE)
 * Self-hosted or public instance
 */
async function translateWithLibreTranslate(
  text: string,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): Promise<string> {
  const LIBRE_TRANSLATE_URL = process.env.VITE_LIBRE_TRANSLATE_URL || 'https://libretranslate.com/translate';
  
  const response = await fetch(LIBRE_TRANSLATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: sourceLanguage,
      target: targetLanguage,
      format: 'text'
    })
  });
  
  const data = await response.json();
  return data.translatedText;
}

/**
 * Translate using Google Translate API
 * FREE: 500K chars/month, then $20 per 1M chars
 */
async function translateWithGoogle(
  text: string,
  targetLanguage: SupportedLanguage
): Promise<string> {
  const API_KEY = process.env.VITE_GOOGLE_TRANSLATE_API_KEY || '';
  
  if (!API_KEY) {
    throw new Error('Google Translate API key not configured');
  }
  
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target: targetLanguage
      })
    }
  );
  
  const data = await response.json();
  return data.data.translations[0].translatedText;
}

/**
 * Translate using Bing Translator
 * FREE: 2M chars/month
 */
async function translateWithBing(
  text: string,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): Promise<string> {
  const API_KEY = process.env.VITE_AZURE_TRANSLATOR_KEY || '';
  const ENDPOINT = process.env.VITE_AZURE_TRANSLATOR_ENDPOINT || '';
  
  if (!API_KEY || !ENDPOINT) {
    throw new Error('Azure Translator not configured');
  }
  
  const response = await fetch(
    `${ENDPOINT}/translate?api-version=3.0&from=${sourceLanguage}&to=${targetLanguage}`,
    {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{ text }])
    }
  );
  
  const data = await response.json();
  return data[0].translations[0].text;
}

/**
 * Batch translate multiple texts
 * More efficient for translating multiple items at once
 */
export async function batchTranslate(
  texts: string[],
  targetLanguage: SupportedLanguage,
  sourceLanguage?: SupportedLanguage
): Promise<string[]> {
  // For now, translate one by one
  // TODO: Implement true batch translation for better performance
  const results = await Promise.all(
    texts.map(text => translateText(text, targetLanguage, sourceLanguage))
  );
  
  return results.map(r => r.translatedText);
}
