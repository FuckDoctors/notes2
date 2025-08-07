import type { ThemeOptions } from 'vuepress-theme-hope'
import { Buffer } from 'node:buffer'
import process from 'node:process'

import { entries, fromEntries } from '@vuepress/helper'

import dotenv from 'dotenv'

import { hopeTheme } from 'vuepress-theme-hope'

import * as navbar from './navbar'

import {
  docSearch,
  linksCheck,
  pwa,
  revealjs,
  seo,
  waline,
} from './plugin-config'
import * as sidebar from './sidebar'

// 加载 .env 文件
dotenv.config({ path: ['.env.local', '.env'] })

const hostname = process.env.HOSTNAME || 'https://www.zhaobc.site'

export const themeOptions: ThemeOptions = {
  hostname,

  author: {
    name: 'Zhao Bin',
    url: 'https://www.zhaobc.site',
  },

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
      QQ: 'https://qm.qq.com/q/Shnbvwz3So',
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

      navbarLayout: {
        start: ['Brand'],
        center: ['Links'],
        end: ['Language', 'Repo', 'Outlook', 'PlaygroundDropdown', 'Search'],
      },

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

      navbarLayout: {
        start: ['Brand'],
        center: ['Links'],
        end: ['Language', 'Repo', 'Outlook', 'PlaygroundDropdown', 'Search'],
      },

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

  encrypt: {
    config: {
      '/posts/private/': {
        password: [process.env.PRIVATE_PASSWORD!],
        hint: '请联系作者！',
      },
    },
  },

  markdown: {
    hint: true,

    // image
    imgLazyload: true,
    imgMark: true,
    imgSize: true,

    // math
    math: {
      type: 'mathjax',
    },

    // tabs
    tabs: true,
    codeTabs: true,

    attrs: true,
    gfm: true,
    vPre: true,
    align: true,
    sup: true,
    sub: true,
    footnote: true,
    mark: true,
    markmap: true,
    plantuml: true,
    tasklist: true,
    include: true,
    echarts: true,
    flowchart: true,
    mermaid: true,
    demo: true,
    preview: true,
    playground: {
      presets: [
        'ts',
        'vue',
        'unocss',
        {
          name: 'playground#python',
          component: 'PythonPlayground',
          propsGetter: ({
            title = '',
            files,
            settings,
          }): Record<string, string> => {
            // filter python files
            const fileInfo = fromEntries(
              entries(files)
                // .filter(([, { ext }]) => ext === 'python')
                .map(([key, { content }]) => [key, content])
            )

            const { service, ...params } = settings
            const domain = service || 'https://play-py.zhaobc.site'

            // 使用 settings 传参
            const queryString = new URLSearchParams(
              params as Record<string, string>
            ).toString()

            return {
              title,
              link: encodeURIComponent(
                `${domain}${queryString.length > 0 ? `?${queryString}` : ''}#${
                  // Code base64
                  Buffer.from(JSON.stringify(fileInfo)).toString('base64')
                }`
              ),
              allow: 'cross-origin-isolated',
            }
          },
        },
      ],
    },
    vuePlayground: true,
    sandpack: true,

    highlighter: {
      type: 'shiki',
      lineNumbers: false,
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
      // 设置别名，让 vscode 和 vuepress 都能正常解析语法高亮
      langAlias: {
        conf: 'apache', // shiki 中使用 apache 高亮
      },
      twoslash: {
        twoslashOptions: {
          compilerOptions: {
            moduleResolution: /* bundler */ 100,
          },
        },
      },
    },

    linksCheck,
    revealjs,
  },

  // 专注模式
  focus: true,

  plugins: {
    // backToTop: true,

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

    icon: {
      prefix: 'iconfont icon-',
      assets: ['iconify', 'fontawesome-with-brands'],
    },

    // 组件插件
    components: {
      // rootComponents: {
      //   // backToTop: true,
      //   // addThis: 'ra-573c860d3e983e59',
      // },
      components: [
        'CodePen',
        'StackBlitz',
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

    copyCode: {
      ignoreSelector: ['.vp-copy-ignore'],
    },

    feed: true,

    watermark: {
      enabled: false,
    },

    // 其他插件
    docsearch: docSearch,
    seo,
    pwa,
  },
}

export default hopeTheme(themeOptions)
