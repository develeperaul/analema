<template>
  <div>
    <div class="tw-mb-3 tw-text-h2 tw-font-bold tw-text-base">
      В корзине <BasePlural :total="count" :cases="[ 'товар', 'товара', 'товаров' ]" />
    </div>
    <div class="tw-space-y-3">
      <ListItem
        class="tw-w-full"
        v-for="item in items"
        :key="item.id"
        :item="item"
        :isInFavorite="favoritesStore.has(item.id)"
        @favorite:toggle="favoritesStore.toggle(item.id)"
        @basket:remove="$emit('basket:remove', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';
  import type { BasketItem } from 'src/repositories/basket';
  import { useFavoritesStore } from 'src/stores/favorites';

  defineProps<{
    count: number,
    items: BasketItem[],
  }>();

  defineEmits<{
    (event: 'basket:remove', id: string): void,
  }>();

  const favoritesStore = useFavoritesStore();
</script>
