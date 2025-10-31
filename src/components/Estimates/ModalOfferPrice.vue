<template>
  <Modal v-model="value" y-pos="bottom" animation="slide-right">
    <div class="card">
      <div class="tw-text-right tw-mb-5">
        <ButtonClose @click="value = false" />
      </div>
      <p class="title">
        Если Вас не устроила цена, то Вы можете предложить свою
      </p>
      <VForm @submit="ok">
        <BaseInput
          label="Ваша цена"
          name="summ"
          type="number"
          :rules="rules.summ"
          v-model="form.summ"
        />
        <BaseTextarea
          class="comment"
          label="Другая причина"
          name="comment"
          v-model="form.comment"
        />
        <BaseInput
          v-if="!authStore.user"
          class="tw-mt-6"
          label="Номер телефона"
          name="phone"
          type="tel"
          maska="+7 (###)-###-##-##"
          placeholder="+7 (000)-000-00-00"
          v-model="form.phone"
          :rules="rules.phone"
        />
        <BaseButton class="tw-mt-12" text="Отправить" type="submit" :disabled="loading" />
        <router-link class="home" :to="{ name: 'home' }">На главную</router-link>
      </VForm>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import BaseTextarea from 'src/components/Base/Textarea.vue';
  import ButtonClose from 'src/components/Base/ButtonClose.vue';
  import Modal from 'src/components/Base/Modal.vue';
  import { reactive } from 'vue';
  import { Form as VForm } from 'vee-validate';
  import { string } from 'yup';
  import { phoneTest } from 'src/utils/validation';
  import { useAuthStore } from 'src/stores/auth';

  export interface Form {
    summ: string,
    comment: string,
    phone: string,
  }

  const rules = {
    summ: string().required()
      .test(
        'number',
        'Должно быть целым положительным числом',
        val => /^[0-9]+$/.test(val)
      ).label('цена'),
    phone: string().required().test(...phoneTest).label('Номер телефона'),
  };

  defineProps<{
    loading: boolean,
  }>();

  const value = defineModel({
    default: false,
  });

  const emit = defineEmits<{
    (event: 'ok', data: Form): void,
  }>();

  const form: Form = reactive({
    summ: '',
    comment: '',
    phone: '',
  });

  function ok() {
    emit('ok', { ...form });
  }

  const authStore = useAuthStore();
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

  .title {
    margin-bottom: 18px;
    font-size: 20px;
    line-height: 1.25;
  }

  .comment {
    margin-top: 25px;

    & :deep(label) {
      font-weight: 400;
      font-size: 20px;
      line-height: 1.25;
    }

    & :deep(.inp) {
      @apply tw-bg-card tw-border-card;
    }
  }

  .home {
    margin-top: 20px;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.3;
    text-align: center;
    display: block;
    width: 100%;
    padding: 4px;
  }
</style>
