import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

const STATIC_ALLOWED_ORIGINS = [
  'https://tellthedev.vercel.app',
  'http://127.0.0.1:5500',
]

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const origin = getHeader(event, 'origin') || 'null'
  const isLocal = origin === 'null' || origin.startsWith('http://127.0')
  const isStaticAllowed = STATIC_ALLOWED_ORIGINS.includes(origin)
  const isTestMode = getHeader(event, 'x-test-mode') === 'true' && isLocal

  setCorsHeaders(event, origin)

  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const body = await readBody(event)
  const projectId = body?.projectId

  if (!projectId || typeof projectId !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid projectId' })
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey)

  const { data: project, error } = await supabase
    .from('projects')
    .select('id, origins')
    .eq('id', projectId)
    .maybeSingle()


  if (error) {
    throw createError({ statusCode: 500, statusMessage: 'Database query failed: ' + error.message })
  }

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }

  if (!isTestMode) {
    const dynamicAllowedOrigin = Array.isArray(project.origins) && project.origins.includes(origin)
      ? origin
      : null

    const finalCorsOrigin = isStaticAllowed ? origin : dynamicAllowedOrigin

    if (!finalCorsOrigin) {
      throw createError({ statusCode: 403, statusMessage: 'Origin not allowed here' })
    }
  }

  return { valid: true }
})

const setCorsHeaders = (event: H3Event, origin: string) => {
  setHeader(event, 'Access-Control-Allow-Origin', origin)
  setHeader(event, 'Access-Control-Allow-Methods', 'POST, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'content-type, x-test-mode')
  setHeader(event, 'Vary', 'Origin')
}