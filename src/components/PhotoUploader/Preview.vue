<template>
  <div class="preview">
    <img class="photo" :src="fullPath" />
    <button class="btn-remove" type="button" @click="emit('remove')">
      <BaseIcon name="close" fit color="#ffffff" />
    </button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    url: string,
  }>();

  const emit = defineEmits<{
    (event: 'remove'): void,
  }>();

  const fullPath = computed(() => process.env.FILES_BASE + props.url);
</script>

<style scoped lang="scss">
  .preview {
    position: relative;
    width: 100px;
    height: 100px;
  }

  .photo {
    position: absolute;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  .btn-remove {
    width: 21px;
    height: 21px;
    padding: 6px;
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 10;
    border-radius: 50%;
    background: #000000;
  }
</style>
