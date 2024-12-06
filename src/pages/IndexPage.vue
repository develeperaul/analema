<template>
  <q-page class="tw-container">
    <div class="online-scene">
      <div class="online-scene__title">Онлайн-оценка товаров</div>
      <div class="online-scene__name">Получите деньги за 1 день</div>
      <img src="~assets/images/wallet.png" alt="" class="online-scene__icon" />
    </div>
    <popular-cards />
    <div class="tw-grid tw-grid-cols-2 tw-gap-2">
      <my-link icon="shopping" text="Мои покупки" to="/" />
      <my-link icon="box" text="Мои продажи" to="/" />
    </div>
    <div class="invite">
      <div class="invite__title">
        Приглашайте друзей <br />
        и зарабатывайте
      </div>
      <img src="~assets/images/hands.png" alt="" class="invite__icon" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>
