<script setup lang="ts">
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { useFeedback } from '#imports';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const { data } = useFeedback(2, [
    'type',
    'sentiment'
])

// 🧮 Count by feedback type
const feedbackStats = computed(() => {
  const countMap: Record<string, number> = {};

  data.value.forEach((item) => {
    const typeKey = typeof item.type === 'string' ? item.type : 'unknown';
    countMap[typeKey] = (countMap[typeKey] || 0) + 1;
  });

  return Object.entries(countMap).map(([label, count]) => ({
    label,
    count
  }));
});

// 🎨 Colors for feedback types (add more as needed)
const typeColors: Record<string, string> = {
  bug: '#ef4444',        // red
  feature: '#3b82f6',    // blue
  comment: '#10b981',    // green
};

const chartData = computed(() => {
  return {
    labels: feedbackStats.value.map((s) => s.label),
    datasets: [
      {
        data: feedbackStats.value.map((s) => s.count),
        backgroundColor: feedbackStats.value.map((s) => typeColors[s.label] || '#a3a3a3'),
        borderWidth: 2
      }
    ]
  };
});

const total = computed(() =>
  feedbackStats.value.reduce((sum, item) => sum + item.count, 0)
);

</script>

<template>
  <div class="rounded-xl border border-gray-100 p-6 overflow-hidden">
    <h3 class="text-lg font-semibold mb-1">Feedback Overview</h3>
    <p class="text-sm mb-4">Total: {{ total }}</p>

    <div class="flex flex-col items-center justify-center space-y-4">
      <div class="w-[200px] h-[200px]">
        <Pie :data="chartData" :options="{ cutout: '70%' }" />
      </div>

      <!-- Legend -->
      <ul class="flex-1 space-y-2 w-full text-sm">
        <li v-for="item in feedbackStats" :key="item.label" class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span
              class="inline-block w-3 h-3 rounded-full"
              :style="{ backgroundColor: typeColors[item.label] || '#a3a3a3' }"
            ></span>
            <span class="capitalize">{{ item.label }}</span>
          </div>
          <span>{{ ((item.count / total) * 100).toFixed(1) }}%</span>
        </li>
      </ul>
    </div>
  </div>
</template>