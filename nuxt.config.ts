// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "nuxt-icon", "@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  runtimeConfig: {
    public: {
      appServer: process.env.APP_SERVER || "http://localhost:3001", // Public runtime config
    },
  },
});
