<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white">
    <img src="/images/logo.svg" alt="TellTheDev Logo" class="w-32 mb-6" />
    <h1 class="text-2xl font-bold mb-2">Widget Preview</h1>
    <p class="mb-6 text-gray-600">This is a live preview of your feedback widget.</p>
    <div v-if="!apiKey" class="text-red-500 font-medium">
      No API key provided. Please add <code>?api_key=YOUR_API_KEY</code> to the URL.
    </div>
    <div v-else>
      <div id="widget-preview-mount"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const apiKey = ref<string | null>(null)

onMounted(() => {
  apiKey.value = route.query.api_key as string || null
  if (apiKey.value) {
    // Dynamically inject the widget script with the API key
    const script = document.createElement('script')
    script.src = '/widget/script.js'
    script.type = 'module'
    script.setAttribute('data-api-key', apiKey.value)
    document.body.appendChild(script)
  }
})
</script>

<style scoped>
code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.95em;
}
</style> 