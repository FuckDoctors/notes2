export interface MdEnhanceOptions {
  echarts?: boolean
  playground?: boolean | PlaygroundOptions
  delay?: number
}

export interface PlaygroundOptions {
  base?: string
  option?: object
}
