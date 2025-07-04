<template>
  <q-page class="page-pb">
    <ToolbarColored
      class="bg-bar tw-mb-6"
      title="Результаты оценки"
    />
    <div class="wrapper">
      <div v-if="data">
        <div class="tw-space-y-5">
          <div class="estimate" v-if="data.price">
            <div class="estimate-label">Стоимость товара</div>
            <div class="estimate-value">{{ $amount(data.price) }}</div>
          </div>
          <div class="param">
            <div class="param-label">Номер заявки</div>
            <div class="param-value">{{ data.id }}</div>
          </div>
          <!-- <div class="param">
            <div class="param-label">Описание товара</div>
            <div class="param-value">{{ data.desc }}</div>
          </div> -->
          <div class="param" v-if="data.comment">
            <div class="param-label">Комментарий</div>
            <div class="param-value">{{ data.comment }}</div>
          </div>
          <div v-if="data.gallery.length > 0">
            <div class="h2 tw-mb-[10px]">Фотографии</div>
            <GalleryUploaded :items="data.gallery" />
          </div>
        </div>
        <div class="actions" v-if="data.price">
          <BaseButton
            class="tw-mb-3"
            text="Я согласен"
            :disabled="loading"
            @click="onAction('1')"
          />
          <BaseButton
            border
            text="Хочу поторговаться"
            :disabled="loading"
            @click="showedReject = true"
          />
        </div>
      </div>
    </div>
    <ModalSuccess v-model="showedSuccess" :estimateId="id" />
    <ModalReject
      v-model="showedReject"
      :loading="loading"
      @accept:video="onAction('2')"
      @reject:video="onAction('3')"
    />
    <ModalAcceptVideo v-model="showedAcceptVideo" />
    <ModalRejectVideo v-model="showedRejectVideo" />
    <q-inner-loading :showing="estimateRes.loading.value" />
  </q-page>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import ToolbarColored from 'src/components/LayoutParts/ToolbarColored.vue';
  import GalleryUploaded from 'src/components/GalleryUploaded/index.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import ModalSuccess from 'src/components/Estimates/ModalSuccess.vue';
  import ModalReject from 'src/components/Estimates/ModalReject.vue';
  import ModalAcceptVideo from 'src/components/Estimates/ModalAcceptVideo.vue';
  import ModalRejectVideo from 'src/components/Estimates/ModalRejectVideo.vue';
  import type { EstimateNextStep } from 'src/repositories/neiro-estimates';

  const props = defineProps<{
    id: string,
  }>();

  const router = useRouter();

  const api = useRepositories();
  const estimateRes = useRequest(() => api.estimates.show(props.id));
  useDataOrAlert(estimateRes);

  const data = computed(() => estimateRes.data.value?.[0] ?? null);

  const activeEvent = ref<EstimateNextStep | null>(null);

  const { loading, send } = usePostRequest(
    api.neiroEstimates.finish,
    () => ({
      id: props.id,
      next_step: activeEvent.value!,
    }),
    () => {
      if(activeEvent.value === '1') {
        showedSuccess.value = true;
      } else if(activeEvent.value === '2') {
        showedAcceptVideo.value = true;
      } else {
        showedRejectVideo.value = true;
      }
    },
    'Не удалось выполнить действие.',
  );

  function onAction(event: EstimateNextStep) {
    activeEvent.value = event;
    send();
  }

  const showedSuccess = ref(false);
  const showedReject = ref(false);
  const showedAcceptVideo = ref(false);
  const showedRejectVideo = ref(false);
</script>

<style scoped lang="scss">
  .bg-bar {
    background: linear-gradient(136deg, #e1e1fd 0%, #b2b2ef 100%);
  }

  .param-label {
    @apply tw-text-h2 tw-font-bold;
  }

  .param-value {
    margin-top: 6px;
    color: #252525;
    @apply tw-text-t1;
  }

  .actions {
    @apply tw-mt-8;
  }

  .estimate {
    padding: 12px 16px;
    border-radius: 20px;
    @apply tw-bg-gray-light;

    &-label {
      @apply tw-text-h2 tw-text-base tw-font-bold;
    }

    &-value {
      font-weight: 700;
      font-size: 40px;
      line-height: 1.3;
      margin-top: 8px;
    }
  }
</style>
