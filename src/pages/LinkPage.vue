<template>
  <q-page class="">
    <div class="yellor-gr env-t tw-rounded-b-24 tw-mb-6">
      <div class="tw-pb-8 tw-pt-7.5">
        <div class="tw-container">
          <div @click="$router.go(-1)" class="">
            <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
          </div>
          <div class="tw-grid tw-gap-3 tw-justify-items-center">
            <div
              class="tw-bg-el tw-rounded-20 tw-grid tw-place-content-center tw-w-[80px] tw-h-[80px]">
              <baseIcon name="chain-2" class="tw-w-[52px] tw-h-[52px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-container tw-grid tw-gap-4">
      <div class="tw-bg-bg tw-p-4 tw-rounded-20">
        <div class="tw-text-h1 tw-font-bold tw-mb-3">
          Ссылка для приглашения
        </div>
        <div
          class="tw-bg-white tw-rounded-10 tw-text-t2 tw-py-2 tw-px-4 tw-flex tw-justify-between tw-items-center">
          <div>text</div>
          <BaseIcon name="copy" class="tw-w-5 tw-h-5 tw-text-gray-black" />
        </div>
      </div>
      <div class="tw-bg-bg tw-p-4 tw-rounded-20">
        <div class="tw-text-h1 tw-font-bold tw-mb-2">2,5%</div>
        <div class="tw-text-card-descr">
          От суммы чека вы получаете с каждой покупки друга
        </div>
      </div>
      <div
        class="tw-shadow-card tw-rounded-20 tw-bg-white tw-p-4 tw-flex tw-gap-3 tw-items-center tw-justify-between">
        <div class="tw-text-t1">Правила реферальной программы</div>
        <BaseIcon name="forward" class="tw-w-5 tw-h-5 tw-text-gray-black" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "LinkPage",
});
</script>
