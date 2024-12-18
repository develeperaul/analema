<template>
  <q-page class="env-t">
    <div class="tw-container tw-pt-6">
      <div class="tw-relative tw-flex tw-justify-center tw-mb-6">
        <div
          @click="$router.go(-1)"
          class="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2">
          <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
        </div>
        <div class="tw-text-h1 tw-font-bold">Корзина</div>
      </div>
      <div class="tw-mb-9">
        <h2 class="tw-mb-3">В корзине 2 товара</h2>
        <div class="tw-grid tw-gap-3">
          <div
            class="tw-bg-card tw-grid tw-grid-cols-[160px_1fr] tw-rounded-20"
            v-for="n in 3">
            <div class="tw-min-h-[160px] tw-grid tw-place-content-center">
              <img src="/public/test.png" alt="" />
            </div>
            <div class="tw-py-5 tw-px-2.5 tw-grid tw-content-between tw-gap-5">
              <div>
                <div class="tw-text-t2 tw-mb-2.5">
                  Кольцо из красного золота проба 585
                </div>
                <h2 class="">45 000 ₽</h2>
              </div>
              <div class="tw-flex tw-gap-2">
                <div
                  class="tw-w-8 tw-h-8 tw-grid tw-place-content-center tw-bg-yellow-brown tw-rounded-6">
                  <BaseIcon
                    name="delete"
                    class="tw-text-brown tw-w-[18px] tw-h-[18px]" />
                </div>
                <div
                  class="tw-w-8 tw-h-8 tw-grid tw-place-content-center tw-bg-yellow-brown tw-rounded-6">
                  <BaseIcon
                    name="heart-2"
                    class="tw-text-brown tw-w-[18px] tw-h-[18px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tw-mb-12">
        <h2 class="tw-mb-5">Способ получения</h2>
        <div
          class="tw-flex tw-h-12 tw-bg-[#F5F5FA] tw-rounded-16 tw-overflow-hidden tw-mb-5">
          <div
            v-for="n in tabs"
            @click="tab = n.name"
            class="tw-h-full tw-flex tw-items-center tw-justify-center tw-w-full tw-rounded-16 tw-font-medium"
            :class="[
              tab === n.name
                ? ' tw-bg-tab tw-text-white'
                : 'tw-text-card-descr',
            ]">
            {{ n.label }}
          </div>
        </div>
        <div v-if="tab === 'pickup'">
          <SelectCategory class="tw-mb-5" />
          <div class="tw-grid tw-gap-2.5">
            <Radio label="test" v-for="n in 2" />
          </div>
        </div>
        <div v-if="tab === 'courier'">
          <div class="tw-mb-5">
            <h2 class="tw-mb-3">Адрес</h2>
            <div class="tw-grid tw-grid-cols-2 tw-gap-x-[15px] tw-gap-y-2.5">
              <base-input
                class="tw-col-span-2"
                name="address"
                rules="required"
                label="Адрес и номер дома" />
              <base-input name="apartment" rules="required" label="Квартира" />
              <base-input name="entrance" rules="required" label="Подъезд" />
            </div>
          </div>
          <div class="tw-mb-6">
            <h2 class="tw-mb-3">Дата и время</h2>
            <div class="tw-grid tw-grid-cols-2 tw-gap-x-[15px]">
              <SelectCategory />
              <SelectCategory />
            </div>
          </div>
          <div class="tw-text-t2 tw-text-card-descr">
            Курьер дополнительно свяжется с вами. При себе необходимо иметь
            паспорт
          </div>
        </div>
      </div>

      <div class="tw-pb-7.5">
        <h2 class="tw-flex tw-items-center tw-justify-between tw-mb-5">
          <span> Итого к оплате </span>
          <span> 45 000 ₽ </span>
        </h2>
        <BaseButton text="Перейти к оплате" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TabItemList from "src/components/TabItemList.vue";

defineOptions({
  name: "Tovar",
});

const tab = ref<string | null>("pickup");
const tabs = [
  {
    name: "pickup",
    label: "Самовывоз",
  },
  {
    name: "courier",
    label: "Курьер",
  },
];
const isFavorite = ref(false);
const favorite = (id) => {
  console.log(id);
};
</script>
<style lang="scss"></style>
