<template>
  <div class="item" @click="showed = true">
    <span class="icon-wrap">
      <BaseIcon name="ruble" fit />
    </span>
    <div>
      <p class="tw-text-h1 tw-text-base tw-font-bold tw-mb-1">{{ $amount(balance.balance) }}</p>
      <p class="tw-text-t1 tw-text-card-descr">Реферальный счет</p>
    </div>
  </div>
  <Modal v-model="showed" yPos="bottom" animation="slide-right">
    <div class="card">
      <div class="tw-text-right tw-mb-2">
        <ButtonClose @click="showed = false" />
      </div>
      <div>
        <div class="tw-text-h1 tw-font-bold tw-mb-4 tw-text-base">Реферальный счет</div>
        <div class="tw-mb-8">
          <div class="tw-mb-3 tw-bg-bg tw-rounded-14 tw-px-4 tw-py-3 tw-text-h2 tw-font-bold tw-text-base">
            {{ $amount(balance.balance) }}
          </div>
          <p class="tw-text-t2 tw-text-card-descr">Минимальная сумма вывода 3 000 ₽</p>
        </div>
        <BaseButton text="Вывести" :disabled="!canOutput" @click="showOutput" />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import type { RefCodeBalance } from 'src/repositories/referrals';
  import Modal from 'src/components/Base/Modal.vue';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    balance: RefCodeBalance,
  }>();

  const showed = ref(false);

  const canOutput = computed(() => parseInt(props.balance.balance) >= 3000);

  const router = useRouter();

  function showOutput() {
    router.push({ name: 'referrals.output' });
  }
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    box-shadow: 0 0 20px 4px #e8e8e8;
    cursor: pointer;
    @apply tw-rounded-20 tw-bg-white tw-p-4;
  }

  .icon-wrap {
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 6px;
    background: #FFF3DD;
  }

  .card {
    max-width: 600px;
    border-radius: 20px 20px 0 0;
    padding: 16px;
    padding-bottom: 30px;
    @apply tw-bg-white tw-w-full;
  }
</style>
