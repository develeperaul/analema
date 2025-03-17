<template>
  <div>
    <div class="h2 tw-mb-3">{{ label }}</div>
    <div class="area" :class="{ 'area--overflow': isOverflow && !showed }" ref="areaRef">
      <div class="items">
        <BaseRadio
          class="tw-mb-3"
          v-for="section in sections"
          :key="section.id"
          :name="name"
          :label="section.name"
          :checkedValue="section.id"
          :rules="rules"
          v-model="value"
        />
      </div>
      <div v-if="!showed && isOverflow" class="shadow-line"></div>
    </div>
    <button
      v-if="isOverflow"
      type="button"
      class="action"
      @click="showed = !showed"
    >
      {{ showed ? 'Скрыть' : 'Показать еще' }}
    </button>
    <div v-if="error" class="tw-text-negative tw-text-t1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends { id: string, name: string }">
  import BaseRadio from 'src/components/Base/Radio.vue';
  import type { RuleExpression } from 'vee-validate';

  defineProps<{
    label: string,
    name: string,
    sections: T[],
    rules: RuleExpression<string>,
    error?: string,
  }>();

  const value = defineModel<string>({
    default: '',
  });

  const areaRef = ref<HTMLElement | null>(null);

  const showed = ref(false);

  const isOverflow = ref(false);

  function checkOverflow() {
    if(areaRef.value) {
      isOverflow.value = areaRef.value.offsetHeight > 250;
    }
  }

  onMounted(() => {
    checkOverflow();
  });
</script>

<style scoped lang="scss">
  .area {
    position: relative;

    &--overflow {
      height: 250px;
      overflow: hidden;
    }
  }

  .action {
    @apply tw-text-blue tw-text-t2 tw-mt-1;
  }

  .shadow-line {
    @apply tw-shadow-blur tw-bg-white tw-h-4 tw-w-full tw-absolute tw-bottom-0 tw-left-0;
  }
</style>
