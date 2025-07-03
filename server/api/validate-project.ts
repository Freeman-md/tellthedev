export default defineEventHandler(async (event) => {
  const origin = getHeader(event, 'origin') || 'null'
  setCorsHeaders(event, origin)

  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const body = await readBody(event)
  const projectId = body?.projectId


  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  if (!projectId || typeof projectId !== 'string' || !uuidRegex.test(projectId)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid projectId' })
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

  validateOrigin(origin, project)

  return { valid: true }
})