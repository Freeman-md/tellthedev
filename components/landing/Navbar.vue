<script setup lang="ts">
import { useSupabaseUser } from '#imports'
import { useLogout } from '@/composables/useLogout'

const user = useSupabaseUser()
const { logout } = useLogout()
</script>

<template>
  <nav class="w-full sticky top-0 z-30 bg-white/90 backdrop-blur shadow">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <NuxtImg src="/images/logo.svg" alt="TellTheDev Logo" width="140" />
      </NuxtLink>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <template v-if="user">
          <UButton to="/dashboard">Dashboard</UButton>
          <UButton variant="outline" class="font-semibold" @click="logout">Log Out</UButton>
        </template>
        <template v-else>
          <UButton to="/auth/login" variant="outline">Log In</UButton>
          <UButton to="/auth/register" class="font-semibold">Get Started</UButton>
        </template>
      </div>
    </div>
  </nav>
</template>
