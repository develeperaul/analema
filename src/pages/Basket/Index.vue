<template>
  <q-page class="env-t">
    <div class="tw-container">
      <Toolbar class="tw-mb-6" showBack title="Корзина" />
      <BasketList
        v-if="basketRes.data.value"
        :count="basketStore.count"
        :items="basketRes.data.value"
        @basket:remove="removeItem"
      />
      <q-inner-loading :showing="basketRes.loading.value" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import Toolbar from 'src/components/LayoutParts/Toolbar.vue';
  import BasketList from 'src/components/Basket/List.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import { useBasketStore } from 'src/stores/basket';

  const api = useRepositories();
  const basketStore = useBasketStore();

  const basketRes = useRequest(
    () => api.basket.show(basketStore.ids),
  );
  useDataOrAlert(basketRes);

  function removeItem(id: string) {
    basketStore.removeSync(id);
    basketRes.send();
  }
</script>
