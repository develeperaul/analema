<template>
  <router-link
    :to="{ name: 'estimates.show', params: { id: item.id } }"
    custom
    v-slot="{ href, navigate }"
  >
    <Card
      :title="`Заказ № ${item.id}`"
      :date="item.date"
      tag="a"
      :href="href"
      @click="navigate"
    >
      <template #params>
        <div class="param">
          <div class="param-label">Статус</div>
          <div class="param-value">{{ item.status }}</div>
        </div>
        <div class="param">
          <div class="param-label">Товар</div>
          <div class="param-value">{{ item.desc }}</div>
        </div>
        <div class="param" v-if="item.price">
          <div class="param-label">Стоимость товара</div>
          <div class="param-value">{{ $amount(item.price) }}</div>
        </div>
      </template>
    </Card>
  </router-link>
</template>

<script setup lang="ts">
  import Card from 'src/components/Base/Card.vue';
  import type { EstimateListItem } from 'src/repositories/estimates';

  defineProps<{
    item: EstimateListItem,
  }>();
</script>
