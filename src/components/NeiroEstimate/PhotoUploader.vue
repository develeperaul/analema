<template>
  <div class="uploader">
    <div class="items" v-if="uploadedFiles.length > 0">
      <div
        class="preview"
        v-for="(file, index) in uploadedFiles"
        :key="file.id"
        :class="{
          'preview--big': index === 0,
          'preview--normal': index > 0,
        }"
      >
        <Image
          class="preview__photo-wrap"
          imgClass="tw-w-full tw-h-full tw-object-cover"
          :src="file.url"
        />
      </div>
      <div key="input" class="input-secondary" v-ripple v-if="!(maxFiles && uploadedFiles.length >= maxFiles)">
        <input class="native-input" type="file" accept="image/png, image/jpeg" @change="onChange">
        <base-icon
          class="input-secondary__icon"
          name="add-photo"
        />
      </div>
    </div>
    <div class="input-primary" v-ripple v-if="uploadedFiles.length === 0">
      <div class="input-primary__img-wrap">
        <img width="60" height="60" src="./ui/images/camera.svg" alt="камера" />
      </div>
      <div class="input-primary__label">
        Загрузите фото<br>товара
      </div>
      <input class="native-input" ref="input" type="file"  accept="image/png, image/jpeg" @change="onChange" />
    </div>
    <q-inner-loading :showing="loading" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import useRepositories from 'src/composables/useRepositories';
  import usePostRequest from 'src/composables/usePostRequest';
  import type { UploadedSuccess } from 'src/repositories/files';

  defineProps<{
    maxFiles?: number,
  }>();

  const api = useRepositories();

  const input = ref<HTMLInputElement | null>(null);
  const currentFile = ref<File | null>(null);
  const uploadedFiles = defineModel<UploadedSuccess[]>('uploaded', { default: [] });

  const { loading, send } = usePostRequest(
    api.files.upload,
    () => ({
      photo: currentFile.value!,
    }),
    (res) => {
      console.log(res);
      uploadedFiles.value.push(res.data[0]);
      reset();
    },
    'Не удалось загрузить фото!',
    () => {
      reset();
    },
  );

  function onChange(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const fileList = fileInput.files;
    if(!fileList || fileList.length === 0) {
      reset();
    } else {
      const file = fileList.item(0);
      if(file) {
        currentFile.value = file;
        send();
      }
    }
  }

  function reset() {
    if(input.value) input.value.value = '';
    currentFile.value = null;
  }
</script>


<style scoped lang="scss">
  .uploader {
    position: relative;
    max-width: 200px;
    margin: 0 auto;
  }

  .input-primary {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 20px;
    background: rgba(245, 245, 250, 0.65);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__label {
      font-weight: 700;
      font-size: 14px;
      line-height: 1.3;
    }

    &__img-wrap {
      width: 60px;
      margin-bottom: 12px;
    }
  }

  .native-input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 10px;
  }

  .preview {
    position: relative;
    border-radius: 20px;
    overflow: hidden;

    &--big {
      width: 200px;
      height: 200px;
    }

    &--normal {
      width: 95px;
      height: 95px;
    }

    &__photo-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -1;
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }

  .input-secondary {
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    @apply tw-bg-gray-light;

    &__icon {
      width: 24px;
      height: 24px;
      @apply tw-text-gray;
    }
  }
</style>
