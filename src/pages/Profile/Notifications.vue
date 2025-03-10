<template>
  <q-page class="page-pb">
    <div class="tw-container">
      <Toolbar class="tw-mb-6" title="Push-уведомления" showBack />
      <div class="tw-space-y-4">
        <BaseToggle
          class="tw-w-full"
          name="uv_zak"
          checkedValue="11"
          uncheckedValue="10"
          label="Уведомление о заказах"
          v-model="form.uv_zak"
        />
        <BaseToggle
          class="tw-w-full"
          name="uv_actions"
          checkedValue="11"
          uncheckedValue="10"
          label="Акции"
          v-model="form.uv_actions"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import BaseToggle from 'src/components/Base/Toggle.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRequest from 'src/composables/useRequest';
  import useRepositories from 'src/composables/useRepositories';
  import { useAuthStore } from 'src/stores/auth';

  const authStore = useAuthStore();

  const form = reactive({
    uv_actions: authStore.user!.uv_actions,
    uv_zak: authStore.user!.uv_zak,
  });

  const api = useRepositories();

  const { send: showProfile } = usePostRequest(
    api.profile.show,
    () => {},
    (user) => {
      authStore.setUser(user.data);
    },
    'Не удалось обновить профиль',
  );

  const { send } = usePostRequest(
    api.profile.update,
    () => form,
    () => {
      showProfile();
    },
    'Не удалось обновить настройки',
  );

  watch(
    () => form,
    () => send(),
    { deep: true },
  );
</script>
