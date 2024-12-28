<template>
  <button class="chip" :class="{ 'chip--active': active }">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    label: string,
    active: boolean,
  }>();
</script>

<style scoped lang="scss">
  .chip {
    padding: 10px 14px;
    white-space: nowrap;
    border-radius: 20px;
    @apply tw-bg-card tw-text-t2 tw-text-card-descr;

    &--active {
      @apply tw-bg-tab tw-text-white;
    }
  }
</style>
