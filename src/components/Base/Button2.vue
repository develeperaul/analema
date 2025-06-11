<template>
  <button class="btn" :type="type" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      type?: 'submit' | 'button'
      disabled?: boolean,
    }>(),
    {
      type: 'button',
      disabled: false,
    }
  );
</script>

<style scoped lang="scss">
  .btn {
    display: block;
    width: 100%;
    border-radius: 15px;
    padding: 12px 30px;
    background: linear-gradient(136deg, #e1e1fd 0%, #b2b2ef 100%);
    font-size: 16px;
    line-height: 1.3;
    font-weight: 500;
    @apply tw-text-base;

    &:disabled {
      background: #CCCCCC;
      color: #6B6B6B;
    }
  }
</style>
