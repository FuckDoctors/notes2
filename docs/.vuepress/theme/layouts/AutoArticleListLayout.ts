import type { VNode } from 'vue'

// import { usePageData } from '@vuepress/client'

import MainLayout from '@theme-hope/components/base/MainLayout'
import SkipLink from '@theme-hope/components/base/SkipLink'
import DropTransition from '@theme-hope/components/transitions/DropTransition'
import { defineComponent, h } from 'vue'

import AutoArticleList from '../components/AutoArticleList'

export default defineComponent({
  name: 'AutoArticleListLayout',

  setup() {
    // const page = usePageData()

    return (): VNode[] => [
      h(SkipLink),
      h(
        MainLayout,
        {
          noSidebar: true,
        },
        {
          default: () => h(DropTransition, () => h(AutoArticleList)),
        }
      ),
    ]
  },
})
