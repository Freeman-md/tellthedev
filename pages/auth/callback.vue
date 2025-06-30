<script setup lang="ts">
import { useRouter, useSupabaseClient, useToast } from '#imports'
import { useAuthRedirect } from '@/composables/useAuthRedirect'

const supabase = useSupabaseClient()
const router = useRouter()
const toast = useToast()

onMounted(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')

    if (!code) {
      toast.add({
        title: 'Missing OAuth code',
        color: 'error',
      })
      return router.push('/auth/login')
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      toast.add({
        title: 'OAuth callback failed',
        description: error.message,
        color: 'error',
      })
      return router.push('/auth/login')
    }

    toast.add({
      title: '✅ Signed in successfully',
      description: 'You’ve been logged in via OAuth',
      color: 'success',
    })

    await useAuthRedirect()
  } catch (err: unknown) {
    console.error('OAuth redirect failed:', err)

    toast.add({
      title: 'Unexpected error',
      description: err instanceof Error && err?.message || 'An unknown error occurred.',
      color: 'error',
    })

    return router.push('/auth/login')
  }
})
</script>
