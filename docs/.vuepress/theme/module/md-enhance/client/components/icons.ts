import { IconBase } from 'vuepress-shared/lib/client'
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

export const playSvgString = `<svg t="1651041260663" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7253" width="200" height="200"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" p-id="7254"></path><path d="M708.266667 465.066667l-234.666667-134.4c-8.533333-4.266667-17.066667-6.4-25.6-6.4-29.866667 0-53.333333 23.466667-53.333333 53.333333v268.8c0 8.533333 2.133333 19.2 6.4 25.6 10.666667 17.066667 27.733333 27.733333 46.933333 27.733333 8.533333 0 17.066667-2.133333 25.6-6.4l234.666667-134.4c8.533333-4.266667 14.933333-10.666667 19.2-19.2 6.4-12.8 8.533333-27.733333 4.266666-40.533333-2.133333-14.933333-10.666667-25.6-23.466666-34.133333z m-249.6 162.133333V396.8L661.333333 512l-202.666666 115.2z" p-id="7255"></path></svg>`

export const codeSvgString = `<svg t="1651043677975" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11716" width="200" height="200"><path d="M240.496 272c-13.504 0-25.664 5.632-34.384 14.608l-0.048-0.048L16.848 475.76A47.664 47.664 0 0 0 0 512c0 13.504 5.616 25.664 14.592 34.368l-0.032 0.064 192 192 0.048-0.064A47.68 47.68 0 0 0 240 752a48 48 0 0 0 48-48c0-12.992-5.216-24.752-13.616-33.392l0.048-0.048-158.304-158.32 157.808-157.808-0.048-0.048A47.808 47.808 0 0 0 288.496 320a48 48 0 0 0-48-48z m784 240c0-14.56-6.608-27.44-16.848-36.24L818.432 286.56l-0.032 0.048A47.872 47.872 0 0 0 784 272a48 48 0 0 0-48 48c0 13.504 5.632 25.664 14.608 34.384l-0.048 0.048 157.808 157.808-158.32 158.32 0.048 0.048A47.808 47.808 0 0 0 736.48 704a48 48 0 0 0 48 48c12.992 0 24.752-5.216 33.408-13.632l0.048 0.064 192-192-0.048-0.064A47.68 47.68 0 0 0 1024.496 512zM640 128c-20.8 0-38.496 13.232-45.168 31.712L339.2 830.784a48 48 0 0 0 89.968 33.504L684.8 193.216A48 48 0 0 0 640 128z" fill="" p-id="11717"></path></svg>`
