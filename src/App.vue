<template>
  <DialogOffline />
  <DialogUpdate />
  <router-view />
</template>

<script setup lang="ts">
  import DialogOffline from './components/Dialog/Offline.vue';
  import DialogUpdate from './components/Dialog/Update.vue';

  defineOptions({
    name: 'App'
  });
</script>
