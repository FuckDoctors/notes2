// 插件 API
// https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html#%E6%8F%92%E4%BB%B6-api

import { path } from '@vuepress/utils'
import type { App, PluginFunction } from '@vuepress/core'

import { addViteSsrExternal, addViteOptimizeDepsInclude } from 'vuepress-shared'

import type { MdEnhanceOptions } from './shared'
import { usePlugins } from './usePlugins'
import { playground } from './node/markdown-it'
import { PLAYGROUND_DEFAULT_SETTING } from './shared'

export const mdEnhancePlugin =
  (options: MdEnhanceOptions): PluginFunction =>
  (app: App) => {
    // 使用插件
    usePlugins(app, options)

    return {
      name: 'vuepress-plugin-md-enhance-zhaobc',

      define: (): Record<string, unknown> => ({
        MARKDOWN_ENHANCE_DELAY: options.delay || 500,

        PLAYGROUND_OPTIONS: {
          ...PLAYGROUND_DEFAULT_SETTING,
          ...(typeof options.playgroundZhaobc === 'object'
            ? options.playgroundZhaobc
            : {}),
        },
      }),

      extendsBundlerOptions: (config: unknown, app: App): void => {
        // if (options.echarts) {
        //   addViteOptimizeDepsInclude({ app, config }, ['echarts'])
        //   addViteSsrExternal({ app, config }, 'echarts')
        // }

        if (options.playgroundZhaobc) {
          addViteOptimizeDepsInclude(config, app, '@vue/repl')
          addViteSsrExternal(config, app, '@vue/repl')
        }
      },

      // 扩展markdown
      extendsMarkdown: (md): void => {
        if (options.playgroundZhaobc) {
          md.use(playground)
        }
      },
      onInitialized: (app: App): void => {},
      clientConfigFile: path.resolve(__dirname, './client/appEnhance.ts'),
    }
  }
