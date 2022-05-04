---
index: 10
icon: vue
category:
  - 笔记
  - frontend
  - vue
tag:
  - vue3
---

# 组合式函数

## 什么是“组合式函数”？

在 Vue 应用的概念中，“组合式函数”是一个利用 Vue 组合式 API 来封装和复用**有状态逻辑**的函数。

当构建前端应用时，我们常常需要复用公共任务的逻辑，可以封装为**无状态的逻辑**。有状态逻辑负责管理会随时间而变化的状态。

## 鼠标跟踪器示例

如果我们想在多个组件中复用这个相同的逻辑，我们可以把这个逻辑以一个组合式函数的形式提取到外部文件中。

::::: playground 鼠标跟踪器示例
:::: code-group

::: code-group-item App.vue

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>
  Mouse position is at {{ x }}, {{ y }}
</template>
```

:::

::: code-group-item mouse.js

```js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以 use 开头
export function useMouse() {
  // 被组合式封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时改变其管理的状态
  const update = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  // expose managed state as return value
  return { x, y }
}
```

:::

::::
:::::

如你所见，核心逻辑一点都没有被改变，我们做的只是把它移到一个外部函数中去，并返回需要暴露的状态。
然而更酷的一点是，你还可以嵌套多个组合式函数：一个组合式函数可以调用一个或多个其他的组合式函数。
这使得我们可以像使用多个组件组合成整个应用一样，用多个较小且逻辑独立的单元来组合形成复杂的逻辑。
实际上，这正是我们决定将实现了这一设计模式的 API 集合命名为组合式 API 的原因。

举个例子，我们可以将添加和清除 DOM 事件监听器的逻辑放入一个组合式函数中：

::::: playground 鼠标跟踪器示例 嵌套调用
:::: code-group

::: code-group-item App.vue

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>
  Mouse position is at {{ x }}, {{ y }}
</template>
```

:::

::: code-group-item mouse.js

```js
import { ref, onMounted, onUnmounted } from 'vue'
import { useEventListener } from './event.js'

// 按照惯例，组合式函数名以 use 开头
export function useMouse() {
  // 被组合式封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  // expose managed state as return value
  return { x, y }
}
```

:::

::: code-group-item event.js

```js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

:::

::::
:::::

## 异步状态示例

`useMouse()` 组合式函数没有接收任何参数，因此让我们再来看一个需要接收一个参数的组合式函数示例。
在做异步数据请求时，我们常常需要处理不同的状态：加载中、加载成功和加载失败。

::::: playground 异步状态示例
:::: code-group

::: code-group-item App.vue

```vue
<script setup>
import { ref, computed } from 'vue'
import { useFetch } from './useFetch.js'

const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
const id = ref('1')
const url = computed(() => baseUrl + id.value)

const { data, error, retry } = useFetch(url)
</script>

<template>
Load todo id: 
<button v-for="i in 5" @click="id = i">{{ i }}</button>

<div v-if="error">
  <p>Oops! Error encountered: {{ error.message }}</p>
  <button @click="retry">Retry</button>
</div>
<div v-else-if="data">
  Data Loaded:
  <pre>{{ data }}</pre>
</div>
<div v-else>Loading...</div>
</template>
```

:::

::: code-group-item useFetch.js

```js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // reset state before fetching..
    data.value = null
    error.value = null

    // unref() unwraps potential refs
    fetch(unref(url))
      .then(res => res.json())
      .then(json => data.value = json)
      .error(err => error.value = err)
  }

  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
    watchEffect(doFetch)
  } else {
    // otherwise, just fetch once
    // and avoid the overhead of a watcher
    // 避免监听器的额外开销
    doFetch()
  }

  return { data, error, retry: doFetch }
}
```

:::

::::
:::::

这个版本的 useFetch() 现在同时可以接收静态的 URL 字符串和 URL 字符串的 ref。
当通过 isRef() 检测到 URL 是一个动态 ref 时，它会使用 watchEffect() 启动一个响应式的 effect。
该 effect 会立刻执行一次，并在此过程中将 URL 的 ref 作为依赖进行跟踪。
当 URL 的 ref 发生改变时，数据就会被重置，并重新请求。

## 约定和最佳实践

### 命名

组合式函数约定用驼峰命名法命名，并以 `use` 作为开头。
