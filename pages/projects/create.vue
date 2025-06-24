<template>
  <div>
    <SharedPageHeader
      title="Create a New Project"
      subtitle="Set up your widget, customize appearance, and configure allowed domains"
    />

    <OnboardingWizard />
  </div>
</template>

<script setup lang="ts">
import OnboardingWizard from "~/components/onboarding/OnboardingWizard.vue";
</script>
