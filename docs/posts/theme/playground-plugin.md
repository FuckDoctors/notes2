---
original: true
sticky: 91
star: 91
article: true
date: 2022-05-02
category:
  - theme
  - playground
tag:
  - vuepress
  - theme
  - markdown
  - playground
head:
  - - meta
    - name: description
      content: Vue SFC Playground
---

# Playground 插件

让你的 VuePress 站点中的 Markdown 文件支持 [Vue SFC Playground](https://sfc.vuejs.org/) 类似的代码案例。

<!-- more -->

## 配置

```ts {4-10}
// cunstomConfig.ts
export const customConfig: CustomConfig = {
  mdEnhance: {
    // playground: true,
    playground: {
      base: 'https://vue-sfc-playground.vercel.app/',
      option: {
        showOutput: true,
      },
    },
  },
}
```

- `playground` 设为 `true` 时，启用默认的 Playground 配置，即 Vue3 官方的 Playground。
- `playground` 设为 对象时，则使用配置项指定的内容来显示 Playground。
- 另外，`playground` 还支持个别设置 `base` 和 `imports`，稍后为你介绍。

## 语法

为了简单方便，你只需配合 `CodeGroup` 和 `CodeGroupItem` 即可。
每一个 `CodeGroupItem` 为一个 `.vue` 文件。

使用 `imports` 和 `settings` 可为每个 Playground 自定义配置。

使用方法如下：

### 使用主题默认配置

````md
::::: playground playground demo
:::: code-group
::: code-group-item App.vue

```vue
<template>
  <div>App</div>
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
::::
:::::
````

### 使用个别配置

使用个别配置的 `base` 和 `imports`，以 Element Plus 为例。

````md
::::: playground customize playground demo
:::: code-group
::: code-group-item App.vue

```vue
<template>
  <div>App</div>
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
::::

::: imports import_map.json

```json
{
  "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
}
```

:::

::: settings

```json
{
  "base": "https://element-plus.run/"
}
```

:::

:::::
````

## 案例

### 使用主题默认配置的案例

::::: playground playground demo
:::: code-group
::: code-group-item App.vue

```vue
<script setup>
import { ref } from 'vue'
import Comp from './Comp.vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <div>
    <Comp />
  </div>
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
::::
:::::

:::::: details 代码

````md
::::: playground playground demo
:::: code-group
::: code-group-item App.vue

```vue
<script setup>
import { ref } from 'vue'
import Comp from './Comp.vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <div>
    <Comp />
  </div>
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
::::
:::::
````

::::::

### 使用个别配置的案例

使用个别配置的 `base` 和 `imports`。

::::: playground Element-Plus demo
:::: code-group
::: code-group-item App.vue

```vue
<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
  <el-row>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </el-row>
</template>

<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>
```

:::
::::

::: imports import_map.json

```json
{
  "a": "b"
}
```

:::

::: settings

```json
{
  "base": "https://element-plus.run/"
}
```

:::

:::::

:::::: details 代码

````md
::::: playground Element-Plus demo
:::: code-group
::: code-group-item App.vue

```vue
<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
  <el-row>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </el-row>
</template>

<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>
```

:::
::::

::: imports import_map.json

```json
{
  "a": "b"
}
```

:::

::: settings

```json
{
  "base": "https://element-plus.run/"
}
```

:::

:::::
````

::::::
