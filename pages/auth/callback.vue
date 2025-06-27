<script setup lang="ts">
// const supabase = useSupabaseClient()
const router = useRouter()

onMounted(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')

    // if (!code) {
    //   throw createError({ statusMessage: 'Missing or invalid OAuth code', fatal: true })
    // }

    console.log(code)

    // const { error } = await supabase.auth.exchangeCodeForSession(code)

    // if (error) {
    //   console.error('OAuth callback failed:', error.message)
    //   showError({ statusCode: 401, statusMessage: 'Authentication failed' })
    //   return router.push('/auth/login')
    // }

    router.push('/dashboard')
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Unhandled error during sign-in:', err.message || err)
    }

    router.push('/auth/login')
  }
})
</script>

<template>
  <div class="text-center py-10">Signing you in...</div>
</template>
