<template>
  <section class="w-full py-20 px-4">
    <div class="max-w-2xl mx-auto flex flex-col items-center gap-6">
      <h2 class="text-3xl font-bold text-neutral-900 text-center">Want to follow the journey?</h2>
      <p class="text-neutral-800 text-center text-lg">Drop your email and I'll let you know when the full version's ready. No spam.</p>
      <form class="w-full flex flex-col sm:flex-row gap-3 mt-2" @submit.prevent="submitEmail">
        <UInput
          v-model="email"
          type="email"
          placeholder="Your email address"
          class="flex-1"
          required
          autocomplete="email"
          icon="i-heroicons-envelope"
        />
        <UButton type="submit" color="primary">Keep me updated</UButton>
      </form>
      <UAlert v-if="submitted" color="primary" variant="soft" class="w-full text-center mt-2 bg-white text-primary border-white border">
        Thanks! You'll be the first to know.
      </UAlert>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const submitted = ref(false)

function submitEmail() {
  // Placeholder: handle email submission (API, etc.)
  submitted.value = true
  setTimeout(() => (submitted.value = false), 4000)
  email.value = ''
}
</script> 