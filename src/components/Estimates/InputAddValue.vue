<template>
  <BaseInput
    v-if="additional === '1'"
    label="Вес изделия"
    name="neiro_add_value"
    v-model="value"
    :rules="rules"
  />
  <BaseInput
    v-else-if="additional === '2'"
    label="Длина изделия"
    name="neiro_add_value"
    v-model="value"
    :rules="rules"
  />
  <div v-else-if="additional === '3'">
    <div class="h2 tw-mb-3">Полный комплект</div>
    <BaseRadio
      name="neiro_add_value"
      label="Да"
      checkedValue="Да"
      v-model="value"
      :rules="rules"
    />
    <BaseRadio
      class="tw-mt-1"
      name="neiro_add_value"
      label="Нет"
      checkedValue="Нет"
      v-model="value"
      :rules="rules"
    />
    <div v-if="error" class="tw-text-negative tw-text-sm tw-mt-1">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
  import BaseRadio from 'src/components/Base/Radio.vue';
  import { RuleExpression } from 'vee-validate';

  defineProps<{
    additional: string,
    rules: RuleExpression<any>,
    error?: string,
  }>();

  const value = defineModel({ default: '' });
</script>
