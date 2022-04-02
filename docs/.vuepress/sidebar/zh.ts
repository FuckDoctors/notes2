import { defineSidebarConfig } from 'vuepress-theme-hope'

export const zh = defineSidebarConfig({
  '/zh/': [
    '',
    'home',
    {
      text: '笔记',
      icon: 'note',
      prefix: 'notes/',
      link: 'notes/',
      children: 'structure',
    },
  ],
})
