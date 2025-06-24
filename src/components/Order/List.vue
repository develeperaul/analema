<template>
  <p v-if="items.length === 0" class="tw-text-center tw-text-t1 tw-text-base tw-py-10">
    {{ emptyText }}
  </p>
  <div v-else class="tw-space-y-4">
    <ListItem
      class="tw-w-full"
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';
  import type { OrderListItem } from 'src/repositories/order';

  defineProps<{
    items: OrderListItem[],
    emptyText: string,
  }>();
</script>
