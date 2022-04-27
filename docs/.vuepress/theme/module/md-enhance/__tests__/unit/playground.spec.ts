import MarkdownIt from 'markdown-it'
import MarkdownContainer from 'markdown-it-container'

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
::::: playground playground demo2

:::: code-group

::: code-group-item App.vue

\`\`\`vue
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

:::

::: code-group-item Comp.vue

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

:::

::: imports

\`\`\`json
{
  "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
}
\`\`\`

:::

::::

:::::
`,
        {}
      )
    ).toMatchSnapshot()
  })
})
