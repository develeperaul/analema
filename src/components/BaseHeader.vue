<template>
  <div class="tw-relative tw-flex tw-justify-center tw-mb-6 tw-mt-6">
    <div
      v-if="back"
      @click="$router.go(-1)"
      class="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2">
      <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
    </div>
    <div class="tw-text-h1 tw-font-bold">{{ title }}</div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    back?: boolean;
  }>(),
  {
    back: false,
  }
);
</script>
<style lang="scss" scoped></style>
