<template>
  <div v-if="data">
    <RobotMessage class="tw-mb-4">
      <div v-if="loadingMessage">...</div>
      <div v-else-if="robotMeesage">{{ robotMeesage[0].text ?? '' }}</div>
    </RobotMessage>
    <div class="tw-space-y-5">
      <div class="estimate" v-if="data.price">
        <div class="estimate-label">Стоимость товара</div>
        <div class="estimate-value">{{ $amount(data.price) }}</div>
      </div>
      <div class="param">
        <div class="param-label">Номер заявки</div>
        <div class="param-value">{{ data.id }}</div>
      </div>
      <div class="param">
        <div class="param-label">Товар</div>
        <div class="param-value">{{ data.desc }}</div>
      </div>
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
        text="Продать"
        :disabled="loading"
        @click="finish"
      />
      <BaseButton
        border
        class="tw-mb-3"
        text="Не продаю"
        :disabled="loading"
        @click="showedReject = true"
      />
      <BaseButton
        v-if="coinStep"
        border
        text="Это другая монета"
        @click="emit('show:coinForm')"
      />
    </div>
    <ModalSuccess v-model="showedSuccess" :estimateId="id" @close="showedSuccess = false" />
    <ModalOfferPrice
      v-model="showedReject"
      :loading="loading"
      @ok="onActionOffer($event)"
    />
    <ModalGuestFinish
      v-model="showedGuestFinish"
      :loading="loading"
      @ok="onActionGuest($event)"
    />
    <q-inner-loading :showing="estimateRes.loading.value" />
  </div>
</template>

<script setup lang="ts">
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import GalleryUploaded from 'src/components/GalleryUploaded/index.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import ModalGuestFinish from 'src/components/NeiroEstimate/ModalGuestFinish.vue';
  import ModalSuccess from 'src/components/Estimates/ModalSuccess.vue';
  import ModalOfferPrice, { Form as OfferPayload } from 'src/components/Estimates/ModalOfferPrice.vue';
  import RobotMessage from './RobotMessage.vue';
  import type { EstimateNextStep } from 'src/repositories/neiro-estimates';
  import { reactive, ref } from 'vue';
  import { useAuthStore } from 'src/stores/auth';

  const props = defineProps<{
    id: string,
    coinStep: boolean,
  }>();

  const emit = defineEmits<{
    (event: 'show:coinForm'): void,
  }>();

  const api = useRepositories();
  const estimateRes = useRequest(() => api.estimates.show(props.id));
  useDataOrAlert(estimateRes);

  const data = computed(() => estimateRes.data.value?.[0] ?? null);

  const activeEvent = ref<EstimateNextStep | null>(null);
  const offerPayload: Omit<OfferPayload, 'phone'> = reactive({
    summ: '',
    comment: '',
  });
  const guestPhone = ref('');

  const { loading, send } = usePostRequest(
    api.neiroEstimates.finish,
    () => ({
      id: props.id,
      next_step: activeEvent.value!,
      ...(activeEvent.value === '4' ? offerPayload : {}),
      ...(guestPhone.value !== '' ? { phone: guestPhone.value } : {}),
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
    guestPhone.value = phone;
    Object.assign(offerPayload, data);
    onAction('4');
  }

  function onActionGuest(phone: string) {
    guestPhone.value = phone;
    onAction('3');
  }

  const authStore = useAuthStore();

  const showedSuccess = ref(false);
  const showedReject = ref(false);
  const showedGuestFinish = ref(false);

  function finish() {
    authStore.user
      ? onAction('3')
      : showedGuestFinish.value = true;
  }

  const {
    data: robotMeesage,
    loading: loadingMessage
  } = useRequest(
    () => api.neiroEstimates.showRobotMessage({ type: '9' }),
  );
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
