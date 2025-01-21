<template>
  <q-page class="page-pb">
    <ToolbarColored
      class="bg-bar tw-mb-6"
      iconWrapClass="tw-w-[80px] tw-h-[80px] tw-p-[14px]"
      icon="chain-2"
    />
    <div class="tw-container">
      <div class="tw-rounded-20 tw-bg-bg tw-p-4 tw-pt-5 tw-pr-5 tw-pb-6 tw-mb-4" v-if="balanceRes.data.value">
        <p class="tw-text-h1 tw-font-bold tw-text-base tw-mb-3">Ссылка для приглашения</p>
        <FieldRefLink :balance="balanceRes.data.value" />
      </div>
      <div class="tw-rounded-20 tw-bg-bg tw-p-4 tw-pr-5 tw-pb-5 tw-mb-6">
        <p class="tw-mb-2 tw-text-h1 tw-font-bold tw-text-base">
          2,5%
        </p>
        <p class="tw-text-t1 tw-text-card-descr">
          От суммы чека вы получаете с каждой покупки друга
        </p>
      </div>
      <router-link class="taplink" :to="{ name: 'referrals.rules' }">
        <span class="tw-grow">
          Правила реферальной программы
        </span>
        <span class="taplink__icon-wrap">
          <BaseIcon name="forward" fit />
        </span>
      </router-link>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import FieldRefLink from 'src/components/Referrals/FieldRefLink.vue';

  const api = useRepositories();
  const balanceRes = useRequest(() => api.referrals.showBalance());
  useDataOrAlert(balanceRes);
</script>

<style scoped lang="scss">
  .bg-bar {
    background: linear-gradient(127deg, #ffefd2 0%, #edc39b 100%);
  }

  .taplink {
    border-radius: 16px;
    box-shadow: 0 0 20px 4px #e8e8e8;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 16px;
    @apply tw-text-t1 tw-text-base tw-w-full tw-text-left;

    &__icon-wrap {
      width: 22px;
      height: 22px;
      @apply tw-text-gray-black;
    }
  }
</style>
