<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";
import { ref, useTemplateRef } from "vue";
import ProjectDetailsForm from "./steps/ProjectDetailsForm.vue";
import AllowedOriginsForm from "./steps/AllowedOriginsForm.vue";
import WidgetSettingsForm from "./steps/WidgetSettingsForm.vue";

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
    icon: "i-lucide-folder-plus",
  },
  {
    slot: "allowed-origins" as const,
    title: "Allowed Origins",
    icon: "i-lucide-globe",
  },
  {
    slot: "widget-settings" as const,
    title: "Widget Settings",
    icon: "i-lucide-sliders-horizontal",
  },
  {
    slot: "finish-setup" as const,
    title: "Finish Setup",
    icon: "i-lucide-check-circle",
  },
]);

const activeStep = ref(0);

const stepper = useTemplateRef<UStepperRef>("stepper");
</script>

<template>
  <div class="w-full">
    <pre class="text-xs mt-4 text-gray-500">{{ formData }}</pre>

    <UStepper ref="stepper" v-model="activeStep" :items="steps" class="w-full">
      <template #project-info>
        <div class="aspect-video">
          <ProjectDetailsForm
            v-model="formData"
            :subtitle="'Add details about your project to get started'"
          />
        </div>
      </template>

      <template #allowed-origins>
        <div class="aspect-video">
          <AllowedOriginsForm
            v-model="formData"
            :subtitle="'Specify the domains where your widget is allowed to run'"
          />
        </div>
      </template>

      <template #widget-settings>
        <div class="aspect-video">
          <WidgetSettingsForm
            v-model="formData"
            :subtitle="'Configure your widget appearance and feedback behavior'"
          />
        </div>
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
