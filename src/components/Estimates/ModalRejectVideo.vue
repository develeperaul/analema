<template>
  <q-dialog v-model="value" maximized>
    <div class="card">
      <div class="tw-container tw-h-full">
        <div class="body tw-h-full">
          <div></div>
          <div class="row1">
            <div class="img-wrap">
              <img width="203" height="165" src="~assets/images/alerts/whatsapp.svg" />
            </div>
            <div class="h1 tw-text-center tw-mt-5 tw-mx-auto tw-max-w-[278px]">Предлагаем продолжить общение в чате WhatsApp</div>
          </div>
          <BaseButton text="Поторговаться в чате WhatsApp" to="/" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
  const value = defineModel({
    default: false,
  });
</script>

<style scoped lang="scss">
  .card {
    @apply tw-bg-white;
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 90px;
  }

  .img-wrap {
    width: 203px;
    margin: 0 auto;
  }

  .row1 {
    padding-bottom: 40px;
  }
</style>
