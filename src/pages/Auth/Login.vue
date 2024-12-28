<template>
  <q-page class="tw-container tw-grid env-t-40 env-b-40">
    <Form
      class="tw-grid tw-content-between tw-h-full tw-grid-rows-[1fr_auto] tw-pt-10"
      @submit="send"
    >
      <div>
        <div class="tw-mb-10">
          <h1 class="tw-mb-3 tw-text-center">Введите номер телефона</h1>
          <div class="tw-text-center">Отправим код подтверждения</div>
        </div>
        <base-input
          class="tw-mb-5"
          label="Номер телефона"
          name="phone"
          type="tel"
          maska="+7 (###)-###-##-##"
          placeholder="+7 (000)-000-00-00"
          :rules="loginSchema.phone"
          v-model="form.phone"
        />
      </div>
      <div>
        <BaseButton
          type="submit"
          text="Продолжить"
          theme="gradient"
          class="tw-mb-5"
          :disabled="loading"
        />
        <div class="tw-text-t2 tw-text-card-descr tw-text-center">
          Нажимая «Продолжить», я принимаю условия
          <a href="#" class="tw-text-[#4D55FF]">
            Пользовательского соглашения
          </a>
        </div>
      </div>
    </Form>
  </q-page>
</template>

<script setup lang="ts">
  import { Form } from 'vee-validate';
  import { loginSchema } from 'src/schemas/auth';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from 'src/stores/auth';

  const authStore = useAuthStore();

  const router = useRouter();

  const form = reactive({
    phone: '',
  });

  const { send, loading } = usePostRequest(
    useRepositories().auth.sendCode,
    () => form,
    () => {
      authStore.setUserPhone(form.phone);
      router.replace({ name: 'auth.verify-code' });
    }
  );
</script>
