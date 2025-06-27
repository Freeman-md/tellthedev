<template>
    <div class="grid grid-cols-1 md:grid-cols-2 h-screen max-h-screen bg-gray-100 p-4 rounded-3xl shadow-lg">
        <main class="flex flex-col justify-between p-10 w-full max-w-xl mx-auto">
            <NuxtLink to="/">
                <NuxtImg src="/images/logo.svg" width="120" class="mb-10" alt="Logo" />
            </NuxtLink>

            <slot />

            <div class="mt-8">
                Built by <a href="" class="text-primary hover:underline">Freemancodz</a>
            </div>
        </main>
        <aside
            class="hidden md:flex flex-col justify-end items-start bg-gradient-to-br from-primary-100 via-primary-200 to-primary-50 rounded-2xl px-14 pb-20 pr-20">
            <h2 class="text-2xl font-normal mb-4">“Imagination is more important than knowledge, especially when
                designing UI kits. Just remember, if your buttons are quantum entangled, users might get stuck in a
                parallel universe of endless clicks.”</h2>
            <p class="text-base text-gray-700 font-light">~ Albert Einstein</p>
        </aside>
    </div>
</template>