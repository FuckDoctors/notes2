// import { echartsRender } from './node/markdown-it'

// import { containerPlugin } from '@vuepress/plugin-container'
import type { App } from '@vuepress/core'
import type { MdEnhanceOptions } from './shared'

export const usePlugins = (
  app: App,
  markdownOptions: MdEnhanceOptions
): void => {
  // if (markdownOptions.echarts) {
  //   app.use(
  //     containerPlugin({
  //       type: 'echarts',
  //       render: echartsRender,
  //     })
  //   )
  // }
}
