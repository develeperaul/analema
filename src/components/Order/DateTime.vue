<template>
    <div>
      <p class="tw-mb-3 tw-text-t1 tw-font-bold tw-text-base">Дата и время</p>
      <div class="tw-flex tw-gap-4">
        <div class="field tw-w-full">
          <span class="field__label">{{ date ? date : 'Дата' }}</span>
          <span class="field__icon-wrap">
            <BaseIcon name="trg-down" fit />
          </span>
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="dateField.value.value" color="accent" mask="DD.MM.YYYY" :options="dateOpts">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Закрыть" color="accent" flat />
                </div>
              </q-date>
            </q-popup-proxy>
        </div>
        <div class="field tw-w-full">
          <span class="field__label">{{ time ? time : 'Время' }}</span>
          <span class="field__icon-wrap">
            <BaseIcon name="trg-down" fit />
          </span>
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time
              v-model="timeField.value.value"
              color="accent"
              mask="HH:mm"
              format24h
              :hour-options="hourOpts"
              :minute-options="minuteOpts"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Закрыть" color="accent" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </div>
      </div>
      <div v-if="dateField.errorMessage.value" class="tw-text-negative tw-text-t2 tw-mt-1">
        {{ dateField.errorMessage.value }}
      </div>
      <div v-if="timeField.errorMessage.value" class="tw-text-negative tw-text-t2 tw-mt-1">
        {{ timeField.errorMessage.value }}
      </div>
    </div>
</template>

<script setup lang="ts">
  import { type RuleExpression, useField } from 'vee-validate';

  const props = defineProps<{
    schema: {
      date: RuleExpression<string>,
      time: RuleExpression<string>,
    },
    date?: string,
    time?: string,
  }>();

  defineEmits<{
    (event: 'update:date', value: string): void,
    (event: 'update:time', value: string): void,
  }>();

  const hourOpts = [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ];
  const minuteOpts = [ 0, 30 ];

  const dateOpts = computed(() => {
    const cur = new Date();
    const today = cur.toISOString().split('T')[0].replaceAll('-', '/');
    cur.setDate(cur.getDate() + 3);
    const endDate = cur.toISOString().split('T')[0].replaceAll('-', '/');

    return (dt: string) => {
      return dt >= today && dt <= endDate;
    };
  });

  const dateField = useField('date', props.schema.date, {
    syncVModel: 'date',
  });

  const timeField = useField('time', props.schema.time, {
    syncVModel: 'time',
  });
</script>

<style scoped lang="scss">
  .field {
    padding: 16px 20px;
    padding-right: 10px;
    color: #A1A1A1;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 16px;
    @apply tw-rounded-20 tw-bg-card tw-text-t2;

    &__label {
      flex-grow: 1;
    }

    &__icon-wrap {
      width: 24px;
      height: 24px;
    }
  }
</style>
