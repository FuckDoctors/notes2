import { defineSidebarConfig } from 'vuepress-theme-hope'

export const zh = defineSidebarConfig({
  '/notes/': [
    {
      text: '笔记',
      icon: 'note',
      prefix: '',
      link: '',
      children: 'structure',
    },
  ],
  '/': ['', 'notes', 'projects', 'links', 'about'],
})
