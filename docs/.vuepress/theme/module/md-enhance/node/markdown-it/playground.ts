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

  let configKey
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
      const isImports = /^\s*::: *imports\s*$/u.test(content)
      if (!isImports) {
        configKey = null
        continue
      }
      configKey = importKey
    }

    if (!content) continue

    if (type === 'fence' && extensions.includes(info) && configKey) {
      if (importKey === configKey) {
        codeConfigs[configKey] = {
          lang: info,
          content: `{\n  "imports": ${content}\n  }`,
        }
      } else {
        codeConfigs[configKey] = {
          lang: info,
          content: content,
        }
      }
    }
  }

  const config = encodeURIComponent(JSON.stringify(codeConfigs))

  return `<Playground title="${
    title?.[1] || ''
  }" id="${key}" config="${config}">`
}
