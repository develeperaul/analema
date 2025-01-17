import { string } from 'yup';

export const profileSchema = {
  name: string().required().label('Имя'),
  last_name: string().required().label('Фамилия'),
  otch: string().label('Отчество'),
  db: string().label('Дата рождения'),
  email: string().email().label('Email'),
};
