<template>
  <div class="list">
    <ListItem
      class="list-item"
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Section } from 'src/repositories/catalog';
  import ListItem from './ListItem.vue';

  defineProps<{
    items: Section[],
  }>();
</script>

<style scoped lang="scss">
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    gap: 10px;
  }

  .list-item {
    flex-grow: 1;
  }
</style>
