import { defineNavbarConfig } from 'vuepress-theme-hope'

export const en = defineNavbarConfig([
  '/en/',
  {
    text: 'Notes',
    icon: 'note',
    prefix: '/en/notes/',
    children: [
      {
        text: 'Frontend',
        icon: 'template',
        prefix: 'frontend/',
        children: [
          { text: 'JavaScript', link: 'js' },
          { text: 'TypeScript', link: 'ts' },
          { text: 'Vue', link: 'vue' },
        ],
      },
      {
        text: 'Backend',
        icon: 'back-stage',
        prefix: 'backend/',
        children: [
          {
            text: 'Java',
            link: 'java',
          },
          {
            text: 'Spring',
            link: 'spring',
          },
        ],
      },
    ],
  },
  '/en/projects',
  { text: 'Link', icon: 'link', link: '/en/links' },
  { text: 'About Me', icon: 'people', link: '/en/about' },
])
