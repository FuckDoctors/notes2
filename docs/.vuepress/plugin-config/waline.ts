import type { WalinePluginOptions } from '@vuepress/plugin-comment'

export const waline: WalinePluginOptions = {
  provider: 'Waline',
  serverURL: '//waline.zhaobc.site',
  reaction: true,
  pageview: true,
}
