<template>
  <q-page class="page-pb">
    <div class="wrapper">
      <Toolbar class="tw-mb-6" showBack title="Приглашенные друзья" />
      <ButtonGroups
        class="tw-mb-4"
        :items="[
          { label: 'Новые', value: 'new' },
          { label: 'Приглашенные', value: 'invited' },
        ]"
        :active="activeTab"
        @change:active="activeTab = ($event.value as string)"
      />
      <FriendsListNew v-if="activeTab === 'new'" />
      <FriendsListActive v-else="activeTab === 'invited'" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import FriendsListNew from 'src/components/Referrals/FriendsListNew.vue';
  import FriendsListActive from 'src/components/Referrals/FriendsListActive.vue';

  const activeTab = ref('new');
</script>
