<template>
  <div>
    <div class="tw-mb-6 tw-text-t1 tw-text-black">{{ path }}</div>
    <PhotoUploader
      class="tw-mb-8"
      label="Фотографии товара"
      caption="Сделайте фото товара с разных ракурсов"
      v-model:uploaded-files="form.files"
      :error="filesError"
    />
    <InputAddValue
      class="tw-mb-6"
      v-if="activeCategory && activeCategory.additional"
      :additional="activeCategory.additional"
      :rules="createEstimateSchema.neiro_add_value"
      v-model="form.neiro_add_value"
      :error="errors.neiro_add_value"
    />
    <BaseTextarea
      class="tw-mb-6"
      name="desc"
      label="Описание"
      placeholder="Напишите наименование и модель товара,  характеристики и состояние"
      :rules="createEstimateSchema.desc"
      v-model="form.desc"
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
    <template v-if="!authStore.user">
      <p class="h2 tw-mb-3">Укажите ваш номер телефона</p>
      <BaseInput
        class="tw-mb-6"
        label="Номер телефона"
        name="phone"
        type="tel"
        maska="+7 (###)-###-##-##"
        placeholder="+7 (000)-000-00-00"
        :rules="createEstimateSchema.phone"
        v-model="form.phone"
      />
    </template>
    <BaseButton class="tw-mt-8" type="submit">
      Оценить
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { SectionItem } from 'src/repositories/neiro-catalog';
  import { ActiveProduct } from './types';
  import BaseTextarea from 'src/components/Base/Textarea.vue';
  import BaseButton from 'src/components/Base/Button2.vue';
  import BaseCheckbox from 'src/components/Base/Checkbox.vue';
  import InputAddValue from 'src/components/Estimates/InputAddValue.vue';
  import type { UploadedSuccess } from 'src/repositories/files';
  import { createEstimateSchema } from 'src/schemas/estimates';
  import { useAuthStore } from 'src/stores/auth';

  const props = defineProps<{
    activeCategory: SectionItem,
    activeProduct: ActiveProduct,
    form: {
      desc: string,
      files: UploadedSuccess[],
      recall: string,
      rewhatsapp: string,
      neiro_add_value: string,
      phone: string,
    },
    filesError: string,
    errors: Record<string, string | undefined>,
  }>();

  const authStore = useAuthStore();

  const path = computed(() => {
    const str = props.activeProduct.type === 'base' ?
      `${props.activeProduct.section_name} - ${props.activeProduct.name}` :
      props.activeProduct.section_name;
    return `${props.activeCategory.name} - ${str}`
  });
</script>
