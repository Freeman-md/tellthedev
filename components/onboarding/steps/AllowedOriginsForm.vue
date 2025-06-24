<script setup lang="ts">
import { computed, ref } from "vue";
import type { FormError } from '@nuxt/ui'

const modelValue = defineModel<{
  origins: string[];
}>();

defineProps<{
  subtitle?: string;
}>();

const formRef = ref()
const origins = computed(() => modelValue.value!.origins);
const input = ref("");

function addOrigin() {
  const value = input.value.trim();
  if (!value || origins.value.includes(value)) return;
  origins.value.push(value);
  input.value = "";
}

function removeOrigin(index: number) {
  origins.value.splice(index, 1);
}

const validate = async () => {
  const errors: FormError[] = []

  if (origins.value.length === 0) {
    errors.push({ name: 'origins', message: 'At least one domain is required' })
  }

  formRef.value?.setErrors(errors)
  return errors.length === 0
}

defineExpose({ validate })
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">Allowed Origins</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <UForm ref="formRef" :state="origins" class="space-y-4">
      <UFormField
        label="Domain"
        name="origins"
        description="Enter a domain and press enter or click add"
      >
        <div class="flex items-center gap-2">
          <UInput
            v-model="input"
            placeholder="e.g. myapp.com"
            class="flex-1"
            @keydown.enter.prevent="addOrigin"
          />
          <UButton size="sm" @click="addOrigin">Add</UButton>
        </div>
      </UFormField>

      <div v-if="origins.length > 0" class="flex flex-wrap gap-2 mt-4">
        <UBadge
          v-for="(origin, index) in origins"
          :key="origin"
          :label="origin"
          
          variant="subtle"
          size="lg"
          trailing
          trailing-icon="i-lucide-x"
          class="cursor-pointer"
          @click="removeOrigin(index)"
        />
      </div>
    </UForm>
  </div>
</template>
