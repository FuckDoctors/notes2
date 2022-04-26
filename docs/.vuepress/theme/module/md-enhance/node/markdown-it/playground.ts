import { hash } from '@vuepress/utils'
import type Token from 'markdown-it/lib/token'

const extensions = ['js', 'ts', 'vue', 'jsx', 'tsx', 'json']

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
    if (!content) continue

    if (type === 'inline') {
      const fileTitleReg = /^\s*::: *file\s*(.*)\s*$/u.exec(content)
      // const fileTitleReg = /^ *(?:file|imports)\s*(.*)\s*$/u.exec(info)
      const isImports = /^\s*::: *imports\s*$/u.test(content)

      if (!fileTitleReg && !isImports) {
        continue
      }

      if (isImports) {
        configKey = 'imports'
      } else {
        configKey = fileTitleReg[1]
      }
    }

    if (type === 'fence' && extensions.includes(info) && configKey) {
      codeConfigs[configKey] = {
        lang: info,
        content: content,
      }
    }
  }

  const config = encodeURIComponent(JSON.stringify(codeConfigs))

  return `<Playground title="${
    title?.[1] || ''
  }" id="${key}" config="${config}">`
}
