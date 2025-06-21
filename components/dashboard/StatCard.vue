<template>
  <article class="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6">
    <div class="flex items-center gap-4">
      <span class="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
        <UIcon :name="icon" class="w-6 h-6" />
      </span>

      <div>
        <p class="text-sm text-gray-500">{{ label }}</p>
        <p class="text-2xl font-medium text-gray-900">{{ value }}</p>
      </div>
    </div>

    <div :class="trendClass">
      <UIcon :name="trendIcon" class="w-4 h-4" />
      <span class="text-xs font-medium">{{ changePercent }}%</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string | number
  icon?: string
  trend: 'up' | 'down'
  changePercent: number
}>()

const icon = computed(() => props.icon || 'i-lucide-bar-chart-3')

const trendIcon = computed(() =>
  props.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'
)

const trendClass = computed(() =>
  props.trend === 'up'
    ? 'inline-flex gap-2 rounded-sm bg-green-100 p-1 text-green-600'
    : 'inline-flex gap-2 rounded-sm bg-red-100 p-1 text-red-600'
)
</script>
