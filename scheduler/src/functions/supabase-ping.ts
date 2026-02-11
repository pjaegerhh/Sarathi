/**
 * Timer: pings Supabase every 2 hours.
 * HTTP GET: manual health check at /api/supabase-ping.
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY; optional SUPABASE_PING_TABLE.
 * (Sarathi production scheduler)
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext, Timer } from '@azure/functions'
import { createClient } from '@supabase/supabase-js'

const PING_TABLE = process.env.SUPABASE_PING_TABLE || 'sarathi_user'

async function runSupabasePing(context: InvocationContext): Promise<{ ok: boolean; message: string; elapsedMs: number }> {
  const start = Date.now()
  context.log('[SupabasePing] Starting...')

  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      const msg = 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured'
      context.error(`[SupabasePing] ${msg}`)
      return { ok: false, message: msg, elapsedMs: Date.now() - start }
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const { data, error } = await supabase.from(PING_TABLE).select('*').limit(1).maybeSingle()
    const elapsed = Date.now() - start

    if (error) {
      context.error(`[SupabasePing] Failed after ${elapsed}ms: ${error.message}`)
      return { ok: false, message: error.message, elapsedMs: elapsed }
    }

    context.log(`[SupabasePing] OK in ${elapsed}ms`)
    return { ok: true, message: data ? 'row found' : 'no row', elapsedMs: elapsed }
  } catch (err) {
    const elapsed = Date.now() - start
    context.error(`[SupabasePing] Error after ${elapsed}ms: ${(err as Error).message}`)
    return { ok: false, message: (err as Error).message, elapsedMs: elapsed }
  }
}

async function supabasePingTimer(timer: Timer, context: InvocationContext): Promise<void> {
  if (timer.isPastDue) context.log('[SupabasePing] Timer past due, catch-up run')
  await runSupabasePing(context)
}

async function supabasePingHttp(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const result = await runSupabasePing(context)
  return { status: result.ok ? 200 : 503, jsonBody: result }
}

app.timer('supabasePing', { schedule: '0 0 */2 * * *', handler: supabasePingTimer })
app.http('supabasePingHttp', { methods: ['GET'], route: 'supabase-ping', handler: supabasePingHttp })
