<script setup lang="ts">
import { computed, ref } from "vue";
import { navigateTo, useProjects, useToast } from "#imports";
import { useOnboardingStepper } from "@/composables/useOnboardingStepper";
import { useOnboardingForm } from "@/composables/useOnboardingForm";
import OnboardingNavButtons from "./NavButtons.vue";

const isCreating = ref(false);
const projectCreated = ref<Project | null>(null);
const { addProject } = useProjects();
const toast = useToast();

const { formData, resetForm } = useOnboardingForm();

const {
  steps,
  activeStep,
  stepRefs,
  stepper,
  stepperSize,
  isLastFormStep,
  isFinalStep,
  handlePrev,
  handleNext,
} = useOnboardingStepper({ projectCreated });

const showNavButtons = computed(
  () => !projectCreated.value && !isFinalStep.value
);
const showCreateButton = computed(
  () => isLastFormStep.value && !projectCreated.value
);
const showNextButton = computed(() => !isLastFormStep.value);

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

const previewWidget = () => {
  window.open(
    `https://widget-preview.tellthedev.com/${projectCreated.value?.api_key}`,
    "_blank"
  )
}

const resetWizard = () => {
  resetForm();
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
      :size="stepperSize"
    >
      <template #project-info>
        <div class="min-h-[30vh] overflow-auto">
          <OnboardingStepsProjectDetailsForm
            :ref="stepRefs[0]"
            v-model="formData"
            :subtitle="'Add details about your project to get started'"
          />
        </div>
      </template>

      <template #allowed-origins>
        <div class="min-h-[30vh] overflow-auto">
          <OnboardingStepsAllowedOriginsForm
            :ref="stepRefs[1]"
            v-model="formData"
            :subtitle="'Specify the domains where your widget is allowed to run'"
          />
        </div>
      </template>

      <template #widget-settings>
        <div class="min-h-[30vh] overflow-auto">
          <OnboardingStepsWidgetSettingsForm
            :ref="stepRefs[2]"
            v-model="formData"
            :subtitle="'Configure your widget appearance and feedback behavior'"
          />
        </div>
      </template>

      <template #finish-setup>
        <div class="min-h-[30vh] overflow-auto flex flex-col justify-between gap-6">
          <OnboardingStepsInstallationInstructions
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

    <OnboardingNavButtons
      v-if="showNavButtons"
      :is-creating="isCreating"
      :show-create-button="showCreateButton"
      :show-next-button="showNextButton"
      :stepper="stepper"
      @prev="handlePrev"
      @next="handleNext"
      @create="handleCreateProject"
    />
  </div>
</template>
