export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const { getProfile } = useProfile()

  if (!user.value) return

  const isDashboard = to.path.startsWith('/dashboard')
  const isOnboarding = to.path === '/onboarding'

  try {
    const profile = await getProfile()

    if (!profile?.onboarding_complete && isDashboard) {
      return navigateTo('/onboarding')
    }

    if (profile?.onboarding_complete && isOnboarding) {
      return navigateTo('/dashboard')
    }
  } catch (err) {
    console.error('Onboarding check failed:', err)
    return navigateTo('/error')
  }
})
