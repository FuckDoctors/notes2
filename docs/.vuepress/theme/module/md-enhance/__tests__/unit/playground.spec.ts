import MarkdownIt = require('markdown-it')
import MarkdownContainer = require('markdown-it-container')

import { playgroundRender } from '../../node/markdown-it/playground'

import { describe, expect, it } from 'vitest'

describe('playground', () => {
  const markdownIt = MarkdownIt({ linkify: true })
  markdownIt.use(MarkdownContainer, 'playground', {
    render: playgroundRender,
  })

  it('Should resolve playground info', () => {
    expect(
      markdownIt.render(
        `
:::: playground playground demo

::: file App.vue
\`\`\`js
const foo = 'foo'
\`\`\`
:::

::: file Comp.vue
\`\`\`vue
const bar = 'bar'
\`\`\`
:::

::: imports
\`\`\`json
{
  "vue": "vue.js"
}
\`\`\`
:::

::::
`,
        {}
      )
    ).toMatchSnapshot()
  })
})
