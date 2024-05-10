<script setup>
import { onMounted } from 'vue'
import FlippyCard from './card.vue'

onMounted(() => {})
</script>

<template>
  <div class="flippy-card-list">
    <FlippyCard>
      <template #front>
        <div>Front</div>
      </template>
      <template #back>
        <div>Back</div>
      </template>
    </FlippyCard>

    <FlippyCard>
      <template #front>
        <div>Front2</div>
      </template>
      <template #back>
        <div>Back2</div>
      </template>
    </FlippyCard>
  </div>
</template>
