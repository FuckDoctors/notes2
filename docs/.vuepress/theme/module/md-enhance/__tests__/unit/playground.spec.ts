import { describe, expect, it } from 'vitest'
import MarkdownIt from 'markdown-it'

import { playground } from '../../node/markdown-it'

describe('playground', () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(playground)

  it('Should resolve playground info', () => {
    expect(
      markdownIt.render(
        `
::: playground-zhaobc Playground demo
@file App.vue
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
@file Comp.vue
\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`
@imports
\`\`\`json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
\`\`\`
:::
`,
        {}
      )
    ).toMatchSnapshot()
  })

  it('Should resolve playground info with settings', () => {
    expect(
      markdownIt.render(
        `
::: playground-zhaobc Playground demo2
@file App.vue
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
@file Comp.vue
\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`
@settings
\`\`\`json
{
  "mode": "external",
  "external": {
    "base": "https://element-plus.run/"
  }
}
\`\`\`
:::
`,
        {}
      )
    ).toMatchSnapshot()
  })

  it('Should resolve playground info with settings', () => {
    expect(
      markdownIt.render(
        `
::: playground-zhaobc#customId Playground demo2
@file App.vue
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
@imports user-imports.json
\`\`\`json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
\`\`\`
@settings
\`\`\`json
{
  "mode": "external",
  "external": {
    "base": "https://element-plus.run/"
  }
}
\`\`\`
:::
`,
        {}
      )
    ).toMatchSnapshot()
  })
})
