<template>
  <q-page class="tw-container env-t">
    <BaseHeader title="Профиль" />
    <div class="tw-flex tw-justify-between tw-items-start tw-mb-6">
      <div class="tw-grid tw-gap-1.5">
        <div class="tw-font-bold">Иван</div>
        <div class="tw-text-t2">+7 999 999 99 99</div>
      </div>
      <div
        @click="$router.push({ name: 'profile-data' })"
        class="tw-h-8 tw-w-8 tw-rounded-6 tw-bg-[#FFF3DD] tw-grid tw-place-content-center">
        <BaseIcon
          name="pen"
          class="tw-w-[18px] tw-h-[18px] tw-text-[#DFA543]" />
      </div>
    </div>
    <div class="tw-grid tw-gap-4">
      <div
        class="tw-flex tw-gap-3 tw-items-center tw-py-3.5 tw-px-4 tw-rounded-14 tw-shadow-card">
        <div
          class="tw-h-8 tw-w-8 tw-rounded-6 tw-bg-[#FFF3DD] tw-grid tw-place-content-center">
          <BaseIcon
            name="heart"
            class="tw-w-[18px] tw-h-[18px] tw-text-[#DFA543]" />
        </div>
        <div>Избранное</div>
      </div>
      <div
        @click="$router.push({ name: 'notification-settings' })"
        class="tw-flex tw-gap-3 tw-items-center tw-py-3.5 tw-px-4 tw-rounded-14 tw-shadow-card">
        <div
          class="tw-h-8 tw-w-8 tw-rounded-6 tw-bg-[#FFF3DD] tw-grid tw-place-content-center">
          <BaseIcon
            name="notification"
            class="tw-w-[18px] tw-h-[18px] tw-text-[#DFA543]" />
        </div>
        <div>Push-уведомления</div>
      </div>
      <div
        class="tw-flex tw-gap-3 tw-items-center tw-py-3.5 tw-px-4 tw-rounded-14 tw-shadow-card"
        @click="open = true">
        <div
          class="tw-h-8 tw-w-8 tw-rounded-6 tw-bg-[#FFF3DD] tw-grid tw-place-content-center">
          <BaseIcon
            name="logout"
            class="tw-w-[18px] tw-h-[18px] tw-text-[#DFA543]" />
        </div>
        <div>Выход</div>
      </div>

      <div
        v-if="open"
        class="tw-z-3000 tw-fixed tw-w-full tw-h-full tw-top-0 tw-left-0 tw-bg-black/60">
        <div
          class="tw-absolute tw-bottom-0 tw-pt-[60px] tw-pb-[52px] tw-bg-white tw-rounded-t-20 tw-w-full">
          <div class="tw-container">
            <button
              class="tw-absolute tw-top-4 tw-right-5"
              @click="open = false">
              <base-icon
                name="close"
                class="tw-w-6 tw-h-6 tw-text-card-descr" />
            </button>
            <div class="tw-mb-5 tw-text-center tw-text-h2 tw-font-bold">
              Вы действительно хотите <br />
              выйти из приложения?
            </div>
            <div class="tw-grid tw-grid-cols-2 tw-gap-1">
              <BaseButton
                @click="
                  () => (
                    (open = false), (modalContent = 2), (isOpenModal = true)
                  )
                "
                text="Да"
                border
                class="" />
              <BaseButton
                @click="
                  () => (
                    (open = false), (modalContent = 3), (isOpenModal = true)
                  )
                "
                text="Нет"
                class="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "ProfilePage",
});

const open = ref(false);
</script>
