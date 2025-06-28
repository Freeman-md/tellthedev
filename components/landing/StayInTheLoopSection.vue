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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const submitted = ref(false)
const { submit } = useWaitlist()

async function submitEmail() {
  if (!email.value) return
  const ok = await submit(email.value)
  if (ok) {
    submitted.value = true
    setTimeout(() => (submitted.value = false), 4000)
    email.value = ''
  }
}
</script> 