<template>
  <div>
    <div class="label">Горячая линия:</div>
    <NavItem
      class="card"
      icon="callback"
      tag="a"
      :href="`tel:${config.hotlinePhone}`"
      :text="config.hotlinePhone"
    />
  </div>
</template>

<script setup lang="ts">
  import NavItem from 'src/components/Profile/NavItem.vue';
  import { useConfig } from 'src/boot/config';

  const config = useConfig();
</script>

<style scoped lang="scss">
  .card :deep(.text) {
    font-weight: 700;
    font-size: 18px;
    line-height: 1;
  }

  .label {
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    color: #515151;
    margin-bottom: 8px;
  }
</style>
