<template>
  <div class="toolbar env-t">
    <div>
      <button v-if="showBack" class="btn-back" type="button" @click="back">
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

  defineProps<{
    title?: string,
    showBack?: boolean,
  }>();

  const router = useRouter();

  function back() {
    if(history.state.back) {
      router.back();
    } else {
      router.replace('/');
    }
  }
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
</style>
