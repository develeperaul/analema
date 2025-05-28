<template>
  <div v-if="items.length === 0" class="tw-text-center tw-py-24">
    Пока у Вас нет уведомлений
  </div>
  <div v-else class="tw-space-y-5">
    <div
      v-for="(items, date) in itemsGroups"
      :key="date"
    >
      <p class="tw-text-t2 tw-text-card-descr tw-mb-[10px]">
        {{ getLabel(date as string) }}
      </p>
      <List :items="items" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { NotificationItem } from 'src/repositories/notifications';
  import List from './List.vue';

  const props = defineProps<{
    items: NotificationItem[],
  }>();

  type GroupsItem = { [ date: string ]: NotificationItem[] };

  const sortedItems = computed(() => {
    return [ ...props.items ].sort((a, b) => {
      const a2 = a.date.slice(0, 10).split('.').reverse().join('');
      const b2 = b.date.slice(0, 10).split('.').reverse().join('');
      return b2 > a2 ? 1 : b2 < a2 ? -1 : 0;
    });
  });

  const itemsGroups = computed(() => {
    const list: GroupsItem = {};
    sortedItems.value.forEach(item => {
      const [ date ] = item.date.split(' ');
      if(!list[date]) list[date] = [];
      list[date].push(item);
    });
    return list;
  });

  const today = (new Date()).toLocaleDateString();

  function getLabel(date: string) {
    const [ day, month, year ] = date.split('.');
    const currentYear = today.slice(-4);
    const dt = new Date(`${year}-${month}-${day}`);
    return today === date
      ? 'Сегодня'
      : currentYear === year
      ? dt.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
      : date;
  }
</script>
