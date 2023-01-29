import MarkdownIt from 'markdown-it'
import MarkdownContainer from 'markdown-it-container'

import { echartsRender } from '../../node/markdown-it/echarts'

import { describe, expect, it } from 'vitest'

describe('echarts', () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(
    MarkdownContainer,
    'echarts',
    {
      render: echartsRender,
    }
  )

  it('Should resolve echarts info', () => {
    expect(
      markdownIt.render(
        `
::: echarts A line chart
\`\`\`json
{
  'xAxis': {
    'type': 'category',
    'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  'yAxis': {
    'type': 'value'
  },
  'series': [
    {
      'data': [150, 230, 224, 218, 135, 147, 260],
      'type': 'line'
    }
  ]
}
\`\`\`
:::
`,
        {}
      )
    ).toMatchSnapshot()
  })
})
