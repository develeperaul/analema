<template>
  <q-skeleton v-if="productsRes.loading.value" class="tw-w-full tw-h-[150px] tw-rounded-16" />
  <div v-else-if="productsRes.data.value && productsRes.data.value.length > 0" class="popular-block">
    <div class="badge">Хиты продаж</div>
    <p class="tw-text-h2 tw-font-bold tw-text-base tw-mb-[10px]">
      Товары недели
    </p>
    <div class="area">
      <div class="list">
        <PopularListItem
          class="list-item"
          v-for="item in productsRes.data.value"
          :key="item.id"
          :item="item"
          @click="activeProduct = item.id; showedProduct = true"
        />
      </div>
    </div>
    <ModalProduct
      v-if="activeProduct"
      :id="activeProduct"
      v-model="showedProduct"
      @change:product="activeProduct = $event"
    />
  </div>
</template>

<script setup lang="ts">
  import PopularListItem from './PopularListItem.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useCache from 'src/composables/useCache';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import ModalProduct from 'src/components/Catalog/ModalProduct.vue';

  const api = useRepositories();
  const productsRes = useRequest(useCache('products.popular', api.catalog.showPopular));
  useDataOrAlert(productsRes);

  const activeProduct = ref<string | null>(null);
  const showedProduct = ref(false);
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    gap: 8px;
  }

  .list-item {
    flex-shrink: 0;
    width: 115px;
    cursor: pointer;
  }

  .area {
    max-width: 100%;
    overflow-y: hidden;
  }

  .popular-block {
    position: relative;
    padding: 18px 16px;
    box-shadow: 0 0 20px 4px #e8e8e8;
    @apply tw-bg-white tw-rounded-20;
  }

  .badge {
    position: absolute;
    right: -5px;
    top: -5px;
    display: inline-block;
    border-radius: 20px;
    background-color: #FA3224;
    padding: 5px 8px;
    @apply tw-text-white tw-text-t4 tw-font-medium;
  }
</style>
