import { defineNavbarConfig } from 'vuepress-theme-hope'

export const zh = defineNavbarConfig([
  '/',
  '/home',
  {
    text: '笔记',
    icon: 'edit',
    prefix: '/notes/',
    children: [
      {
        text: '前端',
        icon: 'edit',
        prefix: 'frontend/',
        children: [
          { text: 'JavaScript', icon: 'edit', link: 'js' },
          { text: 'TypeScript', icon: 'edit', link: 'ts' },
          { text: 'Vue', icon: 'edit', link: 'vue' },
        ],
      },
      {
        text: '后端',
        icon: 'edit',
        prefix: 'backend/',
        children: [
          {
            text: 'Java',
            icon: 'edit',
            link: 'java',
          },
          {
            text: 'Spring',
            icon: 'edit',
            link: 'spring',
          },
        ],
      },
    ],
  },
  { text: '关于我', icon: 'creative', link: '/about' },
])
