<template>
  <q-page
    class="tw-container env-t tw-grid tw-content-start tw-grid-rows-[auto_1fr]">
    <BaseHeader title="Избранное" back />
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-3 tw-gap-y-4">
      <Card v-for="n in 6" />
    </div>
    <div v-if="false" class="tw-grid tw-h-full tw-grid-rows-[1fr_auto]">
      <div>
        <div class="tw-relative tw-pb-7.5 tw-pt-10">
          <img
            src="~assets/images/cloud-2.png"
            alt=""
            width="340"
            height="218" />
          <BaseIcon
            name="add"
            class="tw-w-[99px] tw-h-[99px] tw-absolute tw-top-1/2 tw-left-1/2 tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2 tw-z-10" />
        </div>
        <h2 class="tw-text-center">В избранном пусто</h2>
      </div>
      <BaseButton class="tw-mb-7.5" text="Перейти в каталог" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "NotificationPage",
});
</script>
<style lang="scss"></style>
