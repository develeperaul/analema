<template>
  <div v-if="authStore.user?.email">
    <div class="label">Ваш e-mail</div>
    <NavItem
      class="card"
      icon="mail"
      tag="div"
      :text="authStore.user.email"
    />
  </div>
</template>

<script setup lang="ts">
  import NavItem from 'src/components/Profile/NavItem.vue';
  import { useAuthStore } from 'src/stores/auth';

  const authStore = useAuthStore();
</script>

<style scoped lang="scss">
  .label {
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    color: #515151;
    margin-bottom: 8px;
  }

  .card :deep(.text) {
    font-weight: 700;
    font-size: 14px;
    line-height: 1;
  }
</style>
