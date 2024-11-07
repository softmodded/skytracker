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
  ],
  colorMode: {
    fallback: "light",
    preference: "light"
  }
});