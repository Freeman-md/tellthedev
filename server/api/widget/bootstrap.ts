export default defineEventHandler(async (event) => {
  const origin = getHeader(event, 'origin') || 'null'
  setCorsHeaders(event, origin)

  if (event.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  if (event.method !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
  }

  const authHeader = getHeader(event, 'authorization')
  const apiKey = authHeader?.split('Bearer ')[1]?.trim()

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

    console.log(origin)

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
    settings: settings.settings,
  }
})
