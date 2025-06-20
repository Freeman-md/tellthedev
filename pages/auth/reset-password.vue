<template>
  <div class="space-y-8 lg:max-w-4/5">
    <section class="space-y-2">
      <h1 class="text-3xl font-semibold">Reset your password</h1>
      <p class="text-gray-700">Enter your new password below.</p>
    </section>

    <div v-if="errors.general" class="text-red-500 text-sm">{{ errors.general }}</div>

    <form v-if="showForm" class="space-y-6">
      <AuthInput
        id="password"
        v-model="password"
        label="New Password"
        type="password"
        placeholder="New Password"
        :error="errors.password"
      />

      <AuthInput
        id="confirm-password"
        v-model="confirmPassword"
        label="Confirm New Password"
        type="password"
        placeholder="Confirm New Password"
        :error="errors.confirmPassword"
      />

      <UButton
        :loading="isSubmitting"
        class="w-full text-white justify-center !text-center py-2 cursor-pointer"
        @click="handleSubmit"
      >
        Reset password
      </UButton>
    </form>

    <section>
      <NuxtLink class="text-primary hover:underline" to="/auth/login">
        Back to login
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useSupabaseClient, useToast, useRouter, definePageMeta } from '#imports'
import AuthInput from '~/components/auth/AuthInput.vue'

definePageMeta({
  layout: 'auth',
})

const supabase = useSupabaseClient()
const toast = useToast()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)
const showForm = ref(false)

const errors = reactive({
  password: '',
  confirmPassword: '',
  general: '',
})

onMounted(async () => {
  const sessionResult = await supabase.auth.getSession()
  const session = sessionResult.data?.session

  if (session) {
    showForm.value = true
  } else {
    errors.general = 'Invalid or expired reset session.'
  }
})

const handleSubmit = async () => {
  errors.password = ''
  errors.confirmPassword = ''
  errors.general = ''

  if (password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return
  }

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match'
    return
  }

  isSubmitting.value = true

  const { error: updateError } = await supabase.auth.updateUser({
    password: password.value,
  })

  if (updateError) {
    errors.general = updateError.message
  } else {
    toast.add({ title: '✅ Password updated. You can now log in.' })
    router.push('/auth/login')
  }

  isSubmitting.value = false
}
</script>
