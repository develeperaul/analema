<template>
  <div @click="showed = true">
    Все категории {{ category }}
  </div>
  <BaseModal v-model="showed" yPos="bottom" animation="slide-right">
    <div class="card">
      <div class="tw-text-right tw-mb-4">
        <ButtonClose @click="showed = false" />
      </div>
      <BaseRadio
        v-for="section in sections"
        name="category"
        :label="section.name"
        :checkedValue="section.id"
        v-model="category"
      />
      <BaseButton class="tw-mt-8" type="button" text="Применить" @click="showed = false" />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from 'src/components/Base/Modal.vue';
  import BaseRadio from 'src/components/Base/Radio.vue';
  import ButtonClose from 'src/components/Base/ButtonClose.vue';
  import type { Section } from 'src/repositories/catalog';

  defineProps<{
    sections: Section[]
  }>();

  const showed = ref(false);

  const category = defineModel('category', {
    default: '',
  });
</script>

<style scoped lang="scss">
  .card {
    padding: 20px;
    padding-bottom: 30px;
    border-radius: 20px 20px 0 0;
    @apply tw-bg-white tw-w-full;
  }
</style>
