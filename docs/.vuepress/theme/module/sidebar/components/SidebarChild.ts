import { defineComponent, unref } from 'vue'
import { useRoute } from 'vue-router'
import {
  renderChildren,
  renderItem,
} from 'vuepress-theme-hope/lib/client/module/sidebar/composables'
import { isActiveSidebarItem } from 'vuepress-theme-hope/lib/client/module/sidebar/utils'

import type { PropType, VNode } from 'vue'
import type {
  ResolvedHopeThemeSidebarHeaderItem,
  ResolvedHopeThemeSidebarPageItem,
} from 'vuepress-theme-hope/lib/shared'

import 'vuepress-theme-hope/lib/client/module/sidebar/styles/sidebar-child.scss'

import { usePageFrontmatter } from '@vuepress/client'

export default defineComponent({
  name: 'SidebarChild',

  props: {
    config: {
      type: Object as PropType<
        ResolvedHopeThemeSidebarPageItem | ResolvedHopeThemeSidebarHeaderItem
      >,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute()

    const tmpConfig = unref(props.config)

    // 得到原始的frontmatter
    // ComputedRef
    const rawPageFrontmatter = usePageFrontmatter()
    const { sidebarText } = unref(rawPageFrontmatter)
    if (sidebarText) {
      // 指定了sidebarText的情况下，直接使用
      // 这样直接会来回变化...
      tmpConfig.text = sidebarText as string
    }

    return (): (VNode | null)[] => [
      renderItem(tmpConfig, {
        class: [
          'sidebar-link',
          `sidebar-${tmpConfig.type}`,
          {
            active: isActiveSidebarItem(route, tmpConfig, true),
          },
        ],
        exact: true,
      }),
      renderChildren(tmpConfig.children),
    ]
  },
})
