<template>
  <div>
    <div class="radio" @click="handleChange">
      <span
        class="icon-wrap"
        :class="{
          'icon-wrap--checked': checked,
          'icon-wrap--unchecked': !checked,
        }"
      >
        <BaseIcon :name="checked ? 'checked' : 'unchecked'" fit />
      </span>
      <span class="label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useField, type RuleExpression } from 'vee-validate';

  const props = defineProps<{
    label: string,
    name: string,
    rules?: RuleExpression<string>,
    checkedValue: string,
    modelValue?: string,
  }>();

  defineEmits<{
    (event: 'update:modelValue', value: string): void,
  }>();

  const { checked, handleChange } = useField(props.name, props.rules, {
    type: 'radio',
    checkedValue: props.checkedValue,
    syncVModel: true,
  });
</script>

<style scoped lang="scss">
  .radio {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .label {
    @apply tw-text-t1;
  }

  .icon-wrap {
    width: 24px;
    height: 24px;
    flex-shrink: 0;

    &--checked {
      color: #181818;
    }

    &--unchecked {
      color: #CECEE0;
    }
  }
</style>
