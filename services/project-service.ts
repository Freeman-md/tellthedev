import type { SupabaseClient } from '@supabase/supabase-js'
import type { Project } from '@/types/project'
import { useSupabaseClient } from '#imports'

export class ProjectService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useSupabaseClient()
  }

  async fetchUserProjects(userId: string): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  }

  async createProject(payload: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const { data, error } = await this.supabase
      .from('projects')
      .insert(payload)
      .select()
      .single()

    if (error) throw error
    return data as Project
  }
}
