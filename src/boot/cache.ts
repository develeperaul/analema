import { InjectionKey } from 'vue';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  app.provide(cacheKey, {});
});

export const cacheKey: InjectionKey<Record<string, unknown>> = Symbol();
