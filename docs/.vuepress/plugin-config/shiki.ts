import type { ShikiPluginOptions } from '@vuepress/plugin-shiki'
import { transformerTwoslash } from '@shikijs/twoslash'

import { createTwoslasher as createTwoslasherVue } from 'twoslash-vue'

export const shikiOptions: ShikiPluginOptions = {
  lineNumbers: false,
  themes: {
    light: 'one-light',
    dark: 'one-dark-pro',
  },
  // 设置别名，让 vscode 和 vuepress 都能正常解析语法高亮
  langAlias: {
    conf: 'apache', // shiki 中使用 apache 高亮
  },
  // twoslash: {
  //   twoslashOptions: {
  //     compilerOptions: {
  //       moduleResolution: /* bundler */ 100,
  //     },
  //   },
  // },

  transformers: [
    // This is for normal TypeScript Twoslash
    transformerTwoslash({
      explicitTrigger: /\btwoslash\b/,
    }),

    transformerTwoslash({
      explicitTrigger: /\btwoslash-vue\b/,
      // Pass the custom twoslasher
      twoslasher: createTwoslasherVue(),
      rendererRich: {
        // Use hover to render errors instead of inserting a error line
        // Up to your preference
        errorRendering: 'hover',
      },
    }),
  ],
}
