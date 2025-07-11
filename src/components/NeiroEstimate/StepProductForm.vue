<template>
  <div>
    <RobotMessage class="tw-mb-8">
      {{ robotMeesage?.[0].text ?? '' }}
    </RobotMessage>
    <div class="tw-text-t1 tw-mb-6">
      {{ form.activeProduct ? `${form.activeProduct.section_name} - ${form.activeProduct.name}` : form.freeFlow }}
    </div>
    <Image
      class="tw-rounded-20 tw-overflow-hidden tw-w-[100px] tw-mb-6"
      width="150"
      height="150"
      :src="form.uploadedFiles[0].url"
    />
    <InputAddValue
      class="tw-mb-6"
      additional="3"
      rules=""
      v-model="form.neiro_add_value"
    />
    <div class="tw-mb-6">
      <BaseCheckbox
        class="tw-mb-4"
        label="Перезвоните мне после оценки"
        v-model="form.recall"
        checkedValue="Да"
        uncheckedValue=""
      />
      <BaseCheckbox
        label="Свяжитесь со мной по WhatsApp после оценки"
        v-model="form.rewhatsapp"
        checkedValue="Да"
        uncheckedValue=""
      />
    </div>
    <BaseButton class="tw-mt-8" @click="emit('estimate')">
      Оценить
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import RobotMessage from './RobotMessage.vue';
  import BaseButton from 'src/components/Base/Button2.vue';
  import BaseCheckbox from 'src/components/Base/Checkbox.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import type { NeiroForm } from './model/types';
  import type { AssessSuccessRes } from 'src/repositories/neiro-estimates';

  const props = defineProps<{
    form: NeiroForm,
    assessmentRes: AssessSuccessRes,
  }>();

  const emit = defineEmits<{
    (event: 'estimate'): void,
  }>();

  const api = useRepositories();

  const {
    data: robotMeesage,
    loading: loadingMessage
  } = useRequest(
    () => api.neiroEstimates.showRobotMessage({ type: '7' }),
  );
</script>
