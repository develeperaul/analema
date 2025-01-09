<template>
  <button class="btn">
    <BaseIcon :color="active ? 'tw-fill-negative' : 'currentColor'" :name="active ? 'heart-2' : 'heart-outlined'" fit />
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    active: boolean,
  }>();
</script>

<style scoped lang="scss">
  .btn {
    padding: 4px;
    width: 32px;
    height: 32px;
  }
</style>
