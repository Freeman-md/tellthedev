import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        openSans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#c3e0ff',
          200: '#90caff',
          300: '#5db3ff',
          400: '#2a9cff',
          500: '#007fff',
          600: '#0066cc',
          700: '#004c99',
          800: '#003366',
          900: '#001933',
        },
      }
    }
  },
  plugins: []
} satisfies Config 