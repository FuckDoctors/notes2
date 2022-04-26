import { echartsRender, playgroundRender } from './node/markdown-it'

import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import type { App } from '@vuepress/core'
import type { MdEnhanceOptions } from './shared'

export const usePlugins = (
  app: App,
  markdownOptions: MdEnhanceOptions
): void => {
  if (markdownOptions.echarts) {
    app.use('@vuepress/container', {
      type: 'echarts',
      render: echartsRender,
    })
  }
  if (markdownOptions.playground) {
    app.use('@vuepress/container', {
      type: 'playground',
      render: playgroundRender,
    })
  }
}
