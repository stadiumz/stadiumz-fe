// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', "@nuxt/image"],
  colorMode: {
    preference: 'system',
    dataValue: 'theme',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})