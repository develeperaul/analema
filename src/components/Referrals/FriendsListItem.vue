<template>
  <div class="item">
    <div class="tw-w-full">
      <p class="tw-text-t1 tw-font-bold tw-text-base tw-mb-[6px]">{{ phone }}</p>
      <p class="tw-text-t2 tw-text-card-descr">{{ text }}</p>
    </div>
    <div v-if="amount" class="tw-w-full tw-text-right tw-text-base tw-text-t1 tw-font-bold">
      {{ amount }}
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    phone: string,
    text: string,
    amount?: string,
  }>();
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    align-items: flex-start;
    gap: 32px;
    padding: 14px 0;
    border-bottom: 1px solid #D7D7D7;
  }
</style>
