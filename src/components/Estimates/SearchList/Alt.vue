<template>
  <ul class="list">
    <li
      class="item"
      v-for="item in items"
    >
      <button
        class="btn"
        :class="{ 'btn--active': isActive(item) }"
        type="button"
        @click="activeItem = { ...item, type: 'alt' }"
      >
        {{ item.section_name }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { SearchAltItem } from 'src/repositories/neiro-catalog';
  import { ActiveProduct } from '../Steps/types';

  defineProps<{
    items: SearchAltItem[],
  }>();

  const activeItem = defineModel<ActiveProduct | null>('activeItem', { required: true });

  function isActive(item: SearchAltItem) {
    return activeItem.value && activeItem.value.type === 'alt'
      && activeItem.value.id === item.id;
  }
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .btn {
    text-align: left;
    border-radius: 100px;
    background: #F6F6F6;
    padding: 8px 16px;
    @apply tw-text-t1 tw-text-black;

    &--active {
      background: #8484bc;
      color: #ffffff;
    }
  }
</style>
