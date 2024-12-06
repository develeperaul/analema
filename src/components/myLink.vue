<template>
  <router-link
    :to="to"
    class="tw-rounded-20 tw-grid tw-gap-2.5 tw-bg-purple tw-place-content-center tw-justify-items-center tw-p-[26px]"
    style="box-shadow: 0px 0px 20px 4px #e8e8e8"
  >
    <BaseIcon :name="icon" class="tw-w-[50px] tw-h-[50px]" />
    <div class="tw-text-[#4A4A5D] tw-text-t1 tw-font-bold">
      {{ text }}
    </div>
  </router-link>
</template>
<script setup lang="ts">
const props = defineProps<{
  icon: string
  text: string
  to: string | { name: string }
}>()
</script>
<style lang="scss" scoped></style>
