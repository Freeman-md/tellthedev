<template>
  <div class="space-y-6">
    <section
      class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 max-lg:*:last:col-span-full"
    >
      <StatCard
        label="Open Feedback"
        :value="6"
        trend="up"
        :change-percent="20"
        icon="i-lucide-wallet"
      />

      <StatCard
        label="Resolved Feedback"
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
    </section>

    <section class="grid lg:grid-cols-2 gap-4">
      <FeedbackDonut />

      <RecentFeedback />
    </section>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import FeedbackDonut from "~/components/dashboard/FeedbackDonut.vue";
import RecentFeedback from "~/components/dashboard/RecentFeedback.vue";
import StatCard from "~/components/dashboard/StatCard.vue";

definePageMeta({
  middleware: ["auth"],
});
</script>
