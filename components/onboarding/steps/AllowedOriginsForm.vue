<script setup lang="ts">
import { computed, ref } from "vue";

const modelValue = defineModel<{
  origins: string[];
}>();

defineProps<{
  subtitle?: string;
}>();

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
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">Allowed Origins</h2>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </div>

    <UForm :state="origins" class="space-y-4">
      <UFormField
        label="Domain"
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
