<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";
import { computed, ref, useTemplateRef, watch } from "vue";
import ProjectDetailsForm from "./steps/ProjectDetailsForm.vue";
import AllowedOriginsForm from "./steps/AllowedOriginsForm.vue";
import WidgetSettingsForm from "./steps/WidgetSettingsForm.vue";
import InstallInstructions from "./steps/InstallInstructions.vue";
import { useProjects } from "#imports";

const isCreating = ref(false);
const projectCreated = ref<Project | null>(null);

const { addProject } = useProjects();

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
const stepRefs = [ref(), ref(), ref(), ref()];
const stepper = useTemplateRef<UStepperRef>("stepper");

const isLastFormStep = computed(() => activeStep.value === 2);
const isFinalStep = computed(() => activeStep.value === 3);
const showNavButtons = computed(
  () => !projectCreated.value && !isFinalStep.value
);
const showCreateButton = computed(
  () => isLastFormStep.value && !projectCreated.value
);
const showNextButton = computed(() => !isLastFormStep.value);

const handleNext = async () => {
  const current = stepRefs[activeStep.value]?.value;
  const valid = await current?.validate?.();

  if (!valid) return;

  stepper.value?.next();
};

watch(activeStep, async (newStep, oldStep) => {
  if (newStep === 3 && !projectCreated.value) {
    isCreating.value = true;

    try {
      const payload = {
        name: formData.value.project.name,
        slug: formData.value.project.slug,
        description: formData.value.project.description,
        origins: formData.value.origins,
        widget_settings: formData.value.widgetSettings,
      };

      projectCreated.value = await addProject(payload);
    } catch (err) {
      console.error("Failed to create project", err);
      // optionally show toast or error message
    } finally {
      isCreating.value = false;
    }
  }
});
</script>

<template>
  <div class="w-full">
    <pre class="text-xs mt-4 text-gray-500">{{ formData }}</pre>

    <UStepper
      ref="stepper"
      v-model="activeStep"
      disabled
      :items="steps"
      class="w-full space-y-8"
    >
      <template #project-info>
        <div class="aspect-video">
          <ProjectDetailsForm
            :ref="stepRefs[0]"
            v-model="formData"
            :subtitle="'Add details about your project to get started'"
          />
        </div>
      </template>

      <template #allowed-origins>
        <div class="aspect-video">
          <AllowedOriginsForm
            :ref="stepRefs[1]"
            v-model="formData"
            :subtitle="'Specify the domains where your widget is allowed to run'"
          />
        </div>
      </template>

      <template #widget-settings>
        <div class="aspect-video">
          <WidgetSettingsForm
            :ref="stepRefs[2]"
            v-model="formData"
            :subtitle="'Configure your widget appearance and feedback behavior'"
          />
        </div>
      </template>

      <template #finish-setup>
        <div class="aspect-video">
          <InstallInstructions
            v-model="formData"
            :subtitle="'Copy the embed script and launch your widget'"
          />
        </div>
      </template>
    </UStepper>

    <div class="flex gap-2 justify-between mt-4">
      <UButton
        variant="outline"
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev || isCreating"
        @click="stepper?.prev()"
      >
        Prev
      </UButton>

      <UButton
        v-if="showCreateButton"
        variant="solid"
        :loading="isCreating"
        :disabled="isCreating"
        
      >
        {{ isCreating ? "Creating Project..." : "Create Project" }}
      </UButton>

      <UButton
    v-else-if="showNextButton"
    variant="outline"
    trailing-icon="i-lucide-arrow-right"
    :disabled="!stepper?.hasNext"
    @click="handleNext"
  >
    Next
  </UButton>
    </div>
  </div>
</template>
