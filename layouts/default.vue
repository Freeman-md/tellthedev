<template>
  <div class="flex flex-col md:flex-row h-screen">
    <SharedAppSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/30 z-30 md:hidden transition"
        @click="isSidebarOpen = false"
      />
    </Transition>

    <div class="flex flex-col flex-1 overflow-y-auto">
      <SharedAppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

      <main class="flex-1 p-6">
        <slot />
      </main>

      <SharedAppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isSidebarOpen = ref(false)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isSidebarOpen.value = false
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

watch(isSidebarOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
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
