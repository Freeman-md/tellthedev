<template>
  <div class="flex flex-col md:flex-row h-screen">
    <component :is="sidebarComponent" :is-open="isSidebarOpen" @close="closeSidebar" />

    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/30 z-30 md:hidden transition"
        @click="closeSidebar"
      />
    </Transition>

    <div class="flex flex-col flex-1 overflow-y-auto">
      <SharedDashboardHeader @toggle-sidebar="toggleSidebar" />

      <main class="flex-1 p-6">
        <slot />
      </main>

      <SharedDashboardFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import SharedDashboardSidebar from '@/components/shared/dashboard/Sidebar.vue'
import SharedProjectSidebar from '@/components/shared/project/Sidebar.vue'

const { isSidebarOpen, closeSidebar, toggleSidebar } = useSidebar()


const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isSidebarOpen.value = false
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

watch(isSidebarOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const route = useRoute()

const sidebarComponent = computed(() =>
{
  console.log(route.path, route.path.includes('/dashboard/projects/'))

  return route.path.includes('/dashboard/projects/**')
    ? SharedProjectSidebar
    : SharedDashboardSidebar
}
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
