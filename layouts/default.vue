<template>
  <div class="flex flex-col md:flex-row h-screen">
    <aside
      :class="[
        'bg-white border-r border-gray-200 w-auto max-md:min-w-1/2 md:w-1/4 h-full md:h-screen fixed md:relative z-40 transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
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

        <USelectMenu
          v-model="selectedProject"
          :items="projects"
          :content="{
            align: 'start',
          }"
          placeholder="Select project"
          class="w-full block md:hidden mb-4"
        />

        <UNavigationMenu orientation="vertical" :items="navigationItems" />
      </div>
    </aside>

    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/30 z-30 md:hidden transition"
        @click="toggleSidebar"
      />
    </Transition>

    <div class="flex flex-col flex-1 overflow-y-auto">
      <section
        class="h-16 border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between"
      >
        <div class="flex items-center space-x-2">
          <button
            class="md:hidden text-gray-700 hover:text-black focus:outline-none cursor-pointer mt-3"
            @click="toggleSidebar"
          >
            <span class="sr-only">Toggle sidebar</span>
            <UIcon name="cil:hamburger-menu" size="25" />
          </button>

          <NuxtLink to="/" class="text-xl font-bold md:hidden">
            <NuxtImg
              src="/images/logo.svg"
              width="120"
              alt="Logo"
              class="mt-1"
            />
          </NuxtLink>

          <USelectMenu
            v-model="selectedProject"
            :items="projects"
            class="w-40 hidden md:block"
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

          <UDropdownMenu :items="dropdownItems">
            <UAvatar alt="User Name" aria-setsize="md" />
          </UDropdownMenu>
        </div>
      </section>

      <main class="flex-1 p-6">
        <slot />
      </main>

      <!-- Footer -->
      <section class="text-center text-sm text-gray-400 py-4">
        Built by <a href="" class="text-primary hover:underline">Freemancodz</a>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogout } from "#imports";
import type { DropdownMenuItem, NavigationMenuItem } from "@nuxt/ui";
import { onMounted, onUnmounted, ref, watch } from "vue";

const isSidebarOpen = ref(false);

const { logout } = useLogout()

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

const dropdownItems = [
  {
    label: 'Profile',
    icon: 'i-lucide-user-circle'
  },
  {
    label: 'Logout',
    icon: 'material-symbols:logout-rounded',
    color: 'primary',
    onSelect: logout
  }
] satisfies DropdownMenuItem[]

const projects = ref(["TellTheDev", "Freemancodz", "FileTidy"]);

const selectedProject = ref("TellTheDev");

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isSidebarOpen.value) {
    isSidebarOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

watch(isSidebarOpen, (open) => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
