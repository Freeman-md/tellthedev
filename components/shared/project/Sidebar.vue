<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = route.params.id as string

const navigationItems: NavigationMenuItem[][] = [
  [
    {
      label: "Project",
      type: "label",
    },
    {
      label: "Overview",
      icon: "i-lucide-layout-dashboard",
      to: `/dashboard/projects/${projectId}/overview`,
    },
    {
      label: "Feedback",
      icon: "i-lucide-message-circle",
      to: `/dashboard/projects/${projectId}/feedback`,
    },
    {
      label: "Analytics",
      icon: "i-lucide-pie-chart",
      to: `/dashboard/projects/${projectId}/analytics`,
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      children: [
        {
          label: "Widget Settings",
          icon: "i-lucide-sliders-horizontal",
          to: `/dashboard/projects/${projectId}/widget-settings`,
        },
        {
          label: "Allowed Origins",
          icon: "i-lucide-globe",
          to: `/dashboard/projects/${projectId}/origins`,
        },
        {
          label: "API Keys",
          icon: "i-lucide-key-round",
          to: `/dashboard/projects/${projectId}/api-keys`,
          badge: "soon",
          active: false,
        },
        {
          label: "Branding",
          icon: "i-lucide-paintbrush",
          to: `/dashboard/projects/${projectId}/branding`,
          badge: "soon",
          active: false,
        },
      ],
    },
  ],
]
</script>

<template>
  <UiSidebar
    :navigation-items="navigationItems"
    :show-project-select="true"
    :projects="['TellTheDev', 'Freemancodz', 'FileTidy']"
    selected-project="TellTheDev"
  />
</template>
