import path from 'node:path'

export default defineNuxtConfig({
  alias: {
    '@base': path.resolve(__dirname, '../base'),
  },
  components: [
    {
      pathPrefix: false,
      path: '@auth/components',
    },
    {
      pathPrefix: false,
      path: '@auth/views',
    },
  ],

  extends: [
    '../base',
  ],
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json', language: 'en-US' },
      { code: 'nl', file: 'nl.json', language: 'nl-BE' },
      { code: 'fr', file: 'fr.json', language: 'fr-FR' },
    ],
  },
})
