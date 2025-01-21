<template>
  <FriendsListEmpty v-if="data && data.length === 0" />
  <div v-else-if="data">
    <FriendsListItem
      v-for="item in data"
      :key="item.id"
      :phone="item.login"
      :text="item.date"
      :amount="`+ ${$amount(item.summ)}`"
    />
  </div>
  <q-skeleton v-else class="tw-w-full tw-h-[100px] tw-rounded-16" />
</template>

<script setup lang="ts">
  import FriendsListEmpty from './FriendsListEmpty.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';

  const api = useRepositories();
  const friendsRes = useRequest(api.referrals.showActiveFriends);
  const { data, loading } = useDataOrAlert(friendsRes);
</script>
