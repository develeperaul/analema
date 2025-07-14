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
        <div class="preview__actions">
          <button class="tw-w-[28px] tw-h-[28px]" type="button" @click="remove(file)">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0C6.28009 0 0 6.28009 0 14C0 21.7199 6.28009 28 14 28C21.7199 28 28 21.7199 28 14C28 6.28009 21.7199 0 14 0Z" fill="black"/>
              <path d="M18.4643 17.0512C18.8553 17.4423 18.8553 18.0742 18.4643 18.4653C18.2693 18.6603 18.0134 18.7583 17.7572 18.7583C17.5012 18.7583 17.2452 18.6603 17.0502 18.4653L14.0453 15.4602L11.0403 18.4653C10.8453 18.6603 10.5893 18.7583 10.3334 18.7583C10.0772 18.7583 9.82121 18.6603 9.62621 18.4653C9.23528 18.0742 9.23528 17.4423 9.62621 17.0512L12.6313 14.0462L9.62621 11.0413C9.23528 10.6502 9.23528 10.0183 9.62621 9.62718C10.0173 9.23625 10.6492 9.23625 11.0403 9.62718L14.0453 12.6323L17.0502 9.62718C17.4413 9.23625 18.0732 9.23625 18.4643 9.62718C18.8553 10.0183 18.8553 10.6502 18.4643 11.0413L15.4592 14.0462L18.4643 17.0512Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
      <div
        key="input"
        class="input-secondary"
        v-ripple
        v-if="!(maxFiles && uploadedFiles.length >= maxFiles)"
        @click="onChangeCapacitor"
      >
        <input
          v-if="!$q.platform.is.capacitor"
          class="native-input"
          type="file"
          accept="image/png, image/jpeg"
          @change="onChangeNative"
        >
        <base-icon
          class="input-secondary__icon"
          name="add-photo"
        />
      </div>
    </div>
    <div class="input-primary" v-ripple v-if="uploadedFiles.length === 0" @click="onChangeCapacitor">
      <div class="input-primary__img-wrap">
        <img width="60" height="60" src="./ui/images/camera.svg" alt="камера" />
      </div>
      <div class="input-primary__label">
        Загрузите фото<br>товара
      </div>
      <input
        v-if="!$q.platform.is.capacitor"
        class="native-input"
        ref="input"
        type="file"
        accept="image/png, image/jpeg"
        @change="onChangeNative"
      />
    </div>
    <q-inner-loading :showing="loading" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import useRepositories from 'src/composables/useRepositories';
  import usePostRequest from 'src/composables/usePostRequest';
  import type { UploadedSuccess } from 'src/repositories/files';
  import { useQuasar } from 'quasar';
  import { Camera, CameraResultType } from '@capacitor/camera';

  defineProps<{
    maxFiles?: number,
  }>();

  const $q = useQuasar();
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

  function reset() {
    if(input.value) input.value.value = '';
    currentFile.value = null;
  }

  function remove(file: UploadedSuccess) {
    uploadedFiles.value = uploadedFiles.value.filter(f => f.id !== file.id);
  }

  async function checkPerm() {
    let status = await Camera.checkPermissions();
    if(status.camera === 'prompt' || status.photos === 'prompt') {
      status = await Camera.requestPermissions({ permissions: ['camera', 'photos'] })
    }

    if(status.camera !== 'granted' || status.photos !== 'granted') {
      throw new Error('User denied permissions!');
    }
  }

  async function onChangeCapacitor() {
    if(!$q.platform.is.capacitor) return;
    try {
      await checkPerm();

      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        promptLabelHeader: 'Прикрепить фото',
        promptLabelCancel: 'Отменить',
        promptLabelPhoto: 'Из файлов',
        promptLabelPicture: 'Снять фото',
      });

      if(!photo.dataUrl) return;

      const type = photo.dataUrl.slice(0, photo.dataUrl.indexOf(';')).replace('data:', '');
      const fileName = 'app-photo' + (mimeTypesExt[type] ? `.${mimeTypesExt[type]}`: '');

      const res = await fetch(photo.dataUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName);
      currentFile.value = file;
      send();
    } catch(e) {
      console.log(e);
      reset();
    }
  }

  function onChangeNative(e: Event) {
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

  const mimeTypesExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
  };
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
      position: absolute;
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
