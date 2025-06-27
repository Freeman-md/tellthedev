import { defineNuxtRouteMiddleware, useSupabaseUser, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  const isAuthPage = to.path.startsWith('/auth')
  const isResetPassword = to.path === '/auth/reset-password' && to.query.code

  if (user.value && isAuthPage && !isResetPassword) {
    return navigateTo('/dashboard')
  }
})
