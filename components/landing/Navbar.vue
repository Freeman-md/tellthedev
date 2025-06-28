<template>
  <nav class="w-full sticky top-0 z-30 bg-white/90 backdrop-blur shadow">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <NuxtImg src="/images/logo.svg" alt="TellTheDev Logo" width="140" />
      </NuxtLink>
      <!-- Navigation Links -->
      <div class="hidden md:flex items-center gap-6">
        <NuxtLink to="/docs" class="text-neutral-700 hover:text-primary font-medium transition">Docs</NuxtLink>
        <NuxtLink to="/pricing" class="text-neutral-700 hover:text-primary font-medium transition">Pricing</NuxtLink>
      </div>
      <!-- Actions -->
      <div class="flex items-center gap-3">
        <UButton to="/auth/login" variant="outline">Log In</UButton>
        <UButton to="/auth/register" class="font-semibold">Get Started</UButton>
      </div>
    </div>
  </nav>
</template>