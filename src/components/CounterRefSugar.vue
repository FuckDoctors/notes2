<script setup lang="ts">
const props = defineProps<{
  initial: number
}>()

let count = $ref(props.initial)

const inc = () => count++
const dec = () => count--
</script>

<template>
  <div>
    <button class="dec btn" @click="dec()">-</button>
    {{ count }}
    <button class="inc btn" @click="inc()">+</button>
  </div>
</template>
