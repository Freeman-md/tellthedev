<template>
  <UButton
    icon="devicon:google"
    color="neutral"
    class="w-full justify-center border border-gray-200 cursor-pointer py-2"
    :loading="loading"
    @click="signInWithGoogle"
  >
    Continue with Google
  </UButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSupabaseClient, useToast } from '#imports'

const loading = ref(false)
const supabase = useSupabaseClient()
const toast = useToast()

const signInWithGoogle = async () => {
  loading.value = true

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    toast.add({ title: '❌ Google sign-in failed', description: error.message, color: 'error' })
  }

  loading.value = false
}
</script>
