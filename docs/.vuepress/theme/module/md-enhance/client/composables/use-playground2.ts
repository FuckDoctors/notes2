import { utoa } from '../../../../shared/utils'

interface SourceConfig {
  [key: string]: string
}

export const usePlayground = (config: string) => {
  const configObj = JSON.parse(decodeURIComponent(config))

  const sourceConfig: SourceConfig = {}

  for (const key in configObj) {
    if (configObj.hasOwnProperty(key)) {
      sourceConfig[key] = configObj[key].content
    }
  }

  const encoded = utoa(JSON.stringify(sourceConfig))
  const link = `https://sfc.vuejs.org/#${encoded}`

  return {
    encoded,
    link,
  }
}
