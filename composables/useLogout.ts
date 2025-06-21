import { useSupabaseClient, useToast, navigateTo } from '#imports'

export const useLogout = () => {
  const supabase = useSupabaseClient()
  const toast = useToast()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.add({ title: error.message, color: 'error' })
      return
    }

    toast.add({ title: 'You’ve been logged out.' })
    navigateTo('/auth/login')
  }

  return { logout }
}
