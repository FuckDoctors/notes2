import type { PluginOption } from 'vite'
import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { llmsPlugin } from '@vuepress/plugin-llms'

import { visualizer } from 'rollup-plugin-visualizer'
import { defineUserConfig } from 'vuepress'

import { themeOptions } from './theme.js'
import themeZhaobc from './theme/index'

const base = (process.env.BASE as '/' | `/${string}/`) || '/'

const sizeCheck = !!process.env.SIZE_CHECK

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
        crossOrigin: true,
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        // zhaobc挑选的图标
        href: '//at.alicdn.com/t/c/font_4647860_t3wvzckeetc.css',
        crossOrigin: true,
      },
    ],
    [
      'script',
      {
        // 百度统计
        src: '//hm.baidu.com/hm.js?85e80625eddf91d81d9535565850722b',
        crossOrigin: true,
      },
    ],
    [
      'script',
      {
        // Clarity
        src: '/assets/js/clarity.js',
        crossOrigin: true,
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

    // AI
    llmsPlugin({
      domain: 'https://zhaobc.site',
      filter: page => {
        // 排除私有内容
        return (
          !page.path.includes('/posts/private/') && !page.frontmatter.article
        )
      },
    }),
  ],

  bundler: viteBundler({
    viteOptions: {
      plugins: [
        sizeCheck
          ? (visualizer({
              open: true,
              title: 'Vite Bundle Visualizer',
              brotliSize: true,
              gzipSize: true,
            }) as PluginOption)
          : null,

        // Support Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy on dev server
        // https://github.com/vitejs/vite/issues/3909#issuecomment-934044912
        {
          name: 'configure-response-headers',
          configureServer: server => {
            server.middlewares.use((_req, res, next) => {
              // 只给 python 下的资源设置 COEP
              // if (_req.url) {
              //   const url = new URL(`http://${process.env.HOST ?? 'localhost'}${_req.url}`)
              //   if (!/.*\/python\/.+\.html|.*\/python-playground\.html$/i.test(url.pathname)) {
              //     return next()
              //   }
              // }

              // Cross-Origin-Embedder-Policy 浏览器兼容性
              // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7
              const userAgent = _req.headers['user-agent']?.toLowerCase() || ''
              if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
                // safari
                res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
              } else {
                res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless')
              }
              res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
              res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
              next()
            })
          },
        },
      ],
      ssr: {
        noExternal: ['floating-vue'],
      },
      optimizeDeps: {
        include: ['floating-vue'],
      },

      server: {
        port: 8080,
        allowedHosts: ['localhost', '.mcprev.cn'],

        // 下面设置 headers 无效，需要使用上面 plugin 的方式
        // 关于启用跨域隔离的指南
        // https://web.developers.google.cn/articles/cross-origin-isolation-guide?hl=zh-cn
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          // 'Cross-Origin-Embedder-Policy': 'credentialless',
          'Cross-Origin-Opener-Policy': 'same-origin',
          // 'Cross-Origin-Resource-Policy': 'same-site',
          'Cross-Origin-Resource-Policy': 'cross-origin',
        },
      },
    },
  }),
})
