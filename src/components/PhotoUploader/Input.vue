<template>
  <div v-if="$q.platform.is.android" class="file-input" v-ripple @click="onChangeCapacitor">
    <base-icon
      class="icon"
      name="add-photo"
    />
  </div>
  <div v-else class="file-input" v-ripple>
    <input class="inp" type="file" accept="image/png, image/jpeg" @change="onChangeNative">
    <base-icon
      class="icon"
      name="add-photo"
    />
  </div>
</template>

<script setup lang="ts">
  import { Camera, CameraResultType } from '@capacitor/camera';
  import { useQuasar } from 'quasar';

  const $q = useQuasar();

  const emit = defineEmits<{
    (event: 'change:file', file: File): void,
  }>();

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
      emit('change:file', new File([blob], fileName));
    } catch(e) {
      console.log(e);
    }
  }

  function onChangeNative(e: Event) {
    const input = e.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      emit('change:file', input.files[0]);
    }
    input.value = '';
  }

  const mimeTypesExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
  };
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
    z-index: 10;
  }

  .icon {
    width: 24px;
    height: 24px;
    @apply tw-text-gray;
  }
</style>
