<script setup>
import { onMounted, ref, shallowRef } from 'vue'

import cnchar from 'cnchar'
import draw from 'cnchar-draw'
import order from 'cnchar-order'
import radical from 'cnchar-radical'
import words from 'cnchar-words'
import voice from 'cnchar-voice'

import { LANG, SPEAK_RATE } from './constants'

import Pinyin from './Pinyin.vue'

import './hanzi.css'
import './hanzi2.css'

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
})

cnchar.use(draw, order, radical, words, voice)

const printRef = ref(null)
const aniRef = ref(null)
const strokesRef = ref(null)
const pinyinRet = ref(props.pinyin)
const bushouRet = shallowRef([{}])
const bihuaCountRet = shallowRef([props.bihuashu])
const bihuaNameRet = shallowRef([props.bihua])
const zuciRet = shallowRef(props.zuci)

const speehTxt = ref([])

const CARD_WIDTH = 100

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

  // 笔顺动画
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

  // 笔顺
  cnchar.draw(props.zi, {
    el: strokesRef.value,
    type: cnchar.draw.TYPE.STROKE,
    style: {
      length: 60,
    },
    line: {
      lineCross: false,
    },
  })

  if (!props.pinyin) {
    pinyinRet.value = cnchar.spell(props.zi, 'low', 'tone', 'poly')
    speehTxt.value.push(pinyinRet.value)
  } else {
    speehTxt.value.push(props.pinyin)
  }
  bushouRet.value = cnchar.radical(props.zi)
  speehTxt.value.push(props.jiegou || bushouRet.value[0].struct)
  speehTxt.value.push('笔画数')
  if (!props.bihuashu) {
    bihuaCountRet.value = cnchar.stroke(props.zi, 'order', 'count')
    speehTxt.value.push(bihuaCountRet.value)
  } else {
    speehTxt.value.push(props.bihuashu)
  }
  speehTxt.value.push('笔画')
  if (props.bihua === null || props.bihua.length === 0) {
    bihuaNameRet.value = cnchar.stroke(props.zi, 'order', 'name')
    speehTxt.value.push(...bihuaNameRet.value[0])
  } else {
    speehTxt.value.push(...props.bihua)
  }
  if (props.zuci === null || props.zuci.length === 0) {
    zuciRet.value = cnchar.words(props.zi).slice(0, 5)
    if (zuciRet.value.length > 0) {
      speehTxt.value.push('组词')
      speehTxt.value.push(...zuciRet.value)
    }
  } else {
    speehTxt.value.push('组词')
    speehTxt.value.push(...props.zuci)
  }
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
  writingRef.value.style.display = 'none'
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

function handleRead() {
  cnchar.voice.speak(speehTxt.value, {
    rate: SPEAK_RATE,
    lang: LANG,
  })
}
</script>

<template>
  <div class="hanzi-main-container hanzi2">
    <Pinyin :pinyin="props.pinyin || pinyinRet" :width="100" :height="32" />
    <div class="hanzi-main">
      <div class="hanzi-main__left">
        <div ref="printRef" class="hanzi-card print" />
        <div ref="aniRef" class="hanzi-card animation" />
        <div class="hanzi-controls">
          <button class="btn-voice btn" title="发音" @click="handleVoice" />
          <button class="btn-play btn" title="笔画" @click="handlePlay" />
          <button
            class="btn-human-voice btn"
            title="朗读"
            @click="handleRead"
          />
        </div>
      </div>
      <div class="hanzi-main__right">
        <div class="hanzi-detail">
          <div class="hanzi-detail__top">
            <div class="info bushou">
              <span class="tag">部首</span>
              <span class="content">{{
                props.bushou || bushouRet[0].radical
              }}</span>
            </div>
            <div class="info jiegou">
              <span class="tag">结构</span>
              <span class="content">{{
                props.jiegou?.replace('结构', '') ||
                bushouRet[0].struct?.replace('结构', '')
              }}</span>
            </div>
            <div class="info bihuashu">
              <span class="tag">笔画数</span>
              <span class="content">{{
                props.bihuashu || bihuaCountRet[0]
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="extras">
      <div class="info bihua">
        <span class="tag">笔画</span>
        <span ref="bihuaRef" class="content">{{
          bihuaNameRet[0].join('-')
        }}</span>
      </div>

      <div class="words-container">{{ zuciRet.join(' ') }}&nbsp;</div>

      <div ref="strokesRef" class="hanzi-detail__strokes" />
    </div>
  </div>
</template>
