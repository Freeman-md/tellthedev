<script setup lang="ts">
import { definePageMeta, useLoginForm } from "#imports";
import AuthenticateWithGoogle from "@/components/auth/AuthenticateWithGoogle.vue";

definePageMeta({
  layout: "auth",
});

const { form, errors, isSubmitting, handleSubmit } = useLoginForm();
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

      <div class="flex justify-between">
        <UCheckbox label="Remember me" />
        <NuxtLink
          class="hover:underline text-primary"
          to="/auth/forgot-password"
          >Forgot Password?</NuxtLink
        >
      </div>

      <div class="mt-4 space-y-4">
        <UButton
          :loading="isSubmitting"
          class="w-full text-white justify-center !text-center py-2 cursor-pointer"
          @click="handleSubmit"
        >
          Sign in
        </UButton>

        <AuthenticateWithGoogle />
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
