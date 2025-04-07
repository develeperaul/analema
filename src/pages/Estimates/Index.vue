<template>
  <q-page class="page-pb">
    <div class="purple-yellor-gr env-t tw-rounded-b-24 tw-mb-6">
      <div class="tw-pb-6 tw-pt-7.5">
        <div class="tw-relative tw-flex tw-justify-center">
          <div @click="router.go(-1)" class="tw-absolute tw-left-5 tw-top-0">
            <BaseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
          </div>
          <div class="tw-grid tw-gap-3 tw-justify-items-center">
            <div
              class="tw-bg-el tw-rounded-12 tw-grid tw-place-content-center tw-w-[50px] tw-h-[50px]">
              <baseIcon name="shopping" class="tw-w-7.5 tw-h-7.5" />
            </div>
            <div class="tw-text-h1 tw-font-bold">Мои продажи</div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <ChipList class="tw-mb-5" :items="tabs" :activeItem="activeTab" @change:item="activeTab = $event" />
      <EstimatesList
        v-if="estimatesRes.data.value"
        :items="estimatesRes.data.value"
      />
    </div>
    <q-inner-loading :showing="estimatesRes.loading.value" />
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import { useRouter } from 'vue-router';
  import EstimatesList from 'src/components/Estimates/List.vue';
  import ChipList, { type Item as ChipItem } from 'src/components/Base/ChipList.vue';
  import type { EstimateListParams, Status } from 'src/repositories/estimates';

  const router = useRouter();

  const api = useRepositories();

  const tabs: ChipItem[] = [
    {
      label: 'Активные',
      value: '1',
    },
    {
      label: 'Завершенные',
      value: '2',
    },
    {
      label: 'Отмененные',
      value: '3',
    }
  ];

  const activeTab = ref<ChipItem | null>(tabs[0]);

  const filter = computed(() => {
    const res: EstimateListParams = {};
    if(activeTab.value) res.status = activeTab.value.value as Status;
    return res;
  });

  const estimatesRes = useRequest(
    () => api.estimates.list(filter.value),
    { watch: [ activeTab ] },
  );
  useDataOrAlert(estimatesRes);
</script>
