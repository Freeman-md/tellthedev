import { readBody, getHeader, createError } from 'h3'
import type { FeedbackType } from '~/types/feedback'
import { getServerSupabase } from '~/server/utils/supabase'

// Allowed feedback types
const allowedTypes: FeedbackType[] = ['bug', 'idea', 'praise', 'comment', 'other']

export default defineEventHandler(async (event) => {
  const origin = getHeader(event, 'origin') || 'null'
  setCorsHeaders(event, origin)

  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  // Extract API Key from Authorization header
  const authHeader = getHeader(event, 'authorization')
  const apiKey = authHeader?.split('Bearer ')[1]?.trim()

  if (!apiKey) {
    throw createError({ statusCode: 401, statusMessage: 'Missing API key' })
  }

  const body = await readBody(event)
  const { type, content, email, screenshot_url, device_info, referrer_url } = body

  // Validation
  const errors: Record<string, string> = {}

  if (!allowedTypes.includes(type)) {
    errors.type = 'Invalid feedback type'
  }

  if (!content || content.trim().length < 5) {
    errors.content = 'Content is too short'
  }

  if (Object.keys(errors).length > 0) {
    throw createError({ statusCode: 400, statusMessage: 'Validation failed', data: errors })
  }

  const supabase = getServerSupabase()

  // Get project by matching either dev or live API key
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('id, origins, api_key_dev, api_key_live')
    .or(`api_key_dev.eq.${apiKey},api_key_live.eq.${apiKey}`)
    .maybeSingle()

  if (projectError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch project', data: projectError.message })
  }

  if (!project) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid API key' })
  }

  // Determine environment
  const environment = apiKey === project.api_key_live ? 'live' : 'dev'

  // Check origin
  validateOrigin(origin, project)

  // Save feedback
  const { error: insertError } = await supabase.from('feedback').insert({
    project_id: project.id,
    type,
    content,
    environment,
    email: email ?? null,
    screenshot_url: screenshot_url ?? null,
    device_info: device_info ?? null,
    referrer_url: referrer_url ?? null,
  })

  if (insertError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to save feedback', data: insertError.message })
  }

  return {
    message: 'Feedback submitted successfully',
  }
})
