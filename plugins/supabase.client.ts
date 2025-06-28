import { useSupabaseClient, defineNuxtPlugin } from '#imports'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient()

  supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
    // console.log('[Auth Change]', event, session)

    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    const isPasswordResetFlow = url.pathname === '/auth/reset-password' && code

    if (event === 'SIGNED_IN') {
      if (isPasswordResetFlow) {
        // console.log('[Password Recovery Flow Detected] Skipping redirect')
        return
      }
    }

    if (event === 'SIGNED_OUT') {
      // console.log('signed out')
    }
  })
})
