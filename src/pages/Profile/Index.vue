<template>
  <q-page>
    <div class="tw-container">
      <Toolbar class="tw-mb-6" title="Профиль" />
      <CardNamePhone class="tw-mb-6" />
      <div class="tw-space-y-4">
        <router-link :to="{ name: 'catalog.favorites' }" custom v-slot="{ href, navigate }">
          <NavItem class="favorites" icon="heart-2" text="Избранное" tag="a" :href="href" @click="navigate" />
        </router-link>
        <router-link :to="{ name: 'profile.notifications' }" custom v-slot="{ href, navigate }">
          <NavItem icon="notification" text="Push-уведомления" tag="a" :href="href" @click="navigate" />
        </router-link>
        <NavItem class="logout" icon="logout" text="Выход" @click="showedLogout = true" />
      </div>
    </div>
    <ModalLogout v-model="showedLogout" />
  </q-page>
</template>

<script setup lang="ts">
  import CardNamePhone from 'src/components/Profile/CardNamePhone.vue';
  import ModalLogout from 'src/components/Profile/ModalLogout.vue';
  import NavItem from 'src/components/Profile/NavItem.vue';

  const showedLogout = ref(false);
</script>

<style scoped>
  .logout :deep(.icon-wrap) {
    padding: 7px;
  }

  .favorites :deep(.icon-wrap) {
    padding: 5px 4px 4px 5px;
  }
</style>
