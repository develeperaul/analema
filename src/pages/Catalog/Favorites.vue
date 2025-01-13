<template>
  <q-page class="env-t">
    <div class="tw-container">
      <Toolbar class="tw-mb-6" title="Избранное" showBack />
      <CatalogList
        v-if="productsRes.data.value"
        :items="productsRes.data.value"
      />
      <q-inner-loading :showing="productsRes.loading.value" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import CatalogList from 'src/components/Catalog/List.vue';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import { useFavoritesStore } from 'src/stores/favorites';

  const api = useRepositories();

  const favoriteStore = useFavoritesStore();

  const productsRes = useRequest(() => api.catalog.showProducts(favoriteStore.ids));
  useDataOrAlert(productsRes);
</script>
