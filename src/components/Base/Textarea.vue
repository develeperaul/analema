<template>
  <div>
    <label class="h2 tw-block tw-w-full tw-mb-3">{{ label }}</label>
    <textarea class="inp" v-model="value" :placeholder="placeholder"></textarea>
    <div class="tw-text-negative tw-text-t2 tw-mt-1" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
  import { RuleExpression, useField } from 'vee-validate';

  const props = defineProps<{
    name: string,
    rules?: RuleExpression<string>,
    label: string,
    modelValue?: string,
    placeholder?: string,
  }>();

  const { value, errorMessage } = useField(props.name, props.rules, {
    syncVModel: true,
  });
</script>

<style scoped lang="scss">
  .inp {
    border: 1px solid #CECEE0;
    border-radius: 15px;
    display: block;
    width: 100%;
    min-height: 100px;
    resize: none;
    padding: 16px;
  }
</style>
