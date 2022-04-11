---
index: 30
icon: vue
category:
  - 笔记
  - frontend
  - vue
tag:
  - vue3
---

# 第 3 章 Vue.js 3 的设计思路

## 3.1 声明式地描述 UI

Vue.js 3 的声明式解决方案

- 使用与 HTML 标签 一致的方式描述**DOM 元素**
- 使用与 HTML 标签 一致的方式描述**属性**
- 使用`:`或`v-bind`描述动态绑定的**属性**
- 使用`@`或`v-on`来描述**事件**
- 使用与 HTML 标签 一致的方式描述**层级结构**

除了使用**模板**来声明式地描述 UI 之外，我们还可以用 JavaScript 对象来描述，如下所示：

```js
const title = {
  // 标签名称
  tag: 'h1',
  // 标签属性
  props: {
    onClick: handler,
  },
  // 子节点
  children: [
    {
      tag: 'span',
    },
  ],
}
```

对应的 Vue.js 模板：

```vue
<h1 @click="handler"><span></span></h1>
```

如果要动态生成 `h1`- `h6` 标签的话，可以设置一个变量 `tag: h${level}`，这时 JavaScript 的形式就比较灵活。

Vue.js 3 除了支持使用模板描述 UI 外， 还支持使用虚拟 DOM 描述 UI 。

```js
import { h } from 'vue'

export default {
  render() {
    return h('h1', { onClick: handler }) // 虚拟 DOM
  },
}
```

等价于：

```js
import { h } from 'vue'

export default {
  render() {
    return {
      tag: 'h1',
      props: {
        onClick: handler,
      },
    }
  },
}
```

上面的 `h` 函数是一个辅助创建虚拟 DOM 的工具函数。Vue.js 会根据组件的**渲染函数**的返回值拿到虚拟 DOM，然后把组件的内容渲染出来。
上面代码中的`render`函数就是渲染函数。

## 3.2 初识渲染器

虚拟 DOM 是 JavaScript 对象来描述真实 DOM 结构，然后通过**渲染器**将虚拟 DOM 渲染成真实 DOM。

渲染器非常重要，大家平时编写的 Vue.js 组件都是依赖渲染器来工作的。

假设我们有如下的虚拟 DOM:

```js
const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello'),
  },
  children: 'click me',
}
```

接下来，编写一个**渲染器**，把上面的虚拟 DOM 渲染为真实 DOM:

```js
function renderer(vnode, container) {
  // 使用vnode.tag作为标签名称创建 DOM
  const el = document.createElement(vnode.tag)
  // 遍历 vnode.props，将属性，事件添加到 DOM 元素
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      // 如果 key 以 on 开头，说明是事件
      el.addEventListener(
        key.substr(2).toLowerCase(), // 事件名称 onClick -> click
        vnode.props[key] // 事件处理函数
      )
    }
  }

  // 处理 children
  if (typeof vnode.children === 'string') {
    // 如果 children 是 字符串，说明它是文本子节点
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    // 递归调用 renderer 函数，渲染子节点
    node.children.forEach((child) => renderer(child, el))
  }

  // 将元素添加到挂载点下
  container.appendChild(el)
}
```

使用：

```js
renderer(vnode, document.body)
```

::: note 执行效果

<div id="renderer-demo1"></div>
:::

::: demo 渲染器示例

```html
<div id="renderer-demo1"></div>
```

```js
const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello'),
  },
  children: 'click me',
}

function renderer(vnode, container) {
  // 使用vnode.tag作为标签名称创建 DOM
  const el = window.document.createElement(vnode.tag)
  // 遍历 vnode.props，将属性，事件添加到 DOM 元素
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      // 如果 key 以 on 开头，说明是事件
      el.addEventListener(
        key.substr(2).toLowerCase(), // 事件名称 onClick -> click
        vnode.props[key] // 事件处理函数
      )
    }
  }

  // 处理 children
  if (typeof vnode.children === 'string') {
    // 如果 children 是 字符串，说明它是文本子节点
    el.appendChild(window.document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    // 递归调用 renderer 函数，渲染子节点
    node.children.forEach((child) => renderer(child, el))
  }

  // 将元素添加到挂载点下
  container.appendChild(el)
}

renderer(vnode, window.document.querySelector('#renderer-demo1'))
```

:::

## 3.3 组件的本质

一句话总结：**组件就是一组 DOM 元素的封装**。

这组 DOM 元素就是组件要渲染的内容，因此我们可以定义一个函数来代表组件，而函数的返回值就代表组件要渲染的内容：

```js
const MyComponent = function () {
  return {
    tag: 'div',
    props: {
      onClick: = () => alert('hello')
    },
    children: 'click me'
  }
}
```

用虚拟 DOM 来描述组件：

```js
const vnode = {
  tag: MyComponent,
}
```

就想 `tag: 'div'` 一样，用 `tag: MyComponent` 来描述组件。为了能渲染组件，修改前面的 renderer 函数：

```js
function renderer(vnode, container) {
  if (typeof vnode.tag === 'string') {
    // 说明 vnode 描述的是元素
    mountElement(vnode, container)
  } else if if (typeof vnode.tag === 'function') {
    // 说明 vnode 描述的是组件
    mountComponent(vnode, container)
  }
}
```
