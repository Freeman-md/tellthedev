<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'

const modelValue = defineModel<{
  project: {
    slug: string
  }
}>()

defineProps<{
  subtitle?: string
}>()

const embedSnippet = computed(() => {
  const slug = modelValue.value?.project.slug || 'your-project-slug'
  return `<script src="https://cdn.tellthedev.com/widget.js" data-project="${slug}" defer><\\/script>`
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

      <div class="flex gap-2">
        <UButton icon="i-lucide-eye" color="gray" variant="outline">
          Preview Widget
        </UButton>

        <UButton icon="i-lucide-check-circle" color="primary">
          Go to Dashboard
        </UButton>
      </div>
    </div>
  </div>
</template>
