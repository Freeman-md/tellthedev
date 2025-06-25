<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navigationItems: NavigationMenuItem[][] = [
  [
    {
      label: "Dashboard",
      type: "label",
    },
    {
      label: "Dashboard",
      icon: "i-lucide-layout-dashboard",
      children: [
        { label: "Overview", icon: "i-lucide-bar-chart-3", to: "/dashboard" },
        { label: "Feedback", icon: "i-lucide-message-circle", to: "/dashboard/feedback" },
        { label: "Analytics", icon: "i-lucide-pie-chart", to: "/dashboard/analytics" },
      ],
    },
    {
      label: "Projects",
      icon: "i-lucide-folder",
      children: [
        { label: "All Projects", icon: "i-lucide-folders", to: "/projects" },
        { label: "New Project", icon: "i-lucide-folder-plus", to: "/projects/create" },
      ],
    },
    {
      label: "Account",
      icon: "i-lucide-user",
      children: [
        { label: "Profile", icon: "i-lucide-user-circle", to: "/account/profile" },
        { label: "Settings", icon: "i-lucide-settings-2", to: "/account/settings" },
        { label: "Team Members", icon: "i-lucide-users", to: "/account/team", badge: "optional" },
        { label: "Billing", icon: "i-lucide-credit-card", to: "/account/billing", badge: "optional" },
      ],
    },
  ],
  [
    { label: "Docs", icon: "i-lucide-book", to: "https://docs.tellthedev.com", target: "_blank" },
    { label: "Support", icon: "i-lucide-life-buoy", to: "https://tellthedev.com/support", target: "_blank" },
  ],
]
</script>

<template>
  <UiSidebar
    :navigation-items="navigationItems"
  />
</template>
