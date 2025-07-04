export const phoneTest = [
  'phone',
  'Введите номер в формате +7(111)111-11-11',
  (value?: string) => {
    if(!value) return true;
    const res = /^\+7\s\([0-9]{3}\)\-[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(value);
    return res;
  },
] as const;

export const emailTest = [
  'custom-email',
  'Пожалуйста, укажите корректный E-mail',
  (value?: string) => {
    if(!value) return true;
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    return res;
  },
] as const;
