// import { defineClientConfig } from '@vuepress/client'
import type { ClientConfig } from '@vuepress/client'

import AutoArticleListLayout from './theme/layouts/AutoArticleListLayout'
import AutoArticleList from './theme/components/AutoArticleList'
import Hanzi from './theme/components/hanzi/Hanzi.vue'
import Chazi from './theme/components/hanzi/Chazi.vue'
import FlippyCardList from './theme/components/flippy-card/components/card-list.vue'
import FlippyCard from './theme/components/flippy-card/components/card.vue'

// 为项目主页的特性添加闪光效果
import 'vuepress-theme-hope/presets/shinning-feature-panel.scss'

// 为页面图标添加鼠标悬停的跳动效果
import 'vuepress-theme-hope/presets/bounce-icon.scss'

function defineClientConfig(clientConfig: ClientConfig = {}): ClientConfig {
  return clientConfig
}

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    AutoArticleListLayout,
  },

  enhance: ({ app }) => {
    app.component('AutoArticleList', AutoArticleList)
    app.component('Hanzi', Hanzi)
    app.component('Chazi', Chazi)
    app.component('FlippyCardList', FlippyCardList)
    app.component('FlippyCard', FlippyCard)
  },
})
