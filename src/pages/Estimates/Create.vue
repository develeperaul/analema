<template>
  <q-page class="page-pb">
    <div class="purple-gr env-t tw-rounded-b-24 tw-mb-6">
      <div class="tw-container tw-pb-8">
        <BaseHeader title="Онлайн-оценка" back />
      </div>
    </div>
    <div class="tw-container">
      <Form @submit="send">
        <CategoriesList
          v-if="sectionsRes.data.value"
          class="tw-mb-6"
          :sections="sectionsRes.data.value"
          v-model="form.section"
        />
        <BaseTextarea
          class="tw-mb-6"
          name="desc"
          label="Описание"
          placeholder="Напишите наименование и модель товара,  характеристики и состояние"
          :rules="createEstimateSchema.desc"
          v-model="form.desc"
        />
        <PhotoUploader
          class="tw-mb-8"
          label="Фотографии товара"
          caption="Сделайте фото товара с разных ракурсов"
          v-model:uploaded-files="form.files"
        />
        <BaseButton text="Отправить" :disabled="loading" />
      </Form>
    </div>
    <q-inner-loading :showing="sectionsRes.loading.value" />
    <ModalLoading v-model="showedModal" @finish="onFinish" />
  </q-page>
</template>

<script setup lang="ts">
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import PhotoUploader from 'src/components/PhotoUploader/index.vue';
  import CategoriesList from 'src/components/Estimates/CategoriesList.vue';
  import BaseTextarea from 'src/components/Base/Textarea.vue';
  import ModalLoading from 'src/components/Estimates/ModalLoading.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import { Form } from 'vee-validate';
  import { createEstimateSchema } from 'src/schemas/estimates';
  import type { UploadedSuccess } from 'src/repositories/files';
  import { useRouter } from 'vue-router';

  const api = useRepositories();
  const sectionsRes = useRequest(api.estimates.showSections);
  useDataOrAlert(sectionsRes);

  const form = reactive({
    desc: '',
    files: [] as UploadedSuccess[],
    section: '',
  });

  const { loading, send } = usePostRequest(
    api.estimates.create,
    () => ({
      ...form,
      files: form.files.map(f => f.id),
    }),
    () => {
      showedModal.value = true;
    },
    'Не удалось создать заявку.',
  );

  const showedModal = ref(false);

  const router = useRouter();

  function onFinish() {
    router.replace({ name: 'estimates.index' });
  }
</script>
