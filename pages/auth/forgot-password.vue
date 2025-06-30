<template>
  <div class="space-y-8 lg:max-w-4/5">
    <section class="space-y-2">
      <h1 class="text-3xl font-semibold">Forgot your password?</h1>
      <p class="text-gray-700">
        Enter your email to receive reset instructions.
      </p>
    </section>

    <form class="space-y-6">
      <AuthInput
        id="email"
        v-model="email"
        label="Email"
        type="email"
        placeholder="Email"
        :error="error"
      />

      <UButton
        :loading="isSubmitting"
        class="w-full text-white justify-center !text-center py-2 cursor-pointer"
        @click="handleSubmit"
      >
        Send reset link
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
import { ref } from "vue";
import { definePageMeta, useSupabaseClient, useToast } from "#imports";
import AuthInput from "@/components/auth/AuthInput.vue";

definePageMeta({
  layout: "auth",
});

const email = ref("");
const error = ref("");
const isSubmitting = ref(false);

const toast = useToast();
const supabase = useSupabaseClient();

const handleSubmit = async () => {
  error.value = "";
  if (!email.value.includes("@")) {
    error.value = "Please enter a valid email";
    return;
  }

  isSubmitting.value = true;

  const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(
    email.value,
    {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    }
  );

  if (supabaseError) {
    error.value = supabaseError.message;
  } else {
    toast.add({ title: "Check your email to reset your password." });
    email.value = "";
  }

  isSubmitting.value = false;
};
</script>
