import { string } from 'yup';
import { phoneTest } from 'src/utils/validation';

export const loginSchema = {
  phone: string().required().test(...phoneTest).label('Номер телефона'),
};
