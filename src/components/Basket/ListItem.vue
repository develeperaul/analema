<template>
  <div class="item">
    <Image class="photo" imgClass="tw-w-full" width="160" height="160" :src="item.img" />
    <div class="body">
      <div class="name">{{ item.name }}</div>
      <div class="price">{{ $amount(item.price) }}</div>
      <div class="actions">
        <button class="action" type="button" @click="$emit('basket:remove', item.id)">
          <BaseIcon class="action__icon" name="delete" color="tw-fill-brown" fit />
        </button>
        <button class="action" type="button" @click="$emit('favorite:toggle', item.id)">
          <BaseIcon class="action__icon" name="heart-2" :color="isInFavorite ? 'tw-fill-negative' : 'tw-fill-brown'" fit />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { BasketItem } from 'src/repositories/basket';

  defineProps<{
    item: BasketItem,
    isInFavorite: boolean,
  }>();

  defineEmits<{
    (event: 'favorite:toggle', id: string): void,
    (event: 'basket:remove', id: string): void,
  }>();
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    border-radius: 20px;
    overflow: hidden;
    @apply tw-bg-card;
  }

  .name {
    margin-bottom: 10px;
    @apply tw-text-t2 tw-text-base;
  }

  .price {
    @apply tw-text-h2 tw-font-bold tw-text-base tw-mb-5;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .body {
    flex-grow: 1;
    padding: 20px 0;
    padding-right: 10px;
  }

  .photo {
    width: 100%;
    max-width: 160px;
  }

  .action {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    padding: 7px;
    @apply tw-bg-yellow-brown;
  }
</style>
