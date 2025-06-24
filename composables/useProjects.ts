import { useAsyncData, useState, useSupabaseUser } from '#imports'
import type { CreateProjectPayload } from '@/types/project'
import { ProjectService } from '~/services/project-service'

export const useProjects = () => {
  const user = useSupabaseUser()
  const service = new ProjectService()
  const projects = useState<Project[]>('projects', () => [])

  const {
    pending: isFetchingUserProjects,
    execute: fetchUserProjects,
    status: fetchUserProjectsStatus,
    error: fetchUserProjectsError,
  } = useAsyncData('user-projects', async () => {
    if (!user.value) throw new Error('User not authenticated')

    projects.value = await service.fetchUserProjects(user.value.id)

  }, {
    immediate: false,
  })

  const addProject = async (payload: CreateProjectPayload) => {
    if (!user.value) throw new Error('User not authenticated')

    return await service.createProject({
      ...payload,
      user_id: user.value.id,
    })
  }


  return {
    projects,
    isFetchingUserProjects,
    fetchUserProjects,
    fetchUserProjectsError,
    fetchUserProjectsStatus,
    addProject,
  }
}
