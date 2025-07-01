<template>
  <DialogOffline />
  <router-view />
</template>

<script setup lang="ts">
  import DialogOffline from './components/Dialog/Offline.vue';

  defineOptions({
    name: 'App'
  });
</script>
