<template>
  <div class="file-input">
    <input class="inp" type="file" accept="image/png, image/jpeg" @change="onChange">
    <base-icon
      class="icon"
      name="add-photo"
    />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (event: 'change:file', file: File): void,
  }>();

  function onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      emit('change:file', input.files[0]);
    }
    input.value = '';
  }
</script>

<style scoped lang="scss">
  .file-input {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    @apply tw-bg-gray-light;
  }

  .inp {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .icon {
    width: 24px;
    height: 24px;
    @apply tw-text-gray;
  }
</style>
