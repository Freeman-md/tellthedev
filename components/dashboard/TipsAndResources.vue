<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-lightbulb" class="text-yellow-500" />
        <span class="font-semibold">Tips & Resources</span>
      </div>
    </template>

    <ul class="space-y-2 text-sm">
      <li>✅ Embed the widget in your site</li>
      <li>🎨 Customize widget branding</li>
      <li>
        📘
        <NuxtLink to="/docs" class="hover:underline text-primary"
          >View docs →</NuxtLink
        >
      </li>
    </ul>
  </UCard>
</template>
