<template>
  <div class="input-code-block tw-flex tw-gap-4">
    <input
      v-for="(input, index) in inputsLenght"
      :key="index"
      ref="inputEl"
      class="input-code"
      required="true"
      type="tel"
      inputmode="numeric"
      placeholder="1"
      @input="onInput"
      @focus="inputFocus"
      @keydown.delete="test($event, index)" />

    <input v-model="codeValue" type="number" hidden name="code" />
  </div>
</template>
<script setup lang="ts">
import { useField } from "vee-validate";
import { defineProps, onMounted, ref, toRefs, watch } from "vue";
const KEYCODES = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};
const props = withDefaults(
  defineProps<{
    inputsLenght?: string | number;
  }>(),
  {
    inputsLenght: 4,
  }
);
const { inputsLenght } = toRefs(props);
const emit = defineEmits<{
  (e: "filled", value: string): void;
}>();
const inputEl = ref<HTMLInputElement[]>([]);
const arrValue = ref(Array(3));
const onInput = (e) => {
  let value = e.target.value.replace(/[^\d]/gi, "").substring(0, 1);
  e.target.value = value;
  inputEl.value.forEach((inp, index) => {
    if (value && inp === e.target && inputEl.value.length > index + 1) {
      const nextEl = inputEl.value[index + 1];
      // console.log(index);
      codeValue.value = value;
      if (inputEl.value[index + 1].value === "") nextEl.focus();
    }
    if (inp === e.target && inputEl.value.length >= index + 1) {
      arrValue.value.splice(index, 1, value);
    }
  });
};
const test = (e, index) => {
  if (e.target.value.length > 0) {
    e.target.value = "";
  } else if (inputEl.value[index - 1]) {
    const prevInput = inputEl.value[index - 1];
    e.target.value = "";
    prevInput.focus();
    console.log(e.target.value);
  }
};
const inputFocus = (e) => {
  // console.log(e.target);
  if (e.target.value) {
    e.target.value = "";
    onInput(e);
  }
};

onMounted(() => {});
watch(arrValue.value, (val, old) => {
  const arrToString = arrValue.value.join("");
  if (arrToString.length === props.inputsLenght) {
    codeValue.value = arrToString;
    emit("filled", codeValue.value);
  }
});

const {
  errorMessage,
  value: codeValue,
  meta,
} = useField<string>("kod", `required|min:${inputsLenght.value}`, {
  validateOnValueUpdate: false,
});
</script>
<style lang="scss" scoped>
//$
.input-code {
  /*tw-border-negative tw-border*/
  @apply tw-bg-[#F0F0F0]  tw-border tw-border-[#6B6B6B] tw-rounded-10 tw-text-h1   tw-font-medium tw-text-center tw-w-14 tw-h-14 focus:tw-border-negative;
  @apply focus:tw-outline-none focus:tw-border-card-descr valid:tw-border-card-descr;
  font-size: 24px;
  line-height: 31.2px;
  // &-block {
  //   filter: drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.25));
  // }
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  display: none;
}
input:not(:placeholder-shown) {
  /*tw-border-blue*/
  @apply tw-outline-none;
}
input::placeholder {
  opacity: 0;
}
</style>
