<template>
  <Card
    :title="`Заказ № ${item.order_id}`"
    :date="date"
  >
    <template #params>
      <div class="param">
        <div class="param-label">Статус</div>
        <div class="param-value">{{ item.status }}</div>
      </div>
      <div class="param" v-if="item.summ">
        <div class="param-label">Стоимость товаров</div>
        <div class="param-value">{{ $amount(item.summ) }}</div>
      </div>
      <div class="param">
        <div class="param-label">Товар</div>
        <div class="param-value">
          <p>{{ item.name }}</p>
          <!-- <Image class="tw-w-[100px] tw-rounded-10 tw-overflow-hidden" :src="item.img" /> -->
        </div>
      </div>
      <div class="param">
        <div class="param-label">Способ доставки</div>
        <div class="param-value">{{ item.delivery }}</div>
      </div>
      <div class="param">
        <div class="param-label">Адрес</div>
        <div class="param-value">
          {{ item.delivery === 'Самовывоз' ? item.adr_sam : item.adr_dost }}
        </div>
      </div>
      <div class="param" v-if="item.payment_url">
        <div class="param-value tw-pt-4">
          <a
            class="tw-block tw-w-full tw-text-center tw-bg-[#181818] tw-rounded-16 tw-text-white tw-py-[13px] tw-px-8 tw-text-t1"
            :href="item.payment_url"
            target="_blank"
          >
            Оплатить
          </a>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
  import Card from 'src/components/Base/Card.vue';
  import type { OrderListItem } from 'src/repositories/order';

  const props = defineProps<{
    item: OrderListItem,
  }>();

  const date = computed(() => {
    const str = props.item.order_date.date;
    const dt = new Date(str);
    return dt.toLocaleTimeString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  });
</script>
