<template>
  <div>
    <RobotMessage class="tw-mb-14">{{ messageText }}</RobotMessage>
    <PhotoUploader v-model:uploaded="form.uploadedFiles" :maxFiles="3" />
    <BaseButton
      v-if="form.uploadedFiles.length > 0"
      class="tw-mt-10"
      @click="emit('next')"
    >
      Продолжить
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import RobotMessage from './RobotMessage.vue';
  import PhotoUploader from './PhotoUploader.vue';
  import useRequest from 'src/composables/useRequest';
  import useRepositories from 'src/composables/useRepositories';
  import BaseButton from 'src/components/Base/Button2.vue';
  import type { NeiroForm } from './model/types';
  import { useAuthStore } from 'src/stores/auth';
  import { computed } from 'vue';

  const props = defineProps<{
    form: NeiroForm
  }>();

  const emit = defineEmits<{
    (event: 'next'): void,
  }>();

  const authStore = useAuthStore();
  const api = useRepositories();

  const {
    data: robotMeesage,
    loading: loadingMessage
  } = useRequest(() => api.neiroEstimates.showRobotMessage({ type: '1' }));

  const messageText = computed(() => {
    if(!robotMeesage.value) return '';
    const text = robotMeesage.value[0].text;
    if(!authStore.user || !authStore.user.name)
      return text.charAt(0).toUpperCase() + text.slice(1);
    return authStore.user.name + ', ' + text;
  });
</script>
