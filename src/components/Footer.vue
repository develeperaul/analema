<template>
  <q-footer class="tw-bg-white env-b tw-pt-4.5 tw-border-t tw-border-border">
    <div class="tw-container tw-flex tw-justify-between">
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
        :to="{ name: 'basket' }"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3">
        <base-icon
          name="basket"
          class="tw-w-5 tw-h-5"
          :class="[isActive ? 'tw-text-black' : 'tw-text-gray']" />
        <span :class="[isActive ? 'tw-text-black' : 'tw-text-gray']">
          Корзина
        </span>
      </router-link>
      <router-link
        :to="{ name: 'profile' }"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3">
        <base-icon
          name="user"
          class="tw-w-5 tw-h-5 tw-text-gray"
          :class="[isActive ? 'tw-text-black' : 'tw-text-gray']" />
        <span :class="[isActive ? 'tw-text-black' : 'tw-text-gray']">
          Профиль
        </span>
      </router-link>
    </div>
  </q-footer>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
