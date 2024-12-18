<template>
  <q-page class="tw-container tw-grid env-t-40 env-b-40">
    <div
      class="tw-grid tw-content-between tw-h-full tw-grid-rows-[1fr_auto] tw-pt-10">
      <div>
        <div class="tw-mb-10">
          <h1 class="tw-mb-3 tw-text-center">Введите код подтверждения</h1>
          <div class="tw-text-center">
            Отправили код на номер +7 911 911 11 22
          </div>
        </div>

        <CodeInput class="tw-flex tw-justify-center" />
        <div class="tw-text-t2 tw-text-card-descr tw-text-center tw-mt-[70px]">
          Отправить код повторно через 30 сек
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CodeInput from "src/components/CodeInput.vue";

defineOptions({
  name: "AuthVerify",
});
</script>
