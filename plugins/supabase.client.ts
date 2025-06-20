import { useSupabaseClient, useRouter, defineNuxtPlugin } from '#imports'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
    const supabase = useSupabaseClient()
    const router = useRouter()

    supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
        console.log('[Auth Change]', event, session)

        if (event === 'SIGNED_IN') {
            router.push('/')
        } else if (event === 'SIGNED_OUT') {
            router.push('/auth/login')
        }
    })
})