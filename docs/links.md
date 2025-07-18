---
home: true
icon: link
title: 链接
heroImage: /logo.svg
heroText: 链接
tagline: 工具链接，友情链接
description: 链接

containerClass: zhaobc links

tools:
  - name: vuepress-theme-hope
    desc: 一个具有强大功能的 vuepress 主题✨
    logo: /assets/image/hope-logo.svg
    url: https://theme-hope.vuejs.press/zh/
    repo: https://github.com/vuepress-theme-hope/vuepress-theme-hope
    preview: /assets/image/preview/theme-hope.jpg

  - name: OKTools
    desc: 在线工具
    url: https://oktools.net
    preview: /assets/image/preview/oktools.jpg

  - name: Regexper
    desc: 正则表达式可视化
    url: https://regexper.com/
    preview: /assets/image/preview/regexper.jpg

  - name: Regexr
    desc: 学习，构建，测试正则表达式
    url: https://regexr.com/
    preview: /assets/image/preview/regexr.jpg

  - name: Photopea
    desc: 在线Photoshop
    url: https://www.photopea.com/
    preview: /assets/image/preview/photopea.jpg

  - name: Squoosh
    desc: 图片压缩对比工具
    url: https://squoosh.app/
    preview: /assets/image/preview/squoosh.jpg

  - name: 67tool
    desc: 在线工具
    url: https://www.67tool.com/
    preview: /assets/image/preview/67tool.jpg

links:
  - name: 你的链接
    desc: 通过 PR 提交你的链接
    url: https://github.com/FuckDoctors/notes2/edit/main/docs/links.md
    preview: /assets/image/preview/no-preview.jpg

banner: /logo-cover.svg
---

## 工具

<SiteInfo
  v-for="item in $frontmatter.tools"
  :key="item.link"
  v-bind="item"
/>

## 友情链接

<SiteInfo
  v-for="item in $frontmatter.links"
  :key="item.link"
  v-bind="item"
/>
