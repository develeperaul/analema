<template>
  <q-page class="tw-pb-8">
    <div class="tw-container tw-pt-6">
      <div class="tw-relative tw-flex tw-justify-center tw-mb-6">
        <div
          @click="router.go(-1)"
          class="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2">
          <BaseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
        </div>
        <div class="tw-text-h1 tw-font-bold">Заказ № {{ id }}</div>
      </div>
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
          <div class="param">
            <div class="param-label">Наименование товара</div>
            <div class="param-value">{{ data.desc }}</div>
          </div>
          <div v-if="data.gallery.length > 0">
            <div class="h2 tw-mb-[10px]">Фотографии</div>
            <GalleryUploaded :items="data.gallery" />
          </div>
        </div>
        <div class="estimate" v-if="data.price">
          <div class="param tw-mb-5">
            <div class="param-label">Стоимость товара</div>
            <div class="param-value">{{ $amount(data.price) }}</div>
          </div>
          <div class="param" v-if="data.comment">
            <div class="param-label">Комментарий</div>
            <div class="param-value">{{ data.comment }}</div>
          </div>
        </div>
        <div class="actions">
          <BaseButton
            v-if="data.status === 'Ожидает оценки'"
            text="Отменить сделку"
            :disabled="loading"
            @click="onAction('3')"
          />
          <template v-if="data.price">
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
          </template>
        </div>
      </div>
    </div>
    <ModalSuccess v-model="showedSuccess" :estimateId="id" />
    <ModalReject
      v-model="showedReject"
      :loading="loading"
      @accept:video="onAction('2')"
      @reject:video="showedRejectVideo = true"
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
  import GalleryUploaded from 'src/components/GalleryUploaded/index.vue';
  import usePostRequest from 'src/composables/usePostRequest';
  import ModalSuccess from 'src/components/Estimates/ModalSuccess.vue';
  import ModalReject from 'src/components/Estimates/ModalReject.vue';
  import ModalAcceptVideo from 'src/components/Estimates/ModalAcceptVideo.vue';
  import ModalRejectVideo from 'src/components/Estimates/ModalRejectVideo.vue';
  import type { EventType } from 'src/repositories/estimates';

  const props = defineProps<{
    id: string,
  }>();

  const router = useRouter();

  const api = useRepositories();
  const estimateRes = useRequest(() => api.estimates.show(props.id));
  useDataOrAlert(estimateRes);

  const data = computed(() => estimateRes.data.value?.[0] ?? null);

  const activeEvent = ref<EventType | null>(null);

  const { loading, send } = usePostRequest(
    api.estimates.sendEvent,
    () => ({
      id: props.id,
      event: activeEvent.value!,
    }),
    () => {
      if(activeEvent.value === '1') {
        showedSuccess.value = true;
      } else if(activeEvent.value === '2') {
        showedAcceptVideo.value = true;
      } else {
        estimateRes.send();
      }
    },
    'Не удалось выполнить действие.',
  );

  function onAction(event: EventType) {
    activeEvent.value = event;
    send();
  }

  const showedSuccess = ref(false);
  const showedReject = ref(false);
  const showedAcceptVideo = ref(false);
  const showedRejectVideo = ref(false);
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
