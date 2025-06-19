<template>
  <div class="field">
    <div class="input__wrapper" :class="{ error: errorMessage }">
      <input
        v-model="value"
        v-maska:option
        :data-maska="maska"
        :type="type"
        class="input"
        :placeholder="placeholder"
        :disabled="disabled"
        @change="$emit('change', value)"
      />
      <label class="tw-font-medium tw-text-t1" v-if="label">
        {{ label }}
      </label>
      <svg
        v-if="!hideStatus && meta.dirty && meta.valid"
        class="tw-absolute tw-right-5 tw-top-1/2 tw-transform -tw-translate-y-1/2"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.99999 1.66406C8.35182 1.66406 6.74065 2.1528 5.37024 3.06848C3.99983 3.98416 2.93173 5.28565 2.301 6.80837C1.67027 8.33108 1.50524 10.0066 1.82678 11.6231C2.14833 13.2397 2.942 14.7245 4.10744 15.89C5.27287 17.0554 6.75773 17.8491 8.37424 18.1706C9.99075 18.4922 11.6663 18.3271 13.189 17.6964C14.7117 17.0657 16.0132 15.9976 16.9289 14.6271C17.8446 13.2567 18.3333 11.6456 18.3333 9.9974C18.3333 8.90305 18.1178 7.81941 17.699 6.80837C17.2802 5.79732 16.6664 4.87866 15.8925 4.10484C15.1187 3.33102 14.2001 2.71719 13.189 2.2984C12.178 1.87961 11.0943 1.66406 9.99999 1.66406ZM14.73 8.52823L9.72999 13.1116C9.57169 13.2567 9.36345 13.3351 9.14872 13.3305C8.93399 13.3258 8.72935 13.2384 8.57749 13.0866L6.07749 10.5866C5.9979 10.5097 5.93442 10.4177 5.89074 10.3161C5.84707 10.2144 5.82408 10.105 5.82312 9.9944C5.82216 9.88375 5.84324 9.77401 5.88514 9.6716C5.92704 9.56919 5.98892 9.47614 6.06716 9.3979C6.14541 9.31966 6.23845 9.25778 6.34087 9.21588C6.44328 9.17398 6.55301 9.15289 6.66366 9.15385C6.77431 9.15482 6.88366 9.1778 6.98533 9.22148C7.087 9.26515 7.17895 9.32864 7.25583 9.40823L9.19166 11.3441L13.6033 7.2999C13.7662 7.15049 13.9818 7.07191 14.2026 7.08144C14.4234 7.09098 14.6314 7.18784 14.7808 7.35073C14.9302 7.51362 15.0088 7.72918 14.9993 7.95001C14.9897 8.17083 14.8929 8.37882 14.73 8.52823Z"
          fill="#219653" />
      </svg>

      <svg
        v-if="errorMessage"
        class="tw-absolute tw-right-5 tw-top-1/2 tw-transform -tw-translate-y-1/2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_350_643)">
          <path
            d="M12 3C7.0372 3 3 7.0372 3 12C3 16.9628 7.0372 21 12 21C16.9628 21 21 16.9628 21 12C21 7.0372 16.9628 3 12 3Z"
            fill="#F44336" />
          <path
            d="M15.3143 14.2537C15.6075 14.5471 15.6075 15.021 15.3143 15.3143C15.1681 15.4606 14.9761 15.534 14.784 15.534C14.592 15.534 14.4 15.4606 14.2537 15.3143L12 13.0605L9.74631 15.3143C9.60006 15.4606 9.40807 15.534 9.21608 15.534C9.02396 15.534 8.83197 15.4606 8.68572 15.3143C8.39252 15.021 8.39252 14.5471 8.68572 14.2537L10.9396 12L8.68572 9.74631C8.39252 9.45298 8.39252 8.97905 8.68572 8.68572C8.97905 8.39252 9.45298 8.39252 9.74631 8.68572L12 10.9396L14.2537 8.68572C14.5471 8.39252 15.021 8.39252 15.3143 8.68572C15.6075 8.97905 15.6075 9.45298 15.3143 9.74631L13.0605 12L15.3143 14.2537Z"
            fill="#FAFAFA" />
        </g>
        <defs>
          <clipPath id="clip0_350_643">
            <rect
              width="18"
              height="18"
              fill="white"
              transform="translate(3 3)" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <div v-if="errorMessage" class="tw-text-t2 tw-text-negative tw-mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useField, type RuleExpression } from "vee-validate";
import { Mask } from "maska";

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: string;
    maska?: string;
    name: string;
    rules?: RuleExpression<string | number>;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    unMask?: boolean;
    hideStatus?: boolean
  }>(),
  {
    type: "text",
    disabled: false,
    unMask: false,
    placeholder: "",
    hideStatus: false,
  }
);
const mask = new Mask({ mask: props.maska });

const emitsInput = defineEmits<{
  (e: "update:modelValue", val: string | number): void;
  (e: "change", val: string | number): void;
}>();
const { name, rules, modelValue } = toRefs(props);
const { errorMessage, value, meta } = useField(name, rules, {
  validateOnValueUpdate: false,
  initialValue: modelValue,
});
watch(value, (val) => {
  if (props.unMask) emitsInput("update:modelValue", mask.unmasked(val.toString()));
  else emitsInput("update:modelValue", val);
});
</script>
<style lang="scss" scoped>
.field {
  @apply tw-grid;
  label {
    @apply tw-absolute  tw-text-t1 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-left-5;
    pointer-events: none;
    transition: all 0.3s;
    color: #a1a1a1;
  }
  input {
    @apply tw-rounded-20 tw-bg-[#F6F6F6] tw-text-t1 tw-px-5 tw-pt-5 tw-w-full tw-outline-none tw-pr-10;
    height: 56px;
  }
  input::placeholder {
    @apply tw-text-t1 tw-text-gray tw-opacity-0;
  }
  .input__wrapper {
    @apply tw-relative;
    input:focus + label,
    input:not(:placeholder-shown) + label {
      font-size: 11px;
      line-height: 14.3px;
      top: 14px;
      color: #a1a1a1;
    }
    &.error input {
      @apply tw-border-negative tw-border;
    }
  }
}
</style>
