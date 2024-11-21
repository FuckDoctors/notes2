<script setup>
import cnchar from 'cnchar'

import { onMounted, ref } from 'vue'

import {
  BORDER_COLOR,
  CNCHAR_DATA_RESOURCE,
  LINE_COLOR,
  OUTLINE_COLOR,
  PRINT_STROKE_WIDTH,
  STROKE_COLOR,
  WRITING_WIDTH,
} from './constants'

const props = defineProps({
  zi: String,
  /** 黑色字体个数 */
  hei: {
    type: Number,
    default: 1,
  },
  /** 灰色字体个数 */
  hui: {
    type: Number,
    default: 1,
  },
  /** 空白田字格个数 */
  kong: {
    type: Number,
    default: 5,
  },
})

cnchar.setResourceBase(CNCHAR_DATA_RESOURCE)

const strokesRef = ref(null)
const heiRef = ref(null)
const huiRef = ref(null)
const kongRef = ref(null)

onMounted(() => {
  cnchar.draw(props.zi, {
    el: strokesRef.value,
    type: cnchar.draw.TYPE.STROKE,
    style: {
      length: PRINT_STROKE_WIDTH,
      showOutline: false,
      outlineColor: OUTLINE_COLOR,
      strokeColor: STROKE_COLOR,
    },
    line: {
      lineCross: false,
      lineStraight: false,
      borderWidth: 0,
      lineColor: LINE_COLOR,
      borderColor: BORDER_COLOR,
    },
  })

  if (heiRef.value) {
    cnchar.draw(props.zi, {
      el: heiRef.value,
      style: {
        length: WRITING_WIDTH,
        showCharacter: true,
        showOutline: true,
        outlineColor: OUTLINE_COLOR,
        strokeColor: STROKE_COLOR,
      },
      line: {
        lineCross: false,
        lineColor: LINE_COLOR,
        borderColor: BORDER_COLOR,
      },
      onComplete: () => cloneElement(heiRef.value, props.hei),
    })
  }

  if (huiRef.value) {
    cnchar.draw(props.zi, {
      el: huiRef.value,
      style: {
        length: WRITING_WIDTH,
        showCharacter: false,
        showOutline: true,
        outlineColor: OUTLINE_COLOR,
        strokeColor: STROKE_COLOR,
      },
      line: {
        lineCross: false,
        lineColor: LINE_COLOR,
        borderColor: BORDER_COLOR,
      },
      onComplete: () => cloneElement(huiRef.value, props.hui),
    })
  }

  if (kongRef.value) {
    cnchar.draw(props.zi, {
      el: kongRef.value,
      style: {
        length: WRITING_WIDTH,
        showCharacter: false,
        showOutline: false,
        outlineColor: OUTLINE_COLOR,
        strokeColor: STROKE_COLOR,
      },
      line: {
        lineCross: false,
        lineColor: LINE_COLOR,
        borderColor: BORDER_COLOR,
      },
      onComplete: () => cloneElement(kongRef.value, props.kong),
    })
  }
})

function cloneElement(el, times) {
  for (let i = 1; i < times; i++) {
    el.after(el.cloneNode(true))
  }
}
</script>

<template>
  <div class="zitie-container">
    <div ref="strokesRef" class="strokes" />
    <div class="tianzige">
      <span v-if="props.hei > 0" ref="heiRef" class="hei" />
      <span v-if="props.hui > 0" ref="huiRef" class="hui" />
      <span v-if="props.kong > 0" ref="kongRef" class="kong" />
    </div>
  </div>
</template>
