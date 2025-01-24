<template>
  <div
    ref="itemRef"
    class="tw-bg-gray-light tw-p-4 tw-pb-5 tw-rounded-20 tw-relative"
    :class="{ active }"
  >
    <p class=" tw-text-base tw-text-t1 tw-font-bold tw-mb-2">
      {{ item.header }}
    </p>
    <p class="tw-text-t2 tw-border-e-card-descr">{{ item.text }}</p>
  </div>
</template>

<script setup lang="ts">
  import type { NotificationItem } from 'src/repositories/notifications';
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';

  const props = defineProps<{
    item: NotificationItem,
  }>();

  const api = useRepositories();

  const active = computed(() => props.item.is_readed === '0');

  const itemRef = ref<HTMLElement | null>(null);

  const { loading, send } = usePostRequest(
    api.notifications.readMessage,
    () => ({ id: [ props.item.id ] }),
    () => {
      observer.disconnect();
    }
  );

  const observer = new IntersectionObserver((payload) => {
    const entry = payload[0];
    if(entry.isIntersecting && !loading.value) {
      send();
    }
  }, { threshold: 1 });

  onMounted(() => {
    if(itemRef.value && active.value) {
      observer.observe(itemRef.value);
    }
  });

  onUnmounted(() => {
    observer.disconnect();
  });
</script>

<style scoped lang="scss">
  .active {
    &::after {
      content: '';
      position: absolute;
      top: -3px;
      right: 0px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #F4C531;
      z-index: 10;
    }
  }
</style>
