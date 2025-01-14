<template>
  <q-skeleton
    class="tw-w-full tw-h-[80px] tw-rounded-16"
    v-if="pointsRes.loading.value"
  />
  <div v-else-if="pointsRes.data.value">
    <BaseRadio
      v-for="point in pointsRes.data.value"
      :key="point.id"
      name="point"
      :rules="rules"
      :label="point.address"
      :checkedValue="point.address"
      v-model="value"
    />
    <p v-if="error" class="tw-text-negative tw-mt-2 tw-text-t2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import BaseRadio from 'src/components/Base/Radio.vue';
  import { type RuleExpression, useFieldError } from 'vee-validate';

  defineProps<{
    rules: RuleExpression<string>,
  }>();

  const value = defineModel<string>({
    default: '',
  });

  const api = useRepositories();

  const pointsRes = useRequest(() => api.order.showPoints());
  useDataOrAlert(pointsRes);

  const error = useFieldError('point');
</script>
