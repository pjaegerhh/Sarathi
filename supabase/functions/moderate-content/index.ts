import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

interface ModerationRequest {
  text: string
  language?: 'en' | 'hi'
}

interface ModerationResult {
  isApproved: boolean
  confidence?: number
  flaggedCategories?: string[]
  reason?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Authentication is optional for moderation
    // The function is already protected by Supabase project's anon key
    const authHeader = req.headers.get('Authorization')
    let userId: string | null = null

    // Try to get user ID if auth header is provided (for logging purposes)
    if (authHeader) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
          global: { headers: { Authorization: authHeader } }
        })
        const { data: { user } } = await supabase.auth.getUser()
        userId = user?.id || null
      } catch {
        // Ignore auth errors - moderation should still work
      }
    }

    // Parse request body
    const { text, language = 'en' }: ModerationRequest = await req.json()

    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid request: text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Call OpenAI Moderation API
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!openaiApiKey) {
      console.warn('OpenAI API key not configured - approving by default')
      const result: ModerationResult = { isApproved: true }
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: text })
    })

    if (!openaiResponse.ok) {
      if (openaiResponse.status === 429) {
        console.warn('OpenAI rate limit hit - approving content by default')
        const result: ModerationResult = { isApproved: true }
        return new Response(
          JSON.stringify(result),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const openaiData = await openaiResponse.json()
    const moderationResult = openaiData.results[0]

    const flaggedCategories: string[] = []
    if (moderationResult.categories) {
      Object.keys(moderationResult.categories).forEach((category) => {
        if (moderationResult.categories[category]) {
          flaggedCategories.push(category)
        }
      })
    }

    const result: ModerationResult = {
      isApproved: !moderationResult.flagged,
      confidence: moderationResult.flagged ? 0.9 : 0.1,
      flaggedCategories,
      reason: flaggedCategories.length > 0 
        ? `Flagged for: ${flaggedCategories.join(', ')}` 
        : undefined
    }

    // Optional: Log moderation result to database (only if user is authenticated)
    // Note: Logging is disabled by default as moderation_log table may not exist
    // Uncomment below to enable logging when table is created
    /*
    if (userId) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const adminClient = createClient(supabaseUrl, supabaseServiceKey)
        await adminClient.from('moderation_log').insert({
          user_id: userId,
          content_text: text,
          language,
          ai_service: 'openai',
          is_flagged: !result.isApproved,
          confidence_score: result.confidence,
          flagged_categories: flaggedCategories,
          created_at: new Date().toISOString()
        })
      } catch (logError) {
        // Don't fail the request if logging fails
      }
    }
    */

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Moderation error:', error)
    
    // On error, approve content (don't block users due to API issues)
    const fallbackResult: ModerationResult = { isApproved: true }
    
    return new Response(
      JSON.stringify(fallbackResult),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
