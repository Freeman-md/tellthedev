<template>
  <div class="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
    <p class="text-lg font-semibold text-gray-800 mb-2">
      No project selected
    </p>
    <p class="text-sm text-gray-600 mb-4 max-w-md">
      Please select a project from the dropdown to continue.
    </p>
    <UButton to="/dashboard/projects" icon="i-lucide-layout-dashboard">
      Go to Projects
    </UButton>
  </div>
</template>
