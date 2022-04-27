import {
  defineComponent,
  h,
  computed,
  onMounted,
  onBeforeUnmount,
  ref,
  Ref,
  markRaw,
} from 'vue'

import type { VNode } from 'vue'

import '../../styles/playground.scss'
import { loadingSvgString, playSvgString, codeSvgString } from '../icons'

import { usePlayground } from '../../composables/use-playground2'
interface SourceConfig {
  lang?: string
  content?: string
}

interface FileConfig extends SourceConfig {
  name: string
}

export default defineComponent({
  name: 'Playground',

  props: {
    title: { type: String, default: '' },
    config: { type: String, required: true },
    id: { type: String, required: true },
  },

  setup(props, { slots }) {
    const playgroundContainer = ref<HTMLElement | null>(null)
    const iframe = ref<HTMLElement | null>(null)

    const loading = ref(true)
    const showCode = ref(false)

    const files: Ref<Array<FileConfig>> = computed(() => {
      const fileConfigs: Array<FileConfig> = []
      const orgConfig = props.config
      const configObj = JSON.parse(decodeURIComponent(orgConfig))

      for (const key in configObj) {
        if (configObj.hasOwnProperty(key)) {
          fileConfigs.push({
            name: key,
            lang: configObj[key].lang,
            content: configObj[key].content,
          })
        }
      }

      return fileConfigs
    })

    const previewLink: Ref<string> = computed(() => {
      const { link } = usePlayground(props.config)
      return link
    })

    const toggleCode = () => {
      showCode.value = !showCode.value
    }

    const hideLoading = () => {
      loading.value = false
    }

    onMounted(() => {})

    return (): (VNode | null)[] => [
      h(
        'div',
        {
          ref: playgroundContainer,
          class: 'playground-container',
          id: props.id,
        },
        [
          h(
            'div',
            {
              class: 'title-container',
            },
            [
              props.title
                ? h('div', { class: 'playground-title' }, props.title)
                : null,
              h('div', { class: 'op-btns' }, [
                h('a', {
                  class: 'op-btn',
                  href: 'javascript:;',
                  innerHTML: codeSvgString,
                  onclick: () => toggleCode(),
                }),
                h('a', {
                  class: 'op-btn',
                  href: previewLink.value,
                  target: '_blank',
                  innerHTML: playSvgString,
                }),
              ]),
            ]
          ),
          h(
            'div',
            {
              class: 'preview-container',
            },
            [
              loading.value
                ? h('div', {
                    class: ['preview-loading-wrapper'],
                    innerHTML: loadingSvgString,
                  })
                : null,
              h('iframe', {
                ref: iframe,
                class: 'iframe-preview',
                src: previewLink.value,
                // for iframe, the iframe.onload event triggers when the iframe loading finished,
                // both load and in case of an error.
                onload: () => hideLoading(),
              }),
            ]
          ),
          h(
            'div',
            {
              class: `source-container ${showCode.value ? 'show' : ''}`,
            },
            [slots.default ? slots.default() : null]
          ),
        ]
      ),
    ]
  },
})
