<template>
  <q-dialog class="product-detailed" transition-show="slide-left" transition-hide="slide-right" maximized v-model="value">
    <div ref="cardRef" class="tw-bg-white page-pb" v-touch-swipe.mouse.right="close">
      <div class="tw-container">
        <Toolbar class="tw-mb-5" showBack :backFn="close">
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
          <PersonalList class="tw-mb-10" @show:product="changeProduct" />
          <BasketButton class="basket-btn" :active="basketStore.has(id)" @click="basketStore.toggle(id)" />
        </div>
      </div>
      <q-inner-loading :showing="productRes.loading.value" />
    </div>
  </q-dialog>
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

  const value = defineModel<boolean>({ default: false });

  const props = defineProps<{
    id: string,
  }>();

  const emit = defineEmits<{
    (event: 'change:product', productId: string): void,
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

  function close() {
    value.value = false;
  }

  const cardRef = ref<HTMLElement | null>(null);

  function changeProduct(id: string) {
    emit('change:product', id);
    if(cardRef.value) cardRef.value.scrollTo({ behavior: 'smooth', top: 0 });
  }
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
    bottom: env(safe-area-inset-bottom, 0px) !important;
  }

  :global(body.q-ios-padding .product-detailed .q-dialog__inner) {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
</style>
