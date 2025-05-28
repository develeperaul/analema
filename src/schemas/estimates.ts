import { phoneTest } from 'src/utils/validation';
import { string } from 'yup';

export const createEstimateSchema = {
  section: string().required().label('Категория'),
  sub_section: string().required().label('Подкатегория'),
  neiro_el: string().required().label('Товар'),
  neiro_add_value: string().required('Обязательное поле'),
  desc: string().required().label('Описание'),
  phone: string().required().test(...phoneTest).label('Номер телефона'),
};
