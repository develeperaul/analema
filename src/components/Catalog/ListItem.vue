<template>
  <router-link class="catalog-item" :to="{ name: 'catalog.show', params: { id: item.id } }">
    <div class="actions">
      <FavoritesButton :active="isInFavorite" @click.prevent="$emit('favorite:toggle', item.id)" />
    </div>
    <Image imgClass="tw-w-full" width="162" height="142" :src="item.img" />
    <div class="body">
      <div class="price">{{ $amount(item.price) }}</div>
      <div class="name">{{ item.name }}</div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import FavoritesButton from 'src/components/Favorites/Button.vue';
  import type { CatalogItem } from 'src/repositories/catalog';

  const props = defineProps<{
    item: Omit<CatalogItem, 'id_tp'>,
    isInFavorite: boolean,
  }>();

  defineEmits<{ (event: 'favorite:toggle', id: string): void }>();
</script>


<style scoped lang="scss">
  .catalog-item {
    position: relative;
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

  .actions {
    z-index: 5;
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
