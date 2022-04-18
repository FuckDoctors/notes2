import { defineClientAppEnhance } from '@vuepress/client'

import MdECharts from '@MdECharts'
// import ECharts from "./components/ECharts";

export default defineClientAppEnhance(({ app }) => {
  if (MdECharts.name) app.component('MdECharts', MdECharts)
})
