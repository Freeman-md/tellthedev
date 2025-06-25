<template>
  <aside
    :class="[
      'bg-white border-r border-gray-200 w-auto max-md:min-w-1/2 md:w-1/4 h-full md:h-screen fixed md:relative z-40 transition-transform duration-300 ease-in-out',
      isSidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
    ]"
  >
    <div class="h-full flex flex-col p-4 -space-y-4">
      <NuxtLink to="/" class="text-xl font-bold md:block hidden">
        <NuxtImg
          src="/images/logo.svg"
          width="120"
          class="mb-10 mt-1"
          alt="Logo"
        />
      </NuxtLink>

      <div
        v-if="projects?.length"
        class="flex items-center justify-between md:hidden mb-4 space-x-4"
      >
        <USelectMenu
          v-model="activeProject!"
          :items="projects"
          :content="{ align: 'start' }"
          placeholder="Select project"
          class="w-full"
        />
        <UButton variant="ghost" color="neutral" @click="handleCloseSidebar">
          <UIcon name="i-lucide-x" size="22" />
        </UButton>
      </div>

      <UNavigationMenu
        orientation="vertical"
        :items="navigationItems"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  navigationItems: NavigationMenuItem[][];
  showProjectSelect?: boolean;
  projects?: string[];
}>();

const { isSidebarOpen, closeSidebar } = useSidebar()

const { activeProject } = useProjects()

const handleCloseSidebar = () => {
  closeSidebar()
}
</script>
