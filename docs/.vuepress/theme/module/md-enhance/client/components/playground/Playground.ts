import { defineComponent, h, defineAsyncComponent } from 'vue'
import { ClientOnly } from '@vuepress/client'

import type { VNode } from 'vue'

import ExternalPlayground from './ExternalPlayground'
import { parsePlaygroundSettings } from '../../utils/playground'
import { IMPORT_MAP_KEY } from '../../../shared/playground'

import { LoadingIcon } from '../icons'

const AsyncInternalPlayground = defineAsyncComponent({
  loader: () => import('./InternalPlayground'),
  loadingComponent: LoadingIcon,
})

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'PlaygroundZhaobc',

  props: {
    id: { type: String, required: true },
    title: { type: String, default: '' },
    config: { type: String, default: '{}' },
    settings: { type: String, default: '{}' },
  },

  setup(props) {
    const settings = parsePlaygroundSettings(props.settings)
    const mode = settings.mode

    const encodedKey = encodeURIComponent(IMPORT_MAP_KEY)

    return (): (VNode | null)[] => [
      h(ClientOnly, null, [
        h(mode === 'internal' ? AsyncInternalPlayground : ExternalPlayground, {
          id: props.id,
          title: props.title,
          settings: props.settings,
          config: props.config.replace(
            encodedKey,
            settings[mode as string]?.defaultImportsMap || ''
          ),
        }),
      ]),
    ]
  },
})
