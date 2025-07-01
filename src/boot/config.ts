import { boot } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import { inject } from 'vue';

function makeConfig() {
  return {
    userAgrement: 'https://analemmatrade.ru/useragr.pdf',
    hotlinePhone: '8 (800) 511-88-80',
    whatsappTradePhone: '79870327141',
    creditHref: 'https://analemmatrade.ru/zaym-pod-zalog',
  };
}

const configKey: InjectionKey<ReturnType<typeof makeConfig>> = Symbol('config');

export default boot(({ app }) => {
  app.provide(configKey, makeConfig());
});

export function useConfig() {
  const config = inject(configKey);
  if(!config) throw new Error('config не найден!');
  return config;
}
