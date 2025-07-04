<template>
  <q-footer class="tw-bg-white env-b tw-pt-4.5 tw-border-t tw-border-border">
    <div class="wrapper tw-flex tw-justify-between">
      <router-link
        to="/"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3">
        <base-icon
          name="home"
          class="tw-w-5 tw-h-5"
          :class="[isActive ? 'tw-text-black' : 'tw-text-gray']" />
        <span :class="[isActive ? 'tw-text-black' : 'tw-text-gray']"
          >Главная</span
        >
      </router-link>
      <router-link
        :to="{ name: 'catalog.index' }"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3">
        <base-icon
          name="category"
          class="tw-w-5 tw-h-5"
          :class="[isActive ? 'tw-text-black' : 'tw-text-gray']" />
        <span :class="[isActive ? 'tw-text-black' : 'tw-text-gray']">
          Каталог
        </span>
      </router-link>
      <router-link
        :to="{ name: 'estimates.create' }"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3">
        <base-icon
          name="menu-neiro"
          class="tw-w-5 tw-h-5"
          :class="[isActive ? 'tw-text-black' : 'tw-text-gray']" />
        <span :class="[isActive ? 'tw-text-black' : 'tw-text-gray']">
          Оценка
        </span>
      </router-link>
      <router-link
        :to="{ name: 'basket.index' }"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3 tw-relative">
        <div
          class="basket-count"
          v-if="basketStore.count > 0"
        >
          {{ basketStore.count }}
        </div>
        <base-icon
          name="basket"
          class="tw-w-5 tw-h-5"
          :class="[isActive ? 'tw-text-black' : 'tw-text-gray']" />
        <span :class="[isActive ? 'tw-text-black' : 'tw-text-gray']">
          Корзина
        </span>
      </router-link>
      <router-link
        :to="{ name: 'profile.index' }"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3">
        <base-icon
          name="user"
          class="tw-w-5 tw-h-5"
          :class="[isActive ? 'tw-text-black' : 'tw-text-gray']" />
        <span :class="[isActive ? 'tw-text-black' : 'tw-text-gray']">
          Профиль
        </span>
      </router-link>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
  import { useBasketStore } from 'src/stores/basket';

  const basketStore = useBasketStore();
</script>

<style lang="scss" scoped>
  .basket-count {
    position: absolute;
    top: -10px;
    right: 0;
    z-index: 10;
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    text-align: center;
    background-color: #F4C531;
    @apply tw-text-el;
  }
</style>
