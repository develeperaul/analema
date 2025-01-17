<template>
  <component class="nav-item" :is="tag">
    <span class="icon-wrap">
      <BaseIcon :name="icon" fit color="#DFA543" />
    </span>
    <span class="text">{{ text }}</span>
  </component>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      tag?: string,
      icon: string,
      text: string,
    }>(),
    {
      tag: 'button'
    }
  )
</script>

<style scoped lang="scss">
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    box-shadow: 0 0 20px 4px #e8e8e8;
    @apply tw-bg-white tw-rounded-14 tw-w-full;
  }

  .icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    padding: 4px;
    flex-shrink: 0;
    background-color: #FFF3DD;
  }

  .text {
    flex-grow: 1;
    @apply tw-text-t1 tw-text-base tw-text-left;
  }
</style>
