import { string } from 'yup';
import { emailTest } from 'src/utils/validation';

const nameTest = /^([a-zA-zа-яА-Я]+)(\-[a-zA-zа-яА-Я]+)*$/gi;

export const profileSchema = {
  name: string().required().matches(nameTest, { message: 'Введите корректное имя' }).label('Имя'),
  last_name: string().required().matches(nameTest, { message: 'Введите корректную фамилию' }).label('Фамилия'),
  otch: string().label('Отчество'),
  db: string().label('Дата рождения'),
  email: string().test(...emailTest).label('Email'),
};
