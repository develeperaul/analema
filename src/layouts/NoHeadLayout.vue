<template>
  <q-layout view="lhh lPr lFf">
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
