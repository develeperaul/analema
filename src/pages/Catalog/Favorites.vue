<template>
  <q-page class="tw-flex tw-flex-col">
    <div class="tw-container tw-grow tw-flex tw-flex-col">
      <Toolbar class="tw-mb-6" title="Избранное" showBack />
      <CatalogList
        class="tw-grow tw-flex tw-flex-col"
        v-if="productsRes.data.value"
        :items="productsRes.data.value"
      >
        <template #empty>
          <div class="tw-pt-10 tw-pb-8 tw-grow tw-flex tw-flex-col">
            <div class="tw-mb-8">
              <img class="tw-w-full" width="340" height="218" src="~/assets/images/alerts/add-favorite.svg" />
            </div>
            <p class="tw-text-h1 tw-font-bold tw-text-base tw-text-center tw-mb-8">
              В избранном пусто
            </p>
            <BaseButton class="tw-mt-auto" text="Перейти в каталог" :to="{ name: 'catalog.index' }" />
          </div>
        </template>
      </CatalogList>
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
