import WisemenEslintConfig from '@wisemen/eslint-config-vue'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...(await WisemenEslintConfig),
  {
    ignores: [
      '**/database/migrations',
      '**/layers/base/components/core/sonner/Toaster.vue',
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'ts/explicit-function-return-type': 'off',
      'vue/no-undef-components': 'off',
    },
  },
)
