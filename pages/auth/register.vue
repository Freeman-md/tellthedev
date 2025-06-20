<template>
  <div class="space-y-8 lg:max-w-4/5">

    <section id="header" class="space-y-2">

      <h1 class="text-3xl font-semibold">New to TellTheDev,</h1>
      <p class="text-gray-700">Create an account</p>

    </section>

    <form id="form" class="space-y-6">

      <div class="block">
        <label for="email" class="sr-only">Email</label>
        <input id="email" v-model="form.email" type="email" placeholder="Email" :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'email-error' : undefined"
          class="py-2 border-b border-gray-400 w-full focus:outline-none focus:ring-0 focus:border-primary transition" />
        <small v-if="errors.email" :id="'email-error'" class="text-red-500 text-sm">
          {{ errors.email }}
        </small>
      </div>


      <div class="block">
        <label for="password" class="sr-only">Password</label>
        <input id="password" v-model="form.password" type="password" placeholder="Password"
          :aria-invalid="!!errors.password" :aria-describedby="errors.password ? 'password-error' : undefined"
          class="py-2 border-b border-gray-400 w-full focus:outline-none focus:ring-0 focus:border-primary transition" />
        <small v-if="errors.password" :id="'password-error'" class="text-red-500 text-sm">
          {{ errors.password }}
        </small>
      </div>

      <div class="block">
        <label for="confirm-password" class="sr-only">Password</label>
        <input id="confirm-password" v-model="form.confirmPassword" type="password" placeholder="Confirm Password"
          :aria-invalid="!!errors.confirmPassword"
          :aria-describedby="errors.confirmPassword ? 'confirm-password-error' : undefined"
          class="py-2 border-b border-gray-400 w-full focus:outline-none focus:ring-0 focus:border-primary transition" />
        <small v-if="errors.confirmPassword" :id="'confirm-password-error'" class="text-red-500 text-sm">
          {{ errors.confirmPassword }}
        </small>
      </div>

      <div class="flex justify-between">
        <UCheckbox color="outline" label="Remember me" />
        <NuxtLink to="/auth/forgot-password">
          Forgot Password?
        </NuxtLink>
      </div>

      <div class="mt-4 space-y-4">
        <UButton :loading="isSubmitting" @click="handleSubmit"
          class="w-full text-white justify-center !text-center py-2 cursor-pointer">Create account</UButton>
        <UButton icon="devicon:google" color="neutral"
          class="w-full justify-center border border-gray-200 cursor-pointer py-2">
          Continue with Google
        </UButton>
      </div>

    </form>

    <section id="footer">
      Already a member? <NuxtLink class="text-primary hover:underline" to="/auth/login">Sign in</NuxtLink>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { definePageMeta } from '#imports';

definePageMeta({
  layout: 'auth',
})

const isSubmitting = ref(false);

const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const toast = useToast()

const validateForm = () => {
  let isValid = true;

  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.email.includes('@')) {
    errors.email = 'Please enter a valid email'
    isValid = false;
  }

  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }

  return isValid;
}

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  const supabase = useSupabaseClient();

  try {
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      errors.email = error.message;
      return;
    }

    toast.add('✅ Account created. Check your inbox for verification.');
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    isSubmitting.value = false;
  }
};

</script>