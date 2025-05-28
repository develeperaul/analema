<template>
  <div class="select-ctrl" v-bind="$attrs" @click="showed = true">
    <span class="tw-grow">
      {{
        value === '1' ? 'Дешевле' :
        value === '2' ? 'Дороже' : 'Сортировка'
      }}
    </span>
    <span class="select-ctrl__icon-wrap" :class="{ 'select-ctrl__icon-wrap--showed': showed }">
      <BaseIcon fit name="down" />
    </span>
  </div>
  <BaseModal v-model="showed" yPos="bottom" animation="slide-right">
    <div class="card">
      <div class="tw-text-right tw-mb-4">
        <ButtonClose @click="showed = false" />
      </div>
      <div class="area">
        <div class="tw-space-y-3">
          <BaseRadio
            key="any"
            name="sort"
            label="Любая сортировка"
            checkedValue=""
            :modelValue="innerValue !== undefined ? innerValue : ''"
            @update:modelValue="innerValue = undefined"
          />
          <BaseRadio
            name="sort"
            label="Дешевле"
            checkedValue="1"
            v-model="innerValue"
          />
          <BaseRadio
            name="sort"
            label="Дороже"
            checkedValue="2"
            v-model="innerValue"
          />
        </div>
      </div>
      <BaseButton class="tw-mt-8" type="button" text="Применить" @click="apply" />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from 'src/components/Base/Modal.vue';
  import BaseRadio from 'src/components/Base/Radio.vue';
  import ButtonClose from 'src/components/Base/ButtonClose.vue';

  type Value = '1' | '2';

  const value = defineModel<Value>();
  const showed = ref(false);
  const innerValue = ref<Value | undefined>(value.value);

  function apply() {
    value.value = innerValue.value;
    showed.value = false;
  }
</script>

<style scoped lang="scss">
  .select-ctrl {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    padding: 12px;
    padding-left: 20px;
    @apply tw-bg-card tw-text-t1 tw-text-base tw-cursor-pointer;

    &__icon-wrap {
      width: 24px;
      height: 24px;
      transition: transform 300ms;

      &--showed {
        transform: rotate(180deg);
      }
    }
  }

  .card {
    max-width: 600px;
    padding: 20px;
    padding-bottom: 30px;
    border-radius: 20px 20px 0 0;
    @apply tw-bg-white tw-w-full;
  }

  .area {
    max-height: 400px;
    overflow-x: hidden;
  }
</style>
