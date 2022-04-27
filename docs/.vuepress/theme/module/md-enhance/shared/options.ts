export interface MdEnhanceOptions {
  echarts?: boolean
  example?: boolean
  playground?: boolean | PlaygroundOptions
  delay?: number
}

export interface PlaygroundOptions {
  base?: string
  option?: object
}
