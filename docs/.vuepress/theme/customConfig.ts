import { MdEnhanceOptions } from './module/md-enhance'

export interface CustomConfig {
  mdEnhance?: MdEnhanceOptions
}

export const customConfig: CustomConfig = {
  mdEnhance: {
    echarts: true,
    playground: true,
    // playground: {
    //   base: 'https://element-plus.run/',
    //   option: {
    //     showOutput: true
    //   }
    // }
  },
}

export default customConfig
