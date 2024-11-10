// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/icon",
    "vue-clerk/nuxt",
    "@nuxt/image",
    '@formkit/auto-animate/nuxt',
    "@nuxtjs/mdc",
    "nuxt-umami"
  ],
  colorMode: {
    fallback: "light",
    preference: "light"
  },

  umami: {
    id: 'a993650f-c46f-4079-aed3-4086318dc8de',
    host: 'https://analytics.softmodded.com',
    autoTrack: true,
    proxy: 'cloak',
    ignoreLocalhost: false,
    excludeQueryParams: false,
    logErrors: true,
  },

  vite: {
    build: {
      rollupOptions: {
        external: ["vue-clerk", "@clerk/backend"],
      }
    },
  }
});