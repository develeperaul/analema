<template>
  <div>
    <div class="radio" @click="onChange">
      <span
        class="icon-wrap"
        :class="{
          'icon-wrap--checked': checked,
          'icon-wrap--unchecked': !checked,
        }"
      >
        <BaseIcon :name="checked ? 'checked' : 'unchecked'" fit />
      </span>
      <span class="label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    label: string,
    val: string,
  }>();

  const value = defineModel<string>({ required: true });

  const checked = computed(() => {
    return props.val === value.value;
  });

  function onChange() {
    value.value = props.val;
  }
</script>

<style scoped lang="scss">
  .radio {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .label {
    @apply tw-text-t1;
  }

  .icon-wrap {
    width: 24px;
    height: 24px;
    flex-shrink: 0;

    &--checked {
      color: #181818;
    }

    &--unchecked {
      color: #CECEE0;
    }
  }
</style>
