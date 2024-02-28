<script setup>
import { onMounted, ref, shallowRef } from 'vue'

import cnchar from 'cnchar'
import draw from 'cnchar-draw'
import order from 'cnchar-order'
import radical from 'cnchar-radical'
import words from 'cnchar-words'
import voice from 'cnchar-voice'

import { CARD_WIDTH } from './constants'

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
})

cnchar.use(draw, order, radical, words, voice)

const printRef = ref(null)
const aniRef = ref(null)
const writingRef = ref(null)
const strokesRef = ref(null)
const pinyinRet = ref(props.pinyin)
const bushouRet = shallowRef([{}])
const bihuaCountRet = shallowRef([props.bihuashu])
const bihuaNameRet = shallowRef([props.bihua])
const zuciRet = shallowRef(props.zuci)

onMounted(() => {
  cnchar.draw(props.zi, {
    el: printRef.value,
    style: {
      length: CARD_WIDTH,
    },
  })

  cnchar.draw(props.zi, {
    el: aniRef.value,
    type: cnchar.draw.TYPE.ANIMATION,
    style: {
      length: CARD_WIDTH,
    },
  })

  //  cnchar.draw(props.zi, {
  //    el: writingRef.value,
  //    type: cnchar.draw.TYPE.TEST,
  //    style: {
  //      length: CARD_WIDTH,
  //    },
  //  });

  cnchar.draw(props.zi, {
    el: strokesRef.value,
    type: cnchar.draw.TYPE.STROKE,
    style: {
      length: 60,
    },
  })

  if (!props.pinyin) {
    pinyinRet.value = cnchar.spell(props.zi, 'low', 'tone', 'poly')
  }
  bushouRet.value = cnchar.radical(props.zi)
  if (!props.bihuashu) {
    bihuaCountRet.value = cnchar.stroke(props.zi, 'order', 'count')
  }
  if (props.bihua === null || props.bihua.length === 0) {
    bihuaNameRet.value = cnchar.stroke(props.zi, 'order', 'name')
  }
  if (props.zuci === null || props.zuci.length === 0) {
    zuciRet.value = cnchar.words(props.zi)
  }
})

function handleVoice() {
  cnchar.voice(props.zi)
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
</script>

<template>
  <div class="hanzi-main-container">
    <div class="hanzi-main">
      <div class="hanzi-main__left">
        <div ref="printRef" class="hanzi-card print" />
        <div ref="aniRef" class="hanzi-card animation" />
        <div ref="writingRef" class="hanzi-card writing" />
        <div class="hanzi-controls">
          <button class="btn-voice btn" title="发音" @click="handleVoice" />
          <button class="btn-play btn" title="笔划" @click="handlePlay" />
          <button class="btn-write btn" title="书写" @click="handleWriting" />
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
              <span class="tag">笔划数</span>
              <span ref="bihuaRef" class="content">{{
                props.bihuashu || bihuaCountRet[0]
              }}</span>
            </div>
            <div class="info bihua">
              <span class="tag">笔划</span>
              <span ref="bihuaRef" class="content">{{
                bihuaNameRet[0].join('-')
              }}</span>
            </div>
          </div>
          <div ref="strokesRef" class="hanzi-detail__strokes" />
          <div class="words-container">
            {{ zuciRet.slice(0, 5).join(' ') }}&nbsp;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
