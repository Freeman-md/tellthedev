<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { projectSlug } = useProjects()

const navigationItems: NavigationMenuItem[][] = [
  [
    {
      label: "Project",
      type: "label",
    },
    {
      label: "Overview",
      icon: "i-lucide-layout-dashboard",
      to: `/dashboard/projects/${projectSlug.value}`,
    },
    {
      label: "Feedback",
      icon: "i-lucide-message-circle",
      to: `/dashboard/projects/${projectSlug.value}/feedback`,
    },
    {
      label: "Analytics",
      icon: "i-lucide-pie-chart",
      to: `/dashboard/projects/${projectSlug.value}/analytics`,
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      children: [
        {
          label: "Widget Settings",
          icon: "i-lucide-sliders-horizontal",
          to: `/dashboard/projects/${projectSlug.value}/widget-settings`,
        },
        {
          label: "Allowed Origins",
          icon: "i-lucide-globe",
          to: `/dashboard/projects/${projectSlug.value}/origins`,
        },
        {
          label: "API Keys",
          icon: "i-lucide-key-round",
          to: `/dashboard/projects/${projectSlug.value}/api-keys`,
          badge: "soon",
          active: false,
        },
        {
          label: "Branding",
          icon: "i-lucide-paintbrush",
          to: `/dashboard/projects/${projectSlug.value}/branding`,
          badge: "soon",
          active: false,
        },
      ],
    },
  ],
  [
    {
      label: "Docs",
      icon: "i-lucide-book",
      to: "https://docs.tellthedev.com",
      target: "_blank",
    },
    {
      label: "Support",
      icon: "i-lucide-life-buoy",
      to: "https://tellthedev.com/support",
      target: "_blank",
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
