import { defineSidebarConfig } from 'vuepress-theme-hope'

export const zh = defineSidebarConfig({
  '/': [
    {
      text: '笔记',
      icon: 'note',
      prefix: '/notes/',
      link: '/notes/',
      children: 'structure',
    },
  ],
})
