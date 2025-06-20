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
      Already a member?
      <NuxtLink class="text-primary hover:underline" to="/auth/login"
        >Sign in</NuxtLink
      >
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { definePageMeta, useSupabaseClient, useToast } from "#imports";

definePageMeta({
  layout: "auth",
});

const isSubmitting = ref(false);

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const toast = useToast();

const validateForm = () => {
  let isValid = true;

  errors.email = "";
  errors.password = "";
  errors.confirmPassword = "";

  if (!form.email.includes("@")) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return isValid;
};

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

    toast.add({
      title: "✅ Account created. Check your inbox for verification.",
    });
  } catch (err) {
    toast.add({
      title: `Unexpected error: ${err}`,
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
