---
index: 90
dir:
  text: 其他内容
  index: 90
sidebarText: 其他
icon: note
category:
  - 笔记
---

# 其他内容

## ECharts 示例

::: echarts echarts demo

```json
{
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "data": [150, 230, 224, 218, 135, 147, 260],
      "type": "line",
      "smooth": true
    }
  ]
}
```

:::

## Playground 示例

::::: playground playground demo2

:::: code-group

::: code-group-item App.vue

```vue
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

:::

::: code-group-item Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

:::

::: imports

```json
{
  "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
}
```

:::

::::

:::::
