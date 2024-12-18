<template>
  <q-page class="">
    <div class="purple-yellor-gr env-t tw-rounded-b-24 tw-mb-6">
      <div class="tw-pb-6 tw-pt-4">
        <div class="tw-relative tw-flex tw-justify-center">
          <div @click="$router.go(-1)" class="tw-absolute tw-left-5 tw-top-0">
            <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
          </div>
          <div class="tw-grid tw-gap-3 tw-justify-items-center">
            <div
              class="tw-bg-el tw-rounded-12 tw-grid tw-place-content-center tw-w-[50px] tw-h-[50px]">
              <baseIcon name="box" class="tw-w-7.5 tw-h-7.5" />
            </div>
            <div class="tw-text-h1 tw-font-bold">Мои продажи</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-container tw-grid tw-gap-7.5">
      <TabItemList v-model="tab" :options="tabs" class="tw-mb-2 lg:tw-mb-4" />
      <TabBody v-model="tab">
        <TabContent name="active">
          <div class="tw-grid tw-gap-3">
            <div
              @click="isOpenModal = true"
              class="tw-rounded-20 tw-p-4 tw-bg-gray-light">
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
                <div class="tw-text-t1">
                  Кольцо из красного золота проба 585
                </div>
              </div>
            </div>
            <div
              @click="isOpenModal = true"
              class="tw-rounded-20 tw-p-4 tw-bg-gray-light">
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
                <div class="tw-text-t1">
                  Кольцо из красного золота проба 585
                </div>
              </div>
            </div>
          </div>
        </TabContent>
        <TabContent name="completed">
          <div class="tw-grid tw-gap-3">
            <div
              @click="isOpenModal = true"
              class="tw-rounded-20 tw-p-4 tw-bg-gray-light">
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
                <div class="tw-text-t1">
                  Кольцо из красного золота проба 585
                </div>
              </div>
            </div>
          </div>
        </TabContent>
        <TabContent name="сanceled">
          <div class="tw-grid tw-gap-3">
            <div
              @click="isOpenModal = true"
              class="tw-rounded-20 tw-p-4 tw-bg-gray-light">
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
                <div class="tw-text-t1">
                  Кольцо из красного золота проба 585
                </div>
              </div>
            </div>
          </div>
        </TabContent>
      </TabBody>
    </div>
    <Modal v-if="isOpenModal" class="tw-container env-t">
      <div
        class="tw-grid tw-content-between tw-grid-rows-[1fr_auto] tw-gap-8 tw-h-full tw-pt-[35px]">
        <div class="">
          <div class="tw-mb-6 tw-relative tw-flex tw-justify-center">
            <baseIcon
              @click="isOpenModal = false"
              name="back"
              class="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-w-[17px] tw-h-[17px]" />
            <h2>Заказ № 531-141</h2>
          </div>
          <div class="tw-grid tw-gap-5">
            <div>
              <h2 class="tw-mb-1.5">Дата</h2>
              <div>4 октября 2024</div>
            </div>
            <div>
              <h2 class="tw-mb-1.5">Статус</h2>
              <div>Оценка товара</div>
            </div>
            <div>
              <h2 class="tw-mb-1.5">Наименование товара</h2>
              <div>Серьги золотые из красного золота проба 585</div>
            </div>
            <div>
              <h2 class="tw-mb-2.5">Фотографии</h2>
              <div class="tw-flex tw-gap-3 tw-flex-wrap">
                <img
                  v-for="n in 2"
                  src="/public/test.png"
                  alt=""
                  class="tw-w-[100px] tw-h-[100px] tw-shrink-0 tw-rounded-20 tw-object-cover" />
              </div>
            </div>
          </div>
        </div>
        <BaseButton text="Отменить сделку" to="/" class="" />
      </div>
    </Modal>
  </q-page>
</template>

<script setup lang="ts">
import TabItemList from "src/components/TabItemList.vue";

defineOptions({
  name: "IndexPage",
});
const open = ref(false);
const isOpenModal = ref(false);
const tab = ref<string | null>("active");
const tabs = [
  {
    name: "active",
    label: "Активные",
  },
  {
    name: "completed",
    label: "Завершенные",
  },
  {
    name: "сanceled",
    label: "Отмененные",
  },
];
</script>
<style lang="scss"></style>
