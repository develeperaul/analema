<template>
  <q-dialog v-model="value" maximized>
    <div class="card">
      <div class="wrapper tw-h-full">
        <div class="body tw-h-full tw-flex tw-flex-col tw-justify-between">
          <div class="tw-w-full tw-text-right tw-pt-4">
            <ButtonClose @click="value = false" />
          </div>
          <div>
            <p class="tw-text-center tw-text-h1 tw-font-bold tw-mb-6">
              Введите номер телефона
            </p>
            <VForm @submit="$emit('ok', phone)">
              <BaseInput
                class="tw-mt-6"
                label="Номер телефона"
                name="phone"
                type="tel"
                maska="+7 (###)-###-##-##"
                placeholder="+7 (000)-000-00-00"
                v-model="phone"
                :rules="phoneRule"
              />
              <BaseButton class="tw-mt-8" text="Продолжить" type="submit" :disabled="loading" />
            </VForm>
          </div>
          <div class="tw-pt-28"></div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
  import { Form as VForm } from 'vee-validate';
  import { ref } from 'vue';
  import { phoneTest } from 'src/utils/validation';
  import { string } from 'yup';

  defineProps<{
    loading: boolean,
  }>();

  const value = defineModel({
    default: false,
  });

  const emit = defineEmits<{
    (event: 'ok', phone: string): void,
  }>();

  const phone = ref('');

  const phoneRule = string().required().test(...phoneTest).label('Номер телефона');
</script>

<style scoped lang="scss">
  .card {
    @apply tw-bg-white;
  }
</style>
