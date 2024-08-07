import { defineClientConfig } from 'vuepress/client'

// import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import TwoslashFloatingVue from './theme/components/twoslash/client'
import './theme/components/twoslash/style.css'

import AutoArticleListLayout from './theme/layouts/AutoArticleListLayout'
import AutoArticleList from './theme/components/AutoArticleList'
import Hanzi from './theme/components/hanzi/Hanzi.vue'
import Chazi from './theme/components/hanzi/Chazi.vue'
import FlippyCard from './theme/components/flippy-card/components/card.vue'
import HanziCard from './theme/components/hanzi/HanziCard.vue'

import PlaygroundIcon from './theme/components/icons/PlaygroundIcon'

// 为项目主页的特性添加闪光效果
import 'vuepress-theme-hope/presets/shinning-feature-panel.scss'

// 为页面图标添加鼠标悬停的跳动效果
import 'vuepress-theme-hope/presets/bounce-icon.scss'

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    AutoArticleListLayout,
  },

  enhance: ({ app }) => {
    app.component('AutoArticleList', AutoArticleList)
    app.component('Hanzi', Hanzi)
    app.component('Chazi', Chazi)
    app.component('FlippyCard', FlippyCard)
    app.component('HanziCard', HanziCard)
    app.component('PlaygroundIcon', PlaygroundIcon)

    // twoslash
    app.use(TwoslashFloatingVue)
  },
})
