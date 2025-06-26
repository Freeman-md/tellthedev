<script setup lang="ts">
import { defineShortcuts } from "#imports";
import { onMounted, ref, type ComponentPublicInstance } from "vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import ErrorState from "~/components/ui/ErrorState.vue";
import LoadingSpinner from "~/components/ui/LoadingSpinner.vue";
import { useProjects } from "~/composables/useProjects";

const inputRef = ref<ComponentPublicInstance | null>(null)

defineShortcuts({
  "/": () => {
    const inputEl = inputRef.value?.$el?.querySelector('input') as HTMLInputElement | null;
    inputEl?.focus();
  },
});

const {
  projects,
  isFetchingUserProjects,
  fetchUserProjects,
  fetchUserProjectsError,
} = useProjects();

const reloadPage = () => {
  window.location.reload();
};

onMounted(() => {
  fetchUserProjects();
});
</script>

<template>
  <div>
    <div class="flex space-x-4 items-center mb-6">
      <UButton to="/dashboard/new-project" icon="i-lucide-plus">New Project</UButton>

      <UInput ref="inputRef" icon="i-lucide-search" placeholder="Search...">
        <template #trailing>
          <UKbd value="/" />
        </template>
      </UInput>
    </div>

    <LoadingSpinner
      v-if="isFetchingUserProjects"
      message="Loading your projects..."
    />

    <ErrorState
      v-else-if="!isFetchingUserProjects && fetchUserProjectsError"
      message="Something went wrong while loading projects."
    >
      <UButton icon="i-lucide-refresh-ccw" @click="reloadPage"
        >Try Again</UButton
      >
    </ErrorState>

    <div v-else-if="projects?.length">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>

    <EmptyState v-else message="You haven’t created any projects yet.">
      <UButton to="/projects/create" icon="i-lucide-plus"
        >Create Project</UButton
      >
    </EmptyState>
  </div>
</template>
