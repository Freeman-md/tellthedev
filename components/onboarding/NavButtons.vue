<template>
  <div class="flex gap-2 justify-between mt-4">
    <UButton
      variant="outline"
      leading-icon="i-lucide-arrow-left"
      :disabled="!stepper?.hasPrev || isCreating"
      @click="$emit('prev')"
    >
      Prev
    </UButton>

    <UButton
      v-if="showCreateButton"
      variant="solid"
      :loading="isCreating"
      :disabled="isCreating"
      @click="$emit('create')"
    >
      {{ isCreating ? "Creating Project..." : "Create Project" }}
    </UButton>

    <UButton
      v-else-if="showNextButton"
      variant="outline"
      trailing-icon="i-lucide-arrow-right"
      :disabled="!stepper?.hasNext"
      @click="$emit('next')"
    >
      Next
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCreating: boolean;
  showCreateButton: boolean;
  showNextButton: boolean;
  stepper: any;
}>();

defineEmits(['prev', 'next', 'create']);
</script> 