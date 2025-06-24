<script setup lang="ts">
import type { CheckboxGroupItem, RadioGroupItem } from '@nuxt/ui'
import { computed, ref } from 'vue'

const modelValue = defineModel<{
  widgetSettings: {
    theme: string
    position: string
    allowScreenshot: boolean
    allowEmail: boolean
    defaultTypes: string[]
  }
}>()

defineProps<{
  subtitle?: string
}>()

const settings = computed(() => modelValue.value!.widgetSettings)

const themeOptions = ref<RadioGroupItem[]>([
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
])

const positionOptions = ref<RadioGroupItem[]>([
  { label: 'Bottom Right', value: 'bottom-right' },
  { label: 'Bottom Left', value: 'bottom-left' }
])

const typeOptions = ref<CheckboxGroupItem[]>([
  { label: 'Bug', value: 'bug' },
  { label: 'Idea', value: 'idea' },
  { label: 'Other', value: 'other' }
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">Widget Settings</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <UForm :state="settings" class="space-y-6">
      <UFormField label="Theme">
        <URadioGroup v-model="settings.theme" :items="themeOptions" />
      </UFormField>

      <UFormField label="Widget Position">
        <URadioGroup v-model="settings.position" :items="positionOptions" />
      </UFormField>

      <UFormField label="Show Screenshot Button">
        <USwitch v-model="settings.allowScreenshot" />
      </UFormField>

      <UFormField label="Show Email Field">
        <USwitch v-model="settings.allowEmail" />
      </UFormField>

      <UFormField label="Default Feedback Types">
        <UCheckboxGroup v-model="settings.defaultTypes" :items="typeOptions" />
      </UFormField>
    </UForm>
  </div>
</template>
