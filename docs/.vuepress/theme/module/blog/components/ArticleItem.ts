import { withBase } from '@vuepress/client'
import { computed, defineComponent, h, resolveComponent, toRef } from 'vue'
import { RouterLink } from 'vue-router'

import {
  LockIcon,
  SlideIcon,
  // 去掉原来的置顶图标
  // StickyIcon,
} from 'vuepress-theme-hope/lib/client/module/blog/components/icons'
import { useArticleInfo } from 'vuepress-theme-hope/lib/client/module/blog/composables'
import { usePathEncrypt } from 'vuepress-theme-hope/lib/client/module/encrypt/composables'

import type { PropType, VNode } from 'vue'
import type { ArticleInfo } from 'vuepress-theme-hope/lib/shared'

import 'vuepress-theme-hope/lib/client/module/blog/styles/article-item.scss'

// 更换自己的置顶图标
import { StickyIcon } from './icons'

export default defineComponent({
  name: 'ArticleItem',

  props: {
    info: {
      type: Object as PropType<ArticleInfo>,
      required: true,
    },
    path: { type: String, required: true },
  },

  setup(props) {
    const info = toRef(props, 'info')
    const { getPathEncryptStatus } = usePathEncrypt()

    const isEncrypted = computed(() => getPathEncryptStatus(props.path))

    const articleInfo = useArticleInfo(info)

    return (): VNode =>
      h(
        'article',
        {
          class: 'article',
          vocab: 'https://schema.org/',
          typeof: 'Article',
        },
        [
          info.value.sticky ? h(StickyIcon) : null,
          h(
            'header',
            { class: 'title' },
            h(
              RouterLink,
              {
                to: props.path,
              },
              () => [
                isEncrypted.value ? h(LockIcon) : null,
                info.value.type === 'slide' ? h(SlideIcon) : null,
                h('span', { property: 'headline' }, info.value.title),
                info.value.cover
                  ? h('meta', {
                      property: 'image',
                      content: withBase(info.value.cover),
                    })
                  : null,
              ]
            )
          ),
          info.value.excerpt
            ? h('div', { class: 'excerpt', innerHTML: info.value.excerpt })
            : null,
          h('hr', { class: 'hr' }),
          h(resolveComponent('ArticleInfo'), articleInfo),
        ]
      )
  },
})
