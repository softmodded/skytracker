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
    preference: "light",
  },

  umami: {
    autoTrack: true,
    proxy: 'cloak',
    ignoreLocalhost: false,
    excludeQueryParams: false,
    logErrors: true,
  },

  nitro: {
    routeRules: {
      "/api/v1/metadata/buildinfo": {
        prerender: true
      }
    },

    experimental: {
      openAPI: true
    }
  }
});