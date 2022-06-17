---
index: 50
category:
  - 笔记
  - frontend
  - pinia
tag:
  - pinia
---

# Plugins

Pinia stores can be fully extended thanks to a low level API. Here is a list of things you can do:

- Add new properties to stores
- Add new options when defining stores
- Add new methods to stores
- Wrap existing methods
- Change or even cancel actions
- Implement side effects like Local Storage
- Apply only to specific stores

Plugins are added to the pinia instance with `pinia.use()`.
The simplest example is adding a static property to all stores by returning an object:

```js
import { createPinia } from 'pinia'

// add a property named `secret` to every store that is created after this plugin is installed
// this could be a different file
function SecretPiniaPlugin() {
  return {
    secret: 'the cake is a lie'
  }
}

const pinia = createPinia()
// give the plugin to pinia
pinia.use(SecretPiniaPlugin)

// in another file
const store = useStore()
store.secret // 'the cake is a lie'
```

This is useful to add global objects like the router, modal, or toast managers.

## Introduction

A Pinia plugin is a function that optionally returns properties to be added to a store. It takes one optional argument, a context:

```js
export function myPiniaPlugin(context) {
  context.pinia // the pinia created with `createPinia`
  context.app // the current app created with `createApp` (Vue3 only)
  context.store // the store the plugin is augmenting
  context.options // the options object defining the store passed to `defineStore()`
  // ...
}

pinia.use(myPiniaPlugin)
```

Plugins are only applied to stores **created after** `pinia` is passed to the app, otherwise they won't be applied.

## Augmenting(扩大，增大，增强) a Store

You can add properties to every store by simply returning an object of them in a plugin:

```js
pinia.use(() => ({
  hello: 'world'
}))
```

You can also set the property directly on the store but if possible `use the return version` so they can be automatically tracked by devtools:

```js
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

Note that every store is wrapped with `reactive`, **automatically unwrapping** any `Ref` (`ref()`, `computed()`, ...) it contains:

```js
const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // each store has its individual `hello` property
  store.hello = ref('secret')
  // it gets automatically unwrapped
  store.hello // 'secret'

  // all stores are sharing the value `shared` property
  store.shared = sharedRef
  store.shared // 'shared'
})
```

This is why you can access all computed properties without .value and why they are reactive.

## Adding new state

If you want to add new state properties to a store or properties that are meant to be used during hydration,
you will have to add it in two places:

- On the `store` so you can access it with `store.myState`
- On `store.$state` so it can be used in devtools and, be serialized during SSR.

On top of that, you will certainly have to use a `ref()` (or other reactive API) in order to share the value across different accesses:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // to correctlly handle SSR, we need to make sure we are not overriding an existing value
  if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
    // hasError is defined within the plugin, so each store has their individual state property
    const hasError = ref(false)
    // setting the variable on `$state`, allows it be serialized during SSR
    store.$state.hasError = hasError
  }

  // we need to transfer the ref from the state to the store,
  // this way both accesses: store.hasError and store.$state.hasError
  // will work and share the same variable
  store.hasError = toRef(store.$state, 'hasError')

  // in this case it's better not to return `hasError` since it
  // will be displayed in the `state` section in the devtools
  // anyway and if we return it, devtools will display it twice.
})
```

## Adding new external properties

When adding external properties, class instances that come from other libraries, or simply things that are not reactive,
you should wrap the object with `markRaw()` before passing it to pinia.

```js
import { markRaw } from 'vue'

import { router } from './router'

pinia.use((store) => {
  store.router = markRaw(router)
})
```
