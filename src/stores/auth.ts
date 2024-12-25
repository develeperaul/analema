import { defineStore } from 'pinia';
import type { ProfileData } from 'src/repositories/profile';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<ProfileData | null>(null);
  const userPhone = ref('');

  function setUserPhone(value: string) {
    userPhone.value = value;
  }

  function setUser(data: ProfileData | null) {
    user.value = data;
  }

  return {
    userPhone,
    user,
    setUserPhone,
    setUser,
  }
});
