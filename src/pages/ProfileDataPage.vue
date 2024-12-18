<template>
  <q-page
    class="tw-container env-t tw-grid tw-content-start tw-grid-rows-[auto_1fr]">
    <BaseHeader title="Мои данные" back />

    <Form
      @submit="submit"
      class="tw-grid tw-gap-6 tw-content-start tw-mb-[72px]">
      <div>
        <h2 class="tw-mb-3">Личные данные</h2>
        <div class="tw-grid tw-gap-2.5">
          <base-input name="name" rules="required" label="Имя*" />
          <base-input name="lastname" rules="required" label="Фамилия*" />
          <base-input name="patronimic" label="Отчество" />
          <base-input name="date" maska="##-##-####" label="Дата рождения" />
        </div>
      </div>
      <div>
        <h2 class="tw-mb-3">Контактная информация</h2>
        <div class="tw-grid tw-gap-2.5">
          <base-input name="email" rules="required|email" label="E-mail" />
          <base-input
            name="address"
            label="Адрес (улица, номер дома, квартира)" />
        </div>
      </div>

      <div>
        <BaseButton
          type="submit"
          text="Сохранить"
          theme="gradient"
          class="tw-mb-5" />
      </div>
    </Form>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "ProfileDataPage",
});
</script>
<style lang="scss"></style>
