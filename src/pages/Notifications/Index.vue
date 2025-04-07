<template>
  <q-page class="page-pb">
    <div class="wrapper">
      <Toolbar class="tw-mb-6" title="Push-уведомления" showBack />
      <GroupsList v-if="items" :items="items" />
    </div>
    <q-inner-loading :showing="itemsRes.loading.value" />
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import GroupsList from 'src/components/Notifications/GroupsList.vue';

  const api = useRepositories();

  const itemsRes = useRequest(api.notifications.list);
  const { data: items } = useDataOrAlert(itemsRes);
</script>
