<template>
  <q-page class="">
    <div class="purple-gr env-t tw-rounded-b-24 tw-mb-6">
      <div class="tw-container tw-pb-8 tw-pt-8">
        <BaseHeader title="Результаты оценки" back />
      </div>
    </div>
    <div class="tw-container tw-grid tw-gap-7.5">
      <div class="tw-grid tw-gap-5">
        <div>
          <h2 class="tw-mb-1.5">Номер заявки</h2>
          <div>501-255</div>
        </div>
        <div>
          <h2 class="tw-mb-1.5">Наименование товара</h2>
          <div>Серьги золотые из красного золота проба 585</div>
        </div>
      </div>
      <div>
        <h2 class="tw-mb-2.5">Фотографии</h2>
        <div class="tw-flex tw-gap-3 tw-flex-wrap">
          <img
            v-for="n in 4"
            src="/public/test.png"
            alt=""
            class="tw-w-[100px] tw-h-[100px] tw-shrink-0 tw-rounded-20 tw-object-cover" />
        </div>
      </div>
      <div class="tw-p-4 tw-bg-gray-light tw-grid tw-gap-5 tw-rounded-20">
        <div>
          <h2 class="tw-mb-1.5">Стоимость товара</h2>
          <div>23 300 ₽</div>
        </div>
        <div>
          <h2 class="tw-mb-1.5">Комментарий</h2>
          <div>
            На фотографии видно товар только с одной стороны. Сделайте еще
            несколько фотографий.
          </div>
        </div>
      </div>
      <div class="tw-grid tw-gap-3">
        <BaseButton
          @click="() => ((modalContent = 1), (isOpenModal = true))"
          text="Я согласен" />
        <BaseButton border @click="open = true" text="Хочу поторговаться" />
      </div>
    </div>
    <Modal v-if="isOpenModal" class="tw-container">
      <div
        v-if="modalContent === 1"
        class="tw-grid tw-content-between tw-grid-rows-[1fr_auto] tw-gap-8 tw-h-full">
        <div class="tw-grid tw-justify-items-center tw-gap-8 tw-content-center">
          <div
            class="tw-rounded-20 tw-w-20 tw-h-20 tw-bg-el tw-grid tw-place-content-center">
            <base-icon name="mobile-shopping" class="tw-w-[54px] tw-h-[54px]" />
          </div>
          <div class="tw-text-center">
            <h2 class="tw-mb-3">Мы свяжемся с вами</h2>
            <p class="tw-mb-7.5">
              Чтобы назначить дату и время <br />
              встречи с курьером
            </p>
            <div class="tw-text-t2 tw-text-card-descr">Заказ № 501-255</div>
          </div>
        </div>
        <BaseButton text="На главную" to="/" class="" />
      </div>
      <div
        v-if="modalContent === 2"
        class="tw-grid tw-content-between tw-grid-rows-[1fr_auto] tw-gap-8 tw-h-full">
        <div class="tw-grid tw-justify-items-center tw-gap-8 tw-content-center">
          <div
            class="tw-rounded-20 tw-w-20 tw-h-20 tw-bg-el tw-grid tw-place-content-center">
            <base-icon name="mobile-shopping" class="tw-w-[54px] tw-h-[54px]" />
          </div>
          <div class="tw-text-center">
            <h2 class="tw-mb-3">Ожидайте звонка от менеджера</h2>
            <p class="tw-mb-7.5">
              Мы свяжемся с вами по видеозвонку <br />
              в течение 5 минут
            </p>
            <div class="tw-text-t2 tw-text-card-descr">Заказ № 501-255</div>
          </div>
        </div>
        <BaseButton text="На главную" to="/" class="" />
      </div>
      <div
        v-if="modalContent === 3"
        class="tw-grid tw-content-between tw-grid-rows-[1fr_auto] tw-gap-8 tw-h-full">
        <div class="tw-grid tw-justify-items-center tw-gap-8 tw-content-center">
          <div
            class="tw-rounded-20 tw-w-20 tw-h-20 tw-bg-el tw-grid tw-place-content-center">
            <base-icon name="whatsapp" class="tw-w-[54px] tw-h-[54px]" />
          </div>
          <div class="tw-text-center">
            <h2 class="tw-mb-3">Мы свяжемся с вами</h2>
            <p class="tw-mb-7.5">
              Предлагаем продолжить <br />
              общение в чате WhatsApp
            </p>
          </div>
        </div>
        <BaseButton text="Поторговаться в чате WhatsApp" to="/" class="" />
      </div>
    </Modal>
    <div
      v-if="open"
      class="tw-z-3000 tw-fixed tw-w-full tw-h-full tw-top-0 tw-left-0 tw-bg-black/60">
      <div
        class="tw-absolute tw-bottom-0 tw-pt-[60px] tw-pb-[52px] tw-bg-white tw-rounded-t-20">
        <div class="tw-container">
          <button class="tw-absolute tw-top-4 tw-right-5" @click="open = false">
            <base-icon name="close" class="tw-w-6 tw-h-6 tw-text-card-descr" />
          </button>
          <div class="tw-mb-5">
            Мы готовы к торгу, если сейчас вы сможете выйти на видеозвонок с
            нами
          </div>
          <div class="tw-grid tw-gap-3">
            <BaseButton
              @click="
                () => ((open = false), (modalContent = 2), (isOpenModal = true))
              "
              text="Заказать видеозвонок"
              class="" />
            <BaseButton
              @click="
                () => ((open = false), (modalContent = 3), (isOpenModal = true))
              "
              border
              text="Не готов к видеозвонку"
              class="" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "IndexPage",
});
const open = ref(false);
const isOpenModal = ref(false);
const modalContent = ref<1 | 2 | 3>();
</script>
<style lang="scss"></style>
