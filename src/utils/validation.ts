export const phoneTest = [
  'phone',
  'Введите номер в формате +7(111)111-11-11',
  (value?: string) => {
    if(!value) return true;
    const res = /^\+7\s\([0-9]{3}\)\-[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(value);
    return res;
  },
] as const;
