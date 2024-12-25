<template>
  <router-link
    v-if="to"
    :to="to"
    class="btn"
    :class="{ btn__border: border }"
    >{{ text }}</router-link
  >
  <button v-else class="btn" :class="{ btn__border: border }">
    {{ text }}
  </button>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    border?: boolean
    to?: string | { name: string }
  }>(),
  {
    border: false,
  }
)
</script>
<style lang="scss" scoped>
.btn {
  @apply tw-text-t1 tw-text-white tw-flex tw-justify-center tw-items-center;
  background-color: #181818;
  border-radius: 16px;
  width: 100%;
  height: 46px;
  &:disabled {
    background-color: #cdcdcd;
  }
  &__border {
    background-color: #fff;
    color: #252525;
    border: 1px solid #181818;
  }
}
</style>
