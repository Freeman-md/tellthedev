<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";
import { computed, ref, useTemplateRef } from "vue";
import ProjectDetailsForm from "./steps/ProjectDetailsForm.vue";
import AllowedOriginsForm from "./steps/AllowedOriginsForm.vue";
import WidgetSettingsForm from "./steps/WidgetSettingsForm.vue";
import InstallationInstructions from "./steps/InstallationInstructions.vue";
import { navigateTo, useProjects, useToast } from "#imports";

const isCreating = ref(false);
const projectCreated = ref<Project | null>(null);

const { addProject } = useProjects();

const toast = useToast();

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

const handlePrev = () => {
  if (projectCreated.value || isFinalStep.value) return;
  stepper.value?.prev();
};

const handleNext = async () => {
  if (projectCreated.value || isFinalStep.value) return;

  const current = stepRefs[activeStep.value]?.value;
  const valid = await current?.validate?.();

  if (!valid) return;

  stepper.value?.next();
};

const handleCreateProject = async () => {
  if (projectCreated.value || isFinalStep.value) return;

  const current = stepRefs[activeStep.value]?.value;
  const valid = await current?.validate?.();

  if (!valid) return;

  isCreating.value = true;

  const payload = {
    name: formData.value.project.name,
    slug: formData.value.project.slug,
    description: formData.value.project.description,
    origins: formData.value.origins,
    widget_settings: formData.value.widgetSettings,
  };

  try {
    const result = await addProject(payload);
    projectCreated.value = result;

    stepper.value?.next();

    toast.add({
      title: "Project created!",
      description: "Your project is ready — you can now embed the widget 🚀",
      icon: "i-lucide-check-circle",
      color: "success",
      actions: [
        {
          label: "Go to Project Dashboard",
          onClick: (e) => {
            e?.stopPropagation();

            navigateTo(`/projects/${result.slug}`);
          },
        },
      ],
    });
  } catch (err: unknown) {
    const errorMessage = (err as { message?: string })?.message;
    const isUniqueViolation =
      typeof errorMessage === "string" &&
      errorMessage.includes("duplicate key");

    if (isUniqueViolation) {
      toast.add({
        title: "Project name already exists",
        description: "Please choose a different name or slug.",
        color: "warning",
      });

      activeStep.value = 0;
      return;
    }

    toast.add({
      title: "Failed to create project",
      description:
        "Something went wrong. Please try again or contact support if this continues.",
      icon: "i-lucide-alert-triangle",
      color: "error",
      actions: [
        {
          icon: "i-lucide-refresh-cw",
          label: "Retry",
          color: "neutral",
          variant: "outline",
          onClick: () => handleCreateProject(),
        },
      ],
    });
  } finally {
    isCreating.value = false;
  }
};

const previewWidget = () =>
  window.open(
    `https://widget-preview.tellthedev.com/${projectCreated.value?.api_key}`,
    "_blank"
  );

const resetWizard = () => {
  formData.value = {
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
  };

  projectCreated.value = null;
  activeStep.value = 0;

  stepRefs.forEach((ref) => ref.value?.reset?.());
};
</script>

<template>
  <div class="w-full">
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
        <div class="aspect-video flex flex-col justify-between gap-6">
          <InstallationInstructions
            :project="{
              slug: projectCreated?.slug!,
              api_key: projectCreated?.api_key!,
            }"
            :subtitle="'Copy the embed script and launch your widget'"
          />

          <div class="flex justify-between gap-2 mt-4">
            <UButton
              variant="outline"
              icon="i-lucide-arrow-left"
              @click="resetWizard"
            >
              Create Another Project
            </UButton>

            <UButton
              icon="i-lucide-external-link"
              @click="navigateTo(`/projects/${projectCreated?.slug}`)"
            >
              Go to Project Dashboard
            </UButton>

            <UButton variant="solid" icon="i-lucide-eye" @click="previewWidget">
              Preview Widget
            </UButton>
          </div>
        </div>
      </template>
    </UStepper>

    <div v-if="showNavButtons" class="flex gap-2 justify-between mt-4">
      <UButton
        variant="outline"
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev || isCreating"
        @click="handlePrev"
      >
        Prev
      </UButton>

      <UButton
        v-if="showCreateButton"
        variant="solid"
        :loading="isCreating"
        :disabled="isCreating"
        @click="handleCreateProject"
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
