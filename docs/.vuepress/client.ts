import { defineClientConfig } from '@vuepress/client'

import AutoArticleListLayout from './theme/layouts/AutoArticleListLayout'
import AutoArticleList from './theme/components/AutoArticleList'

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    AutoArticleListLayout,
  },

  enhance: ({ app, router, siteData }) => {
    app.component('AutoArticleList', AutoArticleList)
  },
})
