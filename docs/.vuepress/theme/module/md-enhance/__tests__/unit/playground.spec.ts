import MarkdownIt from 'markdown-it'
import MarkdownContainer from 'markdown-it-container'

import { playgroundRender } from '../../node/markdown-it/playground'

import { describe, expect, it } from 'vitest'

describe('playground', () => {
  const markdownIt = MarkdownIt({ linkify: true })
  // markdownIt.use(MarkdownContainer, 'code-group')
  markdownIt.use(MarkdownContainer, 'playground', {
    render: playgroundRender,
  })

  it('Should resolve playground info', () => {
    expect(
      markdownIt.render(
        `
::: playground Playground demo

::: code-tabs

@tab App.vue

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

@tab Comp.vue

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

:::

::: imports

\`\`\`json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
\`\`\`

:::

::::
`,
        {}
      )
    ).toMatchSnapshot()
  })

  it('Should resolve playground info with settings', () => {
    expect(
      markdownIt.render(
        `
::: playground Playground demo2

::: code-tabs

@tab App.vue

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

@tab Comp.vue

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

:::

::: settings

\`\`\`json
{
  "base": "https://element-plus.run/"
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
