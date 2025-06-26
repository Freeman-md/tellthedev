<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const navigationItems: NavigationMenuItem[][] = [
  [
    {
      label: "Dashboard",
      type: "label",
    },
    {
      label: "Projects",
      icon: "i-lucide-folder",
      to: "/dashboard",
    },
    { label: "Settings", icon: "i-lucide-settings-2", to: "/dashboard/account/settings" },
    {
      label: "Team Members",
      icon: "i-lucide-users",
      to: "/dashboard/account/team",
      badge: "optional",
    },
    {
      label: "Billing",
      icon: "i-lucide-credit-card",
      to: "/dashboard/account/billing",
      badge: "optional",
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
];
</script>

<template>
  <UiSidebar :navigation-items="navigationItems" />
</template>
