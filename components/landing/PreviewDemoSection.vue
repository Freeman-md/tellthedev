<template>
  <section id="demo-section" class="w-full bg-white py-16 border-t border-neutral-100 mt-40">
    <div class="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
      <!-- Features List -->
      <div class="flex-1 w-full">
        <h2 class="text-2xl font-bold text-neutral-900 mb-4">🛠️ Here's a preview of what's working:</h2>
        <ul class="space-y-3 mb-6">
          <li class="flex items-center gap-2 text-base text-neutral-700">
            <UIcon name="i-heroicons-check-circle" class="text-primary" />
            Embed the widget with one line of code
          </li>
          <li class="flex items-center gap-2 text-base text-neutral-700">
            <UIcon name="i-heroicons-check-circle" class="text-primary" />
            Collect structured feedback from testers
          </li>
          <li class="flex items-center gap-2 text-base text-neutral-700">
            <UIcon name="i-heroicons-check-circle" class="text-primary" />
            Works in dev, staging, or live — you choose
          </li>
        </ul>
        <UButton trailing-icon="material-symbols:arrow-outward" variant="outline">Try it out</UButton>
      </div>
      <!-- Live Video Placeholder -->
      <div class="flex-1 w-full flex justify-center md:justify-end">
        <UCard class="w-full max-w-md min-h-[180px] flex items-center justify-center bg-neutral-50 border border-neutral-200 shadow-sm text-neutral-400 text-lg font-semibold">
          Live Video coming soon
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Autoplay video when scrolled to
onMounted(() => {
  const section = document.getElementById('demo-section')
  const video = document.getElementById('demo-video') as HTMLIFrameElement | null
  if (!section || !video) return
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Post message to YouTube iframe to play
        video.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*')
      }
    })
  }, { threshold: 0.5 })
  observer.observe(section)
})
</script> 