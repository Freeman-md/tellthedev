<script setup lang="ts">
import type { CheckboxGroupItem, RadioGroupItem, FormError } from '@nuxt/ui'
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

const formRef = ref()
const settings = computed(() => modelValue.value!.widgetSettings)

const themeItems = ref<RadioGroupItem[]>([
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
])

const positionItems = ref<RadioGroupItem[]>([
  { label: 'Bottom Right', value: 'bottom-right' },
  { label: 'Bottom Left', value: 'bottom-left' }
])

const typeItems = ref<CheckboxGroupItem[]>([
  { label: 'Bug', value: 'bug' },
  { label: 'Idea', value: 'idea' },
  { label: 'Other', value: 'other' }
])

const validate = async () => {
  const errors: FormError[] = []

  if (settings.value.defaultTypes.length === 0) {
    errors.push({ name: 'defaultTypes', message: 'Please select at least one feedback type' })
  }

  formRef.value?.setErrors(errors)
  return errors.length === 0
}

defineExpose({ validate })
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">Widget Settings</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <UForm ref="formRef" :state="settings" class="space-y-6">
      <UFormField label="Theme" name="theme">
        <URadioGroup v-model="settings.theme" :items="themeItems" />
      </UFormField>

      <UFormField label="Widget Position" name="position">
        <URadioGroup v-model="settings.position" :items="positionItems" />
      </UFormField>

      <UFormField label="Show Screenshot Button" name="allowScreenshot">
        <USwitch v-model="settings.allowScreenshot" />
      </UFormField>

      <UFormField label="Show Email Field" name="allowEmail">
        <USwitch v-model="settings.allowEmail" />
      </UFormField>

      <UFormField label="Default Feedback Types" name="defaultTypes">
        <UCheckboxGroup v-model="settings.defaultTypes" :items="typeItems" />
      </UFormField>
    </UForm>
  </div>
</template>
