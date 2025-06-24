<template>
  <q-dialog v-model="value" maximized>
    <div class="card">
      <div class="wrapper tw-h-full">
        <div class="body tw-h-full">
          <div></div>
          <div class="row1">
            <div class="img-wrap">
              <img width="203" height="165" src="~assets/images/alerts/mail.svg" />
            </div>
            <div class="h1 tw-mt-5">Сообщение отправлено</div>
          </div>
          <BaseButton text="На главную" to="/" />
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
    text-align: center;
    padding-bottom: 40px;
  }
</style>
