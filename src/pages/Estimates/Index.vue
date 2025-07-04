<template>
  <q-page class="page-pb">
    <ToolbarColored
      class="bg-bar tw-mb-6"
      title="Мои оценки"
    />
    <div class="wrapper">
      <EstimatesList
        v-if="estimatesRes.data.value"
        :items="estimatesRes.data.value"
        emptyText="У Вас нет оценок"
      />
    </div>
    <q-inner-loading :showing="estimatesRes.loading.value" />
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import EstimatesList from 'src/components/Estimates/List.vue';

  const api = useRepositories();

  const estimatesRes = useRequest(api.estimates.list);
  useDataOrAlert(estimatesRes);
</script>

<style scoped lang="scss">
  .bg-bar {
    background: linear-gradient(166.55deg, #eed9fd -1.72%, #fff0a1 103.52%);
  }
</style>
