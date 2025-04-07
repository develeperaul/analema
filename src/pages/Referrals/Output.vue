<template>
  <q-page class="page-pb tw-flex tw-flex-col">
    <div class="wrapper tw-grow tw-flex tw-flex-col">
      <Toolbar class="tw-mb-8" title="Вывод средств" showBack />
      <Form class="tw-grow tw-flex tw-flex-col" v-if="balanceRes.data.value" @submit="send">
        <div class="tw-mb-5">
          <div class="tw-text-t1 tw-font-bold tw-mb-[10px] tw-text-base">Реферальный счет</div>
          <div class="tw-bg-bg tw-rounded-14 tw-px-4 tw-py-3 tw-text-t1 tw-font-bold tw-text-base">
            {{ $amount(balanceRes.data.value.balance) }}
          </div>
        </div>
        <div class="tw-mb-6">
          <p class="tw-text-base tw-text-t1 tw-font-bold tw-mb-[10px]">Сумма вывода</p>
          <BaseInput type="number" name="sum" label="Сумма вывода" v-model="form.sum" :rules="schema.sum" hideStatus />
          <p v-if="message" class="tw-text-t2 tw-text-card-descr tw-mt-[10px]">
            {{ message }}
          </p>
        </div>
        <div class="tw-mb-8">
          <p class="tw-text-base tw-text-t1 tw-font-bold tw-mb-[10px]">Реквизиты</p>
          <div class="tw-bg-white tw-p-4 tw-pb-5 tw-rounded-14 card-credit">
            <p class="tw-text-t2 tw-text-base tw-mb-2">Номер карты</p>
            <BaseInput name="card" label="Номер карты" v-model="form.card" :rules="schema.card" maska="#### #### #### ####" hideStatus />
          </div>
        </div>
        <BaseButton class="tw-mt-auto" text="Вывести" :disabled="!canOutput" />
      </Form>
    </div>
    <ModalSuccessOutput v-model="showedSuccess" />
    <q-inner-loading :showing="balanceRes.loading.value || loading" />
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import usePostRequest from 'src/composables/usePostRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import ModalSuccessOutput from 'src/components/Referrals/ModalSuccessOutput.vue';
  import { Form } from 'vee-validate';
  import { string } from 'yup';

  const api = useRepositories();
  const balanceRes = useRequest(() => api.referrals.showBalance());
  useDataOrAlert(balanceRes);

  const form = reactive({
    sum: '' as '' | number,
    card: '',
  });

  const showedSuccess = ref(false);

  const { loading, send } = usePostRequest(
    api.referrals.outputMoney,
    () => form,
    () => {
      showedSuccess.value = true;
    },
    'Не удалось создать заявку на вывод!',
  );

  const minSum = computed(() => {
    if(form.sum === '') return false;
    return form.sum >= 3000;
  });

  const lessThenBalance = computed(() => {
    if(!balanceRes.data.value || form.sum === '') return false;
    return form.sum <= parseInt(balanceRes.data.value.balance);
  });

  const message = computed(() => {
    return !minSum.value ? 'Минимальная сумма вывода 3 000 ₽' :
      !lessThenBalance.value ? 'Недостаточно средств' :
      '';
  });

  const canOutput = computed(() => minSum.value && lessThenBalance.value);

  const schema = {
    sum: string().required().label('Сумма'),
    card: string().required().label('Номер карты'),
  };
</script>

<style scoped lang="scss">
  .card-credit {
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  }
</style>
