<template>
  <q-dialog maximized v-model="value">
    <q-card>
      <q-card-section>
        <div class="tw-text-right tw-mb-4">
          <ButtonClose @click="value = false" />
        </div>
        <p class="tw-text-h1 tw-font-bold tw-mb-2">Оплата пройдет в несколько этапов.</p>
        <p class="tw-text-t1">Вам необходимо перейти по каждой ссылке и оплатить, чтобы завершить заказ.</p>
      </q-card-section>
      <q-card-section class="tw-space-y-5">
        <div v-for="(link, index) in links">
          <div class="tw-text-h2 tw-font-bold tw-mb-1">Этап {{ index + 1 }}</div>
          <a class="tw-text-blue tw-text-t1 tw-inline-block tw-py-2" :href="link.payment_url" target="_blank">Перейти к оплате</a>
        </div>
      </q-card-section>
      <q-card-section>
        <BaseButton :to="{ name: 'orders.index' }" text="Перейти в мои покупки"></BaseButton>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { OrderCreateSuccess } from 'src/repositories/order';

  defineProps<{
    links: OrderCreateSuccess,
  }>();

  const value = defineModel({ default: false });
</script>
