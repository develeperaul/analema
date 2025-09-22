import { boot } from 'quasar/wrappers';
import { InjectionKey, inject } from 'vue';

function initSystem() {
  return {
    version: '1.4.2',
    googlePlayLink: 'https://play.google.com/store/apps/details?id=ru.analemma.gold',
    appStoreLink: 'https://apps.apple.com/ru/app/id1642881271',
  };
}

export default boot(({ app }) => {
  app.provide(systemKey, initSystem());
});

export function useSystem() {
  const system = inject(systemKey);
  if(!system) throw new Error('system не определена!');
  return system;
}

const systemKey: InjectionKey<ReturnType<typeof initSystem>> = Symbol();
