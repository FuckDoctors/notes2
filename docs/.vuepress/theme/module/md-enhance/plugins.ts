// 插件 API
// https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html#%E6%8F%92%E4%BB%B6-api

import { path } from '@vuepress/utils'
import type { App, Plugin, PluginConfig } from '@vuepress/core'

// import noopModule from '../../shared/noopModule'

import {
  addViteSsrExternal,
  addViteOptimizeDepsInclude,
  noopModule,
} from '@mr-hope/vuepress-shared'

import { MdEnhanceOptions } from './shared'
import { usePlugins } from './usePlugins'

export const mdEnhancePlugin: Plugin<MdEnhanceOptions> = (
  options: MdEnhanceOptions,
  app: App
) => {
  // 使用插件
  usePlugins(app, options)

  return {
    name: 'vuepress-plugin-md-enhance-zhaobc',
    // 别名
    alias: {
      '@MdECharts': options.echarts
        ? path.resolve(__dirname, './client/components/ECharts.ts')
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_DELAY: options.delay || 500,
    }),

    // 扩展markdown
    extendsMarkdown: (markdownIt): void => {},
    onInitialized: (app: App): void => {
      if (options.echarts) {
        addViteOptimizeDepsInclude(app, ['echarts'])
        addViteSsrExternal(app, 'echarts')
      }
    },
    clientAppEnhanceFiles: path.resolve(__dirname, './client/appEnhance.ts'),
  }
}

export const mdEnhance = (
  options: MdEnhanceOptions | false
): PluginConfig<MdEnhanceOptions> => ['md-enhance-zhaobc', options]
