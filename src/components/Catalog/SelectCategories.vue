<template>
  <div class="select-ctrl" @click="showed = true">
    <span class="tw-grow">
      {{ activeSection ? activeSection.name : 'Все категории' }}
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
            v-for="section in sections"
            name="category"
            :label="section.name"
            :checkedValue="section.id"
            v-model="innerCategory"
          />
        </div>
      </div>
      <BaseButton class="tw-mt-8" type="button" text="Применить" @click="onChange" />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from 'src/components/Base/Modal.vue';
  import BaseRadio from 'src/components/Base/Radio.vue';
  import ButtonClose from 'src/components/Base/ButtonClose.vue';
  import type { Section } from 'src/repositories/catalog';

  interface Props {
    category?: string,
    sections: Section[],
  }

  const props = withDefaults(
    defineProps<Props>(),
    {
      category: '',
    }
  );

  const emit = defineEmits<{
    (event: 'change:category', category: string): void,
  }>();

  const showed = ref(false);

  const innerCategory = ref(props.category);

  const activeSection = computed(() => {
    return props.sections.find((section) => section.id === props.category) ?? null;
  });

  function onChange() {
    emit('change:category', innerCategory.value);
    showed.value = false;
  }

  watch(() => props.category, (value) => {
    if(innerCategory.value !== value) {
      innerCategory.value = value;
    }
  });
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
