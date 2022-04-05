import { defineSidebarConfig } from 'vuepress-theme-hope'

export const zh = defineSidebarConfig({
  '/notes/': 'structure',
  '/': ['', 'notes', 'projects', 'links', 'about'],
})
