<template>
  <div>
    <div class="select" v-bind="$attrs" @click="showed = true">
      <span class="select__label">{{ displayLabel }}</span>
      <span class="select__icon-wrap" :class="{ 'select__icon-wrap--up': showed }">
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.9375 0.75C8.9375 0.932447 8.86534 1.1083 8.73633 1.2373L4.98633 4.9873C4.92249 5.0512 4.84614 5.10115 4.7627 5.13574C4.67936 5.17028 4.5902 5.18842 4.5 5.18848C4.40965 5.18848 4.31979 5.17034 4.23633 5.13574C4.15291 5.10115 4.07652 5.0512 4.0127 4.9873L0.262695 1.2373C0.198837 1.17345 0.148828 1.0971 0.114258 1.01367C0.0796865 0.930209 0.0615234 0.840338 0.0615234 0.75C0.061578 0.659818 0.0797508 0.570627 0.114258 0.487304C0.148816 0.403873 0.19885 0.327535 0.262695 0.263671C0.326541 0.199826 0.402918 0.149804 0.486328 0.115234C0.569789 0.0806631 0.659661 0.0624996 0.75 0.0624996C0.840197 0.0625543 0.929362 0.0807162 1.0127 0.115234C1.09615 0.149805 1.17245 0.199795 1.23633 0.263672L4.45508 3.48437L4.5 3.52832L4.54395 3.48437L7.7627 0.263672C7.8917 0.134662 8.06755 0.0625 8.25 0.0625C8.4323 0.0626103 8.60742 0.134761 8.73633 0.263672C8.86524 0.392583 8.93739 0.567703 8.9375 0.75Z" fill="#B4B4B4" stroke="#98A2B3" stroke-width="0.125"/>
        </svg>
      </span>
    </div>
  </div>
  <Modal
    yPos="bottom"
    animation="slide-right"
    v-model="showed"
  >
    <div class="card">
      <div class="tw-text-right tw-mb-4">
        <ButtonClose @click="showed = false" />
      </div>
      <div class="card-label">{{ label }}</div>
      <div
        class="option"
        v-for="option in options"
        :class="{ 'option--active': isActive(option) }"
        @click="onChange(option)"
      >
        {{ optionLabel(option) }}
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  const props = defineProps<{
    label: string,
    options: any[],
    labelKey?: string,
    valueKey?: string,
  }>();

  const value = defineModel<any>();

  defineOptions({
    inheritAttrs: false,
  });

  const showed = ref(false);

  function onChange(option: string) {
    if(typeof option === 'string' || typeof option === 'number') {
      value.value = option;
    } else {
      if(props.valueKey && props.valueKey in option) {
        value.value = option[props.valueKey];
      } else {
        value.value = option;
      }
    }
    showed.value = false;
  }

  const displayLabel = computed(() => {
    if(!value.value) return props.label;
    if(typeof value.value === 'string' || typeof value.value === 'number') {
      return value.value;
    } else if(props.labelKey && props.labelKey in value.value) {
      return value.value[props.labelKey];
    }
    return props.label;
  });

  const optionLabel = (option: any) => {
    if(typeof option === 'string' || typeof option === 'number') {
      return option;
    } else if(props.labelKey && props.labelKey in option) {
      return option[props.labelKey];
    }
    return option;
  };

  const isActive = (option: any) => {
    if(typeof option === 'string' || typeof option === 'number') {
      return value.value === option;
    } else if(props.valueKey && props.valueKey in option) {
      return option[props.valueKey] === value.value;
    } else if(
      typeof value.value === 'object'
      && props.labelKey && props.labelKey in option
      && props.labelKey in value.value
    ) {
      return option[props.labelKey] === value.value[props.labelKey];
    }
    return value.value === option;
  };
</script>

<style scoped lang="scss">
  .card {
    width: 100%;
    border-radius: 20px 20px 0 0px;
    padding: 20px 16px;
    @apply tw-bg-white;
  }

  .option {
    padding: 12px 0;
    text-align: center;
    font-size: 16px;
    line-height: 22px;
    color: #181818;
    border-top: 1px solid #D7D7D7;

    &--active {
      color: #B4B4B4;
    }
  }

  .select {
    padding: 12px 20px;
    border-radius: 5px;
    border: 1px solid #D7D7D7;
    display: flex;
    align-items: center;
    gap: 10px;

    &__label {
      flex-grow: 1;
      font-size: 14px;
      line-height: 22px;
      color: #181818;
    }

    &__icon-wrap {
      &--up {
        rotate: 180deg;
      }
    }
  }

  .card-label {
    padding: 16px 0;
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
    color: #B4B4B4;
  }
</style>
