import { MdEnhanceOptions } from './module/md-enhance'

export interface CustomConfig {
  mdEnhance: MdEnhanceOptions
}

export const customConfig: CustomConfig = {
  mdEnhance: {
    // 关闭自定义主题的echarts，使用 hope 的 echarts （已PR）
    echarts: false,
    // playground: true,
    // hope里已经PR过playground，并且hope已经重构了，
    // 为了避免冲突，保留自己已有的playground，这里重命名了。
    playgroundZhaobc: {
      mode: 'external', // 使用外置模式
      external: {
        // base: 'https://sfc.vuejs.org/', // 使用 vue sfc playground.
        // defaultImportsMap: 'import-map.json',
        base: 'https://vue-sfc-playground.vercel.app/', // 使用 vue sfc playground.
        defaultImportsMap: 'user-imports.json',
        options: {
          showOutput: 'true',
        },
      },
      internal: {
        defaultImportsMap: 'import-map.json',
        showCode: false, // 不显示代码
        showCompileOutput: false, // 不显示 js, css, ssr 面板
        showImportMap: true, // 显示 import map
        clearConsole: false, // 不清空控制台
      },
    },
  },
}

export default customConfig
