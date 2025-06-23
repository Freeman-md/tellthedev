<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";
import { ref, useTemplateRef } from "vue";

const formData = ref({
  project: {
    name: "",
    description: "",
    slug: "",
  },
  origins: [],
  widgetSettings: {
    theme: "system",
    position: "bottom-right",
    allowScreenshot: true,
    allowEmail: false,
    defaultTypes: ["bug", "idea"],
  },
});

const steps = ref<StepperItem[]>([
  {
    title: "Project Info",
    description: "Name and describe your project",
    icon: "i-lucide-folder-plus",
  },
  {
    title: "Allowed Origins",
    description: "Add your allowed domain(s)",
    icon: "i-lucide-globe",
  },
  {
    title: "Widget Settings",
    description: "Configure look and behavior",
    icon: "i-lucide-sliders-horizontal",
  },
  {
    title: "Finish Setup",
    description: "Grab install code and preview",
    icon: "i-lucide-check-circle",
  },
]);

const activeStep = ref(0)

const stepper = useTemplateRef<{
    hasNext: boolean,
    hasPrev: boolean,
    next: () => void,
    prev: () => void
}>("stepper");
</script>

<template>
  <div class="w-full">
    <UStepper
      ref="stepper"
      v-model="activeStep"
      :items="steps"
      class="w-full"
    >
    </UStepper>

    <div class="flex gap-2 justify-between mt-4">
      <UButton
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev"
        @click="stepper?.prev()"
      >
        Prev
      </UButton>

      <UButton
        trailing-icon="i-lucide-arrow-right"
        :disabled="!stepper?.hasNext"
        @click="stepper?.next()"
      >
        Next
      </UButton>
    </div>
  </div>
</template>
