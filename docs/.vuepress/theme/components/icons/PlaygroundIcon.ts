import type { VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { useRouteLocale } from 'vuepress/client'

import LinkIcon from './LinkIcon'

const link = 'https://play.zhaobc.site'

interface LocaleConfig {
  label?: string
}

const locales: Record<string, LocaleConfig> = {
  '/zh/': {
    label: '演练场',
  },
  '/en/': {
    label: 'Playground',
  },
  '/': {
    label: '演练场',
  },
}

export default defineComponent({
  name: 'PlaygroundIcon',

  setup() {
    const routeLocale = useRouteLocale()

    const label = computed(() => locales[routeLocale.value].label)

    return (): VNode =>
      h(
        'div',
        {
          class: 'vp-nav-item vp-action hide-in-mobile',
        },
        h(LinkIcon, {
          link,
          target: '_blank',
          // icon: 'code',
          icon: '/assets/icon/playground.svg',
          label: label.value,
          size: 20,
          class: 'vp-action-link',
        })
      )
  },
})
