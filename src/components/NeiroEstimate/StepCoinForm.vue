<template>
  <div>
    <RobotMessage class="tw-mb-8">
      {{ robotMeesage?.[0].text ?? '' }}
    </RobotMessage>
    <Image
      class="tw-rounded-20 tw-overflow-hidden tw-w-[100px] tw-mb-6"
      width="150"
      height="150"
      :src="form.uploadedFiles[0].url"
    />
    <div class="h2 tw-mb-3">Выберите металл</div>
    <div class="tw-space-y-2 tw-mb-6">
      <BaseSelect
        name="neiro_add_metall"
        label="Металл"
        :options="[
          ...metalTypes, unknownMetal,
        ]"
        v-model="form.neiro_add_metall"
        :rules="schema.neiro_add_metall"
      />
    </div>
    <div class="h2 tw-mb-3">Введите вес монеты</div>
    <BaseInput
      class="tw-mb-6"
      label="Вес в граммах"
      name="neiro_add_value"
      v-model="form.neiro_add_value"
      :rules="schema.neiro_add_value"
    />
    <BaseButton class="tw-mt-8" :disabled="loading" @click="emit('estimate')">
      Оценить
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from 'src/components/Base/Button2.vue';
  import RobotMessage from './RobotMessage.vue';
  import BaseSelect from 'src/components/Base/Select.vue';
  import useRepositories from 'src/composables/useRepositories';
  import { useAuthStore } from 'src/stores/auth';
  import { metalTypes, unknownMetal } from './model/contants';
  import type { NeiroForm } from './model/types';
  import { schema } from './model/schema';

  const props = defineProps<{
    form: NeiroForm,
    loading: boolean,
  }>();

  const emit = defineEmits<{
    (event: 'estimate'): void,
  }>();

  const api = useRepositories();

  const {
    data: robotMeesage,
  } = useRequest(() => api.neiroEstimates.showRobotMessage({ type: '10' }));
</script>
