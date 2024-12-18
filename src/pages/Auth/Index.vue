<template>
  <q-page class="tw-container tw-grid env-t-40 env-b-40">
    <Form
      @submit="submit"
      class="tw-grid tw-content-between tw-h-full tw-grid-rows-[1fr_auto] tw-pt-10">
      <div>
        <div class="tw-mb-10">
          <h1 class="tw-mb-3 tw-text-center">Введите номер телефона</h1>
          <div class="tw-text-center">Отправим код подтверждения</div>
        </div>
        <base-input
          name="phone"
          type="tel"
          v-model="phone"
          maska="+7 (###)-###-##-##"
          label="Номер телефона "
          placeholder="+7 (000)-000-00-00"
          class="tw-mb-5" />
      </div>
      <div>
        <BaseButton
          type="submit"
          text="Продолжить"
          theme="gradient"
          class="tw-mb-5" />
        <div class="tw-text-t2 tw-text-card-descr tw-text-center">
          Нажимая «Продолжить», я принимаю условия
          <a href="#" class="tw-text-[#4D55FF]">
            Пользовательского соглашения
          </a>
        </div>
      </div>
    </Form>

    <!-- <div class="">
        <div class="tw-text-h1 tw-font-bold tw-mb-10">Авторизация</div>
        <div></div>
      </div>
      <CodeInput /> -->

    <!-- <div>
      <div class="tw-text-h1 tw-font-bold">Введите номер телефона</div>
      <div>Отправим код подтверждения</div>
    </div>
    <div class="tw-grid tw-gap-5">
      <BaseButton text="Продолжить" />
      <div class="tw-text-t2 tw-text-card-descr">
        Нажимая «Продолжить», я принимаю условия
        <a href="#" class="tw-text-[#4D55FF]"> Пользовательского соглашения </a>
      </div>
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "Auth",
});
const phone = ref("");
const submit = async () => {
  console.log("submit");
};
</script>
