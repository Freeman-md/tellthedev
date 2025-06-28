import { useAsyncData, useState, useSupabaseUser } from '#imports'
import { ProjectService } from '@/services/project-service'

export const useProjects = () => {
  const projects = useState<Project[]>('projects', () => [])
  const route = useRoute()
  const user = useSupabaseUser()
  const service = new ProjectService()
  const projectSlug = computed<string>({
  get: () => decodeURIComponent(route.params?.slug as string),
  set: (newSlug) => {
    if (!newSlug) return
    navigateTo(`/dashboard/projects/${newSlug}`)
  }
})


  const projectOptions = computed(() => {
    const options = projects.value.map(project => ({
      label: project.name,
      value: project.slug
    }))

    const invalidOption = {
      label: 'TellTheDev',
      value: 'invalid-project'
    }

    return import.meta.dev ? [...options, invalidOption] : options
  })

  const currentProject = computed(() =>
    projects.value.find(project => project.slug === projectSlug.value)
  )


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


  return {
    projects,
    currentProject,
    projectSlug,
    projectOptions,
    isFetchingUserProjects,
    fetchUserProjects,
    refreshUserProjects,
    fetchUserProjectsError,
    fetchUserProjectsStatus,
    addProject,
  }
}
