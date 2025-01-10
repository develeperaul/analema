<template>
  <div class="code">
    <span class="tw-text-t2 tw-text-base tw-grow">{{ label }}</span>
    <button class="copy-btn" @click="copyCode">
      <BaseIcon name="copy" fit color="tw-fill-gray-black" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import type { RefCodeBalance } from 'src/repositories/referrals';
  import { useQuasar } from 'quasar'

  const props = defineProps<{
    balance: RefCodeBalance,
  }>();

  const label = computed(() => 'analemmatrade.ru?code=' + props.balance.code);
  const link = computed(() => 'https://' + label.value);

  const $q = useQuasar();

  function copyCode() {
    navigator.clipboard.writeText(link.value);
    $q.notify({
      type: 'positive',
      message: 'Ваш реферальный код скопирован!',
    });
  }
</script>

<style scoped lang="scss">
  .code {
    display: flex;
    align-items: center;
    gap: 16px;
    @apply tw-bg-white tw-rounded-10 tw-py-2 tw-px-3;
  }

  .copy-btn {
    width: 26px;
    height: 26px;
    padding: 4px;
  }
</style>
