<template>
  <router-link class="catalog-item" to="/">
    <Image imgClass="tw-w-full" width="162" height="142" :src="item.img" />
    <div class="body">
      <div class="price">{{ $amount(item.price) }}</div>
      <div class="name">{{ item.name }}</div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import type { CatalogItem } from 'src/repositories/catalog';

  const props = defineProps<{
    item: CatalogItem,
  }>();
</script>


<style scoped lang="scss">
  .catalog-item {
    border-radius: 10px;
    overflow: hidden;
    @apply tw-bg-card;
  }

  .body {
    padding: 12px 5px 13px 10px;
  }

  .price {
    @apply tw-text-t1 tw-font-bold tw-mb-1;
  }

  .name {
    @apply tw-text-t2 tw-text-card-descr;
  }
</style>
