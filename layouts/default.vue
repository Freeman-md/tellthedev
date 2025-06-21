<template>
  <div class="grid md:grid-cols-4">
    <aside
      :class="[
        'bg-white border-r border-gray-200 h-screen fixed inset-y-0 z-40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:col-span-1',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="h-full flex flex-col p-4 -space-y-4">
        <NuxtLink to="/" class="text-xl font-bold">
          <NuxtImg
            src="/images/logo.svg"
            width="120"
            class="mb-10 mt-1"
            alt="Logo"
          />
        </NuxtLink>
        <UNavigationMenu orientation="vertical" :items="navigationItems" />
      </div>
    </aside>

    <!-- Backdrop (mobile only) -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/30 z-30 md:hidden"
      @click="toggleSidebar"
    />

    <div class="flex flex-col flex-1 col-span-3">
      <header
        class="h-16 border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between"
      >
        <div class="flex items-center space-x-2">
          <button
            class="md:hidden text-gray-700 hover:text-black focus:outline-none cursor-pointer mt-1"
            @click="toggleSidebar"
          >
            <span class="sr-only">Toggle sidebar</span>
            <UIcon name="cil:hamburger-menu" size="25" />
          </button>

          <USelectMenu
            v-model="selectedProject"
            :items="projects"
            class="w-40"
          />
        </div>

        <div class="flex space-x-2 items-center">
          <UButton
            icon="i-lucide-book"
            variant="outline"
            color="neutral"
            to="https://docs.tellthedev.vercel.app"
            target="_blank"
            trailing-icon="i-lucide:arrow-up-right"
            >Docs</UButton
          >
          <UAvatar alt="User Name" aria-setsize="md" />
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

const isSidebarOpen = ref(false);

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

const projects = ref(["TellTheDev", "Freemancodz", "FileTidy"]);

const selectedProject = ref("TellTheDev");

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

watch(isSidebarOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
