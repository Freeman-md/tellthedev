<script setup lang="ts">
import type { FormError } from "@nuxt/ui";
import { computed, ref } from "vue";
import { slugify } from "@/shared/utils/string";

const modelValue = defineModel<{
  project: {
    name: string;
    description: string;
    slug: string;
  };
}>();

defineProps<{
  subtitle: string;
}>();

const project = computed(() => modelValue.value!.project);

const formRef = ref();

watch(
  () => project.value.name,
  (newValue) => {
    project.value.slug = slugify(newValue);
  }
);

const validate = async () => {
  const errors: FormError[] = [];

  if (!project.value.name?.trim()) {
    errors.push({ name: "name", message: "Project name is required" });
  }

  if (!project.value.description?.trim()) {
    errors.push({ name: "description", message: "Description is required" });
  }

  formRef.value?.setErrors(errors);

  return errors.length === 0;
};

defineExpose({
  validate,
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">Project Info</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <UForm ref="formRef" :state="project" class="space-y-4 w-full">
      <UFormField label="Project Name" name="name" required>
        <UInput v-model="project.name" class="w-full" />
      </UFormField>

      <UFormField label="Description" name="description" required>
        <UTextarea v-model="project.description" autoresize class="w-full" />
      </UFormField>

      <UFormField label="Slug (auto-generated)" name="slug">
        <UInput v-model="project.slug" class="w-full" readonly />
      </UFormField>
    </UForm>
  </div>
</template>
