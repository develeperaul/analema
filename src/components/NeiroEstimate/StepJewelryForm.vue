<template>
  <div>
    <RobotMessage class="tw-mb-8">
      Чтобы оценить Ваше украшение, мне нужна дополнительная информация
    </RobotMessage>
    <Image
      class="tw-rounded-20 tw-overflow-hidden tw-w-[100px] tw-mb-6"
      width="150"
      height="150"
      :src="form.uploadedFiles[0].url"
    />
    <div class="h2 tw-mb-3">Выберите металл</div>
    <div class="tw-space-y-2 tw-mb-6">
      <BaseSelect
        name="neiro_add_metall"
        label="Металл"
        :options="[
          ...metalTypes, unknownMetal,
        ]"
        v-model="form.neiro_add_metall"
        :rules="schema.neiro_add_metall"
      />
    </div>
    <template v-if="form.neiro_add_metall === metalTypes[0]">
      <div class="h2 tw-mb-3">Выберите пробу</div>
      <div class="tw-space-y-2 tw-mb-6">
        <BaseSelect
          name="neiro_add_proba"
          label="Проба"
          :options="goldProbs"
          v-model="form.neiro_add_proba"
          :rules="schema.neiro_add_proba"
        />
      </div>
    </template>
    <template v-if="form.neiro_add_metall !== unknownMetal">
      <div class="h2 tw-mb-3">Введите вес изделия</div>
      <BaseInput
        class="tw-mb-6"
        label="Вес в граммах"
        name="neiro_add_value"
        v-model="form.neiro_add_value"
        :rules="schema.neiro_add_value"
      />
    </template>
    <template v-if="form.neiro_add_metall === metalTypes[0]">
      <div class="h2 tw-mb-3">Есть бриллианты</div>
      <div class="tw-flex tw-gap-8">
        <BaseRadio
          name="neiro_add_brilliant"
          label="Да"
          checkedValue="1"
          v-model="form.neiro_add_brilliant"
          :rules="schema.neiro_add_brilliant"
        />
        <BaseRadio
          name="neiro_add_brilliant"
          label="Нет"
          checkedValue="0"
          v-model="form.neiro_add_brilliant"
          :rules="schema.neiro_add_brilliant"
        />
      </div>
      <div v-if="brilErr" class="tw-text-t2 tw-text-negative tw-mt-1">{{ brilErr }}</div>
    </template>
    <div class="tw-mt-6">
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
    <BaseInput
      v-if="!authStore.user"
      class="tw-mt-6"
      label="Номер телефона"
      name="phone"
      type="tel"
      maska="+7 (###)-###-##-##"
      placeholder="+7 (000)-000-00-00"
      v-model="form.phone"
      :rules="schema.phone"
    />
    <BaseButton class="tw-mt-8" :disabled="loading" @click="emit('estimate')">
      Оценить
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from 'src/components/Base/Button2.vue';
  import RobotMessage from './RobotMessage.vue';
  import BaseCheckbox from 'src/components/Base/Checkbox.vue';
  import BaseRadio from 'src/components/Base/Radio.vue';
  import BaseSelect from 'src/components/Base/Select.vue';
  import { useAuthStore } from 'src/stores/auth';
  import { metalTypes, goldProbs, unknownMetal } from './model/contants';
  import type { NeiroForm } from './model/types';
  import { schema } from './model/schema';
  import { useFieldError } from 'vee-validate';

  const props = defineProps<{
    form: NeiroForm,
    loading: boolean,
  }>();

  const emit = defineEmits<{
    (event: 'estimate'): void,
  }>();

  const authStore = useAuthStore();

  const brilErr = useFieldError('neiro_add_brilliant');
</script>
