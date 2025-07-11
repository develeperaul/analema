<template>
  <q-dialog v-model="value" maximized>
    <div class="card">
      <div class="body">
        <img class="img" width="108" height="94" src="./ui/images/neiro-loading.svg" />
        <div class="text">
          Распознаю Ваш товар.<br/>Это займет не более 30 секунд.
        </div>
        <div class="progress">
          <div class="progress__line"></div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 80px;
    @apply tw-bg-white;
  }

  .body {
    text-align: center;
    width: 100%;
  }

  .img {
    width: 108px;
    margin: 0 auto;
  }

  .text {
    max-width: 235px;
    margin: 0 auto;
    margin-top: 50px;
    @apply tw-text-h2 tw-font-bold;
  }

  .progress {
    max-width: 240px;
    margin: 0 auto;
    margin-top: 24px;
    border-radius: 16px;
    overflow: hidden;
    height: 18px;
    border: 1px solid #000000;
    @apply tw-bg-black;

    &__line {
      animation: timeline 60s linear infinite;
      width: 100%;
      height: 100%;
      @apply tw-bg-white;
    }
  }

  @keyframes timeline {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }
</style>
