import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],

  tailwindcss: {
    config: {
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
      ]
    }
  },

  ui: {
    colorMode: false // TODO: add support for light and dark mode
  },

  imports: {
    autoImport: true,
    dirs: ['utils']
  },

  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
      include: undefined,
      exclude: [
        '/auth/**'
      ],
      saveRedirectToCookie: false,
    }
  }

})