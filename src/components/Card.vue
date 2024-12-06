<template>
  <div class="card">
    <div class="card__img">
      <img src="/public/test.png" alt="" />
    </div>
    <div class="card__content">
      <span class="tw-text-t1 tw-font-bold"> 26 000 ₽ </span>
      <span class="descr">
        Стиральная машина Ariston Стиральная машина Ariston
      </span>
    </div>
  </div>
</template>
<script lang="ts"></script>
<style lang="scss" scoped>
.card {
  @apply tw-bg-card tw-rounded-10;
  width: 115px;
  &__img {
    @apply tw-p-2;
    height: 82px;
    img {
      object-fit: cover;
      height: 100%;
      margin: 0 auto;
    }
  }
  &__content {
    @apply tw-grid tw-gap-0.5 tw-p-2;
    .descr {
      @apply tw-text-card-descr tw-text-t2;
      display: -webkit-box;
      -webkit-line-clamp: 2; // количество строк
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
