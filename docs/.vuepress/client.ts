// import { defineClientConfig } from '@vuepress/client'
import { ClientConfig } from '@vuepress/client'

import AutoArticleListLayout from './theme/layouts/AutoArticleListLayout'
import AutoArticleList from './theme/components/AutoArticleList'

// 为项目主页的特性添加闪光效果
import 'vuepress-theme-hope/presets/shinning-feature-panel.scss'
// 为页面图标添加鼠标悬停的跳动效果
import 'vuepress-theme-hope/presets/bounce-icon.scss'

const defineClientConfig = (clientConfig: ClientConfig = {}): ClientConfig =>
  clientConfig

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    AutoArticleListLayout,
  },

  enhance: ({ app, router, siteData }) => {
    app.component('AutoArticleList', AutoArticleList)
  },
})
