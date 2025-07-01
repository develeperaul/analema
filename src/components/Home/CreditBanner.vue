<template>
  <a class="banner" :href="config.creditHref" target="_blank">
    <img class="tw-w-full" width="670" height="310" src="~/assets/images/credit-banner.png" />
  </a>
</template>

<script setup lang="ts">
  import { useConfig } from 'src/boot/config';

  const config = useConfig();
</script>

<style scoped lang="scss">
  .banner {
    background: linear-gradient(135deg, #ffefd2 0%, #edc39b 100%);
    border-radius: 20px;
    overflow: hidden;
  }
</style>
