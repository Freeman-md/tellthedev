import type { SupabaseClient } from '@supabase/supabase-js'

export class ProfileService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useSupabaseClient()
  }

  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('onboarding_complete')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  }

  async markOnboardingComplete(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .update({ onboarding_complete: true })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
