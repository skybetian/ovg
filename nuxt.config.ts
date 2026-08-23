import tailwindcss from '@tailwindcss/vite'
import Aura from '@primeuix/themes/aura'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  app: {
    head: {
      // nuxt.config's app.head is serialized to disk, so it can't hold a function —
      // the real titleTemplate (with a no-title fallback) lives in app.vue instead
      title: 'One Visaya Gaming Corporation',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'One Visaya Gaming Corporation has been in the business of online entertainment since 2022, operating with strict adherence to the PAGCOR codes of conduct.' },
        // Nuxt does not inject this by default — confirmed absent from the dependency tree
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      // ponytail: placeholder — MANS/Dean must set the real production domain before deploy
      siteUrl: 'https://REPLACE_WITH_PRODUCTION_DOMAIN.example',
    },
  },

  css: ['~/assets/css/main.css'],

  modules: ['@primevue/nuxt-module'],

  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['gsap'],
    },
  },
})
