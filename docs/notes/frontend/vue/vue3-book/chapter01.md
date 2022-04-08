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

# 第 1 章 权衡的艺术

## 1.1 命令式和声明式

从范式上来看，视图层框架通常分为命令式和声明式。

- 命令式**关注过程**
- 声明式**关注结果**

早年流行的 jQuery 是典型的命令式框架，Vue.js 是声明式框架。

例如，我们把下面的这段话翻译成对应的代码：

```txt
- 获取 id 为 app 的 div 标签
- 它的文本内容为 hello world
- 为其绑定点击事件
- 当点击时弹出提示：ok
```

jQuery 代码：

```js
$('#app')
  .text('hello world')
  .on('click', () => {
    alert('ok')
  })
```

原生 JavaScript 代码：

```js
const div = document.querySelector('#app')
div.innerText = 'hello world'
div.addEventListener('click', () => {
  alert('ok')
})
```

以上代码本身是在描述“做事的过程”。

Vue.js 代码：

```vue
<div
  @click="
    () => {
      alert('ok')
    }
  "
>hello world</div>
```

可以看到，我们提供的是一个“结果”，至于如何实现这个“结果”，我们并不关心。实现这个“结果”，是 Vue.js 帮我们实现的，它内部是**命令式**的，而暴露给用户的却更加**声明式**。

## 1.2 性能与可维护性的权衡

命令式和声明式各有优缺点，在框架设计方面，则体现在性能与可维护性的权衡。这里先抛出一个结论：**声明式代码的性能不优于命令式代码的性能**。

**毕竟框架本省就是封装了命令式代码才实现了面向用户的声明式**。

## 1.3 虚拟 DOM 的性能到底如何

性能：**声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改的性能消耗**

如果我们能够**最小化找出差异的性能消耗**，就可以让声明式代码的性能无限接近命令式的性能。

涉及 DOM 的运算要远比 JavaScript 层面的计算性能差。

虚拟 DOM 在创建页面时的性能：**创建 JavaScript 对象的计算量 + 创建真实 DOM 的计算量**

虚拟 DOM 在更新页面时的性能：**创建新的 JavaScript 对象 + Diff + 渲染 HTML 字符串**

## 1.4 运行时和编译时

设计框架的三种选择：

- 纯运行时
- 运行时 + 编译时
- 编译时

设计一个运行时框架，为它提供一个 Render 函数，Render 函数根据用户提供的树形结构的数据对象，渲染成 DOM 元素。

规定树形结构的数据对象如下：

```js
const obj = {
  tag: 'div',
  children: [
    {
      tag: 'span',
      children: 'hello world',
    },
  ],
}
```

每个对象有两个属性：

- tag 代表标签名称
- children 即可以是一个数据组（代表子节点），也可以直接是一个文本（代表文本节点）

Render 函数如下：

```js
function Render(obj, root) {
  const el = document.createElement(obj.tag)
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children)
    el.appendChild(text)
  } else if (obj.children) {
    // 数组，递归调用Render，使用el作为root参数
    obj.children.forEach((child) => Render(child, el))
  }

  //  将元素添加到root
  root.appendChild(el)
}
```

使用

```js
Render(obj, document.body)
```
