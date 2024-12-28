<template>
  <div class="area">
    <div class="items">
      <Preview
        class="photo"
        v-for="item in items"
        :url="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Preview from './Preview.vue';

  defineProps<{
    items: string[],
  }>();
</script>

<style scoped lang="scss">
  .area {
    max-width: 100%;
    overflow-y: hidden;
  }

  .items {
    display: flex;
    gap: 10px;
  }

  .photo {
    flex-shrink: 0;
  }
</style>
