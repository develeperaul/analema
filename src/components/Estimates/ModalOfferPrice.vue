<template>
  <Modal v-model="value" y-pos="bottom" animation="slide-right">
    <div class="card">
      <div class="tw-text-right tw-mb-5">
        <ButtonClose @click="value = false" />
      </div>
      <p class="tw-mb-5 tw-text-center tw-text-h1 tw-font-bold">
        Предложить свою цену
      </p>
      <VForm @submit="ok">
        <BaseInput
          label="Ваша цена"
          name="comment"
          type="number"
          :rules="commentRule"
          v-model="comment"
        />
        <BaseButton class="tw-mt-8" text="Отправить" type="submit" :disabled="loading" />
      </VForm>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import ButtonClose from 'src/components/Base/ButtonClose.vue';
  import Modal from 'src/components/Base/Modal.vue';
  import { ref } from 'vue';
  import { Form as VForm } from 'vee-validate';
  import { string } from 'yup';

  const commentRule = string().required()
    .test(
      'number',
      'Должно быть целым положительным числом',
      val => /^[0-9]+$/.test(val)
    ).label('цена');

  defineProps<{
    loading: boolean,
  }>();

  const value = defineModel({
    default: false,
  });

  const emit = defineEmits<{
    (event: 'ok', comment: string): void,
  }>();

  const comment = ref('');

  function ok() {
    emit('ok', comment.value);
  }
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
