<template>
  <q-page class="env-t">
    <div class="tw-container tw-pt-6 tw-pb-[78px]">
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-5">
        <div @click="$router.go(-1)" class="">
          <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
        </div>
        <svg
          @click.stop="isFavorite = !isFavorite"
          class="heart"
          :class="{ heart__active: isFavorite }"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.1059 19.4728L12.103 19.4743C12.0716 19.4911 12.0362 19.5 12 19.5C11.9638 19.5 11.9284 19.4911 11.897 19.4743L11.8941 19.4728C11.7136 19.378 9.33577 18.0924 7.01071 16.0727C4.65863 14.0296 2.50014 11.3551 2.5 8.49116C2.50158 7.16922 3.03167 5.90105 3.97531 4.96504C4.9191 4.0289 6.19956 3.50156 7.53601 3.5C9.23513 3.50008 10.6967 4.22247 11.6013 5.41753L12 5.94419L12.3987 5.41753C13.3033 4.22247 14.7649 3.50008 16.464 3.5C17.8004 3.50156 19.0809 4.0289 20.0247 4.96504C20.9684 5.90111 21.4985 7.16941 21.5 8.49145C21.4997 11.3553 19.3413 14.0296 16.9893 16.0727C14.6642 18.0924 12.2864 19.378 12.1059 19.4728Z"
            fill="white"
            stroke="#181818" />
        </svg>
      </div>
      <div class="tw-mb-6">
        <div
          class="tw-flex tw-gap-2 -tw-mx-5 tw-px-5 tw-mb-3.5 tw-overflow-auto">
          <div
            class="tw-h-[250px] tw-bg-card tw-rounded-20 tw-w-full tw-grid tw-place-content-center tw-shrink-0">
            <img src="/public/test.png" alt="" />
          </div>
          <div
            class="tw-h-[250px] tw-bg-card tw-rounded-20 tw-w-full tw-grid tw-place-content-center tw-shrink-0">
            <img src="/public/test.png" alt="" />
          </div>
          <div
            class="tw-h-[250px] tw-bg-card tw-rounded-20 tw-w-full tw-grid tw-place-content-center tw-shrink-0">
            <img src="/public/test.png" alt="" />
          </div>
        </div>
        <h2 class="tw-mb-2">45 000 ₽</h2>
        <div class="tw-text-t1 tw-font-bold">
          Кольцо из красного золота проба 585
        </div>
      </div>
      <TabItemList v-model="tab" :options="tabs" class="tw-mb-3.5" />
      <TabBody v-model="tab" class="tw-mb-6">
        <TabContent name="ch" class="tw-grid tw-gap-2.5">
          <div class="tw-grid tw-grid-cols-[110px_1fr] tw-gap-7.5">
            <div class="tw-text-t2 tw-text-card-descr">Состав</div>
            <div class="tw-text-t2">Красное золото</div>
          </div>
          <div class="tw-grid tw-grid-cols-[110px_1fr] tw-gap-7.5">
            <div class="tw-text-t2 tw-text-card-descr">Проба</div>
            <div class="tw-text-t2">585</div>
          </div>
          <div class="tw-grid tw-grid-cols-[110px_1fr] tw-gap-7.5">
            <div class="tw-text-t2 tw-text-card-descr">Вес</div>
            <div class="tw-text-t2">3 гр</div>
          </div>
          <div class="tw-grid tw-grid-cols-[110px_1fr] tw-gap-7.5">
            <div class="tw-text-t2 tw-text-card-descr">Размер</div>
            <div class="tw-text-t2">17</div>
          </div>
          <div class="tw-grid tw-grid-cols-[110px_1fr] tw-gap-7.5">
            <div class="tw-text-t2 tw-text-card-descr">
              Страна происхождения
            </div>
            <div class="tw-text-t2">Россия</div>
          </div>
        </TabContent>
      </TabBody>

      <div>
        <h2 class="tw-mb-3">Для вас</h2>
        <div class="tw-gap-x-2.5 tw-gap-y-4 tw-grid tw-grid-cols-2">
          <Card v-for="n in 6" @favorite="favorite" />
        </div>
      </div>
      <div
        class="tw-fixed tw-bottom-[79px] tw-left-0 tw-py-4 tw-bg-white tw-w-full tw-px-5">
        <BaseButton text="В корзину" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TabItemList from "src/components/TabItemList.vue";

defineOptions({
  name: "Tovar",
});

const tab = ref<string | null>("ch");
const tabs = [
  {
    name: "ch",
    label: "Характеристики",
  },
  {
    name: "descr",
    label: "Описание",
  },
];
const isFavorite = ref(false);
const favorite = (id) => {
  console.log(id);
};
</script>
<style lang="scss"></style>
