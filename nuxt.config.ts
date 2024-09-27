// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/icon", "@logto/nuxt"],
  logto: {
    pathnames: {
      signIn: "/login",
      signOut: "/logout",
      callback: "/auth/callback",
    },
    customRedirectBaseUrl: "http://localhost:3000",
  },
});
