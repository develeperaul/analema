import useRequest from './useRequest';
import { watch, ref, computed } from 'vue';
import { AxiosError } from 'axios';
import { Notify } from 'quasar';

export type Pag<T> = [
  {
    total: number,
    items: T[],
  }
];

export type Paginator = {
  limit: number,
  offset: number,
};

export default function<T>(res: Awaited<ReturnType<typeof useRequest<Pag<T>, any>>>, paginator: Paginator) {
  const items = ref<T[] | null>(null);
  const total = ref(0);
  const loaded = ref(false);

  const isEnd = computed(() => {
    if(!items.value) return true;
    return paginator.offset + paginator.limit >= total.value;
  });

  watch(res.data, () => {
    if(!res.data.value) {
      items.value = null;
    } else {
      total.value = res.data.value[0].total;
      if(!loaded.value) {
        items.value = res.data.value[0].items;
        loaded.value = true;
      } else {
        items.value = [
          ...(items.value ?? []),
          ...res.data.value[0].items,
        ];
      }
    }
  }, {
    immediate: true,
  });

  function reset() {
    total.value = 0;
    loaded.value = false;
    paginator.offset = 0;
  }

  function next() {
    paginator.offset = Math.min(paginator.offset + paginator.limit, total.value);
    res.send();
  }

  return {
    reset,
    next,
    loaded,
    total,
    items,
    isEnd,
  }
}
