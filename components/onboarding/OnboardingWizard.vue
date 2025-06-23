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
    slot: "project-info" as const,
    title: "Project Info",
    description: "Name and describe your project",
    icon: "i-lucide-folder-plus",
  },
  {
    slot: "allowed-origins" as const,
    title: "Allowed Origins",
    description: "Add your allowed domain(s)",
    icon: "i-lucide-globe",
  },
  {
    slot: "widget-settings" as const,
    title: "Widget Settings",
    description: "Configure look and behavior",
    icon: "i-lucide-sliders-horizontal",
  },
  {
    slot: "finish-setup" as const,
    title: "Finish Setup",
    description: "Grab install code and preview",
    icon: "i-lucide-check-circle",
  },
]);

const activeStep = ref(0)

const stepper = useTemplateRef<UStepperRef>("stepper");
</script>

<template>
  <div class="w-full">
    <UStepper
      ref="stepper"
      v-model="activeStep"
      :items="steps"
      class="w-full"
    >

    <template #project-info>
      <div class="aspect-video">This is for Project Info</div>
    </template>
    <template #allowed-origins>
      <div class="aspect-video">This is for Allowed Origins</div>
    </template>
    <template #widget-settings>
      <div class="aspect-video">This is for Widget Settings</div>
    </template>
    <template #finish-setup>
      <div class="aspect-video">This is for Finish Setup</div>
    </template>

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
