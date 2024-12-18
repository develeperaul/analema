<template>
  <q-page class="">
    <div class="purple-yellor-gr env-t tw-rounded-b-24 tw-mb-6">
      <div class="tw-pb-6 tw-pt-7.5">
        <div class="tw-relative tw-flex tw-justify-center">
          <div @click="$router.go(-1)" class="tw-absolute tw-left-5 tw-top-0">
            <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
          </div>
          <div class="tw-grid tw-gap-3 tw-justify-items-center">
            <div
              class="tw-bg-el tw-rounded-12 tw-grid tw-place-content-center tw-w-[50px] tw-h-[50px]">
              <baseIcon name="shopping" class="tw-w-7.5 tw-h-7.5" />
            </div>
            <div class="tw-text-h1 tw-font-bold">Мои покупки</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-container tw-grid tw-gap-7.5">
      <TabItemList v-model="tab" :options="tabs" class="tw-mb-2 lg:tw-mb-4" />
      <div class="tw-rounded-20 tw-p-4 tw-bg-gray-light">
        <div class="tw-grid tw-gap-1.5 tw-mb-3">
          <div class="tw-text-h2 tw-font-bold">Заказ № 531-141</div>
          <div class="tw-text-t2 tw-text-card-descr">4 октября 2024</div>
        </div>
        <div class="tw-border-b tw-border-[#D2D2E0] tw-mb-2.5"></div>
        <div class="tw-grid tw-gap-1.5 tw-mb-3.5">
          <div class="tw-text-t2 tw-text-card-descr">Статус</div>
          <div class="tw-text-t1">Оценка товара</div>
        </div>
        <div class="tw-grid tw-gap-1.5">
          <div class="tw-text-t2 tw-text-card-descr">Товар</div>
          <div class="tw-text-t1">Кольцо из красного золота проба 585</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TabItemList from "src/components/TabItemList.vue";

defineOptions({
  name: "IndexPage",
});
const open = ref(false);
const isOpenModal = ref(false);
const tab = ref<string | null>(null);
const tabs = [
  {
    name: "active",
    label: "Активные",
  },
  {
    name: "completed",
    label: "Завершенные",
  },
];
</script>
<style lang="scss"></style>
