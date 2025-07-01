<template>
  <q-dialog maximized v-model="value">
    <div class="tw-bg-white tw-py-8 tw-px-5 tw-flex tw-flex-col tw-justify-center tw-items-center">
      <div class="tw-max-w-[420px] tw-w-full tw-text-center">
        <Transition
          enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster"
        >
          <div class="alert tw-mb-10" v-if="showedAlert">
            <span class="alert__text">Отсутствует соединение<br/>с интернетом</span>
            <button class="alert__close" @click="showedAlert = false">
              <BaseIcon fit name="close" />
            </button>
          </div>
        </Transition>
        <div class="tw-w-[110px] tw-mx-auto">
          <img width="110" height="110" src="~/assets/images/alerts/offline.svg" />
        </div>
        <div class="tw-text-h1 tw-font-bold tw-text-el tw-mt-10">
          Соединение с интернетом отсутствует
        </div>
        <p class="tw-mt-4 tw-text-base tw-text-t1">
          Проверьте Ваше интернет-соединение
        </p>
        <BaseButton class="tw-mt-8 tw-w-full" text="Обновить страницу" @click="reload" />
      </div>
      </div>
  </q-dialog>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue';

  const value = ref(!window.navigator.onLine);
  const showedAlert = ref(false);

  window.addEventListener('offline', () => {
    value.value = true;
  });

  function reload() {
    showedAlert.value = false;
    if(window.navigator.onLine) {
      window.location.reload();
    } else {
      nextTick(() => {
        showedAlert.value = true;
      });
    }
  }
</script>

<style scoped lang="scss">
  .alert {
    padding: 8px 30px;
    padding-right: 20px;
    background: rgba(254, 46, 46, 0.65);
    display: flex;
    align-items: center;
    border-radius: 14px;
    @apply tw-text-white;

    &__close {
      width: 24px;
      height: 24px;
      padding: 4px;
    }

    &__text {
      @apply tw-text-t1 tw-font-bold tw-grow tw-text-left;
    }
  }
</style>
