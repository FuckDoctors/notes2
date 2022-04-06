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

# 第1章 权衡的艺术

## 1.1 命令式和声明式

从范式上来看，视图层框架通常分为命令式和声明式。

- 命令式**关注过程**
- 声明式**关注结果**

早年流行的jQuery是典型的命令式框架，Vue.js是声明式框架。

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
  .on('click', () => { alert('ok') })
```

原生JavaScript 代码：

```js
const div = document.querySelector('#app')
div.innerText = 'hello world'
div.addEventListener('click', () => { alert('ok') })
```

以上代码本身是在描述“做事的过程”。

Vue.js 代码：

```vue
<div @click="() => { alert('ok') }">hello world</div>
```

可以看到，我们提供的是一个“结果”，至于如何实现这个“结果”，我们并不关心。实现这个“结果”，是Vue.js帮我们实现的，它内部是**命令式**的，而暴露给用户的却更加**声明式**。

## 1.2 性能与可维护性的权衡

命令式和声明式各有优缺点，在框架设计方面，则体现在性能与可维护性的权衡。这里先抛出一个结论：**声明式代码的性能不优于命令式代码的性能**。

**毕竟框架本省就是封装了命令式代码才实现了面向用户的声明式**。
