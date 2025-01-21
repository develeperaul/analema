<template>
  <q-page>
    <div class="tw-container">
      <Toolbar class="tw-mb-8" showBack title="Реферальная программа" />
      <div v-if="balanceRes.data.value" class="tw-space-y-5">
        <CardBalance :balance="balanceRes.data.value" />
        <CardRefCode :balance="balanceRes.data.value" />
        <CardInvitedRefs />
      </div>
    </div>
    <q-inner-loading
      :showing="balanceRes.loading.value"
    />
  </q-page>
</template>

<script setup lang="ts">
  import Toolbar from 'src/components/LayoutParts/Toolbar.vue';
  import CardBalance from 'src/components/Referrals/CardBalance.vue';
  import CardRefCode from 'src/components/Referrals/CardRefCode.vue';
  import CardInvitedRefs from 'src/components/Referrals/CardInvitedRefs.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';

  const api = useRepositories();
  const balanceRes = useRequest(() => api.referrals.showBalance());
  useDataOrAlert(balanceRes);
</script>
