<template>
  <div class="checkbox" @click="onChange">
    <span
      class="icon-wrap"
      :class="[ value === checkedValue ? 'icon-checked' : 'icon-unchecked' ]"
    >
    </span>
    <span class="label">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    checkedValue: string,
    uncheckedValue: string,
    label: string,
  }>();

  const value = defineModel<string>({ required: true });

  function onChange() {
    value.value = props.checkedValue === value.value ? props.uncheckedValue : props.checkedValue;
  }
</script>

<style scoped lang="scss">
  .checkbox {
    display: flex;
    gap: 10px;
    user-select: none;
    cursor: pointer;
  }

  .label {
    @apply tw-text-t1 tw-text-black;
  }

  .icon-wrap {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  .icon-checked {
    background: url('src/assets/icons/checkbox-checked.svg');
    background-size: 100%;
  }

  .icon-unchecked {
    background: url('src/assets/icons/checkbox-unchecked.svg');
    background-size: 100%;
  }
</style>
