<template>
  <div>
    <RobotMessage class="tw-mb-4">
      <div v-if="loadingMessage">...</div>
      <div v-else-if="robotMeesage">{{ robotMeesage[0].text ?? '' }}</div>
    </RobotMessage>
    <SearchInput
      label=""
      v-model="searchText"
    />
    <div class="tw-space-x-2 tw-space-y-2">
      <button
        :class="{ 'tw-underline': item.id === form.activeProduct?.id }"
        v-for="item in items"
        :key="item.id"
        @click="changeProduct(item)"
      >
        {{ item.section_name }} - {{ item.name }}
      </button>
    </div>
    <BaseButton text="Продолжить" @click="emit('next', searchText)" />
  </div>
</template>

<script setup lang="ts">
  import SearchInput from 'src/components/Base/SearchInput.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import { ref, computed, watch } from 'vue';
  import type { NeiroForm } from './model/types';
  import type { AssessSuccessRes } from 'src/repositories/neiro-estimates';
  import type { SearchBaseItem } from 'src/repositories/neiro-catalog';
  //@ts-ignore
  import { throttle } from 'throttle-debounce';

  const props = defineProps<{
    form: NeiroForm,
    assessmentRes: AssessSuccessRes,
    isIdentified: boolean,
  }>();

  const emit = defineEmits<{
    (event: 'next', searchText: string): void,
  }>();

  const api = useRepositories();

  const searchText = ref('');

  const res = useRequest(
    () => api.neiroCatalog.search('', searchText.value),
    {
      immediate: false,
    },
  );

  const { data, loading, send } = useDataOrAlert(res);

  const items = computed(() => {
    if(!data.value) return [];
    return data.value[0].base.slice(0, 6);
  });

  const sectionName = computed(() => {
    return props.assessmentRes[0]?.name ?? '';
  });

  onMounted(() => {
    props.isIdentified
      ? searchText.value = sectionName.value
      : searchText.value = '';

    if(searchText.value !== '') {
      send();
    }
  });

  watch(searchText, throttle(1000, (val: string) => {
    if(val !== '') send();
  }));


  function changeProduct(item: SearchBaseItem) {
    props.form.activeProduct = item;
    searchText.value = item.section_name + ' ' + item.name;
  }

  const {
    data: robotMeesage,
    loading: loadingMessage
  } = useRequest(
    () => api.neiroEstimates.showRobotMessage({ type: props.isIdentified ? '4' : '5' }),
  );
</script>
