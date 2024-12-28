<template>
  <q-page class="env-t">
    <div class="tw-container tw-grid">
      <BaseHeader title="Каталог" />
      <SelectCategories
        v-if="sectionsRes.data.value"
        :sections="sectionsRes.data.value"
        v-model:category="activeSection"
      />
      <CatalogList v-if="itemsRes.data.value" :items="itemsRes.data.value" />
    </div>
    <q-inner-loading
      :showing="sectionsRes.loading.value"
    />
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
