import { IconBase } from '@mr-hope/vuepress-shared/lib/client'
import { h } from 'vue'
import type { FunctionalComponent } from 'vue'

export const LoadingIcon: FunctionalComponent = () =>
  h(IconBase, { name: 'loading' }, () =>
    ['0s', '-0.333s', '-0.667s'].map((item) =>
      h(
        'circle',
        {
          cx: 50,
          cy: 50,
          r: 0,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
        },
        [
          h('animate', {
            attributeName: 'r',
            repeatCount: 'indefinite',
            dur: '1s',
            values: '0;40',
            keyTimes: '0;1',
            keySplines: '0 0.2 0.8 1',
            calcMode: 'spline',
            begin: item,
          }),
          h('animate', {
            attributeName: 'opacity',
            repeatCount: 'indefinite',
            dur: '1s',
            values: '1;0',
            keyTimes: '0;1',
            keySplines: '0.2 0 0.8 1',
            calcMode: 'spline',
            begin: item,
          }),
        ]
      )
    )
  )

export const loadingSvgString =
  '<svg xmlns="http://www.w3.org/2000/svg" class="loading-icon" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"/></circle><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.3333333333333333s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.3333333333333333s"/></circle><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.6666666666666666s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.6666666666666666s"/></circle></svg>'
