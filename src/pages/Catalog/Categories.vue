<template>
  <q-page class="page-pb">
    <div class="wrapper">
      <Toolbar class="tw-mb-5" title="Каталог" />
      <CategoriesList v-if="res.data.value" :items="res.data.value" />
      <q-inner-loading :showing="res.loading.value" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import CategoriesList from 'src/components/Catalog/Categories/List.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';

  const api = useRepositories();

  const res = useRequest(api.catalog.showSections);
  useDataOrAlert(res);
</script>
