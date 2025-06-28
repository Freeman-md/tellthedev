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
        <NuxtLink to="/auth/login" class="px-4 py-1.5 rounded font-medium text-neutral-700 hover:text-primary transition">Log In</NuxtLink>
        <UButton to="/auth/register" color="primary" class="font-semibold">Get Started</UButton>
      </div>
    </div>
  </nav>
</template>