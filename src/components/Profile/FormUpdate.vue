<template>
  <Form @submit="send">
    <p class="tw-text-h2 tw-font-bold tw-text-base tw-mb-3">
      Личные данные
    </p>
    <div class="tw-space-y-5">
      <BaseInput name="name" label="Имя" :rules="profileSchema.name" v-model="form.name" />
      <BaseInput name="last_name" label="Фамилия" :rules="profileSchema.last_name" v-model="form.last_name" />
      <BaseInput name="otch" label="Отчество" :rules="profileSchema.otch" v-model="form.otch" />
      <BaseInput name="db" label="Дата рождения" :rules="profileSchema.db" v-model="form.db" />
      <BaseInput name="email" label="E-mail" :rules="profileSchema.email" v-model="form.email" />
    </div>
    <BaseButton class="tw-mt-8" type="submit" text="Сохранить" />
    <q-inner-loading :showing="loading" />
  </Form>
</template>

<script setup lang="ts">
  import { Form } from 'vee-validate';
  import { type ProfileDataBody } from 'src/repositories/profile';
  import useRepositories from 'src/composables/useRepositories';
  import usePostRequest from 'src/composables/usePostRequest';
  import { useAuthStore } from 'src/stores/auth';
  import { profileSchema } from 'src/schemas/profile';
  import { useQuasar } from 'quasar';

  const authStore = useAuthStore();
  const api = useRepositories();

  const form: ProfileDataBody = reactive({
    name: authStore.user!.name,
    last_name: authStore.user!.last_name,
    otch: authStore.user!.otch,
    db: authStore.user!.db,
    address: authStore.user!.address,
    email: authStore.user!.email,
  });

  const $q = useQuasar();

  const { loading, send } = usePostRequest(
    api.profile.update,
    () => form,
    () => {
      $q.notify({
        type: 'positive',
        message: 'Профиль успешно обновлен!',
      });
    },
    'Не удалось обновить профиль',
  );
</script>
