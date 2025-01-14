<template>
  <Form @submit="send">
    <ButtonGroups
      class="tw-mb-5"
      :items="[
        { label: 'Самовывоз', value: '2' },
        { label: 'Курьер', value: '3' },
      ]"
      :active="form.delivery"
      @change:active="form.delivery = ($event.value as OrderCreateBody['delivery'])"
    />
    <template v-if="form.delivery === '2'">
      <Points
        :rules="orderSchema.point"
        v-model="form.point"
      />
    </template>
    <template v-else>
      <Address
        class="tw-mb-5"
        :schema="orderSchema.addr"
        :values="addr"
        @change:fullAddress="form.address = $event"
      />
      <DateTime
        class="tw-mb-4"
        :schema="orderSchema"
        v-model:date="form.date"
        v-model:time="form.time"
      />
      <p class=" tw-text-t2 tw-text-card-descr">
        Курьер дополнительно свяжется с вами. При себе необходимо иметь паспорт
      </p>
    </template>
    <div class="tw-pt-10">
      <div class="tw-mb-5 tw-flex tw-items-center tw-text-h2 tw-font-bold tw-gap-4 tw-justify-between">
        <span>Итого к оплате</span>
        <span>{{ $amount(total) }}</span>
      </div>
      <BaseButton type="submit" text="Перейти к оплате" :disabled="loading" />
    </div>
  </Form>
</template>

<script setup lang="ts">
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import Points from 'src/components/Order/Points.vue';
  import Address from 'src/components/Order/Address.vue';
  import DateTime from 'src/components/Order/DateTime.vue';
  import type { OrderCreateBody } from 'src/repositories/order';
  import { Form } from 'vee-validate';
  import { ProfileData } from 'src/repositories/profile';
  import { BasketItem } from 'src/repositories/basket';
  import { orderSchema } from 'src/schemas/order';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    total: number,
    user: ProfileData,
    basketItems: BasketItem[],
  }>();

  const emit = defineEmits<{
    (event: 'success'): void,
  }>();

  const api = useRepositories();

  const form: Omit<OrderCreateBody, 'tovars'> = reactive({
    delivery: '2',
    point: '',
    address: '',
    date: '',
    time: '',
    payment: '2',
    name: props.user.name,
    last_name: props.user.last_name,
    phone: props.user.phone,
    email: props.user.email,
  });

  const addr = reactive({
    address: '',
    flat: '',
    entrance: '',
  });

  const $q = useQuasar();
  const router = useRouter();

  const { loading, send } = usePostRequest(
    api.order.create,
    () => {
      const body = form.delivery === '2' ?
      {
        address: '',
        date: '',
        time: '',
      } :
      { point: '' };
      return {
        ...form,
        ...body,
        tovars: props.basketItems.map(i => ({ id: i.id, kol: 1 })),
      }
    },
    () => {
      emit('success');
      router.push('/');
      $q.notify({
        type: 'positive',
        message: 'Ваш заказ успешно создан!',
      });
    },
    'Не удалось создать заказ',
  );
</script>
