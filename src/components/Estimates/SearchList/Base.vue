<template>
  <ul class="tw-space-y-4">
    <li
      v-for="item in items"
    >
      <button
        class="btn"
        type="button"
        :class="{ 'btn--active': isActive(item) }"
        @click="activeItem = { ...item, type: 'base' }"
      >
        {{ item.section_name }} | {{ item.name }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { SearchBaseItem } from 'src/repositories/neiro-catalog';
  import { ActiveProduct } from '../Steps/types';

  defineProps<{
    items: SearchBaseItem[],
  }>();

  const activeItem = defineModel<ActiveProduct | null>('activeItem', { required: true });

  function isActive(item: SearchBaseItem) {
    return activeItem.value && activeItem.value.type === 'base'
      && activeItem.value.id === item.id;
  }
</script>

<style scoped lang="scss">
  .btn {
    text-align: left;

    &--active {
      font-weight: 700;
      text-decoration: underline;
    }
  }
</style>
