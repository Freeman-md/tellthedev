<script setup lang="ts">
import { useProjects } from '~/composables/useProjects';

const { projects, pending } = useProjects();
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Projects</h1>
      <UButton to="/dashboard/projects/new" icon="i-lucide-plus">New Project</UButton>
    </div>

    <div v-if="pending">
      <p class="text-gray-400">Loading projects...</p>
    </div>

    <div v-else-if="projects?.length">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500 mb-4">You haven’t created any projects yet.</p>
      <UButton to="/dashboard/projects/new" icon="i-lucide-plus">Create Project</UButton>
    </div>
  </div>
</template>
