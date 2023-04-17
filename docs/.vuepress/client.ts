// .vuepress/theme/config.ts
import { defineClientConfig } from '@vuepress/client'

import AutoArticleListLayout from './theme/layouts/AutoArticleListLayout'
import AutoArticleList from './theme/components/AutoArticleList'

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    // For example, here we change the default layout of vuepress-theme-hope to layouts/Layout.vue under our own theme
    // Layout,
    AutoArticleListLayout,
  },

  enhance: ({ app, router, siteData }) => {
    app.component('AutoArticleList', AutoArticleList)
  },
})
