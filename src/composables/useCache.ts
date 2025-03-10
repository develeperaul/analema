import { inject } from 'vue';
import { cacheKey } from 'src/boot/cache';

export default function<T extends (...args: any[]) => Promise<any>>(key: string, fetchFn: T) {
  const cache = inject(cacheKey);

  if(!cache) throw new Error('cache не найден!');

  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    if(key in cache) return cache[key] as Awaited<ReturnType<T>>;
    const res = await fetchFn(...args);
    cache[key] = res;
    return res;
  }
}
