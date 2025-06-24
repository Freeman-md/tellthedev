// composables/useProjects.ts
import { ref } from 'vue'
import { useSupabaseUser } from '#imports'
import type { Project } from '@/types/project'
import { ProjectService } from '~/services/project-service'

export const useProjects = () => {
  const user = useSupabaseUser()
  const service = new ProjectService()

  const projects = ref<Project[]>([])
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const load = async () => {
    if (!user.value) return
    pending.value = true
    try {
      projects.value = await service.fetchUserProjects(user.value.id)
    } catch (err) {
      error.value = err as Error
    } finally {
      pending.value = false
    }
  }

  const addProject = async (payload: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    return await service.createProject(payload)
  }

  return {
    projects,
    pending,
    error,
    load,
    addProject,
  }
}
