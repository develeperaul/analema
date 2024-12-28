<template>
  <div class="popular">
    <h2 class="title">Популярные товары</h2>
    <div class="label">Хиты продаж</div>
    <div class="popular__cards">
      <div class="popular__cards--wrapper">
        <Card v-for="item in items" :item="item" mini />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const items = [
    {
      name: 'Кольца, красное золото 585 проба',
      price: '45 000 ₽',
      image: '/items/gold.png',
    },
    {
      name: 'Стиральная машина Ariston',
      price: '26 000 ₽',
      image: '/items/stir.png',
    },
    {
      name: 'Ноутбук Apple MacBook Air 13 M3',
      price: '135 000 ₽',
      image: '/items/nout.png',
    },
    {
      name: 'Кольцо 3 ряда из розового золота',
      price: '38 000 ₽',
      image: '/items/gold2.png',
    },
  ];
</script>

<style lang="scss" scoped>
.popular {
  @apply tw-rounded-20;
  padding: 16px 18px;
  background: white;
  box-shadow: 0px 0px 20px 4px #e8e8e8;
  position: relative;
  & .title {
    margin-bottom: 10px;
  }
  & .label {
    @apply tw-text-white tw-text-t4 tw-rounded-20 tw-right-0 tw-top-0 tw-transform -tw-translate-y-1/2;
    position: absolute;
    padding: 5px 8px;
    background: #fa3224;
  }
  &__cards {
    overflow: hidden;
    margin-inline: -16px;
    &--wrapper {
      @apply tw-flex tw-overflow-auto tw-gap-2;
      & > * {
        flex-shrink: 0;
        &:first-child {
          margin-left: 16px;
        }
        &:last-child {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
