// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    vue: true,

    ignores: [
      'dist/',
      'public/',
      'docs/.vuepress/.cache/',
      'docs/.vuepress/.temp/',
      'docs/.vuepress/public/',
      'docs/.vuepress/public/assets/js/',
      'docs/.vuepress/public/zhaobc.site/',
      '**/*.d.ts',
    ],
  },
  {
    rules: {
      // override default options for rules from base configurations
      'quote-props': ['warn', 'as-needed'],
      'style/quote-props': ['warn', 'as-needed'],
      // 'comma-dangle': ['warn', 'only-multiline'],
      'comma-dangle': [
        'error',
        {
          arrays: 'only-multiline',
          objects: 'only-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'only-multiline',
        },
      ],
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/brace-style': 'off',
      'style/brace-style': ['warn', '1tbs'],
      'arrow-parens': ['warn', 'as-needed'],
      'style/arrow-parens': ['warn', 'as-needed'],
      curly: ['warn', 'all'],
      'no-unused-vars': ['warn'],
      'vue/no-unused-refs': ['warn'],
      'eslint-comments/no-unlimited-disable': ['warn'],
      'style/max-statements-per-line': ['warn'],
      'vue/no-irregular-whitespace': ['warn'],
      'no-irregular-whitespace': ['warn'],
    },
  }
)
