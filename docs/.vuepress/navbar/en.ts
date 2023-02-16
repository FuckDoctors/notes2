import { navbar } from 'vuepress-theme-hope'

export const en = navbar([
  '/en/',
  {
    text: 'Notes',
    icon: 'note',
    prefix: '/en/notes/',
    children: [
      {
        text: 'Notes',
        icon: 'note',
        link: '',
      },
      {
        text: 'Frontend',
        icon: 'template',
        prefix: 'frontend/',
        children: [
          { text: 'JavaScript', link: 'js/' },
          { text: 'TypeScript', link: 'ts/' },
          { text: 'Vue', link: 'vue/' },
          { text: 'Pinia', link: 'vue/pinia/' },
          { text: 'more', link: '', activeMatch: '^/notes/frontend/$' },
        ],
      },
      {
        text: 'Backend',
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
            text: 'more',
            link: '',
            activeMatch: '^/notes/backend/$',
          },
        ],
      },
      { text: 'Other', link: 'other/' },
    ],
    activeMatch: '^/en/notes',
  },
  {
    text: 'Category',
    icon: 'type',
    children: [
      {
        text: 'Category',
        icon: 'categoryselected',
        link: '/en/category/',
      },
      {
        text: 'Tag',
        icon: 'tag',
        link: '/en/tag/',
      },
      {
        text: 'Timeline',
        icon: 'time',
        link: '/en/timeline/',
      },
    ],
  },
  '/en/projects',
  { text: 'Link', icon: 'link', link: '/en/links' },
  { text: 'About Me', icon: 'people', link: '/en/about' },
])
