<template>
  <article class="item">
    <Image class="tw-w-full" width="250" height="250" :src="item.img" />
    <div class="tw-p-2">
      <div class="tw-text-t2 tw-font-bold tw-text-base tw-mb-[2px]">{{ $amount(item.price) }}</div>
      <div class="tw-text-t3 tw-text-card-descr">{{ item.name }}</div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import type { PopularProduct } from 'src/repositories/catalog';

  defineProps<{
    item: PopularProduct,
  }>();
</script>

<style scoped lang="scss">
  .item {
    @apply tw-bg-card tw-rounded-10 tw-overflow-hidden;
  }
</style>
