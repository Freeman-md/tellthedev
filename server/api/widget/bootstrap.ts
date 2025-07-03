export default defineEventHandler(async (event) => {
  const origin = getHeader(event, 'origin') || 'null'
  setCorsHeaders(event, origin)

  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const { apiKey } = await readBody(event)

  if (!apiKey || typeof apiKey !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid API key' })
  }

  const environment = apiKey.startsWith('td_live_') ? 'live'
                    : apiKey.startsWith('td_dev_')  ? 'dev'
                    : null

  if (!environment) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid API key format' })
  }

  const supabase = getServerSupabase()

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('id, origins')
    .eq(`api_key_${environment}`, apiKey)
    .maybeSingle()

  if (projectError || !project) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid API key' })
  }

  validateOrigin(origin, project)

  const { data: settings, error: settingsError } = await supabase
    .from('widget_settings')
    .select('settings')
    .eq('api_key', apiKey)
    .maybeSingle()

  if (settingsError || !settings) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to load widget settings' })
  }

  return {
    valid: true,
    environment,
    projectId: project.id,
    settings: settings.settings,
  }
})
