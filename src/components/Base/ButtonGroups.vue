<template>
  <div class="btn-groups">
    <button
      v-for="item in items"
      class="item"
      :class="{ 'item--active': item.value === active }"
      type="button"
      @click="$emit('change:active', item)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
  export interface Item {
    label: string,
    value: string | number,
  }

  defineProps<{
    items: Item[],
    active: string | number,
  }>();

  defineEmits<{
    (event: 'change:active', item: Item): void,
  }>();
</script>

<style scoped lang="scss">
  .btn-groups {
    display: flex;
    overflow: hidden;
    @apply tw-bg-gray-light tw-rounded-16;
  }

  .item {
    padding: 14px 16px;
    @apply tw-w-full tw-text-center tw-text-t1 tw-text-card-descr tw-rounded-16;

    &--active {
      @apply tw-bg-tab tw-text-white;
    }
  }
</style>
