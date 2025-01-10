<template>
  <div class="item" @click="router.push('/')">
    <div class="body">
      <span class="icon-wrap">
        <BaseIcon name="chain" fit />
      </span>
      <div class="tw-mb-3">
        <p class="tw-text-t1 tw-font-bold tw-text-base tw-mb-1">Зарабатывайте на рефералах</p>
        <p class="tw-text-t2 tw-text-card-descr">2,5% от суммы чека</p>
      </div>
    </div>
    <div class="tw-px-5 tw-pb-5">
      <FieldRefLink class="tw-cursor-default" :balance="balance" @click.stop />
    </div>
  </div>
</template>

<script setup lang="ts">
  import FieldRefLink from './FieldRefLink.vue';
  import { useRouter } from 'vue-router';
  import type { RefCodeBalance } from 'src/repositories/referrals';

  const router = useRouter();

  defineProps<{
    balance: RefCodeBalance,
  }>();
</script>

<style scoped lang="scss">
  .item {
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.19);
    background: linear-gradient(127deg, #ffefd2 0%, #edc39b 100%);
    border-radius: 20px;
    cursor: pointer;
  }

  .icon-wrap {
    width: 32px;
    height: 32px;
    padding: 8px;
    background: #181818;
    border-radius: 6px;
  }

  .body {
    padding: 16px;
    padding-bottom: 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
</style>
