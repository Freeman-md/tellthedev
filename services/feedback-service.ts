import type { SupabaseClient } from '@supabase/supabase-js'
import type { FeedbackEntry } from '@/types/feedback'
import { useSupabaseClient } from '#imports'

export class FeedbackService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useSupabaseClient()
  }

  async fetchFeedbackForProject(projectId: string): Promise<FeedbackEntry[]> {
    const { data, error } = await this.supabase
      .from('feedback')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as FeedbackEntry[]
  }
}
