<template>
  <q-page class="page-pb">
    <div class="wrapper">
      <Toolbar class="tw-mb-5" showBack>
        <template #actions>
          <FavoritesButton
            :active="favoritesStore.has(id)"
            @click="favoritesStore.toggle(id)"
          />
        </template>
      </Toolbar>
      <div v-if="data" class="body">
        <Gallery class="tw-mb-4" width="1000" height="1000" :images="data.gallery" />
        <div class="price">{{ $amount(data.price) }}</div>
        <div class="name">{{ data.name }}</div>
        <Description class="tw-mb-6" :properties="data.properties[0]" :text="data.detail_text" />
        <PersonalList class="tw-mb-10" />
        <BasketButton class="basket-btn" :active="basketStore.has(id)" @click="basketStore.toggle(id)" />
      </div>
    </div>
    <q-inner-loading :showing="productRes.loading.value" />
  </q-page>
</template>

<script setup lang="ts">
  import Toolbar from 'src/components/LayoutParts/Toolbar.vue';
  import Gallery from 'src/components/Catalog/Gallery.vue';
  import PersonalList from 'src/components/Catalog/PersonalList.vue';
  import Description from 'src/components/Catalog/Description.vue';
  import BasketButton from 'src/components/Basket/Button.vue';
  import FavoritesButton from 'src/components/Favorites/Button.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import { useFavoritesStore } from 'src/stores/favorites';
  import { useBasketStore } from 'src/stores/basket';

  const props = defineProps<{
    id: string,
  }>();

  const favoritesStore = useFavoritesStore();
  const basketStore = useBasketStore();
  const api = useRepositories();

  const productRes = useRequest(
    () => api.catalog.show(props.id),
    { watch: [ () => props.id ] }
  );

  useDataOrAlert(productRes);

  const data = computed(() => productRes.data.value?.[0] ?? null);
</script>

<style scoped lang="scss">
  .price {
    @apply tw-text-h2 tw-text-base tw-font-bold tw-mb-2;
  }

  .name {
    @apply tw-text-t1 tw-text-base tw-font-bold tw-mb-6;
  }

  .basket-btn {
    position: sticky;
    z-index: 9000;
    left: 0;
    bottom: calc(env(safe-area-inset-bottom, 0px) + 85px) !important;
  }
</style>
