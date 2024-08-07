// .vuepress/theme/index.ts
import type { Theme } from 'vuepress'
import { getDirname, path } from '@vuepress/utils'
import { hopeTheme } from 'vuepress-theme-hope'
import type { ThemeOptions } from 'vuepress-theme-hope'

const __dirname = getDirname(import.meta.url)

export default (options: ThemeOptions): Theme => ({
  name: 'vuepress-theme-zhaobc',

  extends: hopeTheme(options, {
    custom: true,
  }),

  alias: {
    // You can override or add aliases here
    '@theme-hope/components/NormalPage': path.resolve(
      __dirname,
      './components/NormalPage.vue'
    ),
  },
})
