<template>
  <div class="tw-grid">
    <div
      class="tw-inline-flex tw-gap-1.5 tw-whitespace-nowrap tw-overflow-auto"
    >
      <tab-item
        v-for="item in options"
        @click="() => $emit('update:modelValue', item.name)"
        :class="{ active: item.name === modelValue }"
      >
        <span>
          {{ item.label }}
        </span>
      </tab-item>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: 'tab-head',
})
</script>
<script setup lang="ts">
interface Option {
  name: string | number
  label: string
}
const props = defineProps<{
  modelValue: string | number
  options: Option[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', val: Option): void
}>()
</script>
<style lang="scss" scoped></style>
