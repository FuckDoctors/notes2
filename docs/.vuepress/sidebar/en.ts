import { defineSidebarConfig } from 'vuepress-theme-hope'

export const en = defineSidebarConfig({
  '/': [
    '',
    'home',
    {
      text: 'Notes',
      icon: 'note',
      prefix: 'notes/',
      link: 'notes/',
      children: 'structure',
    },
  ],
})
