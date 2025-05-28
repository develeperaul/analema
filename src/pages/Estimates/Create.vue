<template>
  <q-page class="page-pb">
    <div class="purple-gr env-t tw-rounded-b-24 tw-mb-6">
      <div class="wrapper tw-pb-8">
        <BaseHeader title="Онлайн-оценка" back />
      </div>
    </div>
    <div class="wrapper">
      <Form @submit="onSubmit" v-slot="{ errors }">
        <CategoriesList
          v-if="sectionsRes.data.value"
          class="tw-mb-6"
          label="Выберите категорию"
          name="section"
          :sections="sectionsRes.data.value"
          v-model="form.section"
          :rules="createEstimateSchema.section"
          :error="errors.section"
        />
        <CategoriesList
          v-if="form.section && !subSectionsRes.loading.value && subSectionsRes.data.value"
          class="tw-mb-6"
          label="Выберите подкатегорию"
          name="sub_section"
          :sections="subSectionsRes.data.value"
          v-model="form.sub_section"
          :rules="createEstimateSchema.sub_section"
          :error="errors.sub_section"
        />
        <CategoriesList
          v-if="form.sub_section && !catalogRes.loading.value && catalogRes.data.value"
          class="tw-mb-6"
          label="Выберите товар"
          name="neiro_el"
          :sections="catalogRes.data.value"
          v-model="form.neiro_el"
          :rules="createEstimateSchema.neiro_el"
          :error="errors.neiro_el"
        />
        <InputAddValue
          class="tw-mb-6"
          v-if="activeSection && activeSection.additional"
          :additional="activeSection.additional"
          v-model="form.neiro_add_value"
          :rules="createEstimateSchema.neiro_add_value"
          :error="errors.neiro_add_value"
        />
        <BaseTextarea
          class="tw-mb-6"
          name="desc"
          label="Описание"
          placeholder="Напишите наименование и модель товара,  характеристики и состояние"
          :rules="createEstimateSchema.desc"
          v-model="form.desc"
        />

        <template v-if="!authStore.user">
          <p class="h2 tw-mb-3">Укажите ваш номер телефона</p>
          <BaseInput
            class="tw-mb-6"
            label="Номер телефона"
            name="phone"
            type="tel"
            maska="+7 (###)-###-##-##"
            placeholder="+7 (000)-000-00-00"
            :rules="createEstimateSchema.phone"
            v-model="form.phone"
          />
        </template>

        <PhotoUploader
          class="tw-mb-8"
          label="Фотографии товара"
          caption="Сделайте фото товара с разных ракурсов"
          v-model:uploaded-files="form.files"
          :error="filesError"
        />
        <BaseButton text="Отправить" :disabled="loading" />
      </Form>
    </div>
    <q-inner-loading
      :showing="sectionsRes.loading.value || subSectionsRes.loading.value || catalogRes.loading.value"
    />
    <ModalLoading v-model="showedModal" />
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
  import InputAddValue from 'src/components/Estimates/InputAddValue.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import { Form } from 'vee-validate';
  import { createEstimateSchema } from 'src/schemas/estimates';
  import type { UploadedSuccess } from 'src/repositories/files';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from 'src/stores/auth';

  const authStore = useAuthStore();
  const api = useRepositories();
  const sectionsRes = useRequest(api.neiroCatalog.showSections);
  useDataOrAlert(sectionsRes);

  const form = reactive({
    desc: '',
    files: [] as UploadedSuccess[],
    section: '',
    sub_section: '',
    neiro_el: '',
    neiro_add_value: '',
    phone: '',
  });

  const filesError = ref('');

  const subSectionsRes = useRequest(
    () => api.neiroCatalog.showSubSections(form.section),
    { immediate: false, watch: [ () => form.section ] }
  );
  useDataOrAlert(subSectionsRes);

  const catalogRes = useRequest(
    () => api.neiroCatalog.list(form.sub_section),
    { immediate: false }
  );
  useDataOrAlert(catalogRes);

   watch(() => form.section, () => {
    form.sub_section = '';
   });

  watch(() => form.sub_section, () => {
    form.neiro_el = '';
    if(form.sub_section) catalogRes.send();
  });

  const activeSection = computed(() => sectionsRes.data.value?.find(s => s.id === form.section));

  const { loading, send } = usePostRequest(
    api.neiroEstimates.create,
    () => ({
      desc: form.desc,
      section: form.sub_section,
      files: form.files.map(f => f.id),
      neiro_el: form.neiro_el,
      neiro_add_type: activeSection.value?.additional ?? '',
      neiro_add_value: form.neiro_add_value,
      phone: form.phone,
    }),
    async (res) => {
      await hideModal();
      if(!authStore.user) {
        router.push({ name: 'home' });
      } else {
        if(!res.data.price) {
          router.push({ name: 'estimates.index' });
        } else {
          router.push({ name: 'estimates.result', params: { id: res.data.id } });
        }
      }
    },
    'Не удалось создать заявку.',
  );

  const showedModal = ref(false);

  const router = useRouter();

  function hideModal() {
    return new Promise<void>((res) => {
      setTimeout(() => {
        showedModal.value = false;
        res();
      }, 5000);
    });
  }

  function onSubmit() {
    if(form.files.length <= 0) {
      filesError.value = 'Добавьте хотя бы одно фото'
    } else {
      showedModal.value = true;
      send();
    }
  }
</script>
