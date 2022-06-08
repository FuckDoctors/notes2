import { defineClientConfig } from '@vuepress/client'

// import MdECharts from './components/ECharts'
import Playground from './components/playground'

export default defineClientConfig({
  enhance({ app }) {
    // if (MdECharts.name) app.component('MdECharts', MdECharts)
    if (Playground.name) app.component('Playground', Playground)
  },
})
