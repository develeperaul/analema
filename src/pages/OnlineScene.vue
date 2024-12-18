<template>
  <q-page class="">
    <div class="purple-gr env-t tw-rounded-b-24 tw-mb-6">
      <div class="tw-container tw-pb-8 tw-pt-8">
        <BaseHeader title="Онлайн-оценка" back />
      </div>
    </div>
    <div class="tw-container tw-grid tw-gap-7.5">
      <div class="">
        <h2 class="tw-mb-3">Выберите категорию</h2>
        <div class="tw-relative">
          <div
            class="tw-grid tw-gap-2.5 tw-overflow-auto"
            :class="{ 'tw-h-[259px]': !open }">
            <Radio label="test" v-for="n in 10" class="last:tw-mb-10" />
          </div>
          <!-- <Radio label="test" class="last:tw-pb-4 tw-block" /> -->
          <div
            class="tw-shadow-blur tw-bg-white tw-h-4 tw-w-full tw-absolute tw-bottom-0"></div>
        </div>
        <div
          class="tw-text-blue tw-text-t2 tw-cursor-pointer"
          @click="open = !open">
          {{ open ? "Скрыть" : "Показать еще" }}
        </div>
      </div>
      <div>
        <h2 class="tw-mb-3">Фотографии товара</h2>
        <div class="tw-mb-2.5">
          <div
            class="tw-rounded-20 tw-grid tw-place-content-center tw-w-[100px] tw-h-[100px] tw-bg-gray-light tw-cursor-pointer">
            <base-icon
              name="add-photo"
              class="tw-text-gray-black tw-h-6 tw-w-6" />
          </div>
        </div>
        <div class="tw-text-t2 tw-text-card-descr">
          Сделайте фото товара с разных ракурсов
        </div>
      </div>
      <!-- <BaseButton disabled text="Отправить" /> -->
      <BaseButton @click="isOpenModal = true" text="Отправить" />
    </div>
    <Modal v-if="isOpenModal">
      <div
        class="tw-grid tw-justify-items-center tw-gap-8 tw-h-full tw-content-center">
        <base-icon name="monitor" class="tw-w-[140px] tw-h-[140px]" />
        <div class="tw-font-bold tw-text-h2 tw-text-center">
          Онлайн-оценка займет <br />
          всего несколько секунд...
        </div>
      </div>
    </Modal>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "IndexPage",
});
const open = ref(false);
const isOpenModal = ref(false);
</script>
<style lang="scss"></style>
