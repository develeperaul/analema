<template>
  <div>
    <pre>{{ loading ? 'Загрузка' : '' }}</pre>
    <pre>{{ currentFile }}</pre>
    <pre>{{ uploadedFiles }}</pre>
    <div class="tw-w-full tw-h-[300px] tw-bg-gray">
      Загрузите фото товара
      <input ref="input" type="file" @change="onChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import useRepositories from 'src/composables/useRepositories';
  import usePostRequest from 'src/composables/usePostRequest';
  import type { UploadedSuccess } from 'src/repositories/files';

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
