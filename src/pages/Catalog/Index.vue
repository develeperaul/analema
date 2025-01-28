<template>
  <q-page class="page-pb">
    <div class="tw-container">
      <Toolbar class="tw-mb-5" title="Каталог" />
      <SelectCategories
        v-if="sectionsRes.data.value"
        :sections="sectionsRes.data.value"
        :category="activeSection"
        @change:category="activeSection = $event"
      />
      <ChipList v-if="subSectionsItems.length > 0" class="tw-mt-4" :items="subSectionsItems" :activeItem="activeSubSection" @change:item="activeSubSection = $event" />
      <CatalogList
        v-if="itemsRes.data.value"
        class="tw-mt-5"
        :items="itemsRes.data.value"
      />
    </div>
    <div
      v-if="sectionsRes.loading.value || itemsRes.loading.value || subSectionsRes.loading.value"
      class="tw-w-full tw-h-full tw-top-0 tw-left-0 tw-fixed tw-z-50"
    >
      <q-inner-loading showing />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import CatalogList from 'src/components/Catalog/List.vue';
  import SelectCategories from 'src/components/Catalog/SelectCategories.vue';
  import Toolbar from 'src/components/LayoutParts/Toolbar.vue';
  import ChipList, { type Item as ChipItem } from 'src/components/Base/ChipList.vue';

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

  const itemsRes = useRequest(
    () => api.catalog.list(querySectionId.value),
    { immediate: false }
  );
  useDataOrAlert(itemsRes);


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
      itemsRes.send();
    }
  });
</script>
