<script setup>
import { ref } from 'vue'

import Hanzi from './Hanzi.vue'

const input = ref('')
const zi = ref('')

function handleClick() {
  zi.value = input.value
}
</script>

<template>
  <div class="container">
    <label>
      汉字
      <input
        v-model="input"
        type="text"
        maxlength="1"
        @keyup.enter="handleClick"
      />
    </label>
    <button @click="handleClick">查</button>
  </div>
  <div class="result">
    <Hanzi v-if="zi" :key="zi" :zi="zi" />
  </div>
</template>
