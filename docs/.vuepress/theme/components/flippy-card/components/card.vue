<script setup>
import { ref } from 'vue'

import { calculateAngle, resetCard, toggleFlipped } from '../composables'

import '../styles/card.scss'

const props = defineProps({
  flipped: {
    type: Boolean,
    default: false,
  },
  dropShadowColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.3)',
  },
  glareColor: {
    type: String,
    default: 'rgb(199 198 243)',
  },
})

const wrapper = ref(null)

const toggle = () => toggleFlipped(wrapper.value)

function handleMouseEnter(e) {
  calculateAngle(e, wrapper.value, props.dropShadowColor, props.glareColor)
}

function handleMouseMove(e) {
  calculateAngle(e, wrapper.value, props.dropShadowColor, props.glareColor)
}

function handleMouseLeave() {
  resetCard(wrapper.value)
}
</script>

<template>
  <div
    ref="wrapper"
    :class="{ flipped: props.flipped }"
    class="flippy-card—wrapper"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="flippy-card flippy-card__front">
      <slot name="front" />
      <span class="flip-button" @click="toggle" />
    </div>
    <div class="flippy-card flippy-card__back">
      <slot name="back" />
      <span class="flip-button" @click="toggle" />
    </div>
    <div class="glare" />
  </div>
</template>
