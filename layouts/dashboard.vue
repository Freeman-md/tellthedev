<template>
  <div class="flex flex-col md:flex-row h-screen">
    <component
      :is="sidebarComponent"
      :is-open="isSidebarOpen"
      @close="closeSidebar"
    />

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
        <component :is="shouldShowGuard ? UiSelectProjectGuard : 'div'">
          <slot v-if="!shouldShowGuard" />
        </component>
      </main>

      <SharedDashboardFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSidebar } from "@/composables/useSidebar";
import { useProjects } from "@/composables/useProjects";

import SharedDashboardSidebar from "@/components/shared/dashboard/Sidebar.vue";
import SharedProjectSidebar from "@/components/shared/project/Sidebar.vue";
import UiSelectProjectGuard from "@/components/ui/SelectProjectGuard.vue";

const { isSidebarOpen, closeSidebar, toggleSidebar } = useSidebar();
const { activeProject } = useProjects();

const route = useRoute();

const isProjectRoute = computed(() =>
  route.path.startsWith("/dashboard/projects/")
);

const shouldShowGuard = computed(
  () => isProjectRoute.value && !activeProject.value
);

const sidebarComponent = computed(() =>
  isProjectRoute.value ? SharedProjectSidebar : SharedDashboardSidebar
);

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") isSidebarOpen.value = false;
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

watch(isSidebarOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});
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
