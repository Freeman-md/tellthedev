<script setup lang="ts">
import { useSupabaseClient, useRouter, onMounted } from '#imports'

const supabase = useSupabaseClient()
const router = useRouter()

onMounted(async () => {
  const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)

  if (error) {
    console.error('OAuth callback error:', error.message)
    return router.push('/auth/login')
  }

  router.push('/')
})
</script>

<template>
  <div class="text-center py-10">Signing you in...</div>
</template>
