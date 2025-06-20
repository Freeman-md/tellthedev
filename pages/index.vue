<template>
  <div class="p-8">
    <UButton
      color="primary"
      class="text-white px-4 py-2 rounded-lg"
      @click="handleLogout"
    >
      Logout
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { useSupabaseClient, useToast } from '#imports'

const supabase = useSupabaseClient()
const toast = useToast()

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    toast.add({ title: error.message, color: 'error' })
    return
  }

  toast.add({ title: 'You’ve been logged out.' })
  // Optionally redirect
  // navigateTo('/auth/login')
}
</script>
