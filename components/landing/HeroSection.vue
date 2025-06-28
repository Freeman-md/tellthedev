<template>
  <section class="w-full bg-white py-20">
    <div class="max-w-3xl mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-neutral-900 leading-tight mb-4">
        📣 Collect feedback while you build.
      </h1>
      <p class="text-lg md:text-xl text-neutral-700 mb-6 font-medium">
        <span class="font-bold text-primary">TellTheDev</span> helps developers, freelancers, and product teams collect feedback from QA testers, clients, and stakeholders — <em>before</em> launch.
      </p>
      <p class="text-base text-neutral-600 mb-8">
        No Slack threads. No scattered screenshots.<br>
        Just a clean widget that plugs into your dev/staging environment and gets you the answers you need to ship with confidence.
      </p>
      <UButton color="primary" size="lg" class="font-semibold" @click="scrollToDemo">
        See it in action ↓
      </UButton>
    </div>
  </section>
</template>

<script setup lang="ts">
function scrollToDemo() {
  const el = document.getElementById('demo-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script> 