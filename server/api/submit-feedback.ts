import { readBody, getHeader, createError } from 'h3'
import type { FeedbackType } from '~/types/feedback'
import { getServerSupabase } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const origin = getHeader(event, 'origin') || 'null'
  setCorsHeaders(event, origin)

  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const body = await readBody(event)

  const { projectId, type, content } = body
  const errors: Record<string, string> = {}

  const allowedTypes: FeedbackType[] = ['bug', 'idea', 'praise', 'comment', 'other']
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  if (!uuidRegex.test(projectId)) {
    errors.projectId = 'Invalid or missing projectId'
  }

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
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('id, origins')
    .eq('id', projectId)
    .maybeSingle()

  if (projectError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch project', data: projectError.message })
  }

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }

  validateOrigin(origin, project)

  const { error: insertError } = await supabase
    .from('feedback')
    .insert({
      project_id: projectId,
      type,
      content,
      screenshot_url: null,
    })

  if (insertError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to save feedback', data: insertError.message })
  }

  return {
    message: 'Feedback submitted successfully',
  }
})
