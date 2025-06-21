<template>
  <div>
    <section class="grid grid-cols-3 gap-6">
      <div class="space-y-4">
        <StatCard
          label="Total Feedback"
          :value="6"
          trend="up"
          :change-percent="20"
          icon="i-lucide-wallet"
        />

        <StatCard
          label="Total Projects"
          :value="6"
          trend="up"
          :change-percent="20"
          icon="i-lucide-wallet"
        />
      </div>

      <div>
        <!-- Chart should go here showing resolved, new and whatever feedback -->
      </div>

      <div class="bg-white dark:bg-muted rounded-lg shadow-sm p-4">
        <h3 class="text-base font-semibold mb-4">Recent Feedback</h3>
        <RecentFeedback :data="recentFeedback.slice(0, 5)" />

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import RecentFeedback from "~/components/dashboard/RecentFeedback.vue";
import StatCard from "~/components/dashboard/StatCard.vue";

definePageMeta({
  middleware: ["auth"],
});

const recentFeedback = [
  {
    id: "1",
    date: "2025-06-20T09:00:00",
    status: "new",
    email: "freeman@trutech.app",
    content: "App crashes when clicking sort.",
  },
  {
    id: "2",
    date: "2025-06-19T14:35:00",
    status: "in progress",
    email: "sarah@example.com",
    content: "Dark mode not applying on dashboard.",
  },
  {
    id: "3",
    date: "2025-06-18T17:22:00",
    status: "resolved",
    email: "dev@snappshare.io",
    content: "Chunk uploads failing on mobile.",
  },
  {
    id: "4",
    date: "2025-06-18T10:00:00",
    status: "new",
    email: "hello@vibra.dev",
    content: "Feedback widget is overlapping footer.",
  },
  {
    id: "5",
    date: "2025-06-17T22:18:00",
    status: "resolved",
    email: "support@barss.com",
    content: "Missing confirmation email after submission.",
  },
];
</script>
