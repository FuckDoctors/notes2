<script setup lang="ts">
import { computed, getCurrentInstance, toRef } from 'vue'
import { isClient, useClipboard, useToggle } from '@vueuse/core'

import { useRouteLocale } from '@vuepress/client'

import { useSourceCode } from '../../composables/source-code'
import { usePlayground } from '../../composables/use-playground'

import Example from './example.vue'
import SourceCode from './source-code.vue'

import locales from './locales.json'

const props = defineProps<{
  demo: object
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const vm = getCurrentInstance()

const locale = useRouteLocale()
const lang = computed(() => locales[locale.value])

const { copy, isSupportted } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})
const [sourceVisible, toggleSourceVisible] = useToggle()

const demoSourceUrl = useSourceCode(toRef(props, 'path'))

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)
const onPlaygroundClick = () => {
  const { link } = usePlayground(props.rawSource)
  if (!isClient) return
  window.open(link)
}
const copyCode = async () => {
  if (!isSupported) {
    alert(lang.value['clipboard-not-suport'])
  }
  try {
    await copy()
  } catch (e: any) {
    alert(e.message)
  }
}
</script>

<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription"></p>

    <div class="example">
      <template v-if="demo">
        <Example :file="demo.path" :demo="demo.component" />
      </template>
    </div>
    <div class="divider"></div>
    <div class="op-btns">
      <span class="op-btn">Play</span>
    </div>
    <div class="source">
      <SourceCode v-show="sourceVisible" :source="source" />
    </div>
  </ClientOnly>
</template>
