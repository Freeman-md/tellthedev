<template>
  <div class="relative min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-50">
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 space-y-6">

      <NuxtLink to="/">
        <NuxtImg src="/images/logo.svg" width="150" class="mx-auto mb-4" alt="Logo" />
      </NuxtLink>

      <div class="backdrop-blur-2xl bg-white/90 border border-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-2xl">
        <SharedPageTitle
          title="Let’s Get You Set Up"
          subtitle="Configure your widget and personalize your setup"
        />
        <OnboardingWizard @project-created="handleOnboardingComplete" />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})

const { completeOnboarding } = useProfile()

const handleOnboardingComplete = async () => {
  try {
    await completeOnboarding()
  } catch (err) {
    console.error('Failed to mark onboarding as complete', err)
  }
}

</script>
