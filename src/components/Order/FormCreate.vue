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
      <Pickup
        :schema="orderSchema.pickup"
        v-model:city="pickup.city"
        v-model:point="pickup.point"
      />
    </template>
    <template v-else>
      <Address
        class="tw-mb-5"
        :schema="orderSchema.addr"
        :values="addr"
        @change:fullAddress="form.address = $event"
      />
      <!-- <DateTime
        class="tw-mb-4"
        :schema="orderSchema"
        v-model:date="form.date"
        v-model:time="form.time"
      /> -->
      <p class="tw-text-t2 tw-text-card-descr">
        Наш менеджер свяжется с Вами, чтобы обговорить детали доставки
      </p>
    </template>
    <div class="tw-pt-10">
      <div class="tw-mb-5 tw-flex tw-items-center tw-text-h2 tw-font-bold tw-gap-4 tw-justify-between">
        <span>Итого к оплате</span>
        <span>{{ $amount(total) }}</span>
      </div>
      <BaseButton type="submit" text="Оформить заказ" :disabled="loading" />
    </div>
  </Form>
</template>

<script setup lang="ts">
  import usePostRequest from 'src/composables/usePostRequest';
  import useRepositories from 'src/composables/useRepositories';
  import Pickup from 'src/components/Order/Pickup.vue';
  import Address from 'src/components/Order/Address.vue';
  import DateTime from 'src/components/Order/DateTime.vue';
  import type { OrderCreateBody } from 'src/repositories/order';
  import { Form } from 'vee-validate';
  import { ProfileData } from 'src/repositories/profile';
  import { BasketItem } from 'src/repositories/basket';
  import { OrderCreateSuccess } from 'src/repositories/order';
  import { orderSchema } from 'src/schemas/order';

  const props = defineProps<{
    total: number,
    user: ProfileData,
    basketItems: BasketItem[],
  }>();

  const emit = defineEmits<{
    (event: 'success', res: OrderCreateSuccess): void,
  }>();

  const api = useRepositories();

  const form: Omit<OrderCreateBody, 'tovars' | 'point'> = reactive({
    delivery: '2',
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

  const pickup = reactive({
    city: '',
    point: '',
  });

  const { loading, send } = usePostRequest(
    api.order.create,
    () => {
      const body = form.delivery === '2' ?
      {
        point: pickup.city + ', ' + pickup.point,
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
    (res) => {
      emit('success', res.data);
    },
    'Не удалось создать заказ',
  );
</script>
