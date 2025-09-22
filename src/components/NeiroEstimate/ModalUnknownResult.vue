<template>
  <q-dialog v-model="value" maximized>
    <div class="card purple-gr">
      <div></div>
      <div class="body">
        <div class="img-wrap">
          <img width="151" height="151" src="~/assets/images/alerts/neiro.svg" alt="">
        </div>
        <div class="text">
          Не у всего есть<br />цена...
        </div>
      </div>
      <div class="btn-wrap">
        <BaseButton text="Оценить заново" @click="reload" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
  const value = defineModel({
    default: false,
  });

  function reload() {
    location.reload();
  }
</script>

<style scoped lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 80px;
    @apply tw-bg-white;
  }

  .body {
    text-align: center;
    width: 100%;
  }

  .text {
    font-size: 24px;
    line-height: 1.3;
    @apply tw-font-bold;
  }

  .btn-wrap {
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
  }

  .img-wrap {
    width: 150px;
    margin: 0 auto;
    margin-bottom: 16px;
  }
</style>
