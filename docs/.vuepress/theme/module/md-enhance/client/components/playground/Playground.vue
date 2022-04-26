<template>
  <div class="playground-container" :id="props.id">
    <div class="preview-container"></div>
    <div class="title">{{ props.title }}</div>
    <div class="source-container">
      <CodeGroup>
        <CodeGroupItem
          v-for="item in files"
          :title="item.name"
          :key="item.name"
        >
          ```{{ item.lang }}
          {{ item.content }}
          ```
        </CodeGroupItem>
      </CodeGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref } from 'vue'

interface SourceConfig {
  lang?: string
  content?: string
}

// interface FileConfig {
//   [file: string]: SourceConfig
// }
interface FileConfig extends SourceConfig {
  name: string
}

export default defineComponent({
  name: 'Playground',
})
</script>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  id: string
  title?: string
  config: string
}>()

const files: Ref<Array<FileConfig>> = computed(() => {
  const fileConfigs: Array<FileConfig> = []
  const orgConfig = props.config
  const configObj = JSON.parse(decodeURIComponent(orgConfig))
  console.log(configObj)

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
console.log(files)
</script>
