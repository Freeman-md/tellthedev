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

  async getFeedbackById(id: string): Promise<FeedbackEntry> {
    const { data, error } = await this.supabase
      .from('feedback')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as FeedbackEntry
  }

  async getTimelineForFeedback(feedbackId: string): Promise<FeedbackTimelineEntry[]> {
    const { data, error } = await this.supabase
      .from('feedback_timeline')
      .select('*')
      .eq('feedback_id', feedbackId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data as FeedbackTimelineEntry[]
  }

  async getReplyTemplatesForProject(projectId: string): Promise<FeedbackReplyTemplate[]> {
    const { data, error } = await this.supabase
      .from('feedback_reply_templates')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as FeedbackReplyTemplate[]
  }
}
