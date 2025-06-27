import { useAsyncData, useState, useSupabaseUser } from '#imports'
import { ProjectService } from '@/services/project-service'

export const useProjects = () => {
  const user = useSupabaseUser()
  const service = new ProjectService()
  const activeProject = useState<string>('active-project');
  const projects = useState<Project[]>('projects', () => [])

  const {
    pending: isFetchingUserProjects,
    execute: fetchUserProjects,
    refresh: refreshUserProjects,
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

  const projectNames = computed(() => {
    return projects.value.map(project => project.name)
  })

  watch(activeProject, (newValue) => {
  if (newValue) {
    const selected = projects.value.find(p => p.name === newValue)
    if (selected) {
      navigateTo(`/dashboard/projects/${selected.slug}`)
    }
  }
})



  return {
    projects,
    projectNames,
    isFetchingUserProjects,
    fetchUserProjects,
    refreshUserProjects,
    fetchUserProjectsError,
    fetchUserProjectsStatus,
    addProject,
    activeProject,
  }
}
