import process from 'node:process'
import type { ThemeOptions } from 'vuepress-theme-hope'
import { hopeTheme } from 'vuepress-theme-hope'

import * as navbar from './navbar'
import * as sidebar from './sidebar'

import { waline } from './plugin-config'

const hostname = process.env.HOSTNAME || 'https://www.zhaobc.site'

export const themeOptions: ThemeOptions = {
  hostname,

  author: {
    name: 'Zhao Bin',
    url: 'https://www.zhaobc.site',
  },

  iconPrefix: 'iconfont icon-',

  logo: '/logo.svg',

  repo: 'https://github.com/FuckDoctors/notes2',

  fullscreen: true,

  docsDir: 'docs',

  // pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime'],
  pageInfo: [
    'Author',
    'Original',
    'PageView',
    'Date',
    'Category',
    'Tag',
    'ReadingTime',
  ],

  blog: {
    medias: {
      Email: 'mailto:hi@zhaobc.site',
      GitHub: 'https://github.com/FuckDoctors',
    },
  },

  locales: {
    /**
     * Chinese locale config
     */
    '/': {
      // navbar
      navbar: navbar.zh,

      // sidebar
      sidebar: sidebar.zh,

      footer:
        '欢迎来到赵斌的小站 | 由 <a href="https://theme-hope.vuejs.press" target="_blank">Theme Hope</a> 驱动',

      displayFooter: true,

      blog: {
        description: '一个码农，热爱 Vue/Java',
        intro: '/about.html',
      },
    },

    /**
     * English locale config
     */
    '/en/': {
      // navbar
      navbar: navbar.en,

      // sidebar
      sidebar: sidebar.en,

      footer:
        "Welcome to ZhaoBin's site | Powered by <a href='https://theme-hope.vuejs.press' target='_blank'>Theme Hope</a>",

      displayFooter: true,

      blog: {
        description: 'A programmer, Vue/Java lover.',
        intro: '/en/about.html',
      },
    },
  },

  plugins: {
    // blog: true,
    blog: {
      // article: '/posts/',
      excerpt: true,
    },

    notice: [
      {
        // showOnce: true,
        path: '/posts/edu/xiaoxue-yuwen-1-xia',
        title: '完善中',
        content: '本页尚未完成，如要补充请留下您的评论，或通过邮件联系我。',
        actions: [
          {
            text: '关闭',
            type: 'default',
          },
          {
            text: '如何补充？',
            type: 'primary',
            link: '/posts/edu/learn-hanzi.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95',
          },
        ],
      },
    ],

    // 组件插件
    components: {
      rootComponents: {
        backToTop: true,
        // addThis: 'ra-573c860d3e983e59',
      },
      components: [
        'CodePen',
        'StackBlitz',
        'Replit',
        'SiteInfo',
        'Share',
        'VPCard',
        'Badge',
      ],

      componentOptions: {
        share: {
          services: [
            'qrcode',
            'qq',
            'weibo',
            'evernote',
            'email',
            'facebook',
            'twitter',
          ],
        },
      },
    },

    // you can also use Waline
    comment: waline,

    mdEnhance: {
      attrs: true,
      gfm: true,
      tabs: true,
      codetabs: true,
      vPre: true,
      align: true,
      sup: true,
      sub: true,
      footnote: true,
      mark: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      tasklist: true,
      katex: true,
      mathjax: true,
      include: true,
      // chart: true,
      echarts: true,
      flowchart: true,
      mermaid: true,
      demo: true,
      playground: {
        presets: ['ts', 'vue'],
      },
      vuePlayground: true,
      revealJs: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      },
      hint: true,
    },
  },
}

export default hopeTheme(themeOptions)
