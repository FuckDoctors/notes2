---
index: 40
icon: vue
category:
  - 笔记
  - frontend
  - vue
tag:
  - vue3
---

# 第 4 章 响应系统的作用与实现

响应系统是 Vue.js 的重要组成部分，Vue.js 3 采用 Proxy 实现响应式数据。

## 4.1 响应式数据与副作用函数

副作用函数是指会产生副作用的函数。副作用函数的执行会直接或间接影响其他的变量或其他函数的执行。

如下所示：

```js
const state = { text: null }
const obj = { text: 'hello world' }
function effect() {
  state.text = obj.text
  document.body.innerText = obj.text
}
```

effect 执行会读取 obj，并设置 state，以及更改 DOM 元素，这个就是副作用。

但是，obj.text 改了之后，并不会自动执行 effect 函数。

## 4.2 响应式数据的基本实现

观察可以看出：

- 副作用函数 effect 执行时，会出发 obj.text 的**读取**操作
- 修改 obj.text 时，会触发**设置**操作

如果我们能拦截一个对象的读取和设置操作，那么就能做一些额外的操作。

在ES2015之前只能通过 Object.defineProperty 函数实现，这也是 Vue.js 2 所采用的方式。在 ES2015+ 中，可以使用代理对象 Proxy 来实现，这也是 Vue.js 3 所采用的方式。

::: note Proxy 示例
<div id="effect-proxy-demo"></div>
:::

::: demo Proxy 示例

```html
<div id="effect-proxy-demo"></div>
<button onclick="changeText()">Change Text</button>
```

```js
// 存储副作用函数的桶
const bucket = new Set()

// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 effect 添加到副作用函数桶中
    bucket.add(effect)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶中取出来并执行
    bucket.forEach(fn => fn())
    // 返回 true 代表 设置成功
    return true
  }
})

// 副作用函数
function effect() {
  window.document.querySelector('#effect-proxy-demo').innerText = obj.text
}

// 执行副作用函数，触发读取
effect()

function changeText() {
  obj.text = 'hello vue3'
}

```

:::

上述示例，可以达到响应式的结果。

## 4.3 设计一个完善的响应式系统
