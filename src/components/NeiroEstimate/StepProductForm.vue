<template>
  <div>
    form
    <pre>{{ form }}</pre>
    <InputAddValue
      class="tw-mb-6"
      additional="3"
      rules=""
      v-model="form.neiro_add_value"
    />
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
  import type { NeiroForm } from './model/types';
  import type { AssessSuccessRes } from 'src/repositories/neiro-estimates';
  import BaseButton from 'src/components/Base/Button2.vue';
  import BaseCheckbox from 'src/components/Base/Checkbox.vue';

  const props = defineProps<{
    form: NeiroForm,
    assessmentRes: AssessSuccessRes,
  }>();

  const emit = defineEmits<{
    (event: 'estimate'): void,
  }>();
</script>
