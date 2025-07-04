import { useAsyncData, useState, useSupabaseUser } from '#imports'
import { ProjectService } from '@/services/project-service'
import { WidgetSettingsService } from '@/services/widget-settings-service'
import type { WidgetSettingsPayload } from '@/types/widget-settings'

export const useProjects = () => {
  const projects = useState<Project[]>('projects', () => [])
  const route = useRoute()
  const user = useSupabaseUser()
  const projectService = new ProjectService()
  const widgetSettingsService = new WidgetSettingsService()
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

    return import.meta.dev ? [...options] : options
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

    projects.value = await projectService.fetchUserProjects(user.value.id)

  }, {
    immediate: false,
  })

  const createProject = async (payload: CreateProjectPayload, widgetSettings: WidgetSettingsPayload) => {
    if (!user.value) throw new Error('User not authenticated')

    const project = await projectService.createProject({
      ...payload,
      user_id: user.value.id,
    })

    await widgetSettingsService.createForProject(project, widgetSettings)

    return project
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
    createProject,
  }
}
