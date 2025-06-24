<template>
  <Form @submit="send">
    <BaseTextarea
      class="textarea"
      name="text"
      label="Текст сообщения"
      :rules="schema.text"
      v-model="form.text"
    />
    <BaseButton
      class="tw-mt-8"
      type="submit"
      text="Отправить"
      :disabled="loading"
    />
  </Form>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import usePostRequest from 'src/composables/usePostRequest';
  import BaseTextarea from 'src/components/Base/Textarea.vue';
  import { Form } from 'vee-validate';
  import { string } from 'yup';
  import { useAuthStore } from 'src/stores/auth';

  const authStore = useAuthStore();

  const api = useRepositories();

  const emit = defineEmits<{
    (event: 'success'): void,
  }>();

  const form = {
    text: '',
  };

  const schema = {
    text: string().required().label('Текст'),
  };

  const { loading, send } = usePostRequest(
    api.profile.createRequest,
    () => ({
      text: form.text,
      email: authStore.user?.email ?? '',
    }),
    () => {
      emit('success');
    },
    'Не удалось отправить заявку!',
  )
</script>

<style scoped lang="scss">
  .textarea :deep(label) {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 8px;
    color: #515151;
  }

  .textarea :deep(.inp) {
    box-shadow: 0 0 20px 4px #e8e8e8;
    @apply tw-bg-white;
  }
</style>
