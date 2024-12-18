<template>
  <div class="tw-grid tw-gap-4">
    <div
      class="tw-p-2.5 tw-pl-5 tw-bg-card tw-flex tw-items-center tw-justify-between tw-rounded-20">
      <div>Все категории</div>
      <BaseIcon name="down" class="tw-w-6 tw-h-6 tw-text-black/55" />
    </div>

    <div
      v-if="open"
      class="tw-z-3000 tw-fixed tw-w-full tw-h-full tw-top-0 tw-left-0 tw-bg-black/60">
      <div
        class="tw-absolute tw-bottom-0 tw-pt-[60px] env-b-40 tw-bg-white tw-rounded-t-20 tw-w-full">
        <div class="tw-container">
          <button class="tw-absolute tw-top-4 tw-right-5" @click="open = false">
            <base-icon name="close" class="tw-w-6 tw-h-6 tw-text-card-descr" />
          </button>
          <div
            class="tw-grid tw-gap-3 tw-mb-7.5 tw-max-h-[70vh] tw-overflow-auto">
            <Radio label="test" v-for="n in 10" />
          </div>
          <BaseButton text="Применить" class="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const open = ref(true);
</script>
<style lang="scss" scoped></style>
