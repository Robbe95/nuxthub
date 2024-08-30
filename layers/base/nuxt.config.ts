export default defineNuxtConfig({
  components: [
    {
      pathPrefix: false,
      path: '@base/components',
    },
  ],
  css: [
    '@base/assets/styles/main.scss',
  ],
  experimental: {
    viewTransition: true,
  },
  i18n: {
    compilation: {
      strictMessage: false,
    },
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json', language: 'en-US' },
      { code: 'nl', file: 'nl.json', language: 'nl-BE' },
      { code: 'fr', file: 'fr.json', language: 'fr-FR' },
    ],
    strategy: 'prefix_and_default',
    vueI18n: './i18n.config.ts',
  },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-time',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-typed-router',
    '@nuxt/test-utils/module',
  ],
  runtimeConfig: {
    public: {
      apiClientId: '', // can be overridden by NUXT_PUBLIC_API_CLIENT_ID environment variable
      apiAuthUrl: '', // can be overridden by NUXT_PUBLIC_API_AUTH_URL environment variable
      apiBaseUrl: '', // can be overridden by NUXT_PUBLIC_API_BASE_URL environment variable
      apiClientSecret: '', // can be overridden by NUXT_PUBLIC_API_CLIENT_SECRET environment variable
    },
  },
})
