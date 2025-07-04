import { string } from 'yup';
import { emailTest } from 'src/utils/validation';

export const profileSchema = {
  name: string().required().label('Имя'),
  last_name: string().required().label('Фамилия'),
  otch: string().label('Отчество'),
  db: string().label('Дата рождения'),
  email: string().test(...emailTest).label('Email'),
};
