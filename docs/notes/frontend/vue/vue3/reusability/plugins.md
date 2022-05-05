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

# 插件

## 介绍

插件是一种能为 Vue 添加全局功能的工具代码。我们会这样安装一个插件：

```js
import { createApp } from 'vue'

const app = createApp({})

app.use('myPlugin', {
  // 可选的选项
})
```
