<template>
  <q-page class="page-pb">
    <div class="wrapper">
      <Toolbar class="tw-mb-6" title="Профиль" />
      <CardNamePhone class="tw-mb-6" />
      <div class="tw-space-y-4">
        <template v-if="authStore.user">
          <router-link :to="{ name: 'estimates.index' }" custom v-slot="{ href, navigate }">
            <NavItem class="favorites" icon="neiro" text="Мои оценки" tag="a" :href="href" @click="navigate" />
          </router-link>
          <router-link :to="{ name: 'orders.index' }" custom v-slot="{ href, navigate }">
            <NavItem class="favorites" icon="basket-minus" text="Мои покупки" tag="a" :href="href" @click="navigate" />
          </router-link>
          <router-link :to="{ name: 'estimates.finished' }" custom v-slot="{ href, navigate }">
            <NavItem class="favorites" icon="basket-plus" text="Мои продажи" tag="a" :href="href" @click="navigate" />
          </router-link>
          <router-link :to="{ name: 'catalog.favorites' }" custom v-slot="{ href, navigate }">
            <NavItem class="favorites" icon="heart-2" text="Избранное" tag="a" :href="href" @click="navigate" />
          </router-link>

          <router-link :to="{ name: 'referrals.index' }" custom v-slot="{ href, navigate }">
            <NavItem class="favorites" icon="chain-3" text="Реферальная программа" tag="a" :href="href" @click="navigate" />
          </router-link>
          <router-link :to="{ name: 'profile.notifications' }" custom v-slot="{ href, navigate }">
            <NavItem icon="notification" text="Push-уведомления" tag="a" :href="href" @click="navigate" />
          </router-link>
          <NavItem
            class="logout"
            icon="logout"
            text="Выход"
            @click="showedLogout = true"
          />
        </template>
        <template v-else>
          <router-link :to="{ name: 'catalog.favorites' }" custom v-slot="{ href, navigate }">
            <NavItem class="favorites" icon="heart-2" text="Избранное" tag="a" :href="href" @click="navigate" />
          </router-link>
        </template>
      </div>
      <div class="tw-mt-8" v-if="!authStore.user">
        <p class="tw-mb-4 tw-text-center">Для использования всех возможностей приложения необходима авторизация</p>
        <BaseButton class="tw-w-full" text="Войти" :to="{ name: 'auth.login' }" />
      </div>
    </div>
    <ModalLogout
      v-if="authStore.user"
      v-model="showedLogout"
    />
  </q-page>
</template>

<script setup lang="ts">
  import CardNamePhone from 'src/components/Profile/CardNamePhone.vue';
  import ModalLogout from 'src/components/Profile/ModalLogout.vue';
  import NavItem from 'src/components/Profile/NavItem.vue';
  import { useAuthStore } from 'src/stores/auth';

  const authStore = useAuthStore();

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
