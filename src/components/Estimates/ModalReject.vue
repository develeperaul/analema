<template>
  <Modal v-model="value" y-pos="bottom" animation="slide-right">
    <div class="card">
      <div class="tw-text-right tw-mb-5">
        <ButtonClose @click="value = false" />
      </div>
      <p class="tw-mb-5">
        Мы готовы к торгу, если сейчас вы сможете выйти на видеозвонок с нами
      </p>
      <BaseButton class="tw-mb-3" text="Заказать видеозвонок" :disabled="loading" @click="$emit('accept:video')" />
      <BaseButton border text="Не готов к видеозвонку" :disabled="loading" @click="$emit('reject:video')" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import ButtonClose from 'src/components/Base/ButtonClose.vue';
  import Modal from 'src/components/Base/Modal.vue';

  defineProps<{
    loading: boolean,
  }>();

  const value = defineModel({
    default: false,
  });

  defineEmits<{
    (event: 'accept:video'): void,
    (event: 'reject:video'): void,
  }>();
</script>

<style scoped lang="scss">
  .card {
    max-width: 600px;
    width: 100%;
    padding: 0 20px;
    padding-bottom: 50px;
    padding-top: 16px;
    border-radius: 20px 20px 0 0;
    @apply tw-bg-white;
  }
</style>
