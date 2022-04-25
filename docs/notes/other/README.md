---
index: true
sidebarText: 概述
icon: note
category:
  - 笔记
---

# 其他内容

## 概述

其他内容

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

:::: playground playground demo

::: file App.vue

```js
const foo = 'foo'
```

:::

::: file Comp.vue

```vue
const bar = 'bar'
```

:::

::: imports

```json
{
  "vue": "vue.js"
}
```

:::

::::
