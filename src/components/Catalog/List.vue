<template>
  <div>
    <slot v-if="items.length === 0" name="empty">
      <p>Не найдено ни одного товара</p>
    </slot>
    <div v-else class="list">
      <ListItem
        class="item"
        v-for="item in items"
        :key="item.id"
        :item="item"
        :isInFavorite="favoritesStore.has(item.id)"
        @favorite:toggle="favoritesStore.toggle(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';
  import type { CatalogItem } from 'src/repositories/catalog';
  import { useFavoritesStore } from 'src/stores/favorites';

  defineProps<{
    items: CatalogItem[],
  }>();

  const favoritesStore = useFavoritesStore();
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-wrap: wrap;
    margin: -8px -6px;
  }

  .item {
    margin: 8px 6px;
    width: calc(50% - 12px);
  }
</style>
