<template>
  <q-skeleton v-if="productsRes.loading.value" class="tw-w-full tw-h-[200px] tw-rounded-16" />
  <div v-else-if="items">
    <p class="label">Для вас</p>
    <div class="list">
      <ListItem
        class="item"
        v-for="item in items"
        :key="item.id"
        :item="item"
        :isInFavorite="favoritesStore.has(item.id)"
        @favorite:toggle="favoritesStore.toggle(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';
  import { useFavoritesStore } from 'src/stores/favorites';
  import useRequest from 'src/composables/useRequest';
  import useRepositories from 'src/composables/useRepositories';
  import useDataOrAlert from 'src/composables/useDataOrAlert';

  const favoritesStore = useFavoritesStore();

  const api = useRepositories();
  const productsRes = useRequest(api.catalog.showPersonalSet);
  const { data: items } = useDataOrAlert(productsRes);
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-wrap: wrap;
    margin: -8px -6px;
  }

  .item {
    margin: 8px 6px;
    width: calc(50% - 12px);
  }

  .label {
    @apply tw-text-h2 tw-text-base tw-font-bold tw-mb-3;
  }
</style>
