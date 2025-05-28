<template>
  <router-link class="item" :to="{ name: 'catalog.all', query: { category: item.id } }">
    <div class="body">
      <div class="name">{{ item.name }}</div>
      <Image class="photo" v-if="item.img" :src="item.img" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import type { Section } from 'src/repositories/catalog';

  defineProps<{
    item: Section,
  }>();
</script>

<style scoped lang="scss">
  .item {
    position: relative;
    z-index: 1;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
    @apply tw-bg-white;

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }

  .body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 10px;
  }

  .photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: contain;
    object-position: center;
  }

  .name {
    font-size: 12px;
    line-height: 1.2;
  }
</style>
