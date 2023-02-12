---
home: true
icon: link
title: Links
heroImage: /logo.svg
heroText: Links
tagline: Hyperlinks

containerClass: zhaobc links

tools:
  - name: vuepress-theme-hope
    desc: A vuepress theme with tons of features✨
    logo: https://theme-hope.vuejs.press/logo.svg
    url: https://theme-hope.vuejs.press/zh/
    repo: https://github.com/vuepress-theme-hope/vuepress-theme-hope
    preview: /assets/image/preview/theme-hope.jpg

  - name: OKTools
    desc: online tools
    url: https://oktools.net
    preview: /assets/image/preview/oktools.jpg

  - name: Regexper
    desc: Regex visualizer
    url: https://regexper.com/
    preview: /assets/image/preview/regexper.jpg

  - name: Photopea
    desc: Online Photoshop
    logo: https://theme-hope.vuejs.press/logo.svg
    url: https://www.photopea.com/
    preview: /assets/image/preview/photopea.jpg

  - name: Squoosh
    desc: Image optimizer that allows you to compress and compare images.
    url: https://squoosh.app/
    preview: /assets/image/preview/squoosh.jpg

links:
  - name: Mr.Hope's blog
    desc: Mr.Hope's blog
    logo: https://mrhope.site/logo.svg
    url: https://mrhope.site/
    preview: https://theme-hope.vuejs.press/assets/image/mrhope.jpg
---

## Tools

<SiteInfo
  v-for="item in $frontmatter.tools"
  :key="item.link"
  v-bind="item"
/>

## Links

<SiteInfo
  v-for="item in $frontmatter.links"
  :key="item.link"
  v-bind="item"
/>
