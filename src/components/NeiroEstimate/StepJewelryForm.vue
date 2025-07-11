<template>
  <div>
    <RobotMessage class="tw-mb-4">
      Чтобы оценить Ваше украшение, мне нужна дополнительная информация
    </RobotMessage>
    jew
    <Image :src="form.uploadedFiles[0].url" alt="" />
    <div class="tw-mb-6">
      <BaseCheckbox
        class="tw-mb-4"
        label="Перезвоните мне после оценки"
        v-model="form.recall"
        checkedValue="Да"
        uncheckedValue=""
      />
      <BaseCheckbox
        label="Свяжитесь со мной по WhatsApp после оценки"
        v-model="form.rewhatsapp"
        checkedValue="Да"
        uncheckedValue=""
      />
    </div>
    <BaseButton class="tw-mt-8" @click="emit('estimate')">
      Оценить
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from 'src/components/Base/Button2.vue';
  import RobotMessage from './RobotMessage.vue';
  import BaseCheckbox from 'src/components/Base/Checkbox.vue';
  import type { NeiroForm } from './model/types';

  const props = defineProps<{
    form: NeiroForm,
  }>();

  const emit = defineEmits<{
    (event: 'estimate'): void,
  }>();
</script>
