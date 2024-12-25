import useRequest from './useRequest';
import { watch } from 'vue';
import { AxiosError } from 'axios';
import { Notify } from 'quasar';

export default function<T>(res: Awaited<ReturnType<typeof useRequest<T, any>>>) {
  watch(res.error, (e) => {
    if(!e) return;

    if(e instanceof AxiosError) {
      if(e.status === 500) {
        Notify.create({
          type: 'negative',
          message: 'Произошла ошибка на сервере!',
        });
      } else {
        Notify.create({
          type: 'negative',
          message: 'Не удалось выполнить запрос!',
        });
      }
    } else {
      Notify.create({
        type: 'negative',
        message: 'Произошла неизвестная ошибка!',
      });
    }
  }, { immediate: true });

  return res;
}
