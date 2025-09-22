<template>
  <q-dialog maximized v-model="value">
    <div class="tw-bg-white tw-py-8 tw-px-5 tw-flex tw-flex-col tw-justify-center tw-items-center">
      <div class="tw-max-w-[420px] tw-text-center tw-w-full">
        <div class="tw-w-[100px] tw-mx-auto tw-mb-8">
          <img width="100" height="100" src="~/assets/images/logo.svg" />
        </div>
        <div class="tw-text-h1 tw-font-bold tw-mb-14">
          Пожалуйста,<br />обновите приложение<br />до последней версии
        </div>
        <a
          class="tw-block tw-w-full tw-text-center tw-bg-[#181818] tw-rounded-16 tw-text-white tw-py-[13px] tw-px-8 tw-text-t1"
          :href="storeLink"
          target="_blank"
        >
          Обновить
        </a>
      </div>
      </div>
  </q-dialog>
</template>

<script setup lang="ts">
  import { useQuasar } from 'quasar';
  import { useSystem } from 'src/boot/system';
  import { ref } from 'vue';

  const $q = useQuasar();
  const value = ref(false);
  const system = useSystem();
  const api = useRepositories();
  const storeLink = $q.platform.is.ios ? system.appStoreLink : system.googlePlayLink;

  const res = useRequest(api.system.version, {
    onSuccess() {
      value.value = hasCriticalUpdate();
    },
  });

  function hasCriticalUpdate() {
    try {
      if(!res.data.value || !$q.platform.is.capacitor) return false;
      const currentVal = getVersionValue(system.version);
      const minVal = getVersionValue(res.data.value[0].min_version);
      return minVal > currentVal;
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  function getVersionValue(ver: string) {
    const [s1, s2, s3] = ver.split('.');
    const n1 = parseInt(s1);
    const n2 = parseInt(s2);
    const n3 = parseInt(s3);
    if(isNaN(n1) || isNaN(n2) || isNaN(n3)) throw new Error(`Не удалось распознать версию ${ver}`);
    return n1 * 100 + n2 * 10 + n3;
  }
</script>
