<script setup lang="ts">
import { computed } from 'vue'

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

const themeOptions = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
]

const positionOptions = [
  { label: 'Bottom Right', value: 'bottom-right' },
  { label: 'Bottom Left', value: 'bottom-left' }
]

const typeOptions = [
  { label: 'Bug', value: 'bug' },
  { label: 'Idea', value: 'idea' },
  { label: 'Other', value: 'other' }
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">Widget Settings</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <UForm :state="settings" class="space-y-6">
      <UFormGroup label="Theme">
        <URadioGroup v-model="settings.theme" :options="themeOptions" />
      </UFormGroup>

      <UFormGroup label="Widget Position">
        <URadioGroup v-model="settings.position" :options="positionOptions" />
      </UFormGroup>

      <UFormGroup label="Show Screenshot Button">
        <USwitch v-model="settings.allowScreenshot" />
      </UFormGroup>

      <UFormGroup label="Show Email Field">
        <USwitch v-model="settings.allowEmail" />
      </UFormGroup>

      <UFormGroup label="Default Feedback Types">
        <UCheckboxGroup v-model="settings.defaultTypes" :options="typeOptions" />
      </UFormGroup>
    </UForm>
  </div>
</template>
