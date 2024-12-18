<template>
  <q-page class="env-t">
    <div class="tw-container tw-pt-6">
      <div class="tw-relative tw-flex tw-justify-center tw-mb-6">
        <div
          @click="$router.go(-1)"
          class="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2">
          <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
        </div>
        <div class="tw-text-h1 tw-font-bold">Реферальная программа</div>
      </div>
      <div class="tw-grid tw-gap-5">
        <div
          class="tw-shadow-card tw-rounded-20 tw-bg-white tw-p-4 tw-flex tw-gap-3">
          <div
            class="tw-w-8 tw-h-8 tw-rounded-6 tw-grid tw-place-content-center tw-bg-[#FFF3DD]">
            <BaseIcon name="ruble" class="tw-w-4 tw-h-4 tw-text-brown" />
          </div>
          <div class="tw-grid tw-gap-1">
            <h2>3 300 ₽</h2>
            <div class="tw-text-t1 tw-text-card-descr">Реферальный счет</div>
          </div>
        </div>
        <div
          class="tw-shadow-card tw-rounded-20 yellor-gr tw-p-4 tw-grid tw-gap-3.5">
          <div class="tw-flex tw-gap-3">
            <div
              class="tw-w-8 tw-h-8 tw-rounded-6 tw-grid tw-place-content-center tw-bg-el tw-shrink-0">
              <BaseIcon name="logout" class="tw-w-4 tw-h-4 tw-text-brown" />
            </div>
            <div class="tw-grid tw-gap-1.5">
              <div class="tw-text-t1 tw-font-bold">
                Зарабатывайте на рефералах
              </div>
              <div class="tw-text-t2 tw-text-card-descr">
                2,5% от суммы чека
              </div>
            </div>
          </div>
          <div
            class="tw-bg-white tw-rounded-10 tw-text-t2 tw-py-2 tw-px-4 tw-flex tw-justify-between tw-items-center">
            <div>text</div>
            <BaseIcon name="copy" class="tw-w-5 tw-h-5 tw-text-gray-black" />
          </div>
        </div>
        <div
          class="tw-shadow-card tw-rounded-20 tw-bg-white tw-p-4 tw-flex tw-gap-3 tw-items-center">
          <div
            class="tw-w-8 tw-h-8 tw-rounded-6 tw-grid tw-place-content-center tw-bg-[#FFF3DD]">
            <BaseIcon name="plus" class="tw-w-4 tw-h-4 tw-text-brown" />
          </div>
          <div class="tw-text-t1">Приглашенные друзья</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "ReferalsPage",
});
</script>
