<template>
  <div>
    <p v-if="items.length === 0">Не найдено ни одного товара</p>
    <div v-else class="list">
      <ListItem
        class="item"
        v-for="item in items"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';
  import type { CatalogItem } from 'src/repositories/catalog';

  defineProps<{
    items: CatalogItem[],
  }>();
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
