import { defineComponent, h, type VNode } from 'vue'

// import { usePageData } from '@vuepress/client'

import CommonWrapper from '@theme-hope/components/CommonWrapper'
import SkipLink from '@theme-hope/components/SkipLink'
import { FadeSlideY } from '@theme-hope/components/transitions/index'

import AutoArticleList from '../components/AutoArticleList'

export default defineComponent({
  name: 'AutoArticleListLayout',

  setup() {
    // const page = usePageData()

    return (): VNode[] => [
      h(SkipLink),
      h(
        CommonWrapper,
        {
          noSidebar: true,
        },
        {
          default: () => h(FadeSlideY, () => h(AutoArticleList)),
        }
      ),
    ]
  },
})
