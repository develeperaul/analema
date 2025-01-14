<template>
  <div class="tw-flex tw-flex-col" :class="{ 'tw-grow': items.length === 0 }">
    <div v-if="items.length === 0" class="tw-pt-4 tw-pb-8 tw-grow tw-flex tw-flex-col">
      <div class="tw-mb-8 tw-px-5">
        <img class="tw-w-full" width="290" height="270" src="~/assets/images/alerts/empty-basket.svg" />
      </div>
      <p class="tw-text-h2 tw-font-bold tw-text-center tw-mb-10">Корзина пуста</p>
      <BaseButton class="tw-mt-auto" text="Перейти в каталог" :to="{ name: 'catalog.index' }"/>
    </div>
    <template v-else>
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
    </template>
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
