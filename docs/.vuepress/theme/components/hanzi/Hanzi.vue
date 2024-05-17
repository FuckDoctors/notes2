<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue'

import cnchar from 'cnchar'
import draw from 'cnchar-draw'
import order from 'cnchar-order'
import radical from 'cnchar-radical'
import words from 'cnchar-words'
import voice from 'cnchar-voice'
import idiom from 'cnchar-idiom'

import {
  CARD_WIDTH,
  LANG,
  SPEAK_RATE,
  TIAN_HEI,
  TIAN_HUI,
  TIAN_KONG,
} from './constants'

import Zitie from './Zitie.vue'

import './hanzi.css'

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
})

cnchar.use(draw, order, radical, words, voice, idiom)

const printRef = ref(null)
const aniRef = ref(null)
const writingRef = ref(null)
const strokesRef = ref(null)
const pinyinRet = ref(props.pinyin)
const bushouRet = shallowRef([{}])
const bihuaCountRet = shallowRef([props.bihuashu])
const bihuaNameRet = shallowRef([props.bihua])
const zuciRet = shallowRef(props.zuci)
const chengyuRef = computed(() => {
  if (props.chengyu.length > 0) {
    return props.chengyu.slice(0, 5)
  }

  return (
    cnchar
      .idiom(props.zi)
      // 过滤四字成语
      .filter(item => item.length === 4)
      // .sort((a, b) => a.length - b.length)
      .slice(0, 5)
  )
})

const speehTxt = ref([])

onMounted(() => {
  // 卡片大字3
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

  if (chengyuRef.value.length > 0) {
    speehTxt.value.push('成语')
    speehTxt.value.push(...chengyuRef.value)
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

function handleWriting() {
  aniRef.value.style.display = 'none'
  writingRef.value.style.display = 'block'

  cnchar.draw(props.zi, {
    el: writingRef.value,
    type: cnchar.draw.TYPE.TEST,
    style: {
      length: CARD_WIDTH,
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
  <div class="hanzi-main-container">
    <div class="hanzi-main">
      <div class="hanzi-main__left">
        <div ref="printRef" class="hanzi print" />
        <div ref="aniRef" class="hanzi animation" />
        <div ref="writingRef" class="hanzi writing" />
        <div class="hanzi-controls">
          <button class="btn-voice btn" title="发音" @click="handleVoice" />
          <button class="btn-play btn" title="笔画" @click="handlePlay" />
          <button class="btn-write btn" title="书写" @click="handleWriting" />
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
            <div class="info pinyin">
              <span class="tag">拼音</span>
              <span ref="pinyinRef" class="content">{{
                props.pinyin || pinyinRet
              }}</span>
            </div>
            <div class="info bushou">
              <span class="tag">部首</span>
              <span ref="bushouRef" class="content">{{
                props.bushou || bushouRet[0].radical
              }}</span>
            </div>
            <div class="info jiegou">
              <span class="tag">结构</span>
              <span ref="jiegouRef" class="content">{{
                props.jiegou || bushouRet[0].struct
              }}</span>
            </div>
            <div class="info bihuashu">
              <span class="tag">笔画数</span>
              <span ref="bihuaRef" class="content">{{
                props.bihuashu || bihuaCountRet[0]
              }}</span>
            </div>
            <div class="info bihua">
              <span class="tag">笔画</span>
              <span ref="bihuaRef" class="content">{{
                bihuaNameRet[0].join('-')
              }}</span>
            </div>
          </div>
          <div ref="strokesRef" class="hanzi-detail__strokes" />
          <div class="zitie-print">
            <Zitie
              :zi="props.zi"
              :hei="TIAN_HEI"
              :hui="TIAN_HUI"
              :kong="TIAN_KONG"
            />
          </div>
          <div class="info words-container">
            <span class="tag">组词</span>
            <span class="content">{{ zuciRet.join(' ') }}</span>
          </div>
          <div class="info chengyu">
            <span class="tag">成语</span>
            <span class="content">{{ chengyuRef.join(' ') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
