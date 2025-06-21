<template>
  <aside
    :class="[
      'bg-white border-r border-gray-200 w-auto max-md:min-w-1/2 md:w-1/4 h-full md:h-screen fixed md:relative z-40 transition-transform duration-300 ease-in-out',
      isOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
    ]"
  >
    <div class="h-full flex flex-col p-4 -space-y-4">
      <NuxtLink to="/" class="text-xl font-bold md:block hidden">
        <NuxtImg
          src="/images/logo.svg"
          width="120"
          class="mb-10 mt-1"
          alt="Logo"
        />
      </NuxtLink>

      <div class="flex items-center justify-between md:hidden mb-4 space-x-4">
        <USelectMenu
          v-model="selectedProject"
          :items="projects"
          :content="{ align: 'start' }"
          placeholder="Select project"
          class="w-full"
        />
        <UButton
          variant="ghost"
          color="neutral"
          @click="$emit('close')"
        >
          <UIcon name="i-lucide-x" size="22" />
        </UButton>
      </div>

      <UNavigationMenu orientation="vertical" :items="navigationItems" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref } from "vue";

defineProps<{
  isOpen: boolean;
}>();

defineEmits(["close"]);

const projects = ref(["TellTheDev", "Freemancodz", "FileTidy"]);
const selectedProject = ref("TellTheDev");

const navigationItems = ref<NavigationMenuItem[][]>([
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
        { label: "Overview", icon: "i-lucide-bar-chart-3", to: "/" },
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
        { label: "All Projects", icon: "i-lucide-folders", to: "/projects" },
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
