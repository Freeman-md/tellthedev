<template>
  <div class="block">
    <label :for="id" class="sr-only">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      class="py-2 border-b border-gray-400 w-full focus:outline-none focus:ring-0 focus:border-primary transition"
      @input="handleInput"
    >
    <small v-if="error" :id="`${id}-error`" class="text-red-500 text-sm">
      {{ error }}
    </small>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  type: string;
  placeholder: string;
  label?: string;
  error?: string;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) =>
  emit("update:modelValue", (event.target as HTMLInputElement).value);
</script>
