<template>
  <q-page class="page-pb">
    <ToolbarColored class="purple-gr tw-mb-6" title="Онлайн-оценка" :onBack="onBack" />
    <div class="wrapper">
      <Form v-slot="{ errors }" @submit="onSubmit">
        <Transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster"
          @afterLeave="scollTop"
        >
          <KeepAlive>
            <StepsCategories
              v-if="activeStep === 'categories'"
              :form="form"
              @next="activeCategory = $event; activeStep = 'products'"
            />
            <StepsProducts
              v-else-if="activeCategory && activeStep === 'products'"
              :activeCategory="activeCategory"
              @next="activeProduct = $event; activeStep = 'data'"
            />
            <StepsData
              v-else-if="activeCategory && activeProduct && activeStep === 'data'"
              :activeCategory="activeCategory"
              :activeProduct="activeProduct"
              :form="form"
              :filesError="filesError"
              :errors="errors"
            />
          </KeepAlive>
        </Transition>
      </Form>
    </div>
    <ModalLoading v-model="showedModal" />
  </q-page>
</template>

<script setup lang="ts">
  import { Form } from 'vee-validate';
  import { reactive, ref, watch } from 'vue';
  import { SectionItem } from 'src/repositories/neiro-catalog';
  import { ActiveProduct } from 'src/components/Estimates/Steps/types';
  import type { UploadedSuccess } from 'src/repositories/files';
  import StepsCategories from 'src/components/Estimates/Steps/Categories.vue';
  import StepsProducts from 'src/components/Estimates/Steps/Products.vue';
  import StepsData from 'src/components/Estimates/Steps/Data.vue';
  import ModalLoading from 'src/components/Estimates/ModalLoading.vue';
  import useRepositories from 'src/composables/useRepositories';
  import usePostRequest from 'src/composables/usePostRequest';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from 'src/stores/auth';

  const activeStep = ref<'categories' | 'products' | 'data'>('categories');

  const form = reactive({
    section: '',
    desc: '',
    files: [] as UploadedSuccess[],
    recall: '',
    rewhatsapp: '',
    neiro_add_value: '',
    phone: '',
  });

  const activeCategory = ref<SectionItem | null>(null);
  const activeProduct = ref<ActiveProduct | null>(null);

  const router = useRouter();
  const api = useRepositories();
  const authStore = useAuthStore();
  const showedModal = ref(false);
  const filesError = ref('');

  const { send } = usePostRequest(
    authStore.user ? api.neiroEstimates.create : api.neiroEstimates.createWeb,
    () => ({
      desc: form.desc,
      section: form.section,
      files: form.files.map(f => f.id),
      neiro_el: activeProduct.value!.id,
      neiro_add_type: activeCategory.value!.additional ?? '',
      neiro_add_value: form.neiro_add_value,
      phone: form.phone,
      recall: form.recall,
      rewhatsapp: form.rewhatsapp,
    }),
    async (res) => {
      await hideModal();
      if(!res.data.price && authStore.user) {
        router.push({ name: 'estimates.index' });
      } else {
        router.push({ name: 'estimates.result', params: { id: res.data.id } });
      }
    },
    'Не удалось создать заявку.',
  );

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

  function scollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onBack() {
    const path = [ 'categories', 'products', 'data' ] as const;
    const ind = path.findIndex(str => str === activeStep.value);
    if(ind === 0 || ind === -1) router.back();
    activeStep.value = path[ind - 1];
  }

  watch(activeCategory, () => {
    activeProduct.value = null;
  });

  watch(activeProduct, () => {
    form.neiro_add_value = '';
  });
</script>
