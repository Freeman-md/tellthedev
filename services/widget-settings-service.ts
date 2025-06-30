import type { SupabaseClient } from '@supabase/supabase-js'

export class WidgetSettingsService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useSupabaseClient()
  }

  async createDefaultSettings(projectId: string, apiKey: string, environment: 'dev' | 'live', settings: WidgetSettingsPayload): Promise<WidgetSettings> {
    const { data, error } = await this.supabase
      .from('widget_settings')
      .insert({
        project_id: projectId,
        api_key: apiKey,
        environment,
        settings
      })
      .select()
      .single()

    if (error) throw error
    return data as WidgetSettings
  }

  async createForProject(project: {
    id: string
    api_key_dev: string
    api_key_live: string
  },
  settings: WidgetSettingsPayload
) : Promise<{ dev: WidgetSettings, live: WidgetSettings }> {
    const [dev, live] = await Promise.all([
      this.createDefaultSettings(project.id, project.api_key_dev, 'dev', settings),
      this.createDefaultSettings(project.id, project.api_key_live, 'live', settings)
    ])

    return { dev, live }
  }
}
