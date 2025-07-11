<template>
  <div class="item">
    <img class="img" :src="path" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    url: string,
  }>();

  const path = computed(() => {
    if(props.url.match(/^https?/) !== null) return props.url;
    return process.env.FILES_BASE + props.url;
  });
</script>

<style scoped lang="scss">
  .item {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
