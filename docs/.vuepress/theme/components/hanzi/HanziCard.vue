<script setup>
import cnchar from 'cnchar'

import draw from 'cnchar-draw'
import { onMounted, ref, watchEffect } from 'vue'

import FlippyCard from '../flippy-card/components/card.vue'
import { CNCHAR_DATA_RESOURCE, LANG } from './constants'
import Hanzi2 from './Hanzi2.vue'

import './hanzi-card.scss'

const props = defineProps({
  zi: String,
  pinyin: String,
  bushou: String,
  jiegou: String,
  bihuashu: {
    type: Number,
    default: 0,
  },
  bihua: {
    type: Array,
    default() {
      return []
    },
  },
  zuci: {
    type: Array,
    default() {
      return []
    },
  },
  chengyu: {
    type: Array,
    default() {
      return []
    },
  },
  hidePinyin: Boolean,
})

cnchar.setResourceBase(CNCHAR_DATA_RESOURCE)

const CARD_WIDTH = 220

cnchar.use(draw)

const printRef = ref(null)
const aniRef = ref(null)
const pinyinRet = ref(props.pinyin)

const hidePinyinRef = ref(true)
watchEffect(() => {
  hidePinyinRef.value = props.hidePinyin
})

function handleVoice() {
  // cnchar.voice(props.zi)
  cnchar.voice.speak(props.zi, {
    rate: 0.5,
    lang: LANG,
    onerror: () => {
      cnchar.voice(props.zi)
    },
  })
}

function handlePlay() {
  printRef.value.style.display = 'none'
  aniRef.value.style.display = 'block'

  cnchar.draw(props.zi, {
    el: aniRef.value,
    type: cnchar.draw.TYPE.ANIMATION,
    style: {
      length: CARD_WIDTH,
    },
    line: {
      lineCross: false,
    },
  })
}

function togglePinyin() {
  hidePinyinRef.value = !hidePinyinRef.value
}

onMounted(() => {
  // 卡片大字
  cnchar.draw(props.zi, {
    el: printRef.value,
    style: {
      length: CARD_WIDTH,
      radicalColor: '#b44',
    },
    line: {
      lineCross: false,
    },
  })

  if (!props.pinyin) {
    pinyinRet.value = cnchar.spell(props.zi, 'low', 'tone', 'poly')
  }
})
</script>

<template>
  <FlippyCard class="hanzi-card" :class="{ 'hide-pinyin': hidePinyinRef }">
    <template #front>
      <div class="hanzi-card__front">
        <div class="pinyin-container">
          <div class="pinyin">
            {{ props.pinyin || pinyinRet }}
          </div>
        </div>
        <div class="zi-container">
          <div ref="printRef" class="zi text" />
          <div ref="aniRef" class="zi animation" />
          <div class="controls">
            <button class="btn-voice btn" title="发音" @click="handleVoice" />
            <button class="btn-play btn" title="笔画" @click="handlePlay" />
            <button class="btn-pinyin btn" title="拼音" @click="togglePinyin" />
          </div>
        </div>
      </div>
    </template>
    <template #back>
      <div class="hanzi-card__back">
        <Hanzi2 v-bind="props" />
      </div>
    </template>
  </FlippyCard>
</template>
