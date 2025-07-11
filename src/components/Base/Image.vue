<template>
  <div>
    <img :class="imgClass" :width="width" :height="height" :src="fullPath" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    imgClass?: string,
    src: string | null,
    fallback?: string,
    width?: number | string,
    height?: number | string,
  }>();

  const fullPath = computed(() => {
    if(props.src) {
      if(props.src.match(/^https?/) !== null) return props.src;
      return process.env.FILES_BASE + props.src;
    };
    return props.fallback ?? '/items/fallback-product.jpg';
  });
</script>
