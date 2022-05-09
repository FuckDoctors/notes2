import { defineClientAppEnhance } from '@vuepress/client'

import MdECharts from './components/ECharts'
import Playground from './components/playground/Playground'

export default defineClientAppEnhance(({ app }) => {
  if (MdECharts.name) app.component('MdECharts', MdECharts)
  if (Playground.name) app.component('Playground', Playground)
})
