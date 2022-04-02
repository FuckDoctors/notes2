import { defineSidebarConfig } from 'vuepress-theme-hope'

export const en = defineSidebarConfig({
  '/en/': [
    {
      text: 'Notes',
      icon: 'note',
      prefix: '/en/notes/',
      link: '/en/notes/',
      children: 'structure',
    },
  ],
})
