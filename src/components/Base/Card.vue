<template>
  <component class="item" :is="tag ?? 'div'">
    <div class="head">
      <div class="title">{{ title }}</div>
      <div class="date">{{ date }}</div>
    </div>
    <div class="tw-space-y-3">
      <slot name="params"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
  defineProps<{
    tag?: string,
    title: string,
    date: string,
  }>();
</script>

<style scoped lang="scss">
  .item {
    display: block;
    border-radius: 20px;
    padding: 16px;
    padding-bottom: 20px;
    @apply tw-bg-gray-light;
  }

  .head {
    border-bottom: 1px solid #D2D2E0;
    margin-bottom: 10px;
    padding-bottom: 12px;
  }

  .date {
    margin-top: 4px;
    @apply tw-text-t2 tw-text-card-descr;
  }

  .title {
    color: #252525;
    @apply tw-text-h2 tw-font-bold;
  }

  :slotted(.param-label) {
    margin-bottom: 4px;
    @apply tw-text-t2 tw-text-card-descr;
  }

  :slotted(.param-value) {
    color: #252525;
    @apply tw-text-t1;
  }
</style>
