<template>
  <div class="flex items-center justify-center h-full w-full">
    <div class="flex flex-col items-center text-center p-8 rounded-xl">
      <Icon
        name="i-lucide-hourglass"
        aria-hidden="true"
        size="40"
        class="animate-hourglass mb-4 text-gray-700"
      />

      <h2 class="text-2xl font-bold mb-2 text-gray-800">
        Coming Soon
      </h2>
      <p class="text-gray-700 max-w-md">
        This page is under construction and will be available soon. Stay tuned for
        updates!
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes hourglass {
  0%, 100% {
    transform: rotate(0deg) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: rotate(20deg) scale(1.1);
    opacity: 1;
  }
}

.animate-hourglass {
  animation: hourglass 1.5s ease-in-out infinite;
}
</style>
