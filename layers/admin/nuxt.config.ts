import path from 'node:path'

export default defineNuxtConfig({
  alias: {
    '@auth': path.resolve(__dirname, '../auth'),
    '@base': path.resolve(__dirname, '../base'),
  },
  components: [
    {
      pathPrefix: false,
      path: '@admin/components',
    },
    {
      pathPrefix: false,
      path: '@admin/views',
    },
  ],

  extends: [
    '../base',
    '../auth',
  ],
})
