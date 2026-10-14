// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-10-14',
  devtools: { enabled: false },
  vite: { plugins: [tailwindcss()] },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Ourhome',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Manage your shared home expenses and tasks' },
      ],
    },
  },
});
