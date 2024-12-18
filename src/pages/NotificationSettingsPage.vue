<template>
  <q-page
    class="tw-container env-t tw-grid tw-content-start tw-grid-rows-[auto_1fr]">
    <BaseHeader title="Push-уведомления" back />
    <div class="tw-grid tw-gap-4 tw-content-start">
      <Switch label="Уведомление о заказах" />
      <Switch label="Акции" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "NotificationSettingsPage",
});
</script>
<style lang="scss"></style>
