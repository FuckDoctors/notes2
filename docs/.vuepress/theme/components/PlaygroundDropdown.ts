import type { VNode } from 'vue'

import NavbarDropdown from '@theme-hope/components/navbar/NavbarDropdown'

import { computed, defineComponent, h, resolveComponent } from 'vue'
import { useRouteLocale } from 'vuepress/client'

interface LocaleConfig {
  playVue?: string
  playPython?: string
}
const localeData: Record<string, LocaleConfig> = {
  '/zh/': {
    playVue: '试玩 Vue',
    playPython: '试玩 Python',
  },
  '/en/': {
    playVue: 'Play Vue',
    playPython: 'Play Python',
  },
  '/': {
    playVue: '试玩 Vue',
    playPython: '试玩 Python',
  },
}

export default defineComponent({
  name: 'PlaygroundDropdown',

  setup() {
    const routeLocale = useRouteLocale()
    const locales = computed(() => localeData[routeLocale.value])

    return (): VNode =>
      h(
        'div',
        { class: 'vp-nav-item hide-in-mobile' },
        h(
          NavbarDropdown,
          {
            config: {
              children: [
                {
                  text: locales.value.playVue,
                  icon: 'vue',
                  link: 'https://play.zhaobc.site',
                },
                {
                  text: locales.value.playPython,
                  icon: 'python',
                  link: 'https://play-py.zhaobc.site',
                },
              ],
            },
          },
          {
            title: () =>
              h(resolveComponent('VPIcon'), {
                icon: 'code',
                size: 20,
              }),
          }
        )
      )
  },
})
