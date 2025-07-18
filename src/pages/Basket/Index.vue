<template>
  <q-page class="page-pb tw-flex tw-flex-col">
    <div class="wrapper tw-grow tw-flex tw-flex-col">
      <Toolbar class="tw-mb-6" showBack title="Корзина" />
      <template v-if="basketRes.data.value">
        <BasketList
          :count="basketStore.count"
          :items="basketRes.data.value"
          @basket:remove="removeItem"
        />
        <div class="tw-mt-10" v-if="basketRes.data.value.length > 0 && !authStore.user">
          <p class="tw-mb-4 tw-text-center">Чтобы оформить заказ<br>необходимо войти в&nbsp;профиль</p>
          <BaseButton class="tw-w-full" text="Войти" :to="{ name: 'auth.login' }" />
        </div>
        <FormCreate
          class="tw-mt-10"
          v-if="basketRes.data.value.length > 0 && authStore.user"
          :total="total"
          :user="authStore.user"
          :basketItems="basketRes.data.value"
          @success="onSuccess"
        />
      </template>
      <ModalCreatedSuccess v-model:showed="showedSuccessCreated" :links="paymentLinks"  />
      <ModalPayment v-model="showedPayment" :links="paymentLinks" />
      <q-inner-loading :showing="basketRes.loading.value" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import Toolbar from 'src/components/LayoutParts/Toolbar.vue';
  import BasketList from 'src/components/Basket/List.vue';
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import FormCreate from 'src/components/Order/FormCreate.vue';
  import ModalPayment from 'src/components/Order/ModalPayment.vue';
  import ModalCreatedSuccess from 'src/components/Order/ModalCreatedSuccess.vue';
  import { OrderCreateSuccess } from 'src/repositories/order';
  import { useAuthStore } from 'src/stores/auth';
  import { useBasketStore } from 'src/stores/basket';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';

  const api = useRepositories();
  const basketStore = useBasketStore();
  const authStore = useAuthStore();

  const basketRes = useRequest(
    () => api.basket.show(basketStore.ids),
  );
  useDataOrAlert(basketRes);

  function removeItem(id: string) {
    basketStore.removeSync(id);
    basketRes.send();
  }

  const total = computed(() => {
    const items = basketRes.data.value;
    if(!items) return 0;
    return items.reduce((acc, item) => {
      acc += parseInt(item.price);
      return acc;
    }, 0);
  });

  const $q = useQuasar();
  const router = useRouter();

  const showedPayment = ref(false);
  const showedSuccessCreated = ref(false);
  const paymentLinks = ref<OrderCreateSuccess>([]);

  function onSuccess(res: OrderCreateSuccess) {
    if(res.length <= 0) {
      router.push('/');
    } else if(res.length === 1) {
      showedSuccessCreated.value = true;
      paymentLinks.value = res;
    } else {
      paymentLinks.value = res;
      showedPayment.value = true;
    }
    basketStore.clearSync();
    basketRes.send();
    $q.notify({
      type: 'positive',
      message: 'Ваш заказ успешно создан!',
    });
  }
</script>
