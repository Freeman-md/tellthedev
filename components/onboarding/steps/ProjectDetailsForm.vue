<script setup lang="ts">
import { computed } from 'vue'

const modelValue = defineModel<{
  project: {
    name: string
    description: string
    slug: string
  }
}>()

const project = computed(() => modelValue.value!.project)

defineProps<{
    subtitle: string
}>()
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">Project Info</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <UForm :state="project" class="space-y-4 w-full">
      <UFormField label="Project Name" name="name" required>
        <UInput v-model="project.name" class="w-full" />
      </UFormField>

      <UFormField label="Description" name="description" required>
        <UTextarea v-model="project.description" autoresize class="w-full" />
      </UFormField>

      <UFormField label="Slug (optional)" name="slug" description="Leave blank to auto-generate">
        <UInput v-model="project.slug" class="w-full" />
      </UFormField>
    </UForm>
  </div>
</template>
