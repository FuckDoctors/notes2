import { navbar } from 'vuepress-theme-hope'

export const zh = navbar([
  // '/',
  { text: '主页', icon: 'home', link: '/', activeMatch: '^/$|^/posts/' },
  {
    text: '笔记',
    icon: 'note',
    prefix: '/notes/',
    children: [
      {
        text: '笔记',
        icon: 'note',
        link: '',
      },
      {
        text: '前端',
        icon: 'template',
        prefix: 'frontend/',
        children: [
          { text: 'JavaScript', link: 'js/' },
          { text: 'TypeScript', link: 'ts/' },
          { text: 'Vue', link: 'vue/' },
          { text: 'Pinia', link: 'vue/pinia/' },
          { text: '更多', link: '', activeMatch: '^/notes/frontend/$' },
        ],
      },
      {
        text: '后端',
        icon: 'back-stage',
        prefix: 'backend/',
        children: [
          {
            text: 'Java',
            link: 'java/',
          },
          {
            text: 'Spring',
            link: 'spring/',
          },
          {
            text: 'Python',
            link: 'python/',
          },
          {
            text: '更多',
            link: '',
            activeMatch: '^/notes/backend/$',
          },
        ],
      },
      { text: '其他', link: 'other/' },
    ],
    activeMatch: '^/notes/',
  },
  {
    text: '分类',
    icon: 'type',
    children: [
      {
        text: '分类',
        icon: 'categoryselected',
        link: '/category/',
      },
      {
        text: '标签',
        icon: 'tag',
        link: '/tag/',
      },
      {
        text: '时间线',
        // icon: 'time',
        icon: 'flow',
        link: '/timeline/',
      },
    ],
  },
  '/projects',
  { text: '链接', icon: 'link', link: '/links' },
  { text: '关于我', icon: 'people', link: '/about' },
])
