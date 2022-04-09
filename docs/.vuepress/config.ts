import { defineHopeConfig } from 'vuepress-theme-hope'
import themeConfig from './themeConfig'

const { path } = require('@vuepress/utils')

const base = (process.env.BASE as '/' | `/${string}/`) || '/'

export default defineHopeConfig({
  // 使用自定义主题
  theme: path.resolve(__dirname, './theme'),

  base,

  dest: 'docs/.vuepress/dist',

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        // zhaobc挑选的图标
        href: '//at.alicdn.com/t/font_3294373_hn0mhs70c2o.css',
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
