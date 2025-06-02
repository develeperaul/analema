<template>
  <div class="toolbar env-t">
    <div class="title">{{ title }}</div>
    <div class="actions">
      <button class="action-btn" @click="$emit('show:sort')">
        <BaseIcon name="sort" fit color="#717171" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string,
  }>();

  defineEmits<{
    (event: 'show:sort'): void,
  }>();
</script>

<style scoped lang="scss">
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .title {
    @apply tw-text-h1 tw-font-bold tw-text-base;
  }

  .action-btn {
    width: 24px;
    height: 24px;
  }
</style>
