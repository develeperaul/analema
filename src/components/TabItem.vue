<template>
  <button class="tab">
    <slot />
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: 'tab-item',
})
</script>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.tab {
  @apply tw-py-2.5 tw-px-3.5 tw-rounded-20 tw-text-t2 tw-bg-card tw-text-card-descr tw-items-center;
  &.active {
    background: #6e6e8e;
    color: white;
  }
}
</style>
