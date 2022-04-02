import { defineSidebarConfig } from 'vuepress-theme-hope'

export const en = defineSidebarConfig({
  '/en/notes/': [
    {
      text: 'Notes',
      icon: 'note',
      prefix: '',
      link: '',
      children: 'structure',
    },
  ],
  '/en/': ['', 'notes', 'projects', 'links', 'about'],
})
