<template>
  <div>
    <RobotMessage class="tw-mb-8">
      <div v-if="isIdentified && assessmentRes[0]" class="tw-mb-2">
        {{ assessmentRes[0].sostoyanie }}
      </div>
      <div>{{ robotMeesage?.[0].text ?? '' }}</div>
    </RobotMessage>
    <SearchInput
      class="tw-mb-5"
      label=""
      v-model="searchText"
    />
    <div class="items">
      <button
        class="item"
        :class="{ 'item--active': item.id === form.activeProduct?.id }"
        v-for="item in items"
        :key="item.id"
        @click="changeProduct(item)"
      >
        {{ item.section_name }} {{ item.name }}
      </button>
    </div>
    <BaseButton2
      class="tw-mt-8"
      :disabled="searchText === '' && form.activeProduct === null"
      @click="emit('next', searchText)"
    >
      Продолжить
    </BaseButton2>
  </div>
</template>

<script setup lang="ts">
  import BaseButton2 from 'src/components/Base/Button2.vue';
  import RobotMessage from './RobotMessage.vue';
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

<style scoped lang="scss">
  .items {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .item {
    background: #F6F6F6;
    border-radius: 100px;
    padding: 12px 16px;
    @apply tw-text-t1 tw-text-black;

    &--active {
      @apply tw-bg-tab tw-text-white;
    }
  }
</style>
