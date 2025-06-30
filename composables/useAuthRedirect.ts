export const useAuthRedirect = async () => {
  const user = useSupabaseUser()
  const { getProfile } = useProfile()

  if (!user.value) return navigateTo('/auth/login')

  try {
    const profile = await getProfile()

    if (!profile?.onboarding_complete) {
      return navigateTo('/onboarding')
    }

    return navigateTo('/dashboard')
  } catch (err) {
    console.error('Redirect failed', err)
    return navigateTo('/error')
  }
}
