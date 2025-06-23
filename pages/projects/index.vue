<script setup lang="ts">
import EmptyState from '~/components/ui/EmptyState.vue';
import ErrorState from '~/components/ui/ErrorState.vue';
import LoadingSpinner from '~/components/ui/LoadingSpinner.vue';
import { useProjects } from '~/composables/useProjects';

const { projects, pending, error } = useProjects();

const reloadPage = () => {
  window.location.reload();
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Projects</h1>
      <UButton to="/dashboard/projects/new" icon="i-lucide-plus">New Project</UButton>
    </div>

    <LoadingSpinner v-if="pending" message="Loading your projects..." />

    <ErrorState v-else-if="error" message="Something went wrong while loading projects.">
      <UButton @click="reloadPage" icon="i-lucide-refresh-ccw">Try Again</UButton>
    </ErrorState>

    <div v-else-if="projects?.length">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>

    <EmptyState v-else message="You haven’t created any projects yet.">
      <UButton to="/dashboard/projects/new" icon="i-lucide-plus">Create Project</UButton>
    </EmptyState>
  </div>
</template>
