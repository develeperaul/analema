<template>
  <div>
    <RobotMessage class="tw-mb-4">
      <div v-if="loadingMessage">...</div>
      <div v-else-if="robotMeesage">{{ messageText }}</div>
    </RobotMessage>
    <div v-if="form.uploadedFiles.length > 0">
      <Image :src="form.uploadedFiles[0].url" alt="" />
    </div>
    <div class="tw-mt-8">
      <BaseButton class="tw-mb-2" text="Нет" @click="emit('answer:no')" />
      <BaseButton text="Да" @click="emit('answer:yes')" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import RobotMessage from './RobotMessage.vue';
  import useRequest from 'src/composables/useRequest';
  import useRepositories from 'src/composables/useRepositories';
  import type { NeiroForm } from './model/types';
  import type { AssessSuccessRes } from 'src/repositories/neiro-estimates';

  const props = defineProps<{
    form: NeiroForm,
    assessmentRes: AssessSuccessRes,
  }>();

  const emit = defineEmits<{
    (event: 'answer:no'): void,
    (event: 'answer:yes'): void,
  }>();

  const api = useRepositories();

  const {
    data: robotMeesage,
    loading: loadingMessage
  } = useRequest(() => api.neiroEstimates.showRobotMessage({ type: '3' }));

  const messageText = computed(() => {
    if(!robotMeesage.value) return '';
    const text = robotMeesage.value[0].text;
    return text.replace('###', props.assessmentRes[0]?.name ?? '');
  });
</script>
