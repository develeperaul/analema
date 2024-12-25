<template>
  <q-page class="tw-container tw-grid env-t-40 env-b-40">
    <Form
      @submit="send"
      class="tw-grid tw-content-between tw-h-full tw-grid-rows-[1fr_auto] tw-pt-10">
      <div>
        <h1 class="tw-mb-5">
          Для продолжения работы <br />
          введите данные
        </h1>
        <div class="tw-grid tw-gap-5">
          <base-input name="name" :rules="profileSchema.name" label="Имя*" v-model="form.name" />
          <base-input name="last_name" :rules="profileSchema.last_name" label="Фамилия*" v-model="form.last_name" />
          <base-input name="otch" label="Отчество" :rules="profileSchema.otch" v-model="form.otch" />
          <base-input name="db" maska="##.##.####" label="Дата рождения" :rules="profileSchema.db" v-model="form.db" />
          <base-input name="email" label="E-mail" :rules="profileSchema.email" v-model="form.email" />
        </div>
      </div>
      <div>
        <BaseButton
          type="submit"
          text="Продолжить"
          theme="gradient"
          class="tw-mb-5"
          :disabled="loading || loadingProfile"
        />
      </div>
    </Form>
  </q-page>
</template>

<script setup lang="ts">
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { profileSchema } from 'src/schemas/profile';
  import { useAuthStore } from 'src/stores/auth';
  import { useRouter } from 'vue-router';

  const api = useRepositories();

  const authStore = useAuthStore();

  const router = useRouter();

  const form = reactive({
    name: authStore.user!.name,
    last_name: authStore.user!.last_name,
    otch: authStore.user!.otch,
    db: authStore.user!.db,
    email: authStore.user!.email,
  });

  const { send: showProfile, loading: loadingProfile } = usePostRequest(
    api.profile.show,
    () => {},
    (res) => {
      authStore.setUser(res.data);
      router.replace('/');
    },
    'Не удалось загрузить пользователя.',
  );

  const { send, loading } = usePostRequest(
    api.profile.update,
    () => form,
    () => {
      showProfile();
    }
  );
</script>
