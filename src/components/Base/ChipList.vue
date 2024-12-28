<template>
  <div class="area">
    <div class="chips">
      <Chip
        class="tw-shrink-0"
        v-for="item in items"
        :label="item.label"
        :active="item.value === activeItem?.value"
        @click="onClick(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Chip from './Chip.vue';

  export interface Item {
    label: string,
    value: string,
  }

  const props = defineProps<{
    items: Item[],
    activeItem: Item | null,
  }>();

  const emit = defineEmits<{
    (event: 'change:item', item: Item | null): void,
  }>();

  function onClick(item: Item) {
    emit('change:item', item.value === props.activeItem?.value ? null : item);
  }
</script>

<style scoped lang="scss">
  .area {
    overflow-y: hidden;
  }

  .chips {
    display: flex;
    gap: 6px;
  }
</style>
