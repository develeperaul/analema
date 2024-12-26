import { ref } from 'vue';
import type { AxiosResponse } from 'axios';
import { type UnwrapRef, type WatchSource, watch } from 'vue';

export type Params = {
  immediate: boolean,
  watch: WatchSource[],
}

export default function<T, E>(fetchFn: (...args: any[]) => Promise<AxiosResponse<T>>, params: Partial<Params> = {}) {
  params = Object.assign({}, {
    immediate: true,
  }, params);

  const loading = ref(false);
  const data = ref<T | null>(null);
  const error = ref<E | null>(null);

  async function send() {
    try {
      loading.value = true;
      const res = await fetchFn();
      data.value = res.data as UnwrapRef<T>;
      return res;
    } catch(e) {
      data.value = null;
      error.value = e as UnwrapRef<E>;
      return null;
    } finally {
      loading.value = false;
    }
  }

  if(params.immediate) {
    send();
  }

  if(params.watch) {
    params.watch.forEach(w => {
      watch(w, send);
    });
  }

  return {
    loading,
    data,
    error,
    send,
  }
}
