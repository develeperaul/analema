<template>
  <div>
    <RobotMessage class="tw-mb-4">
      {{ messageText }}
    </RobotMessage>
    <BaseButton class="tw-mt-14" @click="emit('next')">
      Ввести вручную
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import RobotMessage from './RobotMessage.vue';
  import useRequest from 'src/composables/useRequest';
  import useRepositories from 'src/composables/useRepositories';
  import BaseButton from 'src/components/Base/Button2.vue';

  const emit = defineEmits<{
    (event: 'next'): void,
  }>();

  const api = useRepositories();

  const {
    data: robotMeesage,
    loading: loadingMessage
  } = useRequest(() => api.neiroEstimates.showRobotMessage({ type: '6' }));

  const messageText = computed(() => {
    if(!robotMeesage.value) return '';
    return robotMeesage.value[0].text;
  });
</script>
