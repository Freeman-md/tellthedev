<script setup lang="ts">
import { definePageMeta, useLoginForm } from '#imports'
import AuthInput from '~/components/auth/AuthInput.vue'

definePageMeta({
  layout: 'auth',
})

const { form, errors, isSubmitting, handleSubmit } = useLoginForm()
</script>

<template>
  <div class="space-y-8 lg:max-w-4/5">
    <section id="header" class="space-y-2">
      <h1 class="text-3xl font-semibold">Welcome back,</h1>
      <p class="text-gray-700">Sign in to continue</p>
    </section>

    <form id="form" class="space-y-6">
      <AuthInput
        id="email"
        label="Email"
        type="email"
        placeholder="Email"
        v-model="form.email"
        :error="errors.email"
      />
      <AuthInput
        id="password"
        label="Password"
        type="password"
        placeholder="Password"
        v-model="form.password"
        :error="errors.password"
      />

      <div class="flex justify-between">
        <UCheckbox label="Remember me" />
        <NuxtLink class="hover:underline text-primary" to="/auth/forgot-password">Forgot Password?</NuxtLink>
      </div>

      <div class="mt-4 space-y-4">
        <UButton
          :loading="isSubmitting"
          class="w-full text-white justify-center !text-center py-2 cursor-pointer"
          @click="handleSubmit"
        >
          Sign in
        </UButton>
        <UButton
          icon="devicon:google"
          color="neutral"
          class="w-full justify-center border border-gray-200 cursor-pointer py-2"
        >
          Continue with Google
        </UButton>
      </div>
    </form>

    <section id="footer">
      Don’t have an account?
      <NuxtLink class="text-primary hover:underline" to="/auth/register">
        Create one
      </NuxtLink>
    </section>
  </div>
</template>
