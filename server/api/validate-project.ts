export default defineEventHandler(async (event) => {
  const origin = getHeader(event, 'origin') || 'null'
  setCorsHeaders(event, origin)

  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const body = await readBody(event)
  const projectId = body?.projectId

  if (!projectId || typeof projectId !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid projectId' })
  }

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(projectId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid UUID format' })
  }

  const supabase = getServerSupabase()
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

  const isOriginAllowed =
    Array.isArray(project.origins) && project.origins.includes(origin)

  if (!isOriginAllowed) {
    console.warn(`[Reject] Origin not allowed: ${origin} for project ${projectId}`)
    throw createError({ statusCode: 403, statusMessage: 'Origin not allowed here' })
  }

  return { valid: true }
})