<template>
  <div class="base-toggle">
    <div class="base-toggle__toggle" @click="handleChange(checkedValue)">
      <label v-if="label" class="base-toggle__label">{{ label }}</label>
      <div class="base-toggle__input" :class="{ 'base-toggle__input--active': checked }">
        <div class="base-toggle__dot" :class="{ 'base-toggle__dot--active': checked }"></div>
      </div>
    </div>
    <div v-if="errorMessage" class="base-toggle__error-msg">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useField } from 'vee-validate';

  interface Props {
    name: string,
    rules?: string,
    label?: string,
    modelValue?: any,
    checkedValue?: any,
    uncheckedValue?: any,
  }

  const props = withDefaults(defineProps<Props>(), {
    checkedValue: true,
    uncheckedValue: false,
  });

  const { checked, handleChange, errorMessage } = useField(props.name, props.rules, {
    type: 'checkbox',
    syncVModel: true,
    checkedValue: props.checkedValue,
    uncheckedValue: props.uncheckedValue,
    label: props.label
  });
</script>
<style scoped lang="scss">
  .base-toggle {
    display: inline-block;

    &__toggle {
      display: flex;
      align-items: center;
      gap: 16px;
      user-select: none;
    }

    &__input {
      min-width: 52px;
      height: 32px;
      border-radius: 100px;
      border-width: 1px;
      border-style: solid;
      border-color: #E2E4E7;
      background-color: #E2E4E7;
      line-height: 30px;
      font-size: 0px;
      cursor: pointer;
      padding: 0 4px;

      &--active {
        background-color: #21DF37;
        border-color: #21DF37;
      }
    }

    &__dot {
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border-width: 2px;
      border-style: solid;
      border-color: theme('colors.white');
      background-color: theme('colors.white');
      transition: transform 300ms;

      &--active {
        background-color: theme('colors.white');
        border-color: theme('colors.white');
        transform: translateX(18px);
      }
    }

    &__label {
      @apply tw-leading-none tw-text-base tw-text-t1 tw-flex-grow;
    }

    &__error-msg {
      @apply tw-mt-2 tw-text-negative tw-text-t2 tw-font-normal;
    }
  }
</style>
