<script setup>
import { computed } from 'vue'

import { PINYIN_GE_RATIO } from './constants.js'

const props = defineProps({
  width: {
    type: [Number],
    default: 78,
  },
  height: {
    type: [Number],
    default: 50,
  },
  iconColor: {
    type: String,
    default: 'currentColor',
  },
})

// const svgWidthRef = computed(() => {
//   return Math.round(props.height * PINYIN_GE_RATIO);
// })

const svgCountRef = computed(() => {
  return Math.ceil(props.width / Math.round(props.height * PINYIN_GE_RATIO))
})
</script>

<template>
  <div
    class="pinyinge-container"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
  >
    <template v-for="index in svgCountRef" :key="index">
      <svg
        class="pinyinge-svg"
        viewBox="0 0 990 632"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        :height="height"
      >
        <path
          d="m0 0h1024v20h-1024zm1023 218h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm990 204h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-66 0h-33v-8h33zm-33 190h1024v20h-1024z"
        />
      </svg>
    </template>
  </div>
</template>

<style scoped>
.pinyinge-container {
  overflow: hidden;
  white-space: nowrap;
  word-wrap: break-word;
}
</style>
