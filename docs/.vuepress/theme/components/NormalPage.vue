<script setup lang="ts">
import HopeNormalPage from 'vuepress-theme-hope/components/base/PageContent'
</script>

<template>
  <HopeNormalPage>
    <template #contentAfter>
      <div class="content-after-container">
        <div class="share-container">
          <Share colorful />
        </div>
      </div>
    </template>
  </HopeNormalPage>
</template>

<style lang="scss">
.content-after-container {
  // 跟 theme-hope-content 保持一致

  .share-container {
    text-align: right;
  }
}
</style>
