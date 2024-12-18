<template>
  <q-page class="tw-container tw-grid env-t-40 env-b-40">
    <Form
      @submit="submit"
      class="tw-grid tw-content-between tw-h-full tw-grid-rows-[1fr_auto] tw-pt-10">
      <div>
        <h1 class="tw-mb-5">
          Для продолжения работы <br />
          введите данные
        </h1>
        <div class="tw-grid tw-gap-5">
          <base-input name="name" rules="required" label="Имя*" />
          <base-input name="lastname" rules="required" label="Фамилия*" />
          <base-input name="patronimic" label="Отчество" />
          <base-input name="date" maska="##-##-####" label="Дата рождения" />
          <base-input name="email" rules="required|email" label="E-mail" />
        </div>
      </div>
      <div>
        <BaseButton
          type="submit"
          text="Продолжить"
          theme="gradient"
          class="tw-mb-5" />
      </div>
    </Form>
  </q-page>
</template>

<script setup lang="ts">
import CodeInput from "src/components/CodeInput.vue";

defineOptions({
  name: "AuthData",
});
</script>
