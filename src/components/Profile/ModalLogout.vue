w<template>
  <Modal v-model="showed" yPos="bottom" xPos="center" animation="slide-right">
    <div class="card">
      <div class="tw-text-right tw-mb-4">
        <ButtonClose @click="showed = false" />
      </div>
      <p class="tw-text-h2 tw-font-bold tw-text-base tw-mb-6 tw-max-w-[260px] tw-mx-auto tw-text-center">
        Вы действительно хотите выйти из приложения?
      </p>
      <div class="tw-flex tw-gap-[5px]">
        <BaseButton class="tw-w-full" border text="Да" @click="logout" />
        <BaseButton class="tw-w-full" text="Нет" @click="showed = false" />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import Modal from 'src/components/Base/Modal.vue';
  import { clearUserData } from 'src/utils/storage';

  const showed = defineModel<boolean>({ default: false });

  function logout() {
    clearUserData();
    location.reload();
  }
</script>

<style scoped lang="scss">
  .card {
    max-width: 600px;
    padding: 30px 20px;
    padding-top: 25px;
    @apply tw-w-full tw-rounded-20 tw-bg-white;
  }
</style>
