// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', "@nuxt/image", "@sidebase/nuxt-auth"],
  plugins: ['~/plugins/laravel-echo.ts'],
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  auth: {
    provider: {
        type: 'local',
        endpoints: {
            signIn: { path: '/login', method: 'post' },
            signOut: { path: '/logout', method: 'post' },
            getSession: { path: '/user', method: 'get' },
        },
        pages: {
            login: '/auth/login',
        },
        token: {
            signInResponseTokenPointer: '/data/token',
        }
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
    baseURL: 'http://localhost:8000/api/',
    
}
})