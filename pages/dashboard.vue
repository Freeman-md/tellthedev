<template>
    <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
})

const { fetchUserProjects } = useProjects()

onMounted(() => {
    console.log('fetching user projects')
    fetchUserProjects()
})
</script>