import { string } from 'yup';

export const orderSchema = {
  point: string().required().label('Пункт самовывоза'),
  addr: {
    address: string().required().label('Адрес'),
    flat: string().required().label('Квартира'),
    entrance: string().label('Подъезд'),
  },
  date: string().required().label('Дата'),
  time: string().required().label('Время'),
};