import { defineNavbarConfig } from 'vuepress-theme-hope'

export const en = defineNavbarConfig([
  '/en/',
  '/en/home',
  {
    text: 'Notes',
    icon: 'edit',
    prefix: '/en/notes/',
    children: [
      {
        text: 'Frontend',
        icon: 'edit',
        prefix: 'frontend/',
        children: [
          { text: 'JavaScript', icon: 'edit', link: 'js' },
          { text: 'TypeScript', icon: 'edit', link: 'ts' },
          { text: 'Vue', icon: 'edit', link: 'vue' },
        ],
      },
      {
        text: 'Backend',
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
  { text: 'About me', icon: 'creative', link: '/en/about' },
])
