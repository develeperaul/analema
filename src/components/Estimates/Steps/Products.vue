<template>
  <div>
    <div class="h2 tw-mb-6">Напишите, что оцениваете</div>
    <div class="tw-mb-6 tw-text-t1 tw-text-black">{{ activeCategory.name }}</div>
    <SearchInput
      class="tw-mb-6"
      label="Товар"
      v-model="searchText"
      caption="Например, велосипед Stern Angel"
    />
    <template v-if="data">
      <SearchListBase
        v-if="data[0].base.length > 0"
        :items="data[0].base"
        v-model:activeItem="activeItem"
      />
      <SearchListAlt
        v-else-if="data[0].alt.length > 0"
        :items="data[0].alt"
        v-model:activeItem="activeItem"
      />
      <div v-else>Ничего не найдено</div>
    </template>
    <BaseButton v-if="activeItem" class="tw-mt-8" @click="next">
      Продолжить
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { SectionItem } from 'src/repositories/neiro-catalog';
  import { ActiveProduct } from './types';
  import SearchInput from 'src/components/Base/SearchInput.vue';
  import BaseButton from 'src/components/Base/Button2.vue';
  import SearchListBase from 'src/components/Estimates/SearchList/Base.vue';
  import SearchListAlt from 'src/components/Estimates/SearchList/Alt.vue';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  //@ts-ignore
  import { throttle } from 'throttle-debounce';

  const props = defineProps<{
    activeCategory: SectionItem,
  }>();

  const emit = defineEmits<{
    (event: 'next', activeItem: ActiveProduct | null): void,
  }>();

  const api = useRepositories();

  const searchText = ref('');
  const activeItem = ref<ActiveProduct | null>(null);

  const categoriesRes = useRequest(
    () => api.neiroCatalog.search(props.activeCategory.id, searchText.value.trim()),
    {
      immediate: false,
    }
  );
  useDataOrAlert(categoriesRes);

  const { data, send } = categoriesRes;

  watch(searchText, throttle(1000, (val: string) => {
    if(val !== '') send();
  }));

  function next() {
    emit('next', activeItem.value);
  }

  watch(() => props.activeCategory, () => {
    searchText.value = '';
    activeItem.value = null;
    data.value = null;
  });
</script>
