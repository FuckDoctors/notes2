import { defineHopeConfig } from 'vuepress-theme-hope'
import themeConfig from './themeConfig'

export default defineHopeConfig({
  base: '/',

  dest: './dist',

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css',
      },
    ],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: '赵斌的小站',
      description: '赵斌的随笔和笔记',
    },
    '/en/': {
      lang: 'en-US',
      title: "ZhaoBin's site",
      description: "ZhaoBin 's blogs and notes",
    },
  },

  themeConfig,
})
