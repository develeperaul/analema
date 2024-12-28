<template>
  <div class="tw-space-y-4">
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
  import type { EstimateListItem } from 'src/repositories/estimates';

  defineProps<{
    items: EstimateListItem[],
  }>();
</script>
