<template>
  <div>
    <div class="tw-mb-3 tw-text-h2 tw-font-bold tw-text-base">
      В корзине <BasePlural :total="count" :cases="[ 'товар', 'товара', 'товаров' ]" />
    </div>
    <ListItem />
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';

  defineProps<{
    count: number,
  }>();
</script>
