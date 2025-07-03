import { createClient } from '@supabase/supabase-js'

export const getServerSupabase = () => {
  const config = useRuntimeConfig()
  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey)
}
