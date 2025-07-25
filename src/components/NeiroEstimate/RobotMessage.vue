<template>
  <div class="robot">
    <div class="img-wrap">
      <img width="80" height="80" src="./ui/images/loading-anim.gif" alt="нейросеть" />
    </div>
    <div class="message">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .robot {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .img-wrap {
    width: 80px;
    flex-shrink: 0;
  }

  .message {
    font-weight: 700;
    font-size: 14px;
    line-height: 1.3;
  }
</style>
