// 主题继承
// https://v2.vuepress.vuejs.org/reference/default-theme/extending.html#extending
// https://vuepress-theme-hope.github.io/v2/zh/cookbook/advanced/extend.html#%E7%BB%A7%E6%89%BF%E4%B8%BB%E9%A2%98
import type { ThemeObject, App } from '@vuepress/core'
import { path } from '@vuepress/utils'

import { hopeTheme } from 'vuepress-theme-hope'
import type { HopeThemeOptions } from 'vuepress-theme-hope'

import { getThemeConfig } from 'vuepress-theme-hope/lib/node/themeConfig'
import { getStatus } from 'vuepress-theme-hope/lib/node/status'
import { mdEnhancePlugin } from './module/md-enhance'
import { prepareSidebarData } from './node/sidebar'
import { prepareThemeColorScss } from 'vuepress-theme-hope/lib/node/themeColor'

import customConfig from './customConfig'

const themeZhaobc = (options: HopeThemeOptions) => ({
  name: 'vuepress-theme-zhaobc',
  extends: hopeTheme(options),
  alias: {
    // 你可以在这里覆盖或新增别名
    // StickyIcon已提交PR，无需再自定义
    // // 文章项
    // '@theme-hope/module/blog/components/ArticleItem': path.resolve(
    //   __dirname,
    //   './module/blog/components/ArticleItem.ts'
    // ),
  },
  layouts: {
    // 你可以在这里覆盖或新增布局
  },

  plugins: [mdEnhancePlugin(customConfig.mdEnhance)],

  // 覆盖原来的onPrepared，使用自定义的prepareSidebarData
  // 以便自定义sidebarText
  onPrepared: (app: App): Promise<void> => {
    const themeStatus = getStatus(options)
    const themeConfig = getThemeConfig(app, options, themeStatus)

    return Promise.all([
      prepareSidebarData(app, themeConfig),
      prepareThemeColorScss(app, themeConfig),
    ]).then(() => void 0)
  },
})

export default themeZhaobc
