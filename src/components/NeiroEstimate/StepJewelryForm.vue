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
      <BaseRadio
        v-for="proba in [ ...metalTypes, unknownMetal ]"
        name="neiro_add_metall"
        :label="proba"
        :checkedValue="proba"
        v-model="form.neiro_add_metall"
      />
    </div>
    <template v-if="form.neiro_add_metall === metalTypes[0]">
      <div class="h2 tw-mb-3">Выберите пробу</div>
      <div class="tw-space-y-2 tw-mb-6">
        <BaseRadio
          v-for="proba in goldProbs"
          name="neiro_add_proba"
          :label="proba"
          :checkedValue="proba"
          v-model="form.neiro_add_proba"
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
      />
    </template>
    <template v-if="form.neiro_add_metall === metalTypes[0]">
      <div class="h2 tw-mb-3">Есть бриллианты</div>
      <div class="tw-flex tw-gap-8 tw-mb-6">
        <BaseRadio
          name="neiro_add_brilliant"
          label="Да"
          checkedValue="1"
          v-model="form.neiro_add_brilliant"
        />
        <BaseRadio
          name="neiro_add_brilliant"
          label="Нет"
          checkedValue="0"
          v-model="form.neiro_add_brilliant"
        />
      </div>
    </template>
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
  import BaseRadio from 'src/components/Base/Radio.vue';
  import { metalTypes, goldProbs, unknownMetal } from './model/contants';
  import type { NeiroForm } from './model/types';

  const props = defineProps<{
    form: NeiroForm,
  }>();

  const emit = defineEmits<{
    (event: 'estimate'): void,
  }>();
</script>
