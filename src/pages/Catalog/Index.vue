<template>
  <q-page class="env-t">
    <div class="tw-container tw-grid">
      <BaseHeader title="Каталог" />
      <SelectCategories
        v-if="sectionsRes.data.value"
        :sections="sectionsRes.data.value"
        :category="activeSection"
        @change:category="activeSection = $event"
      />
      <CatalogList
        v-if="itemsRes.data.value"
        class="tw-mt-5"
        :items="itemsRes.data.value"
      />
    </div>
    <div
      v-if="sectionsRes.loading.value || itemsRes.loading.value"
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

  const api = useRepositories();

  const activeSection = ref<string>('');

  const sectionsRes = useRequest(api.catalog.showSections);
  useDataOrAlert(sectionsRes);

  const itemsRes = useRequest(
    () => api.catalog.list(activeSection.value!),
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
      itemsRes.send();
    }
  });
</script>
