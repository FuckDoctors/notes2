import { MdEnhanceOptions } from './module/md-enhance'

export interface CustomConfig {
  mdEnhance?: MdEnhanceOptions
}

export const customConfig: CustomConfig = {
  mdEnhance: {
    // 关闭自定义主题的echarts，使用 hope 的 echarts （已PR）
    echarts: false,
    // playground: true,
    playground: {
      base: 'https://vue-sfc-playground.vercel.app/',
      option: {
        showOutput: true,
      },
    },
  },
}

export default customConfig
