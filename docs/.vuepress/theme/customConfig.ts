import { MdEnhanceOptions } from './module/md-enhance'

export interface CustomConfig {
  mdEnhance?: MdEnhanceOptions
}

export const customConfig: CustomConfig = {
  mdEnhance: {
    echarts: true,
  },
}

export default customConfig
