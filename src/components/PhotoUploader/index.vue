<template>
  <div class="uploader">
    <div class="inp-label">{{ label }}</div>
    <div class="area">
      <div class="items">
        <TransitionGroup
          enter-active-class="animate__animated animate__zoomIn anim-delay"
          leave-active-class="animate__animated animate__zoomOut anim-delay"
        >
          <PhotoPreview
            class="tw-shrink-0"
            v-for="file in uploadedFiles"
            :key="file.id"
            :url="file.url"
            @remove="removeFile(file)"
          />
        </TransitionGroup>
        <FileInput class="tw-shrink-0" @change:file="onChnageFile" />
      </div>
    </div>
    <div class="caption" v-if="caption">{{ caption }}</div>
    <div class="tw-text-t1 tw-text-negative tw-mt-2" v-if="error">{{ error }}</div>
    <q-inner-loading :showing="loading" />
  </div>
</template>

<script setup lang="ts">
  import usePostRequest from 'src/composables/usePostRequest';
  import FileInput from './Input.vue';
  import PhotoPreview from './Preview.vue';
  import useRepositories from 'src/composables/useRepositories';
  import type { UploadedSuccess } from 'src/repositories/files';

  defineProps<{
    label: string,
    caption?: string,
    error?: string,
  }>();

  const api = useRepositories();

  const { loading, send } = usePostRequest(
    api.files.upload,
    () => ({
      photo: currentFile.value!,
    }),
    (res) => {
      uploadedFiles.value.push(res.data[0]);
    },
    'Не удалось загрузить фото',
  );

  const currentFile = ref<File | null>(null);
  const uploadedFiles = defineModel<UploadedSuccess[]>('uploadedFiles', {
    default: [],
  });

  function onChnageFile(file: File) {
    currentFile.value = file;
    send();
  }

  function removeFile(file: UploadedSuccess) {
    uploadedFiles.value = uploadedFiles.value.filter(f => f.id !== file.id);
  }
</script>

<style scoped lang="scss">
  .inp-label {
    font-size: 18px;
    line-height: 1.3;
    font-weight: 700;
    @apply tw-mb-3;
  }

  .caption {
    margin-top: 10px;
    @apply tw-text-t2 tw-text-card-descr;
  }

  .items {
    display: flex;
    gap: 12px;
  }

  .area {
    padding-top: 8px;
    max-width: 100%;
    overflow-y: hidden;
  }

  .uploader {
    position: relative;
  }

  .anim-delay {
    --animate-duration: 300ms;
  }
</style>
