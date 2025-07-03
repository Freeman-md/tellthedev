// export default defineNuxtRouteMiddleware((to) => {
//   const user = useSupabaseUser()

//   const isResetFlow = to.path === '/auth/reset-password' && !!to.query.code

//   if (isResetFlow && !user.value) {
//     return navigateTo('/auth/login')
//   }
// })
