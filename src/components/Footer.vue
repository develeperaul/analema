<template>
  <q-footer class="tw-bg-white env-b tw-pt-4.5 tw-border-t tw-border-border">
    <div class="tw-container tw-flex tw-justify-between">
      <router-link
        to="/"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3"
      >
        <base-icon
          name="home"
          class="tw-w-5 tw-h-5 tw-text-gray"
          :class="{ 'tw-text-black': isActive }"
        />
        <span class="tw-text-gray" :class="{ 'tw-text-black': isActive }"
          >Главная</span
        >
      </router-link>
      <router-link
        to="/"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3"
      >
        <base-icon
          name="category"
          class="tw-w-5 tw-h-5 tw-text-gray"
          :class="{ 'tw-text-black': isActive }"
        />
        <span class="tw-text-gray" :class="{ 'tw-text-black': isActive }">
          Каталог
        </span>
      </router-link>
      <router-link
        to="/"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3"
      >
        <base-icon
          name="ingots"
          class="tw-w-5 tw-h-5 tw-text-gray"
          :class="{ 'tw-text-black': isActive }"
        />
        <span class="tw-text-gray" :class="{ 'tw-text-black': isActive }">
          Слитки
        </span>
      </router-link>
      <router-link
        to="/"
        v-slot="{ isActive }"
        class="tw-grid tw-justify-items-center tw-gap-1 tw-text-t3"
      >
        <base-icon
          name="user"
          class="tw-w-5 tw-h-5 tw-text-gray"
          :class="{ 'tw-text-black': isActive }"
        />
        <span class="tw-text-gray" :class="{ 'tw-text-black': isActive }">
          Слитки
        </span>
      </router-link>
    </div>
  </q-footer>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
