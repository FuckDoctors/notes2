import { hopeTheme, ThemeOptions } from 'vuepress-theme-hope'

import * as navbar from './navbar'
import * as sidebar from './sidebar'

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
  pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag'],

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
        description: '一个码农，热爱Vue/Java',
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
      article: '/posts/',
      excerpt: true,
    },

    // 组件插件
    components: {
      rootComponents: {
        backToTop: true,
        // addThis: 'ra-573c860d3e983e59',
      },
      components: ['CodePen', 'StackBlitz', 'Replit', 'SiteInfo', 'Share'],

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
    comment: {
      provider: 'Giscus',
      repo: 'FuckDoctors/notes2',
      repoId: 'R_kgDOHFsMkw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOHFsMk84COVMW',
    },

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
