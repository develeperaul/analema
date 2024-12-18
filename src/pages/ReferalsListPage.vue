<template>
  <q-page class="env-t">
    <div class="tw-container tw-pt-6">
      <div class="tw-relative tw-flex tw-justify-center tw-mb-6">
        <div
          @click="$router.go(-1)"
          class="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2">
          <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
        </div>
        <div class="tw-text-h1 tw-font-bold">Приглашенные друзья</div>
      </div>

      <div
        class="tw-flex tw-h-12 tw-bg-[#F5F5FA] tw-rounded-16 tw-overflow-hidden tw-mb-5">
        <div
          v-for="n in tabs"
          @click="tab = n.name"
          class="tw-h-full tw-flex tw-items-center tw-justify-center tw-w-full tw-rounded-16 tw-font-medium"
          :class="[
            tab === n.name ? ' tw-bg-tab tw-text-white' : 'tw-text-card-descr',
          ]">
          {{ n.label }}
        </div>
      </div>
      <div v-if="tab === 'new'">
        <!-- <div
          v-for="n in 2"
          class="tw-grid tw-gap-1.5 tw-pb-3.5 [&:not(:first-child)]:tw-pt-3.5 [&:not(:first-child)]:tw-border-t [&:not(:first-child)]:tw-border-[#D7D7D7]">
          <div class="tw-text-h2 tw-font-bold">Ксения Долгорукова</div>
          <div class="tw-text-t1 tw-text-card-descr">Покупок еще нет</div>
        </div> -->
        <div class="tw-relative tw-pb-7.5 tw-pt-10">
          <img src="~assets/images/cloud.png" alt="" width="310" height="267" />
          <BaseIcon
            name="search"
            class="tw-w-[140px] tw-h-[140px] tw-absolute tw-top-1/2 tw-left-1/2 tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2 tw-z-10" />
        </div>
        <h2 class="tw-text-center">
          Приглашенных друзей <br />
          не найдено
        </h2>
      </div>

      <div v-if="tab === 'active'">
        <div
          v-for="n in 2"
          class="tw-flex tw-items-start tw-justify-between tw-pb-3.5 [&:not(:first-child)]:tw-pt-3.5 [&:not(:first-child)]:tw-border-t [&:not(:first-child)]:tw-border-[#D7D7D7]">
          <div class="tw-grid tw-gap-1.5">
            <div class="tw-text-h2 tw-font-bold">Ксения Долгорукова</div>
            <div class="tw-text-t2 tw-text-card-descr">22 октября 2024</div>
          </div>
          <div class="tw-text-h2 tw-font-bold">+ 1 050 ₽</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "ReferalsListPage",
});

const tab = ref<string | null>("new");
const tabs = [
  {
    name: "new",
    label: "Новые",
  },
  {
    name: "active",
    label: "Активированные",
  },
];
</script>
