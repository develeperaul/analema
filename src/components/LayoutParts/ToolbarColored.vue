<template>
  <div class="toolbar-colored env-t">
    <div class="wrapper">
      <div class="tw-mb-4" :class="btnWrapClass">
        <button class="btn-back" type="button" @click="router.back">
          <BaseIcon name="back" fit />
        </button>
      </div>
      <div class="body">
        <div v-if="icon" class="icon-wrap" :class="iconWrapClass">
          <BaseIcon :name="icon" fit />
        </div>
        <h1 v-if="title" class="tw-text-h1 tw-text-el tw-font-bold tw-mt-3">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  defineProps<{
    icon?: string,
    iconWrapClass?: string,
    title?: string,
    btnWrapClass?: string,
  }>();
</script>

<style scoped lang="scss">
  .btn-back {
    width: 32px;
    height: 32px;
    padding: 6px;
  }

  .icon-wrap {
    @apply tw-rounded-20 tw-bg-el;
  }

  .toolbar-colored {
    border-radius: 0 0 24px 24px;
    padding: 16px;
    padding-bottom: 35px;
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
