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
      value: '2',
    },
    {
      label: 'Завершенные',
      value: '4',
    },
    {
      label: 'Отмененные',
      value: '3',
    }
  ];

  const activeTab = ref<ChipItem | null>(tabs[0]);

  const filter = computed(() => {
    const res: EstimateListParams = {};
    if(activeTab.value) res.status = activeTab.value.value as Status;
    return res;
  });

  const estimatesRes = useRequest(
    () => api.estimates.list({ ...filter.value, type: '2' }),
    { watch: [ activeTab ] },
  );
  useDataOrAlert(estimatesRes);
</script>

<style scoped lang="scss">
  .bg-bar {
    background: linear-gradient(166.55deg, #eed9fd -1.72%, #fff0a1 103.52%);
  }
</style>
