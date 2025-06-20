import { defineNuxtRouteMiddleware, useSupabaseUser, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const isResetPassword = to.path === '/auth/reset-password' && to.query.code

  // If not signed in and not in password recovery
  if (!user.value && !isResetPassword) {
    return navigateTo('/auth/login')
  }
})
