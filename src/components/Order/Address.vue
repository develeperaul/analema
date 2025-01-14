<template>
  <div>
    <p class="tw-mb-3 tw-text-t1 tw-font-bold tw-text-base">Адрес</p>
    <BaseInput
      class="tw-w-full tw-mb-3"
      name="addr.address"
      label="Адрес и номер дома"
      :rules="schema.address"
      v-model="values.address"
      @change="onChangeAddress"
    />
    <div class="tw-flex tw-items-start tw-gap-4">
      <BaseInput
        class="tw-w-full"
        name="addr.flat"
        label="Квартира"
        :rules="schema.flat"
        v-model="values.flat"
        @change="onChangeAddress"
      />
      <BaseInput
        class="tw-w-full"
        name="addr.entrance"
        label="Подъезд"
        :rules="schema.entrance"
        v-model="values.entrance"
        @change="onChangeAddress"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { RuleExpression } from 'vee-validate';

  const props = defineProps<{
    schema: {
      address: RuleExpression<string>,
      flat: RuleExpression<string>,
      entrance: RuleExpression<string>,
    },
    values: {
      address: string,
      flat: string,
      entrance: string,
    },
  }>();

  const emit = defineEmits<{
    (event: 'change:fullAddress', value: string): void,
  }>();

  function onChangeAddress() {
    emit(
      'change:fullAddress',
      `${props.values.address}, кв. ${props.values.flat}${props.values.entrance ? `, п. ${props.values.entrance}` : '' }`
    );
  }
</script>
