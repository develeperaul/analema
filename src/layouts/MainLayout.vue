<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="tw-bg-white env-t">
      <div class="wrapper tw-flex tw-items-center tw-justify-between">
        <img src="/logo.svg" alt="" width="119" height="12" />
        <router-link :to="{ name: 'notifications.index' }">
          <base-icon
            name="notification"
            class="tw-w-[23px] tw-h-[23px] tw-text-black"
          />
        </router-link>
      </div>
    </q-header>
    <Footer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainLayout',
})
</script>
