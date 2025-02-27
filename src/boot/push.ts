import { boot } from "quasar/wrappers";
import { Notify, Platform } from 'quasar';
import * as Fcm from 'src/utils/fcm';
import { InjectionKey } from 'vue';
import { createRepositories } from './api';
import { inject } from 'vue';
import { PushNotifications } from '../../src-capacitor/node_modules/@capacitor/push-notifications';

export function createPush(api: ReturnType<typeof createRepositories>) {
  async function updateToken(token?: string) {
    const token_fcm = token ?? Fcm.get();
    if(!Platform.is.capacitor || !token_fcm) return;
    try {
      await api.fcm.registr({ token_fcm });
      Fcm.set(token_fcm);
    } catch {
      Fcm.remove();
      console.error('Не удалось обновить токен');
    }
  }

  return {
    updateToken,
  }
}

export default boot(({ app }) => {
  const api = app.config.globalProperties.$repositories;
  const push = createPush(api);
  app.provide(pushKey, push);

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if(permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if(permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    } else {
      await PushNotifications.register();
    }
  }

  const addListeners = async () => {
    await PushNotifications.addListener('registration', async (token) => {
      push.updateToken(token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  async function start() {
    if(Platform.is.capacitor) {
      try {
        await registerNotifications();
        await addListeners();
      } catch(e) {
        console.error('Не удалось запустить пуши!', e);
      }
    }
  }

  start();
});

export const pushKey: InjectionKey<ReturnType<typeof createPush>> = Symbol();

export function usePush(): ReturnType<typeof createPush> {
  const push = inject(pushKey);
  if(!push) throw new Error('модуль push не найден');
  return push;
}
