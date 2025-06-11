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
            <div class="tw-mb-4 tw-mx-auto tw-w-[80px] tw-h-[80px]">
              <img class="tw-w-full" width="80px" height="80px" src="~/assets/images/battery.svg" />
            </div>
            <div class="tw-max-w-[222px] tw-mx-auto tw-text-center">
              Для использования всех возможностей приложения необходима авторизация.
            </div>
          </div>
          <div>
            <h1 class="tw-mb-3 tw-text-center">Введите номер телефона</h1>
            <p class="tw-text-t1 tw-mb-5 tw-text-center">Отправим код подтверждения</p>
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
        </div>
        <div class="tw-pb-5">
          <BaseButton
            type="submit"
            text="Продолжить"
            theme="gradient"
            class="tw-mb-5"
            :disabled="loading || !accepted"
          />
          <BaseCheckbox v-model="accepted" checkedValue="ok" uncheckedValue="" label="">
            <span class="accept-text">
              Я соглашаюсь с
              <a :href="config.userAgrement" target="_blank">Политикой конфиденциальности</a> и&nbsp;условиями
              <a :href="config.userAgrement" target="_blank">Пользовательского соглашения</a>
            </span>
          </BaseCheckbox>
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
  import BaseCheckbox from 'src/components/Base/Checkbox.vue';

  const config = useConfig();

  const authStore = useAuthStore();

  const router = useRouter();

  const form = reactive({
    phone: '',
  });

  const accepted = ref('');

  const { send, loading } = usePostRequest(
    useRepositories().auth.sendCode,
    () => form,
    () => {
      authStore.setUserPhone(form.phone);
      router.replace({ name: 'auth.verify-code' });
    }
  );
</script>

<style scoped lang="scss">
  .accept-text {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.3;
    @apply tw-text-card-descr;

    a {
      color: #4D55FF;
    }
  }
</style>
