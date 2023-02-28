import { defineUserConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

import { themeOptions } from './theme.js'
import themeZhaobc from './theme/index'

import { docsearch } from './plugin-config'

const base = (process.env.BASE as '/' | `/${string}/`) || '/'

export default defineUserConfig({
  theme: themeZhaobc(themeOptions),

  // debug: true,

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
        href: '//at.alicdn.com/t/font_3294373_aaebeoej8c7.css',
      },
    ],
    [
      'script',
      {
        // 百度统计
        src: '//hm.baidu.com/hm.js?85e80625eddf91d81d9535565850722b',
      },
    ],
    [
      'script',
      {
        // Clarity
        src: '/assets/js/clarity.js',
      },
    ],
  ],

  // vuepress-plugin-pwa2:  ⚠ The plugin will register service worker to handle assets,
  // so we recommend you to set "shouldPrefetch: false" in VuePress config file.
  shouldPrefetch: false,

  locales: {
    '/': {
      lang: 'zh-CN',
      title: '赵斌的小站',
      description: '赵斌的随笔和笔记',
    },
    '/en/': {
      lang: 'en-US',
      title: "ZhaoBin's site",
      description: "ZhaoBin's blogs and notes",
    },
  },

  pagePatterns: ['**/*.md', '!**/*.snippet.md', '!.vuepress', '!node_modules'],

  plugins: [
    // components 使用这种方式的话，会覆盖掉主题自带的组件，导致 fonticon 无法显示
    // componentsPlugin({
    //   components: ['CodePen', 'StackBlitz', 'Replit', 'SiteInfo'],
    // }),

    // DocSearch
    docsearchPlugin(docsearch),
  ],
})
