<template>
  <q-page class="page-pb">
    <ToolbarColored
      class="bg-bar tw-mb-6"
      title="Мои оценки"
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
  import type { EstimateListParams, Status } from 'src/repositories/estimates';

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
  ];

  const activeTab = ref<ChipItem | null>(tabs[0]);

  const filter = computed(() => {
    const res: EstimateListParams = {};
    if(activeTab.value) res.status = activeTab.value.value as Status;
    return res;
  });

  const estimatesRes = useRequest(
    () => api.estimates.list({ ...filter.value, type: '1' }),
    { watch: [ activeTab ] },
  );
  useDataOrAlert(estimatesRes);

  const emptyText = computed(() => {
    if(activeTab.value?.value === '1') return 'У Вас нет активных оценок';
    if(activeTab.value?.value === '2') return 'У Вас нет завершенных оценок';
    return 'У Вас нет оценок';
  });
</script>

<style scoped lang="scss">
  .bg-bar {
    background: linear-gradient(166.55deg, #eed9fd -1.72%, #fff0a1 103.52%);
  }
</style>
