<template>
  <q-page class="tw-container tw-pt-7 tw-flex tw-flex-col tw-gap-5">
    <router-link :to="{ name: 'estimates.create' }" class="online-scene">
      <div class="online-scene__title">Онлайн-оценка товаров</div>
      <div class="online-scene__name">Получите деньги за 1 день</div>
      <img src="~assets/images/wallet.png" alt="" class="online-scene__icon" />
    </router-link>
    <popular-cards />
    <div class="tw-grid tw-grid-cols-2 tw-gap-2">
      <my-link
        icon="shopping"
        text="Мои покупки"
        :to="{ name: 'my-purchases' }"
      />
      <my-link icon="box" text="Мои продажи" :to="{ name: 'estimates.index' }" />
    </div>
    <router-link :to="{ name: 'referrals.index' }" class="invite">
      <div class="invite__title">
        Приглашайте друзей <br />
        и зарабатывайте
      </div>
      <img src="~assets/images/hands.png" alt="" class="invite__icon" />
    </router-link>
  </q-page>
</template>

<script setup lang="ts">

</script>
