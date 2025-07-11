<template>
  <q-page class="page-pb">
    <ToolbarColored class="purple-gr tw-mb-6" title="Онлайн-оценка" />
    <div class="wrapper">
      <Transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <StepUploadPhotos
          v-if="currentStep === 'upload-photos'"
          :form="form"
          @next="showedAssessProccess = true; sendPhotos()"
        />
        <StepIdentifyProduct
          v-else-if="currentStep === 'identify-product'"
          :form="form"
          :assessmentRes="assessmentRes!"
          @answer:no="currentStep = 'search-0'"
          @answer:yes="onIdentifyYes"
        />
        <StepIdentifyFailed
          v-else-if="currentStep === 'identify-failed'"
          @next="currentStep = 'search-0'"
        />
        <StepSearch v-else-if="currentStep === 'search-0' || currentStep === 'search-1'"
          :isIdentified="currentStep === 'search-1'"
          :form="form"
          :assessmentRes="assessmentRes!"
          @next="form.freeFlow = $event; currentStep = 'product-form'"
        />
        <StepProductForm
          v-else-if="currentStep === 'product-form'"
          :form="form"
          :assessmentRes="assessmentRes!"
          @estimate="send"
        />
        <StepJewelryForm
          v-else-if="currentStep === 'jewelry-form'"
          :form="form"
          @estimate="send"
        />
        <StepCoinForm
          v-else-if="currentStep === 'coin-form'"
          :form="form"
          @estimate="send"
        />
        <StepResult
          v-else-if="currentStep === 'result' || currentStep === 'coin-res'"
          :id="estimateCreatedRes!.id.toString()"
          :coinStep="currentStep === 'coin-res'"
          @show:coinForm="currentStep = 'coin-form'"
        />
      </Transition>
    </div>
    <ModalAssessLoading v-model="showedAssessProccess" />
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import usePostRequest from 'src/composables/usePostRequest';
  import StepUploadPhotos from 'src/components/NeiroEstimate/StepUploadPhotos.vue';
  import StepIdentifyProduct from 'src/components/NeiroEstimate/StepIdentifyProduct.vue';
  import StepIdentifyFailed from 'src/components/NeiroEstimate/StepIdentifyFailed.vue';
  import StepSearch from 'src/components/NeiroEstimate/StepSearch.vue';
  import StepProductForm from 'src/components/NeiroEstimate/StepProductForm.vue';
  import StepJewelryForm from 'src/components/NeiroEstimate/StepJewelryForm.vue';
  import StepCoinForm from 'src/components/NeiroEstimate/StepCoinForm.vue';
  import StepResult from 'src/components/NeiroEstimate/StepResult.vue';
  import ModalAssessLoading from 'src/components/NeiroEstimate/ModalAssessLoading.vue';
  import type { NeiroForm } from 'src/components/NeiroEstimate/model/types';
  import type { AssessSuccessRes, EstimateCreateRes } from 'src/repositories/neiro-estimates';
  import { reactive } from 'vue';
  import { useConfig } from 'src/boot/config';

  const config = useConfig();

  const api = useRepositories();

  const steps = [
    'upload-photos', 'identify-product', 'identify-failed', 'search-0', 'search-1',
    'product-form', 'jewelry-form', 'coin-form', 'coin-res', 'result',
  ] as const;
  const currentStep = ref<typeof steps[number]>('upload-photos');
  const showedAssessProccess = ref(false);
  const assessmentRes = ref<AssessSuccessRes | null>(null);
  const estimateCreatedRes = ref<EstimateCreateRes | null>(null);

  const form: NeiroForm = reactive({
    uploadedFiles: [],
    activeProduct: null,
    freeFlow: '',
    recall: '',
    rewhatsapp: '',
    neiro_add_value: '',
    neiro_add_metall: '',
    neiro_add_brilliant: '',
    neiro_add_proba: '',
  });

  const { send: sendPhotos } = usePostRequest(
    api.neiroEstimates.assessPhotos,
    () => ({
      images: form.uploadedFiles.map(f => config.filesBase + f.url),
    }),
    (res) => {
      showedAssessProccess.value = false;
      assessmentRes.value = res.data;
      const assessItem = assessmentRes.value[0];
      if(assessItem) {
        if(assessItem.moneta === 1) {
          currentStep.value = 'coin-res';
          const price = parseFloat(assessItem.price);
          estimateCreatedRes.value = {
            id: assessItem.id!,
            price: !isNaN(price) ? price : 0,
          };
        } else {
          currentStep.value = 'identify-product';
        }
      } else {
        currentStep.value = 'identify-failed';
      }
    },
    'Не удалось оценить фото!',
  );

  function onIdentifyYes() {
    assessmentRes.value?.[0]?.uvelirka === 1
      ? currentStep.value = 'jewelry-form'
      : currentStep.value = 'search-1'
  }

  const { loading, send } = usePostRequest(
    api.neiroEstimates.create2,
    () => {
      const images = form.uploadedFiles.map(f => f.url);
      const assessItem = assessmentRes.value?.[0];

      let free_flow = '';
      let neiro_el = '';
      let neiro_add_type = '3';
      if(
        assessItem?.moneta === 1 ||
        assessItem?.uvelirka === 1 && form.activeProduct === null && form.freeFlow === ''
      ) {
        neiro_add_type = '1',
        neiro_el = assessItem.neiro_el.toString();
      } else if(form.activeProduct) {
        neiro_el = form.activeProduct.id;
      } else {
        free_flow = form.freeFlow;
      }

      return {
        images,
        free_flow,
        neiro_el,
        neiro_add_value: form.neiro_add_value,
        recall: form.recall,
        rewhatsapp: form.rewhatsapp,
        neiro_add_type,
        neiro_add_metall: form.neiro_add_metall,
        neiro_add_brilliant: form.neiro_add_brilliant,
        neiro_add_proba: form.neiro_add_proba,
      }
    },
    (res) => {
      console.log(res.data);
      estimateCreatedRes.value = res.data;
      currentStep.value = 'result';
    },
    'Не удалось завершить оценку!',
  );
</script>
