<script setup>
import cnchar from 'cnchar'

import draw from 'cnchar-draw'
import idiom from 'cnchar-idiom'
import order from 'cnchar-order'
import radical from 'cnchar-radical'
import voice from 'cnchar-voice'
import words from 'cnchar-words'
import { computed, onMounted, ref, shallowRef } from 'vue'

import { LANG, SPEAK_RATE } from './constants'

import Pinyin from './Pinyin.vue'

import './hanzi.scss'
import './hanzi2.scss'

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

cnchar.use(draw, order, radical, words, voice, idiom)

const printRef = ref(null)
const aniRef = ref(null)
const strokesRef = ref(null)
const pinyinRet = ref(props.pinyin)
const bushouRet = shallowRef([{}])
const bihuaCountRet = shallowRef([props.bihuashu])
const bihuaNameRet = shallowRef([props.bihua])
const zuciRet = shallowRef(props.zuci)

const chengyuRef = computed(() => {
  if (props.chengyu.length > 0) {
    return props.chengyu.slice(0, 4)
  }

  return (
    cnchar
      .idiom(props.zi)
      // 过滤四字成语
      .filter(item => item.length === 4)
      // .sort((a, b) => a.length - b.length)
      .slice(0, 4)
  )
})

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
      length: 45,
      showOutline: false,
    },
    line: {
      lineCross: false,
      lineStraight: true,
      // borderWidth: 0,
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
  speehTxt.value.push('笔顺')
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
    <div class="hanzi-main">
      <div class="hanzi-main__left">
        <div class="pinyin-hanzi-container">
          <Pinyin
            :pinyin="props.pinyin || pinyinRet"
            :width="100"
            :height="32"
          />
          <div class="hanzi-container">
            <div ref="printRef" class="print hanzi-card" />
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
        </div>
      </div>
      <div class="hanzi-main__right">
        <div class="hanzi-detail">
          <div class="hanzi-detail__top">
            <div class="info bushou">
              <span class="label">
                <span class="tag">部　首</span>
              </span>
              <span class="content">{{
                props.bushou || bushouRet[0].radical
              }}</span>
            </div>
            <div class="info jiegou">
              <span class="label">
                <span class="tag">结　构</span>
              </span>
              <span class="content">
                {{
                  props.jiegou?.replace('结构', '') ||
                  bushouRet[0].struct?.replace('结构', '')
                }}
              </span>
            </div>
            <div class="info bihuashu">
              <span class="label">
                <span class="tag">笔画数</span>
              </span>
              <span class="content">{{
                props.bihuashu || bihuaCountRet[0]
              }}</span>
            </div>
            <div class="info bihua">
              <span class="label">
                <span class="tag">笔　顺</span>
              </span>
              <span ref="bihuaRef" class="content">{{
                bihuaNameRet[0].join('-')
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="extras-container">
      <div class="extra zuci">
        <span class="tag">组　词</span>
        <span class="content"
          >{{ zuciRet.length > 0 ? zuciRet.join(' ') : '无' }}&nbsp;</span
        >
      </div>
      <div class="extra chengyu">
        <span class="tag">成　语</span>
        <span class="content"
          >{{ chengyuRef.length > 0 ? chengyuRef.join(' ') : '无' }}&nbsp;</span
        >
      </div>
    </div>
    <div class="bishun">
      <div class="header">
        <span class="title">笔　顺</span>
      </div>
      <div ref="strokesRef" class="hanzi-detail__strokes" />
    </div>
  </div>
</template>
