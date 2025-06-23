<template>
  <div class="space-y-6">
    <!-- Stat Cards -->
    <section
      class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 max-lg:*:last:col-span-full"
    >
      <StatCard label="Open Feedback" :value="6" trend="up" :change-percent="20" icon="i-lucide-bug" />
      <StatCard label="Resolved Feedback" :value="6" trend="up" :change-percent="20" icon="i-lucide-check-circle" />
      <StatCard label="Total Projects" :value="6" trend="up" :change-percent="20" icon="i-lucide-folder" />
    </section>

    <!-- Main Grid -->
    <section class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6 overflow-hidden">
        <FeedbackDonut />
        <RecentFeedback />
      </div>

      <div class="space-y-6">
        <QuickActions />
        <TipsAndResources />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';
import StatCard from '~/components/dashboard/StatCard.vue';
import FeedbackDonut from '~/components/dashboard/FeedbackDonut.vue';
import RecentFeedback from '~/components/dashboard/RecentFeedback.vue';
import QuickActions from '~/components/dashboard/QuickActions.vue';
import TipsAndResources from '~/components/dashboard/TipsAndResources.vue';

definePageMeta({
  middleware: ['auth'],
});
</script>
