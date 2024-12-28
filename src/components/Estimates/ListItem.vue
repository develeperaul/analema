<template>
  <router-link class="item" :to="{ name: 'estimates.show', params: { id: item.id } }">
    <div class="head">
      <div class="title">Заказ № {{ item.id }}</div>
      <div class="date">{{ item.date }}</div>
    </div>
    <div class="tw-space-y-3">
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
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import type { EstimateListItem } from 'src/repositories/estimates';

  defineProps<{
    item: EstimateListItem,
  }>();
</script>

<style scoped lang="scss">
  .item {
    display: block;
    border-radius: 20px;
    padding: 16px;
    padding-bottom: 20px;
    @apply tw-bg-gray-light;
  }

  .head {
    border-bottom: 1px solid #D2D2E0;
    margin-bottom: 10px;
    padding-bottom: 12px;
  }

  .date {
    margin-top: 4px;
    @apply tw-text-t2 tw-text-card-descr;
  }

  .title {
    color: #252525;
    @apply tw-text-h2 tw-font-bold;
  }

  .param-label {
    margin-bottom: 4px;
    @apply tw-text-t2 tw-text-card-descr;
  }

  .param-value {
    color: #252525;
    @apply tw-text-t1;
  }
</style>
