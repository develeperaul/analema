<template>
  <div>
    <RobotMessage class="tw-mb-4">
      <div v-if="loadingMessage">...</div>
      <div v-else-if="robotMeesage">{{ messageText }}</div>
    </RobotMessage>
    <BaseButton text="Ввести вручную" @click="emit('next')" />
  </div>
</template>

<script setup lang="ts">
  import RobotMessage from './RobotMessage.vue';
  import useRequest from 'src/composables/useRequest';
  import useRepositories from 'src/composables/useRepositories';

  const emit = defineEmits<{
    (event: 'next'): void,
  }>();

  const api = useRepositories();

  const {
    data: robotMeesage,
    loading: loadingMessage
  } = useRequest(() => api.neiroEstimates.showRobotMessage({ type: '5' }));

  const messageText = computed(() => {
    if(!robotMeesage.value) return '';
    return robotMeesage.value[0].text;
  });
</script>
