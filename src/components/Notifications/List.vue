<template>
  <div class="tw-space-y-3">
    <ListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';
  import type { NotificationItem } from 'src/repositories/notifications';

  defineProps<{
    items: NotificationItem[],
  }>();
</script>
