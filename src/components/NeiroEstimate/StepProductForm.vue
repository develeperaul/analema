<template>
  <div>
    <RobotMessage class="tw-mb-8">
      {{ robotMeesage?.[0].text ?? '' }}
    </RobotMessage>
    <div class="tw-text-t1 tw-mb-6">
      {{ form.freeFlow }}
    </div>
    <Image
      class="tw-rounded-20 tw-overflow-hidden tw-w-[100px] tw-mb-6"
      width="150"
      height="150"
      :src="form.uploadedFiles[0].url"
    />
    <InputAddValue
      v-if="form.activeProduct && form.activeProduct.complect"
      class="tw-mb-6"
      additional="3"
      :rules="schema.neiro_add_value"
      v-model="form.neiro_add_value"
      :error="addVErr"
    />
    <BaseButton class="tw-mt-8" :disabled="loading" @click="emit('estimate')">
      Оценить
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import RobotMessage from './RobotMessage.vue';
  import BaseButton from 'src/components/Base/Button2.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import type { NeiroForm } from './model/types';
  import type { AssessSuccessRes } from 'src/repositories/neiro-estimates';
  import { schema } from './model/schema';
  import { useFieldError } from 'vee-validate';

  const props = defineProps<{
    form: NeiroForm,
    assessmentRes: AssessSuccessRes,
    loading: boolean,
  }>();

  const emit = defineEmits<{
    (event: 'estimate'): void,
  }>();

  const api = useRepositories();

  const {
    data: robotMeesage,
    loading: loadingMessage
  } = useRequest(
    () => api.neiroEstimates.showRobotMessage({
      type: props.form.activeProduct?.complect === true ? '7' : '8',
    }),
  );

  const addVErr = useFieldError('neiro_add_value');
</script>
