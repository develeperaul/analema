<template>
  <div>
    <RobotMessage class="tw-mb-14">{{ messageText }}</RobotMessage>
    <div v-if="form.uploadedFiles.length > 0">
      <Image
        class="tw-w-[150px] tw-mx-auto tw-rounded-20 tw-overflow-hidden"
        width="150"
        height="150"
        :src="form.uploadedFiles[0].url"
      />
    </div>
    <div class="tw-mt-8 tw-flex tw-gap-[10px]">
      <BaseButton border text="Нет" @click="emit('answer:no')" />
      <BaseButton2 @click="emit('answer:yes')">Да</BaseButton2>
    </div>
  </div>
</template>

<script setup lang="ts">
  import RobotMessage from './RobotMessage.vue';
  import useRequest from 'src/composables/useRequest';
  import useRepositories from 'src/composables/useRepositories';
  import BaseButton2 from 'src/components/Base/Button2.vue';
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
