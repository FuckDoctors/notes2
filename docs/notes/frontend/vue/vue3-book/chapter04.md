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

从上一节中看出，一个响应式系统的工作流如下：

- 当**读取**操作发生时，将副作用收集到桶中
- 当**设置**操作发生时，从桶中取出副作用函数并执行

上节中的副作用函数 effect 硬编码，不合适，我们要做的是，哪怕副作用是匿名函数也能够被正确的收集。
为了实现这一点，我们需要提供一个用来注册副作用函数的机制，如下所示：

::: note 改进后的示例
<div id="effect-proxy-demo2"></div>
:::

::: demo  改进后的示例

```html
<div id="effect-proxy-demo2"></div>
<button onclick="changeText()">Change Text</button>
```

```js
// 用一个全局变量存储被注册的副作用函数
let activeEffect;

// effect 函数用于注册副作用函数
function effect(fn) {
  // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
  activeEffect = fn
  // 执行副作用函数
  fn()
}

// 存储副作用函数的桶
const bucket = new Set()

// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将 activeEffect 中存储的副作用函数收集到桶中
    if (activeEffect) {
      // 新增
      bucket.add(activeEffect)
    }
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

// 使用 effect 注册副作用函数
effect(() => {
  // 匿名副作用函数
  console.log('effect run') // 会打印 2 次，注册时立即执行了一次，后面更改 obj.notExist 时会再执行一次
  window.document.querySelector('#effect-proxy-demo2').innerText = obj.text
})

function changeText() {
  obj.notExist = 'hello vue3'
}

```

:::

上面代码可以看出，匿名副作用函数内部读取了 obj.text 的值，于是匿名函数与字段 obj.text 之间建立了响应联系。
但是，点击 change text 时，在匿名副作用内并没有读取 obj.notExist 属性的值，所以，理论上字段 obj.notExist 并没有与副作用建立响应联系。
因此，点击按钮时，不应该出发匿名副作用，这是不正确的，为了解决这个问题，我们应该重新设计桶。

在上例中，我们**没有在副作用函数与被操作的目标字段之间建立明确的联系**。当读取属性时，无论读取的是哪一个属性，都会把副作用函数收集到桶中；
当设置属性时，也都会把桶中的副作用函数取出来并执行。解决办法只需要在副作用与被操作的字段直接建立联系。

Set 类型的桶，不能实现这个目的，需要使用 WeakMap 代替 Set 作为桶的数据结构。

::: note WeakMap 类型的桶
<div id="effect-proxy-weakmap"></div>
:::

::: demo  WeakMap 类型的桶

```html
<div id="effect-proxy-weakmap"></div>
<button onclick="changeText()">Change Text</button>
```

```js
// 元素数据
const data = {
  ok: true,
  text: 'hello world'
}

// 存储副作用的桶
const bucket = new WeakMap()
let activeEffect;

const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 添加到桶中
    track(target, key)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶中取出并执行
    trigger(target, key)
    return true
  }
})

// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
  // 没有 activeEffect 直接返回
  if (!activeEffect) return
  // 根据 target 从桶中取得 depsMap，它也是一个 Map 类型，key: effects
  let depsMap = bucket.get(target)
  // 如果不存在 depsMap，则新建一个 Map 与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型
  // 里面存储着所有与当前 key 关联的副作用函数：effects
  let deps = depsMap.get(key)
  // 如果 deps 不存在，则同样新建一个 Set 与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 最后将当前激活的副作用添加到桶中
  deps.add(activeEffect)
}

// 在 set 拦截函数内调用 trigger 函数出发变化
function trigger(target, key) {
  // 根据 target 从桶中取得 depsMap，它是 key: effects
  const depsMap = bucket.get(target)
  if (!depsMap) return
  // 根据 key 取得所有副作用函数
  const effects = depsMap.get(key)
  // 执行副作用函数
  effects && effects.forEach(fn => fn())
}

// effect 函数用于注册副作用函数
function effect(fn) {
  // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
  activeEffect = fn
  // 执行副作用函数
  fn()
}

// 使用 effect 注册副作用函数
effect(() => {
  // 匿名副作用函数
  console.log('effect run - weekmap') // 会打印 2 次，注册时立即执行了一次，后面更改 obj.text 时会再执行一次，obj.notExist 不执行
  window.document.querySelector('#effect-proxy-weakmap').innerText = obj.text
})

function changeText() {
  obj.text = 'hello vue3'
  obj.notExist = 'hello vue3'
}
```

:::

从上述代码中可以看出构建数据的方式，分别使用了WeakMap, Map 和 Set:

- WeakMap 是 target: Map 键值对
- Map 是 target.key: effects （副作用） 键值对

那么，WeakMap 跟 Map 有什么区别呢？

WeakMap 对 key 是弱引用，不影响垃圾回收器的工作。

::: demo Map 和 WeakMap

请打开控制台查看：

```js
const map = new Map();
const weakmap = new WeakMap();

(function(){
  const foo = { foo: 1 };
  const bar = { bar: 2 };

  map.set(foo, 1);
  // 这句报错 Uncaught ReferenceError: set is not defined 
  // weakmap,set(bar, 2);
})();

// 可以打印出 foo，说明 foo 没有被回收
console.log('map.keys', map.keys.next().value);
// WeakMap 无法获取 key，也就无法获取对象 bar
console.log('weakmap', weakmap);
```

:::

## 4.4 分支切换与 cleanup
