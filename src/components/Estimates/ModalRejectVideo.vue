<template>
  <q-dialog v-model="value" maximized>
    <div class="card">
      <div class="wrapper tw-h-full">
        <div class="body tw-h-full">
          <div class="tw-w-full tw-pt-4">
            <ButtonBack @click="$emit('close')" />
          </div>
          <div class="row1">
            <div class="img-wrap">
              <img width="203" height="165" src="~assets/images/alerts/whatsapp.svg" />
            </div>
            <div class="h1 tw-text-center tw-mt-5 tw-mx-auto tw-max-w-[278px]">Предлагаем продолжить общение в чате WhatsApp</div>
          </div>
          <div class=" tw-w-full">
            <a
              class="tw-py-[13px] tw-px-4 tw-text-center tw-w-full tw-block tw-bg-el tw-rounded-16 tw-text-white tw-font-medium tw-text-[16px] tw-leading-[1.3]"
              :href="`https://api.whatsapp.com/send?phone=${config.whatsappTradePhone}`"
              target="_blank"
            >
              Поторговаться в чате WhatsApp
            </a>
            <BaseButton class="tw-mt-3" text="На главную" border @click="$reload" />
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
  import ButtonBack from 'src/components/Base/ButtonBack.vue'
  import { useConfig } from 'src/boot/config';

  const value = defineModel({
    default: false,
  });

  defineEmits<{
    (event: 'close'): void,
  }>();

  const config = useConfig();
</script>

<style scoped lang="scss">
  .card {
    @apply tw-bg-white;
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 50px;
  }

  .img-wrap {
    width: 203px;
    margin: 0 auto;
  }

  .row1 {
    padding-bottom: 40px;
  }
</style>
