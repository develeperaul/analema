<template>
  <q-page class="page-pb">
    <div class="wrapper">
      <Toolbar class="tw-mb-5" title="Каталог" />
      <SelectCategories
        v-if="sectionsRes.data.value"
        :sections="sectionsRes.data.value"
        :category="activeSection"
        @change:category="activeSection = $event"
      />
      <ChipList v-if="subSectionsItems.length > 0" class="tw-mt-4" :items="subSectionsItems" :activeItem="activeSubSection" @change:item="activeSubSection = $event" />
      <template v-if="catalogItems">
        <CatalogList
          class="tw-mt-5"
          :items="catalogItems"
          @show:product="activeProduct = $event; showedProduct = true"
        />
        <div class="tw-mt-8" v-if="itemsRes.data.value && itemsRes.loading.value">
          <q-spinner
            class="tw-mx-auto"
            color="black"
            size="32px"
          />
        </div>
      </template>
    </div>
    <div
      v-if="sectionsRes.loading.value || subSectionsRes.loading.value && (!itemsRes.data.value && itemsRes.loading.value)"
      class="tw-w-full tw-h-full tw-top-0 tw-left-0 tw-fixed tw-z-50"
    >
      <q-inner-loading showing />
    </div>
    <ModalProduct
      v-if="activeProduct"
      :id="activeProduct"
      v-model="showedProduct"
      @change:product="activeProduct = $event"
    />
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import usePaginate from 'src/composables/usePaginate';
  import CatalogList from 'src/components/Catalog/List.vue';
  import SelectCategories from 'src/components/Catalog/SelectCategories.vue';
  import ModalProduct from 'src/components/Catalog/ModalProduct.vue';
  import Toolbar from 'src/components/LayoutParts/Toolbar.vue';
  import ChipList, { type Item as ChipItem } from 'src/components/Base/ChipList.vue';
  import { reactive } from 'vue';
  import { useEndPageScroll } from 'src/composables/useEndPageScroll';

  const api = useRepositories();

  const activeSection = ref<string>('');
  const activeSubSection = ref<ChipItem | null>(null);

  const querySectionId = computed(() => {
    return activeSubSection.value?.value ?? activeSection.value;
  });

  const sectionsRes = useRequest(api.catalog.showSections);
  useDataOrAlert(sectionsRes);

  const subSectionsRes = useRequest(
    () => api.catalog.showSubSections(activeSection.value),
    { immediate: false }
  );
  useDataOrAlert(subSectionsRes);

  const subSectionsItems = computed(() => {
    if(!subSectionsRes.data.value) return [];
    return subSectionsRes.data.value.map(item => ({ label: item.name, value: item.id }));
  });

  const paginator = reactive({ limit: 20, offset: 0 });

  const itemsRes = useRequest(
    () => api.catalog.listPag(querySectionId.value, { nPageSize: paginator.limit, nOffset: paginator.offset }),
    { immediate: false }
  );
  useDataOrAlert(itemsRes);

  const { items: catalogItems, isEnd, next, reset } = usePaginate(itemsRes, paginator);

  useEndPageScroll(next, 200, isEnd, itemsRes.loading);

  watch(sectionsRes.data, (sections) => {
    if(sections && sections[0]) {
      activeSection.value = sections[0].id;
    }
  });

  watch(activeSection, () => {
    if(activeSection.value) {
      subSectionsRes.send();
      activeSubSection.value = null;

    }
  });

  watch(querySectionId, () => {
    if(querySectionId.value) {
      reset();
      itemsRes.send();
    }
  });

  const activeProduct = ref<string | null>(null);
  const showedProduct = ref(false);
</script>
