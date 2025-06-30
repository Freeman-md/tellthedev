export default defineNuxtRouteMiddleware((to) => {
  if (process.env.NODE_ENV !== 'production') return
  if (to.path !== '/') {
    return navigateTo('/', { replace: true })
  }
}) 