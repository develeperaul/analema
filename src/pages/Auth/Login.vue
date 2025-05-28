<template>
  <q-page class="env-b tw-grid">
    <div class="wrapper tw-h-full tw-flex tw-flex-col">
      <Toolbar showBack />
      <Form
        class="tw-grow tw-grid tw-content-between tw-h-full tw-grid-rows-[1fr_auto] tw-pt-8"
        @submit="send"
      >
        <div>
          <div class="tw-mb-10">
            <h1 class="tw-mb-3 tw-text-center">Для использования всех возможностей приложения необходима авторизация</h1>
            <div class="tw-text-center">Пожалуйста, введите номер телефона. Отправим код подверждения"</div>
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
            <a :href="config.userAgrement" target="_blank" class="tw-text-[#4D55FF]">
              Пользовательского соглашения
            </a>
          </div>
        </div>
      </Form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import Toolbar from 'src/components/LayoutParts/Toolbar.vue';
  import { Form } from 'vee-validate';
  import { loginSchema } from 'src/schemas/auth';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from 'src/stores/auth';
  import { useConfig } from 'src/boot/config';

  const config = useConfig();

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
