<template>
  <div class="space-y-8 lg:max-w-4/5">
    <section id="header" class="space-y-2">
      <h1 class="text-3xl font-semibold">New to TellTheDev,</h1>
      <p class="text-gray-700">Create an account</p>
    </section>

    <form id="form" class="space-y-6">
      <AuthInput
        id="email"
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="Email"
        :error="errors.email"
      />

      <AuthInput
        id="password"
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Password"
        :error="errors.password"
      />

      <AuthInput
        id="confirm-password"
        v-model="form.confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        :error="errors.confirmPassword"
      />

      <div class="mt-4 space-y-4">
        <UButton
          :loading="isSubmitting"
          class="w-full text-white justify-center !text-center py-2 cursor-pointer"
          @click="handleSubmit"
          >Create account</UButton
        >
        <AuthenticateWithGoogle />
      </div>
    </form>

    <section id="footer">
      Already a member?
      <NuxtLink class="text-primary hover:underline" to="/auth/login"
        >Sign in</NuxtLink
      >
    </section>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useRegisterForm } from "#imports";
import AuthenticateWithGoogle from "@/components/auth/AuthenticateWithGoogle.vue";

definePageMeta({
  layout: "auth",
});

const { form, errors, isSubmitting, handleSubmit } = useRegisterForm();
</script>
