<template>
  <router-link class="banner" :to="{ name: 'estimates.create' }">
    <div class="text">Нейросеть<br/>оценит ВСЕ за</div>
    <div class="title">30 секунд</div>
    <div class="btn">Онлайн-оценка товаров</div>
    <img class="decor" width="2000" height="1993" src="~assets/images/wallet.png" />
  </router-link>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .banner {
    overflow: hidden;
    position: relative;
    z-index: 1;
    padding: 40px 17px 20px;
    border-radius: 20px;
    background: linear-gradient(136deg, #e1e1fd 0%, #b2b2ef 100%);
  }

  .decor {
    position: absolute;
    right: -24px;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: right center;
  }

  .text {
    font-size: 24px;
    line-height: 1.3;
    margin-bottom: 2px;
  }

  .title {
    font-weight: 700;
    font-size: 30px;
    line-height: 1.3;
    margin-bottom: 20px;
  }

  .btn {
    border-radius: 100px;
    padding: 8px 20px;
    text-align: center;
    @apply tw-bg-el tw-text-t1 tw-font-bold tw-text-white;
  }
</style>
