<template>
  <div class="toolbar env-t">
    <div class="actions">
      <button v-if="showBack" class="btn-back" type="button" @click="backAction">
        <BaseIcon name="back" fit />
      </button>
    </div>
    <div class="title">
      <span v-if="title">{{ title }}</span>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    title?: string,
    showBack?: boolean,
    backFn?: () => void,
  }>();

  const router = useRouter();

  function back() {
    if(history.state.back) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  const backAction = props.backFn || back;
</script>

<style scoped lang="scss">
  .btn-back {
    width: 32px;
    height: 32px;
    padding: 6px;
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .title {
    @apply tw-text-h1 tw-font-bold tw-text-base;
  }

  .actions {
    min-width: 32px;
  }
</style>
