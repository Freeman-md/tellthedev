export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  const isProtected = ['/dashboard', '/onboarding'].some(path =>
    to.path.startsWith(path)
  )

  if (isProtected && !user.value) {
    return navigateTo('/auth/login')
  }
})
