<template>
  <q-page class="page-pb">
    <ToolbarColored
      class="bg-bar tw-mb-6"
      title="Мои покупки"
      icon="shopping"
      iconWrapClass="tw-w-[50px] tw-h-[50px] tw-p-[10px]"
    />
    <div class="tw-container">
      <ChipList class="tw-mb-5" :items="tabs" :activeItem="activeTab" @change:item="activeTab = $event" />
      <pre>{{ orders }}</pre>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import ToolbarColored from 'src/components/LayoutParts/ToolbarColored.vue';
  import ChipList, { type Item as ChipItem } from 'src/components/Base/ChipList.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import useRequest from 'src/composables/useRequest';

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

  const api = useRepositories();

  const ordersRes = useRequest(
    api.order.list,
    { watch: [ activeTab ] },
  );
  const { data: orders } = useDataOrAlert(ordersRes);
</script>

<style scoped lang="scss">
  .bg-bar {
    background: linear-gradient(132deg, #eed9fd 0%, #fff0a1 100%);
  }
</style>
