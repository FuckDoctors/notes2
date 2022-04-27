import { utoa } from '../../../../shared/utils'

interface SourceConfig {
  [key: string]: string
}

import type { PlaygroundOptions } from '../../shared'

const playgroundBase = 'https://sfc.vuejs.org/'

export const usePlayground = (
  config: string,
  options: PlaygroundOptions = null
) => {
  const configObj = JSON.parse(decodeURIComponent(config))

  const sourceConfig: SourceConfig = {}

  for (const key in configObj) {
    if (configObj.hasOwnProperty(key)) {
      sourceConfig[key] = configObj[key].content
    }
  }

  const encoded = utoa(JSON.stringify(sourceConfig))
  let link
  if (options) {
    const { base, option } = options
    let baseUrl = base
    if (baseUrl) {
      baseUrl = baseUrl.replace(/\/+$/g, '')
    } else {
      baseUrl = playgroundBase
    }

    let optionString
    if (option) {
      optionString = new URLSearchParams(option).toString()
    }

    link = optionString
      ? `${baseUrl}?${optionString}#${encoded}`
      : `${baseUrl}#${encoded}`
  } else {
    link = `${playgroundBase}#${encoded}`
  }
  console.log(link)

  return {
    encoded,
    link,
  }
}
