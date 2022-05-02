import { hash } from '@vuepress/utils'
import type Token from 'markdown-it/lib/token'

const extensions = ['js', 'ts', 'vue', 'jsx', 'tsx', 'json']
const importKey = 'import-map.json'

export const playgroundRender = (tokens: Token[], index: number): string => {
  const { nesting, info } = tokens[index]
  const title = /^ *playground\s*(.*)\s*$/u.exec(info)
  const key = `playground-${hash(index)}`

  if (nesting === -1) return `</Playground>`

  const codeConfigs = {}
  let settings: string = null

  let configKey
  let isSettings
  for (let i = index; i < tokens.length; i++) {
    // console.log(i, tokens[i])
    const { type, content, info } = tokens[i]

    if (type === 'container_playground_close') break

    if (type === 'container_code-group-item_open') {
      const fileTitleReg = /^ *code-group-item\s*(.*)\s*$/u.exec(info)
      if (!fileTitleReg) {
        continue
      }
      configKey = fileTitleReg[1]
    } else if (type === 'inline') {
      configKey = null
      // const isImports = /^\s*::: *imports\s*$/u.test(content)
      const imports = /^\s*::: *imports\s*(.*)\s*$/u.exec(content)

      isSettings = /^\s*::: *settings\s*$/u.test(content)

      if (imports) {
        const importMap = imports[1]
        if (importMap.length > 1) {
          configKey = imports[1]
        } else {
          configKey = importKey
        }
      } else if (isSettings) {
        // ...
      } else {
        continue
      }
    }

    if (!content) continue

    if (type === 'fence' && extensions.includes(info) && configKey) {
      if (importKey === configKey) {
        codeConfigs[configKey] = {
          lang: info,
          content: `{\n  "imports": ${content}  }`,
        }
      } else {
        codeConfigs[configKey] = {
          lang: info,
          content: content,
        }
      }
    }

    if (type === 'fence' && info === 'json' && isSettings) {
      settings = content.replace(/^\s+|\s+$/g, '').replace(/\/+$/, '')
    }
  }

  const config = encodeURIComponent(JSON.stringify(codeConfigs))
  const settingString = settings
    ? encodeURIComponent(settings)
    : encodeURIComponent('{}')

  return `<Playground title="${title?.[1] || ''}"
  id="${key}"
  settings="${settingString}"
  config="${config}">`
}
