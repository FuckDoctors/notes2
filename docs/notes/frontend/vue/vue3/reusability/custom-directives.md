---
index: 20
icon: vue
category:
  - 笔记
  - frontend
  - vue
tag:
  - vue3
---

# 自定义指令

## 介绍

除了 Vue 内置的一系列指令 (比如 v-model 或 v-show) 之外，Vue 还允许你注册自定义的指令。

我们已经介绍了两种在 Vue 中重用代码的方式：**组件**和**组合式函数**。组件是主要的构建模块，而组合式函数则侧重于有状态的逻辑。另一方面，自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。

一个自定义指令被定义为一个包含类似于组件的生命周期钩子的对象。钩子接收指令绑定到的元素。下面是一个自定义指令的例子，当一个 input 元素被 Vue 插入到 DOM 中后，它将被聚焦：

::::: playground v-focus 指令
:::: code-group
::: code-group-item App.vue

```vue
<script>
const focus = {
  mounted: (el) => el.focus(),
}

export default {
  directives: {
    // 注册指令，在模板中启用 v-focus
    focus,
  },
}
</script>

<template>
  <input v-focus />
</template>
```

:::
::::
:::::

::::: playground 组合式 API v-focus 指令
:::: code-group
::: code-group-item App.vue

```vue
<script setup>
// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus(),
}
</script>

<template>
  <input v-focus />
</template>
```

:::
::::
:::::

和组件类似，自定义指令在模板中使用前必须先注册。在上面的例子中，我们使用 directives 选项完成了指令的局部注册。

将一个自定义指令全局注册到应用层级也是一种通用的做法：

```js
const app = createApp({})

// 全局注册，使 v-focus 在所有组件中都可用
app.directive('focus', {
  // ...
})
```

::: tip
只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令。应该尽可能地通过像 `v-bind` 这样的内置指令以使用声明式的模板，因为这更高效，且对服务端渲染也更友好。
:::

## 指令钩子

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js

```
