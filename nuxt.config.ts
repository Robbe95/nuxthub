import path from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2024-08-30',

  alias: {
    '@@': path.resolve(__dirname, './disable'),
    '@auth': path.resolve(__dirname, './layers/auth'),
    '@base': path.resolve(__dirname, './layers/base'),
    '@cart': path.resolve(__dirname, './layers/cart'),
    '@server': path.resolve(__dirname, './server'),
    '@shared': path.resolve(__dirname, './shared'),
    '~~': path.resolve(__dirname, './disable'),
  },

  app: {
    head: {
      title: 'Nuxt Project Template',
      link: [
        { href: '/favicon.ico', rel: 'icon', type: 'image/ico' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '', hid: 'description' },
      ],
    },
  },

  build: {
    transpile: [
      'trpc-nuxt',
      'drizzle-orm',
    ],
  },

  components: [
    {
      pathPrefix: false,
      path: '@/components',
    },
    {
      pathPrefix: false,
      path: '@/views',
    },
  ],

  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  hub: {
    blob: true,
    database: true,
    kv: true,
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json', language: 'en-US' },
      { code: 'nl', file: 'nl.json', language: 'nl-BE' },
      { code: 'fr', file: 'fr.json', language: 'fr-FR' },
    ],
  },
  imports: {
    // scan: false,
  },

  modules: [
    '@nuxt/eslint',
    'nuxt-auth-utils',
  ],

  nitro: {
    compressPublicAssets: {
      brotli: true,
    },
    experimental: {
      tasks: true,
    },
    prerender: {
      failOnError: false,
    },
  },
  runtimeConfig: {
    dbUrl: import.meta.env.NUXT_DB_URL,
  },
})
