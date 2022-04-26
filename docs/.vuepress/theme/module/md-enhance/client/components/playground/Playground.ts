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

import CodeGroup from '@vuepress/theme-default/lib/client/components/global/CodeGroup'
import CodeGroupItem from '@vuepress/theme-default/lib/client/components/global/CodeGroupItem.vue'

import '../../styles/playground.scss'
import { loadingSvgString } from '../icons'

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

  setup(props) {
    const playgroundContainer = ref<HTMLElement | null>(null)
    const iframe = ref<HTMLElement | null>(null)

    const loading = ref(false)

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

    const previewLink: Ref<string> = computed(() => {})

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
          props.title
            ? h('div', { class: 'playground-title' }, props.title)
            : null,
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
              }),
            ]
          ),
          h(
            'div',
            {
              class: 'source-container',
            },
            [
              h(
                CodeGroup,
                {
                  class: 'playground-tab',
                },
                {
                  default: () => {
                    const items: (VNode | null)[] = []

                    // render CodeGroupItem
                    files.value
                      .filter((file) => file.name !== 'imports')
                      .forEach((file) => {
                        items.push(
                          h(
                            CodeGroupItem,
                            {
                              title: file.name,
                              class: 'playground-file',
                            },
                            {
                              default: () => `
                        \`\`\`${file.lang}\n
                        ${file.content}
                        \`\`\`
                      `,
                            }
                          )
                        )
                      })

                    return items
                  },
                }
              ),
            ]
          ),
        ]
      ),
    ]
  },
})
