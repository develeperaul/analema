<template>
  <q-page class="page-pb">
    <div class="wrapper">
      <Toolbar class="tw-mb-8" title="Свзяться с нами" showBack />
      <HotlinePhone class="tw-mb-6" />
      <MyEmail class="tw-mb-6" />
      <FormRequest @success="showedSuccess = true" />
      <ModalSuccess v-model="showedSuccess" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import HotlinePhone from 'src/components/Callback/HotlinePhone.vue';
  import MyEmail from 'src/components/Callback/MyEmail.vue';
  import FormRequest from 'src/components/Callback/FormRequest.vue';
  import ModalSuccess from 'src/components/Callback/ModalSuccess.vue';

  const showedSuccess = ref(false);
</script>
