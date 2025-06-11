<template>
  <div>
    <div class="h2 tw-mb-6">Выберите категорию</div>
    <template v-if="categoriesRes.data.value">
      <ul class="tw-space-y-4">
        <li
          class="item"
          v-for="category in categoriesRes.data.value"
          :key="category.id"
        >
          <BaseRadio2
            :label="category.name"
            :val="category.id"
            v-model="form.section"
          />
        </li>
      </ul>
      <BaseButton class="tw-mt-8" :disabled="form.section === ''" @click="next">
        Продолжить
      </BaseButton>
    </template>
  </div>
</template>

<script setup lang="ts">
  import BaseRadio2 from 'src/components/Base/Radio2.vue';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import { computed } from 'vue';
  import { SectionItem } from 'src/repositories/neiro-catalog';
  import BaseButton from 'src/components/Base/Button2.vue';

  const props = defineProps<{
    form: {
      section: string,
    }
  }>();

  const emit = defineEmits<{
    (event: 'next', category: SectionItem | null): void,
  }>();

  const api = useRepositories();
  const categoriesRes = useRequest(api.neiroCatalog.showSections);
  useDataOrAlert(categoriesRes);

  const activeCategory = computed(() => {
    if(!categoriesRes.data.value) return null;
    return categoriesRes.data.value.find(
      cat => cat.id === props.form.section
    ) ?? null;
  });

  function next() {
    emit('next', activeCategory.value);
  }
</script>
