<template>
  <q-skeleton
    class="tw-w-full tw-h-[80px] tw-rounded-16"
    v-if="citiesRes.loading.value"
  />
  <div v-else>
    <div>
      <div class="tw-mb-3 tw-font-bold tw-text-h2">Город</div>
      <div class="tw-space-y-1">
        <BaseRadio
          v-for="city in citiesRes.data.value"
          :key="city.id"
          name="city"
          :rules="schema.city"
          :label="city.name"
          :checkedValue="city.id"
          v-model="activeCityId"
          @update:modelValue="setActiveCity"
        />
      </div>
      <div v-if="cityError" class="tw-text-negative tw-text-t1 tw-mt-2">{{ cityError }}</div>
    </div>
    <div class="tw-mt-6" v-if="activeCity">
      <div class="tw-mb-3 tw-font-bold tw-text-h2">Точка самовывоза</div>
      <div class="tw-space-y-1">
        <BaseRadio
          v-for="point in pointsRes.data.value"
          :key="point.id"
          name="point"
          :rules="schema.point"
          :label="point.name"
          :checkedValue="point.name"
          v-model="activePoint"
        />
      </div>
      <div v-if="pointError" class="tw-text-negative tw-text-t1 tw-mt-2">{{ pointError }}</div>
    </div>
    <div class="tw-mt-6">
      <div class="tw-mb-3 tw-font-bold tw-text-h2">Способ оплаты</div>
      <div class="tw-space-y-1">
        <BaseRadio
          name="payment"
          label="При получении"
          checkedValue="2"
          v-model="activePayment"
        />
        <BaseRadio
          name="payment"
          label="Банковской картой"
          checkedValue="5"
          v-model="activePayment"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import BaseRadio from 'src/components/Base/Radio.vue';
  import { RuleExpression, useFieldError } from 'vee-validate';
  import { watch } from 'vue';

  defineProps<{
    schema: {
      city: RuleExpression<string>,
      point: RuleExpression<string>,
    },
  }>();

  const activeCity = defineModel('city', { default: '' });
  const activePoint = defineModel('point', { default: '' });
  const activePayment = defineModel('payment', { default: '2' });

  const activeCityId = ref<string>('');

  const api = useRepositories();

  const citiesRes = useRequest(() => api.order.showCities());
  useDataOrAlert(citiesRes);

  const pointsRes = useRequest(
    () => api.order.showBranches(activeCityId.value),
    {
      immediate: false,
      watch: [ activeCityId ],
    },
  );
  useDataOrAlert(pointsRes);

  const cityError = useFieldError('city');
  const pointError = useFieldError('point');

  function setActiveCity(id: string) {
    activeCity.value = citiesRes.data.value?.find(city => city.id === id)?.name ?? '';
  }

  watch(pointsRes.data, () => {
    activePoint.value = '';
  });
</script>
