<template>
  <UCard>
    
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-flash" class="text-primary" />
        <span class="font-semibold">Quick Actions</span>
      </div>
    </template>

    <ul class="space-y-2">
      <li>
        <NuxtLink
          to="/projects/new"
          class="text-sm hover:underline flex items-center gap-2"
        >
          <UIcon name="i-lucide-plus-circle" class="text-muted-foreground" />
          + New Project
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/feedback"
          class="text-sm hover:underline flex items-center gap-2"
        >
          <UIcon name="i-lucide-message-square" class="text-muted-foreground" />
          View All Feedback
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/widget/settings"
          class="text-sm hover:underline flex items-center gap-2"
        >
          <UIcon name="i-lucide-settings" class="text-muted-foreground" />
          Widget Settings
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/analytics"
          class="text-sm hover:underline flex items-center gap-2"
        >
          <UIcon name="i-lucide-bar-chart" class="text-muted-foreground" />
          Check Analytics
        </NuxtLink>
      </li>
    </ul>
  </UCard>
</template>
