<script setup>
import { computed } from 'vue'

import Pinyinge from './Pinyinge.vue'

const props = defineProps({
  pinyin: String,
  width: {
    type: [Number, String],
    default: 78,
  },
  height: {
    type: [Number, String],
    default: 50,
  },
  iconColor: {
    type: String,
    default: 'currentColor',
  },
})

const pinyinFontSizeRef = computed(() => {
  return Math.round(props.height / 2) + 2
})
</script>

<template>
  <div class="pinyin-wrapper">
    <div class="pinyin" :style="{ fontSize: `${pinyinFontSizeRef}px` }">
      {{ pinyin }}
    </div>
    <div class="pinyinge">
      <Pinyinge
        :width="width"
        :height="height"
        :icon-color="iconColor"
        class="ge"
      />
    </div>
  </div>
</template>

<style scoped type="scss">
.pinyin-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  padding: 0;
  text-align: center;

  .pinyin {
    position: absolute;
    top: -2px;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .pinyinge {
    z-index: 1;
    margin: 0;
    padding: 0;
  }
}
</style>
