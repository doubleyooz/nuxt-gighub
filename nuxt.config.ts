// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "nuxt-icon"],

  runtimeConfig: {
    public: {
      appServer: process.env.APP_SERVER, // Public runtime config
    },
  },
});
