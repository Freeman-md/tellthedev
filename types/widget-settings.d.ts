export type WidgetFeedbackType = 'bug' | 'idea' | 'other'

export type WidgetSettingsPayload = {
  theme?: 'light' | 'dark' | 'system'
  position?: 'bottom-right' | 'bottom-left'
  allowScreenshot: boolean
  allowEmail: boolean
  defaultTypes: WidgetFeedbackType[]
}


export type WidgetSettings = {
  id: string
  project_id: string
  api_key: string
  environment: 'dev' | 'live'
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}
