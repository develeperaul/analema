<template>
  <span>
    <slot v-if="pending" name="pending" :seconds="value"></slot>
    <slot v-else :start="start"></slot>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps<{
    startFrom: number,
  }>();

  const emit = defineEmits<{
    (event: 'finish'): void,
  }>();

  onMounted(() => {
    start();
  });

  let interval: any;

  const value = ref(props.startFrom);
  const pending = ref(false);

  function start() {
    pending.value = true;
    interval = setInterval(tick, 1000);
  }

  function tick() {
    value.value--;
    if(value.value === 0) {
      emit('finish');
      stop();
      reset();
    };
  }

  function stop() {
    pending.value = false;
    clearInterval(interval);
  }

  function reset() {
    value.value = props.startFrom;
  }
</script>
