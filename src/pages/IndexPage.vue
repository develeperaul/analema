<template>
  <q-page class="wrapper tw-pt-7 page-pb tw-flex tw-flex-col tw-gap-5">
    <EstimateBanner />
    <PopularList />
    <div class="tw-grid tw-grid-cols-2 tw-gap-2">
      <LinkCard
        icon="shopping"
        text="Мои покупки"
        :to="{ name: 'orders.index' }"
      />
      <LinkCard icon="box" text="Мои продажи" :to="{ name: 'estimates.finished' }" />
    </div>
    <!-- <router-link :to="{ name: 'referrals.index' }" class="invite">
      <div class="invite__title">
        Приглашайте друзей <br />
        и зарабатывайте
      </div>
      <img src="~assets/images/hands.png" alt="" class="invite__icon" />
    </router-link> -->
  </q-page>
</template>

<script setup lang="ts">
  import PopularList from 'src/components/Catalog/PopularList.vue';
  import LinkCard from 'src/components/Home/LinkCard.vue';
  import EstimateBanner from 'src/components/Home/EstimateBanner.vue';
</script>
