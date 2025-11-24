<template>
  <q-page class="page-pb">
    <div class="wrapper">
      <Toolbar class="tw-mb-6" :title="`Заказ № ${id}`" showBack />
      <div v-if="data">
        <div class="tw-space-y-5">
          <div class="param">
            <div class="param-label">Дата</div>
            <div class="param-value">{{ data.date }}</div>
          </div>
          <div class="param">
            <div class="param-label">Статус</div>
            <div class="param-value">{{ data.status }}</div>
          </div>
          <!-- <div class="param">
            <div class="param-label">Описание товара</div>
            <div class="param-value">{{ data.desc }}</div>
          </div> -->
          <div v-if="data.gallery.length > 0">
            <div class="h2 tw-mb-[10px]">Фотографии</div>
            <GalleryUploaded :items="data.gallery" />
          </div>
        </div>
        <div class="estimate" v-if="data.price">
          <div class="param">
            <div class="param-label">Стоимость товара</div>
            <div class="param-value">{{ $amount(data.price) }}</div>
          </div>
          <div class="param tw-mt-5" v-if="data.comment">
            <div class="param-label">Комментарий</div>
            <div class="param-value">{{ data.comment }}</div>
          </div>
        </div>
        <div class="actions">
          <BaseButton
            v-if="data.status === 'Ожидает оценки'"
            text="Отменить сделку"
            :disabled="loadingCancel"
            @click="cancel"
          />
          <template v-if="data.price">
            <BaseButton
              class="tw-mb-3"
              text="Продать"
              :disabled="loading"
              @click="onAction('3')"
            />
            <BaseButton
              border
              text="Не продаю"
              :disabled="loading"
              @click="showedReject = true"
            />
          </template>
        </div>
      </div>
    </div>
    <ModalSuccess v-model="showedSuccess" :estimateId="id" />
    <ModalOfferPrice
      v-model="showedReject"
      :loading="loading"
      @ok="onActionOffer($event)"
    />
    <q-inner-loading :showing="estimateRes.loading.value" />
  </q-page>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import GalleryUploaded from 'src/components/GalleryUploaded/index.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import ModalSuccess from 'src/components/Estimates/ModalSuccess.vue';
  import ModalOfferPrice, { Form as OfferPayload } from 'src/components/Estimates/ModalOfferPrice.vue';
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
  const offerPayload: Omit<OfferPayload, 'phone'> = reactive({
    summ: '',
    comment: '',
  });

  const { loading: loadingCancel, send: cancel } = usePostRequest(
    api.estimates.sendEvent,
    () => ({ id: props.id, event: '3' as const }),
    () => estimateRes.send(),
    'Не удалось отменить сделку!',
  );

  const { loading, send } = usePostRequest(
    api.neiroEstimates.finish,
    () => ({
      id: props.id,
      next_step: activeEvent.value!,
      ...(activeEvent.value === '4' ? offerPayload : {}),
    }),
    () => {
      showedSuccess.value = true;
    },
    'Не удалось выполнить действие.',
  );

  function onAction(event: EstimateNextStep) {
    activeEvent.value = event;
    send();
  }

  function onActionOffer(payload: OfferPayload) {
    const { phone, ...data } = payload;
    Object.assign(offerPayload, data);
    onAction('4');
  }

  const showedSuccess = ref(false);
  const showedReject = ref(false);
</script>

<style scoped lang="scss">
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
    @apply tw-bg-gray-light tw-p-4 tw-pb-5 tw-rounded-20 tw-mt-8;
  }
</style>
