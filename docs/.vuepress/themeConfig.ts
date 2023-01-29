import { hopeTheme } from 'vuepress-theme-hope'
import type { ThemeOptions } from 'vuepress-theme-hope'

import * as navbar from './navbar'
import * as sidebar from './sidebar'
import { pwa } from './plugin-config'

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

  docsDir: 'docs',

  pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime'],

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

      footer: '欢迎来到赵斌的小站',

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

      footer: "Welcome to ZhaoBin's site",

      displayFooter: true,

      blog: {
        description: 'A programmer, Vue/Java lover.',
        intro: '/en/about.html',
      },
    },
  },

  encrypt: {
    config: {
      '/guide/encrypt.html': ['12345'],
      '/en/guide/encrypt.html': ['12345'],
    },
  },

  plugins: {
    blog: true,

    // you can also use Waline
    comment: {
      provider: 'Giscus',
      repo: 'FuckDoctors/notes2',
      repoId: 'R_kgDOHFsMkw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOHFsMk84COVMW',
    },

    mdEnhance: {
      gfm: true,
      container: true,
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
      chart: true,
      echarts: true,
      flowchart: true,
      mermaid: true,
      demo: true,
      playground: {
        presets: ['ts', 'vue'],
      },
      vuePlayground: true,
      presentation: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      },
    },

    // PWA
    pwa,
  },
}

export default hopeTheme(themeOptions)
