// 主题继承
// https://v2.vuepress.vuejs.org/reference/default-theme/extending.html#extending
// https://vuepress-theme-hope.github.io/v2/zh/cookbook/advanced/extend.html#%E7%BB%A7%E6%89%BF%E4%B8%BB%E9%A2%98
import { hopeTheme } from 'vuepress-theme-hope'
import type { ThemeOptions } from 'vuepress-theme-hope'

import customConfig from './customConfig'
import mdEnhancePlugin from './module/md-enhance'

const themeZhaobc = (options: ThemeOptions) => ({
  name: 'vuepress-theme-zhaobc',
  extends: hopeTheme(options),

  alias: {
    // You can override or add aliases here
  },

  plugins: [mdEnhancePlugin(customConfig.mdEnhance)],
})

export default themeZhaobc
