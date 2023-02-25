// .vuepress/theme/index.ts
import { getDirname, path } from '@vuepress/utils'
import { hopeTheme } from 'vuepress-theme-hope'
import type { ThemeOptions } from 'vuepress-theme-hope'

const __dirname = getDirname(import.meta.url)

export default (options: ThemeOptions) => ({
  name: 'vuepress-theme-zhaobc',

  extends: hopeTheme(options),

  alias: {
    // You can override or add aliases here
    '@theme-hope/components/NormalPage': path.resolve(
      __dirname,
      './components/NormalPage.vue'
    ),
  },
})
