<template>
  <q-dialog maximized v-model="value">
    <div class="tw-bg-white tw-px-4 tw-py-10 tw-flex tw-flex-col tw-text-center">
      <div class="tw-mb-8">
        <div class="tw-text-h1 tw-font-bold tw-mb-6">Ваш заказ успешно создан</div>
        <div class="tw-text-t1">Оплатите заказ в течение 10 минут</div>
      </div>
      <div class="tw-mt-auto">
        <BaseButton class="tw-mb-4" type="button" text="Оплатить" @click="pay" />
        <router-link class="btn-home" :to="{ name: 'home' }" >
          На главную
        </router-link>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
  import { OrderCreateSuccess } from 'src/repositories/order';
  import { Browser } from '@capacitor/browser';
  import { Platform } from 'quasar';

  const props = defineProps<{
    links: OrderCreateSuccess,
  }>();

  const value = defineModel<boolean>('showed', { default: false });

  function pay() {
    Platform.is.capacitor
      ? Browser.open({ url: props.links[0].payment_url })
      : window.open(props.links[0].payment_url, '_blank');

  }
</script>

<style scoped lang="scss">
  .btn-home {
    display: block;
    width: 100%;
    padding: 12px 30px;
    border: 1px solid #919191;
    border-radius: 16px;
    font-size: 16px;
  }
</style>
