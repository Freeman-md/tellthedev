<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  project: {
    slug: string
    api_key: string
  }
  subtitle?: string
}>()

const embedSnippet = computed(() => {  
  const apiKey = props.project.api_key || 'your-api-key'
  return `<script src="https://tellthedev.vercel.app/widget/script.js" data-project-key="${apiKey}" defer><\\/script>`
})

const { copy, copied } = useClipboard({ source: embedSnippet })
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">Finish Setup</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <div class="space-y-4">
      <UFormField label="Embed Script">
        <UTextarea :model-value="embedSnippet" readonly :ui="{ root: 'w-full', base: 'resize-none' }">
          <template #trailing>
            <UTooltip text="Copy to clipboard" :content="{ side: 'right' }">
              <UButton
                :color="copied ? 'success' : 'neutral'"
                variant="link"
                size="sm"
                :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                aria-label="Copy to clipboard"
                @click="copy()"
              />
            </UTooltip>
          </template>
        </UTextarea>
      </UFormField>
    </div>
  </div>
</template>
