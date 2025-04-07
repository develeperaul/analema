<template>
  <q-page class="wrapper tw-grid env-t env-b">
    <div
      class="tw-grid tw-content-between tw-h-full tw-grid-rows-[1fr_auto] tw-pt-10">
      <div>
        <div class="tw-mb-10">
          <h1 class="tw-mb-3 tw-text-center">Введите код подтверждения</h1>
          <div class="tw-text-center">
            Отправили код на номер {{ authStore.userPhone }}
          </div>
        </div>

        <CodeInput class="tw-flex tw-justify-center" @filled="onFilled" />
        <div class="tw-text-t2 tw-text-card-descr tw-text-center tw-mt-[70px]">
          <BaseCooldown :startFrom="60">
            <template #pending="{ seconds }">
              Отправить код повторно через {{ seconds }} сек
            </template>
            <template #default="{ start }">
              <button @click="handleStart(start)" :disabled="pendingCode">Отправить код</button>
            </template>
          </BaseCooldown>
        </div>
      </div>
    </div>
    <q-inner-loading :showing="loading || loadingProfile" />
  </q-page>
</template>

<script setup lang="ts">
  import BaseCooldown from 'src/components/Base/Cooldown.vue';
  import CodeInput from 'src/components/CodeInput.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { useAuthStore } from 'src/stores/auth';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';
  import * as Token from 'src/utils/token';
  import { usePush } from 'src/boot/push';

  const $q = useQuasar();
  const authStore = useAuthStore();
  const api = useRepositories();
  const push = usePush();
  const router = useRouter();

  const form = reactive({
    code: '',
  });

  const { send: showProfile, loading: loadingProfile } = usePostRequest(
    api.profile.show,
    () => {},
    (res) => {
      authStore.setUser(res.data);
      router.replace({ name: 'auth.profile' });
    },
    'Не удалось загрузить пользователя.',
  );

  const { send, loading } = usePostRequest(
    api.auth.verifyCode,
    () => ({
      phone: authStore.userPhone,
      kod: form.code,
    }),
    (res) => {
      if(!res.data || Array.isArray(res.data)) {
        $q.notify({
          type: 'negative',
          message: 'Проверочный код введен неверно!',
        });
      } else {
        Token.set(res.data.token);
        showProfile();
        push.updateToken();
      }
    },
  );

  function onFilled(code: string) {
    form.code = code;
    send();
  }

  const { send: repeatCode, loading: pendingCode } = usePostRequest(
    api.auth.sendCode,
    () => ({ phone: authStore.userPhone }),
  );

  function handleStart(start: () => void) {
    repeatCode().then(() => start());
  }
  </script>
