<template>
  <div class="s-inp">
    <label class="label-wrap">
      <div class="label">{{ label }}</div>
      <div class="body">
        <span class="icon-wrap">
          <BaseIcon name="mag-glass" fit />
        </span>
        <input class="inp" type="text" v-model="value" />
      </div>
    </label>
    <div class="caption" v-if="caption">{{ caption }}</div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string,
    caption?: string,
  }>();

  const value = defineModel<string>({ required: true });
</script>

<style scoped lang="scss">
  .label {
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 10px;
    @apply tw-text-black;
  }

  .body {
    display: flex;
    gap: 12px;
    padding: 10px 24px;
    border-radius: 100px;
    background: #F6F6F6;
  }

  .inp {
    flex-grow: 1;
    height: 24px;
    background: none;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.3;
  }

  .icon-wrap {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  .caption {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.3;
    color: #A4A4A4;
  }
</style>
