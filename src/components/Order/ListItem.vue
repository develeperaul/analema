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
