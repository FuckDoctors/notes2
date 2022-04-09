// 主题继承
// https://v2.vuepress.vuejs.org/reference/default-theme/extending.html#extending
// https://vuepress-theme-hope.github.io/v2/zh/cookbook/advanced/extend.html#%E7%BB%A7%E6%89%BF%E4%B8%BB%E9%A2%98
import type { ThemeObject } from '@vuepress/core'
import { path } from '@vuepress/utils'

const themeZhaobc: ThemeObject = {
  name: 'vuepress-theme-zhaobc',
  extends: 'vuepress-theme-hope',
  alias: {
    // 你可以在这里覆盖或新增别名
    // 文章项
    '@theme-hope/module/blog/components/ArticleItem': path.resolve(
      __dirname,
      './module/blog/components/ArticleItem.ts'
    ),
  },
  layouts: {
    // 你可以在这里覆盖或新增布局
  },
}

export default themeZhaobc
