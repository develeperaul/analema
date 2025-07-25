<template>
  <button class="button-back">
    <span class="icon-wrap">
      <BaseIcon name="back" fit />
    </span>
    <span class="text">назад</span>
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .button-back {
    display: inline-flex;
    gap: 10px;
  }

  .icon-wrap {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    transform: translateY(5px);
  }

  .text {
    @apply tw-text-h1 tw-font-bold tw-text-el;
  }
</style>
