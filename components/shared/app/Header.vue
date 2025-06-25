<template>
  <section class="h-16 border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <button
        class="md:hidden text-gray-700 hover:text-black focus:outline-none cursor-pointer mt-3"
        @click="toggleSidebar"
      >
        <span class="sr-only">Toggle sidebar</span>
        <UIcon name="cil:hamburger-menu" size="25" />
      </button>

      <NuxtLink to="/" class="text-xl font-bold md:hidden">
        <NuxtImg src="/images/logo.svg" width="120" alt="Logo" class="mt-1" />
      </NuxtLink>

      <USelectMenu
        v-model="selectedProject"
        :items="projects"
        class="w-40 hidden md:block"
      />
    </div>

    <div class="flex space-x-2 items-center">
      <UButton
        icon="i-lucide-book"
        variant="outline"
        color="neutral"
        to="https://docs.tellthedev.vercel.app"
        target="_blank"
        trailing-icon="i-lucide:arrow-up-right"
      >
        Docs
      </UButton>

      <UDropdownMenu :items="dropdownItems">
        <UAvatar alt="User Name" aria-setsize="md" />
      </UDropdownMenu>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLogout } from '#imports'
import type { DropdownMenuItem } from '@nuxt/ui'
import { ref } from 'vue'

const { logout } = useLogout()
const projects = ref(["TellTheDev", "Freemancodz", "FileTidy"])
const selectedProject = ref("TellTheDev")

const { toggleSidebar } = useSidebar()

const dropdownItems = [
  {
    label: 'Profile',
    icon: 'i-lucide-user-circle'
  },
  {
    label: 'Logout',
    icon: 'material-symbols:logout-rounded',
    color: 'primary',
    onSelect: logout
  }
] satisfies DropdownMenuItem[]
</script>
