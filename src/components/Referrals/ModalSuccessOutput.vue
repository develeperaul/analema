<template>
  <Modal v-model="showed">
    <div class="tw-w-full tw-h-full tw-max-w-[600px] tw-bg-white tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-between tw-pt-[40px] tw-pb-[60px]">
      <div></div>
      <div class="tw-text-center">
        <div class="tw-w-[80px] tw-h-[80px] tw-rounded-20 tw-bg-el tw-p-[15px] tw-mx-auto">
          <BaseIcon name="success" fit />
        </div>
        <p class="tw-mt-8 tw-text-h1 tw-text-base tw-font-bold">Ваша заявка принята!</p>
        <p class="tw-mt-[10px] tw-text-t1 tw-text-card-descr tw-max-w-[200px] tw-mx-auto">
          Заявка будет обработана в течение 5 рабочих дней
        </p>
      </div>
      <BaseButton text="На главную" to="/" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import Modal from 'src/components/Base/Modal.vue';

  const showed = defineModel({ default: false });
</script>
