<template>
  <q-page class="tw-pb-8 tw-flex tw-flex-col">
    <div class="tw-container tw-grow tw-flex tw-flex-col">
      <Toolbar class="tw-mb-8" title="Вывод средств" showBack />
      <Form class="tw-grow tw-flex tw-flex-col" v-if="balanceRes.data.value">
        <div class="tw-mb-5">
          <div class="tw-text-t1 tw-font-bold tw-mb-[10px] tw-text-base">Реферальный счет</div>
          <div class="tw-bg-bg tw-rounded-14 tw-px-4 tw-py-3 tw-text-t1 tw-font-bold tw-text-base">
            {{ $amount(balanceRes.data.value.balance) }}
          </div>
        </div>
        <div class="tw-mb-8">
          <p class="tw-text-base tw-text-t1 tw-font-bold tw-mb-[10px]">Сумма вывода</p>
          <BaseInput name="sum" label="Сумма вывода" v-model="form.sum" />
          <p class="tw-text-t2 tw-text-card-descr tw-mt-[10px]">Минимальная сумма вывода 3 000 ₽</p>
        </div>
        <BaseButton class="tw-mt-auto" text="Вывести" />
      </Form>
    </div>
    <ModalSuccessOutput v-model="showedSuccess" />
    <q-inner-loading :showing="balanceRes.loading.value" />
  </q-page>
</template>

<script setup lang="ts">
  import useRepositories from 'src/composables/useRepositories';
  import useRequest from 'src/composables/useRequest';
  import useDataOrAlert from 'src/composables/useDataOrAlert';
  import ModalSuccessOutput from 'src/components/Referrals/ModalSuccessOutput.vue';
  import { Form } from 'vee-validate';

  const api = useRepositories();
  const balanceRes = useRequest(() => api.referrals.showBalance());
  useDataOrAlert(balanceRes);

  const form = reactive({
    sum: '',
  });

  const showedSuccess = ref(false);
</script>
