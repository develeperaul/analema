<template>
  <q-page class="page-pb">
    <ToolbarColored
      class="bg-bar tw-mb-6"
      icon="shopping"
      iconWrapClass="tw-w-[50px] tw-h-[50px] tw-p-[10px]"
      title="Мои продажи"
    />
    <div class="wrapper">
      <ChipList class="tw-mb-5" :items="tabs" :activeItem="activeTab" @change:item="activeTab = $event" />
      <EstimatesList
        v-if="estimatesRes.data.value"
        :items="estimatesRes.data.value"
        :emptyText="emptyText"
      />
    </div>
    <q-inner-loading :showing="estimatesRes.loading.value" />
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import EstimatesList from 'src/components/Estimates/List.vue';
  import ChipList, { type Item as ChipItem } from 'src/components/Base/ChipList.vue';
  import type { SalesListParams, SalesStatus } from 'src/repositories/estimates';

  const api = useRepositories();

  const tabs: ChipItem[] = [
    {
      label: 'Активные',
      value: '1',
    },
    {
      label: 'Завершенные',
      value: '2',
    },
    {
      label: 'Отмененные',
      value: '3',
    }
  ];

  const activeTab = ref<ChipItem | null>(tabs[0]);

  const filter = computed(() => {
    const res: SalesListParams = {};
    if(activeTab.value) res.status = activeTab.value.value as SalesStatus;
    return res;
  });

  const estimatesRes = useRequest(
    () => api.estimates.sales({ ...filter.value, type: '2' }),
    { watch: [ activeTab ] },
  );
  useDataOrAlert(estimatesRes);

  const emptyText = computed(() => {
    if(activeTab.value?.value === '1') return 'У Вас нет активных продаж';
    if(activeTab.value?.value === '2') return 'У Вас нет завершенных продаж';
    if(activeTab.value?.value === '3') return 'У Вас нет отмененных продаж';
    return 'У Вас нет продаж';
  });
</script>

<style scoped lang="scss">
  .bg-bar {
    background: linear-gradient(166.55deg, #eed9fd -1.72%, #fff0a1 103.52%);
  }
</style>
