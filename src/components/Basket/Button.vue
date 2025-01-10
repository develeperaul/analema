<template>
  <BaseButton :text="active ? 'В корзине' : 'В корзину'"></BaseButton>
</template>

<script setup lang="ts">
  defineProps<{
    active: boolean,
  }>();
</script>
