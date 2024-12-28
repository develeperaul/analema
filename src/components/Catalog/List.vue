<template>
  <div>
    <ListItem
      v-for="item in items"
    />
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';

  defineProps<{
    items: [],
  }>();
</script>
