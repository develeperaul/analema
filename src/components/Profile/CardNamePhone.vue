<template>
  <router-link v-if="authStore.user" class="tw-flex tw-items-start tw-gap-4" :to="{ name: 'profile.update' }">
    <div class="tw-grow">
      <div class="tw-mb-[6px] tw-text-t1 tw-font-bold tw-text-base">
        {{ authStore.user.name }}
      </div>
      <div class="tw-text-t2 tw-text-base">
        {{ authStore.user.phone }}
      </div>
    </div>
    <span class="icon-wrap">
      <BaseIcon name="pen" fit color="#DFA543" />
    </span>
  </router-link>
</template>

<script setup lang="ts">
  import { useAuthStore } from 'src/stores/auth';

  const authStore = useAuthStore();
</script>

<style scoped lang="scss">
  .icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    padding: 7px;
    background-color: #FFF3DD;
  }
</style>
