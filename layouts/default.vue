<template>
  <div class="grid grid-cols-4">
    <aside class="bg-white border-r border-gray-200 col-span-1 h-screen">
      <div class="h-full flex flex-col p-4">
        <div>
          <NuxtLink to="/" class="text-xl font-bold">
            <NuxtImg
              src="/images/logo.svg"
              width="120"
              class="mb-10"
              alt="Logo"
            />
          </NuxtLink>
        </div>
        <UNavigationMenu
          orientation="vertical"
          :items="items"
          class="data-[orientation=vertical]"
        />
      </div>
    </aside>

    <div class="flex flex-col flex-1 col-span-3">
      <header
        class="h-16 border-b border-gray-200 px-6 flex items-center justify-between"
      >
        <div class="text-sm font-medium text-gray-600">
          Header (e.g. user avatar)
        </div>
      </header>

      <main class="flex-1 p-6">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="text-center text-sm text-gray-400 py-4">
        Built by <a href="" class="text-primary hover:underline">Freemancodz</a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref } from "vue";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Dashboard",
      type: "label",
    },
    {
      label: "Dashboard",
      icon: "i-lucide-layout-dashboard",
      defaultOpen: true,
      children: [
        {
          label: "Overview",
          icon: "i-lucide-bar-chart-3",
          to: "/",
        },
        {
          label: "Feedback",
          icon: "i-lucide-message-circle",
          to: "/dashboard/feedback",
        },
        {
          label: "Analytics",
          icon: "i-lucide-pie-chart",
          to: "/dashboard/analytics",
        },
      ],
    },
    {
      label: "Projects",
      icon: "i-lucide-folder",
      defaultOpen: true,
      children: [
        {
          label: "All Projects",
          icon: "i-lucide-folders",
          to: "/projects",
        },
        {
          label: "New Project",
          icon: "i-lucide-folder-plus",
          to: "/projects/new",
        },
        {
          label: "Project Settings",
          icon: "i-lucide-settings",
          children: [
            {
              label: "Widget Settings",
              icon: "i-lucide-sliders-horizontal",
              to: "/projects/settings/widget",
            },
            {
              label: "Allowed Origins",
              icon: "i-lucide-globe",
              to: "/projects/settings/origins",
            },
            {
              label: "API Keys",
              icon: "i-lucide-key-round",
              to: "/projects/settings/api-keys",
              badge: "soon",
              active: false,
            },
            {
              label: "Branding",
              icon: "i-lucide-paintbrush",
              to: "/projects/settings/branding",
              badge: "soon",
              active: false,
            },
          ],
        },
      ],
    },
    {
      label: "Account",
      icon: "i-lucide-user",
      defaultOpen: true,
      children: [
        {
          label: "Profile",
          icon: "i-lucide-user-circle",
          to: "/account/profile",
        },
        {
          label: "Settings",
          icon: "i-lucide-settings-2",
          to: "/account/settings",
        },
        {
          label: "Team Members",
          icon: "i-lucide-users",
          to: "/account/team",
          badge: "optional",
        },
        {
          label: "Billing",
          icon: "i-lucide-credit-card",
          to: "/account/billing",
          badge: "optional",
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
]);
</script>
